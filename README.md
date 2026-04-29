# ANACONDA / OSNOVA

Публичная и demo-поверхность инструмента `ANACONDA` в экосистеме `ОСНОВА`.

## Локальный запуск

Текущий локальный контур поднимается через Docker Compose и `Makefile`.

Для Windows рекомендуется сценарий:

- `WSL 2`
- `Ubuntu`
- `make` внутри Ubuntu
- `Docker Desktop` с включенной `WSL Integration`

Подробная инструкция:

- [docs/windows-wsl-development.md](G:\OSNOVA\soft\anaconda_site\docs\windows-wsl-development.md)

PowerShell bootstrap:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\infra\scripts\bootstrap_windows_wsl_dev.ps1
```

1. Подготовить env-файлы:

```powershell
make init
```

2. Поднять dev-стек:

```powershell
make up
```

3. Проверить состояние:

```powershell
make doctor
make ps
make logs
```

Основные адреса:

- Web: `http://localhost:26300`
- API docs: `http://localhost:26800/docs`
- Health: `http://localhost:26800/api/v1/health`

Остановить локальный стек:

```powershell
make down
```

## Production-like локальная проверка

```powershell
make prod-config
make prod-up
make prod-smoke
make prod-down
```

## Доступные маршруты

- `/`
- `/implementation-levels`
- `/demo`
- `/workspace`
- `/chatbot`

## Важно

- `.env.example` в текущем тестовом контуре используется как базовый шаблон для локальной проверки.
- `make test` сейчас носит информационный характер: полноценный автотестовый контур в репозитории ещё не реализован.
- Git-состояние локальной копии после проблемного Windows-clone требует отдельного выравнивания перед следующими коммитами.
