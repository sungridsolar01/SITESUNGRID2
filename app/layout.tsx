import type { Metadata } from "next";
import globalStyles from "./globals.css?inline";
import { businessInfo } from "./_components/BusinessInfo";

export const metadata: Metadata = {
  metadataBase: new URL("https://sungridsolar.site"),
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://sungridsolar.site/#organization",
      name: businessInfo.name,
      alternateName: businessInfo.alternateName,
      url: "https://sungridsolar.site/",
      logo: "https://sungridsolar.site/favicon.svg",
      telephone: businessInfo.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: businessInfo.streetAddress,
        addressLocality: businessInfo.addressLocality,
        addressRegion: businessInfo.addressRegion,
        postalCode: businessInfo.postalCode,
        addressCountry: businessInfo.addressCountry,
      },
      areaServed: { "@type": "AdministrativeArea", name: "Estado de São Paulo" },
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
