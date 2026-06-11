/**
 * B0 — «Próximamente» digno. Placa estática del grupo (versión sobria,
 * ver docs/DECISIONES.md D-003) + datos verificados de §2 del prompt maestro.
 * El sistema de placas definitivo (craquelado, Flip, variantes) llega en B1/B5.
 */

function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
    >
      <filter id="grain-esmalte">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-esmalte)" />
    </svg>
  );
}

function PlacaProximamente() {
  return (
    <div className="anim-placa relative w-[min(88vw,26rem)] overflow-hidden rounded-xl bg-gradient-to-br from-tiza to-hueso shadow-[0_24px_60px_-24px_rgba(22,33,58,0.35)]">
      {/* Cenefa exterior + filete interior, como las placas de calle de Madrid */}
      <div className="m-2.5 rounded-lg border-[5px] border-cobalto">
        <div className="m-1 rounded-md border border-cobalto/60 px-6 py-10 text-center sm:px-10">
          <p className="font-sans text-[0.7rem] font-semibold tracking-[0.35em] text-cobalto">
            RESTAURANTES
          </p>
          <p className="font-display mt-2 text-[clamp(2.6rem,12vw,4.2rem)] font-extrabold leading-none tracking-tight text-cobalto">
            AVENIDA
          </p>
          <p className="mt-3 font-sans text-[0.7rem] font-semibold tracking-[0.45em] text-cobalto/80">
            GETAFE
          </p>
        </div>
      </div>

      <GrainOverlay />

      {/* Brillo especular: barre la placa una vez al cargar */}
      <div
        aria-hidden="true"
        className="anim-brillo pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-tiza/60 to-transparent"
      />
    </div>
  );
}

export default function Home() {
  return (
    <main id="contenido" className="grid min-h-svh place-items-center px-6 py-12">
      <div className="flex flex-col items-center text-center">
        <PlacaProximamente />

        <p
          className="anim-texto mt-10 font-serif text-2xl italic text-tinta sm:text-3xl"
          style={{ animationDelay: "0.35s" }}
        >
          Calidad al mejor precio
        </p>

        <p
          className="anim-texto mt-3 max-w-md font-sans text-sm text-tinta/70 sm:text-base"
          style={{ animationDelay: "0.5s" }}
        >
          Estamos preparando nuestra nueva web. Mientras tanto, nos tienes
          donde siempre.
        </p>

        <address
          className="anim-texto mt-10 space-y-2 font-sans text-sm not-italic text-tinta/80"
          style={{ animationDelay: "0.65s" }}
        >
          <p>
            <span className="font-semibold text-tinta">Getafe Centro</span> ·
            C. Toledo, 15 ·{" "}
            <a
              href="tel:+34916826667"
              className="font-medium text-cobalto underline decoration-cobalto/40 underline-offset-4 transition-colors hover:decoration-cobalto"
            >
              916 82 66 67
            </a>
          </p>
          <p>
            <span className="font-semibold text-tinta">Avenida Lavadero</span>{" "}
            · C. Hospital de San José, 67
          </p>
          <p>
            <a
              href="mailto:info@restaurantesavenida.com"
              className="font-medium text-cobalto underline decoration-cobalto/40 underline-offset-4 transition-colors hover:decoration-cobalto"
            >
              info@restaurantesavenida.com
            </a>
          </p>
        </address>
      </div>
    </main>
  );
}
