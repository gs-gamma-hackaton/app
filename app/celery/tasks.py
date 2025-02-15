from typing import Final


MAX_RETRIES: Final[int] = 2
SLEEP_BEFORE_RETRY: Final[int] = 60


# @app.task(autoretry_for=(Exception,), retry_kwargs={'max_retries': MAX_RETRIES, 'countdown': SLEEP_BEFORE_RETRY})
async def send_data_to_ml(path_to_files: list[str], prompts: str):
    # client = MlClient()

    # TODO прогнать файлы
    # data = {
    #     'path_to_files': path_to_files,
    #     'prompts': prompts
    # }

    # response = client.post(
    #     uri=settings.MLHOST,
    #     data=data,
    # )

    # if response.status_code != 200:
    #     ...
    import asyncio

    await asyncio.sleep(1)
    return 'VOT TAKOI TEKST'
