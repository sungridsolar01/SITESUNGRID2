import { cp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(rootDir, "out");

const publishedEntries = [
  "fonts",
  "icons",
  "images",
  "js",
  "energia-solar-residencial",
  "energia-solar-comercial",
  "energia-solar-rural",
  "carregadores-veiculares",
  "calculadora-solar",
  "data",
  "sistemas-hibridos-e-baterias",
  "energia-solar-sao-jose-dos-campos",
  "energia-solar-estado-de-sao-paulo",
  "blog",
  "seguro-fotovoltaico",
  "manutencao-grandes-usinas",
  "manutencao-de-energia-solar",
  "limpeza-de-paineis-solares",
  "diagnostico-de-sistema-fotovoltaico",
  "contato",
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  ".nojekyll",
  "favicon.svg",
  "favicon.ico",
  "og.png",
];

await rm(join(rootDir, "assets"), { recursive: true, force: true });

for (const entry of publishedEntries) {
  const destination = join(rootDir, entry);
  await rm(destination, { recursive: true, force: true });
  await cp(join(outputDir, entry), destination, { recursive: true });
}

console.log("Arquivos estáticos sincronizados com a raiz publicada pelo GitHub Pages");
