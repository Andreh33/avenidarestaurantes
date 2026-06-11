# QA — Restaurantes Avenida · «El Paseo»

Última pasada: 11/06/2026 (cierre B9–B22 en un tirón, autorizado por Andreh).

## Los 40 detalles (§15)

| # | Detalle | Estado |
|---|---|---|
| 1 | Favicon-placa SVG | ✅ `app/icon.svg` (ICO/apple-touch/maskable: pendiente de fase de pulido con assets) |
| 2 | theme-color | ✅ hueso (variante noche dinámica: pendiente) |
| 3 | ::selection vermut/tiza | ✅ |
| 4 | Scrollbar fina (desktop) | ✅ |
| 5 | Cursor propio punto+anillo | ✅ desktop, crece sobre interactivos, fuera en táctil |
| 6 | Botones magnéticos ≤6px | ✅ CTA del cierre nocturno (extensible) |
| 7 | Subrayado animado clip-path | ✅ `.enlace` |
| 8 | focus-visible doble anillo cobalto | ✅ global |
| 9 | Skip-to-content estilizado | ✅ |
| 10 | Estado vivo aria-live + tick por minuto | ✅ `EstadoVivo` |
| 11 | Reloj Madrid que late al minuto | ✅ hero |
| 12 | Marquee pausable + velocidad por scroll con tope | ✅ |
| 13 | Hover plato → precio-ticket rotado | ⏳ llega con la carta real (P2/B14) |
| 14 | Números tabulares en precios/horarios | ✅ |
| 15 | Click-to-copy teléfonos + «Copiado» | ✅ `TelCopiable` |
| 16 | Toasts propios | ⏳ sin caso de uso aún (los estados del form lo cubren) |
| 17 | Progreso de scroll «línea de calle» 2px | ✅ header |
| 18 | View Transition placa home↔ficha | ⏳ aplazada (D-011): API experimental en Next; fallback = navegación normal limpia |
| 19 | Lightbox completo | ⏳ llega con las fotos (P7/B2) |
| 20 | Validación amable de formularios | ✅ zod + errores que dicen cómo arreglarse |
| 21 | /gracias con sello estampado | ✅ overshoot con Motion |
| 22 | 404 «CALLE SIN SALIDA» | ✅ |
| 23 | error.tsx con tono de la casa | ✅ «Se nos ha caído una bandeja» |
| 24 | Skeletons shimmer | ⏳ rutas estáticas: sin hueco real donde aplique aún |
| 25 | Título al perder foco | ✅ «¿Te esperamos en la Avenida?» |
| 26 | Atajo R → /reservas | ✅ + anunciado en footer |
| 27 | console.log placa ASCII | ✅ |
| 28 | humans.txt | ✅ |
| 29 | Monograma «A» separador | ✅ entre actos |
| 30 | Tilt posavasos testimonios | ✅ código listo; se verá al aprobarse testimonios (P8) |
| 31 | Safe-areas iOS | ✅ barra sticky, menú y footer |
| 32 | Mini-mapa estático propio | ✅ SVG con los dos portales |
| 33 | «Carta actualizada el {fecha}» | ✅ código listo; visible con menú real (P3) |
| 34 | Print stylesheets | ✅ base global limpia (afinado A4 fino: con carta real) |
| 35 | OG probada en WhatsApp real | ⏳ probar tras el deploy (manual de Andreh) |
| 36 | Stepper con dígito que rueda | ✅ builder de WhatsApp |
| 37 | Header esconde/asoma + sombra | ✅ |
| 38 | Estados vacíos con dirección | ✅ carta, barra, galería |
| 39 | Año dinámico + NAP | ✅ |
| 40 | Toda animación con propósito | ✅ revisado acto a acto |

## Bugs conocidos de la casa (§16)

1. SplitText espacios — ✅ verificado programáticamente (B1)
2. Emojis — ✅ cero emojis, todo SVG propio
3. iOS viewport — ✅ svh/dvh en todo fullscreen
4. Safari backdrop-filter — ✅ no se usa backdrop-filter
5. ScrollTrigger tras fonts/imágenes — ✅ fonts.ready en splits; sin imágenes aún
6. Lenis+ScrollTrigger canónica — ✅ un solo Lenis global
7. Pin horizontal móvil — ✅ pila sticky, scroll nativo (D-009)
8. Hydration «Abierto ahora»/reloj — ✅ solo cliente tras montar
9. CLS next/image fill — n/a hasta B2 (manifest preverá aspect-ratio)
10. Overflow 100vw — ✅ overflow-hidden en secciones anchas; revisado
11. View Transitions — aplazada con fallback limpio (D-011)
12. wa.me encodeURIComponent — ✅ con tildes y ñ en el mensaje
13. Fuentes next/font fallback — ✅ display swap + ajuste automático
14. sessionStorage try/catch — ✅ preloader

## Pendiente de verificación con dispositivo real
- Matriz iPhone SE/14/15 Safari, Pixel, iPad (Andreh: pasada táctil sobre producción)
- Lighthouse móvil ≥95 (B19 formal cuando haya fotos: hoy la home es ligera —
  sin imágenes raster, fuentes subset, GSAP repartido por ruta)
- OG en WhatsApp real (§15.35)
