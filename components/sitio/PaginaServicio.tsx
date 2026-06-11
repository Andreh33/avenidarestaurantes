import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Aparece } from "@/components/motion/Aparece";
import { TelCopiable } from "@/components/ui/TelCopiable";
import { BarraReservaMovil } from "@/components/sitio/BarraReservaMovil";
import { restaurantes } from "@/content/restaurantes";
import type { Servicio } from "@/content/schemas";

/**
 * Plantilla de página de servicio (§12.2): copy real, cómo se pide
 * (teléfono + mensaje sugerido para decirlo de un tirón) y extras del
 * servicio. Sin foto digna no hay foto (Ley 4).
 */
export function PaginaServicio({
  servicio,
  mensajeSugerido,
  children,
}: {
  servicio: Servicio;
  mensajeSugerido: string;
  children?: ReactNode;
}) {
  const centro = restaurantes[0];

  return (
    <>
      <Section>
        <Container className="max-w-4xl">
          <p className="text-eyebrow font-sans text-vermut uppercase">
            {servicio.nombre}
          </p>
          <h1 className="text-titular font-display mt-3">{servicio.nombre}</h1>
          <p className="text-lead mt-5 max-w-2xl text-tinta/80">
            {servicio.copy}
          </p>

          <Aparece className="mt-12 space-y-10">
            {children}

            <div
              data-aparece
              className="rounded-(--radius-card) border border-tinta/10 bg-tiza p-7 shadow-card sm:p-9"
            >
              <h2 className="text-rotulo font-display text-tinta">
                Cómo se pide
              </h2>
              <p className="mt-2 font-sans text-base text-tinta/65">
                Una llamada y listo. Si no sabes por dónde empezar, di esto:
              </p>
              <p className="mt-4 rounded-md border border-dashed border-cobalto/35 bg-hueso px-4 py-3 font-serif text-lg italic text-tinta/85">
                “{mensajeSugerido}”
              </p>
              <div className="mt-5 text-xl text-cobalto">
                <TelCopiable telefono={centro.telefonos[0]} />
              </div>
            </div>
          </Aparece>
        </Container>
      </Section>
      <BarraReservaMovil restaurante={centro} />
    </>
  );
}
