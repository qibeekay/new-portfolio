import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { StatusBadge } from './StatusBadge';
import { EASE_OUT } from '../../utils/motion';

interface ProjectIndexRowProps {
  project: Project;
  onOpen: (project: Project) => void;
  onHover: (project: Project | null) => void;
}

export function ProjectIndexRow({ project, onOpen, onHover }: ProjectIndexRowProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="border-b border-paper/10">
      
      <button
        type="button"
        data-cursor="view"
        onClick={() => onOpen(project)}
        onMouseEnter={() => onHover(project)}
        onFocus={() => onHover(project)}
        onBlur={() => onHover(null)}
        className="group grid w-full grid-cols-12 items-center gap-x-4 gap-y-2 py-5 text-left focus-visible:bg-paper/[0.04] focus-visible:outline-none">
        
        <span className="col-span-2 font-mono text-xs text-paper/45 md:col-span-1">{project.year}</span>
        <span className="col-span-8 min-w-0 md:col-span-4">
          <span className="block truncate font-display text-3xl leading-tight transition-[transform,color] duration-200 ease-out group-hover:translate-x-3 group-hover:italic group-hover:text-accent md:text-4xl">
            {project.title}
          </span>
        </span>
        <span className="col-span-10 col-start-3 truncate text-sm text-paper/60 md:col-span-4 md:col-start-auto md:text-base">
          {project.tagline}
        </span>
        <span className="col-span-10 col-start-3 md:col-span-2 md:col-start-auto">
          <StatusBadge status={project.status} />
        </span>
        <span className="col-span-2 row-start-1 flex justify-end md:col-span-1 md:row-start-auto">
          <span className="grid size-9 place-items-center rounded-full border border-paper/15 transition-[transform,background-color,border-color,color] duration-200 ease-out group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
            <ArrowRightIcon className="size-4" />
          </span>
        </span>
      </button>
    </motion.li>);

}