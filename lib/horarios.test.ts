/**
 * Tests de estado vivo (§17 B3): antes de abrir, abierto, cierra en 30 min,
 * cerrado, medianoche 00:00 y tramo que cruza la medianoche.
 *
 * En junio Madrid va en CEST (UTC+2): las fechas se construyen en UTC
 * y se comprueban contra hora de Madrid. 11/06/2026 es jueves.
 */
import { describe, expect, it } from "vitest";
import {
  estadoLocal,
  isOpenNow,
  momentoEnMadrid,
  nextOpening,
} from "./horarios";
import { restaurantePorSlug } from "@/content/restaurantes";
import type { HorarioSemanal } from "@/content/schemas";

const centro = restaurantePorSlug("centro")!;
const lavadero = restaurantePorSlug("lavadero")!;

/** Hora de Madrid (CEST, UTC+2) → instante UTC. */
const madrid = (iso: string) => new Date(`${iso}+02:00`);

describe("momentoEnMadrid", () => {
  it("convierte un instante UTC a día y hora de Madrid", () => {
    const m = momentoEnMadrid(madrid("2026-06-11T07:30:00"));
    expect(m.dia).toBe(4); // jueves
    expect(m.hhmm).toBe("07:30");
  });
});

describe("Centro (8:00–00:00 todos los días)", () => {
  it("antes de abrir: cerrado y abre hoy a las 8:00", () => {
    const estado = estadoLocal(centro.horarios, madrid("2026-06-11T07:30:00"));
    expect(estado.abierto).toBe(false);
    if (!estado.abierto) {
      expect(estado.proximaApertura).toEqual({
        dia: 4,
        hora: "08:00",
        esHoy: true,
        esManana: false,
      });
    }
  });

  it("a mediodía: abierto hasta las 00:00, sin aviso de cierre", () => {
    const estado = estadoLocal(centro.horarios, madrid("2026-06-11T13:00:00"));
    expect(estado).toEqual({
      abierto: true,
      cierraA: "00:00",
      cierraPronto: false,
    });
  });

  it("a las 23:35: abierto pero cierra pronto (≤30 min)", () => {
    const estado = estadoLocal(centro.horarios, madrid("2026-06-11T23:35:00"));
    expect(estado).toEqual({
      abierto: true,
      cierraA: "00:00",
      cierraPronto: true,
    });
  });

  it("a las 23:59: todavía abierto", () => {
    expect(isOpenNow(centro, madrid("2026-06-11T23:59:00"))).toBe(true);
  });

  it("medianoche en punto: cerrado, abre hoy (ya viernes) a las 8:00", () => {
    const estado = estadoLocal(centro.horarios, madrid("2026-06-12T00:00:00"));
    expect(estado.abierto).toBe(false);
    if (!estado.abierto) {
      expect(estado.proximaApertura).toEqual({
        dia: 5, // viernes
        hora: "08:00",
        esHoy: true,
        esManana: false,
      });
    }
  });
});

describe("Lavadero (L–V 8–23 · S–D 9–23, web 2021)", () => {
  it("sábado a las 8:30: cerrado, abre hoy a las 9:00", () => {
    const apertura = nextOpening(lavadero, madrid("2026-06-13T08:30:00"));
    expect(apertura).toEqual({
      dia: 6,
      hora: "09:00",
      esHoy: true,
      esManana: false,
    });
  });

  it("viernes a las 23:30: cerrado, abre mañana sábado a las 9:00", () => {
    const apertura = nextOpening(lavadero, madrid("2026-06-12T23:30:00"));
    expect(apertura).toEqual({
      dia: 6,
      hora: "09:00",
      esHoy: false,
      esManana: true,
    });
  });
});

describe("tramo que cruza la medianoche (sintético 20:00–02:00 el viernes)", () => {
  const horarios: HorarioSemanal = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [{ abre: "20:00", cierra: "02:00" }],
    6: [],
    7: [],
  };

  it("sábado a la 01:00: sigue abierto por el tramo del viernes", () => {
    const estado = estadoLocal(horarios, madrid("2026-06-13T01:00:00"));
    expect(estado).toEqual({
      abierto: true,
      cierraA: "02:00",
      cierraPronto: false,
    });
  });

  it("sábado a la 01:40: abierto y cierra pronto", () => {
    const estado = estadoLocal(horarios, madrid("2026-06-13T01:40:00"));
    expect(estado).toEqual({
      abierto: true,
      cierraA: "02:00",
      cierraPronto: true,
    });
  });

  it("sábado a las 02:00 en punto: cerrado hasta el viernes siguiente", () => {
    const estado = estadoLocal(horarios, madrid("2026-06-13T02:00:00"));
    expect(estado.abierto).toBe(false);
    if (!estado.abierto) {
      expect(estado.proximaApertura?.dia).toBe(5);
      expect(estado.proximaApertura?.hora).toBe("20:00");
    }
  });
});
