#!/bin/sh

# Apply database migrations
echo "Applying database migrations..."
alembic upgrade head

# Start the application
echo "Starting application..."
exec "$@"
