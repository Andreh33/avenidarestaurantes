import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { menuDelDia } from "@/content/menu-del-dia";
import { restaurantes } from "@/content/restaurantes";
import { Aparece } from "@/components/motion/Aparece";
import { TelCopiable } from "@/components/ui/TelCopiable";
import { BarraReservaMovil } from "@/components/sitio/BarraReservaMovil";

export const metadata: Metadata = {
  title: "Menú del día · Restaurantes Avenida — Getafe",
  description:
    "El menú del día de Restaurantes Avenida en Getafe: primeros, segundos y postre de cocina casera. Se escribe cada mañana con lo que trae el mercado.",
  alternates: { canonical: "/menu-del-dia" },
};

/**
 * /menu-del-dia (§11): la pizarra. Sin menú real (P3, Ley 1) la pizarra
 * lo dice claro y da el teléfono. Con dato real: estructura completa,
 * precio grande en tabular, «actualizado el {fecha}» e imprimir (§15.34).
 */
export default function PaginaMenuDelDia() {
  const centro = restaurantes[0];

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <p className="text-eyebrow font-sans text-vermut uppercase">
            El menú del día
          </p>
          <h1 className="text-titular font-display mt-3">La pizarra</h1>

          <Aparece className="mt-10">
            <div
              data-aparece
              className="relative overflow-hidden rounded-(--radius-card) bg-noche px-7 py-12 text-tiza shadow-card sm:px-12"
            >
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
              >
                <filter id="chalk-pagina">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#chalk-pagina)" />
              </svg>

              <div className="relative">
                {menuDelDia ? (
                  <>
                    <div className="grid gap-8 sm:grid-cols-3">
                      {(
                        [
                          ["Primeros", menuDelDia.estructura.primeros],
                          ["Segundos", menuDelDia.estructura.segundos],
                          ["Postre", menuDelDia.estructura.postre],
                        ] as const
                      ).map(([titulo, lista]) => (
                        <div key={titulo}>
                          <h2 className="text-eyebrow font-sans text-tiza/60 uppercase">
                            {titulo}
                          </h2>
                          <ul className="mt-3 space-y-2 font-serif text-lg italic">
                            {lista.map((plato) => (
                              <li key={plato}>{plato}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="font-display mt-10 text-5xl font-extrabold text-tungsteno tabular-nums">
                      {(menuDelDia.precio / 100).toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      €
                    </p>
                    <p className="mt-2 font-sans text-xs text-tiza/55">
                      {menuDelDia.diasServicio}
                      {menuDelDia.notas ? ` · ${menuDelDia.notas}` : ""} ·
                      Carta actualizada el {menuDelDia.actualizadoEl}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="max-w-xl font-serif text-2xl italic text-tiza/90 sm:text-3xl">
                      Hoy, como cada día, el menú se ha escrito esta mañana en
                      la pizarra del local.
                    </p>
                    <p className="mt-4 max-w-xl font-sans text-base text-tiza/65">
                      Primeros, segundos y postre de cocina casera, al precio
                      de siempre. En cuanto el menú tipo esté confirmado,
                      vivirá aquí actualizado al día.
                    </p>
                    <div className="mt-7 text-xl text-tungsteno">
                      <TelCopiable telefono={centro.telefonos[0]} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </Aparece>
        </Container>
      </Section>
      <BarraReservaMovil restaurante={centro} />
    </>
  );
}
