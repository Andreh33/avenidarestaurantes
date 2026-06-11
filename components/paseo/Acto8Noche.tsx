"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { restaurantes } from "@/content/restaurantes";
import { Container } from "@/components/ui/Container";
import { PlacaAzulejo } from "@/components/placas/PlacaAzulejo";
import { TelCopiable } from "@/components/ui/TelCopiable";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import { Magnetico } from "@/components/motion/Magnetico";
import { ButtonLink } from "@/components/ui/Button";
import { urlComoLlegar } from "@/lib/maps";
import {
  IconoFlechaEnlace,
  IconoMapa,
  IconoWhatsApp,
} from "@/components/ui/iconos";

/**
 * ACTO VIII · Cae la noche (§9): el arco de luz termina en --noche con
 * scrub al entrar la sección; las placas se encienden (glow tungsteno, sin
 * parpadeo: esmalte, no neón). Reserva final con teléfonos grandes
 * click-to-call/copy, mini-mapa estático propio y enlaces Cómo llegar.
 */
export function Acto8Noche() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!raiz.current) return;

    const css = getComputedStyle(document.documentElement);
    const valor = (n: string) => css.getPropertyValue(n).trim();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        document.documentElement,
        { "--sky": valor("--sky-tarde"), "--light": valor("--light-tarde") },
        {
          "--sky": valor("--sky-noche"),
          "--light": valor("--light-noche"),
          ease: "none",
          scrollTrigger: {
            trigger: raiz.current,
            start: "top 95%",
            end: "top 35%",
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        "[data-noche-sec]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: raiz.current, start: "top 55%", once: true },
        },
      );
    }, raiz);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={raiz}
      aria-label="Cae la noche: reserva tu mesa"
      className="py-[clamp(5rem,11vw,9rem)] text-tiza"
    >
      <Container>
        <div data-noche-sec className="max-w-2xl opacity-0">
          <p className="text-eyebrow font-sans text-tungsteno uppercase">
            Cae la noche
          </p>
          <h2 className="text-titular font-display mt-4">
            Las placas se encienden.
            <br />
            Tu mesa te espera.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {restaurantes.map((r) => (
            <div
              data-noche-sec
              key={r.slug}
              className="rounded-(--radius-card) border border-tiza/12 p-7 opacity-0 sm:p-9"
            >
              <PlacaAzulejo
                eyebrow={r.placa.eyebrow}
                texto={r.placa.texto}
                pie={r.placa.pie}
                matiz={r.placa.matiz}
                encendida
                className="max-w-[13rem]"
              />
              <h3 className="font-display mt-6 text-xl font-bold">
                {r.nombre}
              </h3>
              <EstadoVivo restaurante={r} className="mt-2 text-tiza/75" />
              <div className="mt-5 space-y-3 text-2xl text-tungsteno sm:text-3xl">
                {r.telefonos.map((t) => (
                  <div key={t.numero}>
                    <TelCopiable telefono={t} />
                  </div>
                ))}
              </div>
              <a
                href={urlComoLlegar(r)}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace mt-5 inline-flex items-center gap-2 font-sans text-sm font-medium text-tiza/80"
              >
                <IconoMapa />
                Cómo llegar
                <IconoFlechaEnlace />
              </a>
            </div>
          ))}
        </div>

        <div
          data-noche-sec
          className="mt-12 flex flex-col items-start gap-10 opacity-0 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Magnetico>
              <ButtonLink href="/reservas" variante="vermut">
                <IconoWhatsApp />
                Reservar por WhatsApp o formulario
              </ButtonLink>
            </Magnetico>
            <Link
              href="/reservas"
              className="enlace font-sans text-sm font-medium text-tiza/75"
            >
              Todas las formas de reservar
            </Link>
          </div>

          {/* Mini-mapa estático propio (§15.32): la Avenida en dos portales */}
          <svg
            viewBox="0 0 360 180"
            aria-label="Mapa esquemático: Avenida Getafe Centro en calle Toledo 15 y Avenida Lavadero en calle Hospital de San José 67"
            role="img"
            className="w-full max-w-sm"
          >
            <rect
              x="1"
              y="1"
              width="358"
              height="178"
              rx="14"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.15"
            />
            {/* calles */}
            <path
              d="M20 140 C 110 120, 240 70, 340 38"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="3"
              fill="none"
            />
            <path d="M60 30 L 110 160" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            <path d="M170 20 L 200 165" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            <path d="M260 15 L 280 150" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            {/* portal Toledo 15 */}
            <g>
              <circle cx="96" cy="118" r="7" fill="var(--color-cobalto)" />
              <circle cx="96" cy="118" r="11" fill="none" stroke="var(--color-tungsteno)" strokeOpacity="0.6" />
              <text x="96" y="146" textAnchor="middle" fill="currentColor" fillOpacity="0.8" fontSize="11" fontFamily="var(--font-instrument-sans)">
                Nº 15 · Toledo
              </text>
            </g>
            {/* portal Lavadero 67 */}
            <g>
              <circle cx="268" cy="58" r="7" fill="var(--color-aceituna)" />
              <circle cx="268" cy="58" r="11" fill="none" stroke="var(--color-tungsteno)" strokeOpacity="0.6" />
              <text x="268" y="88" textAnchor="middle" fill="currentColor" fillOpacity="0.8" fontSize="11" fontFamily="var(--font-instrument-sans)">
                Nº 67 · Lavadero
              </text>
            </g>
          </svg>
        </div>
      </Container>
    </section>
  );
}
