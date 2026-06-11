"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { restaurantes, restaurantePorSlug } from "@/content/restaurantes";
import { componerMensajeReserva } from "@/lib/wa";

const slugsValidos = restaurantes.map((r) => r.slug) as [string, ...string[]];

const ReservaSchema = z.object({
  nombre: z.string().min(2, "Dinos tu nombre para guardarte la mesa."),
  telefono: z
    .string()
    .regex(/^[+\d][\d\s]{8,15}$/, "Ese teléfono no parece completo: revísalo."),
  local: z.enum(slugsValidos),
  personas: z.coerce.number().int().min(1).max(30),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Elige el día de la reserva."),
  hora: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Elige una hora."),
  comentario: z.string().max(600).optional(),
});

export type EstadoReserva = {
  ok: boolean;
  errores?: Partial<Record<string, string>>;
  /** Sin email configurado: mensaje compuesto para la vía WhatsApp/teléfono */
  fallback?: { mensaje: string; local: string };
  general?: string;
};

/** Rate-limit sencillo por IP: 5 envíos / 10 min por instancia. */
const intentos = new Map<string, number[]>();
const VENTANA_MS = 10 * 60 * 1000;
const MAX_INTENTOS = 5;

function superaLimite(ip: string): boolean {
  const ahora = Date.now();
  const lista = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  lista.push(ahora);
  intentos.set(ip, lista);
  return lista.length > MAX_INTENTOS;
}

export async function enviarReserva(
  _prev: EstadoReserva,
  formData: FormData,
): Promise<EstadoReserva> {
  // Honeypot: los humanos no rellenan «web»
  if (formData.get("web")) {
    return { ok: false, general: "No hemos podido procesar la solicitud." };
  }

  const cabeceras = await headers();
  const ip =
    cabeceras.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (superaLimite(ip)) {
    return {
      ok: false,
      general:
        "Demasiados intentos seguidos. Espera unos minutos o llámanos directamente.",
    };
  }

  const datos = ReservaSchema.safeParse({
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    local: formData.get("local"),
    personas: formData.get("personas"),
    fecha: formData.get("fecha"),
    hora: formData.get("hora"),
    comentario: formData.get("comentario") || undefined,
  });

  if (!datos.success) {
    const errores: Partial<Record<string, string>> = {};
    for (const e of datos.error.issues) {
      const campo = String(e.path[0]);
      if (!errores[campo]) errores[campo] = e.message;
    }
    return { ok: false, errores };
  }

  const d = datos.data;
  const restaurante = restaurantePorSlug(d.local)!;
  const nombreLocal = restaurante.nombreCorto;

  // Degradación elegante (§12.3): sin RESEND_API_KEY no se enseña un error
  // de infraestructura — se devuelve el mensaje compuesto para WhatsApp/tel.
  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      fallback: {
        mensaje: componerMensajeReserva({
          local: nombreLocal,
          personas: d.personas,
          fecha: d.fecha,
          hora: d.hora,
          nombre: d.nombre,
        }),
        local: d.local,
      },
    };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const destino =
    process.env.RESERVAS_EMAIL_TO ?? "info@restaurantesavenida.com";

  const { error } = await resend.emails.send({
    from: "Reservas web <reservas@restaurantesavenida.com>",
    to: destino,
    replyTo: undefined,
    subject: `Reserva web · ${nombreLocal} · ${d.fecha} ${d.hora} · ${d.personas} pax`,
    text:
      `Solicitud de reserva desde la web\n\n` +
      `Local: Avenida ${nombreLocal} (${restaurante.direccion.calle})\n` +
      `Nombre: ${d.nombre}\nTeléfono: ${d.telefono}\n` +
      `Personas: ${d.personas}\nFecha: ${d.fecha}\nHora: ${d.hora}\n` +
      (d.comentario ? `Comentario: ${d.comentario}\n` : ""),
  });

  if (error) {
    return {
      ok: false,
      fallback: {
        mensaje: componerMensajeReserva({
          local: nombreLocal,
          personas: d.personas,
          fecha: d.fecha,
          hora: d.hora,
          nombre: d.nombre,
        }),
        local: d.local,
      },
    };
  }

  const params = new URLSearchParams({
    nombre: d.nombre,
    local: nombreLocal,
    fecha: d.fecha,
    hora: d.hora,
    personas: String(d.personas),
  });
  redirect(`/gracias?${params.toString()}`);
}
