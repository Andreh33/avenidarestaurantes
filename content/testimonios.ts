/**
 * Testimonios reales de la web 2021 del cliente (§2.6).
 * TODOS con aprobadoPorCliente: false hasta que dé el OK (P8):
 * la UI solo renderiza los aprobados y validate:content lo vigila.
 */
import { TestimonioSchema, type Testimonio } from "./schemas";

export const testimonios: Testimonio[] = [
  TestimonioSchema.parse({
    texto:
      "Buena comida a buen precio. Cantidad. Servicio rápido y atento. " +
      "Recomendable para el día a día.",
    autor: "Vicente G.",
    fuente: "Web del cliente (2021)",
    aprobadoPorCliente: false,
  } satisfies Testimonio),
  TestimonioSchema.parse({
    texto:
      "Este sitio tiene unas tapas que están increíblemente buenas. " +
      "Se come estupendamente y el personal es muy amable.",
    autor: "Clara G.",
    fuente: "Web del cliente (2021)",
    aprobadoPorCliente: false,
  } satisfies Testimonio),
  TestimonioSchema.parse({
    texto:
      "Buen servicio, la comida estaba rica y era contundente. Sitio barato " +
      "para comer con un buen menú y platos a la carta.",
    autor: "Ana S.",
    fuente: "Web del cliente (2021)",
    aprobadoPorCliente: false,
  } satisfies Testimonio),
  TestimonioSchema.parse({
    texto: "Rapidez, calidad y buena atención. Nos sorprendió.",
    autor: "Cliente anónimo",
    fuente: "Web del cliente (2021)",
    aprobadoPorCliente: false,
  } satisfies Testimonio),
];

/** Solo estos llegan a la UI. */
export const testimoniosPublicables = testimonios.filter(
  (t) => t.aprobadoPorCliente,
);
