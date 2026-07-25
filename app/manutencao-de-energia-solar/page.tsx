import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Manutenção de Energia Solar Preventiva | Sungrid";
const description = "Manutenção preventiva de energia solar com inspeção elétrica, análise de desempenho e relatório técnico para reduzir perdas e falhas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/manutencao-de-energia-solar/" },
  openGraph: { type: "website", url: "/manutencao-de-energia-solar/", title, description, images: ["/og.png"] },
};

export default function ManutencaoEnergiaSolarPage() {
  return <SeoServicePage
    pathname="/manutencao-de-energia-solar/"
    eyebrow="MANUTENÇÃO PREVENTIVA FOTOVOLTAICA"
    title="Manutenção de energia solar"
    accent="para desempenho contínuo."
    description={description}
    serviceName="Manutenção de energia solar"
    sectionTitle="Manutenção preventiva"
    sectionAccent="para sistemas fotovoltaicos."
    sectionText="Uma rotina preventiva combina inspeção visual, checagem elétrica, análise da geração e documentação. O objetivo é localizar desvios cedo, preservar componentes e manter o sistema operando com segurança."
    benefits={[
      { title: "Inspeção de componentes", text: "Avaliamos módulos, estruturas, conectores, cabos, quadros e inversores dentro do escopo contratado." },
      { title: "Análise da geração", text: "Comparamos indicadores disponíveis para identificar quedas e comportamentos fora do esperado." },
      { title: "Prevenção de falhas", text: "Classificamos ocorrências por criticidade para orientar correções antes que o impacto aumente." },
      { title: "Relatório técnico", text: "Entregamos evidências, diagnóstico e recomendações em linguagem objetiva." },
    ]}
    steps={[
      { title: "Levantamento inicial", text: "Entendemos o porte, a tecnologia e o histórico do sistema." },
      { title: "Plano de inspeção", text: "Definimos pontos de verificação e condições seguras para o atendimento." },
      { title: "Execução técnica", text: "Realizamos as verificações, medições aplicáveis e registros de campo." },
      { title: "Plano de ação", text: "Organizamos achados e próximos passos em um relatório técnico." },
    ]}
    contactTitle="Evite perdas silenciosas."
    contactAccent="Mantenha a geração em dia."
  />;
}
