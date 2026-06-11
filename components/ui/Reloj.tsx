"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const FORMATO = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * Reloj local del hero (§15.11): HH:MM de Madrid que late sutilmente
 * al cambiar de minuto. Solo cliente (§16.8): el SSR pinta el neutro.
 */
export function Reloj({ className }: { className?: string }) {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const actualizar = () => setHora(FORMATO.format(new Date()));
    actualizar();
    const intervalo = setInterval(actualizar, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <span
      // key = hora → el latido CSS se re-dispara en cada cambio de minuto
      key={hora}
      className={cn("anim-latido inline-block font-sans tabular-nums", className)}
    >
      {hora ?? "--:--"}
    </span>
  );
}
