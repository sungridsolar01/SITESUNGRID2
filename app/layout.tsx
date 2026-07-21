import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sungrid-manutencao-solar.sungridmro.chatgpt.site"),
  title: "Sungrid | Manutenção Solar Profissional",
  description: "Manutenção, limpeza e diagnóstico profissional para maximizar a eficiência e proteger seu sistema de energia solar.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Sungrid | Energia protegida. Performance em escala.",
    description: "Manutenção profissional, seguro fotovoltaico e O&M para grandes usinas solares.",
    images: [{ url: "/og.png", width: 1662, height: 946, alt: "Serviços Sungrid para sistemas fotovoltaicos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sungrid | Energia protegida. Performance em escala.",
    description: "Manutenção profissional, seguro fotovoltaico e O&M para grandes usinas solares.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
