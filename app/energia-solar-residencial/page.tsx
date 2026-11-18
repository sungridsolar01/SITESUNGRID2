import type { Metadata } from "next";
import { CalculatorCta } from "../_components/CalculatorCta";
import { ServiceLanding } from "../_components/ServiceLanding";
import { ServiceSchema } from "../_components/ServiceSchema";

const title = "Energia Solar Residencial em SP | Projeto e Instalação | Sungrid";
const description = "Projeto e instalação de energia solar para casas no estado de São Paulo, dimensionados pelo seu consumo, com homologação na distribuidora e manutenção.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/energia-solar-residencial/" },
  openGraph: { type: "website", url: "/energia-solar-residencial/", title, description, images: ["/og.png?v=20261117"] },
};

export default function EnergiaSolarResidencialPage() {
  return <>
    <ServiceSchema name="Energia solar residencial" description={description} pathname="/energia-solar-residencial/" />
    <ServiceLanding
      afterSolution={<CalculatorCta />}
      kind="solar"
      pathname="/energia-solar-residencial/"
      waLabel="energia solar residencial"
      defaultService="Instalação residencial"
      eyebrow="ENERGIA SOLAR RESIDENCIAL"
      indexLabel="RESIDENCIAL"
      title="Energia solar residencial em SP."
      accent="Sua casa gerando a própria energia."
      description="Projeto e instalação de sistema fotovoltaico para a sua casa, dimensionado a partir do seu consumo, com acompanhamento da conexão à distribuidora e manutenção depois da instalação."
      image="/images/seguro-fotovoltaico"
      imageAlt="Casas com sistemas de energia solar instalados nos telhados"
      photoLabel="ENERGIA PARA A SUA CASA"
      metricLabel="PONTO DE PARTIDA"
      metricValue="Sua conta"
      metricNote="O projeto começa pelo histórico de consumo de energia do imóvel."
      proofItems={["PROJETO SOB MEDIDA", "INSTALAÇÃO SEGURA", "CONEXÃO À REDE", "ESTADO DE SÃO PAULO"]}
      regionText="Com sede em São José dos Campos, a Sungrid atende residências em todo o estado de São Paulo. A visita técnica e o projeto consideram a localização, o telhado e as regras da distribuidora da sua região."
      solutionEyebrow="SISTEMA FOTOVOLTAICO PARA CASAS"
      solutionTitle="Energia gerada em casa."
      solutionAccent="Projeto pensado para ela."
      solutionText="Analisamos o consumo, o telhado e a instalação elétrica para propor um sistema adequado à sua realidade, sem superdimensionar. Depois de instalado, a mesma equipe pode cuidar da manutenção e da limpeza."
      pillars={[
        { number: "01", title: "Análise do consumo", text: "Avaliamos as contas de energia para entender o consumo ao longo do ano e os planos da família, como carro elétrico ou mais aparelhos.", icon: "/icons/noun/energy-performance.webp" },
        { number: "02", title: "Projeto do sistema", text: "Dimensionamento, posição dos módulos, escolha do inversor e proteções considerando telhado, orientação e sombreamento.", icon: "/icons/noun/maintenance-report.webp" },
        { number: "03", title: "Instalação e conexão", text: "Instalação com procedimentos de segurança e acompanhamento da solicitação de acesso junto à distribuidora.", icon: "/icons/noun/solar-maintenance.webp" },
        { number: "04", title: "Cuidado contínuo", text: "Limpeza, manutenção preventiva e orientação sobre seguro para preservar o desempenho ao longo dos anos.", icon: "/icons/noun/solar-cleaning.webp" },
      ]}
      process={[
        { title: "Análise e visita técnica", text: "Você envia as contas de energia e agendamos a visita para avaliar telhado, sombreamento e quadro elétrico." },
        { title: "Projeto e proposta", text: "Apresentamos o sistema recomendado, os equipamentos, o escopo da instalação e as condições." },
        { title: "Solicitação à distribuidora", text: "Cuidamos da documentação técnica do pedido de acesso à rede junto à distribuidora da sua região." },
        { title: "Instalação e início da geração", text: "Instalamos o sistema e, após a vistoria e a adequação do medidor pela distribuidora, ele passa a compensar a energia gerada." },
      ]}
      processAccent="instalação."
      faq={[
        ["Quanto vou economizar com energia solar?", "Depende do seu consumo, da tarifa da distribuidora, do sistema instalado e das regras de compensação aplicáveis. A proposta apresenta uma estimativa para o seu caso, com base nas suas contas."],
        ["Energia solar funciona à noite?", "Os módulos só geram com luz. No sistema conectado à rede, a energia que sobra durante o dia vira créditos com a distribuidora, que abatem o consumo à noite e em dias com pouca geração."],
        ["A conta de luz vai zerar?", "Normalmente não. Permanecem cobranças mínimas previstas na regulação e itens como a contribuição de iluminação pública. O objetivo do projeto é reduzir o valor da conta de forma consistente."],
        ["Meu telhado serve para energia solar?", "A maioria dos telhados pode receber módulos, mas a estrutura, o material, a orientação e o sombreamento são avaliados na visita técnica antes da proposta."],
        ["Posso instalar um carregador para carro elétrico junto?", "Sim. Se você já tem ou pretende ter um veículo elétrico, o consumo do carro pode ser considerado no projeto e a Sungrid também instala o carregador."],
      ]}
      contactTitle="Sua casa pode"
      contactAccent="gerar a própria energia."
      footerText="Energia solar residencial do projeto à manutenção."
    />
  </>;
}
