import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * Campos de formulario de la casa (Ley 5): vestidos, con label siempre,
 * error amable que dice cómo arreglarse (§15.20) y focus del sistema.
 */

const claseCampo = cn(
  "w-full rounded-[10px] border border-tinta/20 bg-tiza px-4 py-3",
  "font-sans text-base text-tinta placeholder:text-tinta/35",
  "transition-[border-color,box-shadow] duration-200",
  "hover:border-tinta/40",
  "aria-[invalid=true]:border-vermut",
);

function Etiqueta({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-sans text-sm font-semibold text-tinta"
    >
      {children}
    </label>
  );
}

function Error({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 font-sans text-sm text-vermut">
      {children}
    </p>
  );
}

export function CampoTexto({
  id,
  label,
  error,
  className,
  ...resto
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & ComponentPropsWithoutRef<"input">) {
  return (
    <div className={className}>
      <Etiqueta htmlFor={id}>{label}</Etiqueta>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={claseCampo}
        {...resto}
      />
      <Error id={`${id}-error`}>{error}</Error>
    </div>
  );
}

export function CampoArea({
  id,
  label,
  error,
  className,
  ...resto
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & ComponentPropsWithoutRef<"textarea">) {
  return (
    <div className={className}>
      <Etiqueta htmlFor={id}>{label}</Etiqueta>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(claseCampo, "min-h-24 resize-y")}
        {...resto}
      />
      <Error id={`${id}-error`}>{error}</Error>
    </div>
  );
}

export function CampoSelect({
  id,
  label,
  error,
  className,
  children,
  ...resto
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"select">) {
  return (
    <div className={className}>
      <Etiqueta htmlFor={id}>{label}</Etiqueta>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(claseCampo, "appearance-none")}
        {...resto}
      >
        {children}
      </select>
      <Error id={`${id}-error`}>{error}</Error>
    </div>
  );
}
