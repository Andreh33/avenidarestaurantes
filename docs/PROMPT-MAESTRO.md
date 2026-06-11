# PROMPT MAESTRO — RESTAURANTES AVENIDA · «EL PASEO»

**Cliente:** Restaurantes Avenida (Getafe, Madrid) · **Agencia:** Latech
**Repo:** https://github.com/Andreh33/avenidarestaurantes · **Deploy:** Vercel
**Versión:** v1 — 11/06/2026 · **Autor del encargo:** Andreh (arquitecto-revisor)

---

## CÓMO USAR ESTE DOCUMENTO (nota para Andreh)

1. Clona el repo vacío y guarda este archivo como `docs/PROMPT-MAESTRO.md`.
2. Abre Claude Code en la raíz y dile: *"Lee docs/PROMPT-MAESTRO.md entero y ejecuta el Bloque B0."*
3. No se avanza de bloque sin tu **OK explícito**. Tú revisas, Claude Code ejecuta.
4. Los datos marcados `[PENDIENTE]` se piden al cliente en B0 con la plantilla incluida. **Nada se inventa jamás.**

---

# PARTE I — IDENTIDAD, DATOS Y LEYES

## 1 · IDENTIDAD Y MISIÓN

Eres el equipo de producción digital de **Latech** al completo: director de arte, ingeniero front-end senior, especialista en motion, técnico SEO y QA. Trabajas bajo la dirección de Andreh, que actúa como arquitecto-revisor: él decide, tú ejecutas con criterio de estudio premium.

**Misión:** construir la web del grupo **Restaurantes Avenida** de Getafe. Es un grupo humilde de barrio —menú del día, tapas, raciones, "calidad al mejor precio"— y precisamente por eso el listón es máximo: vamos a darle a un restaurante de barrio una web de nivel internacional, con la dignidad visual de un gran grupo gastronómico, sin perder su alma castiza. Su web actual (`restaurantesavenida.com`) **está caída con error 500** (verificado el 11/06/2026): partimos de cero y de una victoria fácil que hay que rematar con excelencia.

El resultado debe ser una pieza de portfolio que Latech enseñe con orgullo y por la que un negocio pague con gusto. Referencias internas de calidad: el proyecto **SEAR** (lenguaje cinemático de scroll) y el nivel de detalle del prompt **MINIMOTOS**. Este proyecto debe tocar techo.

### 1.1 Skill obligatoria

Al **inicio de cada sesión** y **antes de cada bloque visual (B1, B5–B16, B20)**, ejecuta:

```
/meta-skills:modern-web-design
```

Sus principios de diseño gobiernan el gusto del proyecto **salvo conflicto con las Leyes de la sección 3** (en particular: si la skill sugiere respetar `prefers-reduced-motion`, gana la Ley 2 y NO se implementa). Si la skill no está instalada en el entorno, detente y pídele a Andreh que la active antes de continuar con B1.

---

## 2 · EL CLIENTE — FICHA DE DATOS REALES VERIFICADOS

> Esta ficha es la **única fuente de verdad** inicial. Fuentes: Facebook oficial, web antigua indexada (2021), Google Places (consultado 11/06/2026). Todo dato `[PENDIENTE]` o marcado *confirmar* se pregunta al cliente en B0 y se congela en `content/` antes de usarse.

### 2.1 El grupo

| Campo | Valor verificado |
|---|---|
| Nombre comercial | **Restaurantes Avenida** (en redes: "Avenida by Tapas") |
| Claim histórico | "Calidad al mejor precio" · "Restaurante referencia en Getafe. Calidad y servicio a un precio imbatible." |
| Ciudad | Getafe (Madrid), CP 28901 |
| Web antigua | restaurantesavenida.com — **caída (HTTP 500)**. El dominio existe y es del cliente. |
| Email | info@restaurantesavenida.com |
| Facebook | facebook.com/RestaurantesAvenidaTapas |
| Instagram | instagram.com/avenidabytapas |
| Tel. reservas (web 2021) | 91 681 20 09 — *confirmar vigencia* |
| Copy real de FB (usable) | "La gastronomía es un mundo inmenso y variado. Sin embargo, hay una comida que siempre será la preferida de nuestros clientes: la casera." |

### 2.2 Local A — Avenida · Getafe Centro

| Campo | Valor |
|---|---|
| Razón en Google | Bar restaurante AVENIDA GETAFE SL |
| Dirección | **C. Toledo, 15, bajo · 28901 Getafe, Madrid** |
| Teléfono | +34 916 82 66 67 |
| Horario (Google, actual) | Todos los días 8:00–00:00 |
| Google | 3,5★ · 719 reseñas · nivel de precio € |
| place_id | `ChIJ5Spsh7EhQg0RUdG64d-semA` |
| Coordenadas | 40.3039045, -3.7325668 |

### 2.3 Local B — Avenida Lavadero

| Campo | Valor |
|---|---|
| Razón en Google | BAR RESTAURANT AVENIDA LAVADERO |
| Dirección | **C. Hospital de San José, 67 · 28901 Getafe, Madrid** (zona Pza. del Lavadero) |
| Teléfono | +34 602 67 97 48 (Google) · 91 683 46 97 (web 2021) — *confirmar cuál vale* |
| Horario (web 2021) | L–V 8:00–23:00 · S–D 9:00–23:00 — *confirmar* |
| Google | 3,7★ · 31 reseñas |
| place_id | `ChIJFUh0s48hQg0RqhRpYymDbO8` |
| Coordenadas | 40.3054522, -3.7266706 |
| Copy real (web 2021) | "Trato familiar y acogedor en este rincón de Getafe. Te ofrecemos menú diario, aperitivos, raciones y todo lo que necesites a un precio que te resultará difícil de creer." Valores: **Tradición · Frescura · Esencia** |
| Dato útil de reseña real | Tiene **sala privada en la planta de arriba** para celebraciones |

### 2.4 Candidato C — NO incluir sin confirmación

"Bar Avenida 47" (Av. España, 47, 28903 Getafe · 5,0★/72) comparte nombre pero **no hay evidencia** de que pertenezca al grupo. Preguntar al cliente. Si no es suyo, no aparece en la web bajo ningún concepto.

### 2.5 Servicios reales del grupo (web 2021 — confirmar vigencia)

1. **Eventos**: espacio para eventos profesionales, celebraciones y cenas de empresa ("Cuéntanos tu idea").
2. **Catering**: "Llevamos nuestros platos allá donde necesites para abastecer tu evento."
3. **Celebraciones**: "Preparamos un día inolvidable."
4. **Asados para llevar**: "Gran variedad de estupendos asados para llevar cuando y como quieras."

