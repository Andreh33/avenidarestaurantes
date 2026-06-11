"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Cursor propio (§15.5): punto + anillo que crece sobre interactivos.
 * Solo punteros finos; en táctil no se monta. Transform-only + quickTo.
 */
export function Cursor() {
  const punto = useRef<HTMLDivElement>(null);
  const anillo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!punto.current || !anillo.current) return;

    document.documentElement.classList.add("con-cursor-propio");

    const pX = gsap.quickTo(punto.current, "x", { duration: 0.08, ease: "power2.out" });
    const pY = gsap.quickTo(punto.current, "y", { duration: 0.08, ease: "power2.out" });
    const aX = gsap.quickTo(anillo.current, "x", { duration: 0.35, ease: "power3.out" });
    const aY = gsap.quickTo(anillo.current, "y", { duration: 0.35, ease: "power3.out" });

    const mover = (e: MouseEvent) => {
      pX(e.clientX);
      pY(e.clientY);
      aX(e.clientX);
      aY(e.clientY);
      const interactivo = (e.target as Element | null)?.closest(
        "a, button, input, select, textarea, label, [role='button']",
      );
      gsap.to(anillo.current, {
        scale: interactivo ? 2 : 1,
        opacity: interactivo ? 0.45 : 1,
        duration: 0.25,
        overwrite: "auto",
      });
    };
    const pulsar = () => gsap.to(punto.current, { scale: 0.6, duration: 0.15 });
    const soltar = () => gsap.to(punto.current, { scale: 1, duration: 0.2 });

    window.addEventListener("mousemove", mover, { passive: true });
    window.addEventListener("mousedown", pulsar);
    window.addEventListener("mouseup", soltar);
    return () => {
      document.documentElement.classList.remove("con-cursor-propio");
      window.removeEventListener("mousemove", mover);
      window.removeEventListener("mousedown", pulsar);
      window.removeEventListener("mouseup", soltar);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95] hidden lg:block">
      <div
        ref={anillo}
        className="absolute -top-4 -left-4 h-8 w-8 rounded-full border-[1.5px] border-cobalto"
      />
      <div
        ref={punto}
        className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-cobalto"
      />
    </div>
  );
}
