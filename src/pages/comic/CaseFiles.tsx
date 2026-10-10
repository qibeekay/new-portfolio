import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CodeIcon, ExternalLinkIcon, LockIcon } from 'lucide-react';
import { Panel } from '../components/Panel';
import { CaptionBox } from '../components/CaptionBox';
import { IssueHeader } from '../components/IssueHeader';
import { IssueFooterNav } from '../components/IssueFooterNav';
import { issues } from '../data/issues';
import { useProjects } from '../contexts/ProjectsContext';
import { CATEGORIES, categoryLabel } from '../utils/projectMeta';
import { categorySpot } from '../utils/themeColors';
import type { ProjectCategory, ProjectStatus, SpotColor } from '../types/portfolio';

const issue = issues[3];
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const INK: Record<SpotColor, string> = {
  red: '#e63946',
  yellow: '#f4a300',
  blue: '#2f6690',
  teal: '#1d7874'
};

const STAMP: Record<ProjectStatus, {label: string;className: string;}> = {
  completed: { label: 'Case closed', className: 'bg-ink text-paper-light' },
  ongoing: { label: 'Still on the case', className: 'bg-pulp-yellow text-ink' },
  ideating: { label: 'Drawing board', className: 'bg-paper-light text-ink border-dashed' },
  paused: { label: 'On ice', className: 'bg-pulp-blue text-paper-light' }
};

type Beat = 'all' | ProjectCategory;

