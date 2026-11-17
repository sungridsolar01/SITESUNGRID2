import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Contato Sungrid em SP | Orçamento de Energia Solar";
const description = "Fale com a Sungrid em São José dos Campos e peça um orçamento de energia solar, manutenção, seguro fotovoltaico ou carregador veicular no estado de São Paulo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contato/" },
  openGraph: { type: "website", url: "/contato/", title, description, images: ["/og.png?v=20261117"] },
};

export default function ContatoPage() {
  return <SeoServicePage
    pathname="/contato/"
    eyebrow="ATENDIMENTO SUNGRID"
    title="Peça seu orçamento"
    accent="de energia solar."
    description={description}
    serviceName="Orçamento de energia solar"
    waLabel="contato"
    sectionTitle="Atendimento técnico"
    sectionAccent="desde o primeiro contato."
    sectionText="Com algumas informações sobre o imóvel ou o sistema, a equipe consegue entender a necessidade e orientar o atendimento mais adequado. O caminho mais rápido é o WhatsApp; o formulário abaixo também chega direto à equipe."
    benefits={[
      { title: "Conte a necessidade", text: "Informe se busca instalação residencial, comercial ou rural, manutenção, diagnóstico, seguro ou carregador veicular." },
      { title: "Identifique o local", text: "Cidade, tipo de imóvel, consumo de energia ou potência do sistema existente ajudam a preparar o atendimento." },
      { title: "Receba orientação", text: "A equipe retorna pelos contatos informados para esclarecer o escopo e as próximas etapas." },
      { title: "Defina o próximo passo", text: "Quando aplicável, agendamos a visita técnica e apresentamos a proposta com escopo e condições." },
    ]}
    steps={[
      { title: "Envio da solicitação", text: "Chame no WhatsApp ou preencha o formulário com os dados essenciais." },
      { title: "Triagem técnica", text: "A equipe analisa o pedido e identifica as informações complementares." },
      { title: "Contato Sungrid", text: "Retornamos por telefone, WhatsApp ou e-mail informado." },
      { title: "Definição do atendimento", text: "Alinhamos o escopo adequado para a sua necessidade." },
    ]}
    processAccent="à proposta."
    regionText="Com sede em São José dos Campos, a Sungrid recebe solicitações de atendimento em todo o estado de São Paulo. Informe a cidade e o tipo de serviço para avaliarmos a disponibilidade."
    faq={[
      ["Quais informações ajudam no orçamento?", "Para instalação, as últimas contas de energia, a cidade e o tipo de telhado ou terreno. Para manutenção, a potência aproximada, o histórico do sistema e o problema percebido."],
      ["Como a Sungrid retorna o contato?", "A equipe utiliza o telefone, WhatsApp ou e-mail informado para entender a necessidade e alinhar o próximo passo."],
      ["Posso solicitar atendimento fora de São José dos Campos?", "Sim. A Sungrid tem sede em São José dos Campos e avalia solicitações em todo o estado de São Paulo conforme localização e escopo."],
    ]}
    contactTitle="Fale com a Sungrid."
    contactAccent="Vamos entender sua necessidade."
  />;
}
