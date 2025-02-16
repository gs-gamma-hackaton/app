import logging
import sys

from pydantic import AnyUrl, ConfigDict
from pydantic.networks import IPvAnyAddress
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_config = ConfigDict(extra='ignore')  # Игнорирование лишних переменных в env файле

    # Debug
    DEBUG: bool = False
    SENTRY_DSN: str = ''

    # Application
    PORT: int = 8000
    HOST: IPvAnyAddress | AnyUrl = '0.0.0.0'
    # BEARER_TOKEN: str
    WORKERS: int = 4

    # Database
    POSTGRES_PORT: int
    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str
    POSTGRES_HOST: str

    # Celery
    CELERY_BROKER_URL: str

    # Redis
    REDIS_URL: str

    # Minio
    MINIO_ROOT_USER: str
    MINIO_ROOT_PASSWORD: str
    MINIO_ACCESS_KEY: str
    MINIO_SECRET_KEY: str
    MINIO_ENDPOINT: str

    # auth
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_MINUTES: int

    # ML
    MLHOST: str


settings = Settings(_env_file='.environment')

logger = logging.getLogger()
logger.addHandler(logging.StreamHandler(sys.stdout))
logger.setLevel(logging.DEBUG if settings.DEBUG else logging.INFO)
