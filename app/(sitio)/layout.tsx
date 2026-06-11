import type { ReactNode } from "react";
import { Header } from "@/components/sitio/Header";
import { Footer } from "@/components/sitio/Footer";

/**
 * Chrome del sitio: header fijo + footer noche. La home vive fuera de
 * este grupo hasta que el Paseo (B5–B12) la incorpore con su propio hero.
 */
export default function LayoutSitio({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
