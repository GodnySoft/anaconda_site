import { painCards } from "../../lib/site-content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function PainSection() {
  return (
    <section className="section-shell section-light">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Боли бизнеса"
            title="Когда системы не связаны, бизнес теряет деньги"
            description="ANACONDA решает не абстрактную цифровизацию, а конкретный операционный хаос: потерянные обращения, ручной ввод и отсутствие управляемой картины."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {painCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 90}>
              <article className="info-card" data-order={index + 1}>
                <div className="card-index">0{index + 1}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}