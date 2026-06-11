"use client";

import { useActionState } from "react";
import { enviarReserva, type EstadoReserva } from "@/app/(sitio)/reservas/actions";
import { restaurantes } from "@/content/restaurantes";
import { urlWhatsApp } from "@/lib/wa";
import { CampoArea, CampoSelect, CampoTexto } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconoTelefono, IconoWhatsApp } from "@/components/ui/iconos";

const estadoInicial: EstadoReserva = { ok: false };

/**
 * Vía 3 de reserva (§12.1): formulario con Server Action + zod, honeypot
 * y rate-limit. Sin RESEND_API_KEY degrada con el mensaje ya compuesto
 * (§12.3) — el usuario nunca ve un error de infraestructura.
 */
export function FormularioReserva() {
  const [estado, accion, pendiente] = useActionState(
    enviarReserva,
    estadoInicial,
  );

  const restauranteFallback = estado.fallback
    ? restaurantes.find((r) => r.slug === estado.fallback!.local)!
    : null;
  // Local sin teléfono publicado (P4): la llamada va al Centro
  const telFallback =
    restauranteFallback?.telefonos[0] ?? restaurantes[0].telefonos[0];

  return (
    <form action={accion} noValidate className="space-y-5">
      {/* Honeypot: oculto a humanos, irresistible para bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="web">No rellenes este campo</label>
        <input id="web" name="web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <CampoTexto
          id="nombre"
          name="nombre"
          label="Nombre"
          autoComplete="name"
          required
          error={estado.errores?.nombre}
        />
        <CampoTexto
          id="telefono"
          name="telefono"
          label="Teléfono"
          type="tel"
          autoComplete="tel"
          placeholder="600 00 00 00"
          required
          error={estado.errores?.telefono}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <CampoSelect id="local" name="local" label="Local" error={estado.errores?.local}>
          {restaurantes.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.nombreCorto} · {r.direccion.calle}
            </option>
          ))}
        </CampoSelect>
        <CampoTexto
          id="personas"
          name="personas"
          label="Personas"
          type="number"
          min={1}
          max={30}
          defaultValue={2}
          required
          error={estado.errores?.personas}
        />
        <CampoTexto
          id="fecha"
          name="fecha"
          label="Día"
          type="date"
          required
          error={estado.errores?.fecha}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <CampoTexto
          id="hora"
          name="hora"
          label="Hora"
          type="time"
          required
          error={estado.errores?.hora}
        />
        <CampoArea
          id="comentario"
          name="comentario"
          label="¿Algo que debamos saber? (opcional)"
          placeholder="Trona, terraza, celebración…"
          error={estado.errores?.comentario}
        />
      </div>

      {estado.general && (
        <p className="rounded-md border border-vermut/40 bg-vermut/5 px-4 py-3 font-sans text-sm text-vermut">
          {estado.general}
        </p>
      )}

      {estado.fallback && restauranteFallback && (
        <div className="space-y-3 rounded-(--radius-card) border border-cobalto/30 bg-cobalto/5 p-5">
          <p className="font-sans text-sm font-semibold text-tinta">
            El correo directo aún no está activo — pero tu mensaje ya está
            listo:
          </p>
          <p className="font-sans text-sm text-tinta/80">
            “{estado.fallback.mensaje}”
          </p>
          <div className="flex flex-wrap gap-3">
            {restauranteFallback.whatsapp ? (
              <a
                href={urlWhatsApp(
                  restauranteFallback.whatsapp,
                  estado.fallback.mensaje,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-vermut px-5 py-2.5 font-sans text-sm font-semibold text-tiza"
              >
                <IconoWhatsApp />
                Enviarlo por WhatsApp
              </a>
            ) : (
              <a
                href={`tel:${telFallback.numero}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-vermut px-5 py-2.5 font-sans text-sm font-semibold text-tiza"
              >
                <IconoTelefono />
                Llamar y reservar: {telFallback.visible}
              </a>
            )}
          </div>
        </div>
      )}

      <Button type="submit" variante="vermut" loading={pendiente}>
        {pendiente ? "Enviando…" : "Solicitar reserva"}
      </Button>
      <p className="font-sans text-xs text-tinta/50">
        Te confirmamos por teléfono o WhatsApp. Enviar el formulario aún no es
        una confirmación.
      </p>
    </form>
  );
}
