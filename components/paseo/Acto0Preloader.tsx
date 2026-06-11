"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Flip } from "gsap/Flip";
import { getLenis } from "@/lib/lenis";
import { useUi } from "@/lib/stores/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip); // registro local (D-005)
}

const CHARS = "AVENIDA".split("");
const CLAVE_SESION = "placa-vista";

/**
 * ACTO 0 · La placa (§9): preloader de máx. 2,2 s, solo 1ª visita por
 * sesión. La cenefa cobalto se traza, AVENIDA sube por chars enmascarados,
 * un brillo especular barre en diagonal y la placa vuela (Flip) hasta la
 * placa mini del header. Contador estilo número de portal: Nº 15 (Toledo 15).
 */
export function Acto0Preloader() {
  const marcarPreloaderHecho = useUi((s) => s.marcarPreloaderHecho);
  const [activo, setActivo] = useState<boolean | null>(null);
  const raiz = useRef<HTMLDivElement>(null);
  const placa = useRef<HTMLDivElement>(null);
  const contador = useRef<HTMLParagraphElement>(null);

  // Decidir en cliente: ¿primera visita de la sesión? (try/catch §16.14)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      let vista = false;
      try {
        vista = sessionStorage.getItem(CLAVE_SESION) === "1";
      } catch {
        // Safari privado: sin sessionStorage, el preloader se muestra siempre
      }
      if (vista) {
        marcarPreloaderHecho();
        setActivo(false);
      } else {
        setActivo(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [marcarPreloaderHecho]);

  useEffect(() => {
    if (!activo || !raiz.current) return;

    try {
      sessionStorage.setItem(CLAVE_SESION, "1");
    } catch {}

    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";

    const soltarScroll = () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Contador de portal: Nº 01 → Nº 15
      const num = { n: 1 };
      tl.to(
        num,
        {
          n: 15,
          duration: 0.85,
          ease: "steps(14)",
          onUpdate: () => {
            if (contador.current) {
              contador.current.textContent = `Nº ${String(Math.round(num.n)).padStart(2, "0")}`;
            }
          },
        },
        0,
      );

      // La cenefa se traza (stroke-dashoffset sobre pathLength normalizado)
      tl.fromTo(
        "[data-cenefa]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.95, ease: "power2.inOut", stagger: 0.12 },
        0,
      );

      // Eyebrow y pie aparecen
      tl.fromTo(
        "[data-placa-texto-suave]",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        0.55,
      );

      // AVENIDA sube por chars, enmascarado por línea
      tl.fromTo(
        "[data-char]",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.55, stagger: 0.04 },
        0.4,
      );

      // Brillo de esmalte en diagonal
      tl.fromTo(
        "[data-brillo]",
        { xPercent: -140 },
        { xPercent: 280, duration: 0.5, ease: "power1.inOut" },
        1.05,
      );

      // Flip: la placa vuela a su sitio en el header
      tl.add(() => {
        const objetivo = document.querySelector("[data-placa-header]");
        if (objetivo && placa.current) {
          Flip.fit(placa.current, objetivo, {
            duration: 0.55,
            ease: "power3.inOut",
            scale: true,
            absolute: true,
          });
        }
      }, 1.45);

      tl.to(raiz.current, { opacity: 0, duration: 0.35, ease: "power1.in" }, 1.85);

      tl.add(() => {
        soltarScroll();
        marcarPreloaderHecho();
        setActivo(false);
      }, 2.2);
    }, raiz);

    return () => {
      ctx.revert();
      soltarScroll();
    };
  }, [activo, marcarPreloaderHecho]);

  if (!activo) return null;

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-hueso"
    >
      <div
        ref={placa}
        className="relative w-[min(78vw,22rem)] overflow-hidden rounded-(--radius-placa) bg-gradient-to-br from-tiza to-hueso shadow-placa"
      >
        {/* Cenefa trazable */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect
            data-cenefa
            stroke="var(--color-cobalto)"
            strokeWidth="5"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{
              x: 12,
              y: 12,
              width: "calc(100% - 24px)",
              height: "calc(100% - 24px)",
              rx: 8,
            } as React.CSSProperties}
          />
          <rect
            data-cenefa
            stroke="var(--color-cobalto)"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{
              x: 21,
              y: 21,
              width: "calc(100% - 42px)",
              height: "calc(100% - 42px)",
              rx: 5,
            } as React.CSSProperties}
          />
        </svg>

        <div className="px-8 py-12 text-center">
          <p
            data-placa-texto-suave
            className="text-eyebrow font-sans text-cobalto"
          >
            RESTAURANTES
          </p>
          <p
            className="font-display mt-2 overflow-hidden text-[clamp(2.4rem,16cqw,3.8rem)] leading-none font-extrabold tracking-tight text-cobalto"
            aria-hidden="true"
          >
            {CHARS.map((c, i) => (
              <span key={i} data-char className="inline-block will-change-transform">
                {c}
              </span>
            ))}
          </p>
          <p
            data-placa-texto-suave
            className="text-eyebrow mt-3 font-sans tracking-[0.45em] text-cobalto/80"
          >
            GETAFE
          </p>
        </div>

        {/* Brillo especular */}
        <div
          data-brillo
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-tiza/70 to-transparent"
        />
      </div>

      <p
        ref={contador}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-sm font-medium text-tinta/45 tabular-nums"
      >
        Nº 01
      </p>
    </div>
  );
}
