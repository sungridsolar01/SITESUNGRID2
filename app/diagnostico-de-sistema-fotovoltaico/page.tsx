import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Diagnóstico de Sistema Fotovoltaico | Sungrid";
const description = "Diagnóstico de falhas e queda de geração em sistemas fotovoltaicos com inspeção técnica, análise de desempenho e recomendações documentadas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/diagnostico-de-sistema-fotovoltaico/" },
  openGraph: { type: "website", url: "/diagnostico-de-sistema-fotovoltaico/", title, description, images: ["/og.png"] },
};

export default function DiagnosticoFotovoltaicoPage() {
  return <SeoServicePage
    pathname="/diagnostico-de-sistema-fotovoltaico/"
    eyebrow="INVESTIGAÇÃO DE PERDAS E FALHAS"
    title="Diagnóstico de sistema fotovoltaico"
    accent="com evidências claras."
    description={description}
    serviceName="Diagnóstico de sistema fotovoltaico"
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
    contactTitle="Entenda a queda de geração."
    contactAccent="Corrija com prioridade."
  />;
}
