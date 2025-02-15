from abc import ABC
from dataclasses import asdict
from datetime import datetime
from typing import Generic, TypeVar

from sqlalchemy.orm import Session

from app.db.engine import SessionLocal
from app.repositories.abstract import AbstractRepository


DomainModel = TypeVar('DomainModel')


class BaseAlchemyRepository(AbstractRepository, Generic[DomainModel], ABC):
    domain_model: DomainModel

    def __init__(self, session: Session | None = None):
        self.session = session or SessionLocal()

    def get(self, id: int) -> DomainModel | None:
        return self.session.query(self.domain_model).filter(self.domain_model.id == id).first()

    def list(self) -> list[DomainModel]:
        return self.session.query(self.domain_model).all()

    def create(self, domain: DomainModel) -> DomainModel:
        self.session.add(domain)
        self.session.commit()
        self.session.refresh(domain)
        return domain

    def update(self, id: int, updated_domain: DomainModel) -> DomainModel:
        database_instance = self.get(id)

        for key, value in asdict(updated_domain).items():
            setattr(database_instance, key, value)

        self.session.add(database_instance)
        self.session.commit()
        self.session.refresh(database_instance)

        return database_instance

    def delete(self, id: int) -> None:
        self.session.query(self.domain_model).filter(self.domain_model.id == id).delete()
        self.session.commit()


class SafeDeleteAlchemyRepository(BaseAlchemyRepository, Generic[DomainModel], ABC):
    def get(self, id: int) -> DomainModel | None:
        return (
            self.session.query(self.domain_model)
            .filter(self.domain_model.id == id, self.domain_model.deleted == None)  # noqa E711
            .first()
        )

    def list(self) -> list[DomainModel]:
        return self.session.query(self.domain_model).filter(self.domain_model.deleted == None).all()  # noqa E711

    def delete(self, id: int) -> None:
        database_instance = self.get(id)
        database_instance.deleted = datetime.now()
        self.session.add(database_instance)
        self.session.commit()

    def get_with_deleted(self, id: int) -> DomainModel | None:
        return self.session.query(self.domain_model).filter(self.domain_model.id == id).first()

    def list_with_deleted(self):
        return self.session.query(self.domain_model).all()
