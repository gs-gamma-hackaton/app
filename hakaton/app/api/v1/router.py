from fastapi import APIRouter

from app.api.v1.auth.route import auth_api_router
from app.api.v1.presentation.router import presentation_api_router


api_router = APIRouter()

api_router.include_router(auth_api_router, prefix='/auth', tags=['auth'])
api_router.include_router(presentation_api_router, prefix='/presentation', tags=['presentation'])
