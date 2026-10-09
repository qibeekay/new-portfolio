import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { XIcon } from 'lucide-react';
import type { Thought } from '../../types/portfolio';
import { thoughtKindLabel } from '../../utils/thoughtMeta';
import { lockScroll } from '../../utils/smoothScroll';
import { EASE_OUT } from '../../utils/motion';

interface ThoughtReaderProps {
  thought: Thought | null;
  onClose: () => void;
}

export function ThoughtReader({ thought, onClose }: ThoughtReaderProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = thought !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {thought &&
      <motion.div
        className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/75 backdrop-blur-sm md:items-center md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT }}
        onClick={onClose}>
        
          <motion.article
          role="dialog"
          aria-modal="true"
          aria-labelledby="thought-title"
          data-lenis-prevent
          onClick={(e) => e.stopPropagation()}
          className="max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-paper/10 bg-surface md:rounded-3xl"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}>
          
            <header className="sticky top-0 flex items-center justify-between border-b border-paper/10 bg-surface/90 px-6 py-4 backdrop-blur md:px-10">
              <span className="font-mono text-xs text-paper/50">
                {thoughtKindLabel(thought.kind)} · {format(new Date(thought.date), 'MMM d, yyyy')} · {thought.readMinutes} min
              </span>
              <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close entry"
              className="grid size-9 place-items-center rounded-full border border-paper/15 transition-colors duration-150 hover:bg-paper/10">
              
                <XIcon className="size-4" />
              </button>
            </header>

            <div className="px-6 pb-12 pt-8 md:px-10">
              <h2 id="thought-title" className="font-display text-4xl leading-[1.02] md:text-5xl">
                {thought.title}
              </h2>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {thought.tags.map((t) =>
              <span key={t} className="rounded-full border border-paper/15 px-2.5 py-1 text-xs text-paper/70">
                    {t}
                  </span>
              )}
              </div>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-paper/80">
                {thought.body.map((block, i) => {
                if (block.type === 'code') {
                  return (
                    <figure key={i} className="overflow-hidden rounded-xl border border-paper/10 bg-ink">
                        <figcaption className="border-b border-paper/10 px-4 py-2 font-mono text-[11px] text-paper/45">
                          {block.lang}
                        </figcaption>
                        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-paper/85">
                          <code>{block.text}</code>
                        </pre>
                      </figure>);

                }
                if (block.type === 'quote') {
                  return (
                    <blockquote key={i} className="border-l-2 border-accent pl-5 font-display text-2xl italic text-paper">
                        {block.text}
                      </blockquote>);

                }
                return <p key={i}>{block.text}</p>;
              })}
              </div>
            </div>
          </motion.article>
        </motion.div>
      }
    </AnimatePresence>);

}