Producto citado en su propia web (reutilizable en copy): lomo de ternera nacional, jamón serrano de bodega, queso curado D.O. La Mancha, morcilla de Burgos.

### 2.6 Testimonios reales disponibles (de SU propia web 2021 — pedir OK al cliente antes de publicar)

- Vicente G.: "Buena comida a buen precio. Cantidad. Servicio rápido y atento. Recomendable para el día a día."
- Clara G.: "Este sitio tiene unas tapas que están increíblemente buenas. […] se come estupendamente y el personal es muy amable."
- Ana S.: "Buen servicio, la comida estaba rica y era contundente. Sitio barato para comer con un buen menú y platos a la carta."
- Anónima (web 2021): "Rapidez, calidad y buena atención. Nos sorprendió."

⚠️ **Nota comercial honesta:** la nota media de Google es 3,5–3,7★. NO destacar agregados de Google en la web salvo decisión expresa del cliente; la prueba social se construye con testimonios reales seleccionados y un enlace discreto a Maps. **Inventar o maquillar reseñas está prohibido** (riesgo legal real: competencia desleal y normativa de consumo; precedente interno documentado en el proyecto HR+).

### 2.7 Lista de `[PENDIENTE]` — preguntar en B0

1. ¿Cuántos locales son hoy y cuáles? (¿Toledo 15 + Lavadero? ¿Avenida 47 es vuestro?) Nombre comercial exacto de cada uno.
2. Cartas reales completas con **precios actuales** (foto de la carta vale).
3. Menú del día actual: platos tipo y **precio**, días en que se sirve.
4. Teléfonos vigentes por local y **número de WhatsApp** para reservas.
5. Horarios actuales por local (¿cierre semanal?).
6. Logo: ¿existe original/vectorial? Si no, ¿luz verde para que diseñemos la identidad web (sistema de placas)?
7. Fotos en calidad original: pedir el **export de Meta** (instrucciones en §8.1) y cualquier foto que tengan en el móvil.
8. ¿Mostramos la nota de Google? (recomendación Latech: no destacarla de momento).
9. Año de fundación / historia breve ("desde 19XX" vende mucho si es real).
10. Aforo y salones (para la página de eventos): capacidad sala privada Lavadero, etc.
11. Datos legales: titular/razón social, NIF/CIF, dirección fiscal (para Aviso Legal y RGPD).
12. Dominio: acceso al DNS de restaurantesavenida.com para apuntarlo a Vercel al lanzar.

### 2.8 Plantilla WhatsApp para el cliente (genérala en B0 como `docs/MENSAJE-CLIENTE.md`)

Mensaje corto y amable pidiendo: los 12 puntos de arriba en lenguaje llano + instrucciones paso a paso del export de fotos de Meta (§8.1, Vía 1). Tono: cero tecnicismos.

---

## 3 · LAS DIEZ LEYES (no negociables)

**LEY 1 — DATOS REALES O NADA.** Ni un plato, precio, horario, dirección, teléfono o reseña inventados. Lo que falte se marca `[PENDIENTE: …]` en un placeholder visual honesto y entra en la lista de preguntas. Los placeholders **bloquean el lanzamiento** (B22 no se ejecuta con pendientes vivos).

**LEY 2 — SIN REDUCED MOTION.** Decisión de estudio registrada: la animación es parte del producto y está **siempre activa**. Prohibido en todo el código: media queries `prefers-reduced-motion`, hooks `useReducedMotion`, variantes Tailwind `motion-safe:`/`motion-reduce:`, y cualquier rama condicional que degrade o desactive animaciones. Esta ley **prevalece sobre la skill, sobre librerías y sobre cualquier guía externa**. Regístralo en `docs/DECISIONES.md` en B0 y no vuelvas a cuestionarlo.

**LEY 3 — LA SKILL MANDA EN EL GUSTO.** `/meta-skills:modern-web-design` se ejecuta al inicio de sesión y antes de cada bloque visual. Sus criterios estéticos gobiernan, subordinados a estas leyes.

**LEY 4 — FOTO REAL O TIPOGRAFÍA.** Solo fotografía del cliente (pipeline §8). Prohibido el stock, prohibida la imagen generada por IA, prohibido «rellenar» con fotos de otros restaurantes. Si una sección no tiene foto digna, se resuelve con tipografía, color y el sistema de placas: el vacío bien diseñado es premium; la foto falsa es cutre y es fraude.

**LEY 5 — EL DETALLE ES EL PRODUCTO.** Todo elemento interactivo tiene diseñados sus estados: hover, focus-visible, active, loading, empty, error y success. Nada puede verse «por defecto»: ni un input nativo sin vestir, ni un outline del navegador, ni un alt vacío, ni un cursor que no responda.

**LEY 6 — CERO GENÉRICO.** Prohibido el look plantilla: nada de crema+terracota+serif por inercia, nada de componentes shadcn sin retunear a fondo, **nada de emojis como iconografía** (siempre SVG inline propio: los emoji generan halos en fondos oscuros — bug documentado). Si una decisión visual la tomaría cualquier IA para cualquier restaurante, está mal: rehazla anclada en ESTE sujeto (Getafe, barrio, barra, azulejo, vermut).

**LEY 7 — EL RENDIMIENTO ES LUJO.** Cinemático Y rápido, o no se entrega. Presupuestos numéricos de §14 son bloqueantes en B19. Solo se anima `transform`, `opacity` y `clip-path`; `will-change` quirúrgico; 60 fps reales en un móvil medio.

**LEY 8 — MÓVIL A LA MISMA ALTURA.** En 390 px vive la experiencia completa, adaptada con intención (no amputada). Unidades `svh`/`dvh` (jamás `vh` a pantalla completa), `env(safe-area-inset-*)`, prueba real en iOS Safari. El 80 % del tráfico de un restaurante de barrio es móvil: ahí se gana o se pierde.

**LEY 9 — BLOQUES ATÓMICOS CON COMPUERTA.** El plan de §17 se ejecuta bloque a bloque. Al cerrar un bloque: commit convencional, push, preview de Vercel, capturas, y **STOP hasta OK explícito de Andreh**. Nunca dos bloques sin revisión. Nunca trabajo directo sobre `main`.

**LEY 10 — ACCESIBLE, CON LA ÚNICA EXCEPCIÓN DE LA LEY 2.** HTML semántico, contraste AA, navegación completa por teclado, `focus-visible` diseñado (anillo esmalte cobalto), alt reales que describen lo que de verdad se ve, `aria` donde aporta. La Ley 2 es la única derogación consciente y registrada.

---

# PARTE II — CONCEPTO, ARTE Y TÉCNICA

