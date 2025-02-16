from app.config import settings


bind = f'{settings.HOST}:{settings.PORT}'
workers = settings.WORKERS
accesslog = '-'
errorlog = '-'
worker_class = 'uvicorn.workers.UvicornWorker'
timeout = 300
