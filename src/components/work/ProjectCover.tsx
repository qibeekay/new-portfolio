import React, { useState } from 'react';
import { AsteriskIcon, SquareStackIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { TerminalVisual } from './TerminalVisual';
import { terminalLinesFor } from '../../utils/projectMeta';

interface ProjectCoverProps {
  project: Project;
  variant?: 'card' | 'panel';
}

export function ProjectCover({ project, variant = 'card' }: ProjectCoverProps) {
  const [loaded, setLoaded] = useState(false);

  if (project.image) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-surface/50">
        <img
          src={project.image}
          alt={project.imageAlt ?? project.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-paper/[0.04]" />
        )}
      </div>
    );
  }

  if (project.category === 'systems') {
    return <TerminalVisual lines={terminalLinesFor(project)} variant={variant} />;
  }

  const Glyph = project.category === 'creative' ? AsteriskIcon : SquareStackIcon;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-surface"
      style={{
        backgroundImage: 'radial-gradient(rgb(var(--paper) / 0.09) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      <Glyph
        className={`absolute text-accent transition-transform duration-300 ease-out group-hover:rotate-45 ${
          variant === 'panel' ? 'left-6 top-6 size-10' : 'left-5 top-14 size-9'
        }`}
        strokeWidth={1.5}
      />

      <span className="absolute -bottom-[0.2em] -left-[0.03em] whitespace-nowrap font-display text-[8rem] italic leading-none text-paper/[0.08] transition-transform duration-300 ease-out group-hover:-translate-y-2 md:text-[10rem]">
        {project.title}
      </span>
    </div>
  );
}