import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { restaurantes } from "@/content/restaurantes";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { TelCopiable } from "@/components/ui/TelCopiable";
import { BuilderWhatsApp } from "@/components/reservas/BuilderWhatsApp";
import { FormularioReserva } from "@/components/reservas/FormularioReserva";
import { Aparece } from "@/components/motion/Aparece";

export const metadata: Metadata = {
  title: "Reservar mesa · Restaurantes Avenida — Getafe",
  description:
    "Reserva en Restaurantes Avenida (Getafe Centro y Lavadero): por teléfono, componiendo tu WhatsApp o con el formulario. Te confirmamos al momento.",
};

/**
 * /reservas (§12.1): tres vías por orden de fricción real —
 * 1 llamar · 2 WhatsApp con builder · 3 formulario con degradación.
 */
export default function PaginaReservas() {
  return (
    <Section>
      <Container className="max-w-5xl">
        <p className="text-eyebrow font-sans text-vermut uppercase">
          Reservar mesa
        </p>
        <h1 className="text-titular font-display mt-3">Te esperamos</h1>
        <p className="text-lead mt-4 max-w-2xl text-tinta/75">
          Como prefieras: de palabra, por WhatsApp o con el formulario. Las
          tres llegan a la misma libreta.
        </p>

        <Aparece className="mt-12 space-y-12" stagger={0.12}>
          {/* Vía 1 · Llamar */}
          <div data-aparece>
            <h2 className="text-rotulo font-display text-tinta">
              1 · De palabra, como toda la vida
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {restaurantes.map((r) => (
                <div
                  key={r.slug}
                  className="rounded-(--radius-card) border border-tinta/10 bg-tiza p-6 shadow-card"
                >
                  <h3 className="font-display text-lg font-bold">{r.nombre}</h3>
                  <p className="mt-1 font-sans text-sm text-tinta/60">
                    {r.direccion.calle}
                  </p>
                  <EstadoVivo restaurante={r} className="mt-3 text-tinta/80" />
                  <div className="mt-4 space-y-2 text-xl text-cobalto sm:text-2xl">
                    {r.telefonos.map((t) => (
                      <div key={t.numero}>
                        <TelCopiable telefono={t} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vía 2 · WhatsApp */}
          <div data-aparece className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-rotulo font-display text-tinta">
                2 · Por WhatsApp, sin escribir de más
              </h2>
              <p className="mt-3 max-w-md font-sans text-base text-tinta/70">
                Elige local, día y hora; nosotros componemos el mensaje y tú
                solo le das a enviar.
              </p>
            </div>
            <div className="rounded-(--radius-card) border border-tinta/10 bg-tiza p-6 shadow-card sm:p-8">
              <BuilderWhatsApp />
            </div>
          </div>

          {/* Vía 3 · Formulario */}
          <div data-aparece className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-rotulo font-display text-tinta">
                3 · Con el formulario
              </h2>
              <p className="mt-3 max-w-md font-sans text-base text-tinta/70">
                Déjanos los datos y te confirmamos nosotros. Sin spam, sin
                cuentas, sin líos.
              </p>
            </div>
            <div className="relative rounded-(--radius-card) border border-tinta/10 bg-tiza p-6 shadow-card sm:p-8">
              <FormularioReserva />
            </div>
          </div>
        </Aparece>
      </Container>
    </Section>
  );
}
