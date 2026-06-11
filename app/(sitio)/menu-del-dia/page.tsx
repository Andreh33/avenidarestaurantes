import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";

export const metadata: Metadata = {
  title: "Menú del día · Restaurantes Avenida — Getafe",
  description:
    "El menú del día de Restaurantes Avenida en Getafe: cocina casera a buen precio. La pizarra digital llega muy pronto.",
};

export default function PaginaMenuDelDia() {
  return (
    <EnObras
      titulo="El menú del día"
      pendiente="P3 · platos tipo, precio y días de servicio"
    />
  );
}
