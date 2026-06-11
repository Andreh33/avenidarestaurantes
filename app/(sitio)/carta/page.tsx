import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";

export const metadata: Metadata = {
  title: "La carta · Restaurantes Avenida — Getafe",
  description:
    "Tapas, raciones y platos caseros en Getafe. Carta completa muy pronto — mientras tanto, te la contamos en el local.",
};

export default function PaginaCarta() {
  return (
    <EnObras
      titulo="La carta"
      pendiente="P2 · cartas reales con precios actuales"
    />
  );
}
