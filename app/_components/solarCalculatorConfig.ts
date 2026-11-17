import { WHATSAPP_NUMBER } from "./Site";

/**
 * ============================================================================
 *  CONFIGURAÇÃO DA CALCULADORA SOLAR (/calculadora-solar/)
 * ============================================================================
 *
 * Fórmulas usadas (ver public/js/solar-calculator.js):
 *   1. consumo (kWh/mês)  = gasto mensal (R$) / tarifaRsPorKwh
 *   2. potência (kWp)     = consumo / (irradiacaoKwhM2Dia × diasMes × fatorDesempenho)
 *   3. placas             = arredondar para cima (potência / potenciaModuloKwp)
 *   4. valor estimado (R$) = potência (kWp) × preço por kWp, onde o preço é
 *        precoPorKwpAcimaLimite quando a potência (sem arredondar) for >= limiteKwpPrecoReduzido,
 *        e precoPorKwp abaixo disso. O preço escolhido vale para o sistema inteiro.
 *
 * A irradiação (kWh/m².dia) NÃO é tratada como "horas de sol": as perdas reais
 * do sistema entram pelo fatorDesempenho (performance ratio).
 *
 * Proteção: se tarifaRsPorKwh OU fatorDesempenho forem apagados (null) ou inválidos,
 * a calculadora NÃO mostra números: exibe "Calculadora em configuração — fale com a
 * equipe no WhatsApp".
 */
export type SolarCalculatorConfig = {
  irradiacaoKwhM2Dia: number;
  precoPorKwp: number;
  precoPorKwpAcimaLimite: number;
  limiteKwpPrecoReduzido: number;
  potenciaModuloKwp: number;
  diasMes: number;
  gastoMaximo: number;
  gastoPasso: number;
  gastoInicial: number;
  tarifaRsPorKwh: number | null;
  fatorDesempenho: number | null;
  whatsappNumber: string;
};

export const solarCalculatorConfig: SolarCalculatorConfig = {
  /** Irradiação solar de referência para São Paulo, em kWh/m².dia (definida pela Sungrid). */
  irradiacaoKwhM2Dia: 4.7,
  /** Preço estimado do sistema, em R$ por kWp (definido pela Sungrid). */
  precoPorKwp: 2990,
  /** Preço por kWp para sistemas a partir de limiteKwpPrecoReduzido (definido pela Sungrid; vale para o sistema inteiro). */
  precoPorKwpAcimaLimite: 2850,
  /** Potência, em kWp, a partir da qual se usa precoPorKwpAcimaLimite (>= 30 kWp, sem arredondar). */
  limiteKwpPrecoReduzido: 30,
  /** Potência do módulo padrão, em kWp (600 Wp = 0,6 kWp). */
  potenciaModuloKwp: 0.6,
  /** Dias considerados em um mês para o cálculo da geração (média comercial de 30 dias). */
  diasMes: 30,
  /** Fim da barra de gasto mensal. Nesta posição a calculadora mostra "R$ 10.000 ou mais" e usa 10.000 como base mínima ("a partir de"). */
  gastoMaximo: 10000,
  /** Passo do slider de gasto mensal, em R$. */
  gastoPasso: 50,
  /** Posição inicial do slider (apenas ponto de partida da barra, não entra em nenhum cálculo por si só). */
  gastoInicial: 500,

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // DEFINIDO PELA SUNGRID (17/11/2026) — editável aqui:
  // tarifa média de energia, em R$ por kWh. Use ponto como separador decimal.
  tarifaRsPorKwh: 0.95,

  // DEFINIDO PELA SUNGRID (17/11/2026) — editável aqui:
  // fator de desempenho / perdas do sistema (performance ratio), número entre 0 e 1.
  fatorDesempenho: 0.82,
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  /** Número oficial de WhatsApp da Sungrid (o mesmo dos botões do site). */
  whatsappNumber: WHATSAPP_NUMBER,
};

/** A calculadora só mostra números quando os dois parâmetros da Sungrid estão preenchidos. */
export function isSolarCalculatorConfigured(config: SolarCalculatorConfig = solarCalculatorConfig) {
  return typeof config.tarifaRsPorKwh === "number" && config.tarifaRsPorKwh > 0
    && typeof config.fatorDesempenho === "number" && config.fatorDesempenho > 0 && config.fatorDesempenho <= 1;
}
