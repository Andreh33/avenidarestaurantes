/**
 * Lenis global único (§16.6) con la integración canónica ScrollTrigger:
 * lenis.on('scroll', ScrollTrigger.update) + raf en el ticker de GSAP
 * + lagSmoothing(0). Jamás crear un segundo Lenis ni scrollerProxy.
 */
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;

function rafTick(time: number) {
  lenis?.raf(time * 1000);
}

export function initLenis(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({
    autoRaf: false,
    lerp: 0.12,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(rafTick);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis(): void {
  if (!lenis) return;
  gsap.ticker.remove(rafTick);
  lenis.destroy();
  lenis = null;
}

export function getLenis(): Lenis | null {
  return lenis;
}
