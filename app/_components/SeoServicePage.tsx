import { ContactForm } from "./ContactForm";
import { ServiceSchema } from "./ServiceSchema";

type SeoServicePageProps = {
  pathname: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  serviceName: string;
  sectionTitle: string;
  sectionAccent: string;
  sectionText: string;
  benefits: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  contactTitle: string;
  contactAccent: string;
};

const whatsappUrl = "https://wa.me/5512991886006?text=Ol%C3%A1%2C%20Sungrid!%20Quero%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20do%20meu%20sistema%20solar.";

function Brand() {
  return <><span className="brand-mark"><i /><i /><i /></span><span>SUNGRID</span></>;
}

const relatedServices = [
  { href: "/limpeza-de-paineis-solares/", label: "Limpeza de painéis solares" },
  { href: "/manutencao-de-energia-solar/", label: "Manutenção de energia solar" },
  { href: "/diagnostico-de-sistema-fotovoltaico/", label: "Diagnóstico fotovoltaico" },
  { href: "/contato/", label: "Solicitar avaliação" },
];

export function SeoServicePage(props: SeoServicePageProps) {
  return (
    <main className="seo-service-page">
      <ServiceSchema name={props.serviceName} description={props.description} pathname={props.pathname} />

      <header className="site-header service-header">
        <a className="brand" href="/" aria-label="Sungrid, página principal"><Brand /></a>
        <nav className="service-nav desktop-nav" aria-label="Navegação principal">
          <a href="/">Página principal</a>
          <a href="/manutencao-de-energia-solar/">Manutenção solar</a>
          <a href="/limpeza-de-paineis-solares/">Limpeza</a>
          <a href="/diagnostico-de-sistema-fotovoltaico/">Diagnóstico</a>
        </nav>
        <details className="mobile-menu">
          <summary className="menu-button" aria-label="Abrir menu"><span /><span /></summary>
          <nav className="service-nav mobile-nav" aria-label="Navegação móvel">
            <a href="/">Página principal</a>
            <a href="/manutencao-de-energia-solar/">Manutenção solar</a>
            <a href="/limpeza-de-paineis-solares/">Limpeza</a>
            <a href="/diagnostico-de-sistema-fotovoltaico/">Diagnóstico</a>
            <a href="/contato/">Contato</a>
          </nav>
        </details>
        <a className="header-cta" href="#contato">Solicitar avaliação <span aria-hidden="true">↗</span></a>
      </header>

      <section className="seo-service-hero">
        <div className="eyebrow"><span /> {props.eyebrow}</div>
        <p className="service-index"><a href="/">SUNGRID</a> / {props.serviceName.toUpperCase()}</p>
        <h1>{props.title}<br /><em>{props.accent}</em></h1>
        <p>{props.description}</p>
        <div className="hero-actions">
          <a className="button primary" href="#contato">Solicitar avaliação <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#como-funciona">Como funciona <span>↓</span></a>
        </div>
      </section>

      <section className="seo-service-content" id="como-funciona">
        <div className="service-section-intro">
          <div>
            <div className="eyebrow dark"><span /> SERVIÇO ESPECIALIZADO</div>
            <h2>{props.sectionTitle}<br /><em>{props.sectionAccent}</em></h2>
          </div>
          <p>{props.sectionText}</p>
        </div>
        <div className="seo-benefit-grid">
          {props.benefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span>0{index + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-process">
        <div>
          <div className="eyebrow"><span /> ETAPAS DO ATENDIMENTO</div>
          <h2>Do primeiro contato<br /><em>ao relatório técnico.</em></h2>
        </div>
        <ol>
          {props.steps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <nav className="seo-related" aria-label="Serviços relacionados">
        <span>Explore as soluções Sungrid</span>
        <div>
          {relatedServices.filter((item) => item.href !== props.pathname).map((item) => (
            <a href={item.href} key={item.href}>{item.label} <span aria-hidden="true">↗</span></a>
          ))}
        </div>
      </nav>

      <section className="service-contact" id="contato">
        <div>
          <div className="eyebrow"><span /> FALE COM A SUNGRID</div>
          <h2>{props.contactTitle}<br /><em>{props.contactAccent}</em></h2>
          <p>Conte um pouco sobre o sistema. A equipe Sungrid analisará a solicitação e retornará pelos dados informados.</p>
        </div>
        <ContactForm kind="home" />
      </section>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Sungrid pelo WhatsApp"><span aria-hidden="true">✆</span><strong>WhatsApp</strong></a>

      <footer className="service-footer">
        <a className="brand" href="/"><Brand /></a>
        <p>Manutenção solar inteligente para proteger seu investimento.</p>
        <div>
          <a href="/manutencao-de-energia-solar/">Manutenção</a>
          <a href="/limpeza-de-paineis-solares/">Limpeza</a>
          <a href="/diagnostico-de-sistema-fotovoltaico/">Diagnóstico</a>
          <a href="/contato/">Contato</a>
          <a className="social-link" href="https://www.instagram.com/sungridmro/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a className="social-link" href="https://www.linkedin.com/company/sungridmro/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <span>© {new Date().getFullYear()} Sungrid</span>
      </footer>
    </main>
  );
}
