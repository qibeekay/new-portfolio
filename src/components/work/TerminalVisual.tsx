import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { TerminalLine } from '../../types/portfolio';
import { EASE_OUT } from '../../utils/motion';

const TONES = {
  cmd: 'text-paper',
  ok: 'text-accent',
  plain: 'text-paper/80',
  muted: 'text-paper/45'
};

interface TerminalVisualProps {
  lines: TerminalLine[];
  variant?: 'card' | 'panel';
}

export function TerminalVisual({ lines, variant = 'card' }: TerminalVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 bg-surface font-mono ${
      variant === 'panel' ? 'p-6 text-xs md:text-sm' : 'p-5 pt-14 text-[11px] md:text-xs'}`
      }>
      
      <div className="mb-4 flex gap-1.5">
        <span className="size-2.5 rounded-full bg-paper/15" />
        <span className="size-2.5 rounded-full bg-paper/15" />
        <span className="size-2.5 rounded-full bg-accent/70" />
      </div>
      <div className="space-y-2">
        {lines.map((line, i) =>
        <motion.p
          key={`${line.text}-${i}`}
          className={`truncate ${TONES[line.tone]}`}
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.25, ease: EASE_OUT, delay: 0.15 + i * 0.06 }}>
          
            {line.text}
          </motion.p>
        )}
        <motion.span
          className="inline-block h-3.5 w-2 bg-accent"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        
      </div>
    </div>);

}