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

---

## D-007 · Stubs honestos para toda la IA + CTA de reserva visible en movil

**Fecha:** 11/06/2026 · **Bloque:** B4

**Decision:** (a) todas las rutas de §7.1 existen ya como paginas minimas con datos reales y placeholder honesto «en obras» (componente EnObras), para que la navegacion sea coherente en cada gate; B13-B17 las sustituyen. (b) El boton «Reservar mesa» del header queda visible tambien en movil. (c) La home queda fuera del grupo (sitio) — sin header/footer — hasta que el Paseo la incorpore en B5.

**Alternativas:** enlaces a 404 hasta B13-16; CTA solo desktop; chrome global incluida la home.

**Porque:** un 404 en un gate o en produccion es indigno; la regla de oro §12.3 pide reservar a un toque en toda pagina, tambien en movil; y el «Proximamente» publico no debe ensenar nav a paginas en obras.

---

## D-008 · Collage del hero sin fotos: placas + monograma

**Fecha:** 11/06/2026 · **Bloque:** B5

**Decision:** mientras no haya fotos del cliente (P7), el collage parallax del Acto I se compone con las dos placas azulejo a distinta profundidad (scroll scrub 0.8 + puntero ≤12 px en desktop) y un monograma «A» gigante al 6 %. La tercera linea del titular es el claim en Instrument Serif italic vermut (sin año de fundacion, P9). Cuando lleguen las fotos, B2 sustituye las capas por las 3 fotos reales previstas en §9.

**Alternativas:** esperar a B2 para el hero; usar texturas decorativas.

**Porque:** Ley 4 — el vacio bien diseñado es premium; las placas SON la identidad y el hero queda completo y digno desde hoy.

---

## D-009 · Acto III en movil: pila sticky en vez de scroll-snap

**Fecha:** 11/06/2026 · **Bloque:** B7

**Decision:** la variante movil del Paseo apila las fachadas con position:sticky (cada card se queda fijada y la siguiente la cubre al scrollear), en vez de scroll-snap por puntos.

**Alternativas:** CSS scroll-snap (literal de §9); carrusel tactil.

**Porque:** scroll-snap pelea con Lenis (scroll suave global §16.6) y produce tirones; la pila sticky da la misma narrativa de «portal a portal» con scroll 100 % nativo y cero secuestro (§16.7). El arco de luz en movil queda para la integracion global de B12.

---

## D-010 · Cierre B9-B22 en un tiron

**Fecha:** 11/06/2026 · **Bloques:** B9-B22

**Decision:** Andreh autorizo expresamente ejecutar todos los bloques restantes sin compuertas individuales y desplegar a produccion. Los gates se sustituyen por: QA.md actualizado, capturas en docs/capturas/ y el dossier de entrega.

**Porque:** orden directa del arquitecto-revisor (Ley 9 es suya). Las Leyes 1-8 y 10 se mantuvieron integras.

---

## D-011 · View Transitions de la placa: aplazada

**Fecha:** 11/06/2026 · **Bloque:** B13

**Decision:** la View Transition de la placa entre home y ficha queda aplazada; la navegacion es normal y limpia (fallback de §16.11).

**Alternativas:** flag experimental viewTransition de Next/React.

**Porque:** la API en App Router sigue experimental y el riesgo de parpadeos en Safari no compensa en la v1; se reevalua cuando sea estable. El resto del sistema (placa con identidad por local) ya esta preparado.

---

## D-012 · Acto VII sin testimonios hasta el OK del cliente

**Fecha:** 11/06/2026 · **Bloque:** B11

**Decision:** mientras P8 no se resuelva, el acto muestra solo los enlaces discretos a Google Maps por local; las cards-posavasos (rotacion ±1.5°, se enderezan al hover) estan programadas y aparecen solas al marcar aprobadoPorCliente: true.

**Porque:** Ley 1 y §2.6 — publicar testimonios sin permiso expreso esta prohibido; el enlace a Maps es real y util.
