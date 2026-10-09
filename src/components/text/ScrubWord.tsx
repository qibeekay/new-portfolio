import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrubWordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}

export function ScrubWord({ children, progress, range, accent = false }: ScrubWordProps) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <>
      <motion.span style={{ opacity, y }} className={`inline-block ${accent ? 'italic text-accent' : ''}`}>
        {children}
      </motion.span>{' '}
    </>);

}