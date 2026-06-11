/**
 * Datos del grupo — ficha §2.1 del prompt maestro (verificados 11/06/2026).
 * Fuentes: Facebook oficial, web antigua (2021), Google Places.
 */
import { GrupoSchema, type Grupo } from "./schemas";

export const grupo: Grupo = GrupoSchema.parse({
  nombre: "Restaurantes Avenida",
  nombreEnRedes: "Avenida by Tapas",
  claim: "Calidad al mejor precio",
  descripcionLarga:
    "Restaurante referencia en Getafe. Calidad y servicio a un precio imbatible. " +
    "La gastronomía es un mundo inmenso y variado. Sin embargo, hay una comida " +
    "que siempre será la preferida de nuestros clientes: la casera.",
  email: "info@restaurantesavenida.com",
  redes: {
    facebook: "https://www.facebook.com/RestaurantesAvenidaTapas",
    instagram: "https://www.instagram.com/avenidabytapas",
  },
  // Web 2021 — vigencia sin confirmar (pendiente P4)
  telReservas: {
    numero: "+34916812009",
    visible: "91 681 20 09",
    etiqueta: "Reservas (web 2021)",
    confirmado: false,
  },
  // anoFundacion: PENDIENTE P9 — jamás inventar (Ley 1)
} satisfies Grupo);
