# Публичные компоненты

## Назначение

Документ фиксирует переиспользуемые компоненты Public MVP и их ответственность.

## Layout

### `PublicSiteLayout`

Файл: `../web/components/PublicSiteLayout.tsx`

Ответственность:
- общий header и footer публичного сайта;
- навигация между секциями и страницами;
- мобильное меню;
- единое бренд-позиционирование OSNOVA / ANACONDA.

## Form

### `PublicLeadForm`

Файл: `../web/components/PublicLeadForm.tsx`

Ответственность:
- единая форма заявки для `/` и `/contacts`;
- единый UX `loading / success / error`;
- отправка в `POST /api/v1/leads`;
- проброс `source_page` как `home` или `contacts`.

## UI

### `Reveal`

Файл: `../web/components/ui/Reveal.tsx`

Ответственность:
- scroll-reveal анимация секций и карточек;
- поддержка `prefers-reduced-motion`;
- отсутствие зависимости от тяжёлых animation libraries.

### `SectionHeading`

Файл: `../web/components/ui/SectionHeading.tsx`

Ответственность:
- единая типографика заголовков секций;
- единый формат `kicker / title / description`.

## Motion

### `ChaosToOrderVisual`

Файл: `../web/components/motion/ChaosToOrderVisual.tsx`

Ответственность:
- narrative-анимация hero `Chaos -> Control`;
- SVG/DOM-потоки данных без тяжёлого canvas/3D;
- центральное окно продукта как визуальный якорь первого экрана.

## Sections

Файлы:
- `../web/components/sections/HeroSection.tsx`
- `../web/components/sections/PainSection.tsx`
- `../web/components/sections/SourceAggregationSection.tsx`
- `../web/components/sections/ManagerWorkspaceSection.tsx`
- `../web/components/sections/HowItWorksSection.tsx`
- `../web/components/sections/ImplementationTeaserSection.tsx`
- `../web/components/sections/AuditSection.tsx`
- `../web/components/sections/ContactSection.tsx`

Ответственность:
- каждая секция страницы является отдельной сущностью;
- дальнейшее развитие сайта идёт через добавление или замену секций, а не через монолитный page-файл.

## Content layer

### `site-content.ts`

Файл: `../web/lib/site-content.ts`

Ответственность:
- хранение текстовых и структурных данных секций;
- минимизация жёстко зашитых массивов в page/components;
- подготовка к будущей подмене статических данных на CMS/config слой.