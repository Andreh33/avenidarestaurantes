/**
 * Locales del grupo — fichas §2.2 y §2.3 (verificadas 11/06/2026).
 * El nombre comercial exacto de cada local está pendiente de confirmación
 * (P1); aquí se usan los nombres de trabajo derivados de Google/web 2021.
 *
 * «Bar Avenida 47» NO se incluye: sin evidencia de pertenencia (§2.4).
 */
import { RestauranteSchema, type Restaurante, type Tramo } from "./schemas";

const tramo = (abre: string, cierra: string): Tramo => ({ abre, cierra });

export const restaurantes: Restaurante[] = [
  RestauranteSchema.parse({
    slug: "centro",
    nombre: "Avenida — Getafe Centro",
    placa: {
      eyebrow: "RESTAURANTES",
      texto: "AVENIDA",
      pie: "GETAFE",
      matiz: "cobalto",
    },
    direccion: {
      calle: "C. Toledo, 15, bajo",
      cp: "28901",
      ciudad: "Getafe, Madrid",
    },
    geo: { lat: 40.3039045, lng: -3.7325668 },
    placeId: "ChIJ5Spsh7EhQg0RUdG64d-semA",
    telefonos: [
      {
        numero: "+34916826667",
        visible: "916 82 66 67",
        confirmado: true, // Google, actual
      },
    ],
    // whatsapp: PENDIENTE P4
    // Google (actual): todos los días 8:00–00:00
    horarios: {
      1: [tramo("08:00", "00:00")],
      2: [tramo("08:00", "00:00")],
      3: [tramo("08:00", "00:00")],
      4: [tramo("08:00", "00:00")],
      5: [tramo("08:00", "00:00")],
      6: [tramo("08:00", "00:00")],
      7: [tramo("08:00", "00:00")],
    },
    horariosConfirmados: true,
    serviciosDisponibles: ["eventos", "catering", "asados"],
    galeriaIds: [], // B2 pendiente de fotos
    descripcionCorta:
      "Restaurante referencia en Getafe. Calidad y servicio a un precio imbatible.",
    descripcionLarga:
      "El Avenida de la calle Toledo abre todos los días desde las ocho de la " +
      "mañana hasta la medianoche: café, menú del día, tapas, raciones y cenas. " +
      "La comida que siempre gana en nuestra barra es la casera.",
  } satisfies Restaurante),

  RestauranteSchema.parse({
    slug: "lavadero",
    nombre: "Avenida Lavadero",
    placa: {
      eyebrow: "AVENIDA",
      texto: "LAVADERO",
      pie: "GETAFE",
      matiz: "aceituna",
    },
    direccion: {
      calle: "C. Hospital de San José, 67",
      cp: "28901",
      ciudad: "Getafe, Madrid",
    },
    geo: { lat: 40.3054522, lng: -3.7266706 },
    placeId: "ChIJFUh0s48hQg0RqhRpYymDbO8",
    telefonos: [
      {
        numero: "+34602679748",
        visible: "602 67 97 48",
        etiqueta: "Google",
        confirmado: false, // P4: ¿cuál vale, este o el de la web 2021?
      },
      {
        numero: "+34916834697",
        visible: "91 683 46 97",
        etiqueta: "Web 2021",
        confirmado: false,
      },
    ],
    // Web 2021: L–V 8:00–23:00 · S–D 9:00–23:00 — confirmar (P5)
    horarios: {
      1: [tramo("08:00", "23:00")],
      2: [tramo("08:00", "23:00")],
      3: [tramo("08:00", "23:00")],
      4: [tramo("08:00", "23:00")],
      5: [tramo("08:00", "23:00")],
      6: [tramo("09:00", "23:00")],
      7: [tramo("09:00", "23:00")],
    },
    horariosConfirmados: false,
    serviciosDisponibles: ["eventos", "catering", "asados"],
    galeriaIds: [], // B2 pendiente de fotos
    descripcionCorta:
      "Trato familiar y acogedor en este rincón de Getafe.",
    descripcionLarga:
      "Trato familiar y acogedor en este rincón de Getafe. Te ofrecemos menú " +
      "diario, aperitivos, raciones y todo lo que necesites a un precio que te " +
      "resultará difícil de creer. Tradición, frescura y esencia — y una sala " +
      "privada en la planta de arriba para celebraciones.",
  } satisfies Restaurante),
];

export function restaurantePorSlug(slug: string): Restaurante | undefined {
  return restaurantes.find((r) => r.slug === slug);
}
