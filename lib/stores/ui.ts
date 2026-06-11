import { create } from "zustand";

/** Estado de UI compartido (§6: Zustand para nav, lightbox, builder). */
type EstadoUi = {
  menuAbierto: boolean;
  abrirMenu: () => void;
  cerrarMenu: () => void;
  /** true cuando el Acto 0 terminó (o se saltó por sessionStorage):
   *  el hero espera esta señal para arrancar su intro. */
  preloaderHecho: boolean;
  marcarPreloaderHecho: () => void;
};

export const useUi = create<EstadoUi>((set) => ({
  menuAbierto: false,
  abrirMenu: () => set({ menuAbierto: true }),
  cerrarMenu: () => set({ menuAbierto: false }),
  preloaderHecho: false,
  marcarPreloaderHecho: () => set({ preloaderHecho: true }),
}));