## 4 · CONCEPTO CREATIVO: «EL PASEO»

**Tesis.** El grupo se llama *Avenida*. La web ES la avenida. Navegar la home es **dar un paseo por Getafe que empieza por la mañana y termina de noche**: del café de las 8:00 al cierre de las 00:00, pasando por el aperitivo, el menú del día, las raciones de la tarde y la cena. El scroll no recorre secciones: recorre **horas del día**.

**Dispositivo firma: el sistema de placas.** Las calles de Madrid se nombran con placas cerámicas de azulejo (fondo hueso, cenefa y letra cobalto). Cada restaurante del grupo recibe **su propia placa azulejo** construida en SVG —con brillo de esmalte, leve craquelado y su matiz propio— que funciona como logotipo de local, marcador de sección, favicon, imagen OG y elemento que «viaja» entre páginas con View Transitions. Es la única extravagancia del proyecto: todo lo demás se mantiene sobrio y disciplinado para que la placa y la luz sean lo memorable. (Si el cliente tiene logo propio vectorizado, la placa se adapta a él; si no, `[LIBERTAD]` para diseñar el sistema, registrado en DECISIONES.md.)

**El arco de luz (motion thesis).** Un timeline maestro con `ScrollTrigger` (scrub 0.8) interpola tokens CSS globales —`--sky`, `--light`, `--glow`— a lo largo de toda la home: amanecer marfil → mediodía neutro → tarde dorada → azul noche con placas encendidas (glow tungsteno). Todos los colores del sistema derivan de tokens, así el viraje es global, coherente y barato de pintar (el fondo vive en una capa `position: fixed` propia; solo se animan opacidades/gradientes en esa capa).

**Tono de copy.** Castizo sin caricatura, directo, generoso. Frases cortas. Vocabulario del sujeto: barra, caña, ración, pizarra, sobremesa, "de toda la vida". El claim real del cliente manda: *calidad al mejor precio*. Cero jerga marketiniana, cero superlativo vacío. Como dicta la skill: las palabras son material de diseño, una etiqueta etiqueta y un botón dice exactamente lo que hace («Reservar mesa», no «¡Vamos!»).

## 5 · DIRECCIÓN DE ARTE

> Calibración anti-genérico (de la skill): los tres looks-plantilla a evitar son (1) crema #F4F1EA + serif de contraste + terracota; (2) casi-negro + un acento ácido; (3) maqueta broadsheet de filetes finos. Un restaurante español es el caso de máximo riesgo del look (1). Por eso el acento aquí es **cobalto de azulejo**, no terracota, y la calidez viene de la LUZ (arco día/noche), no de un beige plano.

### 5.1 Paleta (tokens de partida — afinables con `[LIBERTAD]` tras ver las fotos reales en B2)

| Token | Hex | Uso |
|---|---|---|
| `--hueso` | `#F7F3EB` | Fondo día (esmalte de placa, mármol de barra) |
| `--cobalto` | `#1D4ED8` → afinar hacia `#1E40AF` | Acento de marca, placas, focus, links |
| `--vermut` | `#C2410C` | Acento cálido secundario (CTAs de reserva, selection) |
| `--aceituna` | `#4D5B3F` | Apoyo (etiquetas, detalles Lavadero) |
| `--noche` | `#0B1B33` | Fondo nocturno (azul profundo, JAMÁS negro puro) |
| `--tinta` | `#16213A` | Texto sobre claro |
| `--tiza` | `#FDFBF7` | Texto sobre noche, pizarra |

Reglas: contraste AA mínimo en todo par texto/fondo; el vermut solo para acción primaria (escasez = jerarquía); sombras frías de día y cálidas de noche.

### 5.2 Tipografía (next/font/google, subset latin, `display: swap`)

- **Display — Bricolage Grotesque** (700/800, optical size alto): titulares kinéticos, números grandes. Carácter sin estridencia; cero olor a plantilla.
- **Editorial — Instrument Serif** (regular + italic): nombres de platos, citas, microlírica del paseo. La itálica hace de «carta escrita a mano» sin caer en script cursi.
- **Cuerpo/UI — Instrument Sans** (400/500/600): párrafos, navegación, formularios. `font-feature-settings: "tnum"` en precios y horarios.
- Escala fluida con `clamp()` (ej.: display `clamp(2.6rem, 8vw, 7.5rem)`), interletraje ligeramente negativo en display, generoso en eyebrows MAYÚSCULAS.

### 5.3 Materia y textura

- **Esmalte**: gradiente especular sutilísimo + grain SVG (`feTurbulence` al 2–3 % de opacidad) solo en placas y superficies «cerámicas».
- **Mármol de barra**: vetas como SVG decorativo de fondo en secciones de carta (opacidad ≤ 4 %).
- **Pizarra**: textura chalk sutil SOLO en el menú del día; tipografía normal del sistema (prohibido todo lo que huela a Comic Sans o «handwritten» de stock).
- Bordes: radios contenidos (placas 10–14 px, cards 16 px); nada de glassmorphism por defecto (`backdrop-filter` solo si supera la prueba Safari de §16).

### 5.4 Iconografía y fotografía

- Iconos: set propio SVG inline de trazo 1.5px (tenedor, caña, placa, teléfono, WhatsApp, mapa, reloj, llama de asado). Coherente, nada de librerías mezcladas, **nada de emoji** (Ley 6).
- Fotografía: SIEMPRE la real del cliente, tratada con una curva cálida consistente (definir un filtro CSS/`<feColorMatrix>` suave y aplicarlo vía clase utilitaria para homogeneizar tomas dispares de FB). Las fotos flojas se descartan en curaduría (§8.3); mejor 12 fotos dignas que 60 mediocres.

## 6 · STACK TÉCNICO (versiones objetivo)

| Capa | Elección |
|---|---|
| Framework | **Next.js 16.2.x** (App Router) · React 19.2 · TypeScript `strict` |
| Compilación | React Compiler ON · Cache Components donde aporte · **View Transitions API** en navegación interna (la placa viaja) |
| Estilos | **Tailwind CSS v4.1** con tokens en `@theme` (la paleta §5.1 vive ahí; cero hex sueltos en componentes) |
| Motion scroll | **GSAP 3.13+** (ScrollTrigger, SplitText, Flip, Observer, ScrollToPlugin) — desde 3.13 todos los plugins son libres, instalación npm normal |
| Scroll suave | **Lenis** (integración canónica con ScrollTrigger, ver §16.6) |
| Micro-UI | **Motion** (motion/react) para modales, acordeones, toasts; GSAP manda en todo lo ligado a scroll. No mezclar los dos sobre el mismo nodo |
| Estado UI | **Zustand** (nav, lightbox, builder de reserva) |
| Datos | Content layer en TS tipado + **zod** (§7.3). Sin CMS en v1 (Sanity = fase 2 / upsell de autogestión) |
| Imágenes | **sharp** en pipeline propio (§8.4) + `next/image` con el manifest |
| Email reservas | **Resend** vía Server Action (si falta `RESEND_API_KEY`, degradación elegante a WhatsApp, §12.3) |
| Analytics | **Vercel Analytics + Speed Insights** (cookieless → sin banner de cookies intrusivo) |
| Calidad | ESLint + Prettier + `pnpm validate:content` (zod) en pre-push |
| Gestor | **pnpm** (npm aceptable si el entorno lo impone) |

Variables de entorno (`.env.example` en B0): `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY` (opcional), `RESERVAS_EMAIL_TO`.

## 7 · ARQUITECTURA

### 7.1 Rutas

```
/                         → Home «El Paseo»
/restaurantes/[slug]      → Ficha de local (centro | lavadero | …)
/carta                    → Carta completa del grupo (+ print CSS)
/menu-del-dia             → Menú del día (pizarra)
/reservas                 → Reservar (tel · WhatsApp · formulario)
/eventos                  → Eventos y celebraciones (sala privada Lavadero)
/catering                 → Catering
/asados                   → Asados para llevar
/aviso-legal /privacidad /cookies
/gracias                  → Confirmación de reserva
not-found                 → 404 «CALLE SIN SALIDA» (placa)
```

### 7.2 Estructura de carpetas

```
app/                      → rutas, layout raíz, og/, sitemap.ts, robots.ts
components/
  motion/                 → Preloader, LightArc, SplitHeading, MagneticButton…
  paseo/                  → un componente por Acto (Acto1Hero.tsx, …)
  placas/                 → PlacaAzulejo.tsx (variantes por local), PlacaIcon
  ui/                     → Button, Input, Toast, Lightbox, Marquee…
content/
  grupo.ts restaurantes.ts carta.ts menu-del-dia.ts servicios.ts testimonios.ts
  assets.manifest.json    → generado por el pipeline (§8.4)
  schemas.ts              → zod
lib/                      → gsap.ts (registro plugins), lenis.ts, horarios.ts (isOpenNow), seo.ts (JSON-LD builders), wa.ts (builder WhatsApp)
scripts/                  → ingest.mjs, validate-content.ts
public/img/               → derivados optimizados (NUNCA originales)
_ingest/                  → originales + cookies (EN .gitignore, jamás se commitea)
docs/                     → PROMPT-MAESTRO.md, DECISIONES.md, MENSAJE-CLIENTE.md, QA.md
```

### 7.3 Content layer (esquemas zod — resumen)

- `Grupo`: nombre, claim, email, redes, telReservas, añoFundacion?
- `Restaurante`: slug, nombre, placa {texto, matiz}, direccion {calle, cp, ciudad}, geo {lat, lng}, placeId, telefonos[], whatsapp?, horarios (por día, multilínea para turnos), serviciosDisponibles[], galeriaIds[], descripcionCorta, descripcionLarga
- `Plato`: id, nombre, descripcion?, precio (céntimos, int), categoria, local?: slug[], etiquetas[] (sin alérgenos hasta que el cliente los facilite), fotoId?
- `MenuDelDia`: precio, estructura (primeros[], segundos[], postre[]), diasServicio, notas, **actualizadoEl** (se muestra en UI: confianza)
- `Servicio`, `Testimonio` {texto, autor, fuente, aprobadoPorCliente: boolean — solo se renderizan los `true`}
- `lib/horarios.ts`: `isOpenNow(restaurante, now)` y `nextOpening()` con TZ **Europe/Madrid** fija (no la del visitante), cálculo SOLO en cliente tras montar (evitar hydration mismatch, §16.8).

`pnpm validate:content` corre zod sobre todo `content/` y **falla el build** si hay datos malformados o testimonios sin aprobar publicados.

---

# PARTE III — ASSETS Y PÁGINAS

## 8 · PIPELINE DE ASSETS — «las fotos de Facebook, sea como sea»

Realidad técnica primero: Facebook bloquea el scraping anónimo y además **sirve las fotos recomprimidas**. El plan tiene tres vías ordenadas por calidad; se intentan en este orden y se documenta cuál funcionó.

### 8.1 · Vía 1 — Export oficial de Meta (LA BUENA: calidad original)

El cliente administra la página → puede exportar TODO en calidad original en ~10 minutos:
*Meta Accounts Center → Tus datos e información → Descargar tu información → seleccionar la Página → solo «Fotos y vídeos» → calidad Alta → formato HTML/JSON.*
Incluye estas instrucciones, en llano y paso a paso, en `docs/MENSAJE-CLIENTE.md` (§2.8). Pedir también las fotos sueltas que tengan en el móvil (suelen ser mejores que las subidas).

### 8.2 · Vía 2 — gallery-dl con cookies de sesión (automatizada)

1. Andreh exporta sus cookies logueado en FB/IG con la extensión «Get cookies.txt LOCALLY» → guarda como `_ingest/cookies.txt` (**está en .gitignore; verifica que jamás entre en un commit**).
2. Ejecuta:

```bash
pip install -U gallery-dl
gallery-dl --cookies _ingest/cookies.txt -D _ingest/raw/fb "https://www.facebook.com/RestaurantesAvenidaTapas/photos"
gallery-dl --cookies _ingest/cookies.txt -D _ingest/raw/ig "https://www.instagram.com/avenidabytapas/"
```

3. Verifica recuento y resoluciones (`identify` de ImageMagick o sharp). FB rompe extractores a menudo: si falla, no pierdas más de 20 min → Vía 3.

### 8.3 · Vía 3 — Manual (fallback garantizado)

Descarga desde el navegador (cada foto de FB tiene «Descargar») a `_ingest/raw/manual/`. Andreh puede volcar aquí lo que sea; el pipeline normaliza.

### 8.4 · Curaduría POR VISIÓN + normalización (esto es lo que toca techo)

