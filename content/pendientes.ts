/**
 * Lista viva de [PENDIENTE] (§2.7). Los pendientes con bloquea: ["lanzamiento"]
 * impiden ejecutar B22 (Ley 1). Se marcan resuelto: true cuando el cliente
 * responde y el dato queda congelado en content/.
 */
import { PendienteSchema, type Pendiente } from "./schemas";

export const pendientes: Pendiente[] = [
  {
    id: "P1",
    pregunta:
      "Confirmados 4 locales por Andreh (11/06/2026): Toledo 15, Hospital de San José 67, C. Madrid 89 y Almansa 4. FALTA: nombre comercial exacto de cada uno, y de los dos nuevos: teléfono, horario y dirección verificada (Almansa 4 no geocodifica en Getafe). ¿El «Jamonivino» de C. Madrid 89 es vuestro?",
    bloquea: ["content/restaurantes.ts (nombres y datos nuevos)", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P2",
    pregunta: "Cartas reales completas con precios actuales.",
    bloquea: ["/carta", "Acto IV (La Barra)", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P3",
    pregunta: "Menú del día: platos tipo, precio y días en que se sirve.",
    bloquea: ["/menu-del-dia", "Acto V (La pizarra)", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P4",
    pregunta: "Teléfonos vigentes por local y número de WhatsApp para reservas.",
    bloquea: ["/reservas (vía WhatsApp)", "teléfono Lavadero", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P5",
    pregunta: "Horarios actuales por local (¿cierre semanal?).",
    bloquea: ["estado vivo Lavadero", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P6",
    pregunta: "¿Existe logo original/vectorial o diseñamos el sistema de placas?",
    bloquea: ["identidad definitiva de placas"],
    resuelto: false,
  },
  {
    id: "P7",
    pregunta: "Fotos en calidad original (export de Meta + fotos del móvil).",
    bloquea: ["B2 completo", "galerías", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P8",
    pregunta:
      "¿OK a usar los testimonios de la web 2021? ¿Mostramos nota de Google? (recomendación: no)",
    bloquea: ["Acto VII (testimonios)"],
    resuelto: false,
  },
  {
    id: "P9",
    pregunta: "Año de fundación / historia breve.",
    bloquea: ["tercera línea del hero (Acto I)"],
    resuelto: false,
  },
  {
    id: "P10",
    pregunta: "Aforo y salones (sala privada Lavadero, etc.).",
    bloquea: ["/eventos (capacidades)"],
    resuelto: false,
  },
  {
    id: "P11",
    pregunta: "Datos legales: razón social, NIF/CIF, dirección fiscal.",
    bloquea: ["/aviso-legal", "/privacidad", "lanzamiento"],
    resuelto: false,
  },
  {
    id: "P12",
    pregunta: "Acceso al DNS de restaurantesavenida.com.",
    bloquea: ["dominio en producción (B22)"],
    resuelto: false,
  },
].map((p) => PendienteSchema.parse(p));

export const pendientesQueBloqueanLanzamiento = pendientes.filter(
  (p) => !p.resuelto && p.bloquea.includes("lanzamiento"),
);
