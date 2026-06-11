/**
 * Registro central de GSAP. Solo el núcleo + ScrollTrigger viven aquí:
 * SplitText, Flip y Observer se registran en los componentes que los usan
 * para que el code-splitting por ruta funcione (presupuesto §14).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
