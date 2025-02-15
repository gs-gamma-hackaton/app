import sentry_sdk
import urllib3

from app.config import settings
from app.db.mappers import start_mapping_table_from_domain


sentry_sdk.init(dsn=settings.SENTRY_DSN, traces_sample_rate=1.0)

start_mapping_table_from_domain()

urllib3.disable_warnings()  # Чтобы не отображать варнинги из-за отключенной проверки сертификатов
