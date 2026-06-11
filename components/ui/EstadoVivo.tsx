"use client";

import { useEffect, useState } from "react";
import type { Restaurante } from "@/content/schemas";
import { estadoLocal, NOMBRE_DIA, type EstadoLocal } from "@/lib/horarios";
import { cn } from "@/lib/cn";

/**
 * Píldora de estado vivo (§15.10): «● Abierto · hasta las 00:00»,
 * «Cierra pronto» o «Cerrado · abre el sábado a las 9:00».
 *
 * §16.8: el estado se calcula SOLO en cliente tras montar (TZ Europe/Madrid);
 * el SSR pinta un neutro sin hora. aria-live="polite" + tick por minuto.
 */
export function EstadoVivo({
  restaurante,
  className,
}: {
  restaurante: Restaurante;
  className?: string;
}) {
  const [estado, setEstado] = useState<EstadoLocal | null>(null);

  useEffect(() => {
    if (!restaurante.horarios) return;
    const calcular = () =>
      setEstado(estadoLocal(restaurante.horarios!, new Date()));
    const raf = requestAnimationFrame(calcular);
    const intervalo = setInterval(calcular, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(intervalo);
    };
  }, [restaurante]);

  // Horario aún desconocido (Ley 1): se dice claro, sin inventar estado
  if (!restaurante.horarios) {
    return (
      <p
        className={cn(
          "inline-flex items-center gap-2 font-sans text-sm",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-current opacity-30"
        />
        <span>Horario por confirmar</span>
      </p>
    );
  }

  let texto = "Consulta horarios";
  let tono: "abierto" | "pronto" | "cerrado" | "neutro" = "neutro";

  if (estado?.abierto) {
    const hasta = estado.cierraA === "00:00" ? "medianoche" : `las ${estado.cierraA}`;
    if (estado.cierraPronto) {
      texto = `Cierra pronto · hasta ${hasta}`;
      tono = "pronto";
    } else {
      texto = `Abierto ahora · hasta ${hasta}`;
      tono = "abierto";
    }
  } else if (estado && !estado.abierto) {
    const p = estado.proximaApertura;
    if (p) {
      const cuando = p.esHoy
        ? `hoy a las ${p.hora}`
        : p.esManana
          ? `mañana a las ${p.hora}`
          : `el ${NOMBRE_DIA[p.dia]} a las ${p.hora}`;
      texto = `Cerrado · abre ${cuando}`;
    } else {
      texto = "Cerrado temporalmente";
    }
    tono = "cerrado";
  }

  return (
    <p
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 font-sans text-sm tabular-nums",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-2 w-2 rounded-full transition-colors duration-300",
          tono === "abierto" && "bg-aceituna",
          tono === "pronto" && "bg-tungsteno",
          tono === "cerrado" && "bg-vermut",
          tono === "neutro" && "bg-current opacity-30",
        )}
      />
      <span>{texto}</span>
      {!restaurante.horariosConfirmados && estado && (
        <span className="opacity-60">· horario por confirmar</span>
      )}
    </p>
  );
}
