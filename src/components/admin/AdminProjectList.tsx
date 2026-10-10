import React, { useState } from 'react';
import { PlusIcon, SearchIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { categoryLabel, statusLabel } from '../../utils/projectMeta';

interface AdminProjectListProps {
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  isLoading?: boolean;
}

export function AdminProjectList({ projects, selectedId, onSelect, onNew, isLoading }: AdminProjectListProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filtered = q ?
  projects.filter((p) => [p.title, p.tagline, ...p.stack].some((s) => s.toLowerCase().includes(q))) :
  projects;
  const ongoing = projects.filter((p) => p.status === 'ongoing').length;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-3xl">Projects</h2>
        <span className="font-mono text-xs text-paper/45">
          {isLoading ? 'Syncing…' : `${projects.length} total · ${ongoing} ongoing`}
        </span>
      </div>

      <button
        type="button"
        onClick={onNew}
        aria-pressed={selectedId === 'new'}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-sm transition-colors duration-150 ${
        selectedId === 'new' ? 'border-accent text-accent' : 'border-paper/20 text-paper/75 hover:border-paper/40 hover:text-paper'}`
        }>
        
        <PlusIcon className="size-4" /> New project
      </button>

      <label className="relative mt-4 block">
        <span className="sr-only">Search projects</span>
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-paper/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, tagline or stack"
          className="w-full rounded-xl border border-paper/15 bg-ink py-2.5 pl-10 pr-4 text-sm text-paper placeholder:text-paper/30 focus:border-paper/30 focus:outline-none focus:ring-2 focus:ring-accent/50" />
        
      </label>

      <ul className="mt-4 space-y-1">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <li key={i} className="flex animate-pulse items-center gap-3 rounded-xl px-2.5 py-2">
              <div className="size-11 shrink-0 rounded-lg bg-paper/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-paper/15" />
                <div className="h-3 w-1/2 rounded bg-paper/10" />
              </div>
            </li>
          ))
        ) : (
          filtered.map((p) => {
          const active = p.id === selectedId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                aria-current={active ? 'true' : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 ${
                active ? 'bg-paper/10' : 'hover:bg-paper/5'}`
                }>
                
                <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-paper/10 bg-surface font-display text-xl italic text-accent">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    p.title.charAt(0)
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{p.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-paper/45">
                    {categoryLabel(p.category)} · {statusLabel(p.status)} · {p.year}
                  </span>
                </span>
              </button>
            </li>);

          }))}
        {!isLoading && filtered.length === 0 && <li className="px-2 py-6 text-sm text-paper/45">No projects match “{query}”.</li>}
      </ul>
    </div>);

}