import Link from "next/link";
import { ReactNode, useState } from "react";

type PublicSiteLayoutProps = {
  children: ReactNode;
};

type NavItem = {
  href: string;
  label: string;
  isRoute?: boolean;
};

const navItems: NavItem[] = [
  { href: "/#how-it-works", label: "Как работает" },
  { href: "/implementation-levels", label: "Внедрение", isRoute: true },
  { href: "/#audit", label: "Аудит" },
  { href: "/contacts", label: "Контакты", isRoute: true },
];

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const className = "nav-link";

  if (item.isRoute) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </a>
  );
}

export function PublicSiteLayout({ children }: PublicSiteLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="anaconda-page bg-[var(--surface-base)] text-[var(--text-primary)]">
      <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,18,24,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="site-brand">
            <span className="site-brand-kicker">OSNOVA / ANACONDA</span>
            <span className="site-brand-caption">Единое окно для продаж, сервиса и управляемого роста</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="/#contact-form" className="cta-button hidden sm:inline-flex">
              Заказать аудит
            </a>
            <button
              type="button"
              className="menu-button lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Открыть меню"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="mobile-menu border-t border-white/10 bg-[rgba(8,14,19,0.96)] px-4 py-4 sm:px-6 lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} onNavigate={closeMenu} />
              ))}
              <a href="/#contact-form" className="cta-button mt-2 justify-center" onClick={closeMenu}>
                Заказать аудит
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-[#081015]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent-strong)]">OSNOVA / ANACONDA</p>
            <h2 className="text-2xl font-semibold">Не новая CRM, а управляемая рабочая среда поверх действующего бизнеса</h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
              ANACONDA аккуратно встраивается в текущую инфраструктуру, собирает историю работы с клиентом в одно окно
              и создаёт фундамент для управляемых процессов, автоматизации и ИИ.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
            <a href="/#how-it-works" className="footer-link">Как работает</a>
            <Link href="/implementation-levels" className="footer-link">Уровни внедрения</Link>
            <Link href="/demo" className="footer-link">Demo</Link>
            <Link href="/workspace" className="footer-link">Workspace</Link>
            <Link href="/chatbot" className="footer-link">AI Chatbot</Link>
            <Link href="/contacts" className="footer-link">Контакты</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
