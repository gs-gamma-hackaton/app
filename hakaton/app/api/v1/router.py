from fastapi import APIRouter

# from app.api.v1.stations.router import stations_api_router
# from app.api.v1.weathers.router import weathers_api_router
from app.api.v1.auth.route import auth_api_router
from app.api.v1.presentation.router import presentation_api_router


api_router = APIRouter()

# api_router.include_router(weathers_api_router, prefix='/weathers', tags=['v1 weathers'])
# api_router.include_router(stations_api_router, prefix='/stations', tags=['v1 stations'])
api_router.include_router(auth_api_router, prefix='/auth', tags=['auth'])
api_router.include_router(presentation_api_router, prefix='/presentation', tags=['presentation'])
