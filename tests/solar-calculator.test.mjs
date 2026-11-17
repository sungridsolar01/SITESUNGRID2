import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

// Carrega o mesmo arquivo usado no navegador, sem DOM (só a parte de cálculo).
const source = await readFile(new URL("../public/js/solar-calculator.js", import.meta.url), "utf8");
const sandbox = { URLSearchParams, Intl, Math, Number, String, encodeURIComponent };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const calc = sandbox.SungridSolarCalculator;

const base = {
  irradiacaoKwhM2Dia: 4.7,
  precoPorKwp: 2990,
  precoPorKwpAcimaLimite: 2850,
  limiteKwpPrecoReduzido: 30,
  potenciaModuloKwp: 0.6,
  diasMes: 30,
  gastoMaximo: 10000,
  gastoPasso: 50,
  gastoInicial: 500,
  whatsappNumber: "5512991886006",
};
// Valores de TESTE (não são parâmetros da Sungrid).
const testConfig = { ...base, tarifaRsPorKwh: 1, fatorDesempenho: 0.8 };

test("não calcula nada enquanto tarifa ou fator de desempenho não estão configurados", () => {
  assert.equal(calc.isConfigured({ ...base, tarifaRsPorKwh: null, fatorDesempenho: null }), false);
  assert.equal(calc.isConfigured({ ...base, tarifaRsPorKwh: 1, fatorDesempenho: null }), false);
  assert.equal(calc.isConfigured({ ...base, tarifaRsPorKwh: null, fatorDesempenho: 0.8 }), false);
  assert.equal(calc.isConfigured({ ...base, tarifaRsPorKwh: 1, fatorDesempenho: 1.5 }), false);
  assert.equal(calc.calcular(1000, { ...base, tarifaRsPorKwh: null, fatorDesempenho: null }), null);
  assert.equal(calc.isConfigured(testConfig), true);
});

test("calcula consumo, kWp, placas e valor pela fórmula da Sungrid", () => {
  const result = calc.calcular(1000, testConfig);
  assert.equal(result.consumoKwhMes, 1000);
  assert.ok(Math.abs(result.potenciaKwp - 1000 / (4.7 * 30 * 0.8)) < 1e-9);
  assert.equal(result.placas, Math.ceil(1000 / (4.7 * 30 * 0.8) / 0.6));
  assert.equal(result.placas, 15);
  assert.ok(Math.abs(result.valor - result.potenciaKwp * 2990) < 1e-9);
  assert.equal(result.aPartirDe, false);
  assert.equal(calc.formatKwp(result.potenciaKwp), "8,87 kWp");
  assert.equal(calc.formatBRL(result.valor), "R$ 26.507");
});

test("arredonda o número de placas para cima, sem erro de ponto flutuante", () => {
  const unit = { ...base, tarifaRsPorKwh: 10, fatorDesempenho: 1, irradiacaoKwhM2Dia: 1, diasMes: 1 };
  assert.equal(calc.calcular(12, unit).placas, 2); // 1,2 kWp / 0,6 = exatamente 2
  assert.equal(calc.calcular(13, unit).placas, 3); // 1,3 kWp / 0,6 = 2,17 → 3
  assert.equal(calc.calcular(1, unit).placas, 1);
});

test("no fim da barra usa R$ 10.000 como base mínima e marca 'a partir de'", () => {
  const result = calc.calcular(10000, testConfig);
  assert.equal(result.gasto, 10000);
  assert.equal(result.aPartirDe, true);
  assert.equal(calc.calcular(25000, testConfig).gasto, 10000);
  assert.match(calc.formatValorEstimado(result), /^R\$ [\d.]+ \(a partir desse valor\)$/);
  assert.doesNotMatch(calc.formatValorEstimado(calc.calcular(9950, testConfig)), /a partir/);
  assert.equal(calc.formatGastoLabel(10000, testConfig), "R$ 10.000 ou mais");
  assert.equal(calc.formatGastoLabel(9950, testConfig), "R$ 9.950");
  assert.equal(calc.formatGastoLabel(0, testConfig), "R$ 0");
  assert.equal(calc.calcular(0, testConfig), null);
});

test("calcula com os parâmetros definidos pela Sungrid (tarifa 0,95 e fator 0,82)", () => {
  const sungrid = { ...base, tarifaRsPorKwh: 0.95, fatorDesempenho: 0.82 };
  const result = calc.calcular(1000, sungrid);
  const kwp = (1000 / 0.95) / (4.7 * 30 * 0.82);
  assert.ok(Math.abs(result.potenciaKwp - kwp) < 1e-9);
  assert.equal(calc.formatKwp(result.potenciaKwp), "9,10 kWp");
  assert.equal(result.placas, 16);
  assert.equal(calc.formatBRL(result.valor), calc.formatBRL(kwp * 2990));
});

