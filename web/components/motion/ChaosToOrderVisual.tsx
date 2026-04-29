import { sourceChips } from "../../lib/site-content";

const orbitNodes = [
  { label: "1С", x: 18, y: 20 },
  { label: "Excel", x: 78, y: 18 },
  { label: "Access", x: 10, y: 60 },
  { label: "Legacy", x: 88, y: 58 },
  { label: "Docs", x: 26, y: 84 },
  { label: "Msgs", x: 70, y: 82 },
];

export function ChaosToOrderVisual() {
  return (
    <div className="hero-visual rounded-[32px] border border-white/10 bg-[rgba(12,20,26,0.88)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="mb-4 flex flex-wrap gap-2">
        {sourceChips.map((chip, index) => (
          <span key={chip} className="source-chip" style={{ animationDelay: `${index * 0.12}s` }}>
            {chip}
          </span>
        ))}
      </div>

      <div className="chaos-map surface-panel">
        <svg viewBox="0 0 100 100" className="chaos-svg" aria-hidden="true">
          {orbitNodes.map((node, index) => (
            <g key={node.label} className="orbit-node" style={{ animationDelay: `${index * 160}ms` }}>
              <path d={`M ${node.x} ${node.y} Q 50 50 50 50`} className="flow-path" />
              <circle cx={node.x} cy={node.y} r="4.5" className="flow-dot" />
            </g>
          ))}
          <circle cx="50" cy="50" r="14" className="core-ring" />
          <circle cx="50" cy="50" r="7" className="core-node" />
        </svg>

        <div className="chaos-core-card">
          <p className="panel-label">ANACONDA Systems</p>
          <div className="chaos-core-grid">
            <div className="message incoming">
              <span className="message-source">Входящий поток</span>
              <p>Заявка клиента, письмо, сообщение и внутренний запрос больше не теряются между системами.</p>
            </div>
            <div className="message system">
              <span className="message-source">Интеграционный слой</span>
              <p>Собраны 1С, документация, таблицы, legacy-контур, база клиента и действия команды.</p>
            </div>
            <div className="detail-list compact">
              <div><span>Единая точка доступа</span><strong>Окно ANACONDA</strong></div>
              <div><span>Контекст</span><strong>История + документы + процессы</strong></div>
              <div><span>Следующее действие</span><strong>Работа менеджера и команды</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}