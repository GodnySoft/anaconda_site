# Техническое задание — Этап 5
# ANACONDA AI Chatbot

## Корпоративный AI-помощник компании

---

## 1. Цель этапа

Разработать отдельную страницу AI Chatbot — интерфейс корпоративного ИИ-помощника ANACONDA.

Главная задача:

показать, как ANACONDA превращает внутренние знания, историю клиентов, документы, аналитику и рабочие процессы в доступного AI-эксперта для сотрудников и руководителей.

Это не публичный “чат-бот для сайта”.

Это:

- внутренний AI-помощник компании;
- интерфейс к базе знаний;
- помощник менеджера;
- помощник руководителя;
- эксперт по внутренним документам;
- будущий слой RAG / корпоративной памяти.

Главная мысль:

**AI в ANACONDA не живет отдельно. Он понимает контекст бизнеса, клиентов, документов и процессов.**

---

## 2. Связь с предыдущими этапами

Этап 5 должен быть архитектурно связан с уже созданными поверхностями:

### Этап 1 — Public MVP

- использует общий layout;
- использует общую визуальную систему;
- сохраняет русский язык и понятный B2B narrative;
- может вести пользователя к заявке / аудиту.

### Этап 2 — Уровни внедрения

AI Chatbot соответствует уровню 5 внедрения:

- AI-помощник компании;
- работа с внутренней документацией;
- экспертные ответы;
- рекомендации по клиентам и процессам.

### Этап 3 — Demo Surface

AI должен уметь объяснять сценарии из demo:

- что происходило с клиентом;
- какие счета были выставлены;
- какие действия нужны дальше;
- где есть риск.

### Этап 4 — Chat Workspace

AI Chatbot должен быть связан с Workspace:

- получать контекст из рабочих каналов;
- использовать историю сообщений;
- помогать сотрудникам прямо в рабочем процессе;
- в будущем создавать задачи и рекомендации.

---

## 3. Страница

### URL

`/chatbot`

## Основные блоки

1. Header
2. AI Chatbot Hero
3. Chat Interface
4. Knowledge Sources Panel
5. Context Panel
6. Example Prompts
7. Provider Architecture Explanation
8. Security / On-Prem Trust Block
9. CTA на AI-аудит
10. Footer

---

## 4. Технологический стек

### Frontend

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- streaming-ready chat UI
- markdown rendering для ответов
- code-safe rendering при необходимости

### Backend

- FastAPI
- PostgreSQL
- pgvector-ready architecture
- provider abstraction layer
- conversation sessions
- message history
- audit logging

### LLM Providers

Архитектура должна быть provider-agnostic.

Поддерживаемые будущие направления:

- OpenRouter
- OpenAI API
- Gemini
- Claude
- Ollama
- Llama / локальные модели
- Open WebUI как возможная внешняя поверхность
- FastLLM / внутренний gateway
- on-prem inference

Важно:

frontend не должен напрямую обращаться к LLM API.

Все запросы идут через backend-gateway.

---

## 5. Архитектурный принцип

## Нельзя

- хранить API-ключи на frontend;
- обращаться к OpenAI / Gemini / OpenRouter напрямую из браузера;
- смешивать demo-данные и реальные данные без слоя доступа;
- делать AI как отдельный disconnected chat;
- обещать пользователю доступ к данным, которых нет в системе.

## Нужно

- сделать backend abstraction layer;
- подготовить provider interface;
- хранить историю диалогов;
- учитывать source_page / source_module;
- логировать действия;
- готовить RAG-ready структуру;
- оставить возможность подключить Open WebUI iframe / reverse proxy в будущем.

---

## 6. User Experience

### Hero Title

# AI-помощник, который понимает ваш бизнес

### Subtitle

ANACONDA может изучать внутренние документы, историю клиентов, переписки, счета и аналитику — чтобы помогать сотрудникам отвечать быстрее и принимать решения точнее.

### CTA

- Запросить AI-аудит
- Посмотреть пример работы

---

## 7. Chat Interface

Центральная часть страницы — ChatGPT-like интерфейс.

### Состав

- список диалогов / сессий слева;
- центральное окно сообщений;
- поле ввода;
- кнопка отправки;
- индикатор генерации ответа;
- блок источников ответа;
- быстрые подсказки;
- выбор режима работы.

### Режимы работы

1. `Документы`
   - ответы по внутренним регламентам и документации.

2. `Клиенты`
   - ответы по истории взаимодействий с клиентом.

3. `Продажи`
   - помощь менеджеру, рекомендации по следующему действию.

