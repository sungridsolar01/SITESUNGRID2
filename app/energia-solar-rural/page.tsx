import type { Metadata } from "next";
import { ServiceLanding } from "../_components/ServiceLanding";
import { ServiceSchema } from "../_components/ServiceSchema";

const title = "Energia Solar Rural em SP | Sítios e Fazendas | Sungrid";
const description = "Energia solar para sítios, fazendas e propriedades rurais no estado de São Paulo, em telhado ou em solo, com projeto, instalação e manutenção do sistema.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/energia-solar-rural/" },
  openGraph: { type: "website", url: "/energia-solar-rural/", title, description, images: ["/og.png?v=20261117"] },
};

export default function EnergiaSolarRuralPage() {
  return <>
    <ServiceSchema name="Energia solar rural" description={description} pathname="/energia-solar-rural/" />
    <ServiceLanding
      kind="solar"
      pathname="/energia-solar-rural/"
      waLabel="energia solar rural"
      defaultService="Instalação rural"
      eyebrow="ENERGIA SOLAR NO CAMPO"
      indexLabel="RURAL"
      title="Energia solar rural em SP."
      accent="Mais autonomia para a propriedade."
      description="Sistemas fotovoltaicos para sítios, fazendas, granjas e agroindústrias, instalados em telhados de galpões ou em estruturas de solo, com projeto dimensionado para o consumo da propriedade."
      image="/images/grandes-usinas"
      imageHeight="810"
      imageAlt="Sistema de energia solar instalado em solo em área aberta"
      photoLabel="ENERGIA PARA O CAMPO"
      metricLabel="ONDE INSTALAR"
      metricValue="Sob medida"
      metricNote="Telhado de galpão ou estrutura de solo, conforme área disponível e consumo da propriedade."
      proofItems={["TELHADO OU SOLO", "PROJETO SOB MEDIDA", "MANUTENÇÃO NO CAMPO", "ESTADO DE SÃO PAULO"]}
      regionText="Com sede em São José dos Campos, a Sungrid atende propriedades rurais em todo o estado de São Paulo. A visita técnica considera acesso, área disponível, rede elétrica e condições do terreno."
      solutionEyebrow="SISTEMA FOTOVOLTAICO RURAL"
      solutionTitle="Energia que acompanha"
      solutionAccent="a rotina do campo."
      solutionText="Irrigação, bombeamento, refrigeração e equipamentos de produção pesam na conta da propriedade. O projeto parte desse consumo e escolhe a melhor forma de instalação para o local."
      pillars={[
        { number: "01", title: "Consumo da propriedade", text: "Analisamos as faturas e os principais usos de energia, como irrigação, bombas, refrigeração e equipamentos.", icon: "/icons/noun/energy-performance.webp" },
        { number: "02", title: "Telhado ou solo", text: "Avaliamos galpões, coberturas e áreas abertas para definir a estrutura mais adequada ao terreno.", icon: "/icons/rural-solar.svg" },
        { number: "03", title: "Instalação robusta", text: "Estruturas, cabeamento, aterramento e proteções pensados para as condições do ambiente rural.", icon: "/icons/noun/solar-maintenance.webp" },
        { number: "04", title: "Limpeza e manutenção", text: "Poeira de estradas e de colheita se acumula nos módulos. Rotinas de limpeza e inspeção mantêm a geração.", icon: "/icons/noun/solar-cleaning.webp" },
      ]}
      process={[
        { title: "Levantamento", text: "Recebemos as faturas e entendemos a rotina da propriedade e os equipamentos de maior consumo." },
        { title: "Visita técnica", text: "Avaliamos área disponível, acesso, rede elétrica e condições do terreno ou das coberturas." },
        { title: "Projeto e proposta", text: "Apresentamos o sistema recomendado, o tipo de estrutura, o escopo e as condições." },
        { title: "Instalação e conexão", text: "Instalamos o sistema e cuidamos da documentação técnica junto à distribuidora para o início da compensação." },
      ]}
      processAccent="geração no campo."
      faq={[
        ["Dá para instalar os módulos no chão?", "Sim. Em propriedades com área disponível, a estrutura de solo é uma opção comum. A escolha entre solo e telhado considera terreno, acesso, sombreamento e custo da estrutura."],
        ["Energia solar atende irrigação e bombeamento?", "O consumo desses equipamentos entra no dimensionamento. No sistema conectado à rede, a energia gerada é compensada na conta, inclusive em horários em que o sistema não está gerando."],
        ["Posso usar os créditos em outra propriedade?", "Em determinadas condições, os créditos podem ser usados em outras unidades do mesmo titular atendidas pela mesma distribuidora. Avaliamos isso no projeto."],
        ["Como fica a limpeza em área com muita poeira?", "Em ambientes rurais a sujeira tende a se acumular mais rápido. A Sungrid oferece limpeza técnica e manutenção preventiva com frequência definida conforme o local."],
        ["Vocês atendem propriedades longe de São José dos Campos?", "Sim. A Sungrid avalia solicitações em todo o estado de São Paulo conforme localização, acesso e escopo do projeto."],
      ]}
      contactTitle="Energia para"
      contactAccent="a sua propriedade."
      footerText="Energia solar rural do projeto à manutenção."
    />
  </>;
}
