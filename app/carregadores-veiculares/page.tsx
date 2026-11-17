import type { Metadata } from "next";
import { QuoteCta } from "../_components/QuoteCta";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Instalação de Wallbox em SP | Carregador de Carro Elétrico | Sungrid";
const description = "Instalação de wallbox, o carregador de carro elétrico de parede, em casas, condomínios e empresas no estado de São Paulo, com avaliação da carga elétrica, circuito dedicado e proteções.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/carregadores-veiculares/" },
  openGraph: { type: "website", url: "/carregadores-veiculares/", title, description, images: ["/og.png?v=20261117"] },
};

const condoPoints = [
  { title: "Autorização do condomínio", text: "A instalação em vaga de garagem passa pela administração. Muitos condomínios definem regras para recarga em regimento ou assembleia: quem paga a infraestrutura, como o consumo é cobrado e quais vagas podem receber carregador." },
  { title: "Avaliação da carga do prédio", text: "Antes de liberar novos pontos, é importante saber quanto de potência a entrada de energia e os quadros do condomínio ainda comportam. A avaliação de carga considera também os moradores que devem instalar wallbox nos próximos anos." },
  { title: "Medição do consumo", text: "O circuito pode sair do medidor da própria unidade ou de um quadro do condomínio com medição individual ou rateio. A solução depende da distância até a vaga e da infraestrutura existente." },
  { title: "Trajeto do circuito e proteções", text: "Definimos o caminho dos cabos do quadro até a vaga, com eletrodutos, disjuntor, proteção diferencial (DR), proteção contra surtos (DPS) e aterramento, seguindo as normas técnicas aplicáveis." },
  { title: "Planejamento para mais vagas", text: "Quando vários moradores têm interesse, pode valer a pena planejar uma infraestrutura coletiva, preparada para receber novos carregadores sem refazer a obra a cada pedido." },
  { title: "Informação para a assembleia", text: "Apresentamos o escopo técnico, as adequações necessárias e as opções de instalação de forma clara, para o síndico levar a decisão aos condôminos." },
];

export default function CarregadoresVeicularesPage() {
  return <SeoServicePage
    pathname="/carregadores-veiculares/"
    eyebrow="WALLBOX · CARREGADOR DE CARRO ELÉTRICO"
    title="Instalação de wallbox em SP"
    accent="carregador de carro elétrico com segurança."
    description="A Sungrid faz a instalação de wallbox, o carregador de carro elétrico de parede, em casas, condomínios e empresas no estado de São Paulo. Avaliamos a carga elétrica, montamos o circuito dedicado com as proteções corretas e testamos a recarga com você."
    serviceName="Instalação de wallbox"
    waLabel="instalação de wallbox"
    defaultService="Carregador de carro elétrico (wallbox)"
    sectionEyebrow="CARREGADOR DE CARRO ELÉTRICO"
    sectionTitle="Wallbox em casa,"
    sectionAccent="no condomínio ou na empresa."
    sectionText="O wallbox (também chamado de carregador veicular de parede) precisa de um circuito adequado e de proteções corretas. Avaliamos a instalação elétrica antes de tudo e, se você tem ou pretende ter energia solar, consideramos o consumo do carro no projeto."
    benefits={[
      { title: "Avaliação elétrica", text: "Verificamos o quadro, o padrão de entrada e a capacidade disponível para o wallbox escolhido." },
      { title: "Circuito e proteções", text: "Circuito dedicado com disjuntor, proteção diferencial, proteção contra surtos e aterramento conforme as normas aplicáveis." },
      { title: "Casa, condomínio ou empresa", text: "Atendemos garagens residenciais, vagas em condomínio (com autorização da administração) e estacionamentos de empresas." },
      { title: "Integração com energia solar", text: "O consumo do carro pode entrar no dimensionamento de um sistema fotovoltaico novo ou na ampliação de um existente." },
    ]}
    afterContent={
      <QuoteCta
        id="condominios"
        eyebrow="CONDOMÍNIOS E SÍNDICOS"
        title="Wallbox em condomínio:"
        accent="o que o síndico precisa avaliar."
        text="Instalar carregador de carro elétrico na garagem de um prédio envolve a unidade, o condomínio e a capacidade elétrica do edifício. Ajudamos moradores e síndicos a organizar a decisão com informação técnica."
        waText="Olá, Sungrid! Vim pela página de instalação de wallbox e quero um orçamento para condomínio."
        buttonLabel="Orçamento para condomínio no WhatsApp"
      >
        <ol className="quote-cta-list">
          {condoPoints.map((point, index) => (
            <li key={point.title}><span>0{index + 1}</span><div><h3>{point.title}</h3><p>{point.text}</p></div></li>
          ))}
        </ol>
      </QuoteCta>
    }
    steps={[
      { title: "Primeiro contato", text: "Conte o modelo do carro, o wallbox (se já tiver) e onde pretende instalar: casa, condomínio ou empresa." },
      { title: "Visita técnica", text: "Avaliamos o quadro, o trajeto do circuito e a capacidade da instalação elétrica." },
      { title: "Proposta", text: "Apresentamos o escopo da instalação, as adequações necessárias e as condições." },
      { title: "Instalação e testes", text: "Instalamos o circuito e o wallbox e testamos a recarga com você." },
    ]}
    processTitle="Da avaliação elétrica"
    processAccent="à primeira recarga."
    regionText="Com sede em São José dos Campos, a Sungrid faz instalação de wallbox e de carregador de carro elétrico em todo o estado de São Paulo, conforme a localização e o escopo da instalação."
    faq={[
      ["O que é um wallbox?", "É o carregador de carro elétrico fixado na parede e ligado a um circuito exclusivo. Ele permite recargas mais rápidas e seguras do que o carregador portátil ligado em tomada comum."],
      ["Preciso de wallbox ou posso usar o carregador portátil?", "O carregador portátil em tomada costuma ser mais lento e exige tomada e circuito em boas condições. Para uso diário, o wallbox em circuito dedicado costuma ser a opção mais prática e segura."],
      ["Vocês instalam o wallbox que eu já comprei?", "Sim, após avaliar a compatibilidade com a instalação elétrica. Se ainda não comprou, orientamos na escolha de um modelo adequado ao carro e ao imóvel."],
      ["Moro em condomínio. Como funciona a instalação?", "Em geral é possível, com autorização do condomínio, avaliação da capacidade elétrica do prédio e definição de como o consumo da vaga será medido. Podemos apresentar o escopo técnico ao síndico."],
      ["Sou síndico. O condomínio precisa se preparar para carros elétricos?", "Vale avaliar a carga disponível no prédio, definir regras para novos pedidos e considerar uma infraestrutura que permita atender mais vagas no futuro. A Sungrid faz a avaliação técnica e explica as opções."],
      ["Dá para carregar o carro elétrico com energia solar?", "Sim. No sistema conectado à rede, a energia gerada vira créditos que abatem também o consumo do wallbox. Para isso, o consumo do carro deve ser considerado no dimensionamento."],
    ]}
    contactTitle="Prepare sua garagem"
    contactAccent="para o carro elétrico."
    footerText="Instalação de wallbox e energia solar no estado de São Paulo."
  />;
}
