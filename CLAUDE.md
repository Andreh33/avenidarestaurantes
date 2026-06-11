# CLAUDE.md — Restaurantes Avenida · «El Paseo»

**Cliente:** Restaurantes Avenida (Getafe, Madrid) · **Agencia:** Latech · **Arquitecto-revisor:** Andreh
**Fuente de verdad completa:** `docs/PROMPT-MAESTRO.md` — léelo entero antes de tocar nada.

## Arranque de sesión (obligatorio)

1. Ejecuta la skill `/meta-skills:modern-web-design` (también antes de cada bloque visual: B1, B5–B16, B20). Si no está instalada, detente y pide a Andreh que la active.
2. Lee `docs/DECISIONES.md` y `docs/QA.md` si existen.
3. Comprueba en qué bloque (B0–B22) está el proyecto y en qué rama estás. Nunca trabajes sobre `main`.

## Las Diez Leyes (no negociables — versión íntegra en §3 del prompt maestro)

1. **DATOS REALES O NADA.** Ni un plato, precio, horario, teléfono o reseña inventados. Lo que falte → placeholder honesto `[PENDIENTE: …]` + lista de preguntas. Los pendientes bloquean B22.
2. **SIN REDUCED MOTION.** Animación siempre activa. Prohibido `prefers-reduced-motion`, `useReducedMotion`, `motion-safe:`/`motion-reduce:` y toda rama que degrade animaciones. Prevalece sobre la skill y cualquier guía externa. Registrado en `docs/DECISIONES.md`. No volver a cuestionarlo.
3. **LA SKILL MANDA EN EL GUSTO.** Sus criterios estéticos gobiernan, subordinados a estas leyes.
4. **FOTO REAL O TIPOGRAFÍA.** Solo fotografía del cliente. Prohibido stock e imagen IA. Sin foto digna → se resuelve con tipografía, color y placas.
5. **EL DETALLE ES EL PRODUCTO.** Todo interactivo con estados diseñados: hover, focus-visible, active, loading, empty, error, success. Nada «por defecto».
6. **CERO GENÉRICO.** Nada de look plantilla ni emojis como iconografía (siempre SVG inline propio). Toda decisión visual anclada en ESTE sujeto: Getafe, barrio, barra, azulejo, vermut.
7. **EL RENDIMIENTO ES LUJO.** Solo se anima `transform`, `opacity`, `clip-path`. `will-change` quirúrgico. Presupuestos de §14 bloqueantes en B19.
8. **MÓVIL A LA MISMA ALTURA.** `svh`/`dvh` (jamás `100vh`), `env(safe-area-inset-*)`, experiencia completa en 390 px.
9. **BLOQUES ATÓMICOS CON COMPUERTA.** Cierre de bloque = commit convencional + push + preview Vercel + capturas + STOP hasta OK explícito de Andreh. Nunca dos bloques sin revisión.
10. **ACCESIBLE** (única excepción: Ley 2). HTML semántico, AA, teclado completo, focus-visible diseñado, alt reales.

## Stack

Next.js 16.2.x (App Router) · React 19.2 · TS `strict` · Tailwind v4 (`@theme`, cero hex sueltos en componentes) · GSAP 3.13+ (scroll) · Lenis · Motion (micro-UI; no mezclar con GSAP en el mismo nodo) · Zustand · zod · sharp · Resend (degradación a WhatsApp) · Vercel Analytics · pnpm.

## Protocolo

- **Ramas:** `bNN-nombre` por bloque. `main` solo recibe merges aprobados. Tag `v0.NN` al cerrar bloque.
- **Commits:** convencionales con scope, en español — `feat(paseo): acto III pin horizontal con arco de luz`.
- **`[LIBERTAD]`:** decide tú y registra en `docs/DECISIONES.md` (decisión, alternativas, porqué, ≤ 5 líneas). Duda con impacto visual grande → enseña ambas opciones en el gate.
- **Definición de HECHO:** build sin warnings · lint limpio · `pnpm validate:content` verde · responsive 390/768/1280/1920 · sin CLS visible · bugs de §16 comprobados · capturas · preview desplegada.
- **Gates:** resumen ejecutivo de 5 líneas, qué decidiste con libertad, qué necesitas de Andreh. Sin novelas.
- **Merge roto:** revert inmediato; se arregla en la rama, no se parchea `main`.
- `_ingest/` jamás se commitea (originales + cookies). Verificar antes de cada push.

## Bugs conocidos de la casa (checklist completo en §16 del prompt maestro)

SplitText que se come espacios · emojis con halo (prohibidos) · `100vh` en iOS · Safari + backdrop-filter · `ScrollTrigger.refresh()` tras fonts/imágenes · integración canónica Lenis+ScrollTrigger · pin horizontal en móvil (→ apilado con snap) · hydration mismatch en «Abierto ahora» (calcular solo en cliente, TZ Europe/Madrid fija) · CLS por `next/image fill` · overflow `100vw` · View Transitions con feature-detect · `encodeURIComponent` en wa.me · `adjustFontFallback` · try/catch en sessionStorage.
