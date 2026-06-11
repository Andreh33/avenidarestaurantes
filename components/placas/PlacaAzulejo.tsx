"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Sistema de placas (§4): la placa cerámica de calle madrileña como
 * logotipo de local. Composición HTML + grain SVG (ver DECISIONES.md D-004);
 * la versión SVG pura para favicon/OG llega en B18/B20.
 *
 * matiz: cobalto (Centro, grupo) | aceituna (propuesta Lavadero).
 * encendida: glow tungsteno del Acto VIII (noche). Sin parpadeo: es esmalte, no neón.
 */

type Matiz = "cobalto" | "aceituna";

const matices: Record<Matiz, { borde: string; texto: string; suave: string }> =
  {
    cobalto: {
      borde: "border-cobalto",
      texto: "text-cobalto",
      suave: "border-cobalto/60",
    },
    aceituna: {
      borde: "border-aceituna",
      texto: "text-aceituna",
      suave: "border-aceituna/60",
    },
  };

export function PlacaAzulejo({
  eyebrow,
  texto,
  pie,
  matiz = "cobalto",
  encendida = false,
  conBrillo = false,
  className,
}: {
  eyebrow?: string;
  texto: string;
  pie?: string;
  matiz?: Matiz;
  encendida?: boolean;
  conBrillo?: boolean;
  className?: string;
}) {
  const filtroId = useId();
  const m = matices[matiz];

  return (
    <div
      className={cn(
        "@container relative w-full overflow-hidden rounded-(--radius-placa) bg-gradient-to-br from-tiza to-hueso",
        encendida
          ? "shadow-[0_0_56px_-10px_var(--color-tungsteno)]"
          : "shadow-placa",
        className,
      )}
    >
      <div className={cn("m-2.5 rounded-lg border-[5px]", m.borde)}>
        <div
          className={cn(
            "m-1 rounded-md border px-[clamp(1rem,6%,2.5rem)] py-[clamp(1.5rem,9%,2.5rem)] text-center",
            m.suave,
          )}
        >
          {eyebrow && (
            <p className={cn("text-eyebrow font-sans", m.texto)}>{eyebrow}</p>
          )}
          <p
            className={cn(
              "font-display mt-2 leading-none font-extrabold tracking-tight",
              m.texto,
            )}
            style={{
              // El cuerpo escala con el ancho del contenedor Y la longitud
              // del texto: LAVADERO (8) o CALLE SIN SALIDA (16) caben igual.
              fontSize: `clamp(1.5rem, ${Math.min(17, 116 / texto.length)}cqw, 4.2rem)`,
            }}
          >
            {texto}
          </p>
          {pie && (
            <p
              className={cn(
                "text-eyebrow mt-3 font-sans tracking-[0.45em] opacity-80",
                m.texto,
              )}
            >
              {pie}
            </p>
          )}
        </div>
      </div>

      {/* Grain de esmalte (§5.3): feTurbulence al 4 % */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
      >
        <filter id={filtroId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filtroId})`} />
      </svg>

      {conBrillo && (
        <div
          aria-hidden="true"
          className="anim-brillo pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-tiza/60 to-transparent"
        />
      )}
    </div>
  );
}
