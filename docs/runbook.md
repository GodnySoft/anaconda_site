# Operations Runbook

## Purpose

Runbook покрывает базовые operational действия для локального и production контура `ANACONDA / OSNOVA`.

## Production runtime

- `web` -> `127.0.0.1:26300`
- `api` -> `127.0.0.1:26800`
- `postgres` -> internal persistence
- release root -> `/opt/anaconda-site`
- active release -> `/opt/anaconda-site/current`

## Локальная диагностика

```bash
make up
make logs
make down
```

Production-like локальная проверка:

```bash
make prod-config
make prod-up
make prod-smoke
make prod-down
```

## Production операции

### Статус

```bash
make ansible-status
```

Что проверяем:

- current release;
- `docker compose ps`;
- `web` health;
- `api` health.

### Deploy

```bash
make ansible-deploy ANSIBLE_REF=main RELEASE_ID=<release-id>
```

### Rollback

```bash
make ansible-rollback RELEASE_ID=<previous-release-id>
```

## Типовые инциденты

### Deploy failed

Проверить:

- GitHub Actions run;
- наличие нового release directory в `/opt/anaconda-site/releases`;
- корректность `shared/env/.env.prod`;
- сработал ли автоматический rollback;
- какой release сейчас привязан к `current`.

### Сайт не отвечает

Проверить:

- `curl` до `http://127.0.0.1:26300/`
- контейнер `web`
- `nginx`
- куда указывает `current`

### API unhealthy

Проверить:

- `curl` до `http://127.0.0.1:26800/api/v1/health`
- логи `api`
- env contract и доступность `postgres`

## Связанные документы

- `./release.md`
- `./deployment-production.md`
- `./ci-cd.md`