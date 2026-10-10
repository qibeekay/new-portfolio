import React from "react";
import { motion } from "framer-motion";
import { SplitReveal, type TextPart } from "./text/SplitReveal";
import { EASE_OUT } from "../utils/motion";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: TextPart[];
  description?: string;
  children?: React.ReactNode;
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  children,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <p className="font-mono text-xs text-paper/50">
          ({index}) — {label}
        </p>
        <SplitReveal
          parts={title}
          className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
        />
      </div>
      <motion.div
        className="flex flex-col gap-6 md:col-span-5 md:items-end"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.15 }}
      >
        {description && (
          <p className="max-w-sm text-paper/60 md:text-right">{description}</p>
        )}
        {children}
      </motion.div>
    </div>
  );
}
