import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";

export const metadata: Metadata = {
  title: "Política de privacidad · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

export default function PaginaPrivacidad() {
  return (
    <EnObras
      titulo="Política de privacidad"
      pendiente="P11 · datos del responsable del tratamiento (RGPD)"
    />
  );
}
