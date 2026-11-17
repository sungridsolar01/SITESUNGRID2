import type { ServiceOption } from "./ContactForm";

/**
 * Conteúdo das páginas de cidade (/energia-solar-<cidade>/).
 * Distribuidoras conferidas nas listas oficiais de municípios concedidos da ARSESP
 * e nos sites das concessionárias (nov/2026).
 */
export type CityPage = {
  slug: string;
  city: string;
  /** "em São Paulo", "em Guarulhos"... usado em frases. */
  inCity: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  accent: string;
  lead: string;
  utility: string;
  areaTitle: string;
  areaAccent: string;
  areaText: string;
  nearby: string[];
  localTitle: string;
  localAccent: string;
  localPoints: Array<{ title: string; text: string }>;
  faq: Array<[string, string]>;
  defaultService: ServiceOption;
  isHeadquarters?: boolean;
  /**
   * Rascunho: a página NÃO é publicada (a rota responde 404, fica fora do export,
   * do sitemap e de todos os links). Mude para `false` só depois que a Sungrid
   * confirmar o atendimento na cidade e inclua a rota em scripts/export-static.mjs.
   */
  draft?: boolean;
};

export const cities: CityPage[] = [
  {
    slug: "sao-jose-dos-campos",
    city: "São José dos Campos",
    inCity: "em São José dos Campos",
    title: "Energia Solar em São José dos Campos | Instalação e Manutenção | Sungrid",
    metaDescription: "Empresa de energia solar em São José dos Campos: instalação residencial e comercial, manutenção e limpeza de painéis, baterias e carregador veicular. Sede na Vila Adyana.",
    eyebrow: "SEDE SUNGRID · SÃO JOSÉ DOS CAMPOS",
    accent: "com equipe na própria cidade.",
    lead: "A Sungrid tem sede em São José dos Campos, na Vila Adyana. Daqui atendemos casas, condomínios, comércios e indústrias com instalação de energia solar, manutenção e limpeza de painéis, sistemas com baterias e carregadores para veículos elétricos.",
    utility: "EDP São Paulo",
    areaTitle: "São José dos Campos",
    areaAccent: "a cidade da nossa sede.",
    areaText: "Atendemos todos os bairros de São José dos Campos e, a partir da sede, também outras cidades do estado de São Paulo. A energia na cidade é distribuída pela EDP São Paulo, e a Sungrid acompanha os pedidos de conexão junto à concessionária.",
    nearby: [],
    localTitle: "Por que contratar",
    localAccent: "uma empresa da cidade.",
    localPoints: [
      { title: "Visita técnica sem deslocamento longo", text: "Com a equipe baseada em São José dos Campos, a avaliação do telhado, do quadro elétrico e do sombreamento pode ser agendada com mais flexibilidade." },
      { title: "Conexão com a EDP acompanhada de perto", text: "Cuidamos da documentação técnica do pedido de acesso à rede junto à EDP São Paulo e acompanhamos as etapas até a vistoria." },
      { title: "Manutenção perto de você", text: "Depois da instalação, limpeza, inspeções e diagnóstico ficam a cargo da mesma equipe, que conhece o seu sistema." },
      { title: "Endereço na cidade", text: "A sede da Sungrid fica na Vila Adyana. Para falar com a equipe ou agendar uma visita técnica, chame no WhatsApp." },
    ],
    faq: [
      ["Qual distribuidora atende São José dos Campos?", "A EDP São Paulo. O sistema conectado à rede precisa de aprovação da distribuidora, e a Sungrid cuida da documentação técnica desse pedido."],
      ["Vocês atendem bairros afastados e a zona rural de São José dos Campos?", "Sim. Atendemos a área urbana e propriedades rurais do município. Para áreas rurais, avaliamos também a instalação em solo."],
      ["Onde fica a Sungrid em São José dos Campos?", "A sede fica na R. Cel. José Domingues de Vasconcelos, 181, Vila Adyana, São José dos Campos - SP, 12243-840. Para falar com a equipe, chame no WhatsApp (12) 99188-6006."],
      ["Vocês fazem limpeza de painéis em São José dos Campos?", "Sim. Fazemos limpeza técnica e manutenção preventiva, inclusive em sistemas instalados por outras empresas."],
    ],
    defaultService: "Instalação residencial",
    isHeadquarters: true,
  },
  {
    slug: "sao-paulo",
    draft: true,
    city: "São Paulo",
    inCity: "em São Paulo",
    title: "Energia Solar em São Paulo (Capital) | Casas, Empresas e Apartamentos | Sungrid",
    metaDescription: "Energia solar na cidade de São Paulo para casas, empresas e condomínios: projeto, instalação, manutenção, baterias e carregador veicular. Opções para quem mora em apartamento.",
    eyebrow: "CAPITAL PAULISTA",
    accent: "para casas, empresas e condomínios.",
    lead: "Na capital, cada imóvel tem uma realidade: casas com telhado próprio, empresas com lajes e galpões, condomínios com áreas comuns. A Sungrid avalia o seu caso e indica o caminho possível, inclusive para quem mora em apartamento.",
    utility: "Enel Distribuição São Paulo",
    areaTitle: "Cidade de São Paulo",
    areaAccent: "e região metropolitana.",
    areaText: "Atendemos as diferentes regiões da capital paulista com agendamento conforme o escopo do serviço. Na cidade de São Paulo, a energia é distribuída pela Enel Distribuição São Paulo, e o projeto segue as regras dessa concessionária para conexão de micro e minigeração.",
    nearby: ["Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste", "Centro"],
    localTitle: "Energia solar",
    localAccent: "em uma cidade vertical.",
    localPoints: [
      { title: "Casas e sobrados", text: "Em telhados próprios, o projeto considera sombreamento de prédios e árvores vizinhas, que é comum em áreas mais adensadas." },
      { title: "Condomínios", text: "Um sistema no telhado do prédio pode abater o consumo das áreas comuns, como elevadores, bombas e iluminação, mediante aprovação do condomínio." },
      { title: "Quem mora em apartamento", text: "Quando não há telhado disponível, a regulação permite gerar em outro imóvel do mesmo titular, na área da mesma distribuidora, e usar os créditos na sua conta." },
      { title: "Empresas e comércios", text: "Lajes e coberturas de lojas, escritórios e galpões podem receber sistemas dimensionados pelo consumo e pela modalidade tarifária da empresa." },
    ],
    faq: [
      ["Quem mora em apartamento pode ter energia solar?", "Pode haver caminhos: um sistema no telhado do condomínio para as áreas comuns, ou a geração em outro imóvel do mesmo titular, dentro da área da mesma distribuidora, com uso dos créditos na sua conta. Avaliamos o seu caso."],
      ["Qual distribuidora atende a cidade de São Paulo?", "A Enel Distribuição São Paulo. O pedido de conexão do sistema segue as regras dessa concessionária."],
      ["O sombreamento de prédios vizinhos atrapalha?", "Pode reduzir a geração em alguns horários. Por isso o estudo de sombreamento faz parte da visita técnica, antes de definir onde e quantos módulos instalar."],
      ["Vocês instalam carregador veicular em prédio?", "Sim, com autorização do condomínio e depois de avaliar a capacidade elétrica disponível e a forma de medição do consumo da vaga."],
    ],
    defaultService: "Instalação residencial",
  },
  {
    slug: "guarulhos",
    draft: true,
    city: "Guarulhos",
    inCity: "em Guarulhos",
    title: "Energia Solar em Guarulhos | Residências, Empresas e Galpões | Sungrid",
    metaDescription: "Energia solar em Guarulhos para residências, comércios, indústrias e galpões: projeto, instalação, limpeza de painéis, manutenção e carregadores para veículos elétricos.",
    eyebrow: "GRANDE SÃO PAULO",
    accent: "para casas, indústrias e galpões.",
    lead: "Guarulhos combina bairros residenciais com uma grande área industrial e logística. A Sungrid projeta sistemas para os dois perfis: telhados residenciais e coberturas amplas de galpões e empresas.",
    utility: "EDP São Paulo",
    areaTitle: "Guarulhos",
    areaAccent: "e Alto Tietê.",
    areaText: "Atendemos Guarulhos e cidades vizinhas com agendamento conforme o escopo. Assim como em São José dos Campos, a energia em Guarulhos é distribuída pela EDP São Paulo, que também atende municípios do Alto Tietê, como Itaquaquecetuba, Mogi das Cruzes e Suzano.",
    nearby: ["Itaquaquecetuba", "Arujá", "Mogi das Cruzes", "Suzano", "Poá"],
    localTitle: "Projetos para o perfil",
    localAccent: "de Guarulhos.",
    localPoints: [
      { title: "Galpões e telhados metálicos", text: "Coberturas amplas de galpões costumam ter boa área disponível. A estrutura, o tipo de telha e os acessos são avaliados antes do projeto." },
      { title: "Empresas com consumo diurno", text: "Operações que consomem energia durante o dia aproveitam diretamente a geração. O projeto parte das faturas e da modalidade tarifária." },
      { title: "Residências", text: "Para casas e sobrados, o dimensionamento considera o consumo da família, o telhado e planos como um carro elétrico." },
      { title: "Limpeza em ambiente urbano", text: "Poeira e poluição de áreas urbanas e industriais se acumulam nos módulos. Limpeza técnica periódica ajuda a manter a geração." },
    ],
    faq: [
      ["Qual distribuidora atende Guarulhos?", "A EDP São Paulo. A Sungrid cuida da documentação técnica do pedido de conexão junto à concessionária."],
      ["Vocês instalam energia solar em galpões?", "Sim. Avaliamos a estrutura da cobertura, o tipo de telha, o acesso e a instalação elétrica para projetar o sistema."],
      ["A operação da empresa precisa parar durante a instalação?", "A instalação é planejada para reduzir interferências. Eventuais desligamentos necessários são pontuais e combinados previamente."],
      ["Fazem limpeza de painéis solares em Guarulhos?", "Sim. Fazemos limpeza técnica e manutenção preventiva, inclusive em sistemas instalados por outras empresas."],
    ],
    defaultService: "Instalação comercial",
  },
  {
    slug: "sorocaba",
    draft: true,
    city: "Sorocaba",
    inCity: "em Sorocaba",
    title: "Energia Solar em Sorocaba | Instalação, Limpeza e Carregadores | Sungrid",
    metaDescription: "Energia solar em Sorocaba e região: instalação para casas, empresas e propriedades rurais, limpeza e manutenção de painéis, baterias e carregador veicular.",
    eyebrow: "REGIÃO DE SOROCABA",
    accent: "da cidade ao campo.",
    lead: "Sorocaba reúne bairros residenciais em expansão, empresas e indústrias e, no entorno, propriedades rurais. A Sungrid atende esses perfis com projetos sob medida, manutenção e carregadores para veículos elétricos.",
    utility: "CPFL Piratininga",
    areaTitle: "Sorocaba",
    areaAccent: "e cidades vizinhas.",
    areaText: "Atendemos Sorocaba e região com agendamento conforme o escopo do serviço. Em Sorocaba, a energia é distribuída pela CPFL Piratininga, que também atende cidades vizinhas como Votorantim, Itu, Salto e Araçoiaba da Serra.",
    nearby: ["Votorantim", "Itu", "Salto", "Araçoiaba da Serra", "Iperó"],
    localTitle: "Soluções para",
    localAccent: "cada perfil da região.",
    localPoints: [
      { title: "Residências e condomínios", text: "Casas em condomínios e bairros residenciais recebem sistemas dimensionados pelo consumo e pelo telhado de cada imóvel." },
      { title: "Indústrias e comércios", text: "Para empresas, o projeto considera faturas, modalidade tarifária, área de cobertura e horário de operação." },
      { title: "Propriedades rurais do entorno", text: "Sítios e chácaras da região podem usar estrutura em solo quando há área disponível. Veja a página de energia solar rural." },
      { title: "Carro elétrico em casa", text: "Instalamos carregadores com circuito dedicado e proteções, e o consumo do carro pode entrar no projeto solar." },
    ],
    faq: [
      ["Qual distribuidora atende Sorocaba?", "A CPFL Piratininga. O pedido de conexão do sistema segue as regras dessa concessionária, e a Sungrid cuida da documentação técnica."],
      ["Vocês atendem cidades próximas a Sorocaba?", "Sim. Avaliamos solicitações em Votorantim, Itu, Salto, Araçoiaba da Serra e demais cidades da região, conforme o escopo."],
      ["Energia solar funciona em chácaras e sítios da região?", "Sim. Avaliamos telhados de galpões e áreas para estrutura em solo, além da rede elétrica disponível na propriedade."],
      ["Vocês instalam carregador para carro elétrico em Sorocaba?", "Sim. Avaliamos o quadro e o padrão de entrada antes de instalar o carregador com circuito dedicado e as proteções adequadas."],
    ],
    defaultService: "Instalação residencial",
  },
  {
    slug: "aracatuba",
    draft: true,
    city: "Araçatuba",
    inCity: "em Araçatuba",
    title: "Energia Solar em Araçatuba | Rural, Residencial e Comercial | Sungrid",
    metaDescription: "Energia solar em Araçatuba e noroeste paulista: sistemas para fazendas, sítios, casas e empresas, instalação em solo ou telhado, limpeza e manutenção de painéis.",
    eyebrow: "NOROESTE PAULISTA",
    accent: "para o campo e a cidade.",
    lead: "Em Araçatuba e região, o agronegócio tem peso importante na economia. A Sungrid projeta sistemas para propriedades rurais, residências e empresas, com estrutura em solo ou telhado e manutenção pensada para ambientes com poeira.",
    utility: "CPFL Paulista",
    areaTitle: "Araçatuba",
    areaAccent: "e noroeste paulista.",
    areaText: "Atendemos Araçatuba e cidades da região com visitas técnicas agendadas conforme o escopo do projeto. Em Araçatuba, a energia é distribuída pela CPFL Paulista, e o pedido de conexão do sistema segue as regras dessa concessionária.",
    nearby: ["Birigui", "Guararapes", "Penápolis", "Bilac", "Santo Antônio do Aracanguá"],
    localTitle: "Energia solar",
    localAccent: "com foco no campo.",
    localPoints: [
      { title: "Fazendas e sítios", text: "Irrigação, bombeamento, refrigeração e equipamentos de produção entram no dimensionamento do sistema da propriedade." },
      { title: "Estrutura em solo", text: "Em áreas abertas, a estrutura em solo facilita orientação e limpeza dos módulos. Avaliamos terreno, acesso e distância até o padrão de entrada." },
      { title: "Calor e ventilação", text: "Temperaturas altas reduzem um pouco o rendimento dos módulos e exigem atenção à ventilação do inversor. Isso é considerado no projeto." },
      { title: "Poeira de estrada e colheita", text: "Em áreas rurais a sujeira se acumula mais rápido. A frequência de limpeza é definida conforme o ambiente da propriedade." },
    ],
    faq: [
      ["Qual distribuidora atende Araçatuba?", "A CPFL Paulista. O sistema conectado à rede segue as regras dessa concessionária, e a Sungrid cuida da documentação técnica do pedido de conexão."],
      ["Vocês instalam energia solar em fazendas da região de Araçatuba?", "Sim. Avaliamos o consumo da propriedade e a melhor forma de instalação, em telhado de galpão ou em estrutura de solo."],
      ["Os créditos de uma propriedade podem ser usados em outra?", "Em determinadas condições, os créditos podem ser usados em outras unidades do mesmo titular atendidas pela mesma distribuidora. Avaliamos isso no projeto."],
      ["A Sungrid atende Araçatuba mesmo tendo sede em São José dos Campos?", "Sim. Atendemos o estado de São Paulo com visitas técnicas e serviços agendados conforme o escopo. Fale conosco pelo WhatsApp para verificar a agenda."],
    ],
    defaultService: "Instalação rural",
  },
];

/** Cidades publicadas (sem rascunho). */
export const publishedCities = cities.filter((city) => !city.draft);

export function getCity(slug: string) {
  const city = cities.find((item) => item.slug === slug);
  if (!city) throw new Error(`Cidade não encontrada: ${slug}`);
  return city;
}
