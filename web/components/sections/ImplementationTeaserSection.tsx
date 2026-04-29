import Link from "next/link";

import { implementationLevels } from "../../lib/site-content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function ImplementationTeaserSection() {
  return (
    <section className="section-shell border-t border-white/10 section-light" id="implementation">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Уровни внедрения"
            title="Систему можно развивать по уровням: от единого окна до внутренней AI-инфраструктуры"
            description="Каждый уровень — это отдельный слой зрелости. Мы не навязываем полный контур сразу, а предлагаем тот этап, который реально полезен бизнесу именно сейчас."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {implementationLevels.map((level, index) => (
            <Reveal key={level.title} delay={index * 80}>
              <article className="level-card">
                <div className="level-card-head">
                  <span>0{index + 1}</span>
                  <strong>{level.title}</strong>
                </div>
                <p>{level.description}</p>
                <ul className="level-detail-list">
                  {level.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <div className="mt-8 flex justify-end">
            <Link
              href="/implementation-levels"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-white/30 hover:bg-white/10"
            >
              Смотреть уровни внедрения подробнее
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}