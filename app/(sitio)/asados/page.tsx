import type { Metadata } from "next";
import { servicios } from "@/content/servicios";
import { PaginaServicio } from "@/components/sitio/PaginaServicio";

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
    />
  );
}
