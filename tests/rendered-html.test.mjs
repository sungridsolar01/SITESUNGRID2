import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Sungrid home with complete SEO metadata and service links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Energia Solar em SP \| Instalação, Manutenção e Carregadores \| Sungrid<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/"/);
  assert.match(html, /property="og:type" content="website"/);
  assert.match(html, /property="og:url" content="https:\/\/sungridsolar\.site\/"/);
  assert.match(html, /"@type":\["LocalBusiness","Electrician"\]/);
  assert.match(html, /"streetAddress":"R\. Cel\. José Domingues de Vasconcelos, 181, Vila Adyana"/);
  assert.match(html, /"telephone":"\+55 12 99188-6006"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /id="como-funciona"/);
  assert.match(html, /href="\/sistemas-hibridos-e-baterias\/"/);
  assert.match(html, /class="footer-cities"/);
  assert.match(html, /href="\/energia-solar-estado-de-sao-paulo\/"/);
  assert.doesNotMatch(html, /"openingHours"|AggregateRating|"aggregateRating"|"priceRange"|"legalName"/i);
  assert.match(html, /"name":"Sungrid Solar"/);
  assert.doesNotMatch(html, /SunGrid Solar - Energia solar e manutenção/);
  assert.match(html, /"email":"sungridmro@gmail\.com"/);
  assert.match(html, /"openingHoursSpecification"/);
  assert.match(html, /homologação junto às distribuidoras \(EDP, CPFL, Enel e Eletro Cedrap\)\./);
  assert.match(html, /"latitude":-23\.1960634/);
  assert.match(html, /"longitude":-45\.8927814/);
  assert.match(html, /share\.google\/t0oRwIjyjMxfyupJK/);
  assert.match(html, /"name":"Vale do Paraíba"/);
  assert.match(html, /"name":"Litoral Norte"/);
  assert.match(html, /"alternateName":"Sungrid"/);
  assert.match(html, /"postalCode":"12243-840"/);
  assert.match(html, /"name":"Estado de São Paulo"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /href="\/seguro-fotovoltaico\/"/);
  assert.match(html, /href="\/manutencao-grandes-usinas\/"/);
  assert.match(html, /href="\/limpeza-de-paineis-solares\/"/);
  assert.match(html, /href="\/diagnostico-de-sistema-fotovoltaico\/"/);
  assert.match(html, /Energia Solar em SP<br\/?>/);
  assert.match(html, /"@type":"OfferCatalog"/);
  for (const path of ["energia-solar-residencial", "energia-solar-comercial", "energia-solar-rural", "carregadores-veiculares", "manutencao-de-energia-solar", "blog"]) {
    assert.match(html, new RegExp(`href="/${path}/"`));
  }
  assert.match(html, /class="header-cta" href="https:\/\/wa\.me\/5512991886006\?text=/);
  // Botão da calculadora logo abaixo do botão principal do WhatsApp, no topo da home.
  assert.match(html, /<div class="hero-buttons"><a class="button primary" href="https:\/\/wa\.me\/5512991886006\?text=[^"]*"[^>]*>Pedir orçamento no WhatsApp[\s\S]*?<\/a><a class="button secondary hero-calculator" href="\/calculadora-solar\/">/);
  assert.match(html, /name="Serviço"/);
  assert.match(html, /href="tel:\+5512991886006"/);
  assert.match(html, /R\. Cel\. José Domingues de Vasconcelos, 181/);
  assert.match(html, /\/images\/solar-maintenance-pexels-1024\.webp/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.webp/);
  assert.match(html, /\/icons\/noun\/energy-performance\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /src="\/js\/site-interactions\.min\.js\?v=\d+"/);
  assert.match(html, /sungridmro@gmail\.com/);
  assert.doesNotMatch(html, /ContactForm-[^"']+\.js/);
  assert.doesNotMatch(html, /fonts\.googleapis\.com/);
  assert.match(html, /data-critical-css/);
  assert.doesNotMatch(html, /rel="stylesheet"/);
  assert.doesNotMatch(html, /thenounproject\.com/);
});

test("renders the photovoltaic insurance landing page", async () => {
  const response = await render("/seguro-fotovoltaico");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Seguro para Sistemas Fotovoltaicos em SP \| Sungrid/);
  assert.match(html, /Seu investimento merece proteção/);
  assert.match(html, /Coberturas, limites, franquias e exclusões/);
  assert.match(html, /sungridmro@gmail\.com/);
  assert.match(html, /Solicitar contato/);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/seguro-fotovoltaico\/"/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /ESTADO DE SÃO PAULO/);
  assert.match(html, /R\. Cel\. José Domingues de Vasconcelos, 181/);
  assert.match(html, /src="\/js\/site-interactions\.min\.js\?v=\d+"/);
  assert.match(html, /\/images\/seguro-fotovoltaico-1024\.webp/);
  assert.match(html, /\/icons\/noun\/electrical-damage\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.doesNotMatch(html, /thenounproject\.com/);
  assert.doesNotMatch(html, /rel="stylesheet"/);
});

test("renders the large solar plant maintenance landing page", async () => {
  const response = await render("/manutencao-grandes-usinas");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Manutenção de Grandes Usinas Solares em SP \| Sungrid/);
  assert.match(html, /Disponibilidade é energia/);
  assert.match(html, /Termografia, inspeções elétricas/);
  assert.match(html, /wa\.me\/5512991886006/);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/manutencao-grandes-usinas\/"/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /ESTADO DE SÃO PAULO/);
  assert.match(html, /R\. Cel\. José Domingues de Vasconcelos, 181/);
  assert.match(html, /src="\/js\/site-interactions\.min\.js\?v=\d+"/);
  assert.match(html, /\/images\/grandes-usinas-1024\.webp/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.doesNotMatch(html, /thenounproject\.com/);
  assert.doesNotMatch(html, /rel="stylesheet"/);
});

const seoPages = [
  ["/limpeza-de-paineis-solares", "Limpeza de Placas Solares em SP", "Limpeza de placas solares em SP"],
  ["/manutencao-de-energia-solar", "Manutenção de Energia Solar em SP", "Manutenção de energia solar em SP"],
  ["/diagnostico-de-sistema-fotovoltaico", "Diagnóstico de Sistema Fotovoltaico em SP", "Diagnóstico de sistema fotovoltaico em SP"],
  ["/contato", "Contato Sungrid em SP", "Peça seu orçamento"],
  ["/carregadores-veiculares", "Instalação de Wallbox em SP", "Instalação de wallbox em SP"],
];

const installPages = [
  ["/energia-solar-residencial", "Instalação de Energia Solar para Casas em SP", "energia solar residencial"],
  ["/energia-solar-comercial", "Energia Solar Comercial em SP", "energia solar comercial"],
  ["/energia-solar-rural", "Energia Solar Rural em SP", "energia solar rural"],
];

for (const [pathname, expectedTitle, waLabel] of installPages) {
  test(`renders installation landing ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(expectedTitle));
    assert.match(html, new RegExp(`rel="canonical" href="https://sungridsolar\\.site${pathname}/"`));
    assert.match(html, /"@type":"Service"/);
    assert.match(html, /data-sungrid-form/);
    assert.match(html, /name="Serviço"/);
    assert.match(html, new RegExp(encodeURIComponent(`Vim pela página de ${waLabel}`).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(html, /class="whatsapp-float"/);
    assert.match(html, /aria-label="Serviços relacionados"/);
  });
}

const cityPages = [
  ["/energia-solar-sao-jose-dos-campos", "Energia Solar em São José dos Campos", "EDP"],
];

// Cidades em rascunho: não podem ser publicadas, linkadas nem entrar no sitemap.
const draftCityPages = ["/energia-solar-sao-paulo", "/energia-solar-guarulhos", "/energia-solar-sorocaba", "/energia-solar-aracatuba"];

test("keeps draft city pages unpublished and unlinked", async () => {
  for (const pathname of draftCityPages) {
    const response = await render(pathname);
    assert.equal(response.status, 404, `${pathname} deve responder 404 enquanto for rascunho`);
  }
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  for (const pathname of ["/", "/blog", "/blog/como-funciona-energia-solar-residencial", "/energia-solar-sao-jose-dos-campos", "/energia-solar-estado-de-sao-paulo"]) {
    const html = await (await render(pathname)).text();
    for (const draft of draftCityPages) assert.doesNotMatch(html, new RegExp(`href="${draft}/"`), `${pathname} não deve linkar ${draft}`);
  }
  for (const draft of draftCityPages) assert.doesNotMatch(sitemap, new RegExp(`${draft}/`));
});

test("renders the São Paulo state coverage page", async () => {
  const response = await render("/energia-solar-estado-de-sao-paulo");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Energia Solar no Estado de São Paulo/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/energia-solar-estado-de-sao-paulo\/"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /href="\/energia-solar-sao-jose-dos-campos\/"/);
  assert.match(html, /data-sungrid-form/);
});

for (const [pathname, expectedTitle, utility] of cityPages) {
  test(`renders city landing ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${expectedTitle}`));
    assert.match(html, new RegExp(`<h1>${expectedTitle}<br/?>`, "i"));
    assert.match(html, new RegExp(`rel="canonical" href="https://sungridsolar\\.site${pathname}/"`));
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /"@type":"City"/);
    assert.match(html, new RegExp(utility));
    assert.match(html, /data-sungrid-form/);
    assert.match(html, /wa\.me\/5512991886006\?text=/);
    const hasMap = /google\.com\/maps\?q=/.test(html);
    assert.equal(hasMap, pathname === "/energia-solar-sao-jose-dos-campos", "o mapa aparece só na página da sede");
  });
}

test("renders the SEO tweaks for wallbox, cleaning and inverter errors", async () => {
  const wallbox = await (await render("/carregadores-veiculares")).text();
  assert.match(wallbox, /<title>Instalação de Wallbox em SP \| Carregador de Carro Elétrico/);
  assert.match(wallbox, /<h1>Instalação de wallbox em SP<br\/?>/);
  assert.match(wallbox, /id="condominios"/);
  assert.match(wallbox, /síndico/);
  assert.match(wallbox, /"@type":"FAQPage"/);
  const cleaning = await (await render("/limpeza-de-paineis-solares")).text();
  assert.match(cleaning, /"@type":"FAQPage"/);
  assert.match(cleaning, /id="orcamento-limpeza"/);
  assert.doesNotMatch(cleaning, /R\$\s?\d/);
  const diagnosis = await (await render("/diagnostico-de-sistema-fotovoltaico")).text();
  assert.match(diagnosis, /id="sistema-parou"/);
  assert.match(diagnosis, /Sistema parou<br\/?><em>ou erro no inversor\?/);
  assert.doesNotMatch(diagnosis, /class="inverter-guides"/, "sem guias cadastrados o bloco de links não aparece");
  for (const html of [wallbox, cleaning, diagnosis]) {
    assert.match(html, /R\. Cel\. José Domingues de Vasconcelos, 181, Vila Adyana, São José dos Campos - SP, 12243-840/);
    assert.match(html, /\(12\) 99188-6006/);
    assert.doesNotMatch(html, /Urbanova|\bPIT\b/);
  }
});

test("renders the solar calculator form with the Sungrid parameters", async () => {
  const response = await render("/calculadora-solar");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Calculadora Solar \| Estime seu Sistema de Energia Solar \| Sungrid<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/calculadora-solar\/"/);
  assert.match(html, /data-solar-calculator/);
  assert.match(html, /<option value="SP" selected="">São Paulo<\/option>|<option selected="" value="SP">/);
  assert.match(html, /type="range"[^>]*max="10000"/);
  assert.match(html, /R\$ 10\.000 ou mais/);
  assert.match(html, /Tem interesse em baterias e sistemas de armazenamento\?/);
  assert.match(html, /Calculadora em configuração — fale com a equipe no WhatsApp/);
  assert.match(html, /src="\/js\/solar-calculator\.min\.js\?v=\d+"/);
  const config = JSON.parse(html.match(/<script type="application\/json" id="solar-calculator-config">([^<]*)<\/script>/)[1]);
  assert.equal(config.irradiacaoKwhM2Dia, 4.7);
  assert.equal(config.precoPorKwp, 2990);
  assert.equal(config.precoPorKwpAcimaLimite, 2850);
  assert.equal(config.limiteKwpPrecoReduzido, 30);
  assert.equal(config.potenciaModuloKwp, 0.6);
  assert.equal(config.gastoMaximo, 10000);
  assert.equal(config.whatsappNumber, "5512991886006");
  // Tarifa e fator de desempenho definidos pela Sungrid em 17/11/2026.
  assert.equal(config.tarifaRsPorKwh, 0.95);
  assert.equal(config.fatorDesempenho, 0.82);
});

test("renders the calculator result page with only the requested items", async () => {
  const response = await render("/calculadora-solar/resultado");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<meta name="robots" content="noindex, follow"\/>/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.doesNotMatch(html, /class="whatsapp-float"/);
  assert.doesNotMatch(html, /data-sungrid-form/);
  assert.doesNotMatch(html, /aria-label="Serviços relacionados"/);
  const card = html.match(/<div class="calculator-result-card"[\s\S]*?<\/div><div class="calculator-pending"/)[0];
  assert.equal((card.match(/<dt>/g) || []).length, 3);
  assert.match(card, /O projeto já inclui equipamentos, aprovação do projeto e instalação\./);
  assert.match(card, />Confirme seu orçamento </);
  assert.match(card, /a partir de/);
  assert.match(card, /Estimativa sujeita à confirmação pela equipe Sungrid\./);
});

test("links the calculator from navigation, home and solar pages", async () => {
  for (const pathname of ["/", "/energia-solar-residencial", "/energia-solar-comercial"]) {
    const html = await (await render(pathname)).text();
    assert.match(html, /class="calculator-cta"/, `${pathname} deve ter a chamada para a calculadora`);
    assert.match(html, /href="\/calculadora-solar\/"/);
  }
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/calculadora-solar\/</);
  assert.doesNotMatch(sitemap, /calculadora-solar\/resultado/);
});

test("renders the hybrid and battery page with FAQPage schema", async () => {
  const response = await render("/sistemas-hibridos-e-baterias");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Energia Solar Híbrida, Baterias e Off-Grid em SP/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /Energia solar funciona quando falta luz\?/);
  assert.doesNotMatch(html, /"@type":"VideoObject"/, "sem vídeo configurado não deve haver VideoObject");
  assert.doesNotMatch(html, /youtube/i, "sem vídeo configurado não deve haver embed");
});

test("renders blog category pages and related links", async () => {
  const index = await render("/blog");
  const indexHtml = await index.text();
  const categories = [...new Set([...indexHtml.matchAll(/href="\/blog\/categoria\/([a-z0-9-]+)\/"/g)].map((match) => match[1]))];
  assert.ok(categories.length >= 1, "o blog deve listar categorias com artigos");
  for (const slug of categories) {
    const response = await render(`/blog/categoria/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /"@type":"CollectionPage"/);
    assert.match(html, new RegExp(`rel="canonical" href="https://sungridsolar\\.site/blog/categoria/${slug}/"`));
    assert.match(html, /class="service-card blog-card"/);
  }
  const empty = await render("/blog/categoria/categoria-inexistente");
  assert.equal(empty.status, 404);
  const post = await (await render("/blog/como-funciona-energia-solar-residencial")).text();
  assert.match(post, /class="blog-related"/);
  assert.match(post, /href="\/sistemas-hibridos-e-baterias\/"/);
  assert.match(post, /href="\/blog\/categoria\/como-funciona\/"/);
});

