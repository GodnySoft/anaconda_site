import { ChaosToOrderVisual } from "../motion/ChaosToOrderVisual";
import { Reveal } from "../ui/Reveal";
import { trustSignals } from "../../lib/site-content";

export function HeroSection() {
  return (
    <section className="hero-shell overflow-hidden border-b border-white/10">
      <div className="hero-grid mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="space-y-8">
          <Reveal>
            <div className="space-y-5">
              <p className="hero-brand">ANACONDA</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Хаос бизнеса превращаем в порядок
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                ANACONDA — это интеграционная система объединения различных потоков информации бизнеса. Она собирает как
                входящие заявки от клиентов, так и внутренние бизнес-процессы в одну управляемую точку доступа.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#contact-form" className="cta-button justify-center px-6 py-3 text-sm font-semibold">
                Заказать бесплатный аудит
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-white/30 hover:bg-white/10"
              >
                Посмотреть как это работает
              </a>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-3">
            {trustSignals.map((item, index) => (
              <Reveal key={item.title} delay={140 + index * 90}>
                <div className="trust-card">
                  <span>{item.eyebrow}</span>
                  <strong>{item.title}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <ChaosToOrderVisual />
        </Reveal>
      </div>
    </section>
  );
}