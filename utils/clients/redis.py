import json
from typing import Any, Literal

import redis


class RedisClient:
    def __init__(self, namespace: str, url: str) -> None:
        pool = redis.ConnectionPool.from_url(url)
        self.client = redis.Redis(connection_pool=pool)
        self._namespace = namespace

    def keys(self, pattern: str = '*') -> list[str]:
        full_pattern = self.make_key(pattern)
        keys_with_namespaces: list[bytes] = self.client.keys(full_pattern)
        return [self.remove_namespace(key.decode()) for key in keys_with_namespaces]

    def get(self, key: int) -> dict:
        key = self.make_key(key)
        data = self.client.get(key)
        return self._decode_redis_response(data)

    def mget(self, keys: list[int]) -> dict[int, dict]:
        full_keys = (self.make_key(key) for key in keys)
        data_raw = self.client.mget(full_keys)
        data = self._decode_redis_responses(data_raw)
        key_value_data = {key: value for key, value in zip(keys, data)}
        return key_value_data

    def set(self, key: int, value: dict, expire_seconds: int | None = None) -> bool | None:
        full_key = self.make_key(key)
        data = self._encode_redis_request(value)
        return self.client.set(full_key, data, ex=expire_seconds)

    def mset(self, values: dict[int, dict]) -> Literal[True]:
        data = {self.make_key(key): self._encode_redis_request(value) for key, value in values.items()}
        return self.client.mset(data)

    def delete(self, key: int) -> int:
        full_key = self.make_key(key)
        return self.client.delete(full_key)

    def make_key(self, key: Any) -> str:
        if not self._namespace:
            return str(key)
        return f'{self._namespace}:{key}'

    def remove_namespace(self, key: str) -> str:
        if not self._namespace:
            return key
        return key.replace(f'{self._namespace}:', '')

    @staticmethod
    def _decode_redis_response(data: bytes | None) -> dict | None:
        if not data:
            return data
        return json.loads(data)

    def _decode_redis_responses(self, data: list[bytes]) -> list[dict]:
        return [self._decode_redis_response(data_unit) for data_unit in data if data_unit]

    @staticmethod
    def _encode_redis_request(data: list[dict] | dict | None) -> list[str] | str:
        if isinstance(data, list):
            return [json.dumps(data_unit) for data_unit in data]
        return json.dumps(data, default=str)
