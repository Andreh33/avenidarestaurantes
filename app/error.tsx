"use client";

/** Error global con el tono de la casa (§15.23). */
export default function ErrorGlobal({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-svh place-items-center bg-hueso px-6 py-16">
      <div className="max-w-md text-center">
        <p className="text-eyebrow font-sans text-vermut uppercase">
          Vaya por Dios
        </p>
        <h1 className="text-titular font-display mt-3 text-tinta">
          Se nos ha caído una bandeja
        </h1>
        <p className="mt-4 font-serif text-xl italic text-tinta/75">
          Nada roto que no se arregle volviendo a intentarlo.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-11 items-center rounded-[10px] bg-cobalto px-6 py-3 font-sans text-sm font-semibold text-tiza shadow-flotante transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}
