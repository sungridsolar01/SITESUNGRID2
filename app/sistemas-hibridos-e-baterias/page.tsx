import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";
import { YouTubeEmbed } from "../_components/YouTubeEmbed";
import { videos } from "../_components/videos";

const title = "Energia Solar Híbrida, Baterias e Off-Grid em SP | Sungrid";
const description = "Sistemas de energia solar híbrida com bateria e soluções off-grid no estado de São Paulo: energia armazenada para quedas de luz e para locais sem rede elétrica.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sistemas-hibridos-e-baterias/" },
  openGraph: { type: "website", url: "/sistemas-hibridos-e-baterias/", title, description, images: ["/og.png?v=20261117"] },
};

export default function SistemasHibridosPage() {
  return <SeoServicePage
    pathname="/sistemas-hibridos-e-baterias/"
    eyebrow="ENERGIA SOLAR HÍBRIDA · BATERIAS · OFF-GRID"
    title="Energia solar híbrida e baterias"
    accent="para guardar a energia que você gera."
    description={description}
    serviceName="Sistemas híbridos e baterias"
    waLabel="sistemas híbridos e baterias"
    defaultService="Sistema híbrido / baterias"
    sectionEyebrow="ON-GRID, HÍBRIDO OU OFF-GRID"
    sectionTitle="Três formas"
    sectionAccent="de gerar e usar energia solar."
    sectionText="A escolha depende do que você precisa: reduzir a conta, manter equipamentos funcionando quando falta luz ou ter energia onde a rede não chega. Avaliamos cargas, rotina e local antes de indicar o sistema."
    benefits={[
      { title: "Sistema conectado à rede (on-grid)", text: "Não usa baterias. O excedente vira créditos com a distribuidora. Quando a rede cai, o inversor desliga por segurança e o sistema para de fornecer energia." },
      { title: "Sistema híbrido com bateria", text: "Continua conectado à rede e guarda energia em baterias. Em uma queda de luz, pode manter os circuitos escolhidos, como geladeira, iluminação, internet e bombas." },
      { title: "Sistema off-grid", text: "Funciona isolado da rede, com baterias dimensionadas para a autonomia desejada. Indicado para locais sem rede elétrica ou com acesso muito difícil." },
      { title: "Baterias em sistema existente", text: "Dependendo do inversor e da instalação, é possível acrescentar baterias a um sistema já instalado. Avaliamos a compatibilidade dos equipamentos." },
    ]}
    afterContent={videos.hibridos.id ? <section className="video-section"><YouTubeEmbed video={videos.hibridos} pathname="/sistemas-hibridos-e-baterias/" /></section> : null}
    steps={[
      { title: "Levantamento das cargas", text: "Definimos o que precisa continuar funcionando sem a rede e por quanto tempo, além do consumo total do imóvel." },
      { title: "Escolha da arquitetura", text: "Indicamos on-grid, híbrido ou off-grid, o tipo de bateria, a potência do inversor e o quadro de cargas essenciais." },
      { title: "Projeto e proposta", text: "Apresentamos equipamentos, local de instalação das baterias, proteções e o escopo do serviço." },
      { title: "Instalação e testes", text: "Instalamos o sistema, separamos os circuitos de backup quando aplicável e testamos o funcionamento com você." },
    ]}
    processTitle="Das cargas essenciais"
    processAccent="ao sistema com bateria."
    regionText="Com sede em São José dos Campos, a Sungrid projeta e instala sistemas híbridos, baterias e soluções off-grid em todo o estado de São Paulo, para residências, empresas e propriedades rurais."
    faq={[
      ["Energia solar funciona quando falta luz?", "No sistema conectado à rede comum, não: o inversor desliga por segurança quando a rede cai. Para manter energia durante quedas, é preciso um sistema híbrido com baterias ou um sistema off-grid."],
      ["Qual a diferença entre sistema híbrido e off-grid?", "O híbrido continua conectado à rede e usa baterias como reserva; o excedente ainda pode gerar créditos. O off-grid funciona totalmente isolado da rede e depende das baterias quando não há sol."],
      ["Quais baterias são usadas em energia solar?", "Hoje as baterias de lítio, como as de lítio ferro fosfato (LiFePO4), são as mais comuns em sistemas novos. Também existem baterias de chumbo-ácido. A escolha considera vida útil, espaço, manutenção e compatibilidade com o inversor."],
      ["A bateria mantém a casa inteira funcionando?", "Depende da capacidade das baterias e da potência do inversor. Na maioria dos projetos, separamos um quadro com os circuitos essenciais para que a reserva dure mais."],
      ["Posso colocar bateria no sistema que já tenho?", "Em muitos casos, sim, com a troca ou o acréscimo de equipamentos compatíveis. Avaliamos o inversor e a instalação existentes antes de propor."],
    ]}
    contactTitle="Energia guardada"
    contactAccent="para quando você precisar."
    footerText="Sistemas híbridos, baterias e off-grid no estado de São Paulo."
  />;
}
