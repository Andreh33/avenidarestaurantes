/**
 * Esquemas zod del content layer (§7.3). `pnpm validate:content` corre
 * todo content/ contra estos esquemas y falla el build si algo no cuadra.
 *
 * Ley 1: aquí solo entran datos reales verificados. Lo no confirmado
 * lleva `confirmado: false` o vive en pendientes.ts.
 */
import { z } from "zod";

/* ---------- Primitivas ---------- */

/** Hora "HH:MM" en reloj de 24 h. "00:00" como cierre = medianoche. */
export const HoraSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Hora en formato HH:MM");

/** Tramo de apertura. Si cierra ≤ abre, el cierre cae en el día siguiente. */
export const TramoSchema = z.object({
  abre: HoraSchema,
  cierra: HoraSchema,
});

/** Días ISO: 1 = lunes … 7 = domingo. Tramos vacíos = cerrado ese día. */
export const HorarioSemanalSchema = z.object({
  1: z.array(TramoSchema),
  2: z.array(TramoSchema),
  3: z.array(TramoSchema),
  4: z.array(TramoSchema),
  5: z.array(TramoSchema),
  6: z.array(TramoSchema),
  7: z.array(TramoSchema),
});

export const TelefonoSchema = z.object({
  /** Formato E.164: +34916826667 */
  numero: z.string().regex(/^\+\d{9,15}$/, "Teléfono en E.164"),
  /** Cómo se muestra: 916 82 66 67 */
  visible: z.string(),
  etiqueta: z.string().optional(),
  confirmado: z.boolean(),
});

export const PlacaSchema = z.object({
  eyebrow: z.string().optional(),
  texto: z.string().min(1),
  pie: z.string().optional(),
  matiz: z.enum(["cobalto", "aceituna"]),
});

/* ---------- Entidades ---------- */

export const GrupoSchema = z.object({
  nombre: z.string(),
  nombreEnRedes: z.string(),
  claim: z.string(),
  descripcionLarga: z.string(),
  email: z.email(),
  redes: z.object({
    facebook: z.url(),
    instagram: z.url(),
  }),
  /** Tel. general de reservas (web 2021) — vigencia sin confirmar. */
  telReservas: TelefonoSchema.optional(),
  anoFundacion: z.int().min(1900).max(2026).optional(),
});

export const RestauranteSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nombre: z.string(),
  /** Para chips y builders: «Getafe Centro», «Lavadero»… */
  nombreCorto: z.string(),
  placa: PlacaSchema,
  direccion: z.object({
    calle: z.string(),
    cp: z.string().regex(/^\d{5}$/),
    ciudad: z.string(),
  }),
  /** Ausente mientras la dirección no geocodifique (locales nuevos). */
  geo: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  placeId: z.string().min(10).optional(),
  /** Puede estar vacío (local pendiente de datos, P4). */
  telefonos: z.array(TelefonoSchema),
  /** Número de WhatsApp para reservas — PENDIENTE de cliente. */
  whatsapp: z.string().regex(/^\+\d{9,15}$/).optional(),
  /** null = horario aún desconocido (jamás inventarlo, Ley 1). */
  horarios: HorarioSemanalSchema.nullable(),
  horariosConfirmados: z.boolean(),
  serviciosDisponibles: z.array(z.string()),
  galeriaIds: z.array(z.string()),
  descripcionCorta: z.string(),
  descripcionLarga: z.string(),
});

export const PlatoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string().optional(),
  /** Céntimos, entero. 1250 = 12,50 € (§7.3). */
  precio: z.int().positive(),
  categoria: z.string(),
  /** Slugs de locales donde se sirve; ausente = todo el grupo. */
  local: z.array(z.string()).optional(),
  /** Sin alérgenos hasta que el cliente facilite la información oficial. */
  etiquetas: z.array(z.string()),
  fotoId: z.string().optional(),
});

export const MenuDelDiaSchema = z.object({
  /** Céntimos, entero. */
  precio: z.int().positive(),
  estructura: z.object({
    primeros: z.array(z.string()).min(1),
    segundos: z.array(z.string()).min(1),
    postre: z.array(z.string()).min(1),
  }),
  diasServicio: z.string(),
  notas: z.string().optional(),
  /** Se muestra en la UI: confianza (§15.33). ISO yyyy-mm-dd. */
  actualizadoEl: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const ServicioSchema = z.object({
  slug: z.enum(["eventos", "catering", "asados"]),
  nombre: z.string(),
  /** Copy real de la web 2021, refinado. */
  copy: z.string(),
  copyOriginal: z.string(),
  vigenciaConfirmada: z.boolean(),
});

export const TestimonioSchema = z.object({
  texto: z.string(),
  autor: z.string(),
  fuente: z.string(),
  /** Solo se renderizan los true. Publicar sin aprobar rompe validate:content. */
  aprobadoPorCliente: z.boolean(),
});

export const PendienteSchema = z.object({
  id: z.string(),
  pregunta: z.string(),
  /** Qué bloquea mientras no se resuelva (rutas, bloques, lanzamiento). */
  bloquea: z.array(z.string()),
  resuelto: z.boolean(),
});

/* ---------- Tipos inferidos ---------- */

export type Hora = z.infer<typeof HoraSchema>;
export type Tramo = z.infer<typeof TramoSchema>;
export type HorarioSemanal = z.infer<typeof HorarioSemanalSchema>;
export type Telefono = z.infer<typeof TelefonoSchema>;
export type Grupo = z.infer<typeof GrupoSchema>;
export type Restaurante = z.infer<typeof RestauranteSchema>;
export type Plato = z.infer<typeof PlatoSchema>;
export type MenuDelDia = z.infer<typeof MenuDelDiaSchema>;
export type Servicio = z.infer<typeof ServicioSchema>;
export type Testimonio = z.infer<typeof TestimonioSchema>;
export type Pendiente = z.infer<typeof PendienteSchema>;
