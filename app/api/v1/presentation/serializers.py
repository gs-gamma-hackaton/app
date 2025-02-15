from fastapi import File, UploadFile
from pydantic import BaseModel


class PresentationSchema(BaseModel):
    prompts: str
    files: UploadFile = File(...)


class PresentationResponseSchema(BaseModel):
    presentation_id: int
    task_id: int
