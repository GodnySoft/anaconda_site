SHELL := powershell.exe
.SHELLFLAGS := -NoProfile -Command

ANSIBLE_INVENTORY ?= infra/ansible/inventory
ANSIBLE_REF ?= main
RELEASE_ID ?=
WSL_DISTRO ?= Ubuntu
WSL_PROJECT_PATH ?= /mnt/g/OSNOVA/soft/anaconda_site

.PHONY: help init config doctor up dev down logs ps build rebuild clean \
        prod-config prod-up prod-down prod-logs prod-ps prod-build prod-smoke \
        lint typecheck test smoke ansible-syntax ansible-status ansible-deploy ansible-rollback

help:
	Write-Host "Доступные команды:"
	Write-Host "  make init             - создать .env и .env.prod из .env.example, если их нет"
	Write-Host "  make doctor           - проверить env-файлы и валидность compose-конфигов"
	Write-Host "  make up               - поднять локальный dev-стек в фоне"
	Write-Host "  make dev              - поднять локальный dev-стек в foreground"
	Write-Host "  make down             - остановить локальный dev-стек"
	Write-Host "  make logs             - показать логи dev-стека"
	Write-Host "  make ps               - показать состояние dev-контейнеров"
	Write-Host "  make build            - пересобрать dev-образы"
	Write-Host "  make clean            - остановить dev/prod-контуры и удалить volumes"
	Write-Host "  make prod-up          - поднять production-like стек локально"
	Write-Host "  make prod-down        - остановить production-like стек"
	Write-Host "  make prod-smoke       - проверить локальный production-like контур"
	Write-Host "  make lint             - запустить frontend lint в контейнере"
	Write-Host "  make typecheck        - запустить TypeScript typecheck в контейнере"
	Write-Host "  make ansible-syntax   - syntax-check release playbook через WSL"
	Write-Host "  make ansible-status   - статус production через Ansible и WSL"
	Write-Host "  make ansible-deploy   - ручной deploy выбранного ref через Ansible и WSL"
	Write-Host "  make ansible-rollback - rollback на RELEASE_ID через Ansible и WSL"

init:
	if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env" }
	if (-not (Test-Path ".env.prod")) { Copy-Item ".env.example" ".env.prod" }
	Write-Host "Env-файлы готовы."

config: init
	docker compose -f docker-compose.yml config

doctor: init
	docker compose -f docker-compose.yml config | Out-Null
	docker compose -f compose.prod.yml --env-file .env.prod config | Out-Null
	Write-Host "Compose-конфиги валидны."

up: init
	docker compose -f docker-compose.yml up -d --build

dev: init
	docker compose -f docker-compose.yml up --build

down:
	docker compose -f docker-compose.yml down --remove-orphans

logs:
	docker compose -f docker-compose.yml logs -f --tail=200

ps:
	docker compose -f docker-compose.yml ps

build: init
	docker compose -f docker-compose.yml build

rebuild: down build up

clean:
	docker compose -f docker-compose.yml down -v --remove-orphans
	docker compose -f compose.prod.yml --env-file .env.prod down -v --remove-orphans

prod-config: init
	docker compose -f compose.prod.yml --env-file .env.prod config

prod-build: init
	docker compose -f compose.prod.yml --env-file .env.prod build

prod-up: init
	docker compose -f compose.prod.yml --env-file .env.prod up -d --build

prod-down:
	docker compose -f compose.prod.yml --env-file .env.prod down --remove-orphans

prod-logs:
	docker compose -f compose.prod.yml --env-file .env.prod logs -f --tail=200

prod-ps:
	docker compose -f compose.prod.yml --env-file .env.prod ps

lint:
	docker compose -f docker-compose.yml run --rm web npm run lint

typecheck:
	docker compose -f docker-compose.yml run --rm web sh -lc "npx tsc --noEmit"

test:
	Write-Host "Автотесты в репозитории пока не реализованы. Target оставлен как явный маркер пробела."

smoke: up
	$$webStatus = (Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:26300").StatusCode
	$$apiStatus = (Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:26800/api/v1/health").StatusCode
	Write-Host ("Smoke OK. Web=" + $$webStatus + ", API=" + $$apiStatus)

prod-smoke: prod-up
	$$webStatus = (Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:26300").StatusCode
	$$apiStatus = (Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:26800/api/v1/health").StatusCode
	Write-Host ("Production-like smoke OK. Web=" + $$webStatus + ", API=" + $$apiStatus)

ansible-syntax:
	powershell -ExecutionPolicy Bypass -File infra/scripts/run_ansible_wsl_dev.ps1 -Action syntax -Inventory "$(ANSIBLE_INVENTORY)" -WslDistro "$(WSL_DISTRO)" -ProjectPath "$(WSL_PROJECT_PATH)"

ansible-status:
	powershell -ExecutionPolicy Bypass -File infra/scripts/run_ansible_wsl_dev.ps1 -Action status -Inventory "$(ANSIBLE_INVENTORY)" -WslDistro "$(WSL_DISTRO)" -ProjectPath "$(WSL_PROJECT_PATH)"

ansible-deploy:
	powershell -ExecutionPolicy Bypass -File infra/scripts/run_ansible_wsl_dev.ps1 -Action deploy -Inventory "$(ANSIBLE_INVENTORY)" -Ref "$(ANSIBLE_REF)" -ReleaseId "$(RELEASE_ID)" -WslDistro "$(WSL_DISTRO)" -ProjectPath "$(WSL_PROJECT_PATH)"

ansible-rollback:
	powershell -ExecutionPolicy Bypass -File infra/scripts/run_ansible_wsl_dev.ps1 -Action rollback -Inventory "$(ANSIBLE_INVENTORY)" -ReleaseId "$(RELEASE_ID)" -WslDistro "$(WSL_DISTRO)" -ProjectPath "$(WSL_PROJECT_PATH)"