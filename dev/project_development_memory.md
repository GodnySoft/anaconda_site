# Единая память разработки проекта

## Назначение

Этот файл хранит текущее инженерное состояние проекта, подтверждённые решения, ограничения и следующий рабочий фокус.

Правило:

- ссылки в этом файле всегда должны быть относительными к репозиторию;
- после каждой существенной инженерной сессии файл должен обновляться;
- role-файлы задают поведение агентов, а этот документ хранит историю и текущее состояние проекта.

## Источники истины

Основные документы и артефакты:

- [ROLE_Principal Fullstack Platform & Web Experience Architect.md](roles/ROLE_Principal%20Fullstack%20Platform%20%26%20Web%20Experience%20Architect.md)
- [ROLE_Chief Designer_Anaconda Site.md](roles/ROLE_Chief%20Designer_Anaconda%20Site.md)
- [development_delivery_plan.md](development_delivery_plan.md)
- [anaconda_stage_1_public_mvp_tz.md](v1/anaconda_stage_1_public_mvp_tz.md)
- [anaconda_stage_2_implementation_levels_tz.md](v1/anaconda_stage_2_implementation_levels_tz.md)
- [architecture.md](../docs/architecture.md)
- [development.md](../docs/development.md)
- [database-migrations.md](../docs/database-migrations.md)
- [ci-cd.md](../docs/ci-cd.md)
- [deployment-production.md](../docs/deployment-production.md)
- [runbook.md](../docs/runbook.md)

## Текущий этап проекта

Проект находится в конце **Этапа 1 / Public MVP**.

Это означает:

- публичный контур уже поднят и работает локально;
- основные будущие маршруты существуют как заготовки;
- главным продуктовым приоритетом остаётся завершение главной `/` и `/contacts`, а не расползание в Этапы 2–5.

## Что подтверждено по системе

### Стек

- frontend: `Next.js + React + TypeScript + Tailwind`
- backend: `FastAPI + SQLAlchemy + Alembic`
- database: `PostgreSQL`
- runtime: `Docker Compose`
- production proxy: host-level `nginx`
- CI/CD: `GitHub Actions`
- deploy: `Ansible`, release-based deploy

### Локальный контур

Ранее в этой рабочей ветке было подтверждено:

- локально поднимаются `web`, `api`, `postgres`;
- `GET /api/v1/health` отвечает `200`;
- `POST /api/v1/leads` сохраняет заявку;
- frontend-страницы `/` и `/contacts` доступны;
- production build frontend проходит.

### Data layer

Приведён к единой схеме:

- SQLAlchemy-модели — источник истины на уровне ORM;
- Alembic-миграции — источник истины на уровне версий схемы;
- автоматическое применение миграций идёт через `api/entrypoint.sh` и `alembic upgrade head`.

Ключевые файлы:

- [api/app/models/base.py](../api/app/models/base.py)
- [api/app/models/lead.py](../api/app/models/lead.py)
- [api/app/models/chat.py](../api/app/models/chat.py)
- [api/migrations/env.py](../api/migrations/env.py)
- [api/migrations/versions/20260429_0001_initial_schema.py](../api/migrations/versions/20260429_0001_initial_schema.py)

## Что уже сделано

### 2026-04-29 — среда, runtime и миграции

- Подготовлен Windows/WSL сценарий разработки:
  - [bootstrap_windows_wsl_dev.ps1](../infra/scripts/bootstrap_windows_wsl_dev.ps1)
  - [windows-wsl-development.md](../docs/windows-wsl-development.md)
- Подготовлен локальный [Makefile](../Makefile).
- Исправлены и валидированы:
  - [docker-compose.yml](../docker-compose.yml)
  - [compose.prod.yml](../compose.prod.yml)
- Приведены в рабочее состояние runtime-артефакты контейнеров:
  - [api/Dockerfile](../api/Dockerfile)
  - [api/entrypoint.sh](../api/entrypoint.sh)
  - [web/Dockerfile.dev](../web/Dockerfile.dev)
  - [web/Dockerfile.prod](../web/Dockerfile.prod)
- Приведён к единой схеме data-layer `SQLAlchemy + Alembic + PostgreSQL`.
- Подготовлена документация по миграционной дисциплине:
  - [database-migrations.md](../docs/database-migrations.md)

### 2026-04-29 — Public MVP, modular frontend и motion

- Главная и контакты переведены на модульную структуру:
  - `web/components/sections/*`
  - `web/components/motion/*`
  - `web/components/ui/*`
  - `web/lib/site-content.ts`
- Подготовлены ключевые public-компоненты:
  - [PublicSiteLayout.tsx](../web/components/PublicSiteLayout.tsx)
  - [PublicLeadForm.tsx](../web/components/PublicLeadForm.tsx)
- Обновлены public-страницы:
  - [index.tsx](../web/pages/index.tsx)
  - [contacts.tsx](../web/pages/contacts.tsx)
- Подготовлены docs по public surface:
  - [home-page.md](../docs/home-page.md)
  - [contacts-page.md](../docs/contacts-page.md)
  - [components.md](../docs/components.md)
  - [lead-flow.md](../docs/lead-flow.md)
  - [motion-guidelines.md](../docs/motion-guidelines.md)
  - [site-map.md](../docs/site-map.md)

### 2026-04-29 — CI/CD и release-based deploy

