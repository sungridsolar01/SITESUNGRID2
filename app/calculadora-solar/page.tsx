import type { Metadata } from "next";
import estados from "../../public/data/estados.json";
import { Arrow, ASSET_VERSION, SiteFooter, SiteHeader, WhatsAppFloat, whatsappForPage } from "../_components/Site";
import { solarCalculatorConfig } from "../_components/solarCalculatorConfig";

const title = "Calculadora Solar | Estime seu Sistema de Energia Solar | Sungrid";
const description = "Calculadora solar da Sungrid: informe a cidade e o gasto mensal com energia e receba uma estimativa da potência do sistema, do número de placas e do valor do projeto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/calculadora-solar/" },
  openGraph: { type: "website", url: "/calculadora-solar/", title, description, images: ["/og.png?v=20261117"] },
};

const formatReais = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value).replace(/\u00a0/g, " ");

export default function CalculadoraSolarPage() {
  const config = solarCalculatorConfig;
  const waHref = whatsappForPage("calculadora solar");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://sungridsolar.site/calculadora-solar/#app",
        name: "Calculadora Solar Sungrid",
        url: "https://sungridsolar.site/calculadora-solar/",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        inLanguage: "pt-BR",
        isAccessibleForFree: true,
        provider: { "@id": "https://sungridsolar.site/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Página principal", item: "https://sungridsolar.site/" },
          { "@type": "ListItem", position: 2, name: "Calculadora solar", item: "https://sungridsolar.site/calculadora-solar/" },
        ],
      },
    ],
  };

  return (
    <main className="seo-service-page calculator-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/json" id="solar-calculator-config" dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }} />
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="seo-service-hero calculator-hero">
        <div className="eyebrow"><span /> CALCULADORA SOLAR SUNGRID</div>
        <p className="service-index"><a href="/">SUNGRID</a> / CALCULADORA SOLAR</p>
        <h1>Calculadora solar<br /><em>estime o seu sistema.</em></h1>
        <p>Informe onde fica o imóvel, quanto você gasta por mês com energia e se tem interesse em baterias. A calculadora mostra uma estimativa, sujeita à confirmação pela equipe Sungrid.</p>
      </section>

      <section className="calculator-section" aria-labelledby="calculadora-titulo">
        <form className="calculator-form" data-solar-calculator action="/calculadora-solar/resultado/" method="get" data-version={ASSET_VERSION} noValidate>
          <h2 id="calculadora-titulo" className="sr-only">Dados para a estimativa</h2>
          <div className="calculator-row">
            <label className="calculator-field">
              <span>Estado</span>
              <select name="uf" defaultValue="SP" required>
                {estados.map((estado) => <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>)}
              </select>
            </label>
            <label className="calculator-field">
              <span>Cidade</span>
              <input name="cidade" list="calculadora-cidades" autoComplete="address-level2" placeholder="Digite e selecione a cidade" required />
              <datalist id="calculadora-cidades" />
            </label>
          </div>

          <div className="calculator-field calculator-range">
            <label htmlFor="calculadora-gasto">Gasto mensal com energia elétrica</label>
            <output htmlFor="calculadora-gasto" data-gasto-output aria-live="polite">{formatReais(config.gastoInicial)}</output>
            <input
              id="calculadora-gasto"
              name="gasto"
              type="range"
              min={0}
              max={config.gastoMaximo}
              step={config.gastoPasso}
              defaultValue={config.gastoInicial}
              aria-valuetext={formatReais(config.gastoInicial)}
            />
            <div className="calculator-range-scale" aria-hidden="true">
              <span>{formatReais(0)}</span>
              <span>{`${formatReais(config.gastoMaximo)} ou mais`}</span>
            </div>
          </div>

          <fieldset className="calculator-field calculator-choice">
            <legend>Tem interesse em baterias e sistemas de armazenamento?</legend>
            <label><input type="radio" name="baterias" value="sim" /> <span>Sim</span></label>
            <label><input type="radio" name="baterias" value="nao" /> <span>Não</span></label>
          </fieldset>

          <p className="calculator-error" data-calc-error role="alert" hidden />
          <button className="button primary calculator-submit" type="submit">Calcular estimativa <Arrow /></button>
          <noscript><p className="calculator-error">Ative o JavaScript para usar a calculadora ou fale com a equipe pelo WhatsApp (12) 99188-6006.</p></noscript>
        </form>

        <div className="calculator-pending" data-calc-unconfigured hidden>
          <strong>Calculadora em configuração — fale com a equipe no WhatsApp</strong>
          <p>Enquanto finalizamos os parâmetros da calculadora, a equipe Sungrid faz a sua estimativa pelo WhatsApp com os dados que você informou.</p>
          <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
        </div>
        <p className="calculator-note">Estimativa sujeita à confirmação pela equipe Sungrid, após análise da conta de luz e visita técnica.</p>
      </section>

      <WhatsAppFloat href={waHref} />
      <SiteFooter variant="service" />
      <script src={`/js/solar-calculator.min.js?v=${ASSET_VERSION}`} defer />
    </main>
  );
}
