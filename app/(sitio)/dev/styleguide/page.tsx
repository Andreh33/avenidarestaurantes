import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PlacaAzulejo } from "@/components/placas/PlacaAzulejo";
import { SplitHeading } from "@/components/motion/SplitHeading";
import {
  IconoTelefono,
  IconoWhatsApp,
  IconoMapa,
  IconoReloj,
  IconoTenedor,
  IconoCana,
  IconoLlama,
  IconoPlaca,
  IconoGirando,
} from "@/components/ui/iconos";

export const metadata: Metadata = {
  title: "Styleguide Â· interno",
  robots: { index: false, follow: false },
};

const paleta = [
  { nombre: "hueso", clase: "bg-hueso", hex: "#F7F3EB", claro: true },
  { nombre: "cobalto", clase: "bg-cobalto", hex: "#1E40AF" },
  { nombre: "vermut", clase: "bg-vermut", hex: "#C2410C" },
  { nombre: "aceituna", clase: "bg-aceituna", hex: "#4D5B3F" },
  { nombre: "noche", clase: "bg-noche", hex: "#0B1B33" },
  { nombre: "tinta", clase: "bg-tinta", hex: "#16213A" },
  { nombre: "tiza", clase: "bg-tiza", hex: "#FDFBF7", claro: true },
  { nombre: "tungsteno", clase: "bg-tungsteno", hex: "#FFC46E", claro: true },
];

const iconos = [
  { nombre: "telefono", icono: <IconoTelefono /> },
  { nombre: "whatsapp", icono: <IconoWhatsApp /> },
  { nombre: "mapa", icono: <IconoMapa /> },
  { nombre: "reloj", icono: <IconoReloj /> },
  { nombre: "tenedor", icono: <IconoTenedor /> },
  { nombre: "caÃ±a", icono: <IconoCana /> },
  { nombre: "llama", icono: <IconoLlama /> },
  { nombre: "placa", icono: <IconoPlaca /> },
  { nombre: "girando", icono: <IconoGirando /> },
];

function Rotulo({ children }: { children: string }) {
  return (
    <p className="text-eyebrow mb-6 font-sans text-cobalto uppercase">
      {children}
    </p>
  );
}

