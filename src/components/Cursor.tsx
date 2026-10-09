import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { EASE_OUT } from '../utils/motion';

type CursorVariant = 'default' | 'link' | 'view';

const SIZES: Record<CursorVariant, number> = { default: 28, link: 48, view: 88 };

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 600, damping: 42, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 600, damping: 42, mass: 0.4 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button');
      if (!target) setVariant('default');else
      setVariant(target.dataset.cursor === 'view' ? 'view' : 'link');
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const size = SIZES[variant];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: springX, y: springY }}>
      
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
        variant === 'view' ? 'bg-accent text-ink' : 'border border-paper/50'} ${
        variant === 'link' ? 'bg-paper/10' : ''}`}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}>
        
        {variant === 'view' && <span className="font-mono text-[11px] font-medium">View</span>}
      </motion.div>
    </motion.div>);

}