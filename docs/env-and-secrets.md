# ANACONDA Env and Secrets Contract

## Runtime ports

External host ports use the ANACONDA namespace and avoid common defaults:

- `ANACONDA_WEB_PORT=26300`
- `ANACONDA_API_PORT=26800`
- `ANACONDA_POSTGRES_PORT=26543`
- `ANACONDA_PGWEB_PORT=26081`

Container ports stay standard: Next.js `3000`, FastAPI `8000`, PostgreSQL `5432`.

## Secret rules

- Real secrets live only in `.env`, `.env.prod`, CI/CD secrets, or host-level secret storage.
- `*.example` files contain only safe placeholders.
- Never put secrets into `NEXT_PUBLIC_*`; эти переменные видны в браузерном bundle.
- Backend-only secrets include `POSTGRES_PASSWORD`, `DATABASE_URL`, future webhook tokens, SMTP credentials, messenger credentials, и внешние API-ключи.

## Required variables

- `ANACONDA_WEB_PORT` — внешний порт для веб-сервиса.
- `ANACONDA_API_PORT` — внешний порт для API.
- `ANACONDA_POSTGRES_PORT` — внешний порт для PostgreSQL.
- `ANACONDA_PGWEB_PORT` — внешний порт для `pgweb` (debug-only).
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `APP_ENV`
- `CORS_ALLOWED_ORIGINS`

## Smoke checks

После запуска `docker compose -f compose.prod.yml --env-file .env.prod up --build -d` проверьте, что API отвечает и прием лидов работает:

```bash
curl -fsS http://127.0.0.1:26800/api/v1/health
curl -fsS -X POST http://127.0.0.1:26800/api/v1/leads \
  -H 'Content-Type: application/json' \
  -d '{"name":"Иван","company":"ПромСнаб","contact":"ivan@example.com","message":"Нужно объединить 1С, почту и мессенджеры в единое окно.","consent":true,"source_page":"smoke"}'
```

## Production rotation

1. Update `.env.prod` on the host or release secret source.
2. Restart the affected Compose services.
3. Run `GET /api/v1/health`.
4. Submit a test lead through `POST /api/v1/leads`.

