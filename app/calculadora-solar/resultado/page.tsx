import type { Metadata } from "next";
import { Arrow, ASSET_VERSION, SiteFooter, SiteHeader, whatsappForPage } from "../../_components/Site";
import { solarCalculatorConfig } from "../../_components/solarCalculatorConfig";

export const metadata: Metadata = {
  title: "Resultado da Calculadora Solar | Sungrid",
  description: "Estimativa do sistema de energia solar calculada pela Calculadora Solar Sungrid.",
  robots: { index: false, follow: true },
};

/**
 * Tela de resultado: mostra SOMENTE kWp, placas, valor estimado, a frase de escopo
 * e o botão "Confirme seu orçamento" (pedido da Sungrid). Os valores são calculados
 * no navegador por public/js/solar-calculator.js a partir dos parâmetros da URL.
 */
export default function CalculadoraSolarResultadoPage() {
  const waHref = whatsappForPage("calculadora solar");
  return (
    <main className="seo-service-page calculator-page calculator-result-page">
      <script type="application/json" id="solar-calculator-config" dangerouslySetInnerHTML={{ __html: JSON.stringify(solarCalculatorConfig) }} />
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="calculator-result" data-solar-result data-form-url="/calculadora-solar/">
        <h1 className="sr-only">Resultado da calculadora solar</h1>

        <div className="calculator-result-card" data-result-ready hidden>
          <dl>
            <div>
              <dt>Sistema recomendado</dt>
              <dd data-result-kwp />
            </div>
            <div>
              <dt>Número estimado de placas</dt>
              <dd data-result-placas />
            </div>
            <div className="calculator-result-total">
              <dt>Valor estimado do projeto</dt>
              <dd><small data-result-apartir hidden>a partir de </small><span data-result-valor /></dd>
            </div>
          </dl>
          <p className="calculator-result-scope">O projeto já inclui equipamentos, aprovação do projeto e instalação.</p>
          <a className="button primary calculator-result-button" data-result-whatsapp href={waHref} target="_blank" rel="noreferrer">Confirme seu orçamento <Arrow /></a>
          <p className="calculator-result-disclaimer">Estimativa sujeita à confirmação pela equipe Sungrid.</p>
        </div>

        <div className="calculator-pending" data-calc-unconfigured hidden>
          <strong>Calculadora em configuração — fale com a equipe no WhatsApp</strong>
          <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
        </div>

        <noscript><p className="calculator-error">Ative o JavaScript para ver a estimativa ou fale com a equipe pelo WhatsApp (12) 99188-6006.</p></noscript>
      </section>

      <SiteFooter variant="service" />
      <script src={`/js/solar-calculator.min.js?v=${ASSET_VERSION}`} defer />
    </main>
  );
}
