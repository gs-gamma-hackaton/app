import os
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, status, UploadFile
from fastapi.responses import StreamingResponse
from minio import Minio
from sqlalchemy.orm import Session

from app.api.dependencies import get_session
from app.auth.jwt_auth import check_auth
from app.celery.tasks import send_data_to_ml
from app.config import settings
from app.db.models.presentation import Presentation
from app.repositories.alchemy.presentation import PresentationAlchemyRepository


presentation_api_router = APIRouter()


# Инициализация MinIO клиента
minio_client = Minio(
    endpoint=settings.MINIO_ENDPOINT,
    access_key=settings.MINIO_ACCESS_KEY,
    secret_key=settings.MINIO_SECRET_KEY,
    secure=False,
)


@presentation_api_router.post(
    '/',
    summary='Создание новой презентации',
    status_code=status.HTTP_201_CREATED,
)
async def presentation(
    file: Annotated[UploadFile, File()],
    prompts: Annotated[str, Form()],
    session: Annotated[Session, Depends(get_session)],
    current_user=Depends(check_auth),
):
    presentation_repository = PresentationAlchemyRepository(session)

    new_presentation = Presentation(
        prompts=prompts,
        user_id=current_user.id,
    )
    presentation_db_object = presentation_repository.create(new_presentation)
    str(presentation_db_object.id)

    # Создаем бакет если его нет
    bucket_name = f"documents-{datetime.now().strftime('%Y-%m')}"
    if not minio_client.bucket_exists(bucket_name):
        minio_client.make_bucket(bucket_name)

    # Генерируем уникальное имя файла
    filename = f"{os.urandom(8).hex()}.{file.filename.split('.')[-1]}"

    file_size = os.fstat(file.file.fileno()).st_size
    # Загружаем файл в MinIO
    minio_client.put_object(
        bucket_name=bucket_name, object_name=filename, data=file.file, length=file_size, content_type=file.content_type
    )

    async def event_generator():
        try:
            yield "data: {{\"status\": \"processing\", \"message\": \"Начало обработки\"}}\n\n"

            result = await send_data_to_ml(
                '',
                prompts,
            )
            yield f"data: {{\"status\": \"completed\", \"result\": {result}}}\n\n"

        except Exception as e:
            yield f"data: {{\"status\": \"error\", \"error\": \"{str(e)}\"}}\n\n"

    return StreamingResponse(event_generator(), media_type='text/event-stream')
