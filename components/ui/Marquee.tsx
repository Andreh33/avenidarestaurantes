"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Observer } from "gsap/Observer";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer); // registro local (D-005)
}

/**
 * Marquee de la casa (§15.12): lento, pausable al hover y con la velocidad
 * ligada a la del scroll (con tope ×3.2, decae a ×1 en 1,2 s).
 * Decorativo: aria-hidden + texto accesible aparte si hace falta.
 */
export function Marquee({
  items,
  className,
  duracion = 28,
}: {
  items: string[];
  className?: string;
  duracion?: number;
}) {
  const pista = useRef<HTMLDivElement>(null);
  const enHover = useRef(false);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      ease: "none",
      duration: duracion,
      repeat: -1,
    });

    const observer = Observer.create({
      type: "wheel,touch,scroll",
      onChangeY: (self) => {
        if (enHover.current) return;
        const factor = gsap.utils.clamp(
          1,
          3.2,
          1 + Math.abs(self.velocityY) / 900,
        );
        gsap.to(tween, {
          timeScale: factor,
          duration: 0.2,
          overwrite: true,
          onComplete: () => {
            gsap.to(tween, { timeScale: 1, duration: 1.2 });
          },
        });
      },
    });

    const contenedor = el.parentElement!;
    const pausar = () => {
      enHover.current = true;
      gsap.to(tween, { timeScale: 0, duration: 0.45, overwrite: true });
    };
    const seguir = () => {
      enHover.current = false;
      gsap.to(tween, { timeScale: 1, duration: 0.45, overwrite: true });
    };
    contenedor.addEventListener("mouseenter", pausar);
    contenedor.addEventListener("mouseleave", seguir);

    return () => {
      contenedor.removeEventListener("mouseenter", pausar);
      contenedor.removeEventListener("mouseleave", seguir);
      observer.kill();
      tween.kill();
    };
  }, [duracion]);

  // Dos mitades idénticas → xPercent -50 hace el bucle perfecto
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div ref={pista} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((mitad) => (
          <span key={mitad} className="flex items-center">
            {items.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="font-serif text-2xl italic sm:text-3xl">
                  {item}
                </span>
                <span className="mx-6 text-xl text-vermut sm:mx-8">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
