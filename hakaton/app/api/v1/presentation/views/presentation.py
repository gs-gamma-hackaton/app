import os
from datetime import datetime
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, File, Form, status, UploadFile
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.api.dependencies import get_session
from app.api.v1.presentation.serializers import PresentationCreateSchema
from app.auth.jwt_auth import check_auth
from app.celery.tasks import send_data_to_ml
from app.db.models.presentation import Presentation
from app.repositories.alchemy.presentation import PresentationAlchemyRepository
from utils.clients.minio import minio_client


presentation_api_router = APIRouter()


@presentation_api_router.post(
    '/',
    summary='Создание новой презентации',
    status_code=status.HTTP_201_CREATED,
)
async def presentation(
    file: Annotated[UploadFile | None, File(description='Файл для загрузки (опционально)')],
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
    bucket_name = None
    filename = None
    if file:
        # Создаем бакет если его нет
        bucket_name = f"documents-{datetime.now().strftime('%Y-%m')}"
        if not minio_client.bucket_exists(bucket_name):
            minio_client.make_bucket(bucket_name)

        # Генерируем уникальное имя файла
        filename = f"{os.urandom(8).hex()}.{file.filename.split('.')[-1]}"

        file_size = os.fstat(file.file.fileno()).st_size
        # Загружаем файл в MinIO
        minio_client.put_object(
            bucket_name=bucket_name,
            object_name=filename,
            data=file.file,
            length=file_size,
            content_type=file.content_type,
        )

    async def event_generator():
        try:
            yield f"data: {{\"status\": \"processing\", \"message\": \"Начало обработки\", \"pres_id\": {presentation_db_object.id}}}\n\n"
            if filename and bucket_name:
                result = await send_data_to_ml(
                    bucket=bucket_name,
                    object_name=filename,
                    prompts=prompts,
                )
            else:
                result = await send_data_to_ml(
                    prompts=prompts,
                )
            yield f"data: {{\"status\": \"completed\", \"result\": {result}}}\n\n"

        except Exception as e:
            yield f"data: {{\"status\": \"error\", \"error\": \"{str(e)}\"}}\n\n"

    return StreamingResponse(event_generator(), media_type='text/event-stream')


@presentation_api_router.patch(
    '/{id}',
    summary='Обновление презентации',
    status_code=status.HTTP_200_OK,
)
async def presentation_update(
    id: int,
    json: PresentationCreateSchema,
    session: Annotated[Session, Depends(get_session)],
    current_user=Depends(check_auth),
):
    presentation_repository = PresentationAlchemyRepository(session)

    obj = presentation_repository.update_field(id, {'data': json.data})
    return obj


@presentation_api_router.get(
    '/',
    summary='Список всех объектов презентаций',
    status_code=status.HTTP_200_OK,
)
async def list_presentation(
    session: Annotated[Session, Depends(get_session)],
    current_user=Depends(check_auth),
):
    presentation_repository = PresentationAlchemyRepository(session)

    objs = presentation_repository.filter_by_user(current_user.id)
    return objs


@presentation_api_router.get(
    '/{id}',
    summary='Получить объект презентации',
    status_code=status.HTTP_200_OK,
)
async def retrieve_presentation(
    id: int,
    session: Annotated[Session, Depends(get_session)],
):
    presentation_repository = PresentationAlchemyRepository(session)

    obj = presentation_repository.get(id)
    return obj


@presentation_api_router.delete(
    '/{id}',
    summary='Удаление презентации',
    status_code=status.HTTP_200_OK,
)
async def delete_presentation(
    id: int,
    session: Annotated[Session, Depends(get_session)],
    current_user=Depends(check_auth),
):
    presentation_repository = PresentationAlchemyRepository(session)

    obj = presentation_repository.delete(id)
    return obj


@presentation_api_router.post(
    '/without-neuron',
    summary='Создание без ИИ',
    status_code=status.HTTP_201_CREATED,
)
async def presentation_create_without_neuron(
    json: PresentationCreateSchema,
    session: Annotated[Session, Depends(get_session)],
    current_user=Depends(check_auth),
):
    presentation_repository = PresentationAlchemyRepository(session)

    obj = Presentation(
        data=json.data,
        user_id=current_user.id,
    )
    presentation_repository.create(obj)

    return obj
