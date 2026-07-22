import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(rootDir, "dist", "client");
const outputDir = join(rootDir, "out");
const siteOrigin = "https://sungridsolar.site";

const pages = [
  { pathname: "/", output: "index.html" },
  { pathname: "/seguro-fotovoltaico", output: "seguro-fotovoltaico/index.html" },
  { pathname: "/manutencao-grandes-usinas", output: "manutencao-grandes-usinas/index.html" },
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

for (const page of pages) {
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

  const html = (await response.text())
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>\s*/gi, "")
    .replace(/<script\b([^>]*)>([\s\S]*?)<\/script>\s*/gi, (full, attributes, body) => {
      const isVinextRuntime = /\bid=["']_R_["']/i.test(attributes) || body.includes("__VINEXT_RSC_");
      return isVinextRuntime ? "" : full;
    });
  if (!html.includes("<title>") || !html.includes("data-sungrid-form")) {
    throw new Error(`HTML incompleto gerado para ${page.pathname}`);
  }

  const destination = join(outputDir, page.output);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, "utf8");
}

await writeFile(join(outputDir, ".nojekyll"), "", "utf8");
await writeFile(join(outputDir, "CNAME"), "sungridsolar.site\n", "utf8");
await rm(join(outputDir, "assets"), { recursive: true, force: true });

const homeHtml = await readFile(join(outputDir, "index.html"), "utf8");
await writeFile(join(outputDir, "404.html"), homeHtml, "utf8");

console.log(`Publicação estática criada em ${outputDir}`);
