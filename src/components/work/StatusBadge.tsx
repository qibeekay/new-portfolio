import React from 'react';
import type { ProjectStatus } from '../../types/portfolio';
import { statusLabel } from '../../utils/projectMeta';

const DOT: Record<ProjectStatus, string> = {
  completed: 'bg-paper',
  ongoing: 'bg-accent',
  ideating: 'border border-paper/70',
  paused: 'bg-paper/30'
};

export function StatusBadge({ status, solid = false }: {status: ProjectStatus;solid?: boolean;}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] text-paper/85 ${
      solid ? 'bg-ink/75 backdrop-blur' : 'border border-paper/15'}`
      }>
      
      <span className="relative flex size-2">
        {status === 'ongoing' &&
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        }
        <span className={`relative inline-flex size-2 rounded-full ${DOT[status]}`} />
      </span>
      {statusLabel(status)}
    </span>);

}