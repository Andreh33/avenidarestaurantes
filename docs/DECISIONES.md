# DECISIONES — Restaurantes Avenida · «El Paseo»

Registro de decisiones de estudio y de toda `[LIBERTAD]` ejercida. Formato: decisión, alternativas consideradas, porqué (≤ 5 líneas).

---

## D-001 · Sin reduced motion (Ley 2) — decisión de estudio

**Fecha:** 11/06/2026 · **Bloque:** B0 · **Estado:** firme, no se vuelve a cuestionar

**Decisión:** la animación es parte del producto y está siempre activa. En todo el código queda prohibido: media queries `prefers-reduced-motion`, hooks `useReducedMotion`, variantes Tailwind `motion-safe:`/`motion-reduce:` y cualquier rama condicional que degrade o desactive animaciones.

**Alternativas consideradas:** respetar la preferencia del sistema (recomendación de la skill y de WCAG).

**Porqué:** decisión de dirección registrada en el prompt maestro (§3, Ley 2): el arco de luz y el lenguaje cinemático del Paseo SON el producto que se vende. Prevalece sobre la skill, las librerías y cualquier guía externa. La accesibilidad se cuida en todo lo demás (Ley 10).

---

## D-002 · Rama de trabajo desde repo vacío

**Fecha:** 11/06/2026 · **Bloque:** B0

**Decisión:** el repo remoto estaba vacío; se inicializó local con rama `main` sin commits y todo B0 se construye en `b00-arranque`. `main` nacerá con el primer merge aprobado por Andreh.

**Alternativas:** commit inicial vacío en `main` y ramificar después.

**Porqué:** cumple la Ley 9 («nunca trabajo directo sobre main») de la forma más limpia: `main` solo contendrá historia aprobada.

---

## D-003 · Placa «Próximamente» de B0 sin craquelado ni Flip

**Fecha:** 11/06/2026 · **Bloque:** B0

**Decisión:** la placa del primer deploy es una versión estática y sobria del sistema de placas (esmalte + cenefa cobalto + grain sutil), con una única animación CSS de entrada. El sistema completo (craquelado, brillo especular animado, Flip, variantes por local) se diseña en B1/B5.

**Alternativas:** adelantar el componente `PlacaAzulejo` definitivo.

**Porqué:** B0 es cimientos y CI/CD vivo, no dirección de arte. La placa definitiva merece el gate visual de B1 con la skill recargada.

---

## D-004 · PlacaAzulejo como composición HTML + grain SVG

**Fecha:** 11/06/2026 · **Bloque:** B1

**Decisión:** el componente `PlacaAzulejo` se construye con HTML/CSS (cenefa con borders, esmalte con gradiente, cuerpo escalado por container queries y longitud del texto) más un overlay SVG `feTurbulence` para el grain. La versión SVG pura se reserva para favicon y OG images (B18/B20).

**Alternativas:** SVG puro con `<text>` como pide §4 literalmente.

**Porqué:** el texto SVG no fluye ni escala con tipografías web de forma robusta (FOUT, longitudes variables como «CALLE SIN SALIDA»); la composición HTML da el mismo resultado visual, mejor accesibilidad y cero riesgo de desbordes. Donde el contexto exige SVG real (favicon/OG), se generará SVG.

---

## D-005 · Registro de plugins GSAP repartido

**Fecha:** 11/06/2026 · **Bloque:** B1

**Decisión:** `lib/gsap.ts` solo registra el núcleo + ScrollTrigger. SplitText, Flip y Observer se registran localmente en los componentes que los usan.

**Alternativas:** registrar los cinco plugins en `lib/gsap.ts` como sugiere §7.2 literalmente.

**Porqué:** presupuesto de JS por ruta (§14, ≤ 230 KB en `/`): así SplitText/Flip solo viajan en las rutas que los montan, que es exactamente lo que B19 va a exigir.

---

## D-006 · Modelado de la verdad: flags `confirmado` + pendientes.ts tipado

**Fecha:** 11/06/2026 · **Bloque:** B3

**Decisión:** los datos con vigencia dudosa (teléfonos Lavadero, horarios web 2021, tel. de reservas) entran en content/ con `confirmado: false` en vez de excluirse; la lista §2.7 vive tipada en `content/pendientes.ts` con qué bloquea cada uno, y `validate:content` cuenta los que bloquean lanzamiento (B22).

**Alternativas:** dejar los datos dudosos fuera y solo placeholders; o un wrapper `Pendiente<T>` por campo.

**Porqué:** la UI necesita decidir por dato (mostrar, matizar u ocultar) y el flag lo permite sin duplicar fuentes; el wrapper complicaba los tipos sin aportar. La carta y el menú quedan vacío/null: ahí no hay dato dudoso, hay ausencia total (Ley 1).