test("usa R$ 2.850/kWp a partir de 30 kWp (sem arredondar) e R$ 2.990/kWp abaixo", () => {
  // Configuração unitária: kWp = gasto / tarifa (irradiação 1, 1 dia, fator 1).
  const unit = { ...base, tarifaRsPorKwh: 100, fatorDesempenho: 1, irradiacaoKwhM2Dia: 1, diasMes: 1 };
  const below = calc.calcular(2999, unit); // 29,99 kWp
  assert.ok(Math.abs(below.potenciaKwp - 29.99) < 1e-9);
  assert.equal(below.precoPorKwp, 2990);
  assert.ok(Math.abs(below.valor - 29.99 * 2990) < 1e-6);
  const at = calc.calcular(3000, unit); // 30 kWp
  assert.equal(at.potenciaKwp, 30);
  assert.equal(at.precoPorKwp, 2850);
  assert.equal(at.valor, 30 * 2850);
  assert.equal(calc.precoPorKwpPara(29.999999, unit), 2990);
  assert.equal(calc.precoPorKwpPara(30, unit), 2850);
  // Caso R$ 10.000 ou mais com os parâmetros da Sungrid: 91,04 kWp → R$ 2.850/kWp.
  const sungrid = { ...base, tarifaRsPorKwh: 0.95, fatorDesempenho: 0.82 };
  const top = calc.calcular(10000, sungrid);
  assert.equal(calc.formatKwp(top.potenciaKwp), "91,04 kWp");
  assert.equal(top.aPartirDe, true);
  assert.equal(top.precoPorKwp, 2850);
  assert.ok(Math.abs(top.valor - top.potenciaKwp * 2850) < 1e-6);
});

test("formata valores em reais no padrão brasileiro", () => {
  assert.equal(calc.formatBRL(1234567.4), "R$ 1.234.567");
  assert.equal(calc.formatBRL(2990), "R$ 2.990");
  assert.equal(calc.formatKwp(12.345), "12,35 kWp");
});

test("monta e codifica a mensagem do WhatsApp exatamente como pedido", () => {
  const message = calc.buildWhatsappMessage({ placas: 15, valor: "R$ 26.507", cidade: "São José dos Campos", uf: "SP", baterias: "sim" });
  assert.equal(message, "Olá, tudo bem? Calculei estimativa do meu projeto e será de 15 placas e no valor de R$ 26.507. Gostaria de confirmar esse orçamento para a cidade São José dos Campos - SP\nInteresse em baterias e sistemas de armazenamento: Sim");
  const url = calc.whatsappUrl("5512991886006", message);
  assert.match(url, /^https:\/\/wa\.me\/5512991886006\?text=/);
  assert.equal(decodeURIComponent(url.split("?text=")[1]), message);
  assert.match(url, /%0AInteresse/);
  assert.match(url, /S%C3%A3o%20Jos%C3%A9/);
  assert.doesNotMatch(url.split("?text=")[1], /[ \n?&#]/);
  const no = calc.buildWhatsappMessage({ placas: 3, valor: "R$ 70.000 (a partir desse valor)", cidade: "Campinas", uf: "SP", baterias: "nao" });
  assert.match(no, /Interesse em baterias e sistemas de armazenamento: Não$/);
});

test("valida e preserva estado, cidade, gasto e baterias no fluxo", () => {
  const query = calc.buildQuery({ uf: "SP", cidade: "São José dos Campos", gasto: 10000, baterias: "nao" });
  const parsed = calc.parseQuery(query, testConfig);
  assert.equal(parsed.uf, "SP");
  assert.equal(parsed.cidade, "São José dos Campos");
  assert.equal(parsed.gasto, 10000);
  assert.equal(parsed.baterias, "nao");
  assert.equal(calc.parseQuery("", testConfig), null);
  assert.equal(calc.parseQuery("uf=SP&cidade=Campinas&gasto=0&baterias=sim", testConfig), null);
  assert.equal(calc.parseQuery("uf=SP&cidade=Campinas&gasto=500&baterias=talvez", testConfig), null);
  assert.equal(calc.parseQuery("uf=SPX&cidade=Campinas&gasto=500&baterias=sim", testConfig), null);
});
