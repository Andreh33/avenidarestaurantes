import { Acto0Preloader } from "@/components/paseo/Acto0Preloader";
import { Acto1Hero } from "@/components/paseo/Acto1Hero";
import { Acto2Manifiesto } from "@/components/paseo/Acto2Manifiesto";
import { Acto3Paseo } from "@/components/paseo/Acto3Paseo";
import { LightArc } from "@/components/motion/LightArc";

/**
 * Home «El Paseo» (§9). Construida acto a acto: Acto 0 + I (B5) ✓,
 * Acto II (B6) ✓, Acto III (B7) ✓. Actos IV–VIII llegan en B8–B12.
 */
export default function Home() {
  return (
    <>
      <LightArc />
      <Acto0Preloader />
      <Acto1Hero />
      <Acto2Manifiesto />
      <Acto3Paseo />
    </>
  );
}
