import { FooterNap } from "./BusinessInfo";

/** Versão usada para forçar atualização de cache de JS, favicon e imagem social. */
export const ASSET_VERSION = "2026111703";

export const WHATSAPP_NUMBER = "5512991886006";

/** Link do WhatsApp com mensagem pronta. */
export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Mensagem padrão: "Olá, Sungrid! Vim pela página de {página} e quero um orçamento." */
export function whatsappForPage(pageLabel: string) {
  return whatsappUrl(`Olá, Sungrid! Vim pela página de ${pageLabel} e quero um orçamento.`);
}

export type NavLink = { href: string; label: string };

export const solarLinks: NavLink[] = [
  { href: "/energia-solar-residencial/", label: "Energia solar residencial" },
  { href: "/energia-solar-comercial/", label: "Energia solar comercial" },
  { href: "/energia-solar-rural/", label: "Energia solar rural" },
  { href: "/sistemas-hibridos-e-baterias/", label: "Híbridos e baterias" },
  { href: "/calculadora-solar/", label: "Calculadora solar" },
];

export const maintenanceLinks: NavLink[] = [
  { href: "/manutencao-de-energia-solar/", label: "Manutenção solar" },
  { href: "/limpeza-de-paineis-solares/", label: "Limpeza de painéis" },
  { href: "/diagnostico-de-sistema-fotovoltaico/", label: "Diagnóstico" },
  { href: "/manutencao-grandes-usinas/", label: "Grandes usinas" },
];

/** Páginas de área atendida publicadas. Cidades em rascunho ficam em `cities.ts` (draft: true) e não entram aqui. */
export const areaLinks: NavLink[] = [
  { href: "/energia-solar-sao-jose-dos-campos/", label: "São José dos Campos (sede)" },
  { href: "/energia-solar-estado-de-sao-paulo/", label: "Todo o estado de São Paulo" },
];

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Brand() {
  return <><span className="brand-mark"><i /><i /><i /></span><span>SUNGRID</span></>;
}

