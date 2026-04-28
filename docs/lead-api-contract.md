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
  "id": "...",
  "status": "accepted",
  "submitted_at": "..."
}
```

Validation checks:

- `consent=false` returns `422`.
- `message` shorter than 10 characters returns `422`.
- persistence failures return `500` with a generic message.