4. `Руководитель`
   - краткие сводки, риски, просрочки, KPI.

5. `Технический эксперт`
   - помощь по продуктам, инструкциям, интеграциям.

На этапе 5 допустимо реализовать режимы как UI-ready mock, но архитектура должна быть готова к реальному backend подключению.

---

## 8. Example Prompts

На странице должны быть готовые примеры запросов.

### Для менеджера

- `Что известно по клиенту ООО ПромСнаб?`
- `Какие были последние договоренности?`
- `Что предложить клиенту дальше?`
- `Есть ли у клиента задолженность?`

### Для руководителя

- `Где сейчас самые рискованные сделки?`
- `Какие клиенты давно без контакта?`
- `Кто из менеджеров перегружен?`
- `Какие оплаты зависли?`

### Для сотрудника

- `Как оформить счет по регламенту?`
- `Где найти инструкцию по возврату?`
- `Какие правила работы с новым клиентом?`

### Для технического специалиста

- `Как подключается 1С?`
- `Какие данные можно индексировать?`
- `Как работает on-prem контур?`

---

## 9. Knowledge Sources Panel

AI должен визуально показывать, на какие источники он может опираться.

Источники:

- документы компании;
- регламенты;
- история переписок;
- звонки и расшифровки;
- счета;
- оплаты;
- CRM-данные;
- 1С / ERP;
- аналитика;
- база знаний.

Важно:

на этапе 5 это может быть визуальный слой, но структура должна быть RAG-ready.

---

## 10. Context Panel

Справа от чата должна быть контекстная панель.

Показывает:

- выбранный режим;
- подключенные источники;
- уровень доступа;
- последние найденные документы;
- связанные клиенты;
- предупреждение о режиме demo, если данные mock.

Принцип:

AI всегда должен объяснять, с каким контекстом он работает.

---

## 11. Provider Architecture Block

На странице нужен простой блок для CTO:

# Не привязаны к одной модели

ANACONDA может работать через разные AI-провайдеры:

- облачные API;
- защищенные gateway;
- локальные модели;
- on-prem контур;
- Open WebUI;
- OpenRouter;
- Gemini;
- Ollama.

Текст должен быть простым:

`Мы подбираем AI-контур под требования компании: скорость, стоимость, безопасность и уровень изоляции.`

---

## 12. Security / Trust Block

### Заголовок

# Данные компании под контролем

Пояснить:

- ключи не хранятся на frontend;
- запросы проходят через backend;
- доступ зависит от роли сотрудника;
- ответы могут логироваться;
- можно развернуть on-prem;
- можно подключить локальные модели;
- можно ограничивать источники знаний.

Важно:

не обещать абсолютную безопасность.

Формулировать профессионально:

`Архитектура готовится к безопасному enterprise-внедрению и изолированным контурам.`

---

## 13. Backend Contracts

На этапе 5 нужно подготовить или описать future-ready API.

### Recommended endpoints

```text
POST /api/v1/ai/sessions
GET  /api/v1/ai/sessions
GET  /api/v1/ai/sessions/{session_id}
POST /api/v1/ai/sessions/{session_id}/messages
GET  /api/v1/ai/providers
GET  /api/v1/ai/knowledge-sources
```

Если backend пока не реализуется полностью, нужно:

- описать contracts в docs;
- использовать mock adapter на frontend;
- не блокировать UI;
- оставить clean migration path.

---

## 14. Data Models

Future-ready сущности:

```text
ai_sessions
ai_messages
ai_provider_configs
ai_knowledge_sources
ai_retrieval_events
ai_audit_events
```

### ai_sessions

- id
- user_id / demo_user_id
- mode
- title
- created_at
- updated_at

### ai_messages

- id
- session_id
- role
- content
- provider
- model
- tokens_in
- tokens_out
- created_at

### ai_knowledge_sources

- id
- type
- title
- status
- access_scope
- last_indexed_at

### ai_audit_events

- id
- actor
- action
- source
- metadata
- created_at

---

## 15. Open WebUI Integration Option

Нужно предусмотреть возможность отдельной интеграции Open WebUI.

Варианты:

### Вариант A — iframe / embedded surface

- быстро для demo;
- требует настройки reverse proxy;
- важно проверить CSP;
- не использовать для production без security review.

### Вариант B — отдельный route + reverse proxy

- `/chatbot/open-webui`
- проксирование через nginx;
- отдельная авторизация;
- контроль cookies / headers.

### Вариант C — собственный Chat UI

