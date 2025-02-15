from urllib.parse import urljoin

from requests import Response
from requests.adapters import HTTPAdapter
from requests.auth import AuthBase
from requests.sessions import Session
from urllib3 import Retry


class HTTPAPIClient:
    def __init__(
        self,
        base_url: str = '',
        general_headers: dict | None = None,
        authentication: AuthBase | None = None,
        retry_policy: Retry | None = None,
    ):
        self._session = Session()
        self._session.auth = authentication

        self.base_url = base_url
        self.general_headers = general_headers or {}

        if retry_policy:
            assert base_url, 'add base url for client for use `retry_policy`'

            self._session.mount(self.base_url, HTTPAdapter(max_retries=retry_policy))

    def request(
        self,
        method: str,
        uri: str,
        params: dict | None = None,
        data: dict | None = None,
        json: dict | None = None,
        headers: dict | None = None,
        files: dict | None = None,
        timeout: int | None = None,
    ):
        headers = self.general_headers | headers if headers else self.general_headers
        url = urljoin(self.base_url, uri)

        response = self._session.request(
            method,
            url,
            headers=headers,
            params=params,
            data=data,
            json=json,
            files=files,
            timeout=timeout,
        )
        response.raise_for_status()

        return response

    def get(
        self,
        uri: str,
        params: dict | None = None,
        headers: dict | None = None,
        timeout: int | None = None,
    ) -> Response:
        return self.request(
            method='GET',
            uri=uri,
            params=params,
            headers=headers,
            timeout=timeout,
        )

    def post(
        self,
        uri: str,
        params: dict | None,
        data: dict | None = None,
        json: dict | None = None,
        headers: dict | None = None,
        timeout: int | None = None,
    ):
        return self.request(
            method='POST',
            uri=uri,
            params=params,
            data=data,
            json=json,
            headers=headers,
            timeout=timeout,
        )
