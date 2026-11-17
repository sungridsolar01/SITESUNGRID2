// Gera public/data/municipios/<UF>.json e public/data/estados.json a partir da API de localidades do IBGE.
// Rode só quando quiser atualizar a lista (os JSON gerados ficam versionados no repositório):
//   node scripts/prepare-municipios.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(rootDir, "public", "data", "municipios");
const api = "https://servicodados.ibge.gov.br/api/v1/localidades";

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`IBGE respondeu HTTP ${response.status} para ${url}`);
  return response.json();
}

const estados = await getJson(`${api}/estados?orderBy=nome`);
const municipios = await getJson(`${api}/municipios`);
const ufPorCodigo = new Map(estados.map((estado) => [String(estado.id), estado.sigla]));
const porUf = new Map(estados.map((estado) => [estado.sigla, []]));

for (const municipio of municipios) {
  // Os dois primeiros dígitos do código IBGE do município são o código da UF.
  const uf = ufPorCodigo.get(String(municipio.id).slice(0, 2));
  if (!uf) throw new Error(`UF não encontrada para o município ${municipio.id} ${municipio.nome}`);
  porUf.get(uf).push(municipio.nome);
}

await mkdir(outputDir, { recursive: true });
const collator = new Intl.Collator("pt-BR");
for (const [uf, nomes] of porUf) {
  nomes.sort(collator.compare);
  await writeFile(join(outputDir, `${uf}.json`), `${JSON.stringify(nomes)}\n`, "utf8");
}
await writeFile(
  join(rootDir, "public", "data", "estados.json"),
  `${JSON.stringify(estados.map((estado) => ({ sigla: estado.sigla, nome: estado.nome })))}\n`,
  "utf8",
);
console.log(`Municípios gerados: ${municipios.length} em ${porUf.size} UFs (SP: ${porUf.get("SP").length})`);
