import type { Metadata } from "next";
import { Arrow, ASSET_VERSION, CrossLinks, SiteFooter, SiteHeader, WhatsAppFloat, whatsappForPage, whatsappUrl } from "../_components/Site";
import { faixa, formatPct, ipca, ranking } from "./tarifas";

const title = "Aumento da tarifa de energia em SP por distribuidora (2021–2026) | Sungrid";
const description = "Quanto a tarifa residencial de energia subiu em cada distribuidora de SP de 2021 a 2026, comparada com o IPCA. Dados abertos da ANEEL, com mapa por cidade.";
const pathname = "/tarifa-energia-sp/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: { type: "website", url: pathname, title, description, images: ["/og.png?v=20261117"] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png?v=20261117"] },
};

/** Escala das barras: 0 a 50%. */
const ESCALA = 50;
const largura = (value: number) => `${(value / ESCALA) * 100}%`;

export default function TarifaEnergiaSpPage() {
  const waHref = whatsappForPage("tarifa de energia em SP");
  const waSimulacao = whatsappUrl("Olá! Vi a página de tarifas. Quero uma simulação.");
  const config = {
    distribuidoras: Object.fromEntries(ranking.map((item) => [item.key, { nome: item.nome, alta: item.alta }])),
    dataUrl: `/data/tarifa-municipios-sp.json?v=${ASSET_VERSION}`,
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://sungridsolar.site${pathname}#webpage`,
        url: `https://sungridsolar.site${pathname}`,
        name: title,
        description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": "https://sungridsolar.site/#website" },
        publisher: { "@id": "https://sungridsolar.site/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Página principal", item: "https://sungridsolar.site/" },
          { "@type": "ListItem", position: 2, name: "Tarifa de energia em SP", item: `https://sungridsolar.site${pathname}` },
        ],
      },
    ],
  };

  return (
    <main className="seo-service-page tarifa-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/json" id="tarifa-config" dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }} />
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="tarifa-hero">
        <div className="eyebrow"><span /> TARIFA DE ENERGIA EM SP</div>
        <p className="service-index"><a href="/">SUNGRID</a> / TARIFA DE ENERGIA</p>
        <h1>A tarifa sobe de um jeito <em>imprevisível.</em></h1>
        <p>Veja quanto a tarifa residencial subiu em cada distribuidora do estado de São Paulo de 25/11/2021 a 25/11/2026, comparada com a inflação (IPCA).</p>
        <ul className="tarifa-chips" aria-label="Destaques">
          <li>EDP São Paulo, em 2021: <strong>+16,45%</strong></li>
          <li>EDP São Paulo, em 2025: <strong>+16,05%</strong></li>
        </ul>
      </section>

      <section className="tarifa-grid" aria-label="Mapa e consulta por cidade">
        <figure className="tarifa-card tarifa-map">
          <div className="tarifa-card-head">
            <h2>Alta acumulada da tarifa por distribuidora</h2>
            <span>Tarifa residencial B1 · 2021–2026</span>
          </div>
          <div className="tarifa-map-stage" data-tarifa-map>
          <img
            src={`/images/tarifa/mapa-distribuidoras-sp.svg?v=${ASSET_VERSION}`}
            width={640}
            height={428}
            loading="lazy"
            decoding="async"
            alt="Mapa do estado de São Paulo dividido pelas áreas das distribuidoras de energia, colorido pela alta da tarifa residencial de 2021 a 2026. A mesma informação está no ranking abaixo."
          />
          <div className="tarifa-map-tip" role="tooltip" id="tarifa-map-tip" hidden data-tarifa-tip />
          </div>
          <p className="tarifa-map-hint" data-tarifa-hint hidden>Passe o mouse ou toque numa área para ver a distribuidora.</p>
          <ul className="tarifa-legend" aria-label="Legenda do mapa">
            <li><i className="g40" /> Acima de 40%</li>
            <li><i className="g30" /> 30 a 40%</li>
            <li><i className="g20" /> 20 a 30%</li>
            <li><i className="coop" /> Cooperativas</li>
          </ul>
          <figcaption>Números no mapa = posição no ranking abaixo. Cada município aparece com a distribuidora com mais conexões registradas na ANEEL; malha IBGE. Alguns municípios têm mais de uma distribuidora.</figcaption>
        </figure>

        <form className="tarifa-card tarifa-lookup" data-tarifa-lookup action="/calculadora-solar/" method="get" noValidate>
          <h2>Descubra a alta da sua distribuidora</h2>
          <p>Informe sua cidade e o valor da sua conta para simular na calculadora da Sungrid.</p>
          <label className="tarifa-field">
            <span>Cidade ou CEP</span>
            <input name="cidade" list="tarifa-cidades" autoComplete="address-level2" placeholder="Ex.: São José dos Campos" data-tarifa-cidade />
            <datalist id="tarifa-cidades" />
          </label>
          <label className="tarifa-field">
            <span>Valor médio da conta de luz</span>
            <input name="conta" inputMode="decimal" autoComplete="off" placeholder="R$ 0,00" data-tarifa-conta />
          </label>
          <div className="tarifa-result" data-tarifa-result aria-live="polite">
            Digite sua cidade ou CEP para ver a distribuidora e quanto a tarifa dela subiu no período.
          </div>
          <a className="button primary tarifa-button" href="/calculadora-solar/" data-tarifa-calc>Simular na calculadora <Arrow /></a>
          <a className="button tarifa-button tarifa-whatsapp" href={waSimulacao} target="_blank" rel="noreferrer" data-tarifa-wa>Falar no WhatsApp <Arrow /></a>
          <small>A simulação leva à calculadora em sungridsolar.site. A busca por CEP consulta o serviço ViaCEP.</small>
          <noscript><p className="tarifa-small">Ative o JavaScript para consultar sua cidade. O ranking abaixo mostra todas as distribuidoras.</p></noscript>
        </form>
      </section>

      <section className="tarifa-card tarifa-ranking" aria-labelledby="ranking-titulo">
        <div className="tarifa-ranking-head">
          <div>
            <h2 id="ranking-titulo">Ranking: quanto a tarifa subiu em cada distribuidora</h2>
            <p>Alta acumulada da tarifa residencial B1, de 25/11/2021 a 25/11/2026</p>
          </div>
          <span className="tarifa-ipca-key"><i aria-hidden="true" /> IPCA {formatPct(ipca)} (nov/21 a out/26)</span>
        </div>
        <div className="tarifa-bars" style={{ "--ipca-frac": ipca / ESCALA } as React.CSSProperties}>
          <span className="tarifa-ipca-tag" aria-hidden="true">IPCA {formatPct(ipca)}</span>
          <ol>
            {ranking.map((item, index) => (
              <li key={item.key} data-key={item.key}>
                <span className="tarifa-pos" aria-hidden="true">{index + 1}</span>
                <span className="tarifa-name">{item.nome}</span>
                <span className="tarifa-track" aria-hidden="true"><span className={`tarifa-bar ${faixa(item.alta)}`} style={{ width: largura(item.alta) }} /></span>
                <strong className={`tarifa-value ${faixa(item.alta)}`}><span className="sr-only">: a tarifa subiu </span>{formatPct(item.alta)}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <p className="tarifa-source">Fonte: ANEEL, dados abertos de tarifas. Tarifa residencial B1 com impostos não incluídos. IPCA/IBGE.</p>

      <CrossLinks current={pathname} title="Energia solar com a Sungrid" />
      <WhatsAppFloat href={waHref} />
      <SiteFooter variant="service" />
      <script src={`/js/tarifa-energia.min.js?v=${ASSET_VERSION}`} defer />
    </main>
  );
}
