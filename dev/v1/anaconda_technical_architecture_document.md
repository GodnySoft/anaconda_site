# ANACONDA — Technical Architecture & Development Document

## Fullstack Platform Architecture

---

# 1. Назначение документа

Данный документ фиксирует:

- техническую архитектуру сайта ANACONDA;
- используемый стек технологий;
- подходы к разработке;
- структуру frontend и backend;
- deployment topology;
- CI/CD подход;
- DevSecOps требования;
- правила документации;
- принципы масштабирования;
- готовность к SaaS / B2B / On-Prem развитию.

Главная задача:

создать не просто сайт, а production-ready enterprise web platform.

ANACONDA — это:

- единое окно;
- Digital Symbiont Platform;
- business nervous system;
- AI orchestration layer;
- operational memory;
- secure enterprise infrastructure.

Сайт должен отражать это не только визуально, но и архитектурно.

---

# 2. Архитектурный принцип

## Core Principle

Мы строим:

не лендинг,
а
platform-ready web surface.

Это означает:

- маркетинговая поверхность;
- product surface;
- demo environment;
- admin surface;
- lead capture system;
- AI integration layer;
- future SaaS-ready foundation.

Архитектура должна поддерживать:

- быстрый запуск MVP;
- безопасное enterprise внедрение;
- масштабирование;
- modular evolution;
- on-prem deployment.

---

# 3. Technology Stack

---

# 3.1 Frontend Stack

## Основные технологии

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- SVG Flow Systems
- Responsive-first architecture

## Почему именно так

### Next.js

Для:

- production-grade SSR
- SEO
- performance
- routing
- metadata
- enterprise deployment

### TypeScript

Для:

- strict contracts
- predictability
- scale safety
- maintainability

### Tailwind

Для:

- design system discipline
- speed of implementation
- consistent UI
- scalable component architecture

### Framer Motion

Для:

- narrative motion
- controlled enterprise animation
- smooth UX transitions

---

# 3.2 Backend Stack

## Основные технологии

- FastAPI
- Python 3.12+
- Pydantic v2
- PostgreSQL
- Psycopg 3

## Почему именно так

### FastAPI

Для:

- быстрых API
- typed contracts
- clean backend architecture
- AI integration readiness
- async support

### PostgreSQL

Для:

- надежности
- transactional safety
- lead storage
- analytics
- event history
- AI history
- pgvector future-ready support

---

# 3.3 AI Layer

## Provider-agnostic architecture

Поддерживаем:

- OpenRouter
- OpenAI API
- Gemini
- Claude
- Ollama
- Llama
- FastLLM
- Open WebUI
- локальные модели
- on-prem inference

Принцип:

frontend никогда не работает напрямую с LLM.

Только:

Frontend → Backend Gateway → Provider Layer

---

# 3.4 Runtime Stack

## Production Runtime

- Docker
- Docker Compose
- Nginx Reverse Proxy
- Ubuntu 24.04
- systemd
- journald

## Future-ready

- Kubernetes-ready packaging
- Ansible deployment
- IaC discipline

---

# 4. Frontend Architecture

## Основной принцип

Frontend = Visual Storytelling Engine

Не просто UI.

А:

объяснение продукта через интерфейс.

---

# 4.1 Структура проекта

```text
web/
  app/
    page.tsx
    contacts/
    implementation-levels/
    demo/
    workspace/
    chatbot/
    admin/

  components/
    layout/
    sections/
    ui/
    motion/
    demo/
    workspace/
    chatbot/
    admin/

  lib/
    api/
    ai/
    validation/
    analytics/
    constants/

  styles/
  hooks/
  providers/
```

---

# 4.2 Component Strategy

## Atomic + Domain-first

Используем:

- reusable UI components
- domain-specific business components

Пример:

### UI

- Button
- Card
- Modal
- Input
- Badge

### Domain

- LeadForm
- CounterpartyCard
- AIContextPanel
- FunnelBoard
- ChatWorkspace

---

# 4.3 Frontend Rules

Обязательно:

- mobile-first
- accessibility awareness
- no horizontal scroll
- lightweight animation
- performance-first
- SSR where valuable
- client components only where needed

Запрещено:

- heavy unnecessary JS
- visual overengineering
- design-only components without value

---

# 5. Backend Architecture

## Основной принцип

Backend = Business Infrastructure

Не просто form handler.

А:

