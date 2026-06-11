import Link from "next/link";
import type { Restaurante } from "@/content/schemas";
import { PlacaAzulejo } from "@/components/placas/PlacaAzulejo";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { IconoFlechaEnlace, IconoMapa } from "@/components/ui/iconos";
import { cn } from "@/lib/cn";

/**
 * Fachada-card del Acto III (§9): cada local como un portal de la calle.
 * Sin fotos hasta B2 (Ley 4): toldo a rayas, placa azulejo, número de
 * portal gigante y tipografía. El hueco de la foto real ya está previsto
 * en la composición (la columna izquierda pasará a ser imagen).
 */
export function FachadaCard({ restaurante }: { restaurante: Restaurante }) {
  const r = restaurante;
  const esCobalto = r.placa.matiz === "cobalto";
  const numeroPortal = r.direccion.calle.match(/\d+/)?.[0] ?? "";

  return (
    <article
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-(--radius-card) border bg-gradient-to-br from-tiza to-hueso shadow-card",
        esCobalto ? "border-cobalto/15" : "border-aceituna/20",
      )}
    >
      {/* Toldo del bar */}
      <div
        aria-hidden="true"
        className={cn(
          "h-3 w-full shrink-0",
          esCobalto
            ? "bg-[repeating-linear-gradient(90deg,var(--color-cobalto)_0_20px,transparent_20px_40px)]"
            : "bg-[repeating-linear-gradient(90deg,var(--color-aceituna)_0_20px,transparent_20px_40px)]",
        )}
      />

      <div className="relative flex flex-1 flex-col justify-between gap-8 p-7 sm:p-10">
        {/* Nº de portal gigante */}
        <span
          aria-hidden="true"
          className={cn(
            "font-display pointer-events-none absolute -right-2 bottom-0 leading-none font-extrabold tracking-tighter select-none",
            "text-[clamp(7rem,26vh,15rem)]",
            esCobalto ? "text-cobalto/6" : "text-aceituna/8",
          )}
        >
          {numeroPortal}
        </span>

        <div className="relative max-w-md">
          <PlacaAzulejo
            eyebrow={r.placa.eyebrow}
            texto={r.placa.texto}
            pie={r.placa.pie}
            matiz={r.placa.matiz}
            className="max-w-[15rem] sm:max-w-[17rem]"
          />
          <p className="mt-6 font-serif text-xl italic text-tinta/85 sm:text-2xl">
            {r.descripcionCorta}
          </p>
        </div>

        <div className="relative space-y-3">
          <div>
            <p className="inline-flex items-center gap-2 font-sans text-sm text-tinta/70">
              <IconoMapa
                className={esCobalto ? "text-cobalto" : "text-aceituna"}
              />
              {r.direccion.calle} · {r.direccion.ciudad}
            </p>
          </div>
          <div>
            <EstadoVivo restaurante={r} className="text-tinta/80" />
          </div>
          <div>
            <Link
              href={`/restaurantes/${r.slug}`}
              className={cn(
                "enlace mt-1 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold",
                esCobalto ? "text-cobalto" : "text-aceituna",
              )}
            >
              Conoce el local
              <IconoFlechaEnlace />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
