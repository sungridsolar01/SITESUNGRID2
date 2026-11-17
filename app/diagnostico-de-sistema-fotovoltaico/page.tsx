import type { Metadata } from "next";
import { QuoteCta } from "../_components/QuoteCta";
import { SeoServicePage } from "../_components/SeoServicePage";
import { Arrow } from "../_components/Site";
import { inverterGuidesByBrand } from "../_components/inverterGuides";

const title = "Diagnóstico de Sistema Fotovoltaico em SP | Sungrid";
const description = "Diagnóstico de falhas e queda de geração em sistemas fotovoltaicos no estado de São Paulo, com inspeção e recomendações documentadas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/diagnostico-de-sistema-fotovoltaico/" },
  openGraph: { type: "website", url: "/diagnostico-de-sistema-fotovoltaico/", title, description, images: ["/og.png?v=20261117"] },
};

function InverterErrorSection() {
  const brands = inverterGuidesByBrand();
  return (
    <QuoteCta
      id="sistema-parou"
      eyebrow="SISTEMA PAROU · ERRO NO INVERSOR"
      title="Sistema parou"
      accent="ou erro no inversor?"
      text="Se o aplicativo parou de mostrar geração, o inversor exibe um código de erro ou uma luz vermelha, anote o código e tire uma foto do display. Não abra o inversor nem mexa nas conexões: os cabos dos painéis continuam energizados durante o dia, mesmo com a rede desligada. Mande as informações pelo WhatsApp que a equipe orienta os próximos passos e, se necessário, agenda o diagnóstico."
      waText="Olá, Sungrid! Meu sistema solar parou ou o inversor está mostrando erro. Marca do inversor: ___ Código do erro: ___"
      buttonLabel="Enviar o erro no WhatsApp"
    >
      <ul className="quote-cta-checklist">
        <li>Marca e modelo do inversor</li>
        <li>Código ou mensagem de erro no display ou no aplicativo</li>
        <li>Desde quando a geração parou ou caiu</li>
        <li>Se houve queda de energia, chuva forte ou obra recente</li>
      </ul>
      {brands.length > 0 && (
        <nav className="inverter-guides" aria-label="Erros de inversor por marca">
          <strong>Guias de erro por marca</strong>
          {brands.map(([brand, guides]) => (
            <div key={brand}>
              <span>{brand}</span>
              <ul>
                {guides.map((guide) => (
                  <li key={guide.href}><a href={guide.href}>{guide.code ? <b>{guide.code}</b> : null} {guide.title} <Arrow /></a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      )}
    </QuoteCta>
  );
}

export default function DiagnosticoFotovoltaicoPage() {
  return <SeoServicePage
    afterContent={<InverterErrorSection />}
    pathname="/diagnostico-de-sistema-fotovoltaico/"
    eyebrow="INVESTIGAÇÃO DE PERDAS E FALHAS"
    title="Diagnóstico de sistema fotovoltaico em SP"
    accent="com evidências claras."
    description={description}
    serviceName="Diagnóstico de sistema fotovoltaico"
    defaultService="Diagnóstico"
    sectionTitle="Diagnóstico de falhas"
    sectionAccent="e queda de geração."
    sectionText="Uma queda de produção pode ter várias causas: sujeira, sombreamento, conexões, módulos, inversores ou configuração. A análise técnica organiza os sinais e direciona a intervenção certa."
    benefits={[
      { title: "Leitura do histórico", text: "Analisamos dados disponíveis, alarmes e relatos para entender quando a perda começou." },
      { title: "Inspeção direcionada", text: "Verificamos os pontos mais prováveis com base no comportamento observado." },
      { title: "Priorização técnica", text: "Separamos achados críticos, importantes e preventivos para facilitar a decisão." },
      { title: "Recomendação documentada", text: "Indicamos correções e próximos testes sem esconder limitações ou incertezas." },
    ]}
    steps={[
      { title: "Coleta de informações", text: "Reunimos dados do sistema, histórico de geração e sintomas percebidos." },
      { title: "Hipóteses técnicas", text: "Organizamos as possíveis causas e definimos a sequência de verificação." },
      { title: "Inspeção e análise", text: "Executamos as verificações aplicáveis ao escopo e registramos evidências." },
      { title: "Diagnóstico priorizado", text: "Entregamos conclusão, recomendações e próximos passos." },
    ]}
    regionText="Com sede em São José dos Campos, a Sungrid investiga falhas e quedas de geração em sistemas fotovoltaicos no estado de São Paulo, com escopo definido a partir dos sintomas e dados disponíveis."
    faq={[
      ["O sistema solar parou de gerar. O que eu faço?", "Verifique se há mensagem ou código de erro no inversor ou no aplicativo, anote e fotografe. Não abra o equipamento nem mexa nos cabos. Envie as informações pelo WhatsApp para a equipe avaliar e, se necessário, agendar o diagnóstico."],
      ["Quais sinais indicam que o sistema precisa de diagnóstico?", "Queda de geração, alarmes recorrentes, desligamentos, diferenças entre strings e aumento inesperado da conta são sinais que merecem avaliação."],
      ["O diagnóstico já inclui o reparo?", "O diagnóstico identifica e documenta as causas prováveis. Reparos adicionais são apresentados separadamente quando necessários."],
      ["A Sungrid realiza diagnóstico fotovoltaico em todo o estado de São Paulo?", "A Sungrid tem sede em São José dos Campos e avalia atendimentos no estado de São Paulo conforme localização, acesso, porte e complexidade do sistema."],
    ]}
    contactTitle="Entenda a queda de geração."
    contactAccent="Corrija com prioridade."
  />;
}
