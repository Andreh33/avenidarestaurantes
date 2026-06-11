"use client";

import { useEffect, type ReactNode } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";

/** Monta el Lenis global en el layout raíz. Un solo Lenis en toda la app (§16.6). */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    initLenis();
    return destroyLenis;
  }, []);

  return children;
}
