import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '../../utils/motion';

export type TextPart = string | {text: string;className?: string;};

interface SplitRevealProps {
  parts: TextPart[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: 'view' | 'mount';
}

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

export function SplitReveal({
  parts,
  as = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04,
  trigger = 'view'
}: SplitRevealProps) {
  const reduce = useReducedMotion();
  const Component = TAGS[as] as typeof motion.h2;

  const words = parts.flatMap((part) => {
    const text = typeof part === 'string' ? part : part.text;
    const cls = typeof part === 'string' ? '' : part.className ?? '';
    return text.
    split(/\s+/).
    filter(Boolean).
    map((word) => ({ word, cls }));
  });

  const label = words.map((w) => w.word).join(' ');

  const triggerProps =
  trigger === 'view' ?
  { whileInView: 'visible', viewport: { once: true, margin: '0px 0px -10% 0px' } } :
  { animate: 'visible' };

  return (
    <Component
      className={className}
      initial={reduce ? 'visible' : 'hidden'}
      {...triggerProps}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      
      <span className="sr-only">{label}</span>
      {words.map((w, i) =>
      <React.Fragment key={`${w.word}-${i}`}>
          <span
          aria-hidden="true"
          className="-mb-[0.12em] -mr-[0.08em] inline-block overflow-hidden pb-[0.12em] pr-[0.08em] align-bottom">
          
            <motion.span
            className={`inline-block origin-bottom-left ${w.cls}`}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              visible: { y: '0%', rotate: 0, transition: { duration: 0.3, ease: EASE_OUT } }
            }}>
            
              {w.word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      )}
    </Component>);

}