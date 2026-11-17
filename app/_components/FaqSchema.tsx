/** Schema FAQPage (schema.org) para páginas com perguntas frequentes visíveis. */
export function FaqSchema({ faq, pathname }: { faq: Array<[string, string]>; pathname: string }) {
  if (faq.length === 0) return null;
  const url = `https://sungridsolar.site${pathname}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage: "pt-BR",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
