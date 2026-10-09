import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { powerGroups } from '../../data/skills';
import type { SpotColor } from '../../types/portfolio';

const INK: Record<SpotColor, string> = {
  red: '#b23a2c',
  yellow: '#a5813c',
  blue: '#27415f',
  teal: '#6a7a4b'
};

/** Skills as noren stripes: measured vertically, read bottom to top. */
export function Craft() {
  const [focused, setFocused] = useState<string | null>(null);
  const allPowers = powerGroups.flatMap((group) => group.powers.map((power) => ({ ...power, group: group.label })));
  const active = allPowers.find((power) => power.id === focused) ?? null;

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-edo text-[11px] tracking-[0.42em] text-edo-vermilion">技 · CRAFT</p>
      <h3 className="mt-3 font-edo text-3xl font-semibold text-sumi">The measured hand</h3>
      <p className="mt-2 max-w-xl font-edo text-[15px] leading-loose text-sumi-soft">
        Nine disciplines, hung as dyed cloth. Taller cloth, longer practice — touch one to read the note beneath.
      </p>

      <div className="mt-8 flex h-[280px] items-end gap-3 sm:gap-5">
        {allPowers.map((power, index) => {
          const isActive = power.id === focused;
          return (
            <button
              key={power.id}
              type="button"
              onMouseEnter={() => setFocused(power.id)}
              onFocus={() => setFocused(power.id)}
              onMouseLeave={() => setFocused((current) => current === power.id ? null : current)}
              onBlur={() => setFocused((current) => current === power.id ? null : current)}
              className="focus-sumi group flex h-full flex-1 flex-col items-center justify-end"
              aria-pressed={isActive}>
              
              <motion.span
                className="w-full border-x border-t border-sumi/30"
                style={{ backgroundColor: INK[power.color] }}
                initial={{ height: 0 }}
                whileInView={{ height: `${power.level}%` }}
                viewport={{ once: true }}
                animate={{ opacity: !focused || isActive ? 1 : 0.4 }}
                transition={{ duration: 0.28, delay: index * 0.04, ease: [0.23, 1, 0.32, 1] }} />
              
              <span className="mt-3 vertical-jp h-[104px] font-edo text-[13px] tracking-[0.1em] text-sumi">
                {power.name}
              </span>
            </button>);

        })}
      </div>

      <div className="mt-6 min-h-[64px] border-t border-sumi/25 pt-4">
        {active ?
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
          
            <p className="font-edo text-[11px] tracking-[0.28em] text-sumi-wash">{active.group.toUpperCase()}</p>
            <p className="mt-1 font-edo text-lg text-sumi">
              <span className="font-semibold">{active.name}</span> · {active.detail}
            </p>
          </motion.div> :

        <p className="font-edo text-[15px] leading-loose text-sumi-wash">
            Also kept in the toolbox: GraphQL, Redis, Playwright, gRPC, AWS, Docker, Vitest, Figma, Sentry, Kubernetes.
          </p>
        }
      </div>
    </div>);

}