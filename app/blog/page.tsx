import type { Metadata } from "next";
import { BlogListing } from "../_components/BlogListing";
import { getAllPosts } from "./posts";

const title = "Blog Sungrid | Energia Solar, Manutenção e Mobilidade Elétrica";
const description = "Artigos da Sungrid sobre energia solar residencial e em apartamento, créditos e regras, como funciona o sistema fotovoltaico e dimensionamento por consumo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/" },
  openGraph: { type: "website", url: "/blog/", siteName: "Sungrid", locale: "pt_BR", title, description, images: ["/og.png?v=20261117"] },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://sungridsolar.site/blog/#blog",
        name: "Blog Sungrid",
        description,
        url: "https://sungridsolar.site/blog/",
        inLanguage: "pt-BR",
        publisher: { "@id": "https://sungridsolar.site/#organization" },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `https://sungridsolar.site/blog/${post.slug}/`,
          datePublished: post.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Página principal", item: "https://sungridsolar.site/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://sungridsolar.site/blog/" },
        ],
      },
    ],
  };

  return <BlogListing
    posts={posts}
    schema={schema}
    heading={{
      eyebrow: "BLOG SUNGRID",
      title: "Energia solar",
      accent: "sem complicação.",
      text: "Guias práticos sobre energia solar, créditos e regras, manutenção, baterias e mobilidade elétrica para quem mora ou empreende no estado de São Paulo.",
      breadcrumb: "BLOG",
    }}
  />;
}
