import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "../../_components/ContactForm";
import { Markdown } from "../../_components/Markdown";
import { Arrow, CrossLinks, SiteFooter, SiteHeader, WhatsAppFloat, pageLabels, whatsappForPage } from "../../_components/Site";
import { YouTubeEmbed } from "../../_components/YouTubeEmbed";
import { videos } from "../../_components/videos";
import { categoryName, formatDate, getAllPosts, getPost, type BlogPost } from "../posts";

/** Artigos ligados a este: os que ele cita em `relatedPosts` e os que citam ele. */
function relatedPostsFor(post: BlogPost): BlogPost[] {
  const all = getAllPosts();
  const slugs = new Set([
    ...(post.relatedPosts ?? []),
    ...all.filter((other) => other.relatedPosts?.includes(post.slug)).map((other) => other.slug),
  ]);
  slugs.delete(post.slug);
  return all.filter((other) => slugs.has(other.slug));
}

type PostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Página não encontrada | Sungrid", robots: { index: false, follow: true } };
  const url = `/blog/${post.slug}/`;
  return {
    title: post.metaTitle ?? `${post.title} | Blog Sungrid`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Sungrid",
      locale: "pt_BR",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: ["/og.png?v=20261117"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ["/og.png?v=20261117"] },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `https://sungridsolar.site/blog/${post.slug}/`;
  const related = (post.related ?? []).filter((href) => pageLabels[href]);
  const linkedPosts = relatedPostsFor(post);
  const waHref = whatsappForPage(post.waLabel ?? "blog");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // Se o artigo traz o próprio JSON-LD Article (articleSchema), ele é usado no lugar deste BlogPosting.
      ...(post.articleSchema ? [] : [{
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "pt-BR",
        articleSection: post.categories.map(categoryName),
        mainEntityOfPage: url,
        url,
        image: "https://sungridsolar.site/og.png",
        author: { "@id": "https://sungridsolar.site/#organization" },
        publisher: { "@id": "https://sungridsolar.site/#organization" },
        isPartOf: { "@id": "https://sungridsolar.site/blog/#blog" },
      }]),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Página principal", item: "https://sungridsolar.site/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://sungridsolar.site/blog/" },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="seo-service-page blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {post.articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.articleSchema }} />}
      {post.faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.faqSchema }} />}
      <SiteHeader variant="service" whatsappHref={waHref} />

      <section className="seo-service-hero blog-hero">
        <div className="eyebrow"><span /> {categoryName(post.categories[0]).toUpperCase()}</div>
        <p className="service-index"><a href="/">SUNGRID</a> / <a href="/blog/">BLOG</a></p>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <p className="blog-tags">
          {post.categories.map((slug) => <a key={slug} href={`/blog/categoria/${slug}/`}>{categoryName(slug)}</a>)}
        </p>
        <p className="blog-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && post.updated !== post.date ? <> · atualizado em <time dateTime={post.updated}>{formatDate(post.updated)}</time></> : null}
          {" "}· {post.readingMinutes} min de leitura
        </p>
      </section>

      <article className="blog-article">
        <div className="blog-body">
          {post.video && <YouTubeEmbed video={videos[post.video]} pathname={`/blog/${post.slug}/`} />}
          <Markdown source={post.body} />
          {related.length > 0 && (
            <nav className="blog-related" aria-label="Páginas relacionadas">
              <strong>Serviços e cidades relacionados</strong>
              <ul>
                {related.map((href) => <li key={href}><a href={href}>{pageLabels[href]} <Arrow /></a></li>)}
              </ul>
            </nav>
          )}
          {linkedPosts.length > 0 && (
            <nav className="blog-related" aria-label="Artigos relacionados">
              <strong>Leia também no blog</strong>
              <ul>
                {linkedPosts.map((item) => <li key={item.slug}><a href={`/blog/${item.slug}/`}>{item.title} <Arrow /></a></li>)}
              </ul>
            </nav>
          )}
          <aside className="blog-cta">
            <strong>Quer um orçamento para o seu caso?</strong>
            <p>Fale com a equipe Sungrid pelo WhatsApp. Atendemos todo o estado de São Paulo.</p>
            <a className="button primary" href={waHref} target="_blank" rel="noreferrer">Pedir orçamento no WhatsApp <Arrow /></a>
          </aside>
          <p className="blog-back"><a href="/blog/">← Voltar para o blog</a></p>
        </div>
      </article>

      <CrossLinks />

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
