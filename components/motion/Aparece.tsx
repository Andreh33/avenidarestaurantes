"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Revelado al entrar en viewport: fade + subida suave, con stagger sobre
 * los hijos directos marcados [data-aparece]. Solo transform/opacity.
 */
export function Aparece({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!raiz.current) return;
    const hijos = raiz.current.querySelectorAll("[data-aparece]");
    const objetivos = hijos.length ? hijos : [raiz.current];
    const tween = gsap.fromTo(
      objetivos,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: raiz.current, start: "top 82%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [stagger]);

  return (
    <div ref={raiz} className={cn(className)}>
      {children}
    </div>
  );
}
