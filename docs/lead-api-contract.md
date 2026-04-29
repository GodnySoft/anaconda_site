# Lead API Contract

## Health

```http
GET /api/v1/health
```

Expected response:

```json
{"status":"ok"}
```

## Create lead

```http
POST /api/v1/leads
Content-Type: application/json
```

Payload:

```json
{
  "name": "Иван",
  "company": "ПромСнаб",
  "contact": "ivan@example.com",
  "message": "Нужно объединить 1С, почту и мессенджеры в единое окно.",
  "consent": true,
  "source_page": "landing"
}
```

Expected success:

```json
{
  "id": 1,
  "name": "Иван",
  "company": "ПромСнаб",
  "contact": "ivan@example.com",
  "message": "Нужно объединить 1С, почту и мессенджеры в единое окно.",
  "consent": true,
  "source_page": "landing",
  "created_at": "2026-04-29T10:39:43.722679+00:00"
}
```

Validation checks:

- `consent=false` returns `422`;
- `message` shorter than 10 characters returns `422`;
- missing required fields return `422`;
- persistence failures return `500`.

## Persistence model

Lead persistence и схема ответа синхронизированы с SQLAlchemy-моделью `Lead` и Alembic-миграциями.
Любое изменение полей этого контракта должно сопровождаться:

1. изменением модели;
2. новой миграцией;
3. обновлением этой документации.