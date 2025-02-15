from fastapi import APIRouter

from app.api.v1.presentation import views


presentation_api_router = APIRouter()

presentation_api_router.include_router(views.presentation_api_router)
