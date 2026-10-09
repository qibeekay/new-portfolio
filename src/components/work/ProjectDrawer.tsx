import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, ArrowUpRightIcon, CodeIcon, XIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectCover } from './ProjectCover';
import { StatusBadge } from './StatusBadge';
import { categoryLabel } from '../../utils/projectMeta';
import { lockScroll } from '../../utils/smoothScroll';
import { EASE_OUT } from '../../utils/motion';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
}

export function ProjectDrawer({ project, onClose, onNext }: ProjectDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

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
      {project &&
      <>
          <motion.div
          key="backdrop"
          className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          onClick={onClose} />
        
          <motion.aside
          key="panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          data-lenis-prevent
          className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-2xl flex-col overflow-y-auto border-l border-paper/10 bg-surface"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: EASE_OUT }}>
          
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-paper/10 bg-surface/90 px-6 py-4 backdrop-blur md:px-8">
              <span className="font-mono text-xs text-paper/50">
                {categoryLabel(project.category)} · {project.year}
              </span>
              <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="grid size-9 place-items-center rounded-full border border-paper/15 transition-colors duration-150 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              
                <XIcon className="size-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
              key={project.id}
              className="flex flex-1 flex-col px-6 pb-8 pt-6 md:px-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}>
              
                <div className="relative aspect-video overflow-hidden rounded-xl border border-paper/10">
                  <ProjectCover project={project} variant="panel" />
                </div>

                <div className="mt-8 flex items-center gap-2">
                  <StatusBadge status={project.status} />
                </div>

                <h2 id="project-title" className="mt-4 font-display text-5xl leading-none md:text-6xl">
                  {project.title}
                </h2>
                <p className="mt-3 text-lg text-paper/70">{project.tagline}</p>
                <p className="mt-6 whitespace-pre-line leading-relaxed text-paper/80">{project.description}</p>

                {project.metrics.length > 0 &&
              <dl className="mt-8 grid grid-cols-3 border-y border-paper/10">
                    {project.metrics.map((m, i) =>
                <div key={`${m.label}-${i}`} className={`py-5 ${i > 0 ? 'border-l border-paper/10 pl-4' : 'pr-4'}`}>
                        <dd className="font-display text-3xl text-accent md:text-4xl">{m.value}</dd>
                        <dt className="mt-1 text-xs text-paper/55">{m.label}</dt>
                      </div>
                )}
                  </dl>
              }

                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  {project.role &&
                <div>
                      <dt className="font-mono text-xs text-paper/45">My role</dt>
                      <dd className="mt-2 text-sm text-paper/85">{project.role}</dd>
                    </div>
                }
                  {project.stack.length > 0 &&
                <div>
                      <dt className="font-mono text-xs text-paper/45">Built with</dt>
                      <dd className="mt-2 flex flex-wrap gap-1.5">
                        {project.stack.map((s) =>
                    <span key={s} className="rounded-full border border-paper/15 px-2.5 py-1 text-xs text-paper/80">
                            {s}
                          </span>
                    )}
                      </dd>
                    </div>
                }
                </dl>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-10">
                  {project.liveUrl &&
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-opacity duration-150 hover:opacity-90">
                  
                      Visit live <ArrowUpRightIcon className="size-4" />
                    </a>
                }
                  {project.codeUrl &&
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-paper/10">
                  
                      <CodeIcon className="size-4" /> Source
                    </a>
                }
                  <button
                  type="button"
                  onClick={onNext}
                  className="ml-auto inline-flex items-center gap-2 text-sm text-paper/70 transition-colors duration-150 hover:text-paper">
                  
                    Next project <ArrowRightIcon className="size-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </>
      }
    </AnimatePresence>);

}