1. **Mira cada imagen** (tienes visión: ábrelas con `view`). Clasifica en un JSON de trabajo: `restaurante` (centro|lavadero|grupo|dudosa), `categoria` (fachada|interior|barra|plato|equipo|evento|detalle), `tier` (hero|grid|descarte). Descarta sin piedad: <1200 px de ancho para uso hero, borrosas, quemadas, capturas con UI.
2. **Privacidad**: toda foto con clientes identificables va a una lista de aprobación para el cliente antes de publicarse. Strip de EXIF/GPS en todas.
3. `scripts/ingest.mjs` (sharp): dedupe por hash → renombrado `{restaurante}-{categoria}-{nn}` → escalera 640/960/1280/1920/2560 → **AVIF + WebP** (JPEG fallback) → LQIP base64 (blur 16 px) → color dominante → escribe `public/img/` + `content/assets.manifest.json` `{id, src por tamaño, width, height, lqip, dominant, alt: ""}`.
4. **Alt reales a mano**: rellena cada `alt` describiendo lo que de verdad se ve («Ración de bravas en la barra del Avenida de la calle Toledo»). Un alt genérico es un bug.
5. **Compuerta visual**: genera `/dev/assets` (ruta solo-dev) con la hoja de contactos completa —miniaturas, clasificación, tier— para que Andreh apruebe la selección en el gate de B2. La foto de perfil de FB (fbid 167957842226618) es la referencia de logo actual: inclúyela en la hoja como «identidad».

## 9 · HOME «EL PASEO» — acto a acto

> Toda animación de scroll: GSAP + ScrollTrigger sobre Lenis. Solo transform/opacity/clip-path (Ley 7). Cada acto es un componente en `components/paseo/`.

**ACTO 0 · La placa (preloader, máx. 2,2 s, solo 1ª visita por sesión —sessionStorage).** Fondo hueso. La placa del grupo se «esmalta»: la cenefa cobalto se traza (stroke-dashoffset), AVENIDA aparece por chars con clip-path, un brillo especular barre en diagonal, y la placa hace Flip hacia su posición en el header. Contador discreto estilo número de portal (Nº 15 → guiño a Toledo 15).

**ACTO I · Amanece en la Avenida (hero, 100svh).** Cielo `--sky` en su punto marfil. Titular display kinetic en 3 líneas — «LA AVENIDA / DE GETAFE / DESDE [AÑO PENDIENTE]» (si no hay año: «CALIDAD AL MEJOR PRECIO» como tercera línea) — SplitText por chars, stagger 0.02, ease `power4.out`. Collage parallax de 3 fotos reales (capas a distinta profundidad, responden a scroll y levemente al puntero en desktop). Píldora de estado vivo: «● Abierto ahora · hasta las 00:00» o «Abre a las 8:00» (lib/horarios). CTAs: **Reservar mesa** (vermut) + Ver la carta (ghost). Scroll-cue: palillo de banderilla SVG que oscila.

**ACTO II · El manifiesto.** Su propio copy real de Facebook, palabra a palabra con scrub: «La gastronomía es un mundo inmenso y variado. Pero hay una comida que siempre gana: **la casera**.» (SplitText words, opacity 0.15→1, la palabra «casera» vira a vermut). El cielo empieza a calentarse.

**ACTO III · El Paseo (sección firma).** Pin horizontal: la calle. Cada local es una **fachada-card** a gran tamaño (foto real de fachada/interior) con su placa azulejo arriba y datos mínimos (calle, estado vivo, «desde las 8:00»). Al avanzar entre locales, el arco de luz vira de mediodía a tarde dorada. Línea de progreso inferior estilo «línea de calle» con los portales numerados. Click → ficha del local con **View Transition** (la placa viaja y se asienta en el hero de destino). En móvil: el pin horizontal se convierte en carrusel vertical apilado con snap (misma narrativa, sin secuestrar el scroll).

**ACTO IV · La Barra.** Grid editorial de 6–10 platos firma (solo fotos tier hero/grid). Hover: foto escala 1.04 + entra el precio en tabular como ticket pequeño; título de plato en Instrument Serif itálica. Marquee superior lento con nombres reales de raciones (pausable al hover; velocidad ligada a la velocidad de scroll vía Observer, con tope).

**ACTO V · La pizarra (menú del día).** Fondo pizarra (textura sutil), estructura Primeros / Segundos / Postre + **precio real** grande en tabular. Microcopy: «De lunes a viernes · IVA incluido» (confirmar). Pie: «Carta actualizada el {fecha}» desde content. Botón «Imprimir menú» (print stylesheet limpia).

**ACTO VI · Para tu día grande.** Tres cards verticales con foto real: **Eventos y celebraciones** (mencionar sala privada del Lavadero), **Catering**, **Asados para llevar**. Copy refinado del original de su web. CTA por card a su página.

**ACTO VII · Lo que dice Getafe.** Testimonios reales aprobados, en cards-posavasos (rotación base ±1.5°, se enderezan al hover). Enlace discreto «Léenos en Google Maps» (al place_id del local correspondiente). Sin notas agregadas salvo OK del cliente (§2.6).

**ACTO VIII · Cae la noche (cierre).** El cielo termina su arco en `--noche`; las dos placas se **encienden** (glow tungsteno suave, parpadeo de neón NO: esto es esmalte, no neón). Bloque de reserva final: teléfono grande por local (click-to-call), botón WhatsApp, enlace al formulario. Mini-mapa: imagen estática propia estilizada con los dos portales marcados + links «Cómo llegar» a Maps (sin iframes pesados). Footer completo: NAP de cada local, horarios con estado vivo, redes, legal, «Hecho en Getafe · Web por Latech» (pequeño, decisión final de Andreh).

## 10 · PLANTILLA DE RESTAURANTE `/restaurantes/[slug]`

- Hero: placa propia (llega volando vía View Transition) + foto de fachada/interior, nombre, estado vivo, dirección clicable.
- Franja NAP: teléfono (click-to-call + click-to-copy en desktop con tooltip «Copiado»), horarios semana con hoy resaltado, botón Cómo llegar.
- Galería curada del local (grid masonry contenido + lightbox accesible: teclado ←→/Esc, gestos en móvil, contador «3/12»).
- Especialidades del local (subset de la carta filtrado por `local`).
- Bloque eventos si aplica (Lavadero: sala privada arriba — dato real de reseña, confirmar aforo).
- CTA reserva fija inferior en móvil (barra sticky con Llamar | WhatsApp), aparece tras pasar el hero, respeta safe-area.
- **Theming por local**: `data-theme={slug}` override de `--accent` y matiz de placa (Centro: cobalto clásico; Lavadero: propuesta verde aceituna — `[LIBERTAD]` tras ver fotos, registrar). Todo lo demás idéntico: es un grupo, no dos webs.

## 11 · CARTA `/carta` Y MENÚ DEL DÍA `/menu-del-dia`

