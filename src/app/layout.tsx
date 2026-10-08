import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import "@/styles/brasil.css";
import { Toaster } from "@/components/ui/toaster";
import { MetaPixel } from "@/components/brasil/MetaPixel";

export const metadata: Metadata = {
  title: "Brasil Explicado | Não caia em fake news",
  description:
    "Brasil Explicado: 24 flashcards visuais para entender quem decide, o que pode mudar e onde conferir uma informação. Oferta única de R$22,90.",
  keywords: [
    "Brasil Explicado",
    "fake news",
    "instituições",
    "governo",
    "cartilha",
    "ebook",
  ],
  authors: [{ name: "Brasil Explicado" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Brasil Explicado | Entenda antes de acreditar",
    description:
      "Um guia visual para entender as instituições e conferir mensagens sobre mudanças nas regras. R$22,90 em pagamento único.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#073326",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="brasil-body">
        <MetaPixel />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
