# Страница контактов

## Цель

Страница `/contacts` должна давать быстрый канал связи и дублировать lead flow Этапа 1 без расхождения по контракту и UX.

## Структура

1. Hero-блок
   Кратко объясняет, зачем обращаться и с чем можно приходить.
2. Быстрые каналы связи
   Telegram, WhatsApp, email и телефон как быстрые точки входа.
3. Контекст старта
   Блок с пояснением, что достаточно подготовить для первого разговора.
4. Lead form
   Переиспользует `PublicLeadForm` с `source_page = contacts`.

## Файлы

- страница: `../web/pages/contacts.tsx`
- layout: `../web/components/PublicSiteLayout.tsx`
- форма: `../web/components/PublicLeadForm.tsx`
- стили: `../web/styles/globals.css`

## Проверки

- `GET /contacts` отдаёт страницу без runtime-ошибок
- контактные карточки открывают соответствующие действия
- форма отправляет `source_page = contacts`
- success/error state работают без перезагрузки страницы
