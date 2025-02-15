from sqlalchemy import create_engine, URL
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.config import settings


POSTGRES_URL = URL.create(
    'postgresql',
    username=settings.POSTGRES_USER,
    password=settings.POSTGRES_PASSWORD,
    host=settings.POSTGRES_HOST,
    port=settings.POSTGRES_PORT,
    database=settings.POSTGRES_DB,
)


engine = create_engine(
    POSTGRES_URL,
    echo=True if settings.DEBUG else False,  # SQL Logging
    poolclass=NullPool,  # For stable work with pgbouncer
)

SessionLocal = sessionmaker(engine, expire_on_commit=False, autoflush=False)
