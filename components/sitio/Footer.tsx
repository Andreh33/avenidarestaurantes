import Link from "next/link";
import { grupo } from "@/content/grupo";
import { restaurantes } from "@/content/restaurantes";
import { urlComoLlegar } from "@/lib/maps";
import { PlacaMini } from "@/components/placas/PlacaMini";
import { EstadoVivo } from "@/components/ui/EstadoVivo";
import {
  IconoFacebook,
  IconoInstagram,
  IconoMapa,
  IconoTelefono,
} from "@/components/ui/iconos";

/**
 * Footer del Paseo (§9 Acto VIII / §17 B4): noche, NAP idéntico carácter a
 * carácter al de content/ (§13.3), estado vivo por local, redes y legal.
 */
export function Footer() {
  return (
    <footer className="bg-noche text-tiza">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        {/* Marca */}
        <div className="mb-12">
          <PlacaMini className="text-tiza" />
          <p className="mt-4 max-w-xs font-serif text-xl italic text-tiza/85">
            {grupo.claim}
          </p>
          <p className="mt-3 font-sans text-sm text-tiza/60">
            La comida que siempre gana: la casera. Cuatro portales en Getafe.
          </p>
        </div>

        {/* NAP por local */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {restaurantes.map((r) => (
            <div key={r.slug} className="font-sans text-sm">
              <h3 className="font-display text-lg font-bold tracking-tight">
                {r.nombreCorto}
              </h3>
              <address className="mt-3 space-y-2 not-italic text-tiza/80">
                <p>
                  {r.direccion.calle}
                  <br />
                  {r.direccion.cp} {r.direccion.ciudad}
                </p>
                {r.telefonos.length === 0 && (
                  <p className="text-xs text-tiza/50">Teléfono en breve</p>
                )}
                {r.telefonos.map((t) => (
                  <p key={t.numero}>
                    <a
                      href={`tel:${t.numero}`}
                      className="enlace inline-flex items-center gap-2 font-medium text-tiza tabular-nums"
                    >
                      <IconoTelefono className="text-tungsteno" />
                      {t.visible}
                    </a>
                    {!t.confirmado && (
                      <span className="ml-2 text-xs text-tiza/50">
                        por confirmar
                      </span>
                    )}
                  </p>
                ))}
              </address>
              <EstadoVivo restaurante={r} className="mt-3 text-tiza/80" />
              <p className="mt-3">
                <a
                  href={urlComoLlegar(r)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace inline-flex items-center gap-2 text-tungsteno"
                >
                  <IconoMapa />
                  Cómo llegar
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Línea legal */}
        <div className="mt-12 flex flex-col gap-5 border-t border-tiza/15 pt-6 pb-[max(0px,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs text-tiza/60">
            <Link href="/aviso-legal" className="enlace">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="enlace">
              Privacidad
            </Link>
            <Link href="/cookies" className="enlace">
              Cookies
            </Link>
            <a
              href={`mailto:${grupo.email}`}
              className="enlace"
            >
              {grupo.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={grupo.redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Restaurantes Avenida"
              className="text-tiza/60 transition-colors hover:text-tiza"
            >
              <IconoFacebook className="h-5 w-5" />
            </a>
            <a
              href={grupo.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Restaurantes Avenida"
              className="text-tiza/60 transition-colors hover:text-tiza"
            >
              <IconoInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="mt-5 font-sans text-xs text-tiza/40">
          © {new Date().getFullYear()} {grupo.nombre} · Hecho en Getafe · Web
          por Latech · Pulsa{" "}
          <kbd className="rounded border border-tiza/25 px-1.5 py-0.5 font-sans text-[0.65rem]">
            R
          </kbd>{" "}
          para reservar
        </p>
      </div>
    </footer>
  );
}
