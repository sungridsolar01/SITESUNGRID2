import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Limpeza de Painéis Solares em SP | Sungrid";
const description = "Limpeza técnica de painéis solares no estado de São Paulo para remover sujeira com segurança, recuperar a geração e preservar os módulos.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/limpeza-de-paineis-solares/" },
  openGraph: { type: "website", url: "/limpeza-de-paineis-solares/", title, description, images: ["/og.png"] },
};

export default function LimpezaPaineisPage() {
  return <SeoServicePage
    pathname="/limpeza-de-paineis-solares/"
    eyebrow="LIMPEZA TÉCNICA DE MÓDULOS"
    title="Limpeza de painéis solares em SP"
    accent="com método e segurança."
    description={description}
    serviceName="Limpeza de painéis solares"
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
      ["Quando a limpeza dos painéis é necessária?", "A necessidade depende do ambiente, da inclinação dos módulos, do histórico de geração e do acúmulo observado. A avaliação técnica ajuda a definir a periodicidade."],
      ["A limpeza usa produtos químicos?", "O método é definido conforme o tipo de sujeira e as recomendações aplicáveis aos módulos, evitando produtos ou ferramentas que possam danificar o vidro."],
      ["A Sungrid atende limpeza de painéis em todo o estado de São Paulo?", "A Sungrid tem sede em São José dos Campos e avalia atendimentos em todo o estado de São Paulo conforme localização, acesso, porte e escopo do sistema."],
    ]}
    contactTitle="Recupere a passagem de luz."
    contactAccent="Preserve seus módulos."
  />;
}
