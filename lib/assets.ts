import manifest from "@/content/assets.manifest.json";

export type Foto = {
  id: string;
  tier: "hero" | "grid" | "descarte";
  src: string;
  width: number;
  height: number;
  lqip: string;
  alt: string;
  fuente: string;
};

export const fotos = manifest as Foto[];

export function fotoPorId(id: string): Foto {
  const f = fotos.find((x) => x.id === id);
  if (!f) throw new Error(`Foto inexistente en el manifest: ${id}`);
  return f;
}

export function fotosDeLocal(slug: string): Foto[] {
  return fotos.filter((f) => f.id.startsWith(`${slug}-`));
}

export function fachadaDeLocal(slug: string): Foto | undefined {
  return fotosDeLocal(slug).find((f) => f.tier === "hero");
}