test("renders the blog index and posts with Article schema", async () => {
  const index = await render("/blog");
  assert.equal(index.status, 200);
  const indexHtml = await index.text();
  assert.match(indexHtml, /<title>Blog Sungrid/);
  assert.match(indexHtml, /"@type":"Blog"/);
  const slugs = [...indexHtml.matchAll(/href="\/blog\/([a-z0-9-]+)\/"/g)].map((match) => match[1]);
  assert.ok(slugs.length >= 1, "o blog deve listar ao menos um artigo");
  for (const slug of new Set(slugs)) {
    const response = await render(`/blog/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    // Um único schema de artigo: o BlogPosting do template (articleSchema, se existir, entra no lugar).
    const articleTypes = (html.match(/"@type":\s*"(BlogPosting|Article)"/g) || []).length;
    assert.equal(articleTypes, 1, `${slug}: ${articleTypes} schemas de artigo`);
    assert.match(html, /property="og:type" content="article"/);
    assert.match(html, new RegExp(`rel="canonical" href="https://sungridsolar\\.site/blog/${slug}/"`));
    assert.match(html, /class="blog-article"/);
    assert.match(html, /data-sungrid-form/);
  }
  const missing = await render("/blog/artigo-que-nao-existe");
  assert.equal(missing.status, 404);
});

for (const [pathname, expectedTitle, expectedHeading] of seoPages) {
  test(`renders SEO landing ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(expectedTitle));
    assert.match(html, new RegExp(expectedHeading, "i"));
    assert.match(html, new RegExp(`rel="canonical" href="https://sungridsolar\\.site${pathname}/"`));
    assert.match(html, /property="og:type" content="website"/);
    assert.match(html, /"@type":"Service"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /data-sungrid-form/);
    assert.match(html, /src="\/js\/site-interactions\.min\.js\?v=\d+"/);
    assert.match(html, /ATENDIMENTO NO ESTADO DE SÃO PAULO/);
    assert.match(html, /PERGUNTAS FREQUENTES/);
    assert.match(html, /R\. Cel\. José Domingues de Vasconcelos, 181/);
    assert.match(html, /sungridmro@gmail\.com/);
  });
}

