import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, type SiteTheme } from "../contexts/ThemeContext";

const WASH: Record<
  SiteTheme,
  { color: string; word: string; className: string; font: string }
> = {
  studio: {
    color: "#0a0a0b",
    word: "Anugo Mokwe",
    className: "text-5xl italic text-[#edeae3] sm:text-7xl",
    font: '"Instrument Serif", Georgia, serif',
  },
  workspace: {
    color: "#3f0e40",
    word: "qibeekay.dev",
    className: "text-4xl font-semibold tracking-tight text-white sm:text-6xl",
    font: "Inter, system-ui, sans-serif",
  },
  comic: {
    color: "#141210",
    word: "KA-POW!",
    className:
      "text-5xl uppercase tracking-[0.14em] text-pulp-yellow sm:text-7xl",
    font: "Bangers, Impact, sans-serif",
  },
  edo: {
    color: "#27415f",
    word: "墨 · SUMI",
    className: "text-5xl tracking-[0.2em] text-washi sm:text-7xl",
    font: '"Shippori Mincho", Georgia, serif',
  },
};

/** A single stroke sweeps the screen; the next world is already printed behind it. */
export function MorphOverlay() {
  const { morphing, incoming, theme } = useTheme();
  const target = WASH[incoming ?? theme];

  return (
    <AnimatePresence>
      {morphing ? (
        <motion.div
          key="morph"
          className="pointer-events-none fixed inset-0 z-[120]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 origin-left"
            style={{ backgroundColor: target.color }}
            initial={{ scaleX: 0, skewX: -8 }}
            animate={{ scaleX: 1, skewX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          />

          <motion.p
            className="absolute inset-0 grid place-items-center text-center"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.18,
              delay: 0.08,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <span
              className={target.className}
              style={{ fontFamily: target.font }}
            >
              {target.word}
            </span>
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
