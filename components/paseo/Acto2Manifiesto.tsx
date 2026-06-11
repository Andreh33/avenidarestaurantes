"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText); // registro local (D-005)
}

/**
 * ACTO II · El manifiesto (§9): el copy real de Facebook del cliente,
 * palabra a palabra con scrub. Las palabras pasan de 0.15 a 1 de opacidad
 * al ritmo del scroll y «la casera» vira a vermut al cerrar la frase.
 */
const FRASE =
  "La gastronomía es un mundo inmenso y variado. Pero hay una comida que siempre gana: la casera.";

export function Acto2Manifiesto() {
  const raiz = useRef<HTMLElement>(null);
  const texto = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!raiz.current || !texto.current) return;

    let split: SplitText | null = null;
    let tl: gsap.core.Timeline | null = null;

    document.fonts.ready.then(() => {
      if (!texto.current?.isConnected) return;

      split = new SplitText(texto.current, { type: "words" });
      const remate = split.words.filter((w) =>
        ["la", "casera."].includes(w.textContent ?? ""),
      );
      // Solo el «la casera.» final (las últimas dos palabras)
      const casera = remate.slice(-2);

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: raiz.current,
          start: "top 72%",
          end: "center 45%",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        split.words,
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.35, duration: 1, ease: "none" },
      );
      tl.to(
        casera,
        { color: "var(--color-vermut)", duration: 2, ease: "none" },
        ">-1.2",
      );
    });

    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
      split?.revert();
    };
  }, []);

  return (
    <section
      ref={raiz}
      aria-label="El manifiesto"
      className="flex min-h-[75svh] items-center"
    >
      <div className="mx-auto w-full max-w-4xl px-5 py-24 sm:px-8">
        <p className="text-eyebrow mb-8 font-sans text-cobalto uppercase">
          Lo decimos nosotros, palabra por palabra
        </p>
        <p
          ref={texto}
          aria-label={FRASE}
          className="font-serif text-[clamp(1.9rem,4.6vw,3.7rem)] leading-[1.2] text-tinta"
        >
          La gastronomía es un mundo inmenso y variado. Pero hay una comida
          que siempre gana: <em className="italic">la casera.</em>
        </p>
      </div>
    </section>
  );
}