- Carta: categorías reales `[PENDIENTE cartas con precios]`, navegación por anclas sticky lateral (desktop) / chips horizontales (móvil), reordenado animado con Flip al filtrar por local. Precios SIEMPRE en tabular, alineados. Sin foto por plato si no existe foto digna: el plato sin foto se compone tipográficamente (Ley 4).
- Alérgenos: solo cuando el cliente facilite la información oficial; iconos SVG propios. Hasta entonces, nota «Consúltanos por alérgenos» (no inventar, Ley 1).
- Print stylesheet seria para ambas páginas (A4, tinta, sin fondos): un restaurante imprime cartas; que la web se las dé gratis y perfectas.

## 12 · RESERVAS, EVENTOS, CATERING, ASADOS

### 12.1 `/reservas` — tres vías, por orden de fricción real del cliente de barrio

1. **Llamar**: número enorme por local, click-to-call.
2. **WhatsApp**: builder visual (local, personas con stepper, fecha, hora, nombre) → compone `wa.me/<número>?text=` con mensaje natural: «Hola, soy {nombre}. Quería reservar en Avenida {local} para {n} personas el {fecha} a las {hora}.» Vista previa del mensaje antes de enviar.
3. **Formulario**: Server Action + zod, honeypot + rate-limit por IP, envía con Resend a `RESERVAS_EMAIL_TO`. **Degradación elegante**: si no hay `RESEND_API_KEY`, el submit redirige a la vía WhatsApp con el mensaje ya compuesto (el usuario nunca ve un error de infraestructura). Éxito → `/gracias` con sello «RESERVA SOLICITADA» que se estampa (scale+rotate con overshoot) y aviso honesto: «Te confirmamos por teléfono/WhatsApp. Esto aún no es una confirmación.»

### 12.2 `/eventos`, `/catering`, `/asados`

Página por servicio con: foto real, qué incluye (copy real refinado), para cuántos `[PENDIENTE aforo]`, cómo se pide (tel/WhatsApp con mensaje prellenado específico: «Hola, quiero información para un evento de empresa…»). En `/asados`: si el cliente confirma encargos por horas («recoger a las…»), añadir selector de hora al mensaje.

### 12.3 Regla de oro de conversión

En TODA página, a un toque de distancia: reservar o llamar. En móvil, la barra sticky inferior (§10) vive en todas las rutas de restaurante/carta/servicios.

---

# PARTE IV — SEO, RENDIMIENTO Y ACABADO

## 13 · SEO TOTAL

### 13.1 Objetivo y keywords

Dominar la búsqueda local. Familias objetivo (mapear a páginas, no acumular en una): «restaurante getafe», «menú del día getafe» (+precio), «tapas getafe», «donde comer en getafe (centro)», «restaurante para grupos / celebraciones getafe», «catering getafe», «asados para llevar getafe», «restaurante lavadero getafe», «bar calle toledo getafe». Un H1 único por página que use lenguaje real, no keyword stuffing.

### 13.2 Datos estructurados (lib/seo.ts, JSON-LD en cada ruta)

- `Organization` (grupo) en layout raíz: nombre, url, logo (placa), `sameAs` [FB, IG], email.
- `Restaurant` por local en su ficha **con los datos reales de §2**: `address` (PostalAddress), `geo` (coordenadas de la ficha), `telephone`, `openingHoursSpecification` generado desde `content/` (una sola fuente de verdad), `servesCuisine: ["Española","Tapas","Cocina casera"]`, `priceRange: "€"`, `menu: <url>/carta`, `acceptsReservations: true`, `hasMap` (link con place_id), `image` (fotos reales). **Sin `aggregateRating`** salvo orden expresa del cliente.
- `BreadcrumbList` en fichas y servicios; `WebSite` con `potentialAction` solo si se implementa búsqueda.
- Validar todo con Rich Results Test antes de cerrar B18.

### 13.3 Técnico

- `generateMetadata` por ruta: title ≤ 60 car. con patrón «{Página} · Restaurantes Avenida — Getafe», description única con CTA, canonical absoluto desde `NEXT_PUBLIC_SITE_URL`.
- **OG dinámicas** con `ImageResponse` (`app/og/`): placa del local + foto + claim; variante por ruta. Probar render real en WhatsApp/Telegram (es donde se compartirá).
- `sitemap.ts` (todas las rutas públicas, `lastModified` real) y `robots.ts` (bloquear `/dev/*`, `/gracias`).
- 404 con personalidad: placa «CALLE SIN SALIDA» + enlaces a Home/Carta/Reservas.
- Redirecciones del sitio viejo cuando el dominio apunte aquí: `/inicio → /`, `/plaza-lavadero → /restaurantes/lavadero` (+ las que aparezcan al revisar el índice de Google con `site:` manualmente, anota en docs/QA.md).
- NAP **idéntico carácter a carácter** en footer, fichas y JSON-LD.
- Texto real indexable en cada acto de la home (los titulares animados son texto DOM, nunca imagen/canvas; SplitText conserva el texto accesible, §16.1).

### 13.4 Checklist para el cliente (entra en el dossier de B22)

Actualizar Google Business Profile de ambos locales con la URL nueva; unificar nombre comercial; pedir reseñas a clientes contentos con QR en el ticket (propuesta Latech de seguimiento).

## 14 · PRESUPUESTOS DE RENDIMIENTO (bloqueantes en B19)

| Métrica | Presupuesto |
|---|---|
| LCP móvil (4G simulada, Moto G Power de Lighthouse) | ≤ 2,0 s |
| CLS | ≤ 0,05 |
| INP | ≤ 200 ms |
| JS inicial (gzip, ruta /) | ≤ 230 KB incluido GSAP (split por ruta: SplitText/Flip solo donde se usan) |
| Imagen hero | ≤ 220 KB (AVIF, tamaño servido correcto) |
| Fuentes | ≤ 130 KB total, subset latin, `display: swap`, fallback con `size-adjust` |
| Lighthouse móvil (/, ficha, carta) | ≥ 95 en Performance, 100 en SEO y Best Practices |
| FPS en animaciones de scroll | 60 estables (probar con CPU 4× throttle) |

Técnicas obligadas: `next/image` con el manifest (LQIP como placeholder, `fetchpriority="high"` solo en hero), `content-visibility: auto` en actos bajos, lazy de la galería/lightbox, sin librerías de iconos completas, `overscroll-behavior` controlado, cero `layout`/`paint` en frames de animación (verificar con DevTools Performance).

## 15 · LOS 40 DETALLES (pase obligatorio en B20 — esto es lo que se paga con gusto)

