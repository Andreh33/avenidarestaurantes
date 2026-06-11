import type { MetadataRoute } from "next";
import { restaurantes } from "@/content/restaurantes";
import { urlBase } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlBase();
  const hoy = new Date();

  const rutas = [
    "",
    "/carta",
    "/menu-del-dia",
    "/reservas",
    "/eventos",
    "/catering",
    "/asados",
  ].map((ruta) => ({
    url: `${base}${ruta}`,
    lastModified: hoy,
    changeFrequency: "weekly" as const,
    priority: ruta === "" ? 1 : 0.7,
  }));

  const fichas = restaurantes.map((r) => ({
    url: `${base}/restaurantes/${r.slug}`,
    lastModified: hoy,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...rutas, ...fichas];
}
