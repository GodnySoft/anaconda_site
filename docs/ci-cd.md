# CI/CD

## Цель

Основной release flow проекта должен работать так:

1. разработка ведётся локально и проходит локальные проверки;
2. подтверждённые изменения попадают в `main` после выравнивания git-состояния;
3. GitHub Actions прогоняет quality и smoke;
4. GitHub Actions публикует Docker-образы в GHCR;
5. GitHub Actions запускает release-based deploy на production host;
6. если healthcheck не проходит, Ansible выполняет автоматический rollback на предыдущий release.

## Важное ограничение текущего этапа

Схема уже подготовлена под `main`, но фактически проект всё ещё находится в локальной фазе нормализации:

- git worktree/index ещё не выровнен;
- release-ветка `main` ещё не введена в безопасный рабочий процесс;
- до выравнивания git-состояния нельзя считать production trigger окончательно активированным.

## Workflow-файлы

- `../.github/workflows/build-push-images.yml`
  Основной CI: frontend quality, backend quality, Docker smoke и публикация образов.
- `../.github/workflows/deploy.yml`
  Автоматический deploy после успешного pipeline на `main`.
- `../.github/workflows/deploy-to-prod.yml`
  Ручные production-операции: `status`, `deploy`, `rollback`.

## Что проверяет pipeline

### Frontend

- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

### Backend

- `pip install -r requirements.txt`
- `python -m compileall app migrations`

### Smoke runtime

- `docker compose -f docker-compose.yml config`
- `docker compose -f compose.prod.yml --env-file .env.prod config`
- `docker compose -f docker-compose.yml up -d --build`
- healthcheck API
- проверка `/` и `/contacts`
- smoke-заявка через `POST /api/v1/leads`

## Production secrets

Обязательные secrets:

- `PROD_HOST`
- `PROD_USER`
- `PROD_SSH_PRIVATE_KEY`
- `PROD_ENV_FILE`

Опциональные secrets:

- `PROD_GHCR_USERNAME`
- `PROD_GHCR_TOKEN`

Рекомендуемые repository/environment variables:

- `PROD_APP_ROOT`
- `PROD_WEB_HEALTH_URL`
- `PROD_API_HEALTH_URL`

## Тегирование образов

В GHCR публикуются два тега:

- `latest`
- `${GITHUB_SHA}`

Production deploy должен использовать именно `${GITHUB_SHA}` как `release_id`, чтобы rollback выполнялся по конкретному релизу, а не по плавающему тегу.

## Release-based deploy

На host поддерживается структура:

- `/opt/anaconda-site/releases/<release-id>`
- `/opt/anaconda-site/shared/env/.env.prod`
- `/opt/anaconda-site/shared/backups`
- `/opt/anaconda-site/current`

`current` должен указывать только на последний успешный release.

## Rollback

Rollback может выполняться двумя способами:

- автоматически, если новый release не проходит healthcheck;
- вручную через workflow `Production Operations` или через Ansible с `rollback_release_id`.

## Ручной контур

В проекте должен оставаться ручной операционный маршрут как backup-путь:

- `make ansible-status`
- `make ansible-deploy ANSIBLE_REF=<ref> RELEASE_ID=<release-id>`
- `make ansible-rollback RELEASE_ID=<release-id>`

## Что ещё требуется сделать

1. Выровнять git-состояние репозитория.
2. Завести и активировать `main` как основную release-ветку.
3. Подтвердить набор production secrets и host prerequisites.
4. Выполнить dry-run проверку release/deploy/rollback после перехода на корректный git-flow.