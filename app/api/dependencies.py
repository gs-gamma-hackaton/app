from collections.abc import Generator

from app.db.engine import SessionLocal


def get_session() -> Generator:
    with SessionLocal() as session:
        yield session
