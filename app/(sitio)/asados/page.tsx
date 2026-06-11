import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";
import { servicios } from "@/content/servicios";

export const metadata: Metadata = {
  title: "Asados para llevar · Restaurantes Avenida — Getafe",
  description:
    "Asados para llevar en Getafe: gran variedad, cuando y como quieras. Encarga el tuyo por teléfono.",
};

export default function PaginaAsados() {
  const servicio = servicios.find((s) => s.slug === "asados")!;
  return (
    <EnObras titulo={servicio.nombre}>
      <p className="text-lead mt-5 text-tinta/75">{servicio.copy}</p>
      <p className="mt-3 font-sans text-sm text-tinta/60">
        Página completa en construcción.
      </p>
    </EnObras>
  );
}
