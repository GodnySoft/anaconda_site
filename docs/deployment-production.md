# Production Deployment

## Топология

- runtime host проксирует `web` и `api` через host-level `nginx`;
- `web` слушает `127.0.0.1:26300`;
- `api` слушает `127.0.0.1:26800`;
- production runtime запускается через `docker compose -f compose.prod.yml`;
- release-based deploy ведётся в `/opt/anaconda-site/releases`.

## Основные артефакты

- compose: `../compose.prod.yml`
- playbook: `../infra/ansible/deploy.yml`
- nginx template: `../infra/ansible/nginx.conf.j2`
- CI/CD contract: `./ci-cd.md`

## Директории на host

- `/opt/anaconda-site/releases/<release-id>`
- `/opt/anaconda-site/shared/env/.env.prod`
- `/opt/anaconda-site/shared/backups`
- `/opt/anaconda-site/current`

## Автоматический deploy

Поток:

1. push в `main`;
2. GitHub Actions публикует образы `web` и `api` в GHCR с тегом `${GITHUB_SHA}`;
3. GitHub Actions запускает Ansible deploy;
4. Ansible делает checkout релиза в `releases/<sha>`;
5. Ansible подтягивает контейнеры с тегом `${GITHUB_SHA}`;
6. после healthcheck переключается `current`;
7. при ошибке выполняется rollback на предыдущий release.

## Ручной deploy через Ansible

Из локальной Windows/WSL-среды:

```bash
make ansible-syntax
make ansible-status
make ansible-deploy ANSIBLE_REF=main RELEASE_ID=<release-id>
```

Если нужен rollback:

```bash
make ansible-rollback RELEASE_ID=<release-id>
```

## Проверка после выкладки

- `curl -f http://127.0.0.1:26300/`
- `curl -f http://127.0.0.1:26800/api/v1/health`
- `docker compose -f /opt/anaconda-site/current/compose.prod.yml --env-file /opt/anaconda-site/shared/env/.env.prod ps`

## Ограничения текущего baseline

- текущий репозиторий пока не содержит полноценный bootstrap playbook production host;
- TLS/domain hardening остаются отдельной задачей;
- перед реальным rollout нужно выровнять git-ветвление и перевести основной поток на `main`.