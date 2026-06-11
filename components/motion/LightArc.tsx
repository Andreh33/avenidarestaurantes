/**
 * Capa fija del arco de luz (§4): el cielo del Paseo. En B5 arranca en su
 * punto amanecer (tokens --light/--sky); el timeline maestro que la vira
 * de la mañana a la noche con scrub llega en B12. Solo se pintan
 * gradientes/opacidad en esta capa (Ley 7).
 */
export function LightArc() {
  return (
    <div
      aria-hidden="true"
      data-arco-luz
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "linear-gradient(180deg, var(--light) 0%, var(--sky) 48%, var(--sky) 100%)",
      }}
    />
  );
}
