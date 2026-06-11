import type { Metadata } from "next";
import { servicios } from "@/content/servicios";
import { PaginaServicio } from "@/components/sitio/PaginaServicio";

export const metadata: Metadata = {
  title: "Catering · Restaurantes Avenida — Getafe",
  description:
    "Catering de cocina casera en Getafe: llevamos nuestros platos allá donde los necesites para abastecer tu evento.",
  alternates: { canonical: "/catering" },
};

export default function PaginaCatering() {
  const servicio = servicios.find((s) => s.slug === "catering")!;
  return (
    <PaginaServicio
      servicio={servicio}
      mensajeSugerido="Hola, quiero información del catering: fecha, número de personas y qué platos podéis llevar."
    />
  );
}
