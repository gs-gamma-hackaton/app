import io

from typing import Final, Optional

import aiohttp
from fastapi import UploadFile
from app.config import settings
from utils.clients.minio import get_file_from_minio
from aiohttp import MultipartWriter

MAX_RETRIES: Final[int] = 2
SLEEP_BEFORE_RETRY: Final[int] = 60


async def send_data_to_ml(
        prompts: str,
        bucket: str = None,
        object_name: str = None,
):
    # Получаем файл из MinIO
    file_content = get_file_from_minio(bucket, object_name)

    if not file_content:
        return {"error": "Файл не найден в MinIO"}

    async with aiohttp.ClientSession() as session:
        with MultipartWriter('form-data') as writer:
            part = writer.append(io.BytesIO(file_content))
            part.headers.extend({
                'Content-Disposition': f'form-data; name="file"; filename="{object_name}"'
            })

            async with session.post(
                    settings.MLHOST + "uploadfile/",
                    data=writer
            ) as response:
                return await response.json()
