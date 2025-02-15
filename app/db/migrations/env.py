from logging.config import fileConfig

import alembic_postgresql_enum  # noqa
from alembic import context
from geoalchemy2 import alembic_helpers
from sqlalchemy import engine_from_config, pool, URL

from app.config import settings
from app.db.models import BaseModel


config = context.config

database_url = URL.create(
    'postgresql',
    username=settings.POSTGRES_USER,
    password=settings.POSTGRES_PASSWORD,
    host=settings.POSTGRES_HOST,
    port=settings.POSTGRES_PORT,
    database=settings.POSTGRES_DB,
)
config.set_main_option('sqlalchemy.url', database_url.render_as_string(hide_password=False))

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = BaseModel.metadata


# FIXME:
# Нужно для создания миграций только по нашим таблицам
# В таком случае есть проблема что при удаление Модели, то таблица не удалится
# Не нашел пока другого решения
def include_name(name, type_, parent_names):
    if type_ == 'table':
        return name in target_metadata.tables
    return True


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option('sqlalchemy.url')
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={'paramstyle': 'named'},
        include_object=alembic_helpers.include_object,
        process_revision_directives=alembic_helpers.writer,
        include_name=include_name,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_name=include_name,
            include_object=alembic_helpers.include_object,
            process_revision_directives=alembic_helpers.writer,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
