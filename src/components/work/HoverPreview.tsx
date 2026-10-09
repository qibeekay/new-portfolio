import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import type { Project } from '../../types/portfolio';
import { ProjectCover } from './ProjectCover';
import { EASE_OUT } from '../../utils/motion';

export function HoverPreview({ project }: {project: Project | null;}) {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40" style={{ x: springX, y: springY }}>
      <div className="translate-x-10 -translate-y-1/2">
        <AnimatePresence>
          {project &&
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="relative h-56 w-80 overflow-hidden rounded-xl border border-paper/10 bg-surface shadow-2xl shadow-ink">
            
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                key={project.id}
                className="absolute inset-0"
                initial={{ opacity: 0, y: '30%' }}
                animate={{ opacity: 1, y: '0%' }}
                exit={{ opacity: 0, y: '-30%' }}
                transition={{ duration: 0.25, ease: EASE_OUT }}>
                
                  <ProjectCover project={project} variant="panel" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}