- лучший вариант для ANACONDA UX;
- полный контроль дизайна;
- проще встроить бизнес-контекст;
- дольше в разработке.

Рекомендация для этапа 5:

сделать собственный UI с mock/provider-ready архитектурой, а Open WebUI оставить как интеграционный вариант в документации.

---

## 16. Component Structure

```text
web/
  app/
    chatbot/
      page.tsx
  components/
    chatbot/
      ChatbotShell.tsx
      ChatSessionSidebar.tsx
      ChatMessageList.tsx
      ChatMessage.tsx
      ChatInput.tsx
      ModeSelector.tsx
      ExamplePromptGrid.tsx
      KnowledgeSourcesPanel.tsx
      AIContextPanel.tsx
      ProviderArchitectureBlock.tsx
      SecurityTrustBlock.tsx
    sections/
      ChatbotHero.tsx
      ChatbotCTA.tsx
  lib/
    ai/
      aiClient.ts
      mockAiAdapter.ts
      providerTypes.ts
      promptExamples.ts
      knowledgeSources.ts
```

---

## 17. UX и визуальный стиль

### Стиль

- чистый ChatGPT-like интерфейс;
- enterprise trust;
- без ощущения игрушки;
- понятный режим работы;
- видимые источники знаний;
- спокойная анимация;
- визуальная связь с ANACONDA Workspace.

### Язык

Только русский язык.

Писать просто:

не `RAG pipeline`,
а `ответы по документам и истории компании`.

Но в технической документации можно указать RAG-ready архитектуру.

---

## 18. Анимации

### Использовать

- message streaming effect;
- typing indicator;
- prompt card hover;
- panel fade-in;
- source chips reveal;
- mode switch transition.

### Не использовать

- тяжелые эффекты;
- particles;
- 3D;
- мигающие элементы;
- “магический AI” визуал без смысла.

### Mobile

На mobile:

- sidebar скрывается;
- режимы — горизонтальные chips;
- context panel открывается drawer-ом;
- input всегда доступен;
- высота экрана учитывает keyboard behavior.

---

## 19. Performance

Требования:

- Lighthouse mobile ≥ 80;
- быстрый first render;
- mock streaming без блокировки UI;
- markdown rendering lazy/safe;
- минимум тяжелых зависимостей;
- без real LLM call на frontend.

---

## 20. SEO

### Title

`AI Chatbot ANACONDA — корпоративный ИИ-помощник компании`

### Description

`AI-помощник ANACONDA помогает сотрудникам работать с документами, клиентской историей, аналитикой и внутренними знаниями компании.`

---

## 21. Documentation

Обязательно обновить:

```text
docs/chatbot-page.md
docs/ai-provider-architecture.md
docs/ai-chat-contracts.md
docs/rag-ready-architecture.md
docs/open-webui-integration.md
docs/ai-security.md
```

Фиксировать:

- назначение страницы;
- UI режимы;
- mock vs real provider behavior;
- backend contracts;
- provider abstraction;
- Open WebUI варианты;
- security constraints;
- mobile behavior.

---

## 22. Definition of Done

Этап считается завершенным, если:

- страница `/chatbot` готова;
- реализован ChatGPT-like UI;
- есть режимы работы;
- есть example prompts;
- есть knowledge sources panel;
- есть context panel;
- есть provider architecture block;
- есть security block;
- frontend не хранит secrets;
- LLM вызовы не идут напрямую из браузера;
- есть mock/provider-ready adapter;
- mobile версия адаптирована;
- документация обновлена;
- проходят lint / typecheck / build.

---

## 23. Команды проверки

```bash
make lint
make test
make typecheck
make build
make prod-smoke
```

---

## 24. Инструкция для Codex / AI-агента

1. Используй архитектуру Этапов 1–4.
2. Не делай AI Chatbot отдельной игрушкой.
3. Свяжи страницу с Workspace, Demo и уровнями внедрения.
4. Не храни API-ключи на frontend.
5. Не делай прямых запросов к LLM из браузера.
6. Подготовь provider-agnostic architecture.
7. Сделай mock adapter, если real backend еще не готов.
8. Подготовь future-ready API contracts.
9. Все тексты на русском языке.
10. Mobile-first обязателен.
11. Обнови документацию.
12. Перед завершением прогони проверки.

Главная задача:

Создать страницу, после которой клиент понимает:

ANACONDA может стать не просто системой учета коммуникаций, а корпоративным AI-экспертом, который знает документы, клиентов, процессы и помогает сотрудникам принимать решения быстрее.
