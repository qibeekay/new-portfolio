import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectCover } from './ProjectCover';
import { StatusBadge } from './StatusBadge';
import { categoryLabel } from '../../utils/projectMeta';
import { EASE_OUT } from '../../utils/motion';

interface ProjectGridCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  large?: boolean;
}

export function ProjectGridCard({ project, onOpen, large = false }: ProjectGridCardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 5);
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 5);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="[perspective:1400px]">
      
      <motion.button
        ref={ref}
        type="button"
        data-cursor="view"
        onClick={() => onOpen(project)}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY }}
        aria-label={`Open project: ${project.title}`}
        className={`group relative block w-full overflow-hidden rounded-2xl border border-paper/10 bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        large ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-[4/3]'}`
        }>
        
        <ProjectCover project={project} />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="rounded-full bg-ink/75 px-2.5 py-1 font-mono text-[11px] text-paper/85 backdrop-blur">
            {categoryLabel(project.category)} · {project.year}
          </span>
          <StatusBadge status={project.status} solid />
        </div>
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 rounded-xl bg-ink/80 p-4 backdrop-blur-md">
          <div className="min-w-0">
            <h3 className={`font-display leading-none ${large ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
              {project.title}
            </h3>
            <p className="mt-1.5 truncate text-sm text-paper/65">{project.tagline}</p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-ink transition-[transform,background-color] duration-200 ease-out group-hover:-rotate-45 group-hover:bg-accent">
            <ArrowRightIcon className="size-4" />
          </span>
        </div>
      </motion.button>
    </motion.li>);

}