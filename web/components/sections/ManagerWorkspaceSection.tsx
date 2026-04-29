import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function ManagerWorkspaceSection() {
  return (
    <section className="section-shell border-t border-white/10 section-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <Reveal>
          <div className="self-start">
            <SectionHeading
              kicker="Единое рабочее пространство"
              title="Показываем наглядно, как все каналы и процессы сходятся в одно окно"
              description="Слева — очередь клиентов и обращений. В центре — история общения и работа менеджера. Справа — операционный слой: документы, оплаты, 1С, задачи, действия и внутренний контекст по компании."
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="surface-panel workspace-preview">
            <div className="workspace-preview-grid">
              <div className="workspace-column">
                <p className="panel-label">Входящий контур</p>
                <div className="workspace-block active-block">
                  <strong>Все обращения попадают в одно пространство</strong>
                  <span>Сообщения, заявки, письма и звонки больше не живут в личных каналах сотрудников.</span>
                </div>
                <div className="workspace-block">
                  <strong>История клиента не теряется</strong>
                  <span>Каждое новое обращение привязывается к уже существующему контексту и действиям команды.</span>
                </div>
              </div>
              <div className="workspace-column">
                <p className="panel-label">Операционный слой</p>
                <div className="workspace-block">
                  <strong>1С, документы, оплаты и задачи рядом</strong>
                  <span>Менеджер и руководитель видят не только чат, но и всё, что влияет на реальную работу по клиенту.</span>
                </div>
                <div className="workspace-block">
                  <strong>Единое окно вместо переключения между системами</strong>
                  <span>ANACONDA не ломает инфраструктуру, а даёт поверх неё управляемый рабочий слой.</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}