- Переписаны workflow-файлы под quality/smoke/publish/deploy:
  - [build-push-images.yml](../.github/workflows/build-push-images.yml)
  - [deploy.yml](../.github/workflows/deploy.yml)
  - [deploy-to-prod.yml](../.github/workflows/deploy-to-prod.yml)
- Переписан Ansible deploy в release-based схему:
  - [deploy.yml](../infra/ansible/deploy.yml)
- Подготовлены release/deploy docs:
  - [ci-cd.md](../docs/ci-cd.md)
  - [release.md](../docs/release.md)
  - [deployment-production.md](../docs/deployment-production.md)
  - [runbook.md](../docs/runbook.md)
  - [server-bootstrap.md](../docs/server-bootstrap.md)

### 2026-04-29 — отдельная роль дизайн-агента

- Подготовлена отдельная роль для главного дизайнера сайта:
  - [ROLE_Chief Designer_Anaconda Site.md](roles/ROLE_Chief%20Designer_Anaconda%20Site.md)

## Текущие ограничения и риски

### 1. Git-состояние не выровнено

Сейчас `git status` показывает аномальную картину: почти весь репозиторий идёт как пары `deleted + untracked`.

Следствие:

- нельзя считать безопасными автоматические `commit / push / branch rename`;
- нельзя пока без отдельной диагностики переводить рабочий release flow на `main`;
- нужно отдельно восстановить корректный worktree/index.

### 2. Внутренняя документация была частично повреждена кодировкой

Часть markdown-файлов в ходе прошлых итераций получила mojibake-искажения. Это уже признано дефектом проекта и подлежит последовательной нормализации.

### 3. Репозиторий загрязняется generated-артефактами

Подтверждённый мусор первого уровня:

- `__pycache__`
- `.next`
- bootstrap-логи и служебные runtime-файлы
- устаревшие role-артефакты, не являющиеся источником истины

## Что осталось до завершения Этапа 1

1. Провести ручную mobile-first QA для `/` и `/contacts` на `360 / 390 / 768 / 1440`.
2. Дошлифовать hero, CTA, ритм секций и motion после визуального просмотра в браузере.
3. Подтвердить финальные контактные данные и финальные CTA-тексты.
4. Провести финальную сверку с [anaconda_stage_1_public_mvp_tz.md](v1/anaconda_stage_1_public_mvp_tz.md).

## Что делать дальше

### Ближайший инженерный приоритет

Нормализация репозитория:

1. очистка generated-мусора;
2. исправление битых docs;
3. выравнивание `.gitignore`;
4. фиксация audit/normalization плана.

### Следующий критический шаг

После этого — отдельная диагностика и выравнивание git-состояния.

### Продуктовый шаг после нормализации

Только после нормализации репозитория и git-состояния:

- закрытие остатка Этапа 1;
- затем переход к Этапу 2 и более глубокому visual/product развитию.
## Дополнительная фиксация по нормализации репозитория

### Что подтверждено после санитарной очистки

- Удалены generated-артефакты первого уровня:
  - `__pycache__`
  - `.next`
  - bootstrap-логи и служебные runtime-файлы
  - устаревшая роль `designer_role.md`
- Нормализованы ключевые документы:
  - [project_development_memory.md](project_development_memory.md)
  - [development_delivery_plan.md](development_delivery_plan.md)
  - [ci-cd.md](../docs/ci-cd.md)
  - [project-audit-and-normalization-plan.md](../docs/project-audit-and-normalization-plan.md)
- Исправлен workflow ручных production-операций:
  - [deploy-to-prod.yml](../.github/workflows/deploy-to-prod.yml)
- Нормализован [../.gitignore](../.gitignore).

### Что подтверждено по runtime после очистки

- `docker compose -f docker-compose.yml config` проходит;
- `docker compose -f compose.prod.yml --env-file .env.prod config` проходит;
- `docker compose -f docker-compose.yml up -d --build` проходит;
- `GET http://127.0.0.1:26800/api/v1/health` отвечает `200`;
- `GET http://127.0.0.1:26300/` отвечает `200`;
- `GET http://127.0.0.1:26300/contacts` отвечает `200`.

### Новое уточнение по git-аномалии

Дополнительно подтверждено:

- в `.git/config.worktree` включён `core.sparseCheckout=true`;
- используется нестандартный sparse-pattern:
  - `/*`
  - `!dev/roles/ROLE: Principal Fullstack Platform & Web Experience Architect.md`

Это не доказывает автоматически первопричину аномального `git status`, но уже является подозрительным техническим следом и должно быть отдельно исследовано перед любыми `commit/push`.

### Новый риск, зафиксированный при пересборке frontend-контейнера

Во время `npm install` в `web` Docker build сообщил о наличии у frontend-зависимостей:

- `8 vulnerabilities`
- из них `1 moderate`, `6 high`, `1 critical`

Это не блокирует локальный runtime прямо сейчас, но требует отдельной dependency-аудит итерации.

## Дополнительная фиксация по git, main и версии 0.1

### Что принято как рабочее правило

- Основная ветка проекта: `main`.
- Схема версионирования до `1.0`: `0.x`.
- Первый нормализованный релиз проекта должен быть зафиксирован как `0.1`.
- После выравнивания репозитория именно `main` должен стать основной точкой публикации в GitHub и базой для CI/CD/deploy.

### Что должно быть закреплено в роли

В основную инженерную роль добавлены правила по:

- единой основной ветке `main`;
- схеме версионирования `0.x`;
- дисциплине коммитов;
- поведению push в GitHub;
- связи между `main`, GitHub Actions, GHCR и Ansible deploy.
