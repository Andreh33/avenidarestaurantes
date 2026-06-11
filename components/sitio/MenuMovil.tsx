"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { restaurantes } from "@/content/restaurantes";
import { grupo } from "@/content/grupo";
import { useUi } from "@/lib/stores/ui";
import { getLenis } from "@/lib/lenis";
import { IconoFacebook, IconoInstagram } from "@/components/ui/iconos";

const enlaces = [
  { href: "/", etiqueta: "Inicio" },
  ...restaurantes.map((r) => ({
    href: `/restaurantes/${r.slug}`,
    etiqueta: r.nombreCorto,
  })),
  { href: "/carta", etiqueta: "La carta" },
  { href: "/menu-del-dia", etiqueta: "Menú del día" },
  { href: "/eventos", etiqueta: "Eventos" },
  { href: "/catering", etiqueta: "Catering" },
  { href: "/asados", etiqueta: "Asados para llevar" },
  { href: "/reservas", etiqueta: "Reservar mesa", destacado: true },
];

const lista = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};

const item = {
  oculto: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Menú móvil a pantalla completa con stagger (§17 B4). Micro-UI = Motion (§6). */
export function MenuMovil() {
  const { menuAbierto, cerrarMenu } = useUi();

  // Bloquear el scroll (Lenis + nativo) mientras está abierto
  useEffect(() => {
    if (!menuAbierto) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
  }, [menuAbierto]);

  // Esc cierra (Ley 10)
  useEffect(() => {
    if (!menuAbierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarMenu();
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [menuAbierto, cerrarMenu]);

  return (
    <AnimatePresence>
      {menuAbierto && (
        <motion.div
          id="menu-movil"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-40 flex flex-col bg-noche text-tiza md:hidden"
        >
          <nav
            aria-label="Menú móvil"
            className="flex flex-1 flex-col justify-center overflow-y-auto px-8 pt-20 pb-6"
          >
            <motion.ul
              variants={lista}
              initial="oculto"
              animate="visible"
              className="space-y-1"
            >
              {enlaces.map((e) => (
                <motion.li key={e.href} variants={item}>
                  <Link
                    href={e.href}
                    onClick={cerrarMenu}
                    className={
                      "destacado" in e && e.destacado
                        ? "font-display mt-4 inline-block text-3xl font-extrabold tracking-tight text-tungsteno"
                        : "font-display inline-block py-1 text-3xl font-bold tracking-tight"
                    }
                  >
                    {e.etiqueta}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.55 } }}
            exit={{ opacity: 0 }}
            className="border-t border-tiza/15 px-8 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1 font-sans text-xs text-tiza/70">
                {restaurantes.map((r) => (
                  <p key={r.slug}>
                    <span className="font-semibold text-tiza/90">
                      {r.nombreCorto}
                    </span>{" "}
                    · {r.direccion.calle}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <a
                  href={grupo.redes.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de Restaurantes Avenida"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-tiza/20 text-tiza/80 transition-colors hover:border-tiza/50"
                >
                  <IconoFacebook />
                </a>
                <a
                  href={grupo.redes.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Restaurantes Avenida"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-tiza/20 text-tiza/80 transition-colors hover:border-tiza/50"
                >
                  <IconoInstagram />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
