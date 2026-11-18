import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";
import { Arrow } from "../_components/Site";

const title = "Energia Solar no Estado de São Paulo | Atendimento em SP | Sungrid";
const description = "A Sungrid atende todo o estado de São Paulo a partir de São José dos Campos: energia solar, manutenção, limpeza de painéis, baterias e wallbox.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/energia-solar-estado-de-sao-paulo/" },
  openGraph: { type: "website", url: "/energia-solar-estado-de-sao-paulo/", title, description, images: ["/og.png?v=20261117"] },
};

const serviceLinks = [
  ["/energia-solar-residencial/", "Energia solar residencial"],
  ["/energia-solar-comercial/", "Energia solar comercial"],
  ["/energia-solar-rural/", "Energia solar rural"],
  ["/sistemas-hibridos-e-baterias/", "Híbridos e baterias"],
  ["/carregadores-veiculares/", "Instalação de wallbox"],
  ["/manutencao-de-energia-solar/", "Manutenção"],
  ["/limpeza-de-paineis-solares/", "Limpeza de painéis"],
] as const;

export default function EstadoSaoPauloPage() {
  return <SeoServicePage
    pathname="/energia-solar-estado-de-sao-paulo/"
    eyebrow="ATENDIMENTO EM TODO O ESTADO DE SÃO PAULO"
    title="Energia solar no estado de SP"
    accent="com base em São José dos Campos."
    description="A Sungrid tem sede em São José dos Campos e atende residências, empresas e propriedades rurais em todo o estado de São Paulo, da instalação à manutenção do sistema."
    serviceName="Energia solar no estado de São Paulo"
    waLabel="atendimento no estado de São Paulo"
    defaultService="Instalação residencial"
    sectionEyebrow="COMO ATENDEMOS O ESTADO"
    sectionTitle="Uma equipe,"
    sectionAccent="todo o estado de São Paulo."
    sectionText="Cada pedido começa pelo WhatsApp: você informa a cidade, o tipo de imóvel e o serviço, e a equipe avalia a viabilidade e agenda a visita técnica conforme a localização e o escopo."
    benefits={[
      { title: "Primeira análise a distância", text: "Com a foto da conta de luz e informações do imóvel, já conseguimos orientar sobre o tipo de sistema e os próximos passos." },
      { title: "Visita técnica agendada", text: "A avaliação do telhado, do quadro elétrico e do sombreamento é feita no local, com data combinada de acordo com a sua cidade." },
      { title: "Distribuidora da sua região", text: "Cada região do estado é atendida por uma concessionária. A Sungrid cuida da documentação técnica do pedido de conexão com a distribuidora responsável pelo seu endereço." },
      { title: "Manutenção depois da instalação", text: "Limpeza, inspeções e diagnóstico podem ser programados para manter a geração, inclusive em sistemas instalados por outras empresas." },
    ]}
    afterContent={
      <section className="local-service-section state-services" aria-labelledby="servicos-estado">
        <div className="eyebrow dark"><span /> SERVIÇOS NO ESTADO DE SP</div>
        <h2 id="servicos-estado">Instalação, manutenção<br /><em>e mobilidade elétrica.</em></h2>
        <p>Todos os serviços da Sungrid estão disponíveis no estado de São Paulo. A sede fica em São José dos Campos, na Vila Adyana.</p>
        <nav className="city-links" aria-label="Serviços no estado de São Paulo">
          {serviceLinks.map(([href, label]) => <a href={href} key={href}>{label} <Arrow /></a>)}
          <a href="/energia-solar-sao-jose-dos-campos/">Sede em São José dos Campos <Arrow /></a>
        </nav>
      </section>
    }
    steps={[
      { title: "Contato pelo WhatsApp", text: "Conte a cidade, o tipo de imóvel e o serviço desejado. Se for instalação, envie uma foto da conta de luz." },
      { title: "Avaliação inicial", text: "Analisamos consumo, localização e escopo e explicamos as opções antes da visita." },
      { title: "Visita técnica e proposta", text: "Avaliamos o local e apresentamos o projeto, os equipamentos e o escopo do serviço." },
      { title: "Execução e acompanhamento", text: "Instalamos ou executamos a manutenção e seguimos disponíveis pelo WhatsApp depois do serviço." },
    ]}
    processTitle="Do primeiro contato"
    processAccent="ao sistema funcionando."
    regionText="Com sede em São José dos Campos, a Sungrid atende todo o estado de São Paulo. Cada solicitação é avaliada conforme a localização, o porte do projeto, o acesso e o escopo técnico."
    faq={[
      ["A Sungrid atende a minha cidade?", "A Sungrid atende todo o estado de São Paulo. Chame no WhatsApp informando a cidade e o serviço; a equipe confirma a disponibilidade e combina a visita técnica."],
      ["Onde fica a Sungrid?", "A sede fica na R. Cel. José Domingues de Vasconcelos, 181, Vila Adyana, São José dos Campos - SP, 12243-840."],
      ["Preciso de visita técnica para pedir orçamento?", "Uma primeira orientação pode ser feita com a foto da conta de luz e informações do imóvel. Para a proposta final, a visita técnica permite avaliar telhado, quadro elétrico e sombreamento."],
      ["A conexão com a distribuidora muda de uma cidade para outra?", "Cada região do estado é atendida por uma distribuidora, com seus próprios procedimentos. A Sungrid prepara a documentação técnica do pedido de conexão para a concessionária do seu endereço."],
      ["Vocês fazem manutenção fora de São José dos Campos?", "Sim. Limpeza, manutenção preventiva e diagnóstico são feitos no estado de São Paulo, inclusive em sistemas instalados por outras empresas."],
    ]}
    contactTitle="Peça seu orçamento"
    contactAccent="em qualquer cidade de SP."
    footerText="Energia solar e manutenção em todo o estado de São Paulo."
  />;
}
