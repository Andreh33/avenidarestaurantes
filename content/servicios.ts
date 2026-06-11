/**
 * Servicios del grupo — §2.5 (web 2021, vigencia por confirmar).
 * copyOriginal = literal del cliente; copy = refinado por Latech
 * sin inventar nada que no esté en el original.
 */
import { ServicioSchema, type Servicio } from "./schemas";

export const servicios: Servicio[] = [
  ServicioSchema.parse({
    slug: "eventos",
    nombre: "Eventos y celebraciones",
    copy:
      "Espacio para eventos profesionales, celebraciones y cenas de empresa. " +
      "Cuéntanos tu idea y preparamos un día inolvidable.",
    copyOriginal:
      "Espacio para eventos profesionales, celebraciones y cenas de empresa. " +
      "«Cuéntanos tu idea.» · Celebraciones: «Preparamos un día inolvidable.»",
    vigenciaConfirmada: false,
  } satisfies Servicio),

  ServicioSchema.parse({
    slug: "catering",
    nombre: "Catering",
    copy:
      "Llevamos nuestros platos allá donde necesites para abastecer tu evento.",
    copyOriginal:
      "Llevamos nuestros platos allá donde necesites para abastecer tu evento.",
    vigenciaConfirmada: false,
  } satisfies Servicio),

  ServicioSchema.parse({
    slug: "asados",
    nombre: "Asados para llevar",
    copy:
      "Gran variedad de estupendos asados para llevar cuando y como quieras.",
    copyOriginal:
      "Gran variedad de estupendos asados para llevar cuando y como quieras.",
    vigenciaConfirmada: false,
  } satisfies Servicio),
];
