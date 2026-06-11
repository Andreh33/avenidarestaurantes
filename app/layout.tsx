import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

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
  title: "Restaurantes Avenida — Getafe · Calidad al mejor precio",
  description:
    "Restaurantes Avenida, referencia en Getafe: menú del día, tapas, raciones y celebraciones en la calle Toledo y la plaza del Lavadero. Muy pronto, nuestra nueva web.",
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
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
