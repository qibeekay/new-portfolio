import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '../../utils/motion';

interface RotatingWordProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingWord({ words, interval = 2400, className = '' }: RotatingWordProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [interval, reduce, words.length]);

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.3, ease: EASE_OUT } }}
      className="relative inline-flex overflow-hidden pb-[0.1em] align-bottom">
      
      <span className="sr-only">{words.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className={`inline-block whitespace-nowrap ${className}`}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}>
          
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>);

}