function NavGroup({ label, links }: { label: string; links: NavLink[] }) {
  return (
    <details className="nav-group">
      <summary>{label} <span aria-hidden="true">▾</span></summary>
      <div className="nav-group-menu">
        {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </div>
    </details>
  );
}

type SiteHeaderProps = {
  /** "home" mantém o estilo do cabeçalho da página principal; "service" o das páginas internas. */
  variant: "home" | "service";
  whatsappHref: string;
};

export function SiteHeader({ variant, whatsappHref }: SiteHeaderProps) {
  const navClass = variant === "home" ? "nav" : "service-nav";
  return (
    <header className={variant === "home" ? "site-header" : "site-header service-header"}>
      <a className="brand" href="/" aria-label="Sungrid, página principal"><Brand /></a>
      <nav className={`${navClass} desktop-nav`} aria-label="Navegação principal">
        <NavGroup label="Energia solar" links={solarLinks} />
        <a href="/carregadores-veiculares/">Carregadores</a>
        <NavGroup label="Manutenção" links={maintenanceLinks} />
        <a href="/seguro-fotovoltaico/">Seguro</a>
        <NavGroup label="Onde atendemos" links={areaLinks} />
        <a href="/blog/">Blog</a>
      </nav>
      <details className="mobile-menu">
        <summary className="menu-button" aria-label="Abrir menu"><span /><span /></summary>
        <nav className={`${navClass} mobile-nav`} aria-label="Navegação móvel">
          <a href="/">Página principal</a>
          <span className="nav-label">Energia solar</span>
          {solarLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          <a href="/carregadores-veiculares/">Wallbox e carro elétrico</a>
          <span className="nav-label">Manutenção</span>
          {maintenanceLinks.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          <span className="nav-label">Onde atendemos</span>
          <a href="/energia-solar-sao-jose-dos-campos/">Energia solar em São José dos Campos</a>
          <a href="/energia-solar-estado-de-sao-paulo/">Energia solar no estado de SP</a>
          <span className="nav-label">Mais</span>
          <a href="/seguro-fotovoltaico/">Seguro fotovoltaico</a>
          <a href="/blog/">Blog</a>
          <a href="/contato/">Contato</a>
        </nav>
      </details>
      <a className="header-cta" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Pedir orçamento pelo WhatsApp (abre em nova aba)">
        <span className="cta-label">Pedir orçamento</span> <Arrow />
      </a>
    </header>
  );
}

export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Pedir orçamento à Sungrid pelo WhatsApp">
      <span aria-hidden="true">✆</span>
      <strong>Orçamento no WhatsApp</strong>
    </a>
  );
}

type CrossLinksProps = { current?: string; title?: string };

const crossLinkItems: NavLink[] = [
  { href: "/energia-solar-residencial/", label: "Energia solar residencial" },
  { href: "/energia-solar-comercial/", label: "Energia solar comercial" },
  { href: "/energia-solar-rural/", label: "Energia solar rural" },
  { href: "/sistemas-hibridos-e-baterias/", label: "Sistemas híbridos e baterias" },
  { href: "/carregadores-veiculares/", label: "Instalação de wallbox" },
  { href: "/manutencao-de-energia-solar/", label: "Manutenção de energia solar" },
  { href: "/limpeza-de-paineis-solares/", label: "Limpeza de painéis solares" },
  { href: "/diagnostico-de-sistema-fotovoltaico/", label: "Diagnóstico fotovoltaico" },
  { href: "/manutencao-grandes-usinas/", label: "Manutenção de grandes usinas" },
  { href: "/seguro-fotovoltaico/", label: "Seguro fotovoltaico" },
  { href: "/blog/", label: "Blog Sungrid" },
];

/** Todas as páginas que podem aparecer como "links relacionados" (ex.: nos artigos do blog). */
export const pageLabels: Record<string, string> = Object.fromEntries([
  ...crossLinkItems.map((item) => [item.href, item.label]),
  ["/energia-solar-sao-jose-dos-campos/", "Energia solar em São José dos Campos"],
  ["/energia-solar-estado-de-sao-paulo/", "Energia solar no estado de São Paulo"],
  ["/contato/", "Pedir orçamento"],
]);

/** Bloco de links cruzados entre instalação, manutenção, seguro, carregadores e blog. */
export function CrossLinks({ current, title = "Explore as soluções Sungrid" }: CrossLinksProps) {
  return (
    <nav className="seo-related" aria-label="Serviços relacionados">
      <span>{title}</span>
      <div>
        {crossLinkItems.filter((item) => item.href !== current).map((item) => (
          <a href={item.href} key={item.href}>{item.label} <Arrow /></a>
        ))}
      </div>
    </nav>
  );
}

type SiteFooterProps = { tagline?: string; variant: "home" | "service" };

export function SiteFooter({ tagline = "Energia solar do projeto à manutenção, no estado de São Paulo.", variant }: SiteFooterProps) {
  return (
    <footer className={variant === "service" ? "service-footer" : undefined}>
      <a className="brand" href="/" aria-label="Sungrid, página principal"><Brand /></a>
      <p>{tagline}</p>
      <div>
        <a href="/energia-solar-residencial/">Residencial</a>
        <a href="/energia-solar-comercial/">Comercial</a>
        <a href="/energia-solar-rural/">Rural</a>
        <a href="/sistemas-hibridos-e-baterias/">Híbridos</a>
        <a href="/carregadores-veiculares/">Carregadores</a>
        <a href="/manutencao-de-energia-solar/">Manutenção</a>
        <a href="/limpeza-de-paineis-solares/">Limpeza</a>
        <a href="/seguro-fotovoltaico/">Seguro</a>
        <a href="/blog/">Blog</a>
        <a href="/contato/">Contato</a>
        <a className="social-link" href="https://www.instagram.com/sungridmro/" target="_blank" rel="noreferrer" aria-label="Instagram da Sungrid, abre em nova aba">Instagram ↗</a>
        <a className="social-link" href="https://www.linkedin.com/company/sungridmro/" target="_blank" rel="noreferrer" aria-label="LinkedIn da Sungrid, abre em nova aba">LinkedIn ↗</a>
      </div>
      <span>© {new Date().getFullYear()} Sungrid</span>
      <nav className="footer-cities" aria-label="Área atendida">
        <strong>Área atendida</strong>
        <a href="/energia-solar-estado-de-sao-paulo/">Energia solar em todo o estado de São Paulo</a>
        <a href="/energia-solar-sao-jose-dos-campos/">Sede em São José dos Campos</a>
      </nav>
      <FooterNap />
    </footer>
  );
}
