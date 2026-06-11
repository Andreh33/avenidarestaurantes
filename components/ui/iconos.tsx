/**
 * Set de iconos propio de la casa (§5.4): SVG inline, trazo 1.5,
 * currentColor. Nada de librerías externas ni emojis (Ley 6).
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

function Svg({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-[1.25em] w-[1.25em] shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function IconoTelefono({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M5 4h3.2l1.6 4.2-2 1.5a12.5 12.5 0 0 0 6.5 6.5l1.5-2 4.2 1.6V19a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </Svg>
  );
}

export function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9.2 8.4c-.5.3-.8.8-.7 1.5.2 1.4 1 2.7 2 3.7s2.3 1.8 3.7 2c.7.1 1.2-.2 1.5-.7l.3-.7-2-1-1 .9a5.6 5.6 0 0 1-2.7-2.7l.9-1-1-2-.7.3Z" />
    </Svg>
  );
}

export function IconoMapa({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 21s-7-5.8-7-10.5a7 7 0 0 1 14 0C19 15.2 12 21 12 21Z" />
      <circle cx="12" cy="10.2" r="2.5" />
    </Svg>
  );
}

export function IconoReloj({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function IconoTenedor({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M8 3v5a2 2 0 0 0 2 2v11" />
      <path d="M12 3v5a2 2 0 0 1-2 2" />
      <path d="M10 3v4" />
      <path d="M16 3c-1.1 0-2 1.6-2 3.5S14.9 10 16 10v11" />
    </Svg>
  );
}

export function IconoCana({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M8.2 8.5h7.6l-.6 12a1.4 1.4 0 0 1-1.4 1.3h-3.6a1.4 1.4 0 0 1-1.4-1.3l-.6-12Z" />
      <path d="M8 8.4c-.8-.9-.7-2.4.3-3a3.3 3.3 0 0 1 6-1.2c1.2-.1 2.2 1 1.9 2.2-.1.4-.3.8-.6 1" />
    </Svg>
  );
}

export function IconoLlama({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 21c3.5 0 6-2.5 6-5.7 0-2.6-1.6-4.4-3.1-6.1C13.7 7.8 13 6.5 13.2 4.5c-2.8 1.2-3.5 3.7-3 5.6-.9-.2-1.7-1-2-2C7 9.7 6 11.6 6 14c0 3.8 2.5 7 6 7Z" />
    </Svg>
  );
}

export function IconoPlaca({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <rect x="6" y="7.5" width="12" height="9" rx="1" />
    </Svg>
  );
}

/** Spinner propio para estados loading (jamás un spinner genérico a pantalla completa, §15.24) */
export function IconoGirando({ className }: { className?: string }) {
  return (
    <Svg className={cn("animate-spin", className)}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
    </Svg>
  );
}
