import { PublicLeadForm } from "../PublicLeadForm";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function AuditSection() {
  return (
    <section className="section-shell border-t border-white/10" id="audit">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <div className="self-start">
            <SectionHeading
              kicker="Бесплатный аудит"
              title="Начинаем с бесплатного аудита текущих процессов"
              description="Смотрим, где теряются обращения, как сейчас работают 1С и коммуникации, какие данные дублируются вручную и с какого уровня внедрения стоит начать."
            />
            <ul className="audit-list">
              <li>Анализ текущих процессов и каналов заявок</li>
              <li>Аудит 1С и действующих систем</li>
              <li>Поиск узких мест и потерь</li>
              <li>Карта первого этапа внедрения</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <PublicLeadForm
            sourcePage="home"
            title="Расскажите, где сейчас распадается работа с клиентом"
            description="Достаточно кратко описать контур: где приходят заявки, где теряется история и что вызывает больше всего ручной работы."
            submitLabel="Заказать бесплатный аудит"
            successMessage="Заявка отправлена. Мы свяжемся с вами и подготовим карту первого этапа внедрения."
          />
        </Reveal>
      </div>
    </section>
  );
}