test("publishes crawler directives and a sitemap with every indexable route", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/sungridsolar\.site\/sitemap\.xml/);
  for (const [pathname] of seoPages) {
    assert.match(sitemap, new RegExp(`https://sungridsolar\\.site${pathname}/`));
  }
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/seguro-fotovoltaico\//);
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/manutencao-grandes-usinas\//);
  for (const [pathname] of cityPages) {
    assert.match(sitemap, new RegExp(`https://sungridsolar\\.site${pathname}/`));
  }
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/sistemas-hibridos-e-baterias\//);
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/energia-solar-estado-de-sao-paulo\//);
  assert.doesNotMatch(sitemap, /<loc>(http:\/\/|https:\/\/www\.)/);
  assert.doesNotMatch(robots, /Disallow:\s*\/\S/);
  assert.deepEqual(robots.match(/^Sitemap:.*$/gm), ["Sitemap: https://sungridsolar.site/sitemap.xml"]);
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/blog\/categoria\/[a-z0-9-]+\//);
  for (const path of ["energia-solar-residencial", "energia-solar-comercial", "energia-solar-rural", "carregadores-veiculares", "blog"]) {
    assert.match(sitemap, new RegExp(`https://sungridsolar\\.site/${path}/`));
  }
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/blog\/[a-z0-9-]+\//);
});

test("renders a real noindex 404 without canonical or home metadata", async () => {
  const response = await render("/pagina-que-nao-existe");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /<title>Página não encontrada \| Sungrid<\/title>/i);
  assert.match(html, /(?:name="robots" content="noindex(?:, follow)?"|content="noindex(?:, follow)?" name="robots")/);
  assert.match(html, /Página não encontrada/);
  assert.match(html, /R\. Cel\. José Domingues de Vasconcelos, 181/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.doesNotMatch(html, /Energia Solar em SP \| Instalação, Manutenção e Carregadores/);
  assert.match(html, /class="whatsapp-float"/);
});

