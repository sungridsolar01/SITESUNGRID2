import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { businessInfo } from "./BusinessInfo";
import { ContactForm } from "./ContactForm";
import { FaqSchema } from "./FaqSchema";
import { getAllPosts } from "../blog/posts";
import { Arrow, CrossLinks, SiteFooter, SiteHeader, WhatsAppFloat, whatsappUrl } from "./Site";
import { getCity } from "./cities";

export function cityMetadata(slug: string): Metadata {
  const city = getCity(slug);
  const path = `/energia-solar-${city.slug}/`;
  if (city.draft) return { title: "Página não encontrada | Sungrid", robots: { index: false, follow: true } };
  return {
    title: city.title,
    description: city.metaDescription,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "Sungrid", locale: "pt_BR", title: city.title, description: city.metaDescription, images: ["/og.png?v=20261117"] },
  };
}

const mapQuery = encodeURIComponent(`${businessInfo.formattedAddress}`);

export function CityLanding({ slug }: { slug: string }) {
  const city = getCity(slug);
  // Cidades em rascunho não são publicadas.
  if (city.draft) notFound();
  const pathname = `/energia-solar-${city.slug}/`;
  const url = `https://sungridsolar.site${pathname}`;
  const waHref = whatsappUrl(`Olá, Sungrid! Vim pela página de energia solar ${city.inCity} e quero um orçamento.`);

  const services = [
    { number: "01", title: `Instalação de energia solar ${city.inCity}`, text: "Projeto e instalação para casas, empresas e propriedades rurais, dimensionados pelo consumo do imóvel.", icon: "/icons/noun/energy-performance.webp", href: "/energia-solar-residencial/", link: "Energia solar residencial" },
    { number: "02", title: "Manutenção e limpeza de painéis", text: "Limpeza técnica, inspeção e diagnóstico para manter a geração, inclusive em sistemas de outras empresas.", icon: "/icons/noun/solar-cleaning.webp", href: "/limpeza-de-paineis-solares/", link: "Limpeza de painéis" },
    { number: "03", title: "Carregador de carro elétrico", text: "Instalação de wallbox (carregador de carro elétrico) com circuito dedicado e proteções, em casa, condomínio ou empresa.", icon: "/icons/ev-charger.svg", href: "/carregadores-veiculares/", link: "Instalação de wallbox" },
    { number: "04", title: "Híbridos e baterias", text: "Sistemas com baterias para manter cargas importantes em quedas de energia, e soluções off-grid.", icon: "/icons/battery-solar.svg", href: "/sistemas-hibridos-e-baterias/", link: "Híbridos e baterias" },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Energia solar ${city.inCity}`,
        description: city.metaDescription,
        serviceType: "Instalação e manutenção de sistemas de energia solar",
        url,
        areaServed: { "@type": "City", name: city.city, containedInPlace: { "@type": "State", name: "São Paulo" } },
        provider: { "@id": "https://sungridsolar.site/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Página principal", item: "https://sungridsolar.site/" },
          { "@type": "ListItem", position: 2, name: `Energia solar ${city.inCity}`, item: url },
        ],
      },
    ],
  };

  return (
    <main className="seo-service-page city-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <FaqSchema faq={city.faq} pathname={pathname} />
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="seo-service-hero">
        <div className="eyebrow"><span /> {city.eyebrow}</div>
        <p className="service-index"><a href="/">SUNGRID</a> / ENERGIA SOLAR {city.inCity.toUpperCase()}</p>
        <h1>{`Energia solar ${city.inCity}`}<br /><em>{city.accent}</em></h1>
        <p>{city.lead}</p>
        <div className="hero-actions">
          <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp <Arrow /></a>
          <a className="text-link" href="#servicos">Serviços {city.inCity} <span>↓</span></a>
        </div>
      </section>

      <section className="section services" id="servicos">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow dark"><span /> SERVIÇOS {city.inCity.toUpperCase()}</div>
            <h2>Instalação, manutenção<br /><em>e mobilidade elétrica.</em></h2>
          </div>
          <p>Os mesmos serviços da sede, com visita técnica e escopo definidos para o seu imóvel {city.inCity}.</p>
        </div>
        <div className="service-grid">
          {services.map((item) => (
            <article className="service-card" key={item.number}>
              <span className="service-number">{item.number}</span>
              <div className="service-icon"><img src={item.icon} width="96" height="96" loading="lazy" decoding="async" alt="" /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a className="service-link" href={item.href}>{item.link} <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="local-service-section" aria-labelledby="area-atendida">
        <div className="eyebrow dark"><span /> ÁREA ATENDIDA · DISTRIBUIDORA {city.utility.toUpperCase()}</div>
        <h2 id="area-atendida">{city.areaTitle}<br /><em>{city.areaAccent}</em></h2>
        <p>{city.areaText}</p>
        {city.nearby.length > 0 && <p className="city-nearby"><strong>Também atendemos:</strong> {city.nearby.join(" · ")}</p>}
        <a className="text-link city-state-link" href="/energia-solar-estado-de-sao-paulo/">Atendimento em todo o estado de São Paulo <span>↗</span></a>
      </section>

      <section className="seo-process">
        <div>
          <div className="eyebrow"><span /> ENERGIA SOLAR {city.inCity.toUpperCase()}</div>
          <h2>{city.localTitle}<br /><em>{city.localAccent}</em></h2>
        </div>
        <ol>
          {city.localPoints.map((point, index) => (
            <li key={point.title}><span>0{index + 1}</span><div><h3>{point.title}</h3><p>{point.text}</p></div></li>
          ))}
        </ol>
      </section>

      {city.isHeadquarters && (
        <section className="city-map" aria-labelledby="endereco-sungrid">
          <div className="city-map-info">
            <div className="eyebrow dark"><span /> ENDEREÇO DA SEDE</div>
            <h2 id="endereco-sungrid">Sungrid em<br /><em>São José dos Campos.</em></h2>
            <address>
              <strong>{businessInfo.name}</strong>
              <span>{businessInfo.formattedAddress}</span>
              <a href={`tel:${businessInfo.telephone.replace(/[^\d+]/g, "")}`}>{businessInfo.displayTelephone}</a>
            </address>
            <a className="button primary" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">Abrir no Google Maps <Arrow /></a>
          </div>
          <div className="city-map-frame">
            <iframe
              title="Mapa: endereço da Sungrid em São José dos Campos"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}

      <section className="service-faq seo-service-faq">
        <div>
          <div className="eyebrow dark"><span /> PERGUNTAS FREQUENTES</div>
          <h2>Energia solar<br /><em>{city.inCity}.</em></h2>
        </div>
        <div className="faq-list light-faq">
          {city.faq.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span>{question}<i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CrossLinks current={pathname} title={`Mais sobre energia solar ${city.inCity}`} extra={getAllPosts().filter((post) => post.related?.includes(pathname)).map((post) => ({ href: `/blog/${post.slug}/`, label: post.title }))} />

      <section className="service-contact" id="contato">
        <div>
          <div className="eyebrow"><span /> ORÇAMENTO {city.inCity.toUpperCase()}</div>
          <h2>Peça seu orçamento<br /><em>{city.inCity}.</em></h2>
          <p>Para uma resposta mais rápida, chame no WhatsApp (12) 99188-6006. Se preferir, preencha o formulário com a cidade e o tipo de serviço.</p>
        </div>
        <ContactForm kind="home" defaultService={city.defaultService} />
      </section>

      <WhatsAppFloat href={waHref} />
      <SiteFooter variant="service" />
    </main>
  );
}
