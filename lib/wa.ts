/**
 * Builder de mensajes de reserva por WhatsApp (§12.1).
 * encodeURIComponent SIEMPRE sobre el mensaje completo (§16.12: tildes y ñ).
 */

export type DatosReserva = {
  local: string;
  personas: number;
  fecha: string; // yyyy-mm-dd
  hora: string; // HH:MM
  nombre: string;
};

export function componerMensajeReserva(d: DatosReserva): string {
  const fechaBonita = formatearFecha(d.fecha);
  return (
    `Hola, soy ${d.nombre}. Quería reservar en Avenida ${d.local} ` +
    `para ${d.personas} ${d.personas === 1 ? "persona" : "personas"} ` +
    `el ${fechaBonita} a las ${d.hora}.`
  );
}

export function urlWhatsApp(numeroE164: string, mensaje: string): string {
  const numero = numeroE164.replace(/^\+/, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

function formatearFecha(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  if (!a || !m || !d) return iso;
  const fecha = new Date(Date.UTC(a, m - 1, d));
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(fecha);
}
