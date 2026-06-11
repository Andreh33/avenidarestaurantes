import Link from "next/link";
import { servicios } from "@/content/servicios";
import { Container } from "@/components/ui/Container";
import { Aparece } from "@/components/motion/Aparece";
import { SplitHeading } from "@/components/motion/SplitHeading";
import {
  IconoCana,
  IconoFlechaEnlace,
  IconoLlama,
  IconoTenedor,
} from "@/components/ui/iconos";

const iconoPorServicio = {
  eventos: IconoCana,
  catering: IconoTenedor,
  asados: IconoLlama,
} as const;

const notaPorServicio: Record<string, string | undefined> = {
  eventos: "Sala privada en la planta de arriba del Lavadero",
};

/**
 * ACTO VI · Para tu día grande (§9): eventos, catering y asados con el
 * copy real del cliente. Sin fotos (Ley 4): tipografía + iconos propios.
 */
export function Acto6Servicios() {
  return (
    <section
      aria-label="Para tu día grande"
      className="py-[clamp(4rem,9vw,7rem)]"
    >
      <Container>
        <p className="text-eyebrow font-sans text-vermut uppercase">
          Para tu día grande
        </p>
        <SplitHeading
          as="h2"
          className="text-titular font-display mt-4 text-tinta"
        >
          También fuera de la barra
        </SplitHeading>

        <Aparece className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {servicios.map((s) => {
            const Icono = iconoPorServicio[s.slug];
            return (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                data-aparece
                className="group flex min-h-72 flex-col justify-between rounded-(--radius-card) border border-tinta/10 bg-tiza p-7 shadow-card transition-transform duration-300 ease-(--ease-esmalte) hover:-translate-y-1.5"
              >
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cobalto/25 text-2xl text-cobalto">
                    <Icono />
                  </span>
                  <h3 className="text-rotulo font-display mt-5 text-tinta">
                    {s.nombre}
                  </h3>
                  <p className="mt-3 font-sans text-base text-tinta/70">
                    {s.copy}
                  </p>
                  {notaPorServicio[s.slug] && (
                    <p className="mt-3 font-serif text-base italic text-aceituna">
                      {notaPorServicio[s.slug]}
                    </p>
                  )}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-cobalto">
                  Cuéntanos tu idea
                  <IconoFlechaEnlace className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            );
          })}
        </Aparece>
      </Container>
    </section>
  );
}
