import type { Metadata } from "next";
import { SeoServicePage } from "../_components/SeoServicePage";

const title = "Contato Sungrid em SP | Avaliação de Energia Solar";
const description = "Fale com a Sungrid em São José dos Campos e solicite uma avaliação para limpeza, diagnóstico ou manutenção solar no estado de São Paulo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contato/" },
  openGraph: { type: "website", url: "/contato/", title, description, images: ["/og.png"] },
};

export default function ContatoPage() {
  return <SeoServicePage
    pathname="/contato/"
    eyebrow="ATENDIMENTO SUNGRID"
    title="Solicite uma avaliação"
    accent="do seu sistema solar."
    description={description}
    serviceName="Avaliação de sistema solar"
    sectionTitle="Atendimento técnico"
    sectionAccent="desde o primeiro contato."
    sectionText="Com algumas informações sobre o sistema, a equipe consegue entender melhor a necessidade e orientar o atendimento mais adequado."
    benefits={[
      { title: "Conte a necessidade", text: "Informe se busca limpeza, manutenção, diagnóstico, seguro ou atendimento para uma grande usina." },
      { title: "Identifique o sistema", text: "Potência, cidade, tipo de instalação e histórico ajudam a preparar a avaliação." },
      { title: "Receba orientação", text: "A equipe retorna pelos contatos informados para esclarecer o escopo." },
      { title: "Defina o próximo passo", text: "Quando aplicável, apresentamos a avaliação, o serviço recomendado e as condições." },
    ]}
    steps={[
      { title: "Envio da solicitação", text: "Preencha o formulário com os dados essenciais do sistema." },
      { title: "Triagem técnica", text: "A equipe analisa o pedido e identifica as informações complementares." },
      { title: "Contato Sungrid", text: "Retornamos por telefone, WhatsApp ou e-mail informado." },
      { title: "Definição do atendimento", text: "Alinhamos o escopo adequado para a sua necessidade." },
    ]}
    regionText="Com sede em São José dos Campos, a Sungrid recebe solicitações de atendimento em todo o estado de São Paulo. Informe a cidade e os dados do sistema para avaliarmos a disponibilidade."
    faq={[
      ["Quais informações ajudam na avaliação?", "Cidade, potência aproximada, tipo de instalação, histórico de manutenção e o problema percebido ajudam a equipe a direcionar o atendimento."],
      ["Como a Sungrid retorna o contato?", "A equipe utiliza o telefone, WhatsApp ou e-mail informado no formulário para entender a necessidade e alinhar o próximo passo."],
      ["Posso solicitar atendimento fora de São José dos Campos?", "Sim. A Sungrid tem sede em São José dos Campos e avalia solicitações em todo o estado de São Paulo conforme localização e escopo."],
    ]}
    contactTitle="Fale com a Sungrid."
    contactAccent="Vamos entender seu sistema."
  />;
}
