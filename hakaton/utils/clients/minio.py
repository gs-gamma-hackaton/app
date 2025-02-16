from minio import Minio

from app.config import settings


# Инициализация MinIO клиента
minio_client = Minio(
    endpoint=settings.MINIO_ENDPOINT,
    access_key=settings.MINIO_ACCESS_KEY,
    secret_key=settings.MINIO_SECRET_KEY,
    secure=False,
)


def get_file_from_minio(bucket_name: str, filename: str) -> bytes:
    try:
        # Получаем файл из MinIO в память
        result = minio_client.get_object(bucket_name, filename)

        # Читаем содержимое файла
        file_content = result.read()

        # Возвращаем содержимое файла
        return file_content

    except Exception as e:
        print(f"Ошибка при получении файла: {e}")
        return None