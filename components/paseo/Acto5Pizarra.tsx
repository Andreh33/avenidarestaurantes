import { menuDelDia } from "@/content/menu-del-dia";
import { restaurantes } from "@/content/restaurantes";
import { Container } from "@/components/ui/Container";
import { Aparece } from "@/components/motion/Aparece";
import { ButtonLink } from "@/components/ui/Button";
import { IconoTelefono } from "@/components/ui/iconos";

/**
 * ACTO V · La pizarra (§9): el menú del día sobre pizarra. Sin dato real
 * todavía (P3, Ley 1): la pizarra existe con su estructura y lo dice claro
 * — el precio se canta en barra. Cuando content/menu-del-dia.ts tenga el
 * menú real, esta misma pizarra lo pinta con precio en tabular y
 * «actualizado el {fecha}» (§15.33).
 */
export function Acto5Pizarra() {
  const telCentro = restaurantes[0].telefonos.find((t) => t.confirmado);

  return (
    <section aria-label="El menú del día" className="py-[clamp(3rem,7vw,5rem)]">
      <Container>
        <Aparece>
          <div
            data-aparece
            className="relative overflow-hidden rounded-(--radius-card) bg-noche px-7 py-12 text-tiza shadow-card sm:px-12"
          >
            {/* Textura de pizarra: grain sutil, solo aquí (§5.3) */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
            >
              <filter id="chalk-pizarra">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="3"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#chalk-pizarra)" />
            </svg>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-eyebrow font-sans text-tungsteno uppercase">
                  La pizarra
                </p>
                <h2 className="text-titular font-display mt-3">
                  El menú del día
                </h2>

                {menuDelDia ? (
                  <div className="mt-8 grid gap-8 sm:grid-cols-3">
                    {(
                      [
                        ["Primeros", menuDelDia.estructura.primeros],
                        ["Segundos", menuDelDia.estructura.segundos],
                        ["Postre", menuDelDia.estructura.postre],
                      ] as const
                    ).map(([titulo, lista]) => (
                      <div key={titulo}>
                        <h3 className="text-eyebrow font-sans text-tiza/60 uppercase">
                          {titulo}
                        </h3>
                        <ul className="mt-3 space-y-2 font-serif text-lg italic">
                          {lista.map((plato) => (
                            <li key={plato}>{plato}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-7 max-w-xl">
                    <p className="font-serif text-2xl italic text-tiza/90 sm:text-3xl">
                      Se escribe cada mañana, con lo que trae el mercado.
                    </p>
                    <p className="mt-4 font-sans text-base text-tiza/65">
                      Primeros, segundos y postre de cocina casera. El menú y
                      su precio se cantan en barra mientras terminamos de
                      pasarlos a la web.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                {menuDelDia ? (
                  <>
                    <p className="font-display text-6xl font-extrabold text-tungsteno tabular-nums">
                      {(menuDelDia.precio / 100).toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      €
                    </p>
                    <p className="font-sans text-xs text-tiza/55">
                      {menuDelDia.diasServicio} · Carta actualizada el{" "}
                      {menuDelDia.actualizadoEl}
                    </p>
                  </>
                ) : (
                  <>
                    {telCentro && (
                      <a
                        href={`tel:${telCentro.numero}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-vermut px-6 py-3 font-sans text-sm font-semibold text-tiza shadow-flotante transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]"
                      >
                        <IconoTelefono />
                        Pregunta el de hoy: {telCentro.visible}
                      </a>
                    )}
                    <ButtonLink
                      href="/menu-del-dia"
                      variante="fantasma"
                      className="border-tiza/30 text-tiza hover:border-tiza/60"
                    >
                      Ver la pizarra
                    </ButtonLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </Aparece>
      </Container>
    </section>
  );
}
