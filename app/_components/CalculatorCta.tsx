import { Arrow } from "./Site";

/** Chamada para a Calculadora Solar, usada na home e nas páginas de energia solar. */
export function CalculatorCta({ text }: { text?: string }) {
  return (
    <section className="calculator-cta" aria-labelledby="calculadora-cta-titulo">
      <div>
        <div className="eyebrow dark"><span /> CALCULADORA SOLAR</div>
        <h2 id="calculadora-cta-titulo">Quanto custa o seu<br /><em>sistema de energia solar?</em></h2>
      </div>
      <div className="calculator-cta-copy">
        <p>{text ?? "Informe a cidade e o gasto mensal com energia e veja uma estimativa da potência do sistema, do número de placas e do valor do projeto. A equipe Sungrid confirma tudo com você pelo WhatsApp."}</p>
        <a className="button primary" href="/calculadora-solar/">Calcular minha estimativa <Arrow /></a>
      </div>
    </section>
  );
}
