import React from 'react';
import { motion } from 'framer-motion';

interface EdoSceneProps {
  kanji: string;
  title: string;
  index: number;
  total: number;
  children: React.ReactNode;
}

/**
 * One panel of the handscroll: fixed-width column, vertical title rail on the
 * right edge, content unrolling to the left.
 */
export function EdoScene({ kanji, title, index, total, children }: EdoSceneProps) {
  return (
    <section
      className="relative flex h-full w-[100vw] shrink-0 snap-start items-stretch gap-5 px-5 py-6 sm:w-[92vw] sm:gap-8 sm:px-10 lg:w-[74vw]"
      aria-label={title}>
      
      <div
        data-scene-scroll="true"
        className="edo-scroll relative flex-1 overflow-y-auto pr-1">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
          
          {children}
        </motion.div>
      </div>

      <div className="flex shrink-0 flex-col items-center justify-start gap-4 border-l border-sumi/25 pl-4 sm:pl-6">
        <span className="grid h-11 w-11 place-items-center bg-edo-vermilion font-edo-accent text-xl text-washi-light seal-stamp">
          {kanji}
        </span>
        <h2 className="vertical-jp font-edo text-lg font-semibold text-sumi sm:text-xl">{title}</h2>
        <span className="font-edo text-[11px] tracking-[0.2em] text-sumi-wash">
          {String(index).padStart(2, '0')}／{String(total).padStart(2, '0')}
        </span>
        <span className="mt-1 w-px flex-1 bg-sumi/20" aria-hidden="true" />
      </div>
    </section>);

}