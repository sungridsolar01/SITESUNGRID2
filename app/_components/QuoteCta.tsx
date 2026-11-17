import type { ReactNode } from "react";
import { Arrow, whatsappUrl } from "./Site";

type QuoteCtaProps = {
  id?: string;
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  /** Mensagem pré-preenchida no WhatsApp. */
  waText: string;
  buttonLabel?: string;
  children?: ReactNode;
};

/** Faixa de chamada para orçamento pelo WhatsApp, usada dentro das páginas de serviço. */
export function QuoteCta({ id, eyebrow, title, accent, text, waText, buttonLabel = "Pedir orçamento no WhatsApp", children }: QuoteCtaProps) {
  return (
    <section className="quote-cta" id={id} aria-labelledby={id ? `${id}-titulo` : undefined}>
      <div className="quote-cta-copy">
        <div className="eyebrow"><span /> {eyebrow}</div>
        <h2 id={id ? `${id}-titulo` : undefined}>{title}<br /><em>{accent}</em></h2>
        <p>{text}</p>
        <a className="button primary" href={whatsappUrl(waText)} target="_blank" rel="noreferrer">{buttonLabel} <Arrow /></a>
      </div>
      {children && <div className="quote-cta-extra">{children}</div>}
    </section>
  );
}