- lead system
- admin analytics
- AI orchestration
- CRM-ready core
- event tracking
- provider gateway

---

# 5.1 Backend Structure

```text
api/
  app/
    routers/
    services/
    models/
    schemas/
    repositories/
    integrations/
    ai/
    analytics/
    admin/
    security/

  migrations/
  tests/
  scripts/
```

---

# 5.2 API Contracts

### Public API

```text
GET  /api/v1/health
POST /api/v1/leads
```

### Admin API

```text
GET    /api/v1/admin/leads
PATCH  /api/v1/admin/leads/{id}
GET    /api/v1/admin/analytics/*
```

### AI API

```text
POST /api/v1/ai/sessions
POST /api/v1/ai/messages
GET  /api/v1/ai/providers
```

---

# 6. Database Architecture

## Основные сущности

```text
leads
lead_notes
lead_events
analytics_events
ai_sessions
ai_messages
ai_provider_configs
ai_knowledge_sources
users
roles
permissions
```

Принцип:

event-driven auditability.

Все важные действия должны быть фиксируемыми.

---

# 7. Lead Capture Architecture

## Источники лидов

- главная форма
- контакты
- аудит
- demo
- implementation levels
- workspace
- chatbot
- будущий чат
- AI interaction

## Каждый лид обязан иметь

- source_page
- source_component
- source_channel
- UTM
- status
- priority
- owner
- event history

Это основа mini-CRM.

---

# 8. Deployment Topology

## Production topology

```text
Internet
→ Nginx
→ Next.js App
→ FastAPI
→ PostgreSQL
→ AI Provider Gateway
```

## Nginx отвечает за

- reverse proxy
- TLS termination
- routing
- CSP headers
- caching
- security headers
- admin isolation

---

# 9. CI/CD

## Обязательные этапы

```text
lint
→ tests
→ typecheck
→ build
→ smoke
→ deploy
→ rollback ready
```

## Используем

- Git discipline
- release directories
- rollback strategy
- blue/green ready mindset
- preview deployments

Команды проверки:

```bash
make lint
make test
make typecheck
make build
make prod-smoke
```

---

# 10. DevSecOps

## Secure by Default

Любая поверхность должна быть:

- B2B-safe
- enterprise compliant
- audit-ready
- secrets-safe

Используем:

- CSP
- security headers
- dependency scanning
- SAST-ready mindset
- secrets isolation
- environment separation
- no secrets in frontend
- admin access protection

---

# 11. UX/UI Engineering

## UX Principle

clarity first

Не должно быть:

“Что это?”

Должно быть:

“Это решает мою проблему.”

## UI Principle

enterprise calm confidence

Не flashy.

Не startup toy.

А:

серьезно, чисто, дорого.

---

# 12. Documentation Rules

## Документация обязательна

Каждый этап обязан обновлять docs.

### Основные документы

```text
docs/site-map.md
docs/components.md
docs/development.md
docs/lead-flow.md
docs/ai-provider-architecture.md
docs/admin-panel.md
docs/security.md
docs/deploy.md
```

Фиксировать:

- что сделано
- какие contracts используются
- env requirements
- how to run
- limitations
- future integrations

---

# 13. Git Rules

## Коммиты

Обязательно:

- понятные сообщения
- осмысленные изменения
- документация вместе с кодом

Пример:

```text
feat: реализована главная страница и lead form
fix: исправлена mobile адаптация hero section
docs: обновлена архитектура AI provider layer
```

---

# 14. Scaling Strategy

## Сначала

Public MVP

## Потом

- implementation surface
- demo
- workspace
- AI layer
- admin
- mini CRM
- integrations
- SaaS expansion

Архитектура должна поддерживать это без переписывания ядра.

---

# 15. Definition of Good Architecture

Хорошая архитектура для ANACONDA:

- проста для понимания
- безопасна
- масштабируема
- modular
- production-ready
- audit-friendly
- B2B trustworthy
- ready for AI evolution

---

# 16. Final Technical Credo

Мы строим не сайт.

Мы строим первую публичную поверхность цифрового симбионта бизнеса.

Это должно работать как:

- enterprise platform
- operational memory
- trust surface
- lead engine
- AI-ready infrastructure

Главная формула:

## Clean Architecture
## Serious Engineering
## Secure by Default
## Modular Growth
## Enterprise Trust

Это и есть техническая философия ANACONDA.

