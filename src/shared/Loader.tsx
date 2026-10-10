import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import { EASE_IN_OUT, EASE_OUT } from '../utils/motion';
import { lockScroll } from '../utils/smoothScroll';

interface LoaderProps {
  onReveal: () => void;
  onDone: () => void;
}

const COLUMNS = 5;
const DURATION = 2100;

export function Loader({ onReveal, onDone }: LoaderProps) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const callbacks = useRef({ onReveal, onDone });
  callbacks.current = { onReveal, onDone };

  const words = ['Pixels', 'Motion', 'Systems', profile.name];
  const wordIndex = Math.min(words.length - 1, Math.floor(progress / (100 / words.length)));

  useEffect(() => {
    lockScroll(true);
    const total = reduce ? 400 : DURATION;
    const start = performance.now();
    let frame = 0;
    let timeout = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timeout = window.setTimeout(() => {
          setLeaving(true);
          callbacks.current.onReveal();
          if (reduce) callbacks.current.onDone();
        }, 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      lockScroll(false);
    };
  }, [reduce]);

  return (
    <div
      role="status"
      aria-label={`Loading portfolio, ${progress}%`}
      className={`fixed inset-0 z-[100] ${leaving ? 'pointer-events-none' : ''}`}>
      
      <div className="absolute inset-0 flex" aria-hidden="true">
        {Array.from({ length: COLUMNS }).map((_, i) =>
        <motion.div
          key={i}
          className="h-full flex-1 border-r border-paper/[0.04] bg-ink last:border-r-0"
          initial={{ y: '0%' }}
          animate={leaving ? { y: '-100%' } : { y: '0%' }}
          transition={{ duration: 0.3, ease: EASE_IN_OUT, delay: leaving ? 0.12 + i * 0.07 : 0 }}
          onAnimationComplete={() => {
            if (leaving && i === COLUMNS - 1) callbacks.current.onDone();
          }} />

        )}
      </div>

      <motion.div
        className="relative flex h-full flex-col justify-between p-6 md:p-10"
        animate={leaving ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}>
        
        <div className="flex items-start justify-between font-mono text-xs text-paper/50">
          <span>{profile.initials} — Portfolio</span>
          <span>©2026</span>
        </div>

        <div className="flex justify-center">
          <div className="relative h-[1.1em] overflow-hidden font-display text-6xl italic md:text-8xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={words[wordIndex]}
                className="block whitespace-nowrap"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.25, ease: EASE_OUT }}>
                
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-[16rem] pb-3 text-sm text-paper/50">
              {profile.role}
              <br />
              {profile.location}
            </p>
            <span className="font-display text-7xl leading-none tabular-nums md:text-[10rem]">
              {progress}
              <span className="text-accent">%</span>
            </span>
          </div>
          <div className="mt-6 h-px w-full bg-paper/10">
            <div
              className="h-px origin-left bg-accent"
              style={{ transform: `scaleX(${progress / 100})` }} />
            
          </div>
        </div>
      </motion.div>
    </div>);

}