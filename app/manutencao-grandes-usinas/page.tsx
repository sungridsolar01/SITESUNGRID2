import type { Metadata } from "next";
import { ServiceLanding } from "../_components/ServiceLanding";

export const metadata: Metadata = {
  title: "Manutenção para Grandes Usinas Solares | Sungrid",
  description: "Operação e manutenção técnica para usinas fotovoltaicas de maior porte, com rotinas preventivas, diagnóstico e relatórios gerenciais.",
};

export default function GrandesUsinasPage() {
  return <ServiceLanding
    kind="utility"
    eyebrow="MANUTENÇÃO PARA GRANDES USINAS"
    title="Disponibilidade é energia."
    accent="Energia é resultado."
    description="O&M estruturada para ativos fotovoltaicos em escala: execução técnica, rastreabilidade e informação para decisões mais rápidas e seguras."
    image="/images/grandes-usinas"
    imageAlt="Vista aérea de uma grande usina fotovoltaica"
    metricLabel="FOCO OPERACIONAL"
    metricValue="O&M"
    metricNote="Rotinas definidas conforme tecnologia, porte e criticidade do ativo."
    pillars={[
      { number: "01", title: "Manutenção preventiva", text: "Planos periódicos para módulos, estruturas, inversores, quadros, cabeamento e demais pontos críticos.", icon: "/icons/noun/solar-maintenance.webp" },
      { number: "02", title: "Diagnóstico avançado", text: "Termografia, inspeções elétricas e ensaios aplicáveis para localizar anomalias e priorizar intervenções.", icon: "/icons/noun/thermal-imaging.webp" },
      { number: "03", title: "Limpeza em escala", text: "Planejamento de limpeza compatível com o terreno, a sujidade, a disponibilidade hídrica e a operação da planta.", icon: "/icons/noun/solar-cleaning.webp" },
      { number: "04", title: "Relatórios gerenciais", text: "Evidências de campo, não conformidades, criticidade e recomendações organizadas para a gestão do ativo.", icon: "/icons/noun/maintenance-report.webp" },
    ]}
    process={[
      { title: "Levantamento técnico", text: "Entendemos arranjo, equipamentos, histórico, acessos, restrições e objetivos operacionais." },
      { title: "Plano de manutenção", text: "Definimos escopo, periodicidade, procedimentos, segurança e indicadores de acompanhamento." },
      { title: "Execução em campo", text: "Equipes qualificadas executam as rotinas com checklists, registros e comunicação de ocorrências." },
      { title: "Gestão das ações", text: "Entregamos diagnóstico priorizado para apoiar correções, orçamento e planejamento das próximas janelas." },
    ]}
    faq={[
      ["A Sungrid atende usinas em operação?", "Sim. O escopo pode ser estruturado para ativos já operacionais, considerando documentação disponível, tecnologia instalada e condições atuais da planta."],
      ["O plano é igual para todas as usinas?", "Não. Frequência e atividades são definidas conforme potência, topologia, ambiente, histórico de falhas e criticidade operacional."],
      ["É possível contratar serviços específicos?", "Sim. Além de contratos recorrentes, podem ser avaliados escopos pontuais como inspeções, limpeza, diagnóstico e campanhas técnicas."],
      ["Como são registradas as ocorrências?", "Os achados são documentados com evidências de campo, classificação de criticidade e recomendações para facilitar a tomada de decisão."],
    ]}
  />;
}
