import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(rootDir, "dist", "client");
const outputDir = join(rootDir, "out");
const siteOrigin = "https://sungridsolar.site";

const pages = [
  { pathname: "/", output: "index.html", priority: "1.0", changefreq: "weekly" },
  { pathname: "/energia-solar-residencial", output: "energia-solar-residencial/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/energia-solar-comercial", output: "energia-solar-comercial/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/energia-solar-rural", output: "energia-solar-rural/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/sistemas-hibridos-e-baterias", output: "sistemas-hibridos-e-baterias/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/carregadores-veiculares", output: "carregadores-veiculares/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/manutencao-de-energia-solar", output: "manutencao-de-energia-solar/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/limpeza-de-paineis-solares", output: "limpeza-de-paineis-solares/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/diagnostico-de-sistema-fotovoltaico", output: "diagnostico-de-sistema-fotovoltaico/index.html", priority: "0.9", changefreq: "monthly" },
  { pathname: "/seguro-fotovoltaico", output: "seguro-fotovoltaico/index.html", priority: "0.8", changefreq: "monthly" },
  { pathname: "/manutencao-grandes-usinas", output: "manutencao-grandes-usinas/index.html", priority: "0.8", changefreq: "monthly" },
  { pathname: "/energia-solar-sao-jose-dos-campos", output: "energia-solar-sao-jose-dos-campos/index.html", priority: "0.8", changefreq: "monthly" },
  { pathname: "/energia-solar-estado-de-sao-paulo", output: "energia-solar-estado-de-sao-paulo/index.html", priority: "0.8", changefreq: "monthly" },
  // Cidades em rascunho (São Paulo, Guarulhos, Sorocaba, Araçatuba) não são exportadas. Ver app/_components/cities.ts.
  { pathname: "/blog", output: "blog/index.html", priority: "0.7", changefreq: "weekly" },
  { pathname: "/contato", output: "contato/index.html", priority: "0.7", changefreq: "monthly" },
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerEntry = pathToFileURL(join(rootDir, "dist", "server", "index.js"));
workerEntry.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerEntry.href);

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

function stripRuntime(html) {
  return html
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>\s*/gi, "")
    .replace(/<script\b([^>]*)>([\s\S]*?)<\/script>\s*/gi, (full, attributes, body) => {
      const isVinextRuntime = /\bid=["']_R_["']/i.test(attributes) || body.includes("__VINEXT_RSC_");
      return isVinextRuntime ? "" : full;
    });
}

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
const exported = [];
const queue = [...pages];
const seen = new Set(queue.map((page) => page.pathname));

while (queue.length > 0) {
  const page = queue.shift();
  const response = await worker.fetch(
    new Request(`${siteOrigin}${page.pathname}`, {
      headers: { accept: "text/html" },
    }),
    environment,
    executionContext,
  );

  if (!response.ok) {
    throw new Error(`Falha ao exportar ${page.pathname}: HTTP ${response.status}`);
  }

  const html = stripRuntime(await response.text());
  if (!html.includes("<title>") || !html.includes("data-sungrid-form")) {
    throw new Error(`HTML incompleto gerado para ${page.pathname}`);
  }

  // Descobre automaticamente os artigos e as categorias do blog a partir da página /blog/.
  if (page.pathname === "/blog") {
    for (const [, slug] of html.matchAll(/href="\/blog\/([a-z0-9-]+)\/"/g)) {
      const pathname = `/blog/${slug}`;
      if (seen.has(pathname)) continue;
      seen.add(pathname);
      queue.push({ pathname, output: `blog/${slug}/index.html`, priority: "0.6", changefreq: "monthly" });
    }
    for (const [, slug] of html.matchAll(/href="\/blog\/categoria\/([a-z0-9-]+)\/"/g)) {
      const pathname = `/blog/categoria/${slug}`;
      if (seen.has(pathname)) continue;
      seen.add(pathname);
      queue.push({ pathname, output: `blog/categoria/${slug}/index.html`, priority: "0.5", changefreq: "weekly" });
    }
  }

  const modified = html.match(/property="article:modified_time" content="([0-9-]{10})/)?.[1];
  exported.push({ ...page, lastmod: modified ?? today });

  const destination = join(outputDir, page.output);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${exported.map((page) => `  <url>
    <loc>${siteOrigin}${page.pathname === "/" ? "/" : `${page.pathname}/`}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
await writeFile(join(outputDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(join(rootDir, "public", "sitemap.xml"), sitemap, "utf8");

await writeFile(join(outputDir, ".nojekyll"), "", "utf8");
await writeFile(join(outputDir, "CNAME"), "sungridsolar.site\n", "utf8");
await rm(join(outputDir, "assets"), { recursive: true, force: true });

const notFoundResponse = await worker.fetch(
  new Request(`${siteOrigin}/pagina-nao-encontrada`, { headers: { accept: "text/html" } }),
  environment,
  executionContext,
);
if (notFoundResponse.status !== 404) {
  throw new Error(`Falha ao exportar o 404 real: HTTP ${notFoundResponse.status}`);
}
const notFoundHtml = stripRuntime(await notFoundResponse.text());
if (!notFoundHtml.includes("Página não encontrada") || !notFoundHtml.includes("noindex")) {
  throw new Error("HTML 404 incompleto ou sem noindex.");
}
if (/<link rel="canonical"/i.test(notFoundHtml)) {
  throw new Error("A página 404 não deve declarar canonical.");
}
await writeFile(join(outputDir, "404.html"), notFoundHtml, "utf8");

console.log(`Publicação estática criada em ${outputDir} (${exported.length} páginas + 404)`);
