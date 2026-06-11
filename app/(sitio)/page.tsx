import { Acto0Preloader } from "@/components/paseo/Acto0Preloader";
import { Acto1Hero } from "@/components/paseo/Acto1Hero";
import { Acto2Manifiesto } from "@/components/paseo/Acto2Manifiesto";
import { Acto3Paseo } from "@/components/paseo/Acto3Paseo";
import { Acto4Barra } from "@/components/paseo/Acto4Barra";
import { LightArc } from "@/components/motion/LightArc";

/**
 * Home «El Paseo» (§9). Construida acto a acto: Acto 0 + I (B5) ✓,
 * Acto II (B6) ✓, Acto III (B7) ✓, Acto IV (B8) ✓.
 * Actos V–VIII llegan en B9–B12.
 */
export default function Home() {
  return (
    <>
      <LightArc />
      <Acto0Preloader />
      <Acto1Hero />
      <Acto2Manifiesto />
      <Acto3Paseo />
      <Acto4Barra />
    </>
  );
}
