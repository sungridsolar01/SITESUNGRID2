import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "../../../_components/BlogListing";
import { blogCategories, getCategory, getPostsByCategory } from "../../posts";

type CategoryPageProps = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return blogCategories.filter((category) => getPostsByCategory(category.slug).length > 0).map((category) => ({ categoria: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category || getPostsByCategory(categoria).length === 0) return { title: "Página não encontrada | Sungrid", robots: { index: false, follow: true } };
  const path = `/blog/categoria/${category.slug}/`;
  const title = category.title;
  const description = `${category.description} Artigos e guias do blog da Sungrid, energia solar no estado de São Paulo.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "Sungrid", locale: "pt_BR", title, description, images: ["/og.png?v=20261117"] },
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  const posts = getPostsByCategory(categoria);
  if (!category || posts.length === 0) notFound();

  const url = `https://sungridsolar.site/blog/categoria/${category.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: `${category.name} — Blog Sungrid`,
        description: category.description,
        url,
        inLanguage: "pt-BR",
        isPartOf: { "@id": "https://sungridsolar.site/blog/#blog" },
        hasPart: posts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: `https://sungridsolar.site/blog/${post.slug}/` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Página principal", item: "https://sungridsolar.site/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://sungridsolar.site/blog/" },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  };

  return <BlogListing
    posts={posts}
    activeCategory={category.slug}
    schema={schema}
    heading={{
      eyebrow: `BLOG · ${category.name.toUpperCase()}`,
      title: category.name,
      accent: "artigos da Sungrid.",
      text: category.description,
      breadcrumb: category.name.toUpperCase(),
    }}
  />;
}
