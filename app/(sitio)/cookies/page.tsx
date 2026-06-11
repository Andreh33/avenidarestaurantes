import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";

export const metadata: Metadata = {
  title: "Política de cookies · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

export default function PaginaCookies() {
  return (
    <EnObras titulo="Política de cookies">
      <p className="text-lead mt-5 text-tinta/75">
        Esta web usa analítica sin cookies (Vercel Analytics). La página
        completa, con todo el detalle, llega en el bloque legal (B17).
      </p>
    </EnObras>
  );
}
