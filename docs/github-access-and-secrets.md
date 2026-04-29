# GitHub, SSH и CI/CD: инструкция по подключению и заполнению секретов

## Цель

Подготовить доступ к GitHub и production host так, чтобы проект мог:

1. храниться и развиваться в GitHub;
2. собирать Docker-образы в GitHub Actions;
3. выполнять deploy на сервер через Ansible;
4. при необходимости выполнять rollback.

## Что уже ожидает проект

Текущий CI/CD-контур уже ориентируется на такие GitHub Secrets:

- `PROD_HOST`
- `PROD_USER`
- `PROD_SSH_PRIVATE_KEY`
- `PROD_ENV_FILE`
- `PROD_GHCR_USERNAME` (опционально)
- `PROD_GHCR_TOKEN` (опционально)

И на такие GitHub Variables:

- `PROD_APP_ROOT`
- `PROD_WEB_HEALTH_URL`
- `PROD_API_HEALTH_URL`

Полный локальный checklist уже вынесен в [../.env.example](../.env.example).

## Шаг 1. Получить доступ к репозиторию GitHub

### Если доступ уже есть

Проверь:

1. Открой репозиторий: [GodnySoft/anaconda_site](https://github.com/GodnySoft/anaconda_site)
2. Убедись, что ты можешь:
   - видеть код;
   - открывать Settings;
   - открывать Actions;
   - открывать Packages, если используем GHCR.

### Если доступа нет

Нужно, чтобы владелец репозитория выдал тебе доступ:

1. В GitHub открыть репозиторий.
2. `Settings` -> `Collaborators and teams`.
3. Добавить твой GitHub-аккаунт.
4. Для работы с Actions и secrets лучше иметь доступ уровня `Admin` или как минимум доступ, позволяющий менять repository settings.

## Шаг 2. Подключить GitHub в локальном git

Проверить remote:

```powershell
git remote -v
```

Если нужно явно назначить SSH-remote:

```powershell
git remote set-url origin git@github.com:GodnySoft/anaconda_site.git
```

Если нужен HTTPS-remote:

```powershell
git remote set-url origin https://github.com/GodnySoft/anaconda_site.git
```

Для постоянной инженерной работы предпочтительнее SSH.

## Шаг 3. Создать SSH-ключ для доступа к GitHub с твоей машины

### Вариант для Windows PowerShell

```powershell
ssh-keygen -t ed25519 -C "github-local-access" -f $HOME\.ssh\github_anaconda_site
```

Будет создано два файла:

- приватный ключ: `C:\Users\<user>\.ssh\github_anaconda_site`
- публичный ключ: `C:\Users\<user>\.ssh\github_anaconda_site.pub`

### Добавить ключ в GitHub

1. Открой GitHub.
2. `Settings` -> `SSH and GPG keys`.
3. `New SSH key`.
4. Вставь содержимое файла `.pub`.
5. Сохрани.

### Проверка

```powershell
ssh -T git@github.com
```

Если всё в порядке, GitHub подтвердит аутентификацию.

## Шаг 4. Создать deploy-ключ для GitHub Actions -> production server

Это **другой** ключ. Не тот, что для твоего локального git.

Создай отдельную пару:

```powershell
ssh-keygen -t ed25519 -C "github-actions-prod-deploy" -f .\infra\keys\prod_deploy_ed25519
```

Получишь:

- приватный ключ: `infra/keys/prod_deploy_ed25519`
- публичный ключ: `infra/keys/prod_deploy_ed25519.pub`

### Куда использовать эти файлы

- содержимое `infra/keys/prod_deploy_ed25519` нужно будет положить в GitHub Secret `PROD_SSH_PRIVATE_KEY`;
- содержимое `infra/keys/prod_deploy_ed25519.pub` нужно будет добавить на production server в `~/.ssh/authorized_keys` пользователя `deploy`.

## Шаг 5. Подготовить пользователя на production server

На сервере должен существовать пользователь, через которого Ansible делает deploy.

Рекомендуемый пользователь:

- `deploy`

Что должно быть готово на сервере:

1. Пользователь `deploy` существует.
2. У него есть доступ к Docker.
3. У него есть доступ к директории приложения, по умолчанию `/opt/anaconda-site`.
4. Публичный deploy-ключ добавлен в:

```bash
/home/deploy/.ssh/authorized_keys
```

Если у тебя root-доступ и пользователя ещё нет, базовая схема такая:

```bash
sudo adduser deploy
sudo usermod -aG docker deploy
sudo mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo nano /home/deploy/.ssh/authorized_keys
sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo mkdir -p /opt/anaconda-site
sudo chown -R deploy:deploy /opt/anaconda-site
```

## Шаг 6. Подготовить production env-файл

Нужен файл `.env.prod`, который будет использоваться на сервере.

Минимально там должны быть корректно заполнены runtime-переменные проекта, например:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `ANACONDA_WEB_PORT`
- `ANACONDA_API_PORT`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `APP_ENV=production`
- `CORS_ALLOWED_ORIGINS`

Содержимое этого файла целиком нужно будет сохранить в GitHub Secret `PROD_ENV_FILE`.

То есть в secret кладётся не путь к файлу, а **весь текст `.env.prod`**.

## Шаг 7. Создать GitHub Secrets

Открой:

1. GitHub repository
2. `Settings`
3. `Secrets and variables`
4. `Actions`
5. Вкладка `Secrets`

Создай такие secrets.

### Обязательные

#### `PROD_HOST`
IP или DNS production server.

Пример:

```text
31.56.228.78
```

#### `PROD_USER`
Пользователь для deploy.

Пример:

```text
deploy
```

#### `PROD_SSH_PRIVATE_KEY`
Содержимое файла:

```text
infra/keys/prod_deploy_ed25519
```

Вставлять нужно весь приватный ключ целиком, включая:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

#### `PROD_ENV_FILE`
Полное содержимое `.env.prod`.

### Опциональные

#### `PROD_GHCR_USERNAME`
Обычно можно указать GitHub username, например:

```text
GodnySoft
```

#### `PROD_GHCR_TOKEN`
Нужен только если стандартного `GITHUB_TOKEN` окажется недостаточно для доступа к GHCR с сервера.

Если создаёшь Personal Access Token, то ему обычно нужны права на packages, а при необходимости и на repo.

## Шаг 8. Создать GitHub Variables

Открой:

1. GitHub repository
2. `Settings`
3. `Secrets and variables`
4. `Actions`
5. Вкладка `Variables`

Создай:

### `PROD_APP_ROOT`

```text
/opt/anaconda-site
```

### `PROD_WEB_HEALTH_URL`

```text
http://127.0.0.1:26300/
```

### `PROD_API_HEALTH_URL`

```text
http://127.0.0.1:26800/api/v1/health
```

## Шаг 9. Подключить GitHub Packages / GHCR

Для текущего workflow образы публикуются в:

- `ghcr.io/godnysoft/anaconda_site/api`
- `ghcr.io/godnysoft/anaconda_site/web`

Что проверить:

1. В репозитории включены GitHub Actions.
2. У workflow есть право `packages: write`.
3. Владелец репозитория может видеть packages в GitHub.

Если серверу нужен явный логин в GHCR, используется:

```bash
docker login ghcr.io
```

с `PROD_GHCR_USERNAME` и `PROD_GHCR_TOKEN`.

## Шаг 10. Что именно заполнять у себя в `.env.example`

В [../.env.example](../.env.example) я уже добавил:

- GitHub repository block;
- GHCR block;
- production host block;
- local file checklist для deploy-ключа и `.env.prod`;
- GitHub Secrets checklist;
- GitHub Variables checklist.

Твоя задача:

1. заполнить эти поля локально;
2. по ним же руками перенести значения в GitHub Secrets / Variables.

## Что важно не перепутать

### 1. Локальный git SSH-ключ и deploy SSH-ключ — это не одно и то же

Нужно держать их раздельно.

### 2. `PROD_ENV_FILE` — это содержимое файла, а не путь

В GitHub Secret кладётся именно текст `.env.prod`.

### 3. `.env.example` — это checklist, а не источник GitHub Secrets

GitHub Actions не читает secrets из `.env.example`.
Они должны быть заведены в интерфейсе GitHub.

### 4. Реальный push/deploy мы пока не включаем

Сначала нужно выровнять git-состояние проекта и безопасно перейти на `main`.

## Минимальный порядок действий для тебя

1. Проверить доступ к репозиторию и Settings в GitHub.
2. Создать локальный SSH-ключ для GitHub.
3. Создать отдельный deploy-ключ для production server.
4. Добавить публичный deploy-ключ на сервер пользователю `deploy`.
5. Подготовить `.env.prod`.
6. Создать GitHub Secrets.
7. Создать GitHub Variables.
8. Сообщить мне, когда всё заполнено.

После этого я смогу перейти к следующему этапу: выравнивание git-состояния, перевод на `main` и подготовка к первому реальному release cycle.