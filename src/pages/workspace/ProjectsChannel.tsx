import React from 'react';
import { CodeIcon, ExternalLinkIcon } from 'lucide-react';
import { Message } from '../../components/workspace/Message';
import { AttachmentCard } from '../../components/workspace/AttachmentCard';
import { useProjects } from '../../contexts/ProjectsContext';
import { CATEGORIES, statusLabel } from '../../utils/projectMeta';
import { categorySpot } from '../../utils/themeColors';
import type { ProjectStatus, SpotColor } from '../../types/portfolio';

const ACCENT: Record<SpotColor, string> = {
  red: '#e01e5a',
  yellow: '#ecb22e',
  blue: '#1264a3',
  teal: '#2eb67d'
};

const STATUS_PILL: Record<ProjectStatus, string> = {
  completed: 'bg-work-green/15 text-[#1a7f55]',
  ongoing: 'bg-work-blue/10 text-work-blue',
  ideating: 'bg-work-yellow/20 text-[#8a6413]',
  paused: 'bg-work-hover text-work-muted'
};

const STATUS_REACTION: Record<ProjectStatus, string> = {
  completed: '🚀',
  ongoing: '👀',
  ideating: '💡',
  paused: '⏸️'
};

function timeFor(index: number) {
  const minutes = 8 * 60 + 40 + index * 23;
  const hour = Math.floor(minutes / 60);
  const minute = String(minutes % 60).padStart(2, '0');
  return `${hour > 12 ? hour - 12 : hour}:${minute} ${hour >= 12 ? 'pm' : 'am'}`;
}

export function ProjectsChannel() {
  const { projects } = useProjects();
  const groups = CATEGORIES.map((category) => ({
    ...category,
    items: projects.filter((project) => project.category === category.id)
  })).filter((group) => group.items.length > 0);
  let running = 0;

  return (
    <>
      <Message time="8:30 am" pinned reactions={[{ emoji: '📌', count: 5 }]}>
        <p>
          {projects.length} projects, posted in three threads — creative, functional and systems. Finished, in flight,
          and still on the whiteboard; each card says which.
        </p>
      </Message>

      {groups.map((group) =>
      <div key={group.id}>
          <p className="relative px-4 py-3 text-center sm:px-6">
            <span className="absolute left-4 right-4 top-1/2 h-px bg-work-line sm:left-6 sm:right-6" aria-hidden="true" />
            <span className="relative rounded-full border border-work-line bg-white px-3 py-1 text-[12px] font-bold text-work-muted">
              {group.label} · {group.items.length}
            </span>
          </p>

          {group.items.map((project) => {
          const index = running++;
          return (
            <Message
              key={project.id}
              time={timeFor(index)}
              reactions={[{ emoji: STATUS_REACTION[project.status], count: 4 + index * 7 % 15 }]}
              replies={project.featured ? 6 + index % 4 : undefined}>
              
                <p>
                  <span className="font-semibold">{project.title}</span> — {project.tagline}
                </p>

                <AttachmentCard
                accent={ACCENT[categorySpot[project.category]]}
                eyebrow={`${project.year} · ${group.label}`}
                title={project.title}>
                
                  <span
                  className={`inline-flex w-fit items-center rounded px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${STATUS_PILL[project.status]}`}>
                  
                    {statusLabel(project.status)}
                  </span>

                  {project.image ?
                <img
                  src={project.image}
                  alt={project.imageAlt ?? ''}
                  loading="lazy"
                  className="max-h-60 w-full max-w-md rounded-md border border-work-line object-cover" /> :

                null}

                  <p className="whitespace-pre-line">{project.description}</p>
                  {project.role ?
                <p className="text-[13px] text-work-muted">
                      <span className="font-semibold text-work-ink">My part:</span> {project.role}
                    </p> :
                null}

                  {project.metrics.length > 0 ?
                <dl className="flex flex-wrap gap-x-6 gap-y-2 border-t border-work-line pt-2">
                      {project.metrics.map((metric) =>
                  <div key={metric.label}>
                          <dt className="text-[11px] font-semibold uppercase tracking-wide text-work-muted">
                            {metric.label}
                          </dt>
                          <dd className="text-[15px] font-bold text-work-ink">{metric.value}</dd>
                        </div>
                  )}
                    </dl> :
                null}

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[12px] text-work-muted">{project.stack.join(' · ')}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.liveUrl ?
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded border border-work-line px-2.5 py-1 text-[13px] font-semibold text-work-blue hover:bg-work-blue/5">
                      
                          Open live <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        </a> :
                    null}
                      {project.codeUrl ?
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded border border-work-line px-2.5 py-1 text-[13px] font-semibold text-work-ink hover:bg-work-hover">
                      
                          Source <CodeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        </a> :
                    null}
                    </div>
                  </div>
                </AttachmentCard>
              </Message>);

        })}
        </div>
      )}
    </>);

}