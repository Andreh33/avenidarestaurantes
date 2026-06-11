import { testimoniosPublicables } from "@/content/testimonios";
import { restaurantes } from "@/content/restaurantes";
import { urlResenas } from "@/lib/maps";
import { Container } from "@/components/ui/Container";
import { Aparece } from "@/components/motion/Aparece";
import { IconoFlechaEnlace } from "@/components/ui/iconos";
import { cn } from "@/lib/cn";

/**
 * ACTO VII · Lo que dice Getafe (§9): testimonios reales APROBADOS en
 * cards-posavasos (±1.5°, se enderezan al hover). Mientras el cliente no
 * dé el OK (P8), solo se muestra el enlace discreto a Google Maps — sin
 * notas agregadas (§2.6) y sin inventar nada (Ley 1).
 */
export function Acto7Voces() {
  const hayTestimonios = testimoniosPublicables.length > 0;

  return (
    <section
      aria-label="Lo que dice Getafe"
      className="py-[clamp(3rem,7vw,5.5rem)]"
    >
      <Container>
        <p className="text-eyebrow font-sans text-vermut uppercase">
          Lo que dice Getafe
        </p>

        {hayTestimonios ? (
          <Aparece
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.12}
          >
            {testimoniosPublicables.map((t, i) => (
              <figure
                key={t.autor}
                data-aparece
                className={cn(
                  "rounded-(--radius-card) border border-tinta/10 bg-tiza p-7 shadow-card transition-transform duration-300 ease-(--ease-esmalte) hover:rotate-0",
                  i % 2 === 0 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]",
                )}
              >
                <blockquote className="font-serif text-lg italic text-tinta/90">
                  “{t.texto}”
                </blockquote>
                <figcaption className="mt-4 font-sans text-sm">
                  <span className="font-semibold text-tinta">{t.autor}</span>
                  <span className="text-tinta/55"> · {t.fuente}</span>
                </figcaption>
              </figure>
            ))}
          </Aparece>
        ) : (
          <Aparece className="mt-6">
            <p data-aparece className="max-w-2xl font-serif text-2xl italic text-tinta/85 sm:text-3xl">
              Las opiniones, mejor de viva voz: léelas donde las escribió la
              gente.
            </p>
          </Aparece>
        )}

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {restaurantes
            .filter((r) => r.placeId)
            .map((r) => (
              <a
                key={r.slug}
                href={urlResenas(r)}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace inline-flex items-center gap-2 font-sans text-sm font-medium text-cobalto"
              >
                Léenos en Google Maps · {r.nombreCorto}
                <IconoFlechaEnlace />
              </a>
            ))}
        </div>
      </Container>
    </section>
  );
}
