import type { Metadata } from "next";
import globalStyles from "./globals.css?inline";
import { businessInfo } from "./_components/BusinessInfo";
import { ASSET_VERSION } from "./_components/Site";

export const metadata: Metadata = {
  metadataBase: new URL("https://sungridsolar.site"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: `/favicon.svg?v=${ASSET_VERSION}`, type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
};

const offeredServices = [
  ["Energia solar residencial", "/energia-solar-residencial/"],
  ["Energia solar comercial", "/energia-solar-comercial/"],
  ["Energia solar rural", "/energia-solar-rural/"],
  ["Sistemas híbridos, baterias e off-grid", "/sistemas-hibridos-e-baterias/"],
  ["Carregadores para veículos elétricos", "/carregadores-veiculares/"],
  ["Manutenção de energia solar", "/manutencao-de-energia-solar/"],
  ["Limpeza de painéis solares", "/limpeza-de-paineis-solares/"],
  ["Diagnóstico de sistema fotovoltaico", "/diagnostico-de-sistema-fotovoltaico/"],
  ["Manutenção de grandes usinas solares", "/manutencao-grandes-usinas/"],
  ["Seguro fotovoltaico", "/seguro-fotovoltaico/"],
] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "Electrician"],
      "@id": "https://sungridsolar.site/#organization",
      name: businessInfo.name,
      alternateName: businessInfo.alternateName,
      description: "Empresa de energia solar em São José dos Campos com atendimento no estado de São Paulo: instalação de sistemas residenciais, comerciais e rurais, sistemas híbridos e baterias, manutenção, limpeza, diagnóstico, seguro fotovoltaico, instalação de wallbox e homologação junto às distribuidoras (EDP, CPFL, Enel e Eletro Cedrap).",
      url: "https://sungridsolar.site/",
      logo: "https://sungridsolar.site/favicon.svg",
      image: "https://sungridsolar.site/og.png",
      telephone: businessInfo.telephone,
      email: businessInfo.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${businessInfo.streetAddress}, ${businessInfo.neighborhood}`,
        addressLocality: businessInfo.addressLocality,
        addressRegion: businessInfo.addressRegion,
        postalCode: businessInfo.postalCode,
        addressCountry: businessInfo.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: businessInfo.latitude,
        longitude: businessInfo.longitude,
      },
      hasMap: businessInfo.hasMap,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "20:00",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Estado de São Paulo" },
        { "@type": "City", name: "São José dos Campos", containedInPlace: { "@type": "State", name: "São Paulo" } },
        { "@type": "AdministrativeArea", name: "Vale do Paraíba" },
        { "@type": "City", name: "São Paulo", containedInPlace: { "@type": "State", name: "São Paulo" } },
        { "@type": "AdministrativeArea", name: "Litoral Norte" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de energia solar Sungrid",
        itemListElement: offeredServices.map(([name, path]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, url: `https://sungridsolar.site${path}` },
        })),
      },
      sameAs: [...businessInfo.sameAs],
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
        <script src={`/js/site-interactions.min.js?v=${ASSET_VERSION}`} defer />
      </body>
    </html>
  );
}
