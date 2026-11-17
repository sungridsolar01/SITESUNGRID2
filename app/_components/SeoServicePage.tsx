import { ContactForm, type ServiceOption } from "./ContactForm";
import type { ReactNode } from "react";
import { FaqSchema } from "./FaqSchema";
import { ServiceSchema } from "./ServiceSchema";
import { CrossLinks, SiteFooter, SiteHeader, WhatsAppFloat, whatsappForPage } from "./Site";

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
  regionText: string;
  faq: Array<[string, string]>;
  contactTitle: string;
  contactAccent: string;
  /** Texto da página na mensagem do WhatsApp ("Vim pela página de ..."). Padrão: nome do serviço. */
  waLabel?: string;
  sectionEyebrow?: string;
  processTitle?: string;
  processAccent?: string;
  defaultService?: ServiceOption;
  footerText?: string;
  /** Conteúdo extra exibido depois dos benefícios (ex.: vídeo). */
  afterContent?: ReactNode;
};

export function SeoServicePage(props: SeoServicePageProps) {
  const waHref = whatsappForPage(props.waLabel ?? props.serviceName.toLowerCase());
  return (
    <main className="seo-service-page">
      <ServiceSchema name={props.serviceName} description={props.description} pathname={props.pathname} />
      <FaqSchema faq={props.faq} pathname={props.pathname} />

      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="seo-service-hero">
        <div className="eyebrow"><span /> {props.eyebrow}</div>
        <p className="service-index"><a href="/">SUNGRID</a> / {props.serviceName.toUpperCase()}</p>
        <h1>{props.title}<br /><em>{props.accent}</em></h1>
        <p>{props.description}</p>
        <div className="hero-actions">
          <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp <span aria-hidden="true">↗</span></a>
          <a className="text-link" href="#como-funciona">Como funciona <span>↓</span></a>
        </div>
      </section>

      <section className="local-service-section" aria-labelledby={`regiao-${props.serviceName.replace(/\s+/g, "-").toLowerCase()}`}>
        <div className="eyebrow dark"><span /> ATENDIMENTO NO ESTADO DE SÃO PAULO</div>
        <h2 id={`regiao-${props.serviceName.replace(/\s+/g, "-").toLowerCase()}`}>Atendimento solar em SP<br /><em>com base em São José dos Campos.</em></h2>
        <p>{props.regionText}</p>
      </section>

      <section className="service-faq seo-service-faq">
        <div>
          <div className="eyebrow dark"><span /> PERGUNTAS FREQUENTES</div>
          <h2>Informação clara.<br /><em>Decisão segura.</em></h2>
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

      <section className="seo-service-content" id="como-funciona">
        <div className="service-section-intro">
          <div>
            <div className="eyebrow dark"><span /> {props.sectionEyebrow ?? "SERVIÇO ESPECIALIZADO"}</div>
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

      {props.afterContent}

      <section className="seo-process">
        <div>
          <div className="eyebrow"><span /> ETAPAS DO ATENDIMENTO</div>
          <h2>{props.processTitle ?? "Do primeiro contato"}<br /><em>{props.processAccent ?? "ao relatório técnico."}</em></h2>
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

      <CrossLinks current={props.pathname} />

      <section className="service-contact" id="contato">
        <div>
          <div className="eyebrow"><span /> FALE COM A SUNGRID</div>
          <h2>{props.contactTitle}<br /><em>{props.contactAccent}</em></h2>
          <p>Conte um pouco sobre o sistema. A equipe Sungrid analisará a solicitação e retornará pelos dados informados.</p>
        </div>
        <ContactForm kind="home" defaultService={props.defaultService} />
      </section>

      <WhatsAppFloat href={waHref} />

      <SiteFooter variant="service" tagline={props.footerText} />
    </main>
  );
}
