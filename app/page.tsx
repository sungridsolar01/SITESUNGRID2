import { ContactForm } from "./_components/ContactForm";

const services = [
  { number: "01", title: "Limpeza técnica", text: "Remoção segura de poeira, poluição, folhas e maresia com método que protege a superfície dos módulos.", icon: "/icons/noun/solar-cleaning.webp" },
  { number: "02", title: "Inspeção elétrica", text: "Checagem de cabos, conectores, inversores e pontos críticos para encontrar falhas antes que virem prejuízo.", icon: "/icons/noun/thermal-imaging.webp" },
  { number: "03", title: "Análise de performance", text: "Comparamos a geração real, identificamos perdas e mostramos onde seu sistema pode recuperar desempenho.", icon: "/icons/noun/energy-performance.webp" },
  { number: "04", title: "Relatório documentado", text: "Você recebe fotos, diagnóstico e recomendações claras para preservar a garantia e planejar cada correção.", icon: "/icons/noun/maintenance-report.webp" },
];

const plans = [
  { tag: "ESSENCIAL", cadence: "Anual", title: "Proteção contínua", text: "Check-up completo e limpeza profunda para sistemas residenciais em condições normais.", featured: false },
  { tag: "RECOMENDADO", cadence: "Semestral", title: "Performance em dia", text: "Ideal para locais com poeira, poluição, folhas ou maresia e para quem quer acompanhar melhor a geração.", featured: true },
  { tag: "ALTA DEMANDA", cadence: "Trimestral", title: "Máxima eficiência", text: "Para sistemas comerciais e operações em que disponibilidade e produção são inegociáveis.", featured: false },
];

