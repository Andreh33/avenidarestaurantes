import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SelloGracias } from "@/components/reservas/SelloGracias";

export const metadata: Metadata = {
  title: "Solicitud enviada · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

/**
 * /gracias (§12.1, §15.21): sello «RESERVA SOLICITADA» estampado +
 * resumen + aviso honesto de que aún no es una confirmación.
 */
export default async function PaginaGracias({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const p = await searchParams;
  const dato = (k: string) => (typeof p[k] === "string" ? (p[k] as string) : null);
  const nombre = dato("nombre");
  const local = dato("local");
  const fecha = dato("fecha");
  const hora = dato("hora");
  const personas = dato("personas");

  return (
    <Section className="min-h-[65svh]">
      <Container className="max-w-2xl text-center">
        <SelloGracias />
        <h1 className="text-titular font-display mt-8">
          {nombre ? `¡Hecho, ${nombre}!` : "¡Hecho!"}
        </h1>
        {local && fecha && hora && (
          <p className="text-lead mt-4 text-tinta/80">
            Avenida {local} · {fecha} a las {hora}
            {personas ? ` · ${personas} ${personas === "1" ? "persona" : "personas"}` : ""}
          </p>
        )}
        <p className="mx-auto mt-5 max-w-md font-sans text-base text-tinta/65">
          Te confirmamos por teléfono o WhatsApp en cuanto lo veamos.
          <strong> Esto aún no es una confirmación.</strong>
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variante="fantasma">
            Volver al paseo
          </ButtonLink>
          <ButtonLink href="/carta" variante="cobalto">
            Ir abriendo boca
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
