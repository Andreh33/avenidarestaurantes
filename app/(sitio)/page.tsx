import { Acto0Preloader } from "@/components/paseo/Acto0Preloader";
import { Acto1Hero } from "@/components/paseo/Acto1Hero";
import { Acto2Manifiesto } from "@/components/paseo/Acto2Manifiesto";
import { Acto3Paseo } from "@/components/paseo/Acto3Paseo";
import { Acto4Barra } from "@/components/paseo/Acto4Barra";
import { Acto5Pizarra } from "@/components/paseo/Acto5Pizarra";
import { Acto6Servicios } from "@/components/paseo/Acto6Servicios";
import { Acto7Voces } from "@/components/paseo/Acto7Voces";
import { Acto8Noche } from "@/components/paseo/Acto8Noche";
import { LightArc } from "@/components/motion/LightArc";
import { SeparadorA } from "@/components/ui/SeparadorA";

/**
 * Home «El Paseo» (§9): de la mañana a la noche en ocho actos.
 * El arco de luz vira con el scroll: amanecer (Acto I) → tarde dorada
 * (Acto III) → azul noche con placas encendidas (Acto VIII).
 */
export default function Home() {
  return (
    <>
      <LightArc />
      <Acto0Preloader />
      <Acto1Hero />
      <Acto2Manifiesto />
      <Acto3Paseo />
      <SeparadorA />
      <Acto4Barra />
      <Acto5Pizarra />
      <SeparadorA />
      <Acto6Servicios />
      <Acto7Voces />
      <Acto8Noche />
    </>
  );
}
