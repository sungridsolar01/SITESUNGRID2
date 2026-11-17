import type { Metadata } from "next";
import { QuoteCta } from "../_components/QuoteCta";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Limpeza de Painéis Solares em SP | Limpeza Técnica de Placas | Sungrid";
const description = "Limpeza de placas solares no estado de São Paulo: limpeza técnica dos painéis com método seguro para o vidro, inspeção visual e registro do serviço. Orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/limpeza-de-paineis-solares/" },
  openGraph: { type: "website", url: "/limpeza-de-paineis-solares/", title, description, images: ["/og.png?v=20261117"] },
};

export default function LimpezaPaineisPage() {
  return <SeoServicePage
    pathname="/limpeza-de-paineis-solares/"
    eyebrow="LIMPEZA TÉCNICA DE MÓDULOS"
    title="Limpeza de painéis solares em SP"
    accent="com método e segurança."
    description={description}
    serviceName="Limpeza de painéis solares"
    defaultService="Manutenção / limpeza"
    sectionTitle="Limpeza técnica"
    sectionAccent="que protege a geração."
    sectionText="Poeira, fuligem, folhas, dejetos e maresia reduzem a passagem de luz e podem criar perdas desiguais entre os módulos. A Sungrid avalia o local e executa a limpeza com procedimento adequado ao sistema."
    benefits={[
      { title: "Avaliação da sujidade", text: "Verificamos o tipo e a intensidade da sujeira antes de definir o procedimento de limpeza." },
      { title: "Proteção dos módulos", text: "Usamos método compatível com o vidro e evitamos produtos ou ferramentas que possam danificar a superfície." },
      { title: "Segurança na execução", text: "Planejamos acesso, isolamento e trabalho em altura conforme as condições reais da instalação." },
      { title: "Registro do serviço", text: "Documentamos a condição encontrada e orientamos a frequência adequada para o próximo atendimento." },
    ]}
    steps={[
      { title: "Entendimento do sistema", text: "Coletamos localização, potência, acesso e histórico de manutenção." },
      { title: "Avaliação técnica", text: "Analisamos o nível de sujidade, os riscos do local e a melhor janela de serviço." },
      { title: "Limpeza profissional", text: "Executamos o procedimento de forma controlada e cuidadosa." },
      { title: "Conferência e registro", text: "Inspecionamos o resultado e entregamos as recomendações para manter a geração." },
    ]}
    regionText="Com sede em São José dos Campos, a Sungrid realiza limpeza técnica de painéis solares no estado de São Paulo. A viabilidade considera distância, acesso ao telhado ou usina, quantidade de módulos e condições de segurança."
    faq={[
      ["Quando a limpeza dos painéis solares é necessária?", "Depende do ambiente, da inclinação dos módulos, do histórico de geração e do acúmulo de sujeira. Poeira, fuligem, folhas e fezes de pássaros são sinais comuns. A avaliação técnica ajuda a definir a periodicidade."],
      ["A limpeza das placas solares aumenta a geração?", "Quando a sujeira está bloqueando a passagem de luz, a limpeza ajuda a recuperar a geração perdida. O efeito varia conforme o tipo e a quantidade de sujeira; por isso avaliamos o sistema antes e registramos o serviço."],
      ["A limpeza usa produtos químicos?", "O método é definido conforme o tipo de sujeira e as recomendações aplicáveis aos módulos, evitando produtos ou ferramentas que possam danificar o vidro."],
      ["Posso limpar as placas solares sozinho?", "Não é recomendado subir no telhado sem equipamento e treinamento para trabalho em altura. Também é preciso evitar escovas abrasivas, jato de alta pressão e água fria sobre módulos muito quentes. A limpeza técnica reduz esses riscos."],
      ["Quanto custa a limpeza de painéis solares?", "O valor depende da quantidade de módulos, da altura e do acesso ao telhado ou à usina e da localização. Envie pelo WhatsApp a cidade, o número de placas e fotos do local para receber o orçamento."],
      ["Vocês limpam sistemas instalados por outras empresas?", "Sim. A limpeza técnica e a manutenção da Sungrid atendem sistemas das principais marcas e configurações, independentemente de quem fez a instalação."],
      ["A Sungrid atende limpeza de painéis em todo o estado de São Paulo?", "A Sungrid tem sede em São José dos Campos e avalia atendimentos em todo o estado de São Paulo conforme localização, acesso, porte e escopo do sistema."],
    ]}
    afterContent={
      <QuoteCta
        id="orcamento-limpeza"
        eyebrow="ORÇAMENTO DE LIMPEZA"
        title="Placas sujas?"
        accent="Peça o orçamento pelo WhatsApp."
        text="Envie a cidade, a quantidade de placas e fotos do telhado ou da usina. Com essas informações, a equipe avalia o acesso e retorna com o orçamento da limpeza técnica."
        waText="Olá, Sungrid! Vim pela página de limpeza de painéis solares e quero um orçamento. Minha cidade é ___ e tenho ___ placas."
        buttonLabel="Pedir orçamento de limpeza"
      />
    }
    contactTitle="Recupere a passagem de luz."
    contactAccent="Preserve seus módulos."
  />;
}
