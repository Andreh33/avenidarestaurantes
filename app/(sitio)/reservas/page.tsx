import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { restaurantes } from "@/content/restaurantes";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { IconoTelefono } from "@/components/ui/iconos";

export const metadata: Metadata = {
  title: "Reservar mesa · Restaurantes Avenida — Getafe",
  description:
    "Reserva tu mesa en Restaurantes Avenida (Getafe Centro y Lavadero) por teléfono. WhatsApp y formulario, muy pronto.",
};

/**
 * Stub de reservas: la vía de menos fricción (llamar, §12.1) funciona
 * desde el día 1. WhatsApp y formulario llegan en B15 (P4 pendiente).
 */
export default function PaginaReservas() {
  return (
    <Section className="min-h-[60svh]">
      <Container className="max-w-3xl">
        <p className="text-eyebrow font-sans text-vermut uppercase">
          Reservar mesa
        </p>
        <h1 className="text-titular font-display mt-3">Te esperamos</h1>
        <p className="text-lead mt-5 text-tinta/75">
          De momento, como toda la vida: por teléfono. La reserva por WhatsApp
          y el formulario están al caer.
        </p>

        <div className="mt-10 space-y-6">
          {restaurantes.map((r) => {
            const tel = r.telefonos[0];
            return (
              <div
                key={r.slug}
                className="rounded-(--radius-card) border border-tinta/10 bg-tiza p-6 shadow-card"
              >
                <h2 className="font-display text-rotulo">{r.nombre}</h2>
                <p className="mt-1 font-sans text-sm text-tinta/60">
                  {r.direccion.calle} · {r.direccion.cp} {r.direccion.ciudad}
                </p>
                <EstadoVivo restaurante={r} className="mt-3 text-tinta/80" />
                <a
                  href={`tel:${tel.numero}`}
                  className="mt-4 inline-flex items-center gap-3 font-display text-2xl font-bold text-cobalto tabular-nums sm:text-3xl"
                >
                  <IconoTelefono />
                  {tel.visible}
                </a>
                {!tel.confirmado && (
                  <p className="mt-1 font-sans text-xs text-tinta/50">
                    [PENDIENTE P4: confirmar teléfono vigente]
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
