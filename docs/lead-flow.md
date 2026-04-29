# Lead Flow

## Endpoint

`POST /api/v1/leads`

## Payload

```json
{
  "name": "Иван",
  "company": "ООО Пример",
  "contact": "+7... / @telegram / email",
  "message": "Хочу аудит процессов продаж",
  "consent": true,
  "source_page": "home"
}
```

## Источники отправки

- `home`
  Главная страница `../web/pages/index.tsx`
- `contacts`
  Контактная страница `../web/pages/contacts.tsx`

## Компонент

- `../web/components/PublicLeadForm.tsx`

## UX-правила

- повторная отправка во время `loading` запрещена;
- без `consent = true` отправка не выполняется;
- success state не требует перезагрузки страницы;
- error state не очищает пользовательские данные;
- `NEXT_PUBLIC_API_URL` используется, если задан; иначе локальный default — `http://localhost:26800`.

## Проверка

1. Открыть `/` или `/contacts`.
2. Заполнить обязательные поля.
3. Подтвердить согласие на обработку данных.
4. Убедиться, что backend возвращает `200` и запись сохраняется в БД.
