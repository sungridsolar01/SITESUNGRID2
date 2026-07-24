import assert from "node:assert/strict";
import test from "node:test";

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

test("renders the Sungrid home with links to both service pages", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sungrid \| Manutenção Solar Profissional<\/title>/i);
  assert.match(html, /href="\/seguro-fotovoltaico"/);
  assert.match(html, /href="\/manutencao-grandes-usinas"/);
  assert.match(html, /Seu sistema solar/);
  assert.match(html, /\/images\/solar-maintenance-pexels-1024\.webp/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.webp/);
  assert.match(html, /\/icons\/noun\/energy-performance\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.match(html, /data-sungrid-form/);
  assert.match(html, /src="\/js\/site-interactions\.js"/);
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
  assert.match(html, /src="\/js\/site-interactions\.js"/);
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
  assert.match(html, /src="\/js\/site-interactions\.js"/);
  assert.match(html, /\/images\/grandes-usinas-1024\.webp/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.webp/);
  assert.match(html, /https:\/\/www\.instagram\.com\/sungridmro\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/sungridmro\//);
  assert.doesNotMatch(html, /thenounproject\.com/);
  assert.doesNotMatch(html, /rel="stylesheet"/);
});
