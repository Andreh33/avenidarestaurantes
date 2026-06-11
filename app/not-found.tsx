import Link from "next/link";

/** 404 «CALLE SIN SALIDA» (§15.22): placa + tres salidas útiles. */
export default function NoEncontrada() {
  return (
    <main className="grid min-h-svh place-items-center bg-hueso px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="w-[min(86vw,24rem)] overflow-hidden rounded-(--radius-placa) bg-gradient-to-br from-tiza to-hueso shadow-placa">
          <div className="m-2.5 rounded-lg border-[5px] border-vermut">
            <div className="m-1 rounded-md border border-vermut/60 px-6 py-9 text-center">
              <p className="text-eyebrow font-sans text-vermut">ERROR 404</p>
              <p className="font-display mt-2 text-[clamp(1.7rem,7vw,2.6rem)] leading-none font-extrabold tracking-tight text-vermut">
                CALLE SIN SALIDA
              </p>
              <p className="text-eyebrow mt-3 font-sans tracking-[0.45em] text-vermut/80">
                GETAFE
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-md font-serif text-xl italic text-tinta/80">
          Esta bocacalle no lleva a ningún sitio — pero la Avenida sigue
          abierta.
        </p>

        <nav aria-label="Salidas útiles" className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link href="/" className="enlace font-sans font-semibold text-cobalto">
            Volver al paseo
          </Link>
          <Link href="/carta" className="enlace font-sans font-semibold text-cobalto">
            Ver la carta
          </Link>
          <Link href="/reservas" className="enlace font-sans font-semibold text-vermut">
            Reservar mesa
          </Link>
        </nav>
      </div>
    </main>
  );
}