export default function Styleguide() {
  return (
    <div>
      {/* ===== Cabecera ===== */}
      <Section className="border-b border-tinta/10">
        <Container>
          <p className="text-eyebrow font-sans text-vermut uppercase">
            Interno Â· B1
          </p>
          <h1 className="text-titular font-display mt-3">
            Styleguide del sistema
          </h1>
          <p className="text-lead mt-4 max-w-2xl text-tinta/70">
            Tokens, tipografÃ­a, placas y componentes base de Â«El PaseoÂ».
            Todo lo que se construya a partir de aquÃ­ sale de esta pÃ¡gina.
          </p>
        </Container>
      </Section>

      {/* ===== Placas ===== */}
      <Section className="border-b border-tinta/10">
        <Container>
          <Rotulo>Sistema de placas</Rotulo>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-3">
              <PlacaAzulejo
                eyebrow="RESTAURANTES"
                texto="AVENIDA"
                pie="GETAFE"
                conBrillo
              />
              <p className="text-sm text-tinta/60">
                Grupo / Centro Â· matiz cobalto Â· con brillo de carga
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <PlacaAzulejo
                eyebrow="AVENIDA"
                texto="LAVADERO"
                pie="GETAFE"
                matiz="aceituna"
              />
              <p className="text-sm text-tinta/60">
                Lavadero Â· propuesta matiz aceituna (decisiÃ³n en B2 con fotos)
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-(--radius-card) bg-noche p-6">
              <PlacaAzulejo eyebrow="RESTAURANTES" texto="AVENIDA" pie="GETAFE" encendida />
              <p className="text-sm text-tiza/60">
                Encendida Â· glow tungsteno (Acto VIII, noche)
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Paleta ===== */}
      <Section className="border-b border-tinta/10">
        <Container>
          <Rotulo>Paleta â€” tokens Â§5.1</Rotulo>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {paleta.map((c) => (
              <div
                key={c.nombre}
                className={`${c.clase} flex aspect-[4/3] flex-col justify-end rounded-(--radius-card) p-4 ${
                  c.claro
                    ? "border border-tinta/10 text-tinta"
                    : "text-tiza"
                }`}
              >
                <p className="font-sans text-sm font-semibold">--{c.nombre}</p>
                <p className="font-sans text-xs tabular-nums opacity-70">
                  {c.hex}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== TipografÃ­a ===== */}
      <Section className="border-b border-tinta/10">
        <Container className="space-y-10">
          <Rotulo>TipografÃ­a â€” escala fluida Â§5.2</Rotulo>

          <div>
            <p className="mb-2 text-sm text-tinta/50">
              display Â· Bricolage Grotesque 800
            </p>
            <p className="text-display font-display text-tinta">LA AVENIDA</p>
          </div>

          <div>
            <p className="mb-2 text-sm text-tinta/50">
              titular Â· Bricolage Grotesque 700
            </p>
            <p className="text-titular font-display text-tinta">
              De la barra a la sobremesa
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-tinta/50">
              rotulo Â· Bricolage Grotesque 700
            </p>
            <p className="text-rotulo font-display text-tinta">
              Raciones de toda la vida
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-tinta/50">
              editorial Â· Instrument Serif italic
            </p>
            <p className="font-serif text-3xl italic">
              la casera, la que siempre gana
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-tinta/50">lead Â· Instrument Sans</p>
            <p className="text-lead max-w-2xl text-tinta/80">
              Trato familiar y acogedor en este rincÃ³n de Getafe. MenÃº diario,
              aperitivos, raciones y todo lo que necesites.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-tinta/50">eyebrow + precios en tabular (Â§15.14)</p>
            <p className="text-eyebrow font-sans text-cobalto uppercase">
              Desde las ocho de la maÃ±ana
            </p>
            <div className="mt-4 flex max-w-xs flex-col gap-1 font-sans tabular-nums">
              <p className="flex justify-between border-b border-tinta/10 pb-1">
                <span>[PENDIENTE: plato]</span>
                <span className="font-semibold">12,50 â‚¬</span>
              </p>
              <p className="flex justify-between border-b border-tinta/10 pb-1">
                <span>[PENDIENTE: plato]</span>
                <span className="font-semibold">9,80 â‚¬</span>
              </p>
              <p className="flex justify-between">
                <span>[PENDIENTE: plato]</span>
                <span className="font-semibold">4,00 â‚¬</span>
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== SplitHeading ===== */}
      <Section className="border-b border-tinta/10">
        <Container>
          <Rotulo>SplitHeading â€” titular kinetic (verifica espacios, Â§16.1)</Rotulo>
          <SplitHeading
            as="p"
            className="text-display font-display text-cobalto"
            trigger="scroll"
          >
            CALIDAD AL MEJOR PRECIO
          </SplitHeading>
        </Container>
      </Section>

      {/* ===== Botones ===== */}
      <Section className="border-b border-tinta/10">
        <Container className="space-y-8">
          <Rotulo>Botones â€” todos los estados (Ley 5)</Rotulo>

          <div className="flex flex-wrap items-center gap-4">
            <Button variante="vermut">Reservar mesa</Button>
            <Button variante="cobalto">Ver la carta</Button>
            <Button variante="fantasma">CÃ³mo llegar</Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button variante="vermut" loading>
              Enviando reserva
            </Button>
            <Button variante="cobalto" disabled>
              No disponible
            </Button>
            <Button variante="vermut">
              <IconoWhatsApp />
              Reservar por WhatsApp
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <ButtonLink href="/dev/styleguide" variante="fantasma">
              Como enlace (next/link)
            </ButtonLink>
            <a href="#top" className="enlace font-medium text-cobalto">
              Enlace con subrayado animado
            </a>
          </div>

          <p className="max-w-xl text-sm text-tinta/60">
            Hover: âˆ’1px y matiz Â· Active: scale 0.97 Â· Focus: anillo doble
            esmalte cobalto (prueba con tabulador) Â· Loading: spinner propio Â·
            Disabled: 45 % â€” el magnÃ©tico (â‰¤ 6 px) llega en B20.
          </p>
        </Container>
      </Section>

      {/* ===== Iconos ===== */}
      <Section className="border-b border-tinta/10">
        <Container>
          <Rotulo>IconografÃ­a propia â€” trazo 1.5, SVG inline (Ley 6)</Rotulo>
          <div className="flex flex-wrap gap-6">
            {iconos.map((i) => (
              <div
                key={i.nombre}
                className="flex w-24 flex-col items-center gap-2 rounded-(--radius-card) border border-tinta/10 p-4 text-cobalto"
              >
                <span className="text-2xl">{i.icono}</span>
                <span className="font-sans text-xs text-tinta/60">
                  {i.nombre}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== Noche ===== */}
      <Section className="bg-noche">
        <Container>
          <Rotulo>Sobre noche â€” contraste AA</Rotulo>
          <h2 className="text-titular font-display text-tiza">
            Cae la noche en la Avenida
          </h2>
          <p className="text-lead mt-4 max-w-2xl text-tiza/75">
            Texto tiza sobre azul noche profundo. JamÃ¡s negro puro. Las sombras
            de noche son cÃ¡lidas; el glow, tungsteno.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variante="vermut">Reservar mesa</Button>
            <a href="#top" className="enlace font-medium text-tungsteno">
              LÃ©enos en Google Maps
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
