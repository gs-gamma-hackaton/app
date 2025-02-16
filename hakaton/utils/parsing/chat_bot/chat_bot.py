import json
from openai import OpenAI
from sentence_transformers import SentenceTransformer
from app.config import settings


class Chatbot:
    def __init__(self,
                 model_url=settings.MODEL_URL,
                 model=settings.MODEL,
                 temp=0.4,
                 stop_token_ids='',
                 ):
        self.model_url = model_url
        self.model = model
        self.temp = temp
        self.stop_token_ids = stop_token_ids

        openai_api_key = "EMPTY"
        self.client = OpenAI(api_key=settings.OPENAPI_KEY, base_url=self.model_url)

        self.embedding_model = SentenceTransformer('BAAI/bge-m3')

    def predict(self, message):
        """Генерирует краткое описание текста."""
        history_openai_format = [{
            "role": "system",
            "content": "Ты — специалист по формированию краткого описания текста. Отвечай только на русском."
        }]

        user_prompt = f"""
            Ты — специалист по формированию краткого описания текста. Твоя задача — вытащить самую важную информацию, чтобы понять, о чём текст.
            Текст: {message}
            """

        history_openai_format.append({"role": "user", "content": user_prompt})

        stream = self.client.chat.completions.create(
            model=self.model,
            messages=history_openai_format,
            temperature=self.temp,
            stream=False,
            top_p=0.8,
            extra_body={
                'repetition_penalty': 1,
                "max_tokens": 512,
                'stop_token_ids': [
                    int(id.strip()) for id in self.stop_token_ids.split(',')
                    if id.strip()
                ] if self.stop_token_ids else []
            }
        )

        return stream.choices[0].message.content

    def get_embedding(self, text):
        """Генерирует эмбеддинг текста."""
        return self.embedding_model.encode(text).tolist()

    def process_json(self, input_json):
        """Обрабатывает JSON: добавляет summary_chunk и эмбеддинги."""
        for entry in input_json:
            text = entry["text"]

            # Генерация краткого описания
            summary = self.predict(text)
            entry["summary_chunk"] = summary

            # Эмбеддинги для оригинального текста и краткого описания
            entry["embedding_text"] = self.get_embedding(text)
            entry["embedding_summary"] = self.get_embedding(summary)

        return input_json