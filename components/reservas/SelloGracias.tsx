"use client";

import { motion } from "motion/react";

/** Sello que se estampa con overshoot (§12.1): scale + rotate. */
export function SelloGracias() {
  return (
    <motion.div
      initial={{ scale: 2.2, rotate: 10, opacity: 0 }}
      animate={{ scale: 1, rotate: -4, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 17, delay: 0.15 }}
      className="mx-auto inline-flex rotate-[-4deg] flex-col items-center rounded-lg border-[3.5px] border-vermut px-7 py-4 text-vermut"
    >
      <span className="font-sans text-[0.65rem] font-bold tracking-[0.3em]">
        RESTAURANTES AVENIDA
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        RESERVA SOLICITADA
      </span>
    </motion.div>
  );
}
