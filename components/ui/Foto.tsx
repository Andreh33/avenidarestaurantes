import Image from "next/image";
import { fotoPorId, type Foto as TipoFoto } from "@/lib/assets";
import { cn } from "@/lib/cn";

/**
 * Foto de la casa: next/image con dimensiones del manifest (cero CLS,
 * §16.9), LQIP blur-up y curva cálida consistente (§5.4) para
 * homogeneizar tomas dispares.
 */
export function Foto({
  id,
  foto,
  className,
  sizes,
  priority = false,
  fill = false,
}: {
  id?: string;
  foto?: TipoFoto;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const f = foto ?? fotoPorId(id!);
  return (
    <Image
      src={f.src}
      alt={f.alt}
      width={fill ? undefined : f.width}
      height={fill ? undefined : f.height}
      fill={fill}
      placeholder="blur"
      blurDataURL={f.lqip}
      sizes={sizes}
      priority={priority}
      className={cn("foto-curva", fill && "object-cover", className)}
    />
  );
}
