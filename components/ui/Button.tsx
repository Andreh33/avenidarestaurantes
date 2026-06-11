import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconoGirando } from "@/components/ui/iconos";

/**
 * Botón de la casa con todos sus estados diseñados (Ley 5):
 * hover, focus-visible (anillo doble global), active, loading y disabled.
 * Vermut = solo acción primaria (escasez = jerarquía, §5.1).
 */

type Variante = "vermut" | "cobalto" | "fantasma";

const base = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-6 py-3",
  "font-sans text-sm font-semibold sm:text-base",
  "transition-[transform,background-color,border-color,box-shadow,opacity] duration-200 ease-(--ease-esmalte)",
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.97]",
  "disabled:pointer-events-none disabled:opacity-45",
);

const variantes: Record<Variante, string> = {
  vermut: "bg-vermut text-tiza shadow-flotante hover:bg-vermut/90",
  cobalto: "bg-cobalto text-tiza shadow-flotante hover:bg-cobalto/90",
  fantasma:
    "border border-tinta/25 bg-transparent text-tinta hover:border-tinta/60",
};

type PropsComunes = {
  variante?: Variante;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variante = "vermut",
  className,
  children,
  href,
}: PropsComunes & { href: string }) {
  return (
    <Link href={href} className={cn(base, variantes[variante], className)}>
      {children}
    </Link>
  );
}

export function Button({
  variante = "vermut",
  loading = false,
  className,
  children,
  type = "button",
  disabled,
  ...resto
}: PropsComunes & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variantes[variante], className)}
      {...resto}
    >
      {loading && <IconoGirando />}
      {children}
    </button>
  );
}
