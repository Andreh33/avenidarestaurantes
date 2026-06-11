import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { grupo } from "@/content/grupo";

export const metadata: Metadata = {
  title: "Política de privacidad · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

export default function PaginaPrivacidad() {
  return (
    <Section>
      <Container className="prose-avenida max-w-3xl">
        <h1 className="text-titular font-display">Política de privacidad</h1>

        <h2>Responsable del tratamiento</h2>
        <p>
          [PENDIENTE P11: razón social, NIF/CIF y dirección fiscal del
          titular]. Contacto:{" "}
          <a href={`mailto:${grupo.email}`}>{grupo.email}</a>.
        </p>

        <h2>Qué datos tratamos y para qué</h2>
        <p>
          Solo los que tú nos das al pedir una reserva: nombre, teléfono,
          fecha, hora y número de comensales. Se usan exclusivamente para
          gestionar tu reserva y confirmártela. No hay registro de usuarios,
          ni newsletters, ni cesión a terceros.
        </p>

        <h2>Analítica sin cookies</h2>
        <p>
          Usamos Vercel Analytics y Speed Insights, que miden visitas y
          rendimiento de forma agregada y sin cookies ni identificadores
          personales.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes ejercer los derechos de acceso, rectificación, supresión,
          oposición, limitación y portabilidad escribiendo a{" "}
          <a href={`mailto:${grupo.email}`}>{grupo.email}</a>. También puedes
          reclamar ante la AEPD (aepd.es).
        </p>

        <p className="rounded-md border border-dashed border-cobalto/40 px-3 py-2 text-sm">
          Documento provisional: se completará con los datos del responsable
          antes del lanzamiento (bloquea B22).
        </p>
      </Container>
    </Section>
  );
}
