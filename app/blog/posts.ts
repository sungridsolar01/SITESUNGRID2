/// <reference types="vite/client" />
/**
 * Blog Sungrid — como publicar um novo artigo:
 * 1. Copie um arquivo de `app/blog/_posts/` (ex.: `como-funciona-energia-solar-residencial.ts`).
 * 2. Renomeie com o novo endereço (slug), em minúsculas e com hífens.
 * 3. Edite título, descrição, categorias (`categories`), páginas relacionadas (`related`), datas e o texto em `body` (formato Markdown simples:
 *    `## Subtítulo`, `### Subtítulo menor`, parágrafos separados por linha em branco,
 *    listas com `- item` ou `1. item`, **negrito** e [links](/contato/)).
 * 4. Rode `npm run publish:pages`. O artigo entra sozinho no /blog/, no sitemap e na página principal.
 */
/** Categorias do blog. A página /blog/categoria/<slug>/ é publicada quando há ao menos um artigo. */
export const blogCategories = [
  { slug: "residencial-e-apartamento", title: "Energia Solar Residencial e em Apartamento | Blog Sungrid", name: "Residencial e apartamento", description: "Energia solar para casas, sobrados e para quem mora em apartamento ou condomínio." },
  { slug: "creditos-e-regras", title: "Créditos de Energia Solar e Regras da Distribuidora | Blog Sungrid", name: "Créditos e regras", description: "Créditos de energia, conta de luz, regras da distribuidora, tributos e programas do governo." },
  { slug: "como-funciona", title: "Como Funciona a Energia Solar | Blog Sungrid", name: "Como funciona", description: "Como funciona um sistema fotovoltaico, seus componentes, a manutenção e as tecnologias envolvidas." },
  { slug: "dimensionamento-por-consumo", title: "Dimensionamento de Energia Solar por Consumo | Blog Sungrid", name: "Dimensionamento por consumo", description: "Como o consumo em kWh/mês define o tamanho do sistema de energia solar." },
] as const;

export type BlogCategorySlug = (typeof blogCategories)[number]["slug"];

export type BlogPost = {
  /** Endereço do artigo: /blog/<slug>/ */
  slug: string;
  title: string;
  /** Resumo usado no Google, nas redes sociais e na lista do blog (até ~160 caracteres). */
  description: string;
  /** Categorias do artigo (a primeira é a principal). Use os slugs de `blogCategories`. */
  categories: BlogCategorySlug[];
  /** Páginas do site relacionadas ao artigo (ex.: "/energia-solar-residencial/", "/energia-solar-estado-de-sao-paulo/"). */
  related?: string[];
  /** Data de publicação no formato AAAA-MM-DD. */
  date: string;
  /** Data da última revisão (opcional), AAAA-MM-DD. */
  updated?: string;
  readingMinutes: number;
  /** Vídeo do YouTube exibido no artigo (chave de `videos` em app/_components/videos.ts). */
  video?: "homeComoFunciona" | "blogComoFunciona" | "hibridos";
  /** Texto da página na mensagem do WhatsApp. */
  waLabel?: string;
  body: string;
};

const modules = import.meta.glob<{ default: BlogPost }>("./_posts/*.ts", { eager: true });

const posts: BlogPost[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getCategory(slug: string) {
  return blogCategories.find((category) => category.slug === slug);
}

export function categoryName(slug: string) {
  return getCategory(slug)?.name ?? slug;
}

export function getPostsByCategory(slug: string): BlogPost[] {
  return posts.filter((post) => post.categories.includes(slug as BlogCategorySlug));
}

export function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${day} de ${months[month - 1]} de ${year}`;
}
