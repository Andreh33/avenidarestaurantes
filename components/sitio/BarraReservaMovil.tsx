"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Restaurante } from "@/content/schemas";
import { IconoTelefono, IconoWhatsApp } from "@/components/ui/iconos";
import { cn } from "@/lib/cn";

/**
 * Barra sticky inferior de reserva en móvil (§10, §12.3): Llamar | Reservar.
 * Aparece tras pasar el hero, respeta safe-area (§15.31).
 */
export function BarraReservaMovil({
  restaurante,
}: {
  restaurante: Restaurante;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const alScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setVisible(window.scrollY > window.innerHeight * 0.55),
      );
    };
    window.addEventListener("scroll", alScroll, { passive: true });
    alScroll();
    return () => {
      window.removeEventListener("scroll", alScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Local sin teléfono publicado (P4): la barra ofrece solo Reservar
  const tel = restaurante.telefonos[0];

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-(--ease-esmalte) lg:hidden",
        visible ? "translate-y-0" : "translate-y-[120%]",
      )}
    >
      <div className="mx-auto flex max-w-md gap-2 rounded-(--radius-card) border border-tinta/10 bg-tiza p-2 shadow-placa">
        {tel && (
          <a
            href={`tel:${tel.numero}`}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-cobalto font-sans text-sm font-semibold text-tiza active:scale-[0.97]"
          >
            <IconoTelefono />
            Llamar
          </a>
        )}
        <Link
          href="/reservas"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-vermut font-sans text-sm font-semibold text-tiza active:scale-[0.97]"
        >
          <IconoWhatsApp />
          Reservar
        </Link>
      </div>
    </div>
  );
}