const faqs = [
  ["Com que frequência devo fazer a manutenção?", "Para a maioria dos sistemas residenciais, ao menos uma vez por ano. Em regiões com muita poeira, poluição ou maresia — e em sistemas comerciais — o ideal pode variar de duas a quatro vezes por ano."],
  ["Posso limpar os painéis sozinho?", "A manutenção profissional vai além da lavagem: usa equipamentos adequados, evita resíduos, considera a segurança em altura e inclui inspeções elétricas que uma limpeza comum não cobre."],
  ["O monitoramento do inversor já não é suficiente?", "Não. O aplicativo costuma mostrar a produção geral, mas pode não revelar perdas graduais, falhas elétricas ou problemas localizados em módulos e conexões."],
  ["Vocês atendem sistemas instalados por outra empresa?", "Sim. A Sungrid atende sistemas das principais marcas e configurações, independentemente de quem realizou a instalação original."],
  ["O que acontece se vocês encontrarem um problema?", "Registramos a ocorrência com fotos e entregamos um relatório com as correções recomendadas. Qualquer reparo adicional é apresentado com escopo e preço transparentes."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const whatsappUrl = "https://wa.me/5512991886006?text=Ol%C3%A1%2C%20Sungrid!%20Quero%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20do%20meu%20sistema%20solar.";

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Sungrid, início">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>SUNGRID</span>
        </a>
        <nav className="nav desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#planos">Planos</a>
          <a href="#faq">FAQ</a>
          <a href="/seguro-fotovoltaico">Seguro</a>
          <a href="/manutencao-grandes-usinas">Grandes usinas</a>
        </nav>
        <details className="mobile-menu">
          <summary className="menu-button" aria-label="Abrir menu"><span /><span /></summary>
          <nav className="nav mobile-nav" aria-label="Navegação móvel">
            <a href="#servicos">Serviços</a>
            <a href="#beneficios">Benefícios</a>
            <a href="#planos">Planos</a>
            <a href="#faq">FAQ</a>
            <a href="/seguro-fotovoltaico">Seguro</a>
            <a href="/manutencao-grandes-usinas">Grandes usinas</a>
          </nav>
        </details>
        <a className="header-cta" href="#contato">Solicitar avaliação <Arrow /></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy reveal">
          <div className="eyebrow"><span /> PERFORMANCE SOLAR, SEM ACHISMOS</div>
          <h1>Seu sistema solar.<br /><em>Sempre no máximo.</em></h1>
          <p>Manutenção profissional para proteger seu investimento, recuperar eficiência e garantir energia limpa por muitos anos.</p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">Agendar avaliação <Arrow /></a>
            <a className="text-link" href="#servicos">Conheça o cuidado completo <span>↓</span></a>
          </div>
          <div className="trust-row">
            <span className="trust-icon">✓</span>
            <p><strong>Atendemos qualquer sistema</strong><br />Todas as principais marcas e instaladores.</p>
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
              alt="Equipe técnica realizando manutenção em uma usina solar"
            />
            <div className="image-shade" />
            <div className="live-pill"><span /> MANUTENÇÃO PROFISSIONAL</div>
          </div>
          <div className="metric-card metric-main">
            <div className="metric-top"><span>Potencial de geração</span><b>↗</b></div>
            <strong>+25<sup>%</sup></strong>
            <p>de energia pode ser recuperada quando sujeira e falhas afetam o sistema</p>
            <div className="chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="metric-card metric-small">
            <span>Vida útil projetada</span>
            <strong>25+ <small>anos</small></strong>
            <div className="progress"><i /></div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Indicadores de serviço">
        <div><span>01</span><strong>Diagnóstico claro</strong><small>Sem surpresas</small></div>
        <div><span>02</span><strong>Equipe especializada</strong><small>Segurança primeiro</small></div>
        <div><span>03</span><strong>Relatório completo</strong><small>Fotos + recomendações</small></div>
        <div><span>04</span><strong>Resposta ágil</strong><small>Prioridade nos planos</small></div>
      </section>

      <section className="section services" id="servicos">
        <div className="section-heading">
          <div>
            <div className="eyebrow dark"><span /> CUIDADO DE PONTA A PONTA</div>
            <h2>Mais que limpeza.<br /><em>Inteligência para o seu sistema.</em></h2>
          </div>
          <p>A manutenção Sungrid combina trabalho em campo, análise técnica e documentação para manter a sua usina produzindo com segurança.</p>
        </div>
        <div className="service-grid">
          {services.map((item) => (
            <article className="service-card" key={item.number}>
              <span className="service-number">{item.number}</span>
              <div className="service-icon" aria-hidden="true"><img src={item.icon} width="96" height="96" loading="lazy" decoding="async" alt="" /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="performance" id="beneficios">
        <div className="performance-copy">
          <div className="eyebrow"><span /> PERFORMANCE PROTEGIDA</div>
          <h2>Energia que você gera.<br /><em>Economia que você sente.</em></h2>
          <p>Poeira, poluição e maresia agem em silêncio. A Sungrid transforma sinais dispersos em um plano objetivo para preservar a produção, a vida útil e a garantia do sistema.</p>
          <ul>
            <li><span>✓</span> Produção otimizada</li>
            <li><span>✓</span> Falhas detectadas cedo</li>
            <li><span>✓</span> Garantia documentada</li>
            <li><span>✓</span> Menos reparos inesperados</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-head">
            <div><span>Visão do sistema</span><strong>Performance após manutenção</strong></div>
            <span className="status"><i /> NORMAL</span>
          </div>
          <div className="energy-number"><strong>94,8%</strong><span>Eficiência estimada</span></div>
          <div className="line-chart" aria-hidden="true">
            <div className="grid-lines" />
            <div className="curve curve-before" />
            <div className="curve curve-after" />
            <span className="chart-label before">Antes</span>
            <span className="chart-label after">Depois</span>
          </div>
          <div className="dashboard-stats">
            <div><span>Produção</span><strong>Otimizada</strong></div>
            <div><span>Falhas críticas</span><strong>0 detectadas</strong></div>
            <div><span>Próxima revisão</span><strong>12 meses</strong></div>
          </div>
        </div>
      </section>

      <section className="section plans" id="planos">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow dark"><span /> PLANOS FLEXÍVEIS</div>
            <h2>O ritmo certo para<br /><em>cada sistema.</em></h2>
          </div>
          <p>Comece com uma avaliação. A frequência ideal considera o local, o tamanho da instalação e a importância da geração para sua operação.</p>
        </div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className={plan.featured ? "plan-card featured" : "plan-card"} key={plan.cadence}>
              <span className="plan-tag">{plan.tag}</span>
              <span className="plan-cadence">{plan.cadence}</span>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
              <a href="#contato">Quero este plano <Arrow /></a>
            </article>
          ))}
        </div>
        <p className="single-service">Precisa de uma inspeção pontual? <a href="#contato">Solicite um serviço avulso →</a></p>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-intro">
          <div className="eyebrow"><span /> DÚVIDAS FREQUENTES</div>
          <h2>Informação clara.<br /><em>Decisão segura.</em></h2>
          <p>Não encontrou sua dúvida? Fale diretamente com um especialista Sungrid.</p>
          <a className="button light" href={whatsappUrl} target="_blank" rel="noreferrer">Conversar no WhatsApp <Arrow /></a>
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

      <section className="contact" id="contato">
        <div className="contact-copy">
          <div className="eyebrow"><span /> SUA ENERGIA MERECE CUIDADO</div>
          <h2>Pronto para voltar a<br /><em>gerar no máximo?</em></h2>
          <p>Conte um pouco sobre o seu sistema. A solicitação será enviada para nossa equipe e responderemos pelos contatos informados.</p>
        </div>
        <ContactForm kind="home" />
      </section>

      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Sungrid pelo WhatsApp">
        <span aria-hidden="true">✆</span>
        <strong>WhatsApp</strong>
      </a>

      <footer>
        <a className="brand" href="#inicio"><span className="brand-mark"><i /><i /><i /></span><span>SUNGRID</span></a>
        <p>Manutenção solar inteligente para proteger seu investimento.</p>
        <div><a href="#servicos">Serviços</a><a href="#planos">Planos</a><a href="#faq">FAQ</a></div>
        <span>© {new Date().getFullYear()} Sungrid</span>
      </footer>
    </main>
  );
}