1. Favicon-placa: SVG + ICO + apple-touch + maskable (manifest PWA básico).
2. `theme-color` que acompaña el arco de luz (claro arriba, noche abajo vía meta dinámica razonable).
3. `::selection` en vermut con texto tiza.
4. Scrollbar fina personalizada (solo desktop, discreta).
5. Cursor propio en desktop: punto + anillo que crece sobre interactivos; desactivado en touch.
6. Botones magnéticos suaves (desplazamiento ≤ 6 px) en CTAs principales.
7. Subrayados de enlace animados con clip-path (entran de izquierda, salen a derecha).
8. `focus-visible`: anillo doble esmalte cobalto, offset 3 px — bonito de verdad, no el default.
9. Skip-to-content estilizado (visible al focus).
10. Estado vivo «Abierto/Cierra pronto/Cerrado · abre {día} a las {hora}» con `aria-live="polite"`, tick por minuto.
11. Reloj local del hero (HH:MM Europe/Madrid) que late sutilmente cada minuto.
12. Marquee de raciones: pausable al hover, velocidad ligada al scroll con tope.
13. Hover de plato: precio-ticket que entra rotado -2°→0°.
14. Números tabulares en TODOS los precios y horarios.
15. Click-to-copy en teléfonos (desktop) con tooltip «Copiado».
16. Toasts propios (esquina inferior, entran con spring corto de Motion).
17. Barra de progreso de scroll como «línea de calle» de 2 px bajo el header.
18. View Transition de la placa entre home ↔ ficha (fallback limpio si el navegador no soporta).
19. Lightbox: precarga vecinas, cuenta «n/total», cierre con Esc y arrastre vertical en móvil.
20. Formularios: validación inline amable al blur, nunca gritona al primer render; errores que dicen cómo arreglarse.
21. `/gracias` con sello estampado + resumen de lo solicitado.
22. 404 «CALLE SIN SALIDA» con placa y tres salidas útiles.
23. `error.tsx` global con tono de la casa («Se nos ha caído una bandeja…») y botón reintentar.
24. Loading states: skeletons con shimmer en tono hueso (jamás spinners genéricos a pantalla completa).
25. Página al perder foco: `document.title` → «¿Te esperamos en la Avenida?» (texto, sin emoji).
26. Atajo de teclado `R` → /reservas (anunciado en el footer, easter egg sobrio).
27. `console.log` con la placa en ASCII + «Web por Latech — serviciosonlineweb.com».
28. `humans.txt` con créditos.
29. Monograma «A» de azulejo como separador entre actos (SVG, 24 px, opacidad 30 %).
30. Tilt ±1.5° en posavasos-testimonios que se endereza al hover.
31. Safe-areas iOS en barra sticky y footer (`env(safe-area-inset-bottom)`).
32. Imagen estática del mini-mapa con estilo propio (tonos de marca), no iframe.
33. «Carta actualizada el {fecha}» visible (confianza = conversión).
34. Print stylesheets: carta y menú del día perfectos en A4.
35. OG probada en WhatsApp real (es el canal del cliente).
36. Microinteracción del stepper de personas (+/-) con dígito que rueda.
37. Header que se esconde al bajar y asoma al subir (con sombra solo cuando hay scroll).
38. Estados vacíos con dirección: «Aún no hay fotos de este local. Pásate y hazla tú :)» — solo si de verdad ocurre.
39. Año del footer dinámico + NAP microformateado.
40. Cada animación tiene propósito narrativo del Paseo; si no lo tiene, se corta (Chanel: quita un accesorio antes de salir).

## 16 · CHECKLIST DE BUGS CONOCIDOS DE LA CASA (verificar TODOS en B21)

