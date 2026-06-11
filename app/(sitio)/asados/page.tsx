import type { Metadata } from "next";
import { servicios } from "@/content/servicios";
import { PaginaServicio } from "@/components/sitio/PaginaServicio";
import { Foto } from "@/components/ui/Foto";

export const metadata: Metadata = {
  title: "Asados para llevar · Restaurantes Avenida — Getafe",
  description:
    "Asados para llevar en Getafe: gran variedad, cuando y como quieras. Encarga el tuyo por teléfono y pásate a recogerlo.",
  alternates: { canonical: "/asados" },
};

export default function PaginaAsados() {
  const servicio = servicios.find((s) => s.slug === "asados")!;
  return (
    <PaginaServicio
      servicio={servicio}
      mensajeSugerido="Hola, quiero encargar un asado para llevar: ¿qué tenéis hoy y a qué hora puedo recogerlo?"
    >
      <figure data-aparece className="max-w-md">
        <div className="relative aspect-[3/4] overflow-hidden rounded-(--radius-card) shadow-card">
          <Foto
            id="lavadero-plato-01"
            fill
            sizes="(min-width: 640px) 28rem, 100vw"
          />
        </div>
        <figcaption className="mt-2 font-sans text-xs text-tinta/55">
          Bandeja de asado variado, lista para llevar
        </figcaption>
      </figure>
    </PaginaServicio>
  );
}
