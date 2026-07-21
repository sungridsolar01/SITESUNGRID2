"use client";

import { useState } from "react";

type ServiceLandingProps = {
  kind: "insurance" | "utility";
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  imageAlt: string;
  metricLabel: string;
  metricValue: string;
  metricNote: string;
  pillars: Array<{ number: string; title: string; text: string }>;
  process: Array<{ title: string; text: string }>;
  faq: Array<[string, string]>;
};

const whatsappUrl = "https://wa.me/5512991886006?text=Ol%C3%A1%2C%20Sungrid!%20Quero%20conhecer%20uma%20solu%C3%A7%C3%A3o%20para%20meu%20sistema%20fotovoltaico.";

function Brand() {
  return <><span className="brand-mark"><i /><i /><i /></span><span>SUNGRID</span></>;
}

export function ServiceLanding(props: ServiceLandingProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isInsurance = props.kind === "insurance";

  return (
    <main className={`service-landing ${props.kind}`}>
      <header className="site-header service-header">
        <a className="brand" href="/" aria-label="Sungrid, página principal"><Brand /></a>
        <nav className={menuOpen ? "service-nav open" : "service-nav"} aria-label="Navegação principal">
          <a href="/">Página principal</a>
          <a href="/seguro-fotovoltaico">Seguro fotovoltaico</a>
          <a href="/manutencao-grandes-usinas">Grandes usinas</a>
        </nav>
        <a className="header-cta" href="#fale-com-a-sungrid">Solicitar proposta <span aria-hidden="true">↗</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menu"><span /><span /></button>
      </header>

      <section className="service-hero">
        <div className="service-hero-copy reveal">
          <div className="eyebrow"><span /> {props.eyebrow}</div>
          <p className="service-index">SUNGRID / {isInsurance ? "PROTEÇÃO" : "O&M"} / 2026</p>
          <h1>{props.title}<br /><em>{props.accent}</em></h1>
          <p className="service-lead">{props.description}</p>
          <div className="hero-actions">
            <a className="button primary" href="#fale-com-a-sungrid">Falar com um especialista <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#solucao">Ver a solução <span>↓</span></a>
          </div>
        </div>
        <div className="service-hero-media reveal delay-1">
          <img src={props.image} alt={props.imageAlt} />
          <div className="service-photo-overlay" />
          <span className="service-photo-label"><i /> {isInsurance ? "PATRIMÔNIO PROTEGIDO" : "OPERAÇÃO EM ESCALA"}</span>
          <div className="service-metric">
            <span>{props.metricLabel}</span>
            <strong>{props.metricValue}</strong>
            <p>{props.metricNote}</p>
            <div><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="service-proof-strip">
        <span>ESCOPO SOB MEDIDA</span><span>ANÁLISE TÉCNICA</span><span>DOCUMENTAÇÃO CLARA</span><span>ATENDIMENTO NACIONAL</span>
      </section>

      <section className="service-solution" id="solucao">
        <div className="service-section-intro">
          <div className="eyebrow dark"><span /> {isInsurance ? "PROTEÇÃO PARA O ATIVO" : "O&M PARA ALTA PERFORMANCE"}</div>
          <h2>{isInsurance ? "Risco mapeado." : "Cada megawatt conta."}<br /><em>{isInsurance ? "Decisão protegida." : "Cada detalhe também."}</em></h2>
          <p>{isInsurance
            ? "Avaliamos o perfil da instalação para orientar uma solução de seguro coerente com o ativo. Coberturas, limites, franquias e exclusões são definidos na proposta e na apólice da seguradora."
            : "Estruturamos a manutenção de usinas de maior porte com rotinas preventivas, diagnóstico técnico e evidências que dão visibilidade ao gestor do ativo."}</p>
        </div>
        <div className="service-pillar-grid">
          {props.pillars.map((pillar) => (
            <article key={pillar.number}>
              <span>{pillar.number}</span>
              <div className="pillar-symbol"><i /><i /></div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-process">
        <div className="process-heading">
          <div className="eyebrow"><span /> COMO FUNCIONA</div>
          <h2>Da análise à<br /><em>{isInsurance ? "proteção." : "execução."}</em></h2>
        </div>
        <ol>
          {props.process.map((step, index) => (
            <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="service-faq">
        <div>
          <div className="eyebrow dark"><span /> PERGUNTAS FREQUENTES</div>
          <h2>Clareza antes<br /><em>de contratar.</em></h2>
        </div>
        <div className="faq-list light-faq">
          {props.faq.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span>{question}<i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="service-contact" id="fale-com-a-sungrid">
        <div>
          <div className="eyebrow"><span /> FALE COM A SUNGRID</div>
          <h2>{isInsurance ? "Proteja o que" : "Cuide da usina"}<br /><em>{isInsurance ? "você construiu." : "como um ativo."}</em></h2>
          <p>Preencha os dados e nossa equipe entrará em contato para entender o seu sistema.</p>
        </div>
        <form action="https://formsubmit.co/sungridmro@gmail.com" method="POST" className="contact-form">
          <input type="hidden" name="_subject" value={`Nova solicitação — ${isInsurance ? "Seguro Fotovoltaico" : "Manutenção de Grandes Usinas"}`} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`https://sungrid-manutencao-solar.sungridmro.chatgpt.site/${isInsurance ? "seguro-fotovoltaico" : "manutencao-grandes-usinas"}/#fale-com-a-sungrid`} />
          <input type="hidden" name="Interesse" value={isInsurance ? "Seguro de sistema fotovoltaico" : "Manutenção para grandes usinas"} />
          <input className="honey-field" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          <label>Nome / Empresa<input type="text" name="Nome ou empresa" placeholder="Como devemos chamar você?" autoComplete="organization" required /></label>
          <div className="form-row">
            <label>E-mail<input type="email" name="Email" placeholder="seuemail@empresa.com" autoComplete="email" required /></label>
            <label>Telefone / WhatsApp<input type="tel" name="Telefone" placeholder="(12) 99999-9999" autoComplete="tel" required /></label>
          </div>
          <label>{isInsurance ? "Potência aproximada do sistema" : "Potência instalada da usina"}<input type="text" name="Potência do sistema" placeholder={isInsurance ? "Ex.: 10 kWp, 75 kWp..." : "Ex.: 1 MWp, 5 MWp..."} required /></label>
          <button className="button primary" type="submit">Solicitar contato <span aria-hidden="true">↗</span></button>
          <small>Seus dados serão usados somente para o atendimento desta solicitação.</small>
        </form>
      </section>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Sungrid pelo WhatsApp"><span aria-hidden="true">✆</span><strong>WhatsApp</strong></a>

      <footer className="service-footer">
        <a className="brand" href="/"><Brand /></a>
        <p>{isInsurance ? "Proteção inteligente para o seu investimento solar." : "Operação e manutenção para ativos solares em escala."}</p>
        <div><a href="/">Principal</a><a href="/seguro-fotovoltaico">Seguro</a><a href="/manutencao-grandes-usinas">Grandes usinas</a></div>
        <span>© {new Date().getFullYear()} Sungrid</span>
      </footer>
    </main>
  );
}
