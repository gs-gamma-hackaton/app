import uvicorn

from app.config import settings
from gunicorn_conf import workers


if __name__ == '__main__':
    # DO NOT USE IN PRODUCTION!
    uvicorn.run(
        'app.app:app',
        host=str(settings.HOST),
        port=settings.PORT,
        workers=workers,
        reload=True,
    )
