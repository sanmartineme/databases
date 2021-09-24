FROM postgres:13.4

ENV POSTGRES_USER=${DB_USER}
ENV POSTGRES_PASSWORD=${DB_PASS}
ENV POSTGRES_DB=${DB_NAME}
ENV DB_APP_SCHEMA=${DB_APP_SCHEMA}

# Custom initialization scripts
COPY ./config.sh /docker-entrypoint-initdb.d/config.sh

RUN chmod +x /docker-entrypoint-initdb.d/config.sh