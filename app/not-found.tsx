import type { Metadata } from "next";
import { SiteFooter, SiteHeader, WhatsAppFloat, whatsappUrl } from "./_components/Site";

export const metadata: Metadata = {
  title: "Página não encontrada | Sungrid",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const waHref = whatsappUrl("Olá, Sungrid! Vim pelo site e quero um orçamento.");
  return (
    <main className="not-found-page">
      <title>Página não encontrada | Sungrid</title>
      <SiteHeader variant="home" whatsappHref={waHref} />
      <section className="not-found-content">
        <div className="eyebrow"><span /> ERRO 404</div>
        <h1>Página não encontrada.</h1>
        <p>O endereço pode ter mudado ou não existir. Continue pelas principais soluções da Sungrid ou peça seu orçamento pelo WhatsApp.</p>
        <nav aria-label="Links úteis">
          <a className="button primary" href="/">Voltar à página principal <span aria-hidden="true">↗</span></a>
          <a href="/energia-solar-residencial/">Energia solar residencial</a>
          <a href="/energia-solar-comercial/">Energia solar comercial</a>
          <a href="/energia-solar-rural/">Energia solar rural</a>
          <a href="/carregadores-veiculares/">Instalação de wallbox</a>
          <a href="/manutencao-de-energia-solar/">Manutenção de energia solar</a>
          <a href="/limpeza-de-paineis-solares/">Limpeza de painéis solares</a>
          <a href="/diagnostico-de-sistema-fotovoltaico/">Diagnóstico fotovoltaico</a>
          <a href="/blog/">Blog</a>
          <a href="/contato/">Contato</a>
        </nav>
      </section>
      <WhatsAppFloat href={waHref} />
      <SiteFooter variant="service" />
    </main>
  );
}
