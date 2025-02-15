from fastapi import APIRouter

from app.api.v1.auth import views


auth_api_router = APIRouter()

auth_api_router.include_router(views.router)
