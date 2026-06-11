"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  // Registro local (no en lib/gsap.ts) para que SplitText solo viaje
  // en las rutas que lo usan (presupuesto §14).
  gsap.registerPlugin(SplitText);
}

/**
 * Titular kinetic de la casa: chars que suben con máscara de línea,
 * stagger 0.02, power4.out (§9 Acto I).
 *
 * Blindaje §16.1 («Saborsin»): type "lines,words,chars" preserva espacios,
 * y el texto accesible vive en aria-label del contenedor con el split
 * marcado aria-hidden.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  delay = 0,
  trigger = "scroll",
}: {
  as?: ElementType;
  children: string;
  className?: string;
  delay?: number;
  trigger?: "load" | "scroll";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;

    // Esperar a las fuentes evita splits con métricas falsas (§16.5)
    const arrancar = () => {
      if (!el.isConnected) return;
      split = new SplitText(el, {
        type: "lines,words,chars",
        mask: "lines",
        linesClass: "split-linea",
      });
      tween = gsap.from(split.chars, {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.02,
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: el, start: "top 85%", once: true }
            : undefined,
      });
    };

    document.fonts.ready.then(arrancar);

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [children, delay, trigger]);

  return (
    <Tag aria-label={children} className={cn("block", className)}>
      <span aria-hidden="true" ref={ref} className="block">
        {children}
      </span>
    </Tag>
  );
}
