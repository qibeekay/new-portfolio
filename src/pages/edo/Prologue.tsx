import React from "react";
import { motion } from "framer-motion";
import { heroArt } from "../../data/hero";

const marks = [
  { label: "歳月", value: "九年", note: "Five years of service" },
  { label: "任", value: "筆頭工", note: "Staff engineer, Northwind" },
  { label: "居", value: "里斯本", note: "Ibadan· CET" },
];

export function Prologue() {
  return (
    <div className="flex h-full flex-col justify-center gap-8 lg:flex-row lg:items-center">
      <div className="max-w-xl">
        <p className="font-edo text-[11px] tracking-[0.42em] text-edo-vermilion">
          序 · PROLOGUE
        </p>
        <h1 className="mt-3 font-edo text-5xl font-extrabold leading-[1.05] text-sumi sm:text-6xl">
          Anugo Mokwe
        </h1>
        <p className="mt-2 font-edo-accent text-2xl tracking-[0.16em] text-edo-indigo">
          壱理場 工匠
        </p>
        <div className="mt-5 h-px w-24 bg-sumi/40" aria-hidden="true" />
        <p className="mt-5 font-edo text-lg leading-loose text-sumi-soft">
          A software engineer of Five years. Realtime systems, collaborative
          editors, and interfaces that keep their composure when everything
          around them is on fire.
        </p>

        <dl className="mt-8 flex flex-wrap gap-8">
          {marks.map((mark, index) => (
            <motion.div
              key={mark.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.26,
                delay: index * 0.05,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <dt className="font-edo-accent text-xs tracking-[0.3em] text-sumi-wash">
                {mark.label}
              </dt>
              <dd className="mt-1 font-edo text-2xl text-sumi">{mark.value}</dd>
              <dd className="font-edo text-[11px] tracking-[0.16em] text-sumi-wash">
                {mark.note}
              </dd>
            </motion.div>
          ))}
        </dl>

        <p className="mt-8 font-edo text-[11px] tracking-[0.28em] text-sumi-wash">
          巻を左へ ─ UNROLL THE SCROLL TO THE LEFT
        </p>
      </div>

      <div className="relative w-full max-w-sm shrink-0">
        <div className="border border-sumi/30 bg-washi-light p-3 shadow-[0_2px_0_0_rgba(28,26,23,0.18)]">
          <img
            src={heroArt.edoPortrait}
            alt="Woodblock-print portrait of Anugo Mokwe as an Edo-period craftsman at a writing desk"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="absolute -bottom-4 -right-3 grid h-14 w-14 place-items-center bg-edo-vermilion font-edo-accent text-lg text-washi-light seal-stamp">
          利場
        </span>
      </div>
    </div>
  );
}
