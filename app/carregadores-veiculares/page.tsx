import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Carregador para Carro Elétrico em SP | Instalação | Sungrid";
const description = "Instalação de carregadores para veículos elétricos em casas, condomínios e empresas no estado de São Paulo, com avaliação da instalação elétrica e integração com energia solar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/carregadores-veiculares/" },
  openGraph: { type: "website", url: "/carregadores-veiculares/", title, description, images: ["/og.png?v=20261117"] },
};

export default function CarregadoresVeicularesPage() {
  return <SeoServicePage
    pathname="/carregadores-veiculares/"
    eyebrow="MOBILIDADE ELÉTRICA"
    title="Carregadores veiculares em SP"
    accent="instalados com segurança."
    description={description}
    serviceName="Instalação de carregadores veiculares"
    waLabel="carregadores veiculares"
    defaultService="Carregador veicular"
    sectionEyebrow="CARREGADOR PARA VEÍCULO ELÉTRICO"
    sectionTitle="Recarga em casa"
    sectionAccent="ou na empresa."
    sectionText="Um carregador de parede exige um circuito adequado e proteções corretas. Avaliamos a instalação elétrica antes de tudo e, se você tem ou pretende ter energia solar, consideramos o consumo do veículo no projeto."
    benefits={[
      { title: "Avaliação elétrica", text: "Verificamos o quadro, o padrão de entrada e a capacidade disponível para o carregador escolhido." },
      { title: "Circuito e proteções", text: "Circuito dedicado com disjuntor, proteção diferencial, proteção contra surtos e aterramento conforme as normas aplicáveis." },
      { title: "Casa, condomínio ou empresa", text: "Atendemos garagens residenciais, vagas em condomínio (com autorização da administração) e estacionamentos de empresas." },
      { title: "Integração com energia solar", text: "O consumo do carro pode entrar no dimensionamento de um sistema fotovoltaico novo ou na ampliação de um existente." },
    ]}
    steps={[
      { title: "Primeiro contato", text: "Conte o modelo do veículo, o carregador (se já tiver) e onde pretende instalar." },
      { title: "Visita técnica", text: "Avaliamos o quadro, o trajeto do circuito e a capacidade da instalação elétrica." },
      { title: "Proposta", text: "Apresentamos o escopo da instalação, as adequações necessárias e as condições." },
      { title: "Instalação e testes", text: "Instalamos o circuito e o carregador e testamos o funcionamento com você." },
    ]}
    processTitle="Da avaliação elétrica"
    processAccent="à primeira recarga."
    regionText="Com sede em São José dos Campos, a Sungrid instala carregadores para veículos elétricos em todo o estado de São Paulo, conforme a localização e o escopo da instalação."
    faq={[
      ["Preciso de um carregador de parede?", "Carregadores portáteis em tomada comum costumam ser mais lentos e exigem uma tomada e um circuito em boas condições. Para uso diário, um carregador de parede em circuito dedicado costuma ser a opção mais prática e segura."],
      ["Vocês instalam o carregador que eu já comprei?", "Sim, após avaliar a compatibilidade com a instalação elétrica. Se ainda não comprou, orientamos na escolha de um modelo adequado ao veículo e ao imóvel."],
      ["Moro em condomínio. É possível instalar?", "Em geral, sim, com autorização do condomínio e avaliação da capacidade elétrica disponível e da forma de medição do consumo da vaga."],
      ["Dá para carregar o carro com energia solar?", "Sim. No sistema conectado à rede, a energia gerada vira créditos que abatem também o consumo do carregador. Para isso, o consumo do veículo deve ser considerado no dimensionamento."],
    ]}
    contactTitle="Prepare sua garagem"
    contactAccent="para o carro elétrico."
    footerText="Carregadores veiculares e energia solar no estado de São Paulo."
  />;
}
