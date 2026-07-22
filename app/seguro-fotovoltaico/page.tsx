import type { Metadata } from "next";
import { ServiceLanding } from "../_components/ServiceLanding";

export const metadata: Metadata = {
  title: "Seguro para Sistemas Fotovoltaicos | Sungrid",
  description: "Conheça soluções de seguro para proteger o investimento em sistemas fotovoltaicos residenciais, comerciais e industriais.",
};

export default function SeguroFotovoltaicoPage() {
  return <ServiceLanding
    kind="insurance"
    eyebrow="SEGURO PARA SISTEMAS FOTOVOLTAICOS"
    title="Sua energia trabalha por você."
    accent="Seu investimento merece proteção."
    description="Uma solução pensada para reduzir a exposição financeira do seu sistema fotovoltaico diante de imprevistos — com análise técnica e contratação transparente."
    image="/images/seguro-fotovoltaico.jpg"
    imageAlt="Sistemas fotovoltaicos instalados em telhados residenciais"
    metricLabel="VISÃO DO ATIVO"
    metricValue="360°"
    metricNote="Instalação, exposição e necessidades avaliadas antes da proposta."
    pillars={[
      { number: "01", title: "Danos elétricos", text: "Possibilidade de proteção para danos de origem elétrica, conforme as condições da cobertura contratada.", icon: "/icons/noun/electrical-damage.png" },
      { number: "02", title: "Eventos da natureza", text: "Análise de exposição a vento, granizo e outros eventos previstos na proposta da seguradora.", icon: "/icons/noun/hail-damage.png" },
      { number: "03", title: "Subtração de equipamentos", text: "Coberturas para situações de roubo ou furto qualificado podem integrar a solução, conforme a apólice.", icon: "/icons/noun/theft-protection.png" },
      { number: "04", title: "Responsabilidade civil", text: "Avaliação de coberturas relacionadas a danos involuntários a terceiros, quando aplicáveis ao risco.", icon: "/icons/noun/liability-insurance.png" },
    ]}
    process={[
      { title: "Conhecemos o sistema", text: "Coletamos dados da instalação, potência, localização, equipamentos e perfil de uso." },
      { title: "Mapeamos a exposição", text: "Organizamos as informações necessárias para entender os principais riscos do ativo." },
      { title: "Apresentamos a proposta", text: "Você compara coberturas, limites, franquias, exclusões e condições antes de decidir." },
      { title: "Acompanhamos a contratação", text: "Apoiamos o envio de documentos e a comunicação até a emissão da apólice." },
    ]}
    faq={[
      ["Quais sistemas podem ser segurados?", "A aceitação depende da análise da seguradora. Sistemas residenciais, comerciais, industriais e rurais podem ser avaliados conforme potência, local e condições da instalação."],
      ["O seguro cobre qualquer tipo de dano?", "Não. Toda cobertura possui limites, condições e exclusões. A proteção válida é exatamente a descrita na proposta e na apólice emitida."],
      ["Preciso ter nota fiscal e projeto?", "A documentação exigida varia conforme a seguradora e o risco. Normalmente são solicitadas informações que comprovem os equipamentos, a instalação e o valor do ativo."],
      ["Sistemas já instalados podem ser avaliados?", "Sim. Sistemas em operação podem passar por análise, desde que atendam aos critérios técnicos e documentais da seguradora."],
    ]}
  />;
}
