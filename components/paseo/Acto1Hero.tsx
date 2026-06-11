"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";
import { useUi } from "@/lib/stores/ui";
import { restaurantes } from "@/content/restaurantes";
import { ButtonLink } from "@/components/ui/Button";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { Reloj } from "@/components/ui/Reloj";
import { PlacaAzulejo } from "@/components/placas/PlacaAzulejo";
import { IconoReloj } from "@/components/ui/iconos";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText); // registro local (D-005)
}

/**
 * ACTO I · Amanece en la Avenida (§9): hero 100svh con cielo en su punto
 * marfil, titular kinetic en 3 líneas (SplitText chars, stagger 0.02,
 * power4.out), collage de placas con parallax de scroll + puntero
 * (sin fotos hasta B2 — Ley 4: tipografía, color y placas), estado vivo,
 * reloj de Madrid y banderilla como scroll-cue.
 */
export function Acto1Hero() {
  const preloaderHecho = useUi((s) => s.preloaderHecho);
  const raiz = useRef<HTMLElement>(null);
  const titulo = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!preloaderHecho || !raiz.current) return;

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      // Parallax de scroll en las capas del collage (solo transform, Ley 7)
      gsap.to("[data-capa='1']", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to("[data-capa='2']", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      // La banderilla se desvanece al empezar el paseo
      gsap.to("[data-cue]", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: "18% top",
          scrub: true,
        },
      });
    }, raiz);

    // Intro tras fuentes listas (§16.5/§16.13)
    document.fonts.ready.then(() => {
      if (!titulo.current?.isConnected) return;
      split = new SplitText(titulo.current, {
        type: "lines,words,chars",
        mask: "lines",
      });
      gsap.set(titulo.current, { opacity: 1 });
      gsap.from(split.chars, {
        yPercent: 115,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.02,
      });
      gsap.fromTo(
        "[data-hero-sec]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.09, delay: 0.5 },
      );
    });

    // Parallax de puntero, solo desktop (≤ 12 px, capas a distinta profundidad)
    let quitarPuntero: (() => void) | undefined;
    if (window.matchMedia("(pointer: fine)").matches) {
      const capas = gsap.utils.toArray<HTMLElement>("[data-profundidad]", raiz.current);
      const movimientos = capas.map((capa) => {
        const factor = Number(capa.dataset.profundidad);
        return {
          x: gsap.quickTo(capa, "x", { duration: 0.6, ease: "power3.out" }),
          y: gsap.quickTo(capa, "y", { duration: 0.6, ease: "power3.out" }),
          factor,
        };
      });
      const alMover = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        for (const m of movimientos) {
          m.x(nx * 12 * m.factor);
          m.y(ny * 8 * m.factor);
        }
      };
      window.addEventListener("mousemove", alMover, { passive: true });
      quitarPuntero = () => window.removeEventListener("mousemove", alMover);
    }

    return () => {
      quitarPuntero?.();
      split?.revert();
      ctx.revert();
    };
  }, [preloaderHecho]);

  const centro = restaurantes[0];

  return (
    <section
      ref={raiz}
      aria-label="Amanece en la Avenida"
      className="relative -mt-16 flex min-h-svh flex-col justify-center overflow-hidden pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Columna texto */}
        <div>
          <div
            data-hero-sec
            className="flex flex-wrap items-center gap-x-5 gap-y-2 opacity-0"
          >
            <span className="inline-flex items-center rounded-full border border-tinta/12 bg-tiza/80 px-4 py-2 shadow-flotante">
              <EstadoVivo restaurante={centro} className="text-tinta/85" />
            </span>
            <span className="inline-flex items-center gap-2 font-sans text-sm text-tinta/60">
              <IconoReloj />
              <Reloj /> en Getafe
            </span>
          </div>

          <h1
            ref={titulo}
            aria-label="La Avenida de Getafe. Calidad al mejor precio."
            className="font-display mt-6 text-[clamp(2.5rem,6.4vw,5.9rem)] leading-[0.97] font-extrabold tracking-[-0.02em] text-tinta opacity-0"
          >
            LA AVENIDA
            <br />
            <span className="text-cobalto">DE GETAFE</span>
            <br />
            <span className="font-serif text-[0.42em] font-normal tracking-normal italic text-vermut">
              calidad al mejor precio
            </span>
          </h1>

          <p
            data-hero-sec
            className="text-lead mt-5 max-w-xl text-tinta/75 opacity-0"
          >
            Del café de las ocho a la última caña de medianoche: menú del día,
            tapas, raciones y la comida que siempre gana — la casera.
          </p>

          <div data-hero-sec className="mt-8 flex flex-wrap gap-4 opacity-0">
            <ButtonLink href="/reservas" variante="vermut">
              Reservar mesa
            </ButtonLink>
            <ButtonLink href="/carta" variante="fantasma">
              Ver la carta
            </ButtonLink>
          </div>
        </div>

        {/* Collage de placas con profundidad (fotos reales cuando llegue B2) */}
        <div
          data-hero-sec
          aria-hidden="true"
          className="relative h-[300px] opacity-0 select-none sm:h-[360px] lg:h-[480px]"
        >
          <span className="font-display pointer-events-none absolute -top-6 right-0 text-[16rem] leading-none font-extrabold text-cobalto/6 lg:text-[22rem]">
            A
          </span>
          <div data-capa="1" className="absolute top-[8%] left-[2%] w-[68%] max-w-[340px]">
            <div data-profundidad="1">
              <PlacaAzulejo
                eyebrow="RESTAURANTES"
                texto="AVENIDA"
                pie="GETAFE"
                className="-rotate-3 shadow-placa"
              />
            </div>
          </div>
          <div data-capa="2" className="absolute right-0 bottom-[4%] w-[58%] max-w-[300px]">
            <div data-profundidad="1.7">
              <PlacaAzulejo
                eyebrow="AVENIDA"
                texto="LAVADERO"
                pie="GETAFE"
                matiz="aceituna"
                className="rotate-2 shadow-placa"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll-cue: palillo de banderilla que oscila */}
      <div
        data-cue
        data-hero-sec
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-tinta/50 opacity-0"
      >
        <span className="text-eyebrow font-sans uppercase">
          El paseo empieza aquí
        </span>
        <svg
          width="16"
          height="48"
          viewBox="0 0 16 48"
          fill="none"
          className="anim-banderilla origin-top"
        >
          <line
            x1="8"
            y1="1"
            x2="8"
            y2="38"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M8 5 L15 8.5 L8 12 Z" fill="var(--color-cobalto)" />
          <circle cx="8" cy="42" r="3.5" fill="var(--color-aceituna)" />
        </svg>
      </div>
    </section>
  );
}
