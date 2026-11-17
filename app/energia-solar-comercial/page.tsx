import type { Metadata } from "next";
import { CalculatorCta } from "../_components/CalculatorCta";
import { ServiceLanding } from "../_components/ServiceLanding";
import { ServiceSchema } from "../_components/ServiceSchema";

const title = "Energia Solar Comercial em SP | Sistemas para Empresas | Sungrid";
const description = "Energia solar para comércios, escritórios e indústrias no estado de São Paulo: análise de consumo, projeto, instalação e manutenção do sistema fotovoltaico.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/energia-solar-comercial/" },
  openGraph: { type: "website", url: "/energia-solar-comercial/", title, description, images: ["/og.png?v=20261117"] },
};

export default function EnergiaSolarComercialPage() {
  return <>
    <ServiceSchema name="Energia solar comercial" description={description} pathname="/energia-solar-comercial/" />
    <ServiceLanding
      afterSolution={<CalculatorCta />}
      kind="solar"
      pathname="/energia-solar-comercial/"
      waLabel="energia solar comercial"
      defaultService="Instalação comercial"
      eyebrow="ENERGIA SOLAR PARA EMPRESAS"
      indexLabel="COMERCIAL"
      title="Energia solar comercial em SP."
      accent="Menos peso da energia no custo."
      description="Sistemas fotovoltaicos para comércios, escritórios, galpões e indústrias, projetados a partir do perfil de consumo da empresa e instalados com planejamento para interferir o mínimo na operação."
      image="/images/solar-maintenance-pexels"
      imageAlt="Equipe técnica trabalhando em sistema de energia solar sobre telhado comercial"
      photoLabel="ENERGIA PARA O SEU NEGÓCIO"
      metricLabel="FOCO DO PROJETO"
      metricValue="Consumo"
      metricNote="Dimensionamento a partir do perfil de consumo, da tarifa e da área disponível da empresa."
      proofItems={["ANÁLISE DE CONSUMO", "PROJETO TÉCNICO", "INSTALAÇÃO PLANEJADA", "ESTADO DE SÃO PAULO"]}
      regionText="Com sede em São José dos Campos, a Sungrid atende empresas em todo o estado de São Paulo. Cada projeto considera a localização, o tipo de cobertura ou terreno, a tarifa e o horário de operação."
      solutionEyebrow="SISTEMA FOTOVOLTAICO COMERCIAL"
      solutionTitle="Energia como investimento."
      solutionAccent="Projeto como estratégia."
      solutionText="Empresas têm perfis de consumo, tarifas e estruturas muito diferentes. Por isso o projeto começa pela análise da conta e do funcionamento do negócio, e a manutenção já é planejada desde a instalação."
      pillars={[
        { number: "01", title: "Análise do consumo e da tarifa", text: "Estudamos as faturas, a modalidade tarifária e o horário de operação para dimensionar o sistema corretamente.", icon: "/icons/noun/energy-performance.webp" },
        { number: "02", title: "Projeto para a sua estrutura", text: "Telhados de galpões, lajes ou áreas de solo são avaliados quanto a estrutura, acesso, orientação e sombreamento.", icon: "/icons/noun/maintenance-report.webp" },
        { number: "03", title: "Instalação planejada", text: "Cronograma combinado com a empresa e procedimentos de segurança para reduzir interferências na rotina.", icon: "/icons/noun/solar-maintenance.webp" },
        { number: "04", title: "Operação e manutenção", text: "Rotinas de limpeza, inspeção e diagnóstico para manter a geração e documentar o estado do sistema.", icon: "/icons/noun/thermal-imaging.webp" },
      ]}
      process={[
        { title: "Levantamento", text: "Recebemos as faturas de energia e entendemos a operação, o imóvel e os objetivos da empresa." },
        { title: "Visita técnica e projeto", text: "Avaliamos a estrutura e a instalação elétrica e desenvolvemos o projeto do sistema." },
        { title: "Proposta e conexão", text: "Apresentamos escopo, equipamentos e condições, e cuidamos da documentação técnica junto à distribuidora." },
        { title: "Instalação e acompanhamento", text: "Executamos a instalação conforme o cronograma combinado e orientamos o acompanhamento da geração." },
      ]}
      processAccent="geração."
      faq={[
        ["Energia solar vale a pena para empresas?", "Depende do consumo, da tarifa, da área disponível e do horário de funcionamento. A análise das faturas mostra se o sistema faz sentido e qual o porte adequado para o seu caso."],
        ["Empresas atendidas em média tensão podem ter energia solar?", "Sim. Unidades do Grupo A têm regras tarifárias diferentes das residenciais, e o projeto considera a modalidade contratada e a demanda da empresa."],
        ["A operação precisa parar durante a instalação?", "A instalação é planejada para reduzir interferências. Eventuais desligamentos necessários para a conexão são pontuais e combinados previamente."],
        ["Posso gerar em um local e usar os créditos em outro?", "Em determinadas condições, os créditos podem ser usados em outras unidades do mesmo titular atendidas pela mesma distribuidora. Avaliamos isso no projeto."],
        ["Vocês fazem a manutenção depois da instalação?", "Sim. A Sungrid oferece limpeza, manutenção preventiva e diagnóstico, inclusive para sistemas instalados por outras empresas."],
      ]}
      contactTitle="Energia para"
      contactAccent="o seu negócio crescer."
      footerText="Energia solar comercial do projeto à manutenção."
    />
  </>;
}
