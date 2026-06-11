import type { Restaurante } from "@/content/schemas";

/** Enlace «Cómo llegar» a Google Maps (§9 Acto VIII, sin iframes). */
export function urlComoLlegar(r: Restaurante): string {
  const consulta = encodeURIComponent(
    `${r.direccion.calle}, ${r.direccion.cp} ${r.direccion.ciudad}`,
  );
  const base = `https://www.google.com/maps/search/?api=1&query=${consulta}`;
  return r.placeId ? `${base}&query_place_id=${r.placeId}` : base;
}

/** Enlace a las reseñas del local en Maps (§9 Acto VII, enlace discreto). */
export function urlResenas(r: Restaurante): string {
  if (!r.placeId) return urlComoLlegar(r);
  return `https://search.google.com/local/reviews?placeid=${r.placeId}`;
}