test("âncoras internas descritivas (auditoria de âncoras)", async () => {
  const home = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.doesNotMatch(home, />Saiba mais</);
  assert.match(home, /<a class="service-link" href="\/manutencao-de-energia-solar\/">Manutenção de painel solar/);
  assert.match(home, /<a class="service-link" href="\/carregadores-veiculares\/">Instalação de wallbox/);
  const page = await readFile(new URL("../energia-solar-residencial/index.html", import.meta.url), "utf8");
  assert.match(page, /class="region-links"[^>]*>[\s\S]*?href="\/energia-solar-estado-de-sao-paulo\/"/);
  assert.match(page, /<nav class="seo-related"[\s\S]*?href="\/calculadora-solar\/">Calculadora de energia solar[\s\S]*?href="\/blog\/como-funciona-energia-solar-residencial\/"/);
  assert.match(page, /href="\/limpeza-de-paineis-solares\/">Limpeza de placa solar/);
});

test("meta descriptions únicas, com até 160 caracteres e iguais em og/twitter", async () => {
  const pages = ["", "energia-solar-residencial/", "energia-solar-comercial/", "energia-solar-rural/", "sistemas-hibridos-e-baterias/", "carregadores-veiculares/", "manutencao-de-energia-solar/", "limpeza-de-paineis-solares/", "diagnostico-de-sistema-fotovoltaico/", "seguro-fotovoltaico/", "manutencao-grandes-usinas/", "energia-solar-sao-jose-dos-campos/", "energia-solar-estado-de-sao-paulo/", "calculadora-solar/", "blog/", "contato/", "blog/categoria/creditos-e-regras/", "blog/categoria/como-funciona/", "blog/categoria/residencial-e-apartamento/", "blog/categoria/dimensionamento-por-consumo/", "blog/como-funciona-energia-solar-residencial/", "blog/por-que-fazer-manutencao-sistema-fotovoltaico/", "blog/energia-solar-em-apartamento/", "blog/como-transferir-creditos-de-energia-solar-para-outra-residencia/", "blog/como-conseguir-energia-solar-pelo-governo/", "blog/quem-tem-energia-solar-tem-desconto-no-iptu/", "blog/quem-tem-energia-solar-paga-conta-de-luz/", "blog/energia-solar-como-funciona-vantagens-desvantagens/", "blog/energia-solar-1000-kwh-mes/", "blog/bateria-para-energia-solar/", "blog/energia-solar-off-grid/", "blog/energia-solar-quando-falta-luz/", "blog/sistema-hibrido-energia-solar/", "blog/fio-b-energia-solar/", "tarifa-energia-sp/"];
  const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
  const seen = new Set();
  for (const page of pages) {
    const html = await readFile(new URL(`../${page}index.html`, import.meta.url), "utf8");
    const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
    assert.ok(desc.length <= 160, `${page}: ${desc.length}`);
    assert.ok(!seen.has(desc), `duplicada: ${page}`); seen.add(desc);
    assert.equal(decode(html.match(/<meta property="og:description" content="([^"]*)"/)[1]), desc, page);
    assert.equal(decode(html.match(/<meta name="twitter:description" content="([^"]*)"/)[1]), desc, page);
  }
  const home = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(home, /<meta name="description" content="Energia solar, manutenção de painel solar, seguro fotovoltaico e instalação de wallbox no estado de São Paulo\. Peça seu orçamento pelo WhatsApp\."/);
});

test("10 artigos novos do blog: FAQPage único, tabelas, checklist e links internos", async () => {
  const slugs = ["energia-solar-em-apartamento", "como-transferir-creditos-de-energia-solar-para-outra-residencia", "como-conseguir-energia-solar-pelo-governo", "quem-tem-energia-solar-tem-desconto-no-iptu", "quem-tem-energia-solar-paga-conta-de-luz", "energia-solar-como-funciona-vantagens-desvantagens", "energia-solar-1000-kwh-mes", "bateria-para-energia-solar", "energia-solar-off-grid", "energia-solar-quando-falta-luz"];
  const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  const index = await readFile(new URL("../blog/index.html", import.meta.url), "utf8");
  for (const slug of slugs) {
    const html = await readFile(new URL(`../blog/${slug}/index.html`, import.meta.url), "utf8");
    assert.equal((html.match(/"@type":\s*"FAQPage"/g) || []).length, 1, slug);
    assert.match(html, /<div class="blog-table"/, slug);
    assert.match(html, /class="blog-checklist"/, slug);
    assert.doesNotMatch(html, /Resposta direta|LINK INTERNO/, slug);
    assert.match(sitemap, new RegExp(`https://sungridsolar\\.site/blog/${slug}/`), slug);
    assert.match(index, new RegExp(`href="/blog/${slug}/"`), slug);
  }
  const offgrid = await readFile(new URL("../blog/energia-solar-off-grid/index.html", import.meta.url), "utf8");
  assert.match(offgrid, /href="\/blog\/bateria-para-energia-solar\/"/);
  assert.match(offgrid, /href="\/sistemas-hibridos-e-baterias\/"/);
  assert.doesNotMatch(sitemap, /off-grid-ou-hibrido/);
  assert.match(sitemap, /\/blog\/categoria\/dimensionamento-por-consumo\//);
});

test("post 11 (sistema híbrido): BlogPosting padrão, FAQPage do arquivo, relacionados nos dois sentidos", async () => {
  const html = await readFile(new URL("../blog/sistema-hibrido-energia-solar/index.html", import.meta.url), "utf8");
  assert.equal((html.match(/"@type":\s*"BlogPosting"/g) || []).length, 1);
  assert.doesNotMatch(html, /"@type":\s*"Article"/);
  assert.equal((html.match(/"@type":\s*"FAQPage"/g) || []).length, 1);
  assert.match(html, /"image":\s*"https:\/\/sungridsolar\.site\/og\.png"/);
  assert.match(html, /"dateModified":\s*"2026-11-28T16:05:50-03:00"/);
  assert.match(html, /"author":\s*\{"@id":\s*"https:\/\/sungridsolar\.site\/#organization"\}/);
  assert.match(html, /"publisher":\s*\{"@id":\s*"https:\/\/sungridsolar\.site\/#organization"\}/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /<title>Sistema híbrido de energia solar: como dimensionar e por que contratar um especialista<\/title>/);
  assert.doesNotMatch(html, /Resposta direta|LINK INTERNO|href="http:\/\//);
  for (const slug of ["bateria-para-energia-solar", "energia-solar-off-grid", "energia-solar-quando-falta-luz"]) {
    assert.match(html, new RegExp(`aria-label="Artigos relacionados"[\\s\\S]*?href="/blog/${slug}/"`), slug);
    const other = await readFile(new URL(`../blog/${slug}/index.html`, import.meta.url), "utf8");
    assert.match(other, /aria-label="Artigos relacionados"[\s\S]*?href="\/blog\/sistema-hibrido-energia-solar\/"/, slug);
  }
  const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/blog\/sistema-hibrido-energia-solar\//);
  const index = await readFile(new URL("../blog/index.html", import.meta.url), "utf8");
  assert.match(index, /href="\/blog\/sistema-hibrido-energia-solar\/"/);
});

test("post 12 (Fio B): BlogPosting padrão, FAQPage do arquivo, relacionados nos dois sentidos e link no post 05", async () => {
  const html = await readFile(new URL("../blog/fio-b-energia-solar/index.html", import.meta.url), "utf8");
  assert.equal((html.match(/"@type":\s*"BlogPosting"/g) || []).length, 1);
  assert.doesNotMatch(html, /"@type":\s*"Article"/);
  assert.equal((html.match(/"@type":\s*"FAQPage"/g) || []).length, 1);
  assert.match(html, /"image":\s*"https:\/\/sungridsolar\.site\/og\.png"/);
  assert.match(html, /"dateModified":\s*"2026-11-28T16:05:50-03:00"/);
  assert.match(html, /"author":\s*\{"@id":\s*"https:\/\/sungridsolar\.site\/#organization"\}/);
  assert.match(html, /"publisher":\s*\{"@id":\s*"https:\/\/sungridsolar\.site\/#organization"\}/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /<title>Fio B energia solar: como funciona a cobrança, quem paga e como a bateria ajuda a reduzir<\/title>/);
  assert.doesNotMatch(html, /Resposta direta|LINK INTERNO|href="http:\/\//);
  assert.match(html, /wa\.me\/5512991886006\?text=[^"]*Fio%20B/);
  assert.equal((html.match(/class="blog-table"/g) || []).length, 3);
  assert.match(html, /class="blog-checklist"/);
  for (const slug of ["bateria-para-energia-solar", "sistema-hibrido-energia-solar", "quem-tem-energia-solar-paga-conta-de-luz"]) {
    assert.match(html, new RegExp(`aria-label="Artigos relacionados"[\\s\\S]*?href="/blog/${slug}/"`), slug);
    const other = await readFile(new URL(`../blog/${slug}/index.html`, import.meta.url), "utf8");
    assert.match(other, /aria-label="Artigos relacionados"[\s\S]*?href="\/blog\/fio-b-energia-solar\/"/, slug);
  }
  const post05 = await readFile(new URL("../blog/quem-tem-energia-solar-paga-conta-de-luz/index.html", import.meta.url), "utf8");
  assert.match(post05, /entra nessa cobrança\.[^<]*<a href="\/blog\/fio-b-energia-solar\/">guia do Fio B na energia solar<\/a>/);
  const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /https:\/\/sungridsolar\.site\/blog\/fio-b-energia-solar\//);
  const index = await readFile(new URL("../blog/index.html", import.meta.url), "utf8");
  assert.match(index, /href="\/blog\/fio-b-energia-solar\/"/);
});

test("llms.txt: formato llmstxt.org, NAP correto e só URLs do sitemap", async () => {
  const llms = await readFile(new URL("../llms.txt", import.meta.url), "utf8");
  assert.match(llms, /^# Sungrid Solar\n\n> /);
  assert.match(llms, /Horário de atendimento: segunda a sábado, das 8h às 20h/);
  assert.doesNotMatch(llms, /CNPJ|razão social|legalName|Inova Simples/i);

  assert.match(llms, /R\. Cel\. José Domingues de Vasconcelos, 181, Vila Adyana, São José dos Campos - SP, 12243-840/);
  assert.match(llms, /\(12\) 99188-6006/);
  assert.match(llms, /https:\/\/wa\.me\/5512991886006/);
  assert.match(llms, /sungridmro@gmail\.com/);
  // Nada de colchetes de modelo: todo "[" precisa abrir um link markdown "[texto](https://...)".
  assert.doesNotMatch(llms, /\[(?![^\]\n]*\]\(https:\/\/)/);
  assert.doesNotMatch(llms, /preencher|confirmar|\bex\.:/i);
  assert.doesNotMatch(llms, /Urbanova|Parque Tecnol|PIT|http:\/\//);
  const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const urls = [...llms.matchAll(/\]\((https:\/\/sungridsolar\.site\/[^)]*)\)/g)].map((m) => m[1]);
  assert.ok(urls.length >= 25);
  for (const url of urls) {
    if (url === "https://sungridsolar.site/sitemap.xml") continue;
    assert.ok(locs.has(url), `${url} fora do sitemap`);
  }
  const blogPosts = [...locs].filter((u) => /\/blog\/(?!categoria\/)[^/]+\/$/.test(u));
  for (const post of blogPosts) assert.ok(urls.includes(post), `${post} faltando no llms.txt`);
});

test("página /tarifa-energia-sp/: conteúdo, ranking em texto, WhatsApp, item no menu, sitemap e llms.txt", async () => {
  const html = (await readFile(new URL("../tarifa-energia-sp/index.html", import.meta.url), "utf8")).replace(/<!-- -->/g, "");
  assert.match(html, /<title>Aumento da tarifa de energia em SP por distribuidora \(2021–2026\) \| Sungrid<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/tarifa-energia-sp\/"/);
  assert.match(html, /property="og:url" content="https:\/\/sungridsolar\.site\/tarifa-energia-sp\/"/);
  assert.match(html, /<h1>A tarifa sobe de um jeito <em>imprevisível\.<\/em><\/h1>/);
  assert.match(html, /EDP São Paulo, em 2021: <strong>\+16,45%<\/strong>/);
  assert.match(html, /EDP São Paulo, em 2025: <strong>\+16,05%<\/strong>/);
  const expected = [["CPFL Santa Cruz", "+43,83%"], ["Neoenergia Elektro", "+43,22%"], ["Energisa Sul-Sudeste", "+42,24%"], ["Enel SP", "+32,78%"], ["EDP São Paulo", "+26,07%"], ["CPFL Paulista", "+24,14%"], ["CPFL Piratininga", "+22,40%"]];
  const ranking = html.slice(html.indexOf('id="ranking-titulo"'));
  let last = 0;
  for (const [name, pct] of expected) {
    const at = ranking.indexOf(`<span class="tarifa-name">${name}</span>`);
    assert.ok(at > last, `${name} fora de ordem no ranking`);
    assert.ok(ranking.slice(at, at + 600).includes(pct), `${name}: ${pct}`);
    last = at;
  }
  assert.match(html, /IPCA \+28,05% \(nov\/21 a out\/26\)/);
  assert.doesNotMatch(html, /out\/21|SIGEL/);
  assert.match(html, /Cada município aparece com a distribuidora com mais conexões registradas na ANEEL; malha IBGE\. Alguns municípios têm mais de uma distribuidora\./);
  assert.match(html, /Fonte: ANEEL, dados abertos de tarifas\. Tarifa residencial B1 com impostos não incluídos\. IPCA\/IBGE\./);
  assert.match(html, /mapa-distribuidoras-sp\.svg\?v=\d+" [^>]*alt="Mapa do estado de São Paulo/);
  assert.match(html, /href="https:\/\/wa\.me\/5512991886006\?text=Ol%C3%A1!%20Vi%20a%20p%C3%A1gina%20de%20tarifas\.%20Quero%20uma%20simula%C3%A7%C3%A3o\."/);
  assert.match(html, /class="header-cta" href="https:\/\/wa\.me\/5512991886006/);
  assert.match(html, /href="\/calculadora-solar\/" data-tarifa-calc/);
  assert.match(html, /<input [^>]*placeholder="Ex\.: São José dos Campos" data-tarifa-cidade="true"/);
  assert.doesNotMatch(html, /placeholder="[^"]*\d{5}-\d{3}/, "o exemplo do campo não mostra CEP");
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
  assert.doesNotMatch(visible, /[\[\]{}]|RASCUNHO|mockup|sua conta subiu/i);
  assert.doesNotMatch(html, /href="http:\/\//);
  for (const page of ["index.html", "tarifa-energia-sp/index.html", "blog/index.html"]) {
    const other = await readFile(new URL(`../${page}`, import.meta.url), "utf8");
    const desktopAt = other.indexOf('aria-label="Navegação principal"');
    const mobileAt = other.indexOf('aria-label="Navegação móvel"');
    const desktop = other.slice(desktopAt, other.indexOf("</nav>", desktopAt));
    const mobile = other.slice(mobileAt, other.indexOf("</nav>", mobileAt));
    assert.match(desktop, /<a href="\/tarifa-energia-sp\/">Tarifa de Energia<\/a>/, `${page}: menu desktop`);
    assert.match(mobile, /<a href="\/tarifa-energia-sp\/">Tarifa de Energia<\/a>/, `${page}: menu celular`);
  }
  const sitemap = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /<loc>https:\/\/sungridsolar\.site\/tarifa-energia-sp\/<\/loc>/);
  const llms = await readFile(new URL("../llms.txt", import.meta.url), "utf8");
  assert.match(llms, /\[Tarifa de energia em SP\]\(https:\/\/sungridsolar\.site\/tarifa-energia-sp\/\)/);
  const cities = JSON.parse(await readFile(new URL("../data/tarifa-municipios-sp.json", import.meta.url), "utf8"));
  assert.equal(Object.keys(cities).length, 645);
  assert.deepEqual(cities["3549904"].slice(0, 2), ["São José dos Campos", "edp"]);
  assert.deepEqual(cities["3550308"].slice(0, 2), ["São Paulo", "enel"]);
  const svg = await readFile(new URL("../images/tarifa/mapa-distribuidoras-sp.svg", import.meta.url), "utf8");
  assert.match(svg, /^<svg [^>]*role="img"/);
  assert.equal((svg.match(/<g class="tm-k" data-key="[a-z-]+">/g) || []).length, 7);
});

test("mapa interativo: uma área por distribuidora, rótulos só com a distribuidora (nunca a cidade)", async () => {
  const svg = await readFile(new URL("../images/tarifa/mapa-distribuidoras-sp.svg", import.meta.url), "utf8");
  const cities = JSON.parse(await readFile(new URL("../data/tarifa-municipios-sp.json", import.meta.url), "utf8"));
  const areas = [...svg.matchAll(/<g class="tm-a tm-(g40|g30|g20|coop)" data-key="([^"]+)" role="button" tabindex="0" aria-pressed="false" aria-label="([^"]+)">/g)].map((m) => ({ faixa: m[1], key: m[2], label: m[3] }));
  const keysInData = new Set(Object.values(cities).map((entry) => entry[1]));
  assert.deepEqual(areas.map((a) => a.key).sort(), [...keysInData].sort(), "uma área para cada distribuidora/cooperativa da tabela");
  assert.equal(areas.length, 12);
  assert.equal((svg.match(/class="tm-a /g) || []).length, 12, "nenhuma área solta fora dos grupos");
  const expected = {
    "santa-cruz": ["g40", "CPFL Santa Cruz — a tarifa subiu +43,83%"],
    elektro: ["g40", "Neoenergia Elektro — a tarifa subiu +43,22%"],
    ess: ["g40", "Energisa Sul-Sudeste — a tarifa subiu +42,24%"],
    enel: ["g30", "Enel SP — a tarifa subiu +32,78%"],
    edp: ["g20", "EDP São Paulo — a tarifa subiu +26,07%"],
    "cpfl-paulista": ["g20", "CPFL Paulista — a tarifa subiu +24,14%"],
    piratininga: ["g20", "CPFL Piratininga — a tarifa subiu +22,40%"],
  };
  for (const area of areas) {
    if (area.key.startsWith("coop:")) {
      assert.equal(area.faixa, "coop");
      assert.equal(area.label, `${area.key.slice(5)} (cooperativa)`);
    } else {
      assert.deepEqual([area.faixa, area.label], expected[area.key]);
    }
  }
  const distributorWords = Object.values(expected).map(([, label]) => label.split(" — ")[0]).join(" ");
  const cityNames = Object.values(cities).map((entry) => entry[0]).filter((name) => !distributorWords.includes(name));
  for (const sample of ["São José dos Campos", "Taubaté", "Jacareí", "Campinas", "Sorocaba", "Ribeirão Preto", "Paraibuna"]) assert.ok(cityNames.includes(sample));
  for (const area of areas) {
    for (const name of cityNames) assert.ok(!area.label.includes(name), `${area.key}: rótulo com nome de cidade (${name})`);
  }
  assert.doesNotMatch(svg, /<text[^>]*>[^<0-9]/, "o mapa não escreve nomes no desenho");

  const html = await readFile(new URL("../tarifa-energia-sp/index.html", import.meta.url), "utf8");
  assert.match(html, /<div class="tarifa-map-stage" data-tarifa-map="true">/);
  assert.match(html, /role="tooltip" id="tarifa-map-tip" hidden="" data-tarifa-tip="true">/);
  for (const key of Object.keys(expected)) assert.match(html, new RegExp(`<li data-key="${key}">`));
  assert.match(html, /<img src="\/images\/tarifa\/mapa-distribuidoras-sp\.svg\?v=\d+"/, "imagem estática continua como alternativa sem JavaScript");
});

test("todos os blocos JSON-LD das páginas publicadas são JSON válido, com um único LocalBusiness consistente", async () => {
  const { readdir, stat } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const root = new URL("..", import.meta.url);
  const forbidden = ["aggregateRating", "priceRange", "legalName"];
  const pages = [];
  async function walk(dir, rel = "") {
    for (const name of await readdir(dir)) {
      if (["node_modules", "app", "src", "dist", "out", "build", ".git", "public", "scripts", "tests", "work"].includes(name)) continue;
      const path = join(dir, name);
      const info = await stat(path);
      const next = rel ? `${rel}/${name}` : name;
      if (info.isDirectory()) await walk(path, next);
      else if (name === "index.html" || name === "404.html") pages.push(next);
    }
  }
  await walk(root.pathname.replace(/\/$/, "") === "" ? "." : new URL(".", root).pathname);
  // walk from tests/../
  const rootDir = new URL("../", import.meta.url);
  const { fileURLToPath } = await import("node:url");
  const base = fileURLToPath(rootDir);
  pages.length = 0;
  async function walk2(dir) {
    for (const name of await readdir(dir)) {
      if (["node_modules", "app", "dist", "out", "build", ".git", "public", "scripts", "tests", "work", "db", "docs", "drizzle", ".openai"].includes(name)) continue;
      const path = join(dir, name);
      const info = await stat(path);
      if (info.isDirectory()) await walk2(path);
      else if (name.endsWith(".html") && (name === "index.html" || name === "404.html")) pages.push(path);
    }
  }
  await walk2(base);
  assert.ok(pages.length >= 30, `páginas insuficientes: ${pages.length}`);
  const orgId = "https://sungridsolar.site/#organization";
  for (const file of pages) {
    const html = await readFile(file, "utf8");
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    assert.ok(blocks.length >= 1, `${file}: nenhum JSON-LD`);
    let orgs = 0;
    for (const block of blocks) {
      let data;
      try { data = JSON.parse(block); } catch (error) { assert.fail(`${file}: JSON-LD inválido: ${error.message}`); }
      const nodes = [];
      const seen = new Set();
      const collect = (node) => {
        if (!node || typeof node !== "object") return;
        if (seen.has(node)) return;
        if (Array.isArray(node)) { node.forEach(collect); return; }
        seen.add(node);
        nodes.push(node);
        for (const value of Object.values(node)) collect(value);
      };
      collect(data);
      for (const node of nodes) {
        for (const key of forbidden) assert.ok(!(key in node), `${file}: campo proibido ${key}`);
        const types = [].concat(node["@type"] || []);
        if (types.includes("LocalBusiness")) {
          orgs += 1;
          assert.equal(node["@id"], orgId);
          assert.equal(node.name, "Sungrid Solar");
          assert.equal(node.email, "sungridmro@gmail.com");
          assert.equal(node.telephone, "+55 12 99188-6006");
          assert.equal(node.address.streetAddress, "R. Cel. José Domingues de Vasconcelos, 181, Vila Adyana");
          assert.equal(node.address.postalCode, "12243-840");
          assert.equal(node.geo.latitude, -23.1960634);
          assert.equal(node.geo.longitude, -45.8927814);
          assert.equal(node.logo, "https://sungridsolar.site/favicon.svg");
          assert.ok(node.sameAs.includes("https://share.google/t0oRwIjyjMxfyupJK"));
          const areas = node.areaServed.map((item) => item.name).sort();
          assert.deepEqual(areas, ["Estado de São Paulo", "Litoral Norte", "São José dos Campos", "São Paulo", "Vale do Paraíba"]);
          assert.equal(node.openingHoursSpecification.opens, "08:00");
          assert.equal(node.openingHoursSpecification.closes, "20:00");
          assert.deepEqual(node.openingHoursSpecification.dayOfWeek, ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]);
        }
        if (types.includes("Article") || types.includes("BlogPosting")) {
          for (const role of ["author", "publisher"]) {
            if (node[role]) assert.equal(node[role]["@id"], orgId, `${file}: ${role} deve apontar para #organization`);
          }
        }
      }
    }
    assert.equal(orgs, 1, `${file}: esperava 1 LocalBusiness, achei ${orgs}`);
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
    assert.match(visible, /Sungrid Solar/);
    assert.match(visible, /sungridmro@gmail\.com/);
    assert.match(visible, /R\. Cel\. José Domingues de Vasconcelos, 181, Vila Adyana, São José dos Campos - SP, 12243-840/);
    assert.match(visible, /\(12\) 99188-6006/);
    assert.doesNotMatch(visible, /SunGrid Solar - Energia solar e manutenção/);
    assert.doesNotMatch(visible, /Urbanova|Shishima Hifumi|PIT|Parque Tecnológico/);
  }
  // Na página de SJC, o Service continua só com a cidade.
  const sjc = pages.find((p) => p.endsWith("/energia-solar-sao-jose-dos-campos/index.html") || p.endsWith("energia-solar-sao-jose-dos-campos/index.html"));
  assert.ok(sjc, "página de SJC");
  const sjcHtml = await readFile(sjc, "utf8");
  const sjcBlocks = [...sjcHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const services = [];
  const walkNode = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walkNode);
    if ([].concat(node["@type"] || []).includes("Service") && node.areaServed) services.push(node);
    Object.values(node).forEach(walkNode);
  };
  sjcBlocks.forEach(walkNode);
  assert.ok(services.length >= 1);
  for (const service of services) {
    const area = service.areaServed;
    const name = area.name || (Array.isArray(area) ? area.map((a) => a.name).join() : "");
    assert.equal(typeof area === "object" && !Array.isArray(area) ? area.name : name, "São José dos Campos");
  }
});

test("ajustes on-page: H2 novos, títulos e meta sem 'carregador veicular'", async () => {
  const residencial = await readFile(new URL("../energia-solar-residencial/index.html", import.meta.url), "utf8");
  assert.match(residencial, /<title>Instalação de Energia Solar para Casas em SP \| Sungrid<\/title>/);
  assert.match(residencial, /<h1>Energia solar para casas em SP\.<br\/?><em>Sua casa gerando a própria energia\.<\/em><\/h1>/);
  assert.match(residencial, /<h2>Sistema fotovoltaico\.<br\/?><em>Projeto pensado para a sua casa\.<\/em><\/h2>/);
  assert.match(residencial, /<h2>Placa solar e painel solar\.<br\/?><em>No telhado, com projeto sob medida\.<\/em><\/h2>/);
  assert.match(residencial, /<h2>Sistema on-grid\.<br\/?><em>A casa continua ligada à rede\.<\/em><\/h2>/);

  const comercial = await readFile(new URL("../energia-solar-comercial/index.html", import.meta.url), "utf8");
  assert.match(comercial, /<h1>Energia solar para empresas em SP\.<br\/?><em>Menos peso da energia no custo\.<\/em><\/h1>/);
  assert.match(comercial, /<h2>Sistema fotovoltaico\.<br\/?><em>Para o seu negócio, com projeto sob medida\.<\/em><\/h2>/);

  const home = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(home, /<h2>Tudo para gerar<br\/?><em>e cuidar da sua energia\.<\/em><\/h2>/);

  const limpeza = await readFile(new URL("../limpeza-de-paineis-solares/index.html", import.meta.url), "utf8");
  assert.match(limpeza, /<title>Limpeza de Placas Solares em SP \| Sungrid<\/title>/);
  assert.match(limpeza, /<h1>Limpeza de placas solares em SP<br\/?><em>com método e segurança\.<\/em><\/h1>/);

  const hibridos = await readFile(new URL("../sistemas-hibridos-e-baterias/index.html", import.meta.url), "utf8");
  assert.match(hibridos, /<h2>Inversor híbrido\.<br\/?><em>Rede, geração e bateria no mesmo sistema\.<\/em><\/h2>/);

  const offgrid = await readFile(new URL("../blog/energia-solar-off-grid/index.html", import.meta.url), "utf8");
  assert.match(offgrid, /<title>Sistema off-grid ou híbrido: quando vale cada um \| Sungrid<\/title>/);
  assert.match(offgrid, /<h1>Sistema off-grid ou híbrido: quando vale cada um e o que diz a lei<\/h1>/);

  const iptu = await readFile(new URL("../blog/quem-tem-energia-solar-tem-desconto-no-iptu/index.html", import.meta.url), "utf8");
  assert.match(iptu, /<title>IPTU Verde: desconto no IPTU com energia solar \| Sungrid<\/title>/);
  assert.match(iptu, /<h1>IPTU Verde: quem tem energia solar tem desconto no IPTU\?<\/h1>/);

  const { readdir, stat } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const base = fileURLToPath(new URL("../", import.meta.url));
  const pages = [];
  async function walk(dir) {
    for (const name of await readdir(dir)) {
      if (["node_modules", "app", "dist", "out", "build", ".git", "public", "scripts", "tests", "work", "db", "docs", "drizzle", ".openai"].includes(name)) continue;
      const path = join(dir, name);
      const info = await stat(path);
      if (info.isDirectory()) await walk(path);
      else if (name === "index.html" || name === "404.html") pages.push(path);
    }
  }
  await walk(base);
  for (const file of pages) {
    const html = await readFile(file, "utf8");
    const metas = [...html.matchAll(/<meta (?:name="description"|property="og:description"|name="twitter:description") content="([^"]*)"/g)].map((m) => m[1]);
    for (const meta of metas) {
      assert.doesNotMatch(meta, /carregador veicular/i, `${file}: meta ainda tem "carregador veicular"`);
    }
  }
});

test("12 artigos: fechamento Sungrid Solar no H2 e no parágrafo, sem Sungrid MRO", async () => {
  const slugs = [
    "bateria-para-energia-solar",
    "como-conseguir-energia-solar-pelo-governo",
    "como-transferir-creditos-de-energia-solar-para-outra-residencia",
    "energia-solar-1000-kwh-mes",
    "energia-solar-como-funciona-vantagens-desvantagens",
    "energia-solar-em-apartamento",
    "energia-solar-off-grid",
    "energia-solar-quando-falta-luz",
    "fio-b-energia-solar",
    "quem-tem-energia-solar-paga-conta-de-luz",
    "quem-tem-energia-solar-tem-desconto-no-iptu",
    "sistema-hibrido-energia-solar",
  ];
  for (const slug of slugs) {
    const html = await readFile(new URL(`../blog/${slug}/index.html`, import.meta.url), "utf8");
    assert.match(html, /<h2[^>]*>Fale com a Sungrid Solar<\/h2>/, slug);
    assert.match(html, /A Sungrid Solar atua/, slug);
    const closing = html.split(/<h2[^>]*>Fale com a Sungrid Solar<\/h2>/)[1] ?? "";
    assert.doesNotMatch(html, /Fale com a Sungrid MRO/, slug);
    assert.doesNotMatch(closing, /Sungrid MRO/, slug);
  }
});

test("sitemap: lastmod real por URL com fuso -03:00", async () => {
  const xml = await readFile(new URL("../sitemap.xml", import.meta.url), "utf8");
  const rows = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]);
  assert.equal(rows.length, 35);
  const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-03:00$/;
  for (const [loc, lastmod] of rows) {
    assert.match(lastmod, iso, loc);
  }
  const byLoc = Object.fromEntries(rows);
  assert.equal(byLoc["https://sungridsolar.site/"], "2026-11-28T12:56:08-03:00");
  assert.equal(byLoc["https://sungridsolar.site/blog/fio-b-energia-solar/"], "2026-11-28T16:05:50-03:00");
  assert.equal(byLoc["https://sungridsolar.site/blog/por-que-fazer-manutencao-sistema-fotovoltaico/"], "2026-11-28T12:56:08-03:00");
  assert.equal(byLoc["https://sungridsolar.site/energia-solar-residencial/"], "2026-11-28T14:44:31-03:00");
  const distinct = new Set(rows.map(([, lastmod]) => lastmod));
  assert.ok(distinct.size >= 3, `esperava pelo menos 3 lastmods distintos, achei ${distinct.size}`);
});
