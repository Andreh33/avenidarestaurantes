import type { Metadata } from "next";
import { servicios } from "@/content/servicios";
import { PaginaServicio } from "@/components/sitio/PaginaServicio";

export const metadata: Metadata = {
  title: "Eventos y celebraciones · Restaurantes Avenida — Getafe",
  description:
    "Celebraciones, cenas de empresa y eventos en Getafe con sala privada en el Avenida Lavadero. Cuéntanos tu idea y preparamos un día inolvidable.",
  alternates: { canonical: "/eventos" },
};

export default function PaginaEventos() {
  const servicio = servicios.find((s) => s.slug === "eventos")!;
  return (
    <PaginaServicio
      servicio={servicio}
      mensajeSugerido="Hola, quiero información para una celebración: somos un grupo y buscamos fecha."
    >
      <div
        data-aparece
        className="rounded-(--radius-card) border border-aceituna/25 bg-tiza p-7 shadow-card sm:p-9"
      >
        <p className="text-eyebrow font-sans text-aceituna uppercase">
          El espacio
        </p>
        <h2 className="text-rotulo font-display mt-3 text-tinta">
          Sala privada en el Avenida Lavadero
        </h2>
        <p className="mt-3 max-w-xl font-sans text-base text-tinta/70">
          En la planta de arriba, con la sala entera para vosotros:
          cumpleaños, comuniones, cenas de empresa y sobremesas largas. El
          aforo exacto y los salones disponibles te los confirmamos por
          teléfono mientras terminamos de subirlos a la web.
        </p>
      </div>
    </PaginaServicio>
  );
}
