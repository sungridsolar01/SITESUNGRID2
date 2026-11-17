/**
 * Vídeos do YouTube usados no site.
 *
 * Para publicar um vídeo, preencha `id` (o código depois de "watch?v=" no link do YouTube)
 * e `uploadDate` (data de publicação no YouTube, AAAA-MM-DD). Enquanto `id` estiver vazio,
 * nada aparece na página e nenhum schema VideoObject é gerado.
 */
export type SiteVideo = {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
};

export const videos = {
  /** Seção "Como funciona" da página principal. */
  homeComoFunciona: {
    id: "",
    title: "Como funciona a energia solar: do projeto à manutenção",
    description: "Entenda as etapas de um sistema de energia solar conectado à rede, da análise da conta de luz à manutenção.",
    uploadDate: "",
  },
  /** Artigo "Como funciona a energia solar em casa". */
  blogComoFunciona: {
    id: "",
    title: "Como funciona a energia solar em casa",
    description: "O caminho da energia do telhado até a tomada e como funcionam os créditos com a distribuidora.",
    uploadDate: "",
  },
  /** Página de sistemas híbridos e baterias. */
  hibridos: {
    id: "",
    title: "Energia solar híbrida, baterias e off-grid: qual a diferença?",
    description: "Diferenças entre sistemas conectados à rede, híbridos com bateria e off-grid.",
    uploadDate: "",
  },
} satisfies Record<string, SiteVideo>;
