import { implementationProcess } from "../../lib/site-content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function HowItWorksSection() {
  return (
    <section className="section-shell border-t border-white/10" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Как работает ANACONDA"
            title="Мы подходим индивидуально к каждому бизнесу и проектируем систему поэтапно"
            description="Для нас внедрение — это не коробка и не шаблон. Мы сначала понимаем текущую инфраструктуру клиента, затем предлагаем подходящий уровень системы и фиксируем понятный путь развития."
          />
        </Reveal>
        <div className="timeline-track mt-10 grid gap-6 lg:grid-cols-4">
          {implementationProcess.map((step, index) => (
            <Reveal key={step.title} delay={index * 120}>
              <article className="step-card step-card-wide">
                <div className="step-number">Этап {index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}