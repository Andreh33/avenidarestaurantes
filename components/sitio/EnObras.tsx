import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { restaurantes } from "@/content/restaurantes";
import { IconoTelefono } from "@/components/ui/iconos";

/**
 * Placeholder honesto (Ley 1) para rutas cuyo bloque aún no se ha
 * construido o cuyo dato real falta. Siempre con una vía de contacto
 * real a un toque (§12.3).
 */
export function EnObras({
  titulo,
  pendiente,
  children,
}: {
  titulo: string;
  /** Ej.: "P2 · cartas reales con precios actuales" */
  pendiente?: string;
  children?: ReactNode;
}) {
  const centro = restaurantes[0];
  const telCentro = centro.telefonos.find((t) => t.confirmado);

  return (
    <Section className="min-h-[60svh]">
      <Container className="max-w-3xl">
        <p className="text-eyebrow font-sans text-vermut uppercase">
          Estamos cocinando esta página
        </p>
        <h1 className="text-titular font-display mt-3">{titulo}</h1>

        {children ?? (
          <p className="text-lead mt-5 text-tinta/75">
            Esta parte de la web está en el fuego. Mientras tanto, en el local
            te atendemos como siempre: de palabra y con la pizarra del día.
          </p>
        )}

        {pendiente && (
          <p className="mt-5 inline-block rounded-md border border-dashed border-cobalto/40 px-3 py-2 font-sans text-sm text-cobalto">
            [PENDIENTE: {pendiente}]
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {telCentro && (
            <a
              href={`tel:${telCentro.numero}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-vermut px-6 py-3 font-sans text-sm font-semibold text-tiza shadow-flotante transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]"
            >
              <IconoTelefono />
              Llámanos: {telCentro.visible}
            </a>
          )}
          <ButtonLink href="/" variante="fantasma">
            Volver al inicio
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
