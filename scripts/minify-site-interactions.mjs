import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { minify } from "terser";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = join(rootDir, "public", "js", "site-interactions.js");
const destinationPath = join(rootDir, "public", "js", "site-interactions.min.js");
const source = await readFile(sourcePath, "utf8");
const result = await minify(source, {
  compress: true,
  mangle: true,
  format: { comments: false },
});

if (!result.code) {
  throw new Error("A minificação de site-interactions.js não gerou conteúdo.");
}

await writeFile(destinationPath, `${result.code}\n`, "utf8");
console.log("JavaScript de interação minificado com sucesso");
