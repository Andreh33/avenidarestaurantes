"use client";

import { useEffect, useState } from "react";
import type { Restaurante } from "@/content/schemas";
import { momentoEnMadrid, NOMBRE_DIA, type DiaIso } from "@/lib/horarios";
import { cn } from "@/lib/cn";

/**
 * Horarios de la semana con el día de hoy resaltado (§10). El resaltado se
 * calcula SOLO en cliente (TZ Europe/Madrid, §16.8); el SSR pinta la lista.
 */
export function HorariosSemana({ restaurante }: { restaurante: Restaurante }) {
  const [hoy, setHoy] = useState<DiaIso | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setHoy(momentoEnMadrid(new Date()).dia),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div>
      <ul className="divide-y divide-tinta/10 font-sans text-sm">
        {([1, 2, 3, 4, 5, 6, 7] as const).map((dia) => {
          const tramos = restaurante.horarios[dia];
          const esHoy = hoy === dia;
          return (
            <li
              key={dia}
              className={cn(
                "flex items-baseline justify-between gap-6 py-2",
                esHoy && "font-semibold text-cobalto",
              )}
            >
              <span className="capitalize">
                {NOMBRE_DIA[dia]}
                {esHoy && <span className="ml-2 text-xs">· hoy</span>}
              </span>
              <span className="tabular-nums">
                {tramos.length === 0
                  ? "Cerrado"
                  : tramos
                      .map((t) =>
                        t.cierra === "00:00"
                          ? `${t.abre} – 00:00`
                          : `${t.abre} – ${t.cierra}`,
                      )
                      .join(" · ")}
              </span>
            </li>
          );
        })}
      </ul>
      {!restaurante.horariosConfirmados && (
        <p className="mt-2 font-sans text-xs text-tinta/50">
          Horario de la web anterior, pendiente de confirmar.
        </p>
      )}
    </div>
  );
}
