/**
 * Alta acumulada da tarifa residencial B1 (TE + TUSD, sem impostos), de 25/11/2021 a 25/11/2026.
 * Fonte: ANEEL, dados abertos "Tarifas de aplicação das distribuidoras de energia elétrica".
 * Números passados pelo Estrategista de Marketing e conferidos na base da ANEEL em 27/11/2026.
 */
export type Distribuidora = { key: string; nome: string; alta: number };

export const ranking: Distribuidora[] = [
  { key: "santa-cruz", nome: "CPFL Santa Cruz", alta: 43.83 },
  { key: "elektro", nome: "Neoenergia Elektro", alta: 43.22 },
  { key: "ess", nome: "Energisa Sul-Sudeste", alta: 42.24 },
  { key: "enel", nome: "Enel SP", alta: 32.78 },
  { key: "edp", nome: "EDP São Paulo", alta: 26.07 },
  { key: "cpfl-paulista", nome: "CPFL Paulista", alta: 24.14 },
  { key: "piratininga", nome: "CPFL Piratininga", alta: 22.4 },
];

/** IPCA acumulado (IBGE), novembro/2021 a outubro/2026. */
export const ipca = 28.05;

/** Faixa de cor do mapa e das barras. */
export function faixa(alta: number) {
  return alta > 40 ? "g40" : alta >= 30 ? "g30" : "g20";
}

export const formatPct = (value: number) => `+${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
