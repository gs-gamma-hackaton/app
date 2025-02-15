from celery import Celery

from app.config import settings


app = Celery(
    main='green-skills-celery',
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_BROKER_URL,
    imports=['app.entrypoint'],
)

# app.autodiscover_tasks(['app.celery'], force=True)

# schedule = {
#     'collect_weather_history': {
#         'task': 'app.celery.tasks.collect_weather_history',
#         'schedule': crontab(minute=0),  # Каждый час
#     },
#     'collect_weather_forecast': {
#         'task': 'app.celery.tasks.collect_weather_forecast',
#         'schedule': crontab(hour='*/3', minute=0),  # Каждые 3 часа
#     },
#     'collect_weather_stations': {
#         'task': 'app.celery.tasks.collect_weather_stations',
#         'schedule': crontab(hour=20, minute=0),  # Каждый день в час ночи
#     },
#     'generate_year_weather_history_partitions': {
#         'task': 'app.celery.tasks.generate_year_weather_history_partitions',
#         'schedule': crontab(minute=0, hour=0, day_of_month=1),  # Каждый месяц 1-го числа
#     },
# }
#
# app.conf.beat_schedule = schedule
