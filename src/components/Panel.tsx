import React from 'react';
import { motion } from 'framer-motion';
import type { SpotColor } from '../types/portfolio';

const SHADOWS: Record<SpotColor, string> = {
  red: '8px 8px 0 0 #e63946, 8px 8px 0 3px #141210',
  yellow: '8px 8px 0 0 #f4a300, 8px 8px 0 3px #141210',
  blue: '8px 8px 0 0 #2f6690, 8px 8px 0 3px #141210',
  teal: '8px 8px 0 0 #1d7874, 8px 8px 0 3px #141210'
};

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  /** Spot ink used for the offset plate behind the panel. */
  color?: SpotColor;
  tilt?: number;
  /** Panels that lead somewhere lift on hover; static ones never do. */
  interactive?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
}

export function Panel({
  children,
  className = '',
  color = 'red',
  tilt = 0,
  interactive = false,
  as = 'div'
}: PanelProps) {
  const Component = motion[as];

  return (
    <Component
      className={`relative border-[3px] border-ink bg-paper-light ${className}`}
      style={{ boxShadow: SHADOWS[color], rotate: `${tilt}deg` }}
      whileHover={interactive ? { y: -6, x: -2 } : undefined}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
      
      {children}
    </Component>);

}