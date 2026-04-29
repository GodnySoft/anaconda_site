import { PublicLeadForm } from "../PublicLeadForm";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { contactChannels, contactChecklist } from "../../lib/site-content";

export function ContactSection() {
  return (
    <>
      <section className="hero-shell border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
          <div className="space-y-6">
            <Reveal>
              <div className="space-y-5">
                <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-[var(--accent-soft)]">
                  Контакты / Этап 1
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                  Обсудим, где у вас теряется управление клиентом и как собрать его в единое окно
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
                  Если у вас разрознены каналы общения, 1С, Excel, CRM или старые базы, начнём с короткого аудита.
                  Дальше предложим первый реалистичный шаг внедрения без операционного шока.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactChannels.map((channel, index) => (
                <Reveal key={channel.title} delay={index * 80}>
                  <a href={channel.href} className="source-card contact-card">
                    <strong>{channel.title}</strong>
                    <span className="contact-value">{channel.value}</span>
                    <p>{channel.note}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="surface-panel contact-detail-panel">
              <p className="panel-label">Что подготовить перед первым разговором</p>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Достаточно описать, где приходят заявки, в каких системах живут данные и какие процессы сейчас больше
                  всего завязаны на ручную передачу контекста.
                </p>
                <ul className="audit-list mt-0">
                  {contactChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="workspace-block">
                  <strong>Результат первого контакта</strong>
                  <span>Мы формируем карту проблем, точку входа во внедрение и список систем, которые нужно связать в первую очередь.</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell border-t border-white/10 section-light">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Reveal>
            <div className="self-start">
              <SectionHeading
                kicker="Заявка"
                title="Оставьте контур текущей проблемы, и мы предложим первый шаг внедрения"
                description="Не нужен длинный бриф. Кратко опишите, где распадается работа с клиентом: заявки, история, оплаты, передача между сотрудниками или связь с 1С."
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <PublicLeadForm
              sourcePage="contacts"
              title="Отправьте заявку на аудит или стартовую консультацию"
              description="Можно указать телефон, Telegram или email. Мы используем эти данные только для связи по вашему запросу."
              submitLabel="Отправить заявку"
              successMessage="Заявка получена. Мы свяжемся с вами и согласуем удобный формат аудита."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}