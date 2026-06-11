"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PlacaMini } from "@/components/placas/PlacaMini";
import { ButtonLink } from "@/components/ui/Button";
import { MenuMovil } from "@/components/sitio/MenuMovil";
import { useUi } from "@/lib/stores/ui";
import { cn } from "@/lib/cn";

const enlacesNav = [
  { href: "/carta", etiqueta: "La carta" },
  { href: "/menu-del-dia", etiqueta: "Menú del día" },
  { href: "/eventos", etiqueta: "Eventos" },
] as const;

/**
 * Header de la casa (§17 B4): placa mini, nav, CTA Reservar.
 * Se esconde al bajar y asoma al subir; sombra solo con scroll (§15.37).
 */
export function Header() {
  const { menuAbierto, abrirMenu, cerrarMenu } = useUi();
  const [oculto, setOculto] = useState(false);
  const [conSombra, setConSombra] = useState(false);
  const ultimoY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const alScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setConSombra(y > 8);
        if (y > ultimoY.current + 4 && y > 80) setOculto(true);
        else if (y < ultimoY.current - 4) setOculto(false);
        ultimoY.current = y;
      });
    };
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const visible = !oculto || menuAbierto;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-(--ease-esmalte)",
          !visible && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "transition-[background-color,box-shadow] duration-300",
            menuAbierto
              ? "bg-transparent text-tiza"
              : "bg-hueso/95 text-tinta",
            conSombra && !menuAbierto && "shadow-flotante",
          )}
        >
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
            <Link
              href="/"
              aria-label="Restaurantes Avenida — inicio"
              onClick={cerrarMenu}
              data-placa-header
              className={cn(
                "transition-colors",
                menuAbierto ? "text-tiza" : "text-cobalto",
              )}
            >
              <PlacaMini />
            </Link>

            <nav
              aria-label="Principal"
              className="hidden items-center gap-7 md:flex"
            >
              {enlacesNav.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className="enlace text-sm font-medium"
                >
                  {e.etiqueta}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Visible también en móvil: reservar a un toque en toda página (§12.3) */}
              <ButtonLink
                href="/reservas"
                variante="vermut"
                className="min-h-10 px-4 py-2 text-sm sm:px-5"
              >
                Reservar mesa
              </ButtonLink>

              <button
                type="button"
                onClick={menuAbierto ? cerrarMenu : abrirMenu}
                aria-expanded={menuAbierto}
                aria-controls="menu-movil"
                aria-label={menuAbierto ? "Cerrar el menú" : "Abrir el menú"}
                className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-[10px] md:hidden"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-(--ease-esmalte)",
                    menuAbierto && "translate-y-1 rotate-45",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-(--ease-esmalte)",
                    menuAbierto && "-translate-y-1 -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MenuMovil />
    </>
  );
}
