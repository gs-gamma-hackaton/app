FROM python:3.11-slim-buster

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN apt-get update \
  && apt-get install -y build-essential \
  && apt-get install -y libpq-dev \
  && apt-get install -y telnet netcat \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
RUN pip install psycopg2-binary
RUN python -m nltk.downloader punkt_tab

WORKDIR /app
COPY . .

CMD ["gunicorn", "-c", "gunicorn_conf.py", "app.app:app"]