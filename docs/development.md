# Development Guide

## Цель

Этот проект поддерживает не просто сайт, а platform delivery surface для `ANACONDA / OSNOVA`.
Любая разработка должна сохранять:

- единую public surface;
- воспроизводимый локальный запуск;
- production-safe runtime и deploy discipline;
- актуальную документацию;
- единый SQLAlchemy/Alembic migration flow.

## Локальная подготовка

Основной локальный сценарий:

```bash
make init
make doctor
make up
```

## Data layer и миграции

Принятый стандарт проекта:

- модели описываются через `SQLAlchemy`;
- структура схемы версионируется через `Alembic`;
- контейнерный runtime применяет `alembic upgrade head`;
- изменения моделей и миграций коммитятся в одной задаче.

Подробные правила:

- [database-migrations.md](G:\OSNOVA\soft\anaconda_site\docs\database-migrations.md)

## Обязательные проверки перед PR

Минимум:

```bash
docker compose -f docker-compose.yml config
docker compose -f compose.prod.yml --env-file .env.prod config
```

Если задача затрагивает схему БД, дополнительно обязательно проверить:

```bash
docker compose -f docker-compose.yml up -d --build
curl -f http://127.0.0.1:26800/api/v1/health
```

## Правило по миграциям

Нельзя:

- менять SQLAlchemy-модели без migration file;
- менять схему вручную мимо Alembic;
- редактировать старые уже применённые миграции вместо создания новой.