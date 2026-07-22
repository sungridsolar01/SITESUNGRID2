import { cp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(rootDir, "out");

const publishedEntries = [
  "assets",
  "fonts",
  "icons",
  "images",
  "seguro-fotovoltaico",
  "manutencao-grandes-usinas",
  "index.html",
  "404.html",
  ".nojekyll",
  "favicon.svg",
  "og.png",
];

for (const entry of publishedEntries) {
  const destination = join(rootDir, entry);
  await rm(destination, { recursive: true, force: true });
  await cp(join(outputDir, entry), destination, { recursive: true });
}

console.log("Arquivos estáticos sincronizados com a raiz publicada pelo GitHub Pages");
