import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";
import { servicios } from "@/content/servicios";

export const metadata: Metadata = {
  title: "Catering · Restaurantes Avenida — Getafe",
  description:
    "Catering casero en Getafe: llevamos nuestros platos allá donde los necesites para abastecer tu evento.",
};

export default function PaginaCatering() {
  const servicio = servicios.find((s) => s.slug === "catering")!;
  return (
    <EnObras titulo={servicio.nombre}>
      <p className="text-lead mt-5 text-tinta/75">{servicio.copy}</p>
      <p className="mt-3 font-sans text-sm text-tinta/60">
        Página completa en construcción.
      </p>
    </EnObras>
  );
}
