import { blogCategories, categoryName, formatDate, getPostsByCategory, type BlogPost } from "../blog/posts";
import { ContactForm } from "./ContactForm";
import { Arrow, CrossLinks, SiteFooter, SiteHeader, WhatsAppFloat, whatsappForPage } from "./Site";

type BlogListingProps = {
  posts: BlogPost[];
  /** Slug da categoria ativa; ausente na página principal do blog. */
  activeCategory?: string;
  heading: { eyebrow: string; title: string; accent: string; text: string; breadcrumb: string };
  schema: object;
};

export function BlogListing({ posts, activeCategory, heading, schema }: BlogListingProps) {
  const waHref = whatsappForPage("blog");
  return (
    <main className="seo-service-page blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="seo-service-hero">
        <div className="eyebrow"><span /> {heading.eyebrow}</div>
        <p className="service-index"><a href="/">SUNGRID</a> / {activeCategory ? <><a href="/blog/">BLOG</a> / {heading.breadcrumb}</> : "BLOG"}</p>
        <h1>{heading.title}<br /><em>{heading.accent}</em></h1>
        <p>{heading.text}</p>
        <div className="hero-actions">
          <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp <Arrow /></a>
          <a className="text-link" href="#artigos">Ver artigos <span>↓</span></a>
        </div>
      </section>

      <section className="section services blog-list" id="artigos">
        <nav className="blog-categories" aria-label="Categorias do blog">
          <a href="/blog/" aria-current={activeCategory ? undefined : "page"}>Todos os artigos</a>
          {blogCategories.map((category) => {
            const count = getPostsByCategory(category.slug).length;
            if (count === 0) {
              return <span key={category.slug} className="blog-category-empty" title="Em breve">{category.name} <small>em breve</small></span>;
            }
            return (
              <a key={category.slug} href={`/blog/categoria/${category.slug}/`} aria-current={activeCategory === category.slug ? "page" : undefined}>
                {category.name} <small>{count}</small>
              </a>
            );
          })}
        </nav>
        <div className="service-grid blog-grid">
          {posts.map((post, index) => (
            <article className="service-card blog-card" key={post.slug}>
              <span className="service-number">{String(index + 1).padStart(2, "0")} · {categoryName(post.categories[0]).toUpperCase()}</span>
              <h3><a href={`/blog/${post.slug}/`}>{post.title}</a></h3>
              <p>{post.description}</p>
              <span className="blog-meta"><time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min de leitura</span>
              <a className="service-link" href={`/blog/${post.slug}/`} aria-label={`Ler artigo: ${post.title}`}>Ler artigo <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <CrossLinks current="/blog/" />

      <section className="service-contact" id="contato">
        <div>
          <div className="eyebrow"><span /> FALE COM A SUNGRID</div>
          <h2>Ficou com dúvida?<br /><em>Fale com a equipe.</em></h2>
          <p>Conte o que você precisa. Para uma resposta mais rápida, chame no WhatsApp; se preferir, use o formulário.</p>
        </div>
        <ContactForm kind="home" />
      </section>

      <WhatsAppFloat href={waHref} />
      <SiteFooter variant="service" />
    </main>
  );
}
