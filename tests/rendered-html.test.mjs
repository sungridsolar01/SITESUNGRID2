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
  assert.match(html, /\/icons\/noun\/solar-cleaning\.png/);
  assert.match(html, /\/icons\/noun\/energy-performance\.png/);
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
  assert.match(html, /\/icons\/noun\/electrical-damage\.png/);
  assert.doesNotMatch(html, /thenounproject\.com/);
});

test("renders the large solar plant maintenance landing page", async () => {
  const response = await render("/manutencao-grandes-usinas");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Manutenção para Grandes Usinas Solares \| Sungrid/);
  assert.match(html, /Disponibilidade é energia/);
  assert.match(html, /Termografia, inspeções elétricas/);
  assert.match(html, /wa\.me\/5512991886006/);
  assert.match(html, /\/icons\/noun\/solar-cleaning\.png/);
  assert.doesNotMatch(html, /thenounproject\.com/);
});
