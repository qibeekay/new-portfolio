import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * The page turn: the incoming issue swings in from the right edge of the spine
 * while the outgoing one lifts away, mimicking a physical page flip.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div style={{ perspective: '1600px' }}>
      <motion.div
        initial={{ opacity: 0, rotateY: -16, x: 70, transformOrigin: 'left center' }}
        animate={{ opacity: 1, rotateY: 0, x: 0 }}
        exit={{ opacity: 0, rotateY: 12, x: -50 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
        
        {children}
      </motion.div>
    </div>);

}