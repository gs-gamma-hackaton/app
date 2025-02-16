from typing import Final

from app.config import settings
from utils.clients.minio import minio_client
from utils.clients.mlclient import MlClient
from utils.parsing.chat_bot.chat_bot import Chatbot
from utils.parsing.file.docx_type import MinIODocProcessor


MAX_RETRIES: Final[int] = 2
SLEEP_BEFORE_RETRY: Final[int] = 60


# TODO по хорошему вынести в celery, но у меня 7 утра, я не спал всю ночь
# TODO кому не всё равно? (зато структура людская)


async def send_data_to_ml(path_to_file, bucket_name, prompts: str):
    client = MlClient(base_url=settings.MLHOST)

    docx_parsing_minio = MinIODocProcessor(minio_client=minio_client, bucket_name=bucket_name)
    json_dump_file = docx_parsing_minio.process_minio_document(object_path=path_to_file)

    chat_bot = Chatbot()
    processed_json = chat_bot.process_json(json_dump_file)

    # TODO
    # здесь происходит магия
    result = processed_json

    return result
