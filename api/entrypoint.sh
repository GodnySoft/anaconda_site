#!/bin/sh

set -e

# Применяем миграции перед запуском приложения.
echo "Applying database migrations..."
alembic upgrade head

# Передаем управление основной команде контейнера.
echo "Starting application..."
exec "$@"