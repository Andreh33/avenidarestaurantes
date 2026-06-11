import { Acto0Preloader } from "@/components/paseo/Acto0Preloader";
import { Acto1Hero } from "@/components/paseo/Acto1Hero";
import { LightArc } from "@/components/motion/LightArc";

/**
 * Home «El Paseo» (§9). Construida acto a acto: Acto 0 + I (B5) ✓.
 * Actos II–VIII llegan en B6–B12.
 */
export default function Home() {
  return (
    <>
      <LightArc />
      <Acto0Preloader />
      <Acto1Hero />
    </>
  );
}
