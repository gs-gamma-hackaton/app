from fastapi import File, UploadFile
from pydantic import BaseModel, Json


class PresentationSchema(BaseModel):
    prompts: str
    files: UploadFile = File(...)


class PresentationResponseSchema(BaseModel):
    presentation_id: int
    task_id: int


class PresentationCreateSchema(BaseModel):
    data: Json


class PresentationUpdateSchema(PresentationCreateSchema):
    ...


class FileProcessingRequest(BaseModel):
    bucket_name: str
    path_to_file: str
