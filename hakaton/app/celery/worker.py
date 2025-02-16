from celery import Celery

from app.config import settings


app = Celery(
    main='green-skills-celery',
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_BROKER_URL,
    imports=['app.entrypoint'],
)
