import { create } from "zustand";

/** Estado de UI compartido (§6: Zustand para nav, lightbox, builder). */
type EstadoUi = {
  menuAbierto: boolean;
  abrirMenu: () => void;
  cerrarMenu: () => void;
};

export const useUi = create<EstadoUi>((set) => ({
  menuAbierto: false,
  abrirMenu: () => set({ menuAbierto: true }),
  cerrarMenu: () => set({ menuAbierto: false }),
}));
