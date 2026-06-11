import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Política de cookies · Restaurantes Avenida — Getafe",
  robots: { index: false },
};

export default function PaginaCookies() {
  return (
    <Section>
      <Container className="prose-avenida max-w-3xl">
        <h1 className="text-titular font-display">Política de cookies</h1>

        <h2>La versión corta: no usamos cookies de seguimiento</h2>
        <p>
          Esta web no instala cookies de publicidad, ni de analítica con
          identificadores, ni de terceros. Por eso no te hemos enseñado
          ningún banner.
        </p>

        <h2>Lo que sí hay</h2>
        <p>
          <strong>sessionStorage técnico:</strong> recordamos durante tu
          visita que ya has visto la animación de bienvenida, para no
          repetírtela en cada página. Se borra al cerrar la pestaña y no te
          identifica.
        </p>
        <p>
          <strong>Analítica sin cookies:</strong> Vercel Analytics y Speed
          Insights miden visitas y velocidad de forma agregada y anónima, sin
          almacenar nada en tu dispositivo.
        </p>

        <h2>¿Y si esto cambia?</h2>
        <p>
          Si algún día incorporamos cookies que lo requieran, esta página se
          actualizará y te pediremos consentimiento antes, como manda la ley.
        </p>
      </Container>
    </Section>
  );
}
