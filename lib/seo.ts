/**
 * Builders de JSON-LD (§13.2). Una sola fuente de verdad: content/.
 * Sin aggregateRating salvo orden expresa del cliente (§2.6).
 */
import { grupo } from "@/content/grupo";
import type { Restaurante } from "@/content/schemas";
import { urlComoLlegar } from "@/lib/maps";

const DIAS_SCHEMA = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function urlBase(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: grupo.nombre,
    url: urlBase(),
    logo: `${urlBase()}/icon.svg`,
    email: grupo.email,
    sameAs: [grupo.redes.facebook, grupo.redes.instagram],
  };
}

export function restaurantJsonLd(r: Restaurante) {
  const horarios = r.horarios
    ? ([1, 2, 3, 4, 5, 6, 7] as const).flatMap((dia) =>
        r.horarios![dia].map((t) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: DIAS_SCHEMA[dia - 1],
          opens: t.abre,
          closes: t.cierra === "00:00" ? "23:59" : t.cierra,
        })),
      )
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.nombre,
    url: `${urlBase()}/restaurantes/${r.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.direccion.calle,
      postalCode: r.direccion.cp,
      addressLocality: "Getafe",
      addressRegion: "Madrid",
      addressCountry: "ES",
    },
    ...(r.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: r.geo.lat,
        longitude: r.geo.lng,
      },
    }),
    ...(r.telefonos[0] && { telephone: r.telefonos[0].numero }),
    servesCuisine: ["Española", "Tapas", "Cocina casera"],
    priceRange: "€",
    menu: `${urlBase()}/carta`,
    acceptsReservations: true,
    hasMap: urlComoLlegar(r),
    ...(horarios && { openingHoursSpecification: horarios }),
  };
}

export function breadcrumbJsonLd(items: Array<{ nombre: string; ruta: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: `${urlBase()}${item.ruta}`,
    })),
  };
}
