import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";

export const metadata: Metadata = {
  title: "Aviso legal · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

export default function PaginaAvisoLegal() {
  return (
    <EnObras
      titulo="Aviso legal"
      pendiente="P11 · razón social, NIF/CIF y dirección fiscal del titular"
    />
  );
}
