import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";
import { LanguageProvider } from "./contexts/languageContext";
import { ThemeProvider } from "./contexts/themeContext";
import { Footer } from "./components/footer";
import { SchemaMarkup } from "./components/schemaMarkup";
import { Analytics } from "./components/analytics";
import { SkipLink } from "./components/skipLink";

// URL base
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aitor - Desarrollador Web Fullstack Junior",
    template: "%s | Aitor - Portfolio"
  },
  description: "Portfolio de Aitor, desarrollador web fullstack junior especializado en React, Next.js, Node.js. Experiencia internacional y proyectos modernos.",
  keywords: ["desarrollador web", "fullstack", "React", "Next.js", "Node.js", "TypeScript", "portfolio", "Asturias"],
  authors: [{ name: "Aitor" }],
  creator: "Aitor",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Aitor - Portfolio",
    title: "Aitor - Desarrollador Web Fullstack Junior",
    description: "Portfolio de Aitor, desarrollador web fullstack junior especializado en React, Next.js, Node.js.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aitor - Desarrollador Web Fullstack",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Analytics />
        <SchemaMarkup />
        <SkipLink />
        <ThemeProvider>
          <LanguageProvider>
            <header>
              <Navigation />
            </header>
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}