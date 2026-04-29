# Architecture

## Назначение

Репозиторий реализует platform web surface для `ANACONDA / OSNOVA`:

- narrative-driven landing;
- стабильный public API для лида и healthcheck;
- support API и data layer как задел для следующих этапов;
- локальный и production runtime, пригодный для дальнейшей разработки и поставки.

## Подсистемы

### `web`

Отвечает за:

- публичную landing-поверхность;
- narrative-блоки и UX-каркас;
- вызов `POST /api/v1/leads`;
- demo и support-маршруты для следующих этапов.

Стек:

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

### `api`

Отвечает за:

- стабильный публичный API для сайта;
- support endpoint'ы для следующих этапов;
- доступ к PostgreSQL через `SQLAlchemy`;
- применение Alembic-миграций при старте runtime.

Стек:

- FastAPI
- Pydantic
- SQLAlchemy
- Alembic
- PostgreSQL

### `postgres`

Primary persistence для:

- лидов;
- support chat-сущностей;
- следующих очередей data layer.

## Публичный API

### Стабильный public API

- `GET /api/v1/health`
- `POST /api/v1/leads`

Текущий SQLAlchemy-backed lead contract:

- `name`
- `company`
- `contact`
- `message`
- `consent`
- `source_page`

## Текущий data layer

Основные SQLAlchemy-сущности:

- `Lead`
- `Channel`
- `Message`

Схема базы управляется через Alembic.

Источник истины по data layer:

1. модели `api/app/models/`
2. миграции `api/migrations/versions/`

## Runtime topology

### Локально

- `web` доступен на `:26300`
- `api` доступен на `:26800`
- `postgres` доступен на `:26543`

### Production

- host-level `nginx` принимает внешний HTTP-трафик;
- `nginx` проксирует `web` и `api`;
- `compose.prod.yml` поднимает `web`, `api`, `postgres`.

## Миграционная дисциплина

- `metadata.create_all()` не используется как источник истины схемы;
- изменения структуры данных вносятся через Alembic;
- runtime применяет `alembic upgrade head`;
- model change без migration file считается дефектом.