import type { Metadata } from "next";
import { DM_Serif_Display, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Javier Vásquez — Dev & Security",
  description:
    "Desarrollador Full-Stack e Investigador en Seguridad. Proyectos en producción, auditorías, CTFs y bug bounty.",
  keywords: ["portafolio", "desarrollador", "ciberseguridad", "fullstack", "pentesting", "bug bounty"],
  openGraph: {
    title: "Javier Vásquez — Dev & Security",
    description:
      "Desarrollador Full-Stack e Investigador en Seguridad. Proyectos en producción, auditorías, CTFs y bug bounty.",
    url: "https://portfolio-pearl-six-15.vercel.app/",
    siteName: "Javier Vásquez",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier Vásquez — Dev & Security",
    description:
      "Desarrollador Full-Stack e Investigador en Seguridad. Proyectos en producción, auditorías, CTFs y bug bounty.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${dmSerif.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
