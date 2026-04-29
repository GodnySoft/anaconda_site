# Release Guide

## Назначение

Release flow должен выпускать рабочий public/runtime surface без расхождения между кодом, docs, runtime и deploy-сценарием.

## Источник production trigger

Production trigger — это успешный `push` в `main`.
Именно `main` должен быть основной веткой репозитория после выравнивания git-истории.

## Release prerequisites

Перед релизом должны проходить:

```bash
make lint
make typecheck
make build
make doctor
make prod-config
```

На GitHub дополнительно выполняются:

- frontend lint/typecheck/build;
- backend compile sanity;
- docker smoke с `web + api + postgres`;
- публикация образов в GHCR.

## Release артефакты

- `web` image: `ghcr.io/godnysoft/anaconda_site/web`
- `api` image: `ghcr.io/godnysoft/anaconda_site/api`
- release tag: `${GITHUB_SHA}`

## Автоматический deploy

После успешного pipeline на `main` workflow `Deploy to Production`:

1. берёт `head_sha` успешного run;
2. подготавливает `.env.prod` из `PROD_ENV_FILE`;
3. запускает `infra/ansible/deploy.yml` c `deployment_action=deploy`;
4. выкладывает новый release в `/opt/anaconda-site/releases/<sha>`;
5. переключает `current` на новый release только после успешных healthcheck.

## Manual operations

Для ручных операций используется workflow `Production Operations`:

- `status`
- `deploy`
- `rollback`

Локально тот же сценарий можно запускать через:

```bash
make ansible-status
make ansible-deploy ANSIBLE_REF=main RELEASE_ID=<release-id>
make ansible-rollback RELEASE_ID=<release-id>
```

## Rollback

Rollback обязателен при:

- failed healthcheck;
- runtime regression;
- broken public site;
- incompatibility migrations/runtime.

Автоматический rollback выполняется прямо в release playbook.
Ручной rollback выполняется через `rollback_release_id`.