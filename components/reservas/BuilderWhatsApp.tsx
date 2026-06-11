"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { restaurantes } from "@/content/restaurantes";
import { componerMensajeReserva, urlWhatsApp } from "@/lib/wa";
import { CampoTexto } from "@/components/ui/Input";
import { IconoTelefono, IconoWhatsApp } from "@/components/ui/iconos";
import { cn } from "@/lib/cn";

/**
 * Vía 2 de reserva (§12.1): builder visual → mensaje natural de WhatsApp
 * con vista previa. Sin número de WhatsApp confirmado (P4), degrada con
 * honestidad: copiar el mensaje + llamar (el usuario nunca ve un error).
 * Stepper de personas con dígito que rueda (§15.36).
 */
export function BuilderWhatsApp() {
  const [local, setLocal] = useState("centro");
  const [personas, setPersonas] = useState(2);
  const [direccionStep, setDireccionStep] = useState<1 | -1>(1);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [copiado, setCopiado] = useState(false);

  const restaurante = restaurantes.find((r) => r.slug === local)!;
  const nombreLocal = restaurante.nombreCorto;
  // Si el local aún no tiene teléfono publicado (P4), se llama al Centro
  const telContacto = restaurante.telefonos[0] ?? restaurantes[0].telefonos[0];
  const completo = fecha && hora && nombre.trim().length >= 2;

  // Sin useMemo: el React Compiler memoiza solo
  const mensaje = componerMensajeReserva({
    local: nombreLocal,
    personas,
    fecha: fecha || "—",
    hora: hora || "—",
    nombre: nombre.trim() || "…",
  });

  const cambiarPersonas = (delta: 1 | -1) => {
    setDireccionStep(delta);
    setPersonas((p) => Math.min(30, Math.max(1, p + delta)));
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Local */}
      <fieldset>
        <legend className="mb-2 font-sans text-sm font-semibold text-tinta">
          ¿En qué local?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {restaurantes.map((r) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => setLocal(r.slug)}
              aria-pressed={local === r.slug}
              className={cn(
                "min-h-11 rounded-[10px] border px-4 py-2.5 font-sans text-sm font-semibold transition-colors duration-200",
                local === r.slug
                  ? "border-cobalto bg-cobalto text-tiza"
                  : "border-tinta/20 text-tinta hover:border-tinta/50",
              )}
            >
              {r.nombreCorto}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Personas: stepper con dígito que rueda */}
      <div>
        <p className="mb-2 font-sans text-sm font-semibold text-tinta">
          ¿Cuántos sois?
        </p>
        <div className="inline-flex items-center gap-1 rounded-[10px] border border-tinta/20">
          <button
            type="button"
            onClick={() => cambiarPersonas(-1)}
            aria-label="Una persona menos"
            className="h-11 w-11 rounded-l-[9px] font-sans text-xl font-semibold text-tinta transition-colors hover:bg-tinta/5 active:scale-95"
          >
            −
          </button>
          <div
            aria-live="polite"
            className="relative h-11 w-14 overflow-hidden text-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={personas}
                initial={{ y: direccionStep === 1 ? 26 : -26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: direccionStep === 1 ? -26 : 26, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="font-display absolute inset-0 flex items-center justify-center text-xl font-bold text-cobalto tabular-nums"
              >
                {personas}
              </motion.span>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => cambiarPersonas(1)}
            aria-label="Una persona más"
            className="h-11 w-11 rounded-r-[9px] font-sans text-xl font-semibold text-tinta transition-colors hover:bg-tinta/5 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <CampoTexto
          id="wa-fecha"
          label="¿Qué día?"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <CampoTexto
          id="wa-hora"
          label="¿A qué hora?"
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      <CampoTexto
        id="wa-nombre"
        label="¿A nombre de quién?"
        type="text"
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      {/* Vista previa del mensaje */}
      <figure className="rounded-(--radius-card) border border-tinta/15 bg-hueso p-4">
        <figcaption className="text-eyebrow mb-2 font-sans text-tinta/50 uppercase">
          Así quedará tu mensaje
        </figcaption>
        <p className="font-sans text-sm text-tinta/85">{mensaje}</p>
      </figure>

      {restaurante.whatsapp ? (
        <a
          href={completo ? urlWhatsApp(restaurante.whatsapp, mensaje) : undefined}
          aria-disabled={!completo}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-vermut px-6 py-3 font-sans text-sm font-semibold text-tiza shadow-flotante transition-transform duration-200 hover:-translate-y-px active:scale-[0.97]",
            !completo && "pointer-events-none opacity-45",
          )}
        >
          <IconoWhatsApp />
          Enviar por WhatsApp
        </a>
      ) : (
        <div className="space-y-3">
          <p className="font-sans text-sm text-tinta/60">
            Estamos confirmando el número de WhatsApp del local. Mientras
            tanto: copia el mensaje y mándalo, o llámanos y te lo apuntamos al
            momento.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copiar}
              disabled={!completo}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-cobalto px-6 py-3 font-sans text-sm font-semibold text-tiza shadow-flotante transition-transform duration-200 hover:-translate-y-px active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45"
            >
              {copiado ? "¡Copiado!" : "Copiar mensaje"}
            </button>
            <a
              href={`tel:${telContacto.numero}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-tinta/25 px-6 py-3 font-sans text-sm font-semibold text-tinta transition-colors hover:border-tinta/60"
            >
              <IconoTelefono />
              Llamar al {telContacto.visible}
              {restaurante.telefonos.length === 0 && " (Getafe Centro)"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
