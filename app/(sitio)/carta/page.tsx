import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { platos, productosDespensa } from "@/content/carta";
import { restaurantes } from "@/content/restaurantes";
import { Aparece } from "@/components/motion/Aparece";
import { TelCopiable } from "@/components/ui/TelCopiable";
import { BarraReservaMovil } from "@/components/sitio/BarraReservaMovil";

export const metadata: Metadata = {
  title: "La carta · Restaurantes Avenida — Getafe",
  description:
    "Tapas, raciones y cocina casera en Getafe: la carta de Restaurantes Avenida, con producto de despensa seria. Consúltanos por alérgenos.",
  alternates: { canonical: "/carta" },
};

/**
 * /carta (§11): sin cartas reales todavía (P2, Ley 1) la página se compone
 * tipográficamente con la despensa real + nota de alérgenos. Cuando
 * content/carta.ts tenga platos, aquí se montan las categorías con anclas,
 * precios en tabular y filtro por local con Flip (B14 completo).
 * Print stylesheet global: esta página imprime limpia en A4 (§15.34).
 */
export default function PaginaCarta() {
  const centro = restaurantes[0];

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <p className="text-eyebrow font-sans text-vermut uppercase">
            La carta
          </p>
          <h1 className="text-titular font-display mt-3">
            Cocina casera, precios de barrio
          </h1>

          {platos.length === 0 ? (
            <Aparece className="mt-10 space-y-10">
              <div data-aparece>
                <p className="font-serif text-2xl italic text-tinta/85 sm:text-3xl">
                  La carta completa, con sus precios de verdad, está ahora
                  mismo pasándose a limpio.
                </p>
                <p className="mt-4 max-w-2xl font-sans text-base text-tinta/65">
                  No vamos a enseñarte platos con precios inventados. Lo que
                  sí podemos enseñarte ya es la despensa de la que sale todo:
                </p>
              </div>

              <ul data-aparece className="space-y-1">
                {productosDespensa.map((p) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-3 border-b border-tinta/10 py-4"
                  >
                    <span className="font-serif text-xl italic text-tinta sm:text-2xl">
                      {p}
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

              <div data-aparece className="rounded-(--radius-card) border border-tinta/10 bg-tiza p-6 shadow-card">
                <p className="font-sans text-base font-semibold text-tinta">
                  ¿Hoy qué hay?
                </p>
                <p className="mt-1 font-sans text-sm text-tinta/65">
                  Te lo cantamos por teléfono — menú del día, raciones y lo
                  que haya salido del horno.
                </p>
                <div className="mt-4 text-xl text-cobalto">
                  <TelCopiable telefono={centro.telefonos[0]} />
                </div>
              </div>

              <p data-aparece className="font-sans text-sm text-tinta/55">
                Consúltanos por alérgenos: te lo contamos plato a plato en el
                local o por teléfono.
              </p>
            </Aparece>
          ) : null /* Categorías + precios en tabular + Flip por local (cuando llegue P2) */}
        </Container>
      </Section>
      <BarraReservaMovil restaurante={centro} />
    </>
  );
}
