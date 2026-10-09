import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePointer';

const WORDS = ['POW!', 'ZAP!', 'BAM!', 'WHAM!', 'KRAK!', 'THWIP!'] as const;
const INKS = ['#e63946', '#f4a300', '#2f6690'] as const;

interface Burst {
  id: number;
  x: number;
  y: number;
  word: string;
  color: string;
  tilt: number;
}

/**
 * Stamps a hand-lettered sound effect at the pointer whenever a control is
 * actually activated — deliberately not on every click of the page, so the
 * effect stays a reward rather than noise.
 */
export function SfxLayer() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let seed = 0;
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('a, button, [role="button"], [data-sfx="true"]')) return;
      seed += 1;
      const id = seed;
      const burst: Burst = {
        id,
        x: event.clientX,
        y: event.clientY,
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        color: INKS[Math.floor(Math.random() * INKS.length)],
        tilt: Math.random() * 24 - 12
      };
      setBursts((current) => [...current.slice(-3), burst]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((item) => item.id !== id));
      }, 520);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {bursts.map((burst) =>
        <motion.span
          key={burst.id}
          initial={{ opacity: 0, scale: 0.6, rotate: burst.tilt }}
          animate={{ opacity: 1, scale: 1, rotate: burst.tilt, y: -22 }}
          exit={{ opacity: 0, scale: 1.25, y: -46 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="ink-stroke absolute font-display text-4xl uppercase"
          style={{
            left: burst.x,
            top: burst.y,
            color: burst.color,
            translate: '-50% -100%',
            textShadow: '4px 4px 0 #141210'
          }}>
          
            {burst.word}
          </motion.span>
        )}
      </AnimatePresence>
    </div>);

}