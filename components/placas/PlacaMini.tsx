import { cn } from "@/lib/cn";

/**
 * Versión compacta de la placa para el header y el footer:
 * cenefa simple + AVENIDA en display. Hereda color por contexto
 * (cobalto sobre claro, tiza/tungsteno sobre noche).
 */
export function PlacaMini({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center rounded-md border-2 border-current px-3 py-1.5 leading-none",
        className,
      )}
    >
      <span className="font-sans text-[0.45rem] font-semibold tracking-[0.32em]">
        RESTAURANTES
      </span>
      <span className="font-display mt-0.5 text-lg font-extrabold tracking-tight">
        AVENIDA
      </span>
    </span>
  );
}
