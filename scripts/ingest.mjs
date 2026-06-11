/**
 * Pipeline de assets (§8.4): originales de _ingest/raw → public/img
 * (WebP máx. 1600px, EXIF fuera) + content/assets.manifest.json con
 * dimensiones, LQIP base64 y alt reales escritos a mano en la curaduría.
 *
 * Uso: node scripts/ingest.mjs
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const RAIZ = process.cwd();
const SALIDA = join(RAIZ, "public", "img");
const MANIFEST = join(RAIZ, "content", "assets.manifest.json");

/**
 * Curaduría por visión del 11/06/2026 (fotos provisionales de las fichas
 * de Google Maps de los propios locales — D-013, P7 sigue vivo).
 * Descartes: centro/g03 (plato a medio comer con marca de fecha),
 * lavadero/g02 (duplicado), lavadero/g05 (dudosa: posible otro negocio).
 */
const CURADURIA = [
  {
    origen: "_ingest/raw/google/centro/g01.jpg",
    id: "centro-fachada-01",
    tier: "hero",
    alt: "Fachada del Avenida en la calle Toledo: arcos rotulados «Cervecería Avenida 15 · Raciones» y la terraza montada",
  },
  {
    origen: "_ingest/raw/google/centro/g02.jpg",
    id: "centro-plato-01",
    tier: "grid",
    alt: "Sandwich mixto plancha con patatas fritas caseras, servido en el Avenida de la calle Toledo",
  },
  {
    origen: "_ingest/raw/google/centro/g04.jpg",
    id: "centro-plato-02",
    tier: "grid",
    alt: "Plato de judías estofadas con su vino tinto, cocina casera del menú del día",
  },
  {
    origen: "_ingest/raw/google/lavadero/g01.jpg",
    id: "lavadero-fachada-01",
    tier: "hero",
    alt: "Fachada blanca y roja del Avenida by Tapas en la zona del Lavadero, con su rótulo y la entrada con toldo",
  },
  {
    origen: "_ingest/raw/google/lavadero/g03.jpg",
    id: "lavadero-plato-01",
    tier: "grid",
    alt: "Bandeja de asado variado con costillas, panceta y tostones, lista para llevar",
  },
  {
    origen: "_ingest/raw/google/lavadero/g04.jpg",
    id: "lavadero-plato-02",
    tier: "grid",
    alt: "Tortillitas caseras con ensalada de la casa en el Avenida Lavadero",
  },
];

mkdirSync(SALIDA, { recursive: true });

const manifest = [];
for (const foto of CURADURIA) {
  const ruta = join(RAIZ, foto.origen);
  if (!existsSync(ruta)) {
    console.error(`✗ Falta el original: ${foto.origen}`);
    process.exit(1);
  }

  // Principal: WebP máx 1600, sin metadatos (EXIF/GPS fuera)
  const principal = sharp(ruta).rotate().resize({ width: 1600, withoutEnlargement: true });
  const info = await principal
    .webp({ quality: 80 })
    .toFile(join(SALIDA, `${foto.id}.webp`));

  // LQIP: 16px borroso en base64
  const lqipBuffer = await sharp(ruta)
    .rotate()
    .resize(16)
    .webp({ quality: 35 })
    .toBuffer();

  manifest.push({
    id: foto.id,
    tier: foto.tier,
    src: `/img/${foto.id}.webp`,
    width: info.width,
    height: info.height,
    lqip: `data:image/webp;base64,${lqipBuffer.toString("base64")}`,
    alt: foto.alt,
    fuente: "Google Maps del propio local (provisional, D-013)",
  });
  console.log(`✓ ${foto.id} → ${info.width}×${info.height} (${Math.round(info.size / 1024)} KB)`);
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`✓ Manifest: ${manifest.length} fotos → content/assets.manifest.json`);
