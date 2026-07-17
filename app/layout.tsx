import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sungrid | Manutenção Solar Profissional",
  description: "Manutenção, limpeza e diagnóstico profissional para maximizar a eficiência e proteger seu sistema de energia solar.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
