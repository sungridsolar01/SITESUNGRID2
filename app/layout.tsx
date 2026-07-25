import type { Metadata } from "next";
import globalStyles from "./globals.css?inline";

export const metadata: Metadata = {
  metadataBase: new URL("https://sungridsolar.site"),
  title: "Manutenção de Energia Solar | Limpeza e Diagnóstico | Sungrid",
  description: "Manutenção, limpeza e diagnóstico de sistemas de energia solar. Recupere desempenho, reduza perdas e receba um relatório técnico. Solicite uma avaliação.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sungrid",
    locale: "pt_BR",
    title: "Manutenção de Energia Solar | Limpeza e Diagnóstico | Sungrid",
    description: "Manutenção, limpeza e diagnóstico de sistemas de energia solar. Recupere desempenho, reduza perdas e receba um relatório técnico.",
    images: [{ url: "/og.png", width: 1662, height: 946, alt: "Serviços Sungrid para sistemas fotovoltaicos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manutenção de Energia Solar | Sungrid",
    description: "Limpeza, diagnóstico e manutenção para recuperar o desempenho de sistemas fotovoltaicos.",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sungridsolar.site/#organization",
      name: "Sungrid",
      url: "https://sungridsolar.site/",
      logo: "https://sungridsolar.site/favicon.svg",
      telephone: "+55 12 99188-6006",
      areaServed: { "@type": "Country", name: "Brasil" },
      sameAs: [
        "https://www.instagram.com/sungridmro/",
        "https://www.linkedin.com/company/sungridmro/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://sungridsolar.site/#website",
      url: "https://sungridsolar.site/",
      name: "Sungrid",
      inLanguage: "pt-BR",
      publisher: { "@id": "https://sungridsolar.site/#organization" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <style data-critical-css dangerouslySetInnerHTML={{ __html: globalStyles }} />
        <link rel="preload" href="/fonts/urbanist-normal-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <script src="/js/site-interactions.min.js" defer />
      </body>
    </html>
  );
}
