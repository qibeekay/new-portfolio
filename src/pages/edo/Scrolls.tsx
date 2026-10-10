import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../contexts/ProjectsContext';
import { CATEGORIES } from '../../utils/projectMeta';
import type { ProjectCategory, ProjectStatus } from '../../types/portfolio';

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const SCROLL_KANJI: Record<ProjectCategory, string> = {
  creative: '創',
  functional: '用',
  systems: '構'
};

const SEAL: Record<ProjectStatus, {kanji: string;label: string;color: string;}> = {
  completed: { kanji: '完', label: 'Completed', color: '#b23a2c' },
  ongoing: { kanji: '進', label: 'Ongoing', color: '#27415f' },
  ideating: { kanji: '案', label: 'Ideating', color: '#a5813c' },
  paused: { kanji: '休', label: 'Paused', color: '#7d776b' }
};

/** Works as three scrolls; each opens as a folding screen whose leaves open in place, byōbu style. */
export function Scrolls() {
  const { projects, isLoading } = useProjects();
  const [category, setCategory] = useState<ProjectCategory>('creative');
  const leaves = projects.filter((project) => project.category === category);
  const [openId, setOpenId] = useState<string | null>(null);
  const openLeaf = leaves.find((project) => project.id === openId) ?? leaves[0];

  return (
    <div className="flex min-h-full flex-col justify-center py-2">
      <p className="font-edo text-[11px] tracking-[0.42em] text-edo-vermilion">巻 · THE SCROLLS</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-edo text-3xl font-semibold text-sumi">
          {isLoading ? 'Loading scrolls…' : `${projects.length} works, in three scrolls`}
        </h3>
        <div role="tablist" aria-label="Scroll" className="flex border border-sumi/40">
          {CATEGORIES.map((option) => {
            const active = option.id === category;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCategory(option.id);
                  setOpenId(null);
                }}
                className={`focus-sumi flex items-center gap-2 px-3 py-2 font-edo text-[12px] tracking-[0.2em] transition-colors duration-200 ease-pulp ${
                active ? 'bg-sumi text-washi-light' : 'text-sumi hover:bg-sumi/10'}`
                }>
                
                <span className="font-edo-accent text-base">{SCROLL_KANJI[option.id]}</span>
                {option.label}
              </button>);

          })}
        </div>
      </div>
      <p className="mt-2 font-edo text-sm text-sumi-wash">{CATEGORIES.find((c) => c.id === category)?.blurb}</p>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:gap-0">
        {isLoading ? (
          [1, 2, 3].map((n) => (
            <div
              key={n}
              className="relative flex min-h-[160px] min-w-0 flex-1 animate-pulse flex-col border border-sumi/30 bg-washi-light/50 p-4 lg:border-l-0 lg:first:border-l"
            >
              <div className="flex items-center justify-between border-b border-sumi/20 pb-3">
                <div className="space-y-1.5">
                  <div className="h-3 w-12 rounded bg-sumi/15" />
                  <div className="h-5 w-28 rounded bg-sumi/20" />
                </div>
                <div className="size-7 rounded bg-sumi/20" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-sumi/15" />
                <div className="h-3 w-full rounded bg-sumi/10" />
              </div>
            </div>
          ))
        ) : (
          leaves.map((project) => {
          const open = project.id === openLeaf?.id;
          const seal = SEAL[project.status];
          return (
            <motion.article
              key={project.id}
              layout
              animate={{ flexGrow: open ? 3.4 : 1 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="relative flex min-w-0 basis-0 flex-col border border-sumi/30 bg-washi-light/80 lg:border-l-0 lg:first:border-l">
              
              <button
                type="button"
                onClick={() => setOpenId(project.id)}
                aria-expanded={open}
                className="focus-sumi flex items-center justify-between gap-3 border-b border-sumi/20 px-4 py-3 text-left lg:min-h-[64px]">
                
                <span className="min-w-0">
                  <span className="block font-edo text-[10px] tracking-[0.28em] text-sumi-wash">{project.year}</span>
                  <span className="block truncate font-edo text-base font-semibold text-sumi">{project.title}</span>
                </span>
                <span
                  className="seal-stamp grid h-7 w-7 shrink-0 place-items-center font-edo-accent text-sm text-washi-light"
                  style={{ backgroundColor: seal.color }}
                  title={seal.label}>
                  
                  <span aria-hidden="true">{seal.kanji}</span>
                  <span className="sr-only">{seal.label}</span>
                </span>
              </button>

              {open ?
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.08, ease: EASE }}
                className="min-w-0 px-4 py-4">
                
                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                    {project.image ?
                      <img
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        loading="lazy"
                        decoding="async"
                        className="h-36 w-full border border-sumi/30 object-cover sepia-[0.35] xl:h-full"
                      /> :
                      null}
                    <div className={project.image ? '' : 'xl:col-span-2'}>
                      <h4 className="font-edo text-xl font-semibold leading-snug text-sumi">{project.tagline}</h4>
                      <p className="mt-2 font-edo text-[14px] leading-loose text-sumi-soft">{project.description}</p>
                      <p className="mt-3 font-edo text-[12px] tracking-[0.12em] text-edo-indigo">
                        役 · {project.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-sumi/20 pt-3">
                    {project.metrics.map((metric) =>
                  <p key={metric.label} className="font-edo text-sm text-sumi">
                        <span className="tracking-[0.12em] text-sumi-wash">{metric.label}</span>{' '}
                        <span className="font-semibold">{metric.value}</span>
                      </p>
                  )}
                    <p className="font-edo text-[11px] tracking-[0.18em] text-sumi-wash">{project.stack.join(' · ')}</p>
                  </div>

                  {project.liveUrl || project.codeUrl ?
                <div className="mt-3 flex flex-wrap gap-4">
                      {project.liveUrl ?
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-sumi font-edo text-[12px] tracking-[0.22em] text-edo-vermilion underline-offset-4 hover:underline">
                    
                          見る · VISIT
                        </a> :
                  null}
                      {project.codeUrl ?
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-sumi font-edo text-[12px] tracking-[0.22em] text-edo-indigo underline-offset-4 hover:underline">
                    
                          源 · SOURCE
                        </a> :
                  null}
                    </div> :
                null}
                </motion.div> :
              null}
            </motion.article>);

          }))}
      </div>
    </div>);

}