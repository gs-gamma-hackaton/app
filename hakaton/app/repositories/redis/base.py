from abc import ABC, abstractmethod
from typing import Any, Generic, TypeVar

from app.config import settings
from app.repositories.abstract import AbstractRepository
from utils.clients.redis import RedisClient


DomainModel = TypeVar('DomainModel')


class BaseRedisRepository(AbstractRepository, Generic[DomainModel], ABC):
    redis_namespace: str = ''
    domain_model: DomainModel
    data_expire_in_seconds: int | None = None

    def __init__(self):
        self.redis_client = RedisClient(self.redis_namespace, settings.REDIS_URL)

    def get(self, id) -> DomainModel | None:
        raw_data = self.redis_client.get(id)
        return self.make_domain_model_from_dict(raw_data) if raw_data else None

    def list(self, keys: list[Any] | None = None):
        if keys is None:
            keys = self.redis_client.keys()
        raw_values = self.redis_client.mget(keys).values()
        return [self.make_domain_model_from_dict(data) for data in raw_values if data]

    def create(self, domain: DomainModel):
        key = self.get_key_for_domain(domain)
        value = self.domain_to_dict(domain)
        self.redis_client.set(key, value, expire_seconds=self.data_expire_in_seconds)

    def update(self, id, updated_domain: DomainModel):
        value = self.domain_to_dict(updated_domain)
        self.redis_client.set(id, value, expire_seconds=self.data_expire_in_seconds)

    def delete(self, id):
        self.redis_client.delete(id)

    @abstractmethod
    def get_key_for_domain(self, domain: DomainModel):
        ...

    @abstractmethod
    def domain_to_dict(self, domain: DomainModel) -> dict:
        ...

    @abstractmethod
    def make_domain_model_from_dict(self, data: dict) -> DomainModel:
        ...
