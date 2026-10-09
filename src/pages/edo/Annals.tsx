import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/experience';
import { roleSpot } from '../../utils/themeColors';
import type { SpotColor } from '../../types/portfolio';

const INK: Record<SpotColor, string> = {
  red: '#b23a2c',
  yellow: '#a5813c',
  blue: '#27415f',
  teal: '#6a7a4b'
};

/** Chronicles as a horizontal river of years, read left to right along one rule. */
export function Annals() {
  const ordered = experience.map((role, index) => ({ role, spot: roleSpot(index) })).reverse();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <p className="font-edo text-[11px] tracking-[0.42em] text-edo-vermilion">年譜 · THE ANNALS</p>
      <h3 className="mt-3 font-edo text-3xl font-semibold text-sumi">Every station along the road</h3>

      <div className="relative mt-10">
        <span className="absolute left-0 right-0 top-[7px] h-px bg-sumi/40" aria-hidden="true" />
        <ol className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {ordered.map(({ role, spot }, index) =>
          <motion.li
            key={role.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.26, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="relative pt-8">
            
              <span
              className="absolute left-0 top-0 h-[15px] w-[15px] rotate-45 border border-sumi/50"
              style={{ backgroundColor: INK[spot] }}
              aria-hidden="true" />
            
              <p className="font-edo text-[11px] tracking-[0.26em] text-sumi-wash">{role.period}</p>
              <h4 className="mt-1 font-edo text-xl font-semibold leading-snug text-sumi">{role.title}</h4>
              <p className="font-edo text-sm tracking-[0.1em]" style={{ color: INK[spot] }}>
                {role.company} · {role.location}
              </p>
              <p className="mt-3 font-edo text-[14px] leading-loose text-sumi-soft">{role.summary}</p>
              <ul className="mt-3 space-y-1.5">
                {role.highlights.map((win) =>
              <li key={win} className="flex gap-2 font-edo text-[13px] leading-relaxed text-sumi-soft">
                    <span aria-hidden="true" className="text-edo-vermilion">
                      ・
                    </span>
                    {win}
                  </li>
              )}
              </ul>
            </motion.li>
          )}
        </ol>
      </div>
    </div>);

}