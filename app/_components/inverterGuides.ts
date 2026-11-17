/**
 * Artigos do blog sobre erros de inversor, por marca e código.
 * A lista começa vazia: enquanto estiver vazia, a página de diagnóstico não mostra o bloco de links.
 * Para adicionar, publique o artigo no blog e inclua uma linha aqui, por exemplo:
 *   { brand: "Marca X", code: "E001", title: "Erro E001 no inversor Marca X: o que significa", href: "/blog/erro-e001-inversor-marca-x/" },
 */
export type InverterGuide = {
  brand: string;
  /** Código de erro exibido no inversor (opcional para guias gerais da marca). */
  code?: string;
  title: string;
  href: string;
};

export const inverterGuides: InverterGuide[] = [];

/** Agrupa os guias por marca, em ordem alfabética. */
export function inverterGuidesByBrand(guides: InverterGuide[] = inverterGuides) {
  const groups = new Map<string, InverterGuide[]>();
  for (const guide of guides) {
    if (!guide.brand || !guide.href || !guide.title) continue;
    groups.set(guide.brand, [...(groups.get(guide.brand) ?? []), guide]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
}
