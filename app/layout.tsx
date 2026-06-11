import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { DetallesGlobales } from "@/components/motion/DetallesGlobales";
import { organizationJsonLd } from "@/lib/seo";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Restaurantes Avenida — Getafe · Calidad al mejor precio",
    template: "%s",
  },
  description:
    "Restaurantes Avenida, referencia en Getafe: menú del día, tapas, raciones y celebraciones en la calle Toledo y la plaza del Lavadero.",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${instrumentSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <DetallesGlobales />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