1. **SplitText «Saborsin»**: configurar para no comerse espacios (`type: "words,chars"`, revisar `wordDelimiter`); test automático: el texto renderizado concatenado === texto fuente; `aria-label` con el original en el contenedor.
2. **Emojis con halo en fondos oscuros**: prohibidos; todo icono es SVG inline (Ley 6).
3. **iOS viewport**: `svh`/`dvh` en todo lo fullscreen; jamás `100vh`. Probar con barra de Safari visible/oculta.
4. **Safari + backdrop-filter**: artefactos conocidos → si se usa, probar en Safari real; fallback de fondo sólido con `@supports`.
5. **ScrollTrigger tras carga de imágenes/fuentes**: `ScrollTrigger.refresh()` en `window.load`, tras `document.fonts.ready` y tras decodificar imágenes del acto (o dimensiones reservadas SIEMPRE vía manifest → cero shift y cero refresh tardío).
6. **Lenis + ScrollTrigger**: integración canónica (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((t)=>lenis.raf(t*1000))` + `gsap.ticker.lagSmoothing(0)`); un solo Lenis global; cuidado con `scrollerProxy` duplicados.
7. **Pin horizontal en móvil**: no secuestrar scroll táctil; en móvil el Acto III es apilado con snap (§9).
8. **Hydration mismatch en «Abierto ahora» y reloj**: calcular SOLO en cliente tras montar; SSR renderiza horario estático del día.
9. **CLS por `next/image fill`**: contenedores con aspect-ratio del manifest; nunca alturas implícitas.
10. **Overflow 100vw**: vigilar scrollbar horizontal fantasma (usar `100%`/container queries, probar en Windows con scrollbars visibles).
11. **View Transitions**: feature-detect; sin soporte → navegación normal sin parpadeo.
12. **wa.me**: encodeURIComponent del mensaje completo; probar con tildes y «ñ» reales.
13. **Fuentes**: next/font con fallback ajustado (`adjustFontFallback`) → cero FOUT brusco en el display.
14. **sessionStorage del preloader**: try/catch (Safari privado lanza).

---

# PARTE V — PLAN DE EJECUCIÓN

## 17 · PLAN DE BLOQUES (B0–B22) — cada bloque termina en compuerta

> Formato de cierre de bloque: commit(s) convencionales en rama `bNN-nombre` → push → URL de preview de Vercel → capturas (móvil 390 + desktop 1440) → resumen de 5 líneas → **STOP hasta OK de Andreh**. Tras el OK: merge a `main` (squash o merge atómico), tag `v0.NN`.

**B0 · Arranque y verdad.** Leer este documento ENTERO. Ejecutar la skill (§1.1). `git init` + remote `https://github.com/Andreh33/avenidarestaurantes.git` (o clonar si ya tiene contenido), rama `main` protegida por protocolo. Scaffold Next 16 + TS strict + Tailwind v4 + estructura §7.2. Crear: `CLAUDE.md` (destilado de las 10 leyes + protocolo, para que toda sesión futura las cargue), `docs/DECISIONES.md` (primera entrada: Ley 2 sin reduced motion), `docs/MENSAJE-CLIENTE.md` (§2.8), `.env.example`, `.gitignore` con `_ingest/`. Conectar Vercel (`vercel link`, proyecto `avenidarestaurantes`) y hacer **primer deploy** con una placa estática y «Próximamente» digno (el CI/CD queda vivo el día 1). Entregar en el gate: lista de `[PENDIENTE]` (§2.7) formateada para reenviar al cliente.

**B1 · Tokens y cimientos.** `@theme` con paleta §5.1, fuentes §5.2 con next/font, escala tipográfica fluida, layout raíz con Lenis+GSAP registrados (lib/gsap.ts, lib/lenis.ts), componentes base (Container, Section, Button con todos sus estados, SplitHeading), página interna `/dev/styleguide` con todo el sistema a la vista. Gate: captura del styleguide.

**B2 · Ingesta de assets.** Ejecutar §8 completo (vías por orden, curaduría por visión, ingest.mjs, manifest, alts). Gate: `/dev/assets` (hoja de contactos clasificada) para aprobación de Andreh + informe: cuántas fotos por local/categoría, cuáles dan para hero, qué falta pedir al cliente.

**B3 · Content layer.** Schemas zod + datos reales de §2 congelados en `content/` + `lib/horarios.ts` con tests de `isOpenNow` (casos: antes de abrir, abierto, cierra en 30 min, cerrado, medianoche 00:00). `pnpm validate:content` en pre-push. Gate rápido.

**B4 · Navegación y footer.** Header (placa mini, nav, CTA Reservar, esconder/asomar §15.37), menú móvil a pantalla completa con stagger, footer completo con NAP + estado vivo + legal. Gate.

**B5 · Acto 0 + Acto I.** Preloader-placa + hero completo con collage parallax, estado vivo, reloj. Gate exigente: vídeo corto del load.

**B6 · Acto II.** Manifiesto scrubbed. Gate rápido.

**B7 · Acto III — El Paseo.** El bloque más delicado del proyecto: pin horizontal + arco de luz + fachadas + línea de calle + variante móvil apilada. Probar en táctil real antes del gate. Gate con vídeo desktop y móvil.

**B8 · Acto IV.** La Barra (grid de platos + marquee). Gate.

**B9 · Acto V.** Pizarra del menú del día + print CSS. Gate.

**B10 · Acto VI.** Servicios (3 cards). Gate.

**B11 · Acto VII.** Testimonios reales aprobados. Gate.

**B12 · Acto VIII + integración del arco completo.** Noche, placas encendidas, mapa estático, cierre, y revisión del scrub de luz de punta a punta de la home. Gate LARGO: la home entera se revisa como pieza única (vídeo completo del paseo).

**B13–B16 · En paralelo con subagentes (máx. 4), una rama por bloque:**
- **B13** Plantilla de restaurante + theming + View Transitions (centro y lavadero con datos reales).
- **B14** `/carta` completa + `/menu-del-dia`.
- **B15** `/reservas` (3 vías + Server Action + degradación) + `/gracias`.
- **B16** `/eventos`, `/catering`, `/asados`.
Cada subagente respeta tokens, leyes y componentes existentes; merges atómicos uno a uno con gate individual.

**B17 · Legal y analítica.** Aviso legal, privacidad, cookies (con datos `[PENDIENTE legales]`), Vercel Analytics + Speed Insights (cookieless: sin banner intrusivo; página de cookies lo explica). Gate.

**B18 · SEO total.** Todo §13: metadata, JSON-LD validado, OG dinámicas probadas en WhatsApp, sitemap, robots, 404, redirects preparados. Gate con capturas del Rich Results Test.

**B19 · Rendimiento.** Auditoría completa contra §14 con Lighthouse (móvil) y DevTools Performance; code-split de GSAP por ruta; informe de números ANTES/DESPUÉS. Gate bloqueante: no se pasa sin presupuesto cumplido.

**B20 · Pase de los 40 detalles.** Recorrer §15 uno a uno, marcando ✅/❌ en `docs/QA.md`. Gate con la lista completa.

**B21 · QA final.** Checklist §16 completo + matriz de dispositivos (iPhone SE/14/15 Safari, Pixel Chrome, iPad, Safari macOS, Chrome/Firefox Windows con scrollbars) + pase de accesibilidad (teclado de punta a punta, lector en hero y reservas). Gate.

**B22 · Lanzamiento y dossier.** Solo si NO quedan `[PENDIENTE]` vivos. Deploy prod + tag `v1.0.0`. Generar `docs/DOSSIER-ENTREGA.md`: vídeo de 60 s del paseo completo, capturas clave, informe Lighthouse, comparativa brutal («su web hoy: error 500 → su web ahora»), checklist de DNS para apuntar restaurantesavenida.com a Vercel, checklist Google Business Profile (§13.4), y propuesta de mantenimiento (cambios de menú del día en minutos; fase 2: panel de autogestión/Sanity). Este dossier es la herramienta de venta de Andreh: cuídalo como una página más.

## 18 · PROTOCOLO DE TRABAJO

- **Commits**: convencionales con scope — `feat(paseo): acto III pin horizontal con arco de luz`. Tipos: feat, fix, perf, refactor, content, chore, docs. Atómicos y en español.
- **Ramas**: `bNN-nombre` por bloque; `main` solo recibe merges aprobados; tag `v0.NN` al cerrar bloque, `v1.0.0` al lanzar.
- **`[LIBERTAD]`**: cuando este documento la concede (o Andreh la dé en chat), decide tú; registra en `docs/DECISIONES.md`: decisión, alternativas consideradas, porqué en ≤ 5 líneas. Si dudas entre dos caminos con impacto visual grande, enseña ambos en el gate.
- **Datos que faltan**: jamás inventar (Ley 1). Placeholder honesto + ítem en la lista de preguntas + seguir construyendo lo que no dependa de ello.
- **Definición de HECHO por bloque**: build sin warnings · lint limpio · `validate:content` en verde · responsive verificado en 390/768/1280/1920 · sin CLS visible · bugs de §16 que apliquen comprobados · capturas adjuntas · preview desplegada.
- **Si algo se rompe en un merge**: revert inmediato, se arregla en la rama, no se «parchea» main.
- **Tono con Andreh en los gates**: resumen ejecutivo de 5 líneas, qué decidiste con libertad, qué necesitas de él. Sin novelas.

## 19 · CIERRE

Este proyecto es la demostración de la tesis de Latech: que un bar de barrio de Getafe merece la misma artesanía digital que un grupo de lujo. Cada placa, cada viraje de luz y cada precio en tabular existen para que cuando el dueño abra su web en el móvil detrás de la barra, piense: «esto somos nosotros, pero en grande». Toca techo.

— Fin del prompt maestro · Latech, 11/06/2026
