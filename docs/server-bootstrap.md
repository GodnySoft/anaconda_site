# Server Bootstrap

## Назначение

Документ фиксирует, что требуется от production host до запуска release-based deploy.

## Минимальный baseline host

- Linux host с доступом по SSH;
- установлен Docker Engine;
- установлен Docker Compose plugin или совместимый `docker compose`;
- установлен `nginx`;
- создан app root `/opt/anaconda-site`;
- настроен доступ пользователя deploy к Docker и к директории приложения.

## Что нужно подготовить до первого deploy

- `/opt/anaconda-site/releases`
- `/opt/anaconda-site/shared/env`
- `/opt/anaconda-site/shared/backups`
- `nginx` reverse proxy на `127.0.0.1:26300` и `127.0.0.1:26800`
- SSH-доступ для Ansible и GitHub Actions

## Текущий статус

В репозитории есть production deploy playbook:

- `../infra/ansible/deploy.yml`

Но полноценный bootstrap playbook production host пока отсутствует.
Это отдельный следующий инфраструктурный слой, который ещё нужно реализовать, если мы хотим reproducible provisioning с нуля.

## До появления bootstrap playbook

Хост подготавливается вручную, а затем поддерживается через:

- GitHub Actions deploy;
- ручной Ansible deploy/rollback/status.