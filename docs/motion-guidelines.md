# Motion Guidelines

## Principles

- Motion должен объяснять систему, а не отвлекать.
- Анимации опираются на `transform` и `opacity`.
- Постоянные эффекты ограничены hero-секцией.
- На mobile применяется упрощенная версия motion.

## Hero

- SVG/DOM-схема показывает `Chaos → Control`: Telegram, WhatsApp, MAX, Email, Excel, 1С, CRM, звонки и базы данных сходятся в окно `ANACONDA`.
- Линии данных проходят по маршрутам без тяжелых particles и без 3D.
- Центральное окно появляется после источников и показывает чат, контекст 1С и действие менеджера.

## Scroll storytelling

- Секции проявляются по мере входа во viewport.
- Блок “Как это работает” получает пошаговое появление, чтобы имитировать прохождение потока данных.
- Карточки реагируют на hover только subtle border/background/translate effects.

## Accessibility

- При `prefers-reduced-motion` отключаются бесконечные анимации и hover physics.
- Все ключевые состояния остаются читаемыми без motion.
- Запрещены aggressive parallax, gaming-like effects, crypto landing aesthetics и meaningless motion.
