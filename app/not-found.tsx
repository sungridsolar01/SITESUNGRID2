import type { Metadata } from "next";
import { FooterNap } from "./_components/BusinessInfo";

export const metadata: Metadata = {
  title: "Página não encontrada | Sungrid",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <title>Página não encontrada | Sungrid</title>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Sungrid, página principal">
          <span className="brand-mark"><i /><i /><i /></span><span>SUNGRID</span>
        </a>
      </header>
      <section className="not-found-content">
        <div className="eyebrow"><span /> ERRO 404</div>
        <h1>Página não encontrada.</h1>
        <p>O endereço pode ter mudado ou não existir. Continue pelas principais soluções da Sungrid.</p>
        <nav aria-label="Links úteis">
          <a className="button primary" href="/">Voltar à página principal <span aria-hidden="true">↗</span></a>
          <a href="/manutencao-de-energia-solar/">Manutenção de energia solar</a>
          <a href="/limpeza-de-paineis-solares/">Limpeza de painéis solares</a>
          <a href="/diagnostico-de-sistema-fotovoltaico/">Diagnóstico fotovoltaico</a>
          <a href="/contato/">Contato</a>
        </nav>
      </section>
      <footer className="service-footer"><FooterNap /></footer>
    </main>
  );
}
