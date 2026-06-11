"use client";

import { useRef, useState } from "react";
import type { Telefono } from "@/content/schemas";
import { IconoTelefono } from "@/components/ui/iconos";
import { cn } from "@/lib/cn";

/**
 * Teléfono click-to-call + click-to-copy con tooltip «Copiado» (§15.15).
 * En táctil llama; en desktop el botón secundario copia.
 */
export function TelCopiable({
  telefono,
  className,
}: {
  telefono: Telefono;
  className?: string;
}) {
  const [copiado, setCopiado] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(telefono.visible);
      setCopiado(true);
      if (temporizador.current) clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setCopiado(false), 1600);
    } catch {
      // Sin clipboard: el tel: sigue funcionando
    }
  };

  return (
    <span className={cn("relative inline-flex items-center gap-2", className)}>
      <a
        href={`tel:${telefono.numero}`}
        className="enlace inline-flex items-center gap-2 font-semibold tabular-nums"
      >
        <IconoTelefono />
        {telefono.visible}
      </a>
      <button
        type="button"
        onClick={copiar}
        aria-label={`Copiar el teléfono ${telefono.visible}`}
        className="hidden h-8 items-center rounded-md border border-current/25 px-2 font-sans text-[0.65rem] font-semibold tracking-wider uppercase opacity-60 transition-opacity hover:opacity-100 lg:inline-flex"
      >
        Copiar
      </button>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute -top-8 right-0 rounded-md bg-tinta px-2 py-1 font-sans text-xs text-tiza transition-[opacity,transform] duration-200",
          copiado ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        Copiado
      </span>
      {!telefono.confirmado && (
        <span className="font-sans text-xs opacity-50">(por confirmar)</span>
      )}
    </span>
  );
}
