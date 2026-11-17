import type { ReactNode } from "react";
import { ContactForm, type ServiceOption } from "./ContactForm";
import { FaqSchema } from "./FaqSchema";
import { CrossLinks, SiteFooter, SiteHeader, WhatsAppFloat, whatsappForPage } from "./Site";

type ServiceLandingProps = {
  /** "insurance" e "utility" mantêm os textos originais; "solar" usa os textos passados por props. */
  kind: "insurance" | "utility" | "solar";
  pathname: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  imageAlt: string;
  imageHeight?: string;
  metricLabel: string;
  metricValue: string;
  metricNote: string;
  pillars: Array<{
    number: string;
    title: string;
    text: string;
    icon: string;
  }>;
  process: Array<{ title: string; text: string }>;
  faq: Array<[string, string]>;
  /** Texto da página na mensagem do WhatsApp ("Vim pela página de ..."). */
  waLabel: string;
  defaultService?: ServiceOption;
  indexLabel?: string;
  photoLabel?: string;
  proofItems?: [string, string, string, string];
  regionText?: string;
  solutionEyebrow?: string;
  solutionTitle?: string;
  solutionAccent?: string;
  solutionText?: string;
  processAccent?: string;
  contactTitle?: string;
  contactAccent?: string;
  footerText?: string;
  /** Conteúdo extra depois da seção de solução (ex.: chamada para a calculadora solar). */
  afterSolution?: ReactNode;
};

export function ServiceLanding(props: ServiceLandingProps) {
  const isInsurance = props.kind === "insurance";
  const isUtility = props.kind === "utility";
  const waHref = whatsappForPage(props.waLabel);

  const indexLabel = props.indexLabel ?? (isInsurance ? "PROTEÇÃO" : "O&M");
  const photoLabel = props.photoLabel ?? (isInsurance ? "PATRIMÔNIO PROTEGIDO" : "OPERAÇÃO EM ESCALA");
  const proofItems = props.proofItems ?? ["ESCOPO SOB MEDIDA", "ANÁLISE TÉCNICA", "DOCUMENTAÇÃO CLARA", "ESTADO DE SÃO PAULO"];
  const regionText = props.regionText ?? "Com sede em São José dos Campos, a Sungrid avalia solicitações em todo o estado de São Paulo conforme a localização, o porte do sistema e o escopo necessário.";
  const solutionEyebrow = props.solutionEyebrow ?? (isInsurance ? "PROTEÇÃO PARA O ATIVO" : "O&M PARA ALTA PERFORMANCE");
  const solutionTitle = props.solutionTitle ?? (isInsurance ? "Risco mapeado." : "Cada megawatt conta.");
  const solutionAccent = props.solutionAccent ?? (isInsurance ? "Decisão protegida." : "Cada detalhe também.");
  const solutionText = props.solutionText ?? (isInsurance
    ? "Avaliamos o perfil da instalação para orientar uma solução de seguro coerente com o ativo. Coberturas, limites, franquias e exclusões são definidos na proposta e na apólice da seguradora."
    : "Estruturamos a manutenção de usinas de maior porte com rotinas preventivas, diagnóstico técnico e evidências que dão visibilidade ao gestor do ativo.");
  const processAccent = props.processAccent ?? (isInsurance ? "proteção." : "execução.");
  const contactTitle = props.contactTitle ?? (isInsurance ? "Proteja o que" : "Cuide da usina");
  const contactAccent = props.contactAccent ?? (isInsurance ? "você construiu." : "como um ativo.");
  const footerText = props.footerText ?? (isInsurance ? "Proteção inteligente para o seu investimento solar." : "Operação e manutenção para ativos solares em escala.");
  const formKind = isInsurance ? "insurance" : isUtility ? "utility" : "home";

  return (
    <main className={`service-landing ${props.kind}`}>
      <FaqSchema faq={props.faq} pathname={props.pathname} />
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="service-hero">
        <div className="service-hero-copy reveal">
          <div className="eyebrow"><span /> {props.eyebrow}</div>
          <p className="service-index">SUNGRID / {indexLabel} / 2026</p>
          <h1>{props.title}<br /><em>{props.accent}</em></h1>
          <p className="service-lead">{props.description}</p>
          <div className="hero-actions">
            <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#solucao">Ver a solução <span>↓</span></a>
          </div>
        </div>
        <div className="service-hero-media reveal delay-1">
          <img
            src={`${props.image}-1024.webp`}
            srcSet={`${props.image}-640.webp 640w, ${props.image}-1024.webp 1024w, ${props.image}-1440.webp 1440w`}
            sizes="(max-width: 1120px) 100vw, 49vw"
            width="1440"
            height={props.imageHeight ?? (isUtility ? "810" : "960")}
            fetchPriority="high"
            decoding="async"
            alt={props.imageAlt}
          />
          <div className="service-photo-overlay" />
          <span className="service-photo-label"><i /> {photoLabel}</span>
          <div className="service-metric">
            <span>{props.metricLabel}</span>
            <strong>{props.metricValue}</strong>
            <p>{props.metricNote}</p>
            <div><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </section>

      <section className="service-proof-strip">
        {proofItems.map((item) => <span key={item}>{item}</span>)}
      </section>

      <section className="local-service-section service-local-region">
        <div className="eyebrow dark"><span /> ATENDIMENTO NO ESTADO DE SÃO PAULO</div>
        <h2>Atendimento técnico em SP<br /><em>com sede em São José dos Campos.</em></h2>
        <p>{regionText}</p>
      </section>

      <section className="service-solution" id="solucao">
        <div className="service-section-intro">
          <div className="eyebrow dark"><span /> {solutionEyebrow}</div>
          <h2>{solutionTitle}<br /><em>{solutionAccent}</em></h2>
          <p>{solutionText}</p>
        </div>
        <div className="service-pillar-grid">
          {props.pillars.map((pillar) => (
            <article key={pillar.number}>
              <span>{pillar.number}</span>
              <div className="pillar-symbol" aria-hidden="true">
                <img src={pillar.icon} width="96" height="96" loading="lazy" decoding="async" alt="" />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      {props.afterSolution}

      <section className="service-process">
        <div className="process-heading">
          <div className="eyebrow"><span /> COMO FUNCIONA</div>
          <h2>Da análise à<br /><em>{processAccent}</em></h2>
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

      <CrossLinks current={props.pathname} />

      <section className="service-contact" id="fale-com-a-sungrid">
        <div>
          <div className="eyebrow"><span /> FALE COM A SUNGRID</div>
          <h2>{contactTitle}<br /><em>{contactAccent}</em></h2>
          <p>Prefere formulário? Preencha os dados e nossa equipe entrará em contato. Para uma resposta mais rápida, chame no WhatsApp.</p>
        </div>
        <ContactForm kind={formKind} defaultService={props.defaultService} />
      </section>

      <WhatsAppFloat href={waHref} />

      <SiteFooter variant="service" tagline={footerText} />
    </main>
  );
}