export function CaseFiles() {
  const { projects } = useProjects();
  const [beat, setBeat] = useState<Beat>('all');
  const filtered = beat === 'all' ? projects : projects.filter((project) => project.category === beat);
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);
  const active = filtered.find((project) => project.id === openId) ?? filtered[0] ?? null;

  const count = (id: Beat) => id === 'all' ? projects.length : projects.filter((p) => p.category === id).length;

  return (
    <div>
      <IssueHeader issue={issue} />

      <CaptionBox className="mb-6 max-w-2xl rotate-[0.5deg]">
        {projects.length} cases across three beats — the creative, the functional and the systems underneath. Pick a
        beat, pick a case; the full spread opens on the right.
      </CaptionBox>

      <div role="tablist" aria-label="Case beat" className="mb-6 flex flex-wrap gap-2">
        {[{ id: 'all' as Beat, label: 'Every case' }, ...CATEGORIES].map((option) => {
          const selected = beat === option.id;
          const spot = option.id === 'all' ? '#141210' : INK[categorySpot[option.id]];
          return (
            <motion.button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setBeat(option.id)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.14, ease: EASE }}
              className="focus-ink flex items-center gap-2 border-[3px] border-ink px-3 py-1.5 shadow-panel-sm"
              style={{ backgroundColor: selected ? spot : '#fffdf6', color: selected ? '#fffdf6' : '#141210' }}>
              
              <span className="whitespace-nowrap font-display text-lg uppercase leading-none tracking-wide">
                {option.label}
              </span>
              <span className="font-caption text-[11px] opacity-75">{count(option.id)}</span>
            </motion.button>);

        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <ul className="space-y-3 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto lg:pb-3 lg:pl-1 lg:pr-4 lg:pt-1">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((project) => {
              const selected = project.id === active?.id;
              const spot = INK[categorySpot[project.category]];
              return (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2, ease: EASE }}>
                  
                  <button
                    type="button"
                    onClick={() => setOpenId(project.id)}
                    aria-pressed={selected}
                    className="focus-ink block w-full text-left">
                    
                    <motion.span
                      className="flex items-center gap-4 border-[3px] border-ink px-4 py-3"
                      animate={{
                        x: selected ? 8 : 0,
                        backgroundColor: selected ? spot : '#fffdf6',
                        color: selected ? '#fffdf6' : '#141210',
                        boxShadow: selected ? '6px 6px 0 0 #141210' : '3px 3px 0 0 #141210'
                      }}
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.16, ease: EASE }}>
                      
                      <span className="font-caption text-[11px] opacity-75">{project.year}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-2xl uppercase leading-none tracking-wide">
                          {project.title}
                        </span>
                        <span className="mt-1 block truncate font-body text-xs opacity-80">{project.tagline}</span>
                      </span>
                      <span className="shrink-0 font-caption text-[10px] uppercase tracking-[0.14em] opacity-75">
                        {categoryLabel(project.category)}
                      </span>
                    </motion.span>
                  </button>
                </motion.li>);

            })}
          </AnimatePresence>
        </ul>

        {active ?
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: EASE }}>
          
            <Panel as="article" color={categorySpot[active.category]} className="p-6 sm:p-8">
              {active.image ?
            <figure className="relative mb-6 aspect-[16/9] overflow-hidden border-[3px] border-ink bg-ink">
                  <img src={active.image} alt={active.imageAlt ?? ''} className="h-full w-full object-cover" />
                  <span className="paper-grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
                </figure> :
            null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-caption text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                  Case file {active.year} · {categoryLabel(active.category)}
                </p>
                <span
                className={`-rotate-3 border-[3px] border-ink px-2 py-0.5 font-display text-base uppercase tracking-wide ${STAMP[active.status].className}`}>
                
                  {STAMP[active.status].label}
                </span>
              </div>

              <h2
              className="ink-stroke-thin mt-2 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl"
              style={{ color: INK[categorySpot[active.category]] }}>
              
                {active.title}
              </h2>
              <p className="mt-2 font-display text-xl uppercase tracking-wide">{active.tagline}</p>
              <p className="mt-4 max-w-2xl whitespace-pre-line font-body text-lg leading-relaxed">{active.description}</p>

              {active.role ?
            <p className="mt-5 inline-block border-[3px] border-ink bg-paper px-3 py-2 font-caption text-[12px] uppercase tracking-[0.12em]">
                  My part: {active.role}
                </p> :
            null}

              {active.metrics.length > 0 ?
            <dl className="mt-5 flex flex-wrap gap-3">
                  {active.metrics.map((metric) =>
              <div key={metric.label} className="border-[3px] border-ink bg-pulp-yellow px-3 py-2 shadow-panel-sm">
                      <dt className="font-caption text-[10px] uppercase tracking-[0.16em]">{metric.label}</dt>
                      <dd className="font-display text-2xl leading-none">{metric.value}</dd>
                    </div>
              )}
                </dl> :
            null}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-dashed border-ink pt-4">
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {active.stack.map((tech) =>
                <li key={tech} className="font-caption text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      {tech}
                    </li>
                )}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {active.liveUrl ?
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ink inline-flex items-center gap-2 border-[3px] border-ink bg-ink px-4 py-2 font-display text-lg uppercase tracking-wide text-paper-light shadow-panel-sm transition-colors duration-150 ease-pulp hover:bg-pulp-red">
                  
                      See it live <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" />
                    </a> :
                null}
                  {active.codeUrl ?
                <a
                  href={active.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ink inline-flex items-center gap-2 border-[3px] border-ink bg-paper-light px-4 py-2 font-display text-lg uppercase tracking-wide text-ink shadow-panel-sm transition-colors duration-150 ease-pulp hover:bg-pulp-yellow">
                  
                      Read the source <CodeIcon className="h-4 w-4" aria-hidden="true" />
                    </a> :
                null}
                  {!active.liveUrl && !active.codeUrl ?
                <span className="inline-flex items-center gap-2 font-caption text-[12px] uppercase tracking-[0.14em] text-ink-soft">
                      <LockIcon className="h-4 w-4" aria-hidden="true" /> Classified — no public link yet
                    </span> :
                null}
                </div>
              </div>
            </Panel>
          </motion.div> :

        <Panel className="p-8">
            <p className="font-display text-3xl uppercase tracking-wide">No cases on this beat — yet.</p>
          </Panel>
        }
      </div>

      <IssueFooterNav currentSlug={issue.slug} />
    </div>);

}