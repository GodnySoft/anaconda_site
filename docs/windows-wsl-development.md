# Windows + WSL Development Bootstrap

## Цель

Этот сценарий подготавливает локальную среду разработки для проекта `ANACONDA / ОСНОВА` на Windows по модели:

- Windows 10/11
- WSL 2
- Ubuntu
- GNU Make внутри Ubuntu
- Docker Desktop с WSL Integration

Это основной рекомендуемый путь для локальной разработки. Он стабильнее и предсказуемее, чем попытка собирать весь стек нативно в PowerShell.

## Что автоматизируется

Скрипт [bootstrap_windows_wsl_dev.ps1](G:\OSNOVA\soft\anaconda_site\infra\scripts\bootstrap_windows_wsl_dev.ps1):

- проверяет наличие `wsl.exe`;
- проверяет наличие дистрибутива `Ubuntu`;
- при явном флаге может запустить установку WSL и Ubuntu;
- проверяет наличие Docker Desktop;
- при явном флаге пытается установить Docker Desktop через `winget`;
- внутри Ubuntu устанавливает:
  - `make`
  - `git`
  - `curl`
  - `ca-certificates`
  - `build-essential`

## Что не автоматизируется полностью

- первичный reboot после `wsl --install`;
- создание Linux-пользователя при первом запуске Ubuntu;
- вход в Docker Desktop;
- ручное подтверждение некоторых installer-диалогов;
- включение WSL Integration в Docker Desktop, если пользователь ранее её отключал.

Это сделано намеренно: эти шаги завязаны на GUI и системные политики Windows.

## Базовый сценарий запуска

Запуск из PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\infra\scripts\bootstrap_windows_wsl_dev.ps1 `
  -InstallMissingWindowsComponents `
  -InstallDockerDesktopWithWinget
```

Если WSL и Ubuntu уже установлены, достаточно:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\infra\scripts\bootstrap_windows_wsl_dev.ps1
```

## Рекомендуемый порядок настройки

1. Запустить bootstrap-скрипт.
2. Если скрипт установил WSL, перезагрузить Windows.
3. Один раз открыть Ubuntu и завершить создание Linux-пользователя.
4. Установить и запустить Docker Desktop.
5. Включить интеграцию:
   `Docker Desktop -> Settings -> Resources -> WSL Integration -> Ubuntu`
6. Внутри Ubuntu проверить:

```bash
make --version
git --version
docker version
```

## Где держать репозиторий

Для `Node.js`, bind mounts и Docker Desktop лучше работать **внутри файловой системы Linux**:

```bash
~/projects/anaconda_site
```

Нежелательный вариант:

```bash
/mnt/g/OSNOVA/soft/anaconda_site
```

Причины:

- медленнее файловые операции;
- чаще проблемы с правами;
- выше риск нестабильных bind mounts для `node_modules`, `.next`, Python cache и Docker volumes.

## Предпочтительный рабочий поток

Внутри Ubuntu:

```bash
cd ~/projects/anaconda_site
make init
make up
```

Для production-like локальной проверки:

```bash
make prod-config
make prod-up
make prod-smoke
make prod-down
```

## Ручной fallback

Если автоустановка недоступна:

1. Установить WSL по Microsoft Learn:
   [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Установить Docker Desktop по Docker Docs:
   [Install Docker Desktop on Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
3. Внутри Ubuntu вручную выполнить:

```bash
sudo apt-get update
sudo apt-get install -y make git curl ca-certificates build-essential
```

## Ограничения текущего проекта

Этот bootstrap подготавливает среду, но не гарантирует, что сам проект уже полностью исполним. После подготовки среды всё равно нужно отдельно проверить:

- сборку `web`;
- запуск `api`;
- локальный `docker compose up`;
- соответствие runtime-кода текущим compose-файлам.
