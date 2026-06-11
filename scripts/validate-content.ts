/**
 * pnpm validate:content — corre zod sobre todo content/ y FALLA si:
 *  - algún dato está malformado (los módulos ya parsean al importar),
 *  - un plato referencia un local inexistente,
 *  - hay testimonios marcados como publicables sin aprobación del cliente,
 *  - un restaurante referencia fotos que no existen en el manifest (cuando exista).
 *
 * Encadenado al build (`pnpm build`) y al hook de pre-push (Ley 1).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

async function main() {
  const errores: string[] = [];

  // Importar ya valida: cada módulo hace schema.parse() en su carga.
  const [
    { grupo },
    { restaurantes },
    { platos },
    { menuDelDia },
    { servicios },
    { testimonios, testimoniosPublicables },
    { pendientes, pendientesQueBloqueanLanzamiento },
  ] = await Promise.all([
    import("../content/grupo"),
    import("../content/restaurantes"),
    import("../content/carta"),
    import("../content/menu-del-dia"),
    import("../content/servicios"),
    import("../content/testimonios"),
    import("../content/pendientes"),
  ]);

  // Coherencia: platos → locales existentes
  const slugs = new Set(restaurantes.map((r) => r.slug));
  for (const plato of platos) {
    for (const local of plato.local ?? []) {
      if (!slugs.has(local)) {
        errores.push(
          `Plato «${plato.nombre}» referencia el local inexistente «${local}»`,
        );
      }
    }
  }

  // Testimonios: ninguno sin aprobar puede llegar a publicables
  for (const t of testimoniosPublicables) {
    if (!t.aprobadoPorCliente) {
      errores.push(
        `Testimonio de «${t.autor}» publicable sin aprobación del cliente (Ley 1)`,
      );
    }
  }

  // Galerías: si existe el manifest (B2), toda referencia debe resolver
  const rutaManifest = join(process.cwd(), "content", "assets.manifest.json");
  if (existsSync(rutaManifest)) {
    const manifest = JSON.parse(readFileSync(rutaManifest, "utf8")) as Array<{
      id: string;
    }>;
    const ids = new Set(manifest.map((a) => a.id));
    for (const r of restaurantes) {
      for (const fotoId of r.galeriaIds) {
        if (!ids.has(fotoId)) {
          errores.push(
            `Restaurante «${r.slug}» referencia la foto inexistente «${fotoId}»`,
          );
        }
      }
    }
  }

  // Informe
  console.log("── validate:content ──────────────────────────────");
  console.log(`Grupo: ${grupo.nombre} · ${restaurantes.length} locales`);
  console.log(
    `Platos: ${platos.length} · Menú del día: ${menuDelDia ? "sí" : "PENDIENTE"} · Servicios: ${servicios.length}`,
  );
  console.log(
    `Testimonios: ${testimonios.length} (${testimoniosPublicables.length} aprobados para publicar)`,
  );
  const vivos = pendientes.filter((p) => !p.resuelto);
  console.log(
    `Pendientes vivos: ${vivos.length}/${pendientes.length} · bloquean lanzamiento: ${pendientesQueBloqueanLanzamiento.length}`,
  );

  if (errores.length > 0) {
    console.error("\n✗ ERRORES:");
    for (const e of errores) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log("✓ content/ válido");
}

main().catch((error) => {
  console.error("✗ validate:content reventó:", error);
  process.exit(1);
});
