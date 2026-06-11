import type { Metadata } from "next";
import { EnObras } from "@/components/sitio/EnObras";
import { servicios } from "@/content/servicios";

export const metadata: Metadata = {
  title: "Eventos y celebraciones · Restaurantes Avenida — Getafe",
  description:
    "Celebraciones, cenas de empresa y eventos en Getafe, con sala privada en el Avenida Lavadero. Cuéntanos tu idea.",
};

export default function PaginaEventos() {
  const servicio = servicios.find((s) => s.slug === "eventos")!;
  return (
    <EnObras titulo={servicio.nombre} pendiente="P10 · aforos y salones">
      <p className="text-lead mt-5 text-tinta/75">{servicio.copy}</p>
      <p className="mt-3 font-sans text-sm text-tinta/60">
        Sala privada en la planta de arriba del Avenida Lavadero. Página
        completa en construcción.
      </p>
    </EnObras>
  );
}
