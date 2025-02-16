from typing import Final

from app.config import settings
from utils.clients.mlclient import MlClient


MAX_RETRIES: Final[int] = 2
SLEEP_BEFORE_RETRY: Final[int] = 60


async def send_data_to_ml(prompts: str, filename=None, bucket_name=None):
    client = MlClient(base_url=settings.MLHOST)

    data = {
        'filename': filename,
        'bucket_name': bucket_name,
        'prompts': prompts,
    }

    response = await client.post(uri='/users', json=data)

    result = await response.json()

    return result
