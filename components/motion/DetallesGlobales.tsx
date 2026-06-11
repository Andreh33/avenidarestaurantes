"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TITULO_AUSENTE = "¿Te esperamos en la Avenida?";

const PLACA_ASCII = `
  ┌─────────────────────────┐
  │      RESTAURANTES       │
  │       A V E N I D A     │
  │         GETAFE          │
  └─────────────────────────┘
  Web por Latech — serviciosonlineweb.com
`;

/**
 * Detalles globales de la casa: título al perder el foco (§15.25),
 * atajo de teclado R → /reservas (§15.26) y placa en consola (§15.27).
 */
export function DetallesGlobales() {
  const router = useRouter();

  useEffect(() => {
    console.log(PLACA_ASCII);
  }, []);

  useEffect(() => {
    let original = document.title;
    const alCambiar = () => {
      if (document.visibilityState === "hidden") {
        original = document.title;
        document.title = TITULO_AUSENTE;
      } else if (document.title === TITULO_AUSENTE) {
        document.title = original;
      }
    };
    document.addEventListener("visibilitychange", alCambiar);
    return () => document.removeEventListener("visibilitychange", alCambiar);
  }, []);

  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "r" || e.metaKey || e.ctrlKey || e.altKey)
        return;
      const objetivo = e.target as HTMLElement | null;
      if (
        objetivo &&
        (objetivo.tagName === "INPUT" ||
          objetivo.tagName === "TEXTAREA" ||
          objetivo.tagName === "SELECT" ||
          objetivo.isContentEditable)
      )
        return;
      router.push("/reservas");
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [router]);

  return null;
}
