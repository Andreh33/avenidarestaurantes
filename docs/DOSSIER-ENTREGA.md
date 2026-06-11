# DOSSIER DE ENTREGA — Restaurantes Avenida · «El Paseo»

**Estado:** pre-lanzamiento (v0.9) · 11/06/2026 · Latech
**Producción:** https://avenidarestaurantes.vercel.app
**Repo:** https://github.com/Andreh33/avenidarestaurantes

---

## 1 · El antes y el después

| | Antes | Ahora |
|---|---|---|
| Su web | **Error 500** (caída desde hace meses) | Web cinemática completa: el Paseo de la mañana a la noche |
| Reservas | Solo teléfono, si encontrabas el número | Teléfono click-to-call, builder de WhatsApp y formulario, a un toque desde cualquier página |
| Google | Datos dispersos y sin web | JSON-LD Restaurant por local, sitemap, OG para compartir por WhatsApp |
| Móvil | Nada | Experiencia completa en 390 px con barra de reserva fija |

## 2 · Qué se ha construido

- **Home «El Paseo»**: 8 actos con arco de luz (amanecer → tarde dorada → noche con placas encendidas), preloader-placa con Flip, pin horizontal de locales, manifiesto scrubbed con el copy real del cliente, pizarra, servicios, voces y cierre nocturno con mapa propio.
- **Sistema de placas azulejo**: identidad completa (placa por local, mini para header/footer, favicon, OG, 404 «CALLE SIN SALIDA», sello de /gracias).
- **Fichas de local** con NAP, horarios con «hoy» resaltado, estado vivo (Abierto/Cierra pronto/Cerrado · TZ Madrid), teléfonos copiables y barra móvil de reserva.
- **Reservas en 3 vías** (§12): llamar · WhatsApp con mensaje compuesto · formulario con Server Action (Resend opcional con degradación elegante).
- **Páginas**: carta, menú del día (pizarra), eventos (sala privada Lavadero), catering, asados, legales, gracias, 404, error.
- **SEO**: metadata por ruta, JSON-LD (Organization/Restaurant/Breadcrumb), sitemap, robots (bloquea /dev y /gracias), redirects del sitio viejo, OG dinámica.
- **Calidad**: TS strict, zod en todo el contenido (`validate:content` bloquea builds con datos rotos), 11 tests de horarios, hook de pre-push, analítica sin cookies.

## 3 · Lo que falta del cliente (bloquea el lanzamiento con dominio)

| # | Dato | Dónde encaja |
|---|---|---|
| P1 | Locales exactos y nombres comerciales (¿Avenida 47?) | content/restaurantes.ts |
| P2 | **Cartas con precios actuales** | /carta + Acto IV (grid de platos firma) |
| P3 | **Menú del día tipo + precio** | /menu-del-dia + Acto V |
| P4 | **Teléfonos vigentes + WhatsApp** | reservas (activa la vía WhatsApp completa) |
| P5 | Horarios actuales por local | estado vivo Lavadero |
| P6 | Logo original (¿o placas?) | identidad |
| P7 | **Fotos (export de Meta + móvil)** | B2: hero, fachadas, galerías, OG |
| P8 | OK a testimonios web 2021 | Acto VII (posavasos ya programados) |
| P9 | Año de fundación | tercera línea del hero |
| P10 | Aforos y salones | /eventos |
| P11 | **Datos legales (razón social, NIF, dirección fiscal)** | aviso legal + privacidad |
| P12 | Acceso DNS de restaurantesavenida.com | lanzamiento |

El mensaje listo para reenviar está en `docs/MENSAJE-CLIENTE.md`.

## 4 · Checklist de lanzamiento (cuando lleguen P2–P11)

1. Volcar datos a `content/` → `pnpm validate:content` en verde sin pendientes de lanzamiento.
2. Ingesta de fotos (B2): `scripts/ingest.mjs` → curaduría → `/dev/assets` → hero y fachadas con foto real.
3. `RESEND_API_KEY` + `RESERVAS_EMAIL_TO` en Vercel (vercel env add) → formulario con email directo. Verificar dominio de envío en Resend.
4. **DNS**: en el registrador de restaurantesavenida.com → A `76.76.21.21` o CNAME `cname.vercel-dns.com`; añadir dominio en Vercel → Project → Domains. `NEXT_PUBLIC_SITE_URL=https://restaurantesavenida.com` en producción.
5. Google Business Profile de ambos locales: URL nueva, nombre comercial unificado, fotos.
6. Probar OG compartiendo por WhatsApp real (§15.35) y Rich Results Test.
7. Pasada táctil real (iPhone Safari + Android Chrome) del Acto III y la barra de reserva.
8. Tag `v1.0.0` + dossier final con vídeo de 60 s del paseo.

## 5 · Mantenimiento propuesto (la venta de Andreh)

- **Hoy**: cambiar el menú del día = editar `content/menu-del-dia.ts` (2 min, con validación automática).
- **Fase 2**: panel de autogestión (Sanity) para que el propio restaurante cambie menú y carta desde el móvil, sin tocar código.
- QR en el ticket pidiendo reseña a clientes contentos (mejora la nota de Google que hoy no destacamos).

## 6 · Capturas clave

Todas en `docs/capturas/`: preloader (3 frames), hero 1440/390, paseo horizontal (3 puntos del scrub), barra, noche, ficha, reservas, 404.
