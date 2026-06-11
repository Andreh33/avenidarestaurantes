"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Botón magnético suave (§15.6): el contenido se desplaza ≤ 6 px hacia el
 * puntero y vuelve con muelle al salir. Solo punteros finos.
 */
export function Magnetico({ children }: { children: ReactNode }) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const aX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const aY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const mover = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      aX(gsap.utils.clamp(-6, 6, dx * 6));
      aY(gsap.utils.clamp(-6, 6, dy * 6));
    };
    const soltar = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", mover);
    el.addEventListener("mouseleave", soltar);
    return () => {
      el.removeEventListener("mousemove", mover);
      el.removeEventListener("mouseleave", soltar);
    };
  }, []);

  return (
    <div ref={raiz} className="inline-block">
      {children}
    </div>
  );
}
