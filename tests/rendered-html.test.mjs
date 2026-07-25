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
  assert.match(html, /<title>Manutenção de Energia Solar \| Limpeza e Diagnóstico \| Sungrid<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/"/);
  assert.match(html, /property="og:type" content="website"/);
  assert.match(html, /property="og:url" content="https:\/\/sungridsolar\.site\/"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /href="\/seguro-fotovoltaico"/);
  assert.match(html, /href="\/manutencao-grandes-usinas"/);
  assert.match(html, /href="\/limpeza-de-paineis-solares\/"/);
  assert.match(html, /href="\/diagnostico-de-sistema-fotovoltaico\/"/);
  assert.match(html, /Manutenção de Sistemas de Energia Solar/);
  assert.match(html, /\/images\/solar-maintenance-pexels-1024\.webp/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.webp/);
  assert.match(html, /\/icons\/noun\/energy-performance\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /src="\/js\/site-interactions\.min\.js"/);
  assert.doesNotMatch(html, /sungridmro@gmail\.com/);
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
  assert.match(html, /Seguro para Sistemas Fotovoltaicos \| Sungrid/);
  assert.match(html, /Seu investimento merece proteção/);
  assert.match(html, /Coberturas, limites, franquias e exclusões/);
  assert.doesNotMatch(html, /sungridmro@gmail\.com/);
  assert.match(html, /Solicitar contato/);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/seguro-fotovoltaico\/"/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /src="\/js\/site-interactions\.min\.js"/);
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
  assert.match(html, /Manutenção para Grandes Usinas Solares \| Sungrid/);
  assert.match(html, /Disponibilidade é energia/);
  assert.match(html, /Termografia, inspeções elétricas/);
  assert.match(html, /wa\.me\/5512991886006/);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /rel="canonical" href="https:\/\/sungridsolar\.site\/manutencao-grandes-usinas\/"/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /src="\/js\/site-interactions\.min\.js"/);
  assert.match(html, /\/images\/grandes-usinas-1024\.webp/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.doesNotMatch(html, /thenounproject\.com/);
  assert.doesNotMatch(html, /rel="stylesheet"/);
});

const seoPages = [
  ["/limpeza-de-paineis-solares", "Limpeza de Painéis Solares Profissional", "Limpeza de painéis solares"],
  ["/manutencao-de-energia-solar", "Manutenção de Energia Solar Preventiva", "Manutenção de energia solar"],
  ["/diagnostico-de-sistema-fotovoltaico", "Diagnóstico de Sistema Fotovoltaico", "Diagnóstico de sistema fotovoltaico"],
  ["/contato", "Contato | Solicite uma Avaliação Solar", "Solicite uma avaliação"],
];

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
    assert.match(html, /src="\/js\/site-interactions\.min\.js"/);
    assert.doesNotMatch(html, /sungridmro@gmail\.com/);
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
});
