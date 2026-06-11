import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { restaurantes, restaurantePorSlug } from "@/content/restaurantes";
import { PlacaAzulejo } from "@/components/placas/PlacaAzulejo";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { TelCopiable } from "@/components/ui/TelCopiable";
import { HorariosSemana } from "@/components/ui/HorariosSemana";
import { BarraReservaMovil } from "@/components/sitio/BarraReservaMovil";
import { Aparece } from "@/components/motion/Aparece";
import { ButtonLink } from "@/components/ui/Button";
import { urlComoLlegar, urlResenas } from "@/lib/maps";
import { breadcrumbJsonLd, restaurantJsonLd } from "@/lib/seo";
import {
  IconoFlechaEnlace,
  IconoMapa,
  IconoReloj,
} from "@/components/ui/iconos";

/**
 * Plantilla de restaurante (§10): placa, NAP completo con horarios y hoy
 * resaltado, estado vivo, eventos del local y barra sticky móvil.
 * Galería y especialidades llegan con las fotos (P7/B2) y la carta (P2).
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
    description: `${r.descripcionCorta} ${r.direccion.calle}, ${r.direccion.ciudad}. Reserva tu mesa.`,
    alternates: { canonical: `/restaurantes/${r.slug}` },
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

  const esLavadero = r.slug === "lavadero";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            restaurantJsonLd(r),
            breadcrumbJsonLd([
              { nombre: "Inicio", ruta: "/" },
              { nombre: r.nombre, ruta: `/restaurantes/${r.slug}` },
            ]),
          ]),
        }}
      />

      <Section className="pb-10">
        <Container>
          <Aparece className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div data-aparece>
              <PlacaAzulejo
                eyebrow={r.placa.eyebrow}
                texto={r.placa.texto}
                pie={r.placa.pie}
                matiz={r.placa.matiz}
                className="max-w-sm"
              />
            </div>
            <div data-aparece>
              <h1 className="text-titular font-display text-tinta">
                {r.nombre}
              </h1>
              <EstadoVivo restaurante={r} className="mt-3 text-tinta/80" />
              <p className="text-lead mt-5 max-w-xl text-tinta/75">
                {r.descripcionLarga}
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <ButtonLink href="/reservas" variante="vermut">
                  Reservar mesa
                </ButtonLink>
                <ButtonLink href="/carta" variante="fantasma">
                  Ver la carta
                </ButtonLink>
              </div>
            </div>
          </Aparece>
        </Container>
      </Section>

      {/* Franja NAP */}
      <section
        aria-label="Dónde estamos y cuándo abrimos"
        className="border-y border-tinta/10 bg-tiza/60 py-12"
      >
        <Container>
          <Aparece className="grid gap-10 md:grid-cols-3" stagger={0.1}>
            <div data-aparece>
              <h2 className="text-eyebrow font-sans text-cobalto uppercase">
                Dirección
              </h2>
              <address className="mt-3 font-sans text-base not-italic text-tinta/85">
                {r.direccion.calle}
                <br />
                {r.direccion.cp} {r.direccion.ciudad}
              </address>
              <a
                href={urlComoLlegar(r)}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace mt-3 inline-flex items-center gap-2 font-sans text-sm font-semibold text-cobalto"
              >
                <IconoMapa />
                Cómo llegar
              </a>
            </div>
            <div data-aparece>
              <h2 className="text-eyebrow font-sans text-cobalto uppercase">
                Teléfono
              </h2>
              <div className="mt-3 space-y-2 text-lg text-cobalto">
                {r.telefonos.map((t) => (
                  <div key={t.numero} className="text-tinta">
                    <TelCopiable telefono={t} />
                  </div>
                ))}
              </div>
            </div>
            <div data-aparece>
              <h2 className="text-eyebrow inline-flex items-center gap-2 font-sans text-cobalto uppercase">
                <IconoReloj />
                Horario
              </h2>
              <div className="mt-3">
                <HorariosSemana restaurante={r} />
              </div>
            </div>
          </Aparece>
        </Container>
      </section>

      {/* Sala privada (dato real del Lavadero) */}
      {esLavadero && (
        <Section className="py-14">
          <Container>
            <Aparece>
              <div
                data-aparece
                className="rounded-(--radius-card) border border-aceituna/25 bg-tiza p-8 shadow-card sm:p-10"
              >
                <p className="text-eyebrow font-sans text-aceituna uppercase">
                  Para celebraciones
                </p>
                <h2 className="text-rotulo font-display mt-3 text-tinta">
                  Sala privada en la planta de arriba
                </h2>
                <p className="mt-3 max-w-xl font-sans text-base text-tinta/70">
                  Cumpleaños, comidas de empresa y días grandes con la sala
                  para vosotros. El aforo exacto te lo contamos por teléfono
                  mientras lo subimos a la web.
                </p>
                <ButtonLink href="/eventos" variante="cobalto" className="mt-6">
                  Eventos y celebraciones
                </ButtonLink>
              </div>
            </Aparece>
          </Container>
        </Section>
      )}

      {/* Galería: estado vacío honesto hasta B2 (P7) */}
      <Section className="py-14">
        <Container>
          <Aparece>
            <div data-aparece>
              <h2 className="text-eyebrow font-sans text-cobalto uppercase">
                La casa
              </h2>
              <p className="mt-4 max-w-xl font-serif text-2xl italic text-tinta/80">
                Las fotos del local están de camino. Mientras tanto, lo mejor
                es verlo en persona — pásate y haz tú la primera.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <a
                  href={urlResenas(r)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace inline-flex items-center gap-2 font-sans text-sm font-medium text-cobalto"
                >
                  Léenos en Google Maps
                  <IconoFlechaEnlace />
                </a>
              </div>
            </div>
          </Aparece>
        </Container>
      </Section>

      <BarraReservaMovil restaurante={r} />
    </>
  );
}
