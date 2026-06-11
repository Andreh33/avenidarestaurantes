import { platos, productosDespensa } from "@/content/carta";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ButtonLink } from "@/components/ui/Button";

/**
 * ACTO IV · La Barra (§9): grid editorial de platos firma + marquee de
 * raciones. Sin cartas reales todavía (P2, Ley 1): el acto se compone con
 * lo único real que hay — el producto de despensa que el propio cliente
 * citaba en su web — y un estado vacío con dirección (§15.38). Cuando
 * `content/carta.ts` tenga platos, el grid sustituye a la despensa (B14).
 */
export function Acto4Barra() {
  return (
    <section aria-label="La barra" className="py-[clamp(4rem,9vw,7rem)]">
      <Container>
        <p className="text-eyebrow font-sans text-vermut uppercase">
          La barra
        </p>
        <SplitHeading
          as="h2"
          className="text-titular font-display mt-4 text-tinta"
        >
          Lo que pasa por la barra
        </SplitHeading>
      </Container>

      {/* Marquee de despensa real, a sangre completa */}
      <div className="mt-10 border-y border-tinta/10 py-5 text-tinta/55">
        <Marquee items={productosDespensa} />
      </div>
      <p className="sr-only">
        De nuestra despensa: {productosDespensa.join(", ")}.
      </p>

      <Container className="mt-14">
        {platos.length === 0 ? (
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* La despensa, compuesta como pizarra tipográfica */}
            <ul className="space-y-1">
              {productosDespensa.map((producto) => (
                <li
                  key={producto}
                  className="flex items-baseline gap-3 border-b border-tinta/10 py-4"
                >
                  <span className="font-serif text-xl italic text-tinta sm:text-2xl">
                    {producto}
                  </span>
                  <span
                    aria-hidden="true"
                    className="min-w-8 flex-1 border-b border-dotted border-tinta/25"
                  />
                  <span className="font-sans text-sm text-tinta/55 tabular-nums">
                    en barra
                  </span>
                </li>
              ))}
            </ul>

            {/* Estado vacío con dirección (§15.38) */}
            <div className="max-w-md">
              <p className="font-serif text-2xl italic text-tinta/85 sm:text-3xl">
                Los precios, de momento, en la pizarra de la barra.
              </p>
              <p className="mt-4 font-sans text-base text-tinta/65">
                Estamos pasando la carta completa a la web, plato a plato y
                con sus precios de verdad. Mientras tanto, en el local te la
                cantamos de memoria.
              </p>
              <ButtonLink href="/carta" variante="fantasma" className="mt-7">
                Ver la carta
              </ButtonLink>
            </div>
          </div>
        ) : null /* El grid de platos firma llega con la carta real (B14) */}
      </Container>
    </section>
  );
}
