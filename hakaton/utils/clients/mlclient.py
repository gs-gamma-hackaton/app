from typing import Any
from urllib.parse import urljoin

import aiohttp

#
from utils.clients.http import HTTPAPIClient


# TODO по хорошему надо базовый ассинхронный клиент иметь


class MlClient(HTTPAPIClient):
    async def _get_session(self) -> aiohttp.ClientSession:
        if not self._session:
            self._session = aiohttp.ClientSession(
                headers=self.general_headers,
                connector=aiohttp.TCPConnector(limit_per_host=100),
            )
        return self._session

    async def request(
        self,
        method: str,
        uri: str,
        params: dict[str, Any] | None = None,
        data: Any | None = None,
        json: Any | None = None,
        headers: dict[str, str] | None = None,
        timeout: int | None = None,
    ) -> aiohttp.ClientResponse:
        session = await self._get_session()
        url = urljoin(self.base_url, uri)
        merged_headers = {**(headers or {}), **self.general_headers}

        async with session.request(
            method=method,
            url=url,
            params=params,
            data=data,
            json=json,
            headers=merged_headers,
            timeout=timeout,
        ) as response:
            response.raise_for_status()
            return response

    async def post(
        self,
        uri: str,
        params: dict[str, Any] | None = None,
        data: Any | None = None,
        json: Any | None = None,
        headers: dict[str, str] | None = None,
        timeout: int | None = None,
    ) -> aiohttp.ClientResponse:
        return await self.request(
            method='POST',
            uri=uri,
            params=params,
            data=data,
            json=json,
            headers=headers,
            timeout=timeout,
        )

    async def close_session(self):
        if self._session:
            await self._session.close()
            self._session = None
