# Главная страница

## Цель

Главная страница должна объяснять, что ANACONDA не ломает действующую инфраструктуру, а собирает разрозненные каналы и данные в единое рабочее окно.

## Секция за секцией

1. Header
   Sticky navigation, CTA на аудит, мобильное меню.
2. Hero
   Формулирует основное обещание продукта и показывает сценарий `хаос -> порядок`.
3. Боли бизнеса
   Фиксирует четыре главных операционных потери.
4. Сбор источников
   Показывает, какие каналы и системы объединяются.
5. Единое окно менеджера
   Объясняет, как менеджер работает без постоянных переключений между системами.
6. Как работает ANACONDA
   Раскладывает внедрение на три этапа.
7. Уровни внедрения
   Даёт teaser на Этап 2.
8. Бесплатный аудит
   Собирает lead через `PublicLeadForm`.
9. Footer
   Дублирует навигацию и фиксирует позиционирование продукта.

## Компонентная карта

- страница: `../web/pages/index.tsx`
- layout: `../web/components/PublicSiteLayout.tsx`
- content: `../web/lib/site-content.ts`
- секции:
  - `../web/components/sections/HeroSection.tsx`
  - `../web/components/sections/PainSection.tsx`
  - `../web/components/sections/SourceAggregationSection.tsx`
  - `../web/components/sections/ManagerWorkspaceSection.tsx`
  - `../web/components/sections/HowItWorksSection.tsx`
  - `../web/components/sections/ImplementationTeaserSection.tsx`
  - `../web/components/sections/AuditSection.tsx`
- motion:
  - `../web/components/motion/ChaosToOrderVisual.tsx`
  - `../web/components/ui/Reveal.tsx`
- стили: `../web/styles/globals.css`

## Что ещё нужно для полного закрытия Этапа 1

- ручная mobile-first QA на `360 / 390 / 768 / 1440`;
- подтверждение реальных контактных данных и финальных CTA-текстов;
- фиксация остаточных отличий от `../dev/v1/anaconda_stage_1_public_mvp_tz.md`, если они останутся после визуального утверждения.