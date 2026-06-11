"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { restaurantes } from "@/content/restaurantes";
import { FachadaCard } from "@/components/paseo/FachadaCard";
import { ButtonLink } from "@/components/ui/Button";
import { IconoFlechaEnlace } from "@/components/ui/iconos";

/**
 * ACTO III · El Paseo (§9) — sección firma.
 * Desktop (≥1024): pin horizontal con scrub 0.8; al avanzar entre locales
 * el arco de luz vira de mediodía a tarde dorada (tokens --sky/--light) y
 * la «línea de calle» inferior se rellena entre portales.
 * Móvil: pila vertical con cards sticky que se cubren — misma narrativa,
 * sin secuestrar el scroll táctil (§16.7).
 */
export function Acto3Paseo() {
  const raiz = useRef<HTMLElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const lineaFill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!raiz.current || !pista.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const distancia = () =>
        pista.current!.scrollWidth - window.innerWidth;

      // Keyframes del arco resueltos desde los tokens (cero hex aquí)
      const css = getComputedStyle(document.documentElement);
      const tarde = {
        "--sky": css.getPropertyValue("--sky-tarde").trim(),
        "--light": css.getPropertyValue("--light-tarde").trim(),
      };
      const manana = {
        "--sky": css.getPropertyValue("--sky-manana").trim(),
        "--light": css.getPropertyValue("--light-manana").trim(),
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: () => "+=" + distancia(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(pista.current, { x: () => -distancia(), ease: "none" }, 0);
      tl.fromTo(
        document.documentElement,
        manana,
        { ...tarde, ease: "none", duration: 1 },
        0,
      );
      if (lineaFill.current) {
        tl.fromTo(
          lineaFill.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 1 },
          0,
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={raiz}
      aria-label="El Paseo: nuestros locales"
      className="relative lg:h-svh lg:overflow-hidden"
    >
      <div
        ref={pista}
        className="flex flex-col gap-8 px-5 pt-10 pb-16 sm:px-8 lg:h-svh lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:p-0"
      >
        {/* Panel de apertura */}
        <div className="pb-4 lg:flex lg:h-full lg:w-[74vw] lg:shrink-0 lg:items-center lg:px-[8vw] lg:pb-0">
          <div className="max-w-xl">
            <p className="text-eyebrow font-sans text-vermut uppercase">
              El paseo
            </p>
            <h2 className="text-titular font-display mt-4 text-tinta">
              Dos portales,
              <br />
              <span className="text-cobalto">una misma casa</span>
            </h2>
            <p className="text-lead mt-5 text-tinta/75">
              De la calle Toledo a la plaza del Lavadero. Cada portal tiene su
              placa, su barra y su parroquia — y en los dos se come igual de
              bien.
            </p>
            <p
              aria-hidden="true"
              className="mt-8 hidden items-center gap-2 font-sans text-sm text-tinta/50 lg:inline-flex"
            >
              Sigue bajando: la calle es tuya
              <IconoFlechaEnlace className="rotate-45" />
            </p>
          </div>
        </div>

        {/* Fachadas (sticky en móvil: se cubren al scrollear) */}
        {restaurantes.map((r) => (
          <div
            key={r.slug}
            className="sticky top-20 lg:static lg:flex lg:h-full lg:w-[68vw] lg:shrink-0 lg:items-center lg:pr-[5vw]"
          >
            <div className="h-[66svh] min-h-[27rem] w-full lg:h-[70svh]">
              <FachadaCard restaurante={r} />
            </div>
          </div>
        ))}

        {/* Remate del paseo (solo desktop: cierre del pin) */}
        <div className="hidden lg:flex lg:h-full lg:w-[44vw] lg:shrink-0 lg:items-center lg:pr-[10vw]">
          <div>
            <p className="font-serif text-3xl italic text-tinta/85">
              ¿En cuál te sentamos hoy?
            </p>
            <ButtonLink href="/reservas" variante="vermut" className="mt-6">
              Reservar mesa
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Línea de calle con portales numerados (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-7 hidden lg:block"
      >
        <div className="relative mx-auto w-[64vw]">
          <div className="h-0.5 w-full rounded-full bg-tinta/15" />
          <div
            ref={lineaFill}
            className="absolute inset-0 origin-left rounded-full bg-cobalto"
            style={{ transform: "scaleX(0)" }}
          />
          {restaurantes.map((r, i) => {
            const numero = r.direccion.calle.match(/\d+/)?.[0] ?? "";
            const posicion =
              18 + (i * 68) / Math.max(1, restaurantes.length - 1);
            return (
              <span
                key={r.slug}
                className="absolute top-2 -translate-x-1/2 font-sans text-xs font-medium whitespace-nowrap text-tinta/50 tabular-nums"
                style={{ left: `${posicion}%` }}
              >
                Nº {numero} · {r.nombreCorto}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
