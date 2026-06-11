import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Sección con respiración vertical fluida. Cada acto del Paseo parte de aquí. */
export function Section({
  id,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("py-[clamp(4rem,10vw,8rem)]", className)}
    >
      {children}
    </section>
  );
}
