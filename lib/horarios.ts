/**
 * Estado vivo de los locales (§7.3, §15.10): isOpenNow / nextOpening.
 *
 * Reglas de la casa:
 * - TZ SIEMPRE Europe/Madrid, no la del visitante.
 * - En componentes se calcula SOLO en cliente tras montar (§16.8):
 *   el SSR renderiza el horario estático del día. Esta lib es pura.
 * - Un tramo cuyo cierre es ≤ apertura cruza la medianoche
 *   (08:00–00:00 = cierra a las 24:00 en punto).
 */
import type { HorarioSemanal, Restaurante, Tramo } from "@/content/schemas";

const TZ = "Europe/Madrid";

/** 1 = lunes … 7 = domingo (ISO). */
export type DiaIso = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const NOMBRE_DIA: Record<DiaIso, string> = {
  1: "lunes",
  2: "martes",
  3: "miércoles",
  4: "jueves",
  5: "viernes",
  6: "sábado",
  7: "domingo",
};

const DIA_DESDE_EN: Record<string, DiaIso> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

export function momentoEnMadrid(instante: Date): {
  dia: DiaIso;
  minutos: number;
  hhmm: string;
} {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(instante);

  const valor = (tipo: string) =>
    partes.find((p) => p.type === tipo)?.value ?? "";

  const dia = DIA_DESDE_EN[valor("weekday")];
  const hora = Number(valor("hour"));
  const minuto = Number(valor("minute"));

  return {
    dia,
    minutos: hora * 60 + minuto,
    hhmm: `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`,
  };
}

function aMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Umbral de «cierra pronto» (§15.10). */
const MINUTOS_CIERRA_PRONTO = 30;

export type EstadoLocal =
  | {
      abierto: true;
      /** "00:00" significa medianoche. */
      cierraA: string;
      cierraPronto: boolean;
    }
  | {
      abierto: false;
      proximaApertura: {
        dia: DiaIso;
        hora: string;
        esHoy: boolean;
        esManana: boolean;
      } | null;
    };

function diaAnterior(dia: DiaIso): DiaIso {
  return (dia === 1 ? 7 : dia - 1) as DiaIso;
}

function diaSiguiente(dia: DiaIso): DiaIso {
  return (dia === 7 ? 1 : dia + 1) as DiaIso;
}

export function estadoLocal(
  horarios: HorarioSemanal,
  ahora: Date,
): EstadoLocal {
  const { dia, minutos } = momentoEnMadrid(ahora);

  const abiertoEn = (t: Tramo, min: number): boolean => {
    const inicio = aMinutos(t.abre);
    let fin = aMinutos(t.cierra);
    if (fin <= inicio) fin += 24 * 60; // cruza medianoche
    return min >= inicio && min < fin;
  };

  // ¿Dentro de un tramo de hoy?
  for (const t of horarios[dia]) {
    if (abiertoEn(t, minutos)) {
      let fin = aMinutos(t.cierra);
      if (fin <= aMinutos(t.abre)) fin += 24 * 60;
      return {
        abierto: true,
        cierraA: t.cierra,
        cierraPronto: fin - minutos <= MINUTOS_CIERRA_PRONTO,
      };
    }
  }

  // ¿Dentro del desbordamiento de un tramo de ayer que cruza medianoche?
  for (const t of horarios[diaAnterior(dia)]) {
    const inicio = aMinutos(t.abre);
    const fin = aMinutos(t.cierra);
    if (fin <= inicio && minutos < fin) {
      return {
        abierto: true,
        cierraA: t.cierra,
        cierraPronto: fin - minutos <= MINUTOS_CIERRA_PRONTO,
      };
    }
  }

  // Cerrado: buscar la próxima apertura (hoy quedan tramos → hoy; si no, hasta 7 días)
  const tramoHoy = horarios[dia]
    .filter((t) => aMinutos(t.abre) > minutos)
    .sort((a, b) => aMinutos(a.abre) - aMinutos(b.abre))[0];

  if (tramoHoy) {
    return {
      abierto: false,
      proximaApertura: { dia, hora: tramoHoy.abre, esHoy: true, esManana: false },
    };
  }

  let cursor = dia;
  for (let salto = 1; salto <= 7; salto++) {
    cursor = diaSiguiente(cursor);
    const tramo = [...horarios[cursor]].sort(
      (a, b) => aMinutos(a.abre) - aMinutos(b.abre),
    )[0];
    if (tramo) {
      return {
        abierto: false,
        proximaApertura: {
          dia: cursor,
          hora: tramo.abre,
          esHoy: false,
          esManana: salto === 1,
        },
      };
    }
  }

  // Sin tramos en toda la semana (no debería pasar con datos validados)
  return { abierto: false, proximaApertura: null };
}

/** API del prompt maestro (§7.3). */
export function isOpenNow(restaurante: Restaurante, ahora: Date): boolean {
  return estadoLocal(restaurante.horarios, ahora).abierto;
}

export function nextOpening(
  restaurante: Restaurante,
  ahora: Date,
): { dia: DiaIso; hora: string; esHoy: boolean; esManana: boolean } | null {
  const estado = estadoLocal(restaurante.horarios, ahora);
  return estado.abierto ? null : estado.proximaApertura;
}
