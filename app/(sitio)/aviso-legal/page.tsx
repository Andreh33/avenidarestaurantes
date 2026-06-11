import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { grupo } from "@/content/grupo";

export const metadata: Metadata = {
  title: "Aviso legal · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

const PENDIENTE_LEGAL =
  "[PENDIENTE P11: razón social, NIF/CIF y dirección fiscal del titular]";

export default function PaginaAvisoLegal() {
  return (
    <Section>
      <Container className="prose-avenida max-w-3xl">
        <h1 className="text-titular font-display">Aviso legal</h1>

        <h2>Titular del sitio web</h2>
        <p>
          Este sitio web es titularidad de {PENDIENTE_LEGAL}, con
          establecimientos abiertos al público en C. Toledo, 15, bajo y
          C. Hospital de San José, 67 — 28901 Getafe (Madrid). Contacto:{" "}
          <a href={`mailto:${grupo.email}`}>{grupo.email}</a>.
        </p>

        <h2>Condiciones de uso</h2>
        <p>
          El acceso a esta web es gratuito y no exige registro. Los contenidos
          (textos, identidad visual y sistema de placas) pertenecen a su
          titular o cuentan con autorización de uso; no está permitida su
          reproducción con fines comerciales sin permiso.
        </p>

        <h2>Reservas</h2>
        <p>
          Las solicitudes de reserva enviadas por la web no constituyen una
          confirmación: el restaurante confirma siempre por teléfono o
          WhatsApp.
        </p>

        <h2>Responsabilidad</h2>
        <p>
          Trabajamos para que horarios, cartas y precios publicados estén al
          día; ante cualquier discrepancia, prevalece la información del
          propio local.
        </p>

        <p className="rounded-md border border-dashed border-cobalto/40 px-3 py-2 text-sm">
          Documento provisional: se completará con los datos fiscales del
          titular antes del lanzamiento (bloquea B22).
        </p>
      </Container>
    </Section>
  );
}
