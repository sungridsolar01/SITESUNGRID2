import type { Metadata } from "next";
import { CalculatorCta } from "./_components/CalculatorCta";
import { ContactForm } from "./_components/ContactForm";
import { FaqSchema } from "./_components/FaqSchema";
import { Arrow, SiteFooter, SiteHeader, WhatsAppFloat, whatsappUrl } from "./_components/Site";
import { YouTubeEmbed } from "./_components/YouTubeEmbed";
import { videos } from "./_components/videos";
import { getAllPosts } from "./blog/posts";

const title = "Energia Solar em SP | Instalação, Manutenção e Carregadores | Sungrid";
const description = "Energia solar residencial, comercial e rural, manutenção, seguro fotovoltaico e carregadores para veículos elétricos no estado de São Paulo. Peça seu orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Sungrid", locale: "pt_BR", title, description, images: [{ url: "/og.png?v=20261117", width: 1200, height: 683, alt: "Sungrid: energia solar, manutenção e seguro fotovoltaico em São Paulo" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png?v=20261117"] },
};

const services = [
  { number: "01", title: "Energia solar residencial", text: "Projeto e instalação de sistema fotovoltaico para a sua casa, dimensionado a partir do seu consumo de energia.", icon: "/icons/noun/energy-performance.webp", alt: "Energia solar residencial", href: "/energia-solar-residencial/" },
  { number: "02", title: "Energia solar comercial", text: "Sistemas para comércios, escritórios e indústrias que querem reduzir o custo com energia elétrica.", icon: "/icons/noun/solar-maintenance.webp", alt: "Energia solar comercial", href: "/energia-solar-comercial/" },
  { number: "03", title: "Energia solar rural", text: "Geração própria para sítios, fazendas e propriedades rurais, em telhado ou em solo.", icon: "/icons/rural-solar.svg", alt: "Energia solar rural", href: "/energia-solar-rural/" },
  { number: "04", title: "Híbridos e baterias", text: "Sistemas com baterias para guardar energia e manter cargas importantes durante quedas de luz, e soluções off-grid.", icon: "/icons/battery-solar.svg", alt: "Sistema solar híbrido com bateria", href: "/sistemas-hibridos-e-baterias/" },
  { number: "05", title: "Wallbox e carro elétrico", text: "Instalação de wallbox (carregador de carro elétrico) em casas, condomínios e empresas.", icon: "/icons/ev-charger.svg", alt: "Carregador para veículo elétrico", href: "/carregadores-veiculares/" },
  { number: "06", title: "Manutenção e limpeza", text: "Limpeza técnica dos módulos e manutenção preventiva para manter o sistema produzindo com segurança.", icon: "/icons/noun/solar-cleaning.webp", alt: "Limpeza técnica de painéis solares", href: "/manutencao-de-energia-solar/" },
  { number: "07", title: "Diagnóstico de falhas", text: "Checagem de cabos, conectores, inversores e pontos críticos para encontrar falhas antes que virem prejuízo.", icon: "/icons/noun/thermal-imaging.webp", alt: "Termografia para diagnóstico de sistema solar", href: "/diagnostico-de-sistema-fotovoltaico/" },
  { number: "08", title: "Grandes usinas", text: "Operação e manutenção para usinas de maior porte, com rotinas preventivas e relatórios técnicos.", icon: "/icons/noun/maintenance-report.webp", alt: "Relatório técnico de manutenção de usinas", href: "/manutencao-grandes-usinas/" },
  { number: "09", title: "Seguro fotovoltaico", text: "Orientação para proteger o sistema contra imprevistos, com coberturas definidas na apólice da seguradora.", icon: "/icons/noun/liability-insurance.webp", alt: "Seguro para sistema fotovoltaico", href: "/seguro-fotovoltaico/" },
];

const paths = [
  { tag: "INSTALAÇÃO", cadence: "Instalar", title: "Quero gerar minha energia", text: "Para casas, empresas e propriedades rurais. Analisamos o consumo, o local e apresentamos o projeto adequado.", featured: true, message: "Olá, Sungrid! Vim pelo site e quero um orçamento de instalação de energia solar." },
  { tag: "MANUTENÇÃO", cadence: "Cuidar", title: "Quero cuidar da geração", text: "Limpeza, manutenção preventiva, diagnóstico de falhas e seguro, inclusive para sistemas instalados por outra empresa.", featured: false, message: "Olá, Sungrid! Vim pelo site e quero um orçamento de manutenção do meu sistema solar." },
  { tag: "MOBILIDADE", cadence: "Carregar", title: "Quero um carregador", text: "Avaliação da instalação elétrica e instalação de carregador para veículo elétrico em casa ou na empresa.", featured: false, message: "Olá, Sungrid! Vim pelo site e quero um orçamento de carregador para veículo elétrico." },
];

const faqs: Array<[string, string]> = [
  ["A Sungrid instala e também faz manutenção?", "Sim. A Sungrid atende todo o ciclo do sistema fotovoltaico: projeto e instalação, manutenção preventiva, limpeza, diagnóstico de falhas e orientação sobre seguro. Também instalamos carregadores para veículos elétricos."],
  ["Como é definido o tamanho do sistema solar?", "O dimensionamento parte do histórico de consumo nas contas de energia e considera a área disponível, a orientação e a inclinação do telhado ou terreno, o sombreamento e o padrão de entrada do imóvel."],
  ["Energia solar funciona em dias nublados?", "Sim, com geração menor. No sistema conectado à rede, a energia que sobra em dias de sol vira créditos com a distribuidora, conforme as regras do Sistema de Compensação de Energia Elétrica."],
  ["Vocês atendem sistemas instalados por outra empresa?", "Sim. A manutenção, a limpeza e o diagnóstico da Sungrid atendem sistemas das principais marcas e configurações, independentemente de quem realizou a instalação original."],
  ["Dá para ter energia quando falta luz?", "Sistemas conectados à rede desligam por segurança quando a rede cai. Para manter cargas importantes durante quedas de energia, existem os sistemas híbridos com baterias, que a Sungrid também projeta e instala."],
  ["Vocês instalam carregador para carro elétrico?", "Sim. Antes da instalação avaliamos o quadro e o padrão de entrada para definir o circuito e as proteções adequadas ao carregador escolhido."],
  ["Em quais regiões a Sungrid atende?", "Com sede em São José dos Campos, a Sungrid atende no estado de São Paulo. A disponibilidade é confirmada conforme o endereço e o escopo do serviço."],
];

export default function Home() {
  const waHome = whatsappUrl("Olá, Sungrid! Vim pela página principal do site e quero um orçamento de energia solar.");
  const latestPosts = getAllPosts().slice(0, 4);

  return (
    <main>
      <FaqSchema faq={faqs} pathname="/" />
      <SiteHeader variant="home" whatsappHref={waHome} />

      <section className="hero" id="inicio">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span /> ENERGIA SOLAR DE PONTA A PONTA</div>
          <h1>Energia Solar em SP<br /><em>do projeto à manutenção</em></h1>
          <p>Instalação de energia solar para casas, empresas e propriedades rurais, manutenção, seguro fotovoltaico e carregadores para veículos elétricos — com atendimento em todo o estado de São Paulo.</p>
          <div className="hero-actions">
            <a className="button primary" href={waHome} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp <Arrow /></a>
            <a className="text-link" href="#servicos">Conheça os serviços <span>↓</span></a>
          </div>
          <div className="trust-row">
            <span className="trust-icon">✓</span>
            <p><strong>Uma empresa para todo o ciclo</strong><br />Instalação, manutenção, seguro e carregadores.</p>
          </div>
        </div>

        <div className="hero-visual reveal delay-1">
          <div className="image-frame">
            <img
              src="/images/solar-maintenance-pexels-1024.webp"
              srcSet="/images/solar-maintenance-pexels-640.webp 640w, /images/solar-maintenance-pexels-1024.webp 1024w, /images/solar-maintenance-pexels-1440.webp 1440w"
              sizes="(max-width: 1050px) calc(100vw - 40px), 45vw"
              width="1440"
              height="960"
              fetchPriority="high"
              decoding="async"
              alt="Equipe técnica trabalhando em um sistema de energia solar"
            />
            <div className="image-shade" />
            <div className="live-pill"><span /> ENERGIA SOLAR COMPLETA</div>
          </div>
          <div className="metric-card metric-main">
            <div className="metric-top"><span>Do projeto à operação</span><b>↗</b></div>
            <strong className="metric-text">Um só<br />contato</strong>
            <p>Instalação, manutenção, seguro e carregadores com a mesma equipe.</p>
            <div className="chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="metric-card metric-small">
            <span>Atendimento</span>
            <strong>SP <small>estado</small></strong>
            <div className="progress"><i /></div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Diferenciais Sungrid">
        <div><span>01</span><strong>Projeto sob medida</strong><small>Dimensionado pelo consumo</small></div>
        <div><span>02</span><strong>Instalação segura</strong><small>Equipe especializada</small></div>
        <div><span>03</span><strong>Manutenção contínua</strong><small>Limpeza e diagnóstico</small></div>
        <div><span>04</span><strong>Resposta ágil</strong><small>Orçamento pelo WhatsApp</small></div>
      </section>

      <section className="section services" id="servicos">
        <div className="section-heading">
          <div>
            <div className="eyebrow dark"><span /> SOLUÇÕES EM ENERGIA SOLAR</div>
            <h2>Tudo para gerar<br /><em>e cuidar da sua energia.</em></h2>
          </div>
          <p>Da primeira conta de luz analisada à manutenção do sistema em operação, a Sungrid cuida de cada etapa para residências, empresas, propriedades rurais e usinas.</p>
        </div>
        <div className="service-grid service-grid-wide">
          {services.map((item) => (
            <article className="service-card" key={item.number}>
              <span className="service-number">{item.number}</span>
              <div className="service-icon"><img src={item.icon} width="96" height="96" loading="lazy" decoding="async" alt={item.alt} /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a className="service-link" href={item.href}>Saiba mais <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-process home-how" id="como-funciona">
        <div>
          <div className="eyebrow"><span /> COMO FUNCIONA</div>
          <h2>Da conta de luz<br /><em>à energia gerada.</em></h2>
          <p className="home-how-text">Um sistema conectado à rede transforma a luz do sol em energia para o imóvel e envia o excedente para a distribuidora, gerando créditos. Veja as etapas do projeto à operação.</p>
          <a className="text-link" href="/blog/como-funciona-energia-solar-residencial/">Entenda em detalhes no blog <span>↗</span></a>
          <YouTubeEmbed video={videos.homeComoFunciona} pathname="/" />
        </div>
        <ol>
          <li><span>01</span><div><h3>Análise do consumo</h3><p>Avaliamos as contas de energia, o imóvel e os planos para os próximos anos, como um carro elétrico.</p></div></li>
          <li><span>02</span><div><h3>Projeto e proposta</h3><p>Dimensionamos o sistema conectado à rede, híbrido com baterias ou off-grid, conforme a necessidade.</p></div></li>
          <li><span>03</span><div><h3>Instalação e conexão</h3><p>Instalamos módulos, inversor e proteções e acompanhamos a solicitação de acesso junto à distribuidora.</p></div></li>
          <li><span>04</span><div><h3>Operação e manutenção</h3><p>Limpeza, inspeções e diagnóstico mantêm o sistema produzindo com segurança ao longo dos anos.</p></div></li>
        </ol>
      </section>

      <CalculatorCta />

      <section className="performance" id="beneficios">
        <div className="performance-copy">
          <div className="eyebrow"><span /> POR QUE A SUNGRID</div>
          <h2>Quem instala<br /><em>também cuida.</em></h2>
          <p>Um sistema fotovoltaico trabalha por muitos anos. Por isso a Sungrid une instalação e manutenção: o projeto já nasce pensando em acesso, segurança e desempenho, e o cuidado continua depois que o sistema entra em operação.</p>
          <ul>
            <li><span>✓</span> Projeto pelo seu consumo</li>
            <li><span>✓</span> Instalação com segurança</li>
            <li><span>✓</span> Manutenção preventiva</li>
            <li><span>✓</span> Suporte para seguro</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-head">
            <div><span>Ciclo do sistema</span><strong>Do projeto à operação</strong></div>
            <span className="status"><i /> EM DIA</span>
          </div>
          <div className="energy-number"><strong>360°</strong><span>Cuidado de ponta a ponta</span></div>
          <div className="line-chart" aria-hidden="true">
            <div className="grid-lines" />
            <div className="curve curve-before" />
            <div className="curve curve-after" />
            <span className="chart-label before">Projeto</span>
            <span className="chart-label after">Operação</span>
          </div>
          <div className="dashboard-stats">
            <div><span>Instalação</span><strong>Casa · Empresa · Rural</strong></div>
            <div><span>Manutenção</span><strong>Preventiva e corretiva</strong></div>
            <div><span>Mobilidade</span><strong>Carregadores</strong></div>
          </div>
        </div>
      </section>

      <section className="section plans" id="orcamento">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow dark"><span /> COMECE PELO WHATSAPP</div>
            <h2>Qual é a sua<br /><em>necessidade hoje?</em></h2>
          </div>
          <p>Escolha o caminho e fale direto com a equipe. A mensagem já vai pronta para agilizar o seu orçamento.</p>
        </div>
        <div className="plan-grid">
          {paths.map((path) => (
            <article className={path.featured ? "plan-card featured" : "plan-card"} key={path.tag}>
              <span className="plan-tag">{path.tag}</span>
              <span className="plan-cadence">{path.cadence}</span>
              <h3>{path.title}</h3>
              <p>{path.text}</p>
              <a href={whatsappUrl(path.message)} target="_blank" rel="noreferrer">Pedir orçamento <Arrow /></a>
            </article>
          ))}
        </div>
        <p className="single-service">Prefere preencher um formulário? <a href="#contato">Envie sua solicitação →</a></p>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-intro">
          <div className="eyebrow"><span /> DÚVIDAS FREQUENTES</div>
          <h2>Informação clara.<br /><em>Decisão segura.</em></h2>
          <p>Não encontrou sua dúvida? Fale diretamente com um especialista Sungrid.</p>
          <a className="button light" href={waHome} target="_blank" rel="noreferrer">Conversar no WhatsApp <Arrow /></a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>0{index + 1}</span>{question}<i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="local-service-section" aria-labelledby="atendimento-sp">
        <div className="eyebrow dark"><span /> ATENDIMENTO NO ESTADO DE SÃO PAULO</div>
        <h2 id="atendimento-sp">Energia solar com base<br /><em>em São José dos Campos.</em></h2>
        <p>Com sede em São José dos Campos, a Sungrid atende residências, empresas, propriedades rurais e usinas no estado de São Paulo. Cada solicitação é avaliada conforme localização, porte do projeto, acesso e escopo técnico.</p>
        <nav className="city-links" aria-label="Área atendida">
          <a href="/energia-solar-estado-de-sao-paulo/">Atendimento em todo o estado de SP <Arrow /></a>
          <a href="/energia-solar-sao-jose-dos-campos/">Energia solar em São José dos Campos <Arrow /></a>
        </nav>
      </section>

      {latestPosts.length > 0 && (
        <nav className="seo-related" aria-label="Últimos artigos do blog">
          <span>Do blog Sungrid</span>
          <div>
            {latestPosts.map((post) => (
              <a href={`/blog/${post.slug}/`} key={post.slug}>{post.title} <Arrow /></a>
            ))}
            <a href="/blog/">Ver todos os artigos <Arrow /></a>
          </div>
        </nav>
      )}

      <section className="contact" id="contato">
        <div className="contact-copy">
          <div className="eyebrow"><span /> PREFERE FORMULÁRIO?</div>
          <h2>Peça seu orçamento<br /><em>de energia solar.</em></h2>
          <p>Conte um pouco sobre a sua necessidade. A solicitação será enviada para nossa equipe e responderemos pelos contatos informados. Para uma resposta mais rápida, chame no WhatsApp.</p>
        </div>
        <ContactForm kind="home" />
      </section>

      <WhatsAppFloat href={waHome} />

      <SiteFooter variant="home" />
    </main>
  );
}
