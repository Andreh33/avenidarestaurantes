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
/** Proyección lineal de las coordenadas reales al lienzo del mini-mapa. */
function calcularPortales() {
  const conGeo = restaurantes.filter((r) => r.geo);
  const lats = conGeo.map((r) => r.geo!.lat);
  const lngs = conGeo.map((r) => r.geo!.lng);
  const [latMin, latMax] = [Math.min(...lats), Math.max(...lats)];
  const [lngMin, lngMax] = [Math.min(...lngs), Math.max(...lngs)];
  const escalar = (v: number, min: number, max: number, a: number, b: number) =>
    max === min ? (a + b) / 2 : a + ((v - min) / (max - min)) * (b - a);

  return conGeo.map((r) => ({
    etiqueta: `Nº ${r.direccion.calle.match(/\d+/)?.[0] ?? ""} · ${r.nombreCorto}`,
    x: escalar(r.geo!.lng, lngMin, lngMax, 70, 290),
    y: escalar(r.geo!.lat, latMin, latMax, 150, 50),
    color:
      r.placa.matiz === "cobalto"
        ? "var(--color-cobalto)"
        : "var(--color-aceituna)",
  }));
}

const portales = calcularPortales();

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
          // Sin immediateRender: si no, este fromTo pinta «tarde» al cargar
          // la página y pisa el amanecer del hero.
          immediateRender: false,
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
                {r.telefonos.length === 0 && (
                  <p className="font-sans text-sm text-tiza/55">
                    Teléfono en breve — reserva por el formulario
                  </p>
                )}
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

          {/* Mini-mapa estático propio (§15.32): los portales geocodificados */}
          <svg
            viewBox="0 0 360 200"
            aria-label="Mapa esquemático de los locales del grupo en Getafe: calle Toledo 15, Hospital de San José 67 y calle Madrid 89"
            role="img"
            className="w-full max-w-sm"
          >
            <rect
              x="1"
              y="1"
              width="358"
              height="198"
              rx="14"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.15"
            />
            {/* calles */}
            <path
              d="M20 160 C 110 140, 240 80, 340 44"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="3"
              fill="none"
            />
            <path d="M60 36 L 110 180" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            <path d="M170 24 L 200 185" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            <path d="M260 18 L 280 170" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
            {portales.map((p) => (
              <g key={p.etiqueta}>
                <circle cx={p.x} cy={p.y} r="7" fill={p.color} />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="11"
                  fill="none"
                  stroke="var(--color-tungsteno)"
                  strokeOpacity="0.6"
                />
                <text
                  x={p.x}
                  y={p.y + 26}
                  textAnchor="middle"
                  fill="currentColor"
                  fillOpacity="0.8"
                  fontSize="11"
                  fontFamily="var(--font-instrument-sans)"
                >
                  {p.etiqueta}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </Container>
    </section>
  );
}
