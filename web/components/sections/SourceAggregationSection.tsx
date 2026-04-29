import { sourceDetails } from "../../lib/site-content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function SourceAggregationSection() {
  return (
    <section className="section-shell border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8" id="manager-window">
        <Reveal>
          <div className="self-start">
            <SectionHeading
              kicker="Разрозненные источники"
              title="Всё, что раньше жило отдельно, собирается в одно окно ANACONDA Systems"
              description="1С, документация, Excel, Legacy-системы, Access, входящие сообщения и старые базы больше не конкурируют друг с другом. Мы объединяем их в единую точку доступа и управления."
            />
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {sourceDetails.map((card, index) => (
            <Reveal key={card.title} delay={index * 90}>
              <div className="source-card source-card-rich">
                <div className="icon-mark" aria-hidden="true" />
                <strong>{card.title}</strong>
                <p>{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}