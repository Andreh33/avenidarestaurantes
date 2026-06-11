import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { restaurantes, restaurantePorSlug } from "@/content/restaurantes";
import { PlacaAzulejo } from "@/components/placas/PlacaAzulejo";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { urlComoLlegar } from "@/lib/maps";
import { IconoMapa, IconoTelefono } from "@/components/ui/iconos";

/**
 * Ficha mínima de local (stub de B4). La plantilla completa —galería,
 * especialidades, theming, View Transitions— es el bloque B13.
 */

export function generateStaticParams() {
  return restaurantes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = restaurantePorSlug(slug);
  if (!r) return {};
  return {
    title: `${r.nombre} · Restaurantes Avenida — Getafe`,
    description: `${r.descripcionCorta} ${r.direccion.calle}, ${r.direccion.ciudad}.`,
  };
}

export default async function PaginaRestaurante({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = restaurantePorSlug(slug);
  if (!r) notFound();

  return (
    <Section className="min-h-[60svh]">
      <Container className="max-w-3xl">
        <PlacaAzulejo
          eyebrow={r.placa.eyebrow}
          texto={r.placa.texto}
          pie={r.placa.pie}
          matiz={r.placa.matiz}
          className="max-w-sm"
        />

        <h1 className="text-titular font-display mt-8">{r.nombre}</h1>
        <p className="text-lead mt-4 text-tinta/75">{r.descripcionLarga}</p>

        <div className="mt-8 space-y-3 font-sans">
          <address className="not-italic text-tinta/80">
            {r.direccion.calle} · {r.direccion.cp} {r.direccion.ciudad}
          </address>
          <EstadoVivo restaurante={r} className="text-tinta/80" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {r.telefonos.map((t) => (
              <a
                key={t.numero}
                href={`tel:${t.numero}`}
                className="enlace inline-flex items-center gap-2 font-semibold text-cobalto tabular-nums"
              >
                <IconoTelefono />
                {t.visible}
                {!t.confirmado && (
                  <span className="text-xs font-normal text-tinta/50">
                    (por confirmar)
                  </span>
                )}
              </a>
            ))}
            <a
              href={urlComoLlegar(r)}
              target="_blank"
              rel="noopener noreferrer"
              className="enlace inline-flex items-center gap-2 font-medium text-cobalto"
            >
              <IconoMapa />
              Cómo llegar
            </a>
          </div>
        </div>

        <p className="mt-10 inline-block rounded-md border border-dashed border-cobalto/40 px-3 py-2 font-sans text-sm text-cobalto">
          Ficha completa en construcción (B13): galería, especialidades y
          reserva directa.
        </p>
      </Container>
    </Section>
  );
}
