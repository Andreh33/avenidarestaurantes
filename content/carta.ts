/**
 * Carta del grupo. VACÍA a propósito (Ley 1): las cartas reales con
 * precios actuales son el pendiente P2. Ni un plato se inventa.
 *
 * Lo único utilizable hoy es el producto que el propio cliente citaba
 * en su web 2021 (despensa, para copy — no son platos con precio).
 */
import { PlatoSchema, type Plato } from "./schemas";
import { z } from "zod";

export const platos: Plato[] = [].map((p) => PlatoSchema.parse(p));

/** Producto citado por el cliente en su propia web (2021). Solo copy. */
export const productosDespensa: string[] = z.array(z.string()).parse([
  "Lomo de ternera nacional",
  "Jamón serrano de bodega",
  "Queso curado D.O. La Mancha",
  "Morcilla de Burgos",
]);
