import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Panel } from '../components/Panel';
import { CaptionBox } from '../components/CaptionBox';
import { IssueHeader } from '../components/IssueHeader';
import { IssueFooterNav } from '../components/IssueFooterNav';
import { issues } from '../data/issues';
import { powerGroups } from '../data/skills';
import type { SpotColor } from '../types/portfolio';

const issue = issues[2];

const INK: Record<SpotColor, string> = {
  red: '#e63946',
  yellow: '#f4a300',
  blue: '#2f6690',
  teal: '#1d7874'
};

export function Powers() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div>
      <IssueHeader issue={issue} />

      <CaptionBox className="mb-8 max-w-2xl -rotate-[0.6deg]">
        Every hero has a power chart. Hover or focus a meter to read what it actually means in practice.
      </CaptionBox>

      <div className="grid gap-6 lg:grid-cols-3">
        {powerGroups.map((group, groupIndex) =>
        <Panel
          key={group.id}
          as="section"
          color={groupIndex === 1 ? 'blue' : groupIndex === 2 ? 'teal' : 'red'}
          className="p-6"
          tilt={groupIndex === 1 ? 0 : groupIndex === 0 ? -0.5 : 0.5}>
          
            <h2 className="ink-stroke-thin font-display text-3xl uppercase tracking-wide text-pulp-red">
              {group.label}
            </h2>
            <ul className="mt-5 space-y-5">
              {group.powers.map((power, index) => {
              const active = focused === power.id;
              return (
                <li key={power.id}>
                    <button
                    type="button"
                    onMouseEnter={() => setFocused(power.id)}
                    onMouseLeave={() => setFocused((current) => current === power.id ? null : current)}
                    onFocus={() => setFocused(power.id)}
                    onBlur={() => setFocused((current) => current === power.id ? null : current)}
                    aria-expanded={active}
                    className="focus-ink block w-full text-left">
                    
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-xl uppercase tracking-wide">{power.name}</span>
                        <span className="font-caption text-xs text-ink-soft">{power.level}</span>
                      </span>

                      <span className="mt-1.5 block h-5 w-full border-[3px] border-ink bg-paper">
                        <motion.span
                        className="block h-full"
                        style={{ backgroundColor: INK[power.color] }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${power.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.28, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }} />
                      
                      </span>

                      <motion.span
                      className="block overflow-hidden font-body text-sm leading-snug text-ink-soft"
                      initial={false}
                      animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
                      
                        <span className="mt-2 block">{power.detail}</span>
                      </motion.span>
                    </button>
                  </li>);

            })}
            </ul>
          </Panel>
        )}
      </div>

      <Panel color="yellow" className="mt-6 flex flex-wrap items-center gap-3 p-5">
        <span className="font-caption text-[11px] uppercase tracking-[0.2em] text-ink-soft">Also in the utility belt</span>
        {['GraphQL', 'Redis', 'Playwright', 'gRPC', 'AWS', 'Docker', 'Vitest', 'Figma', 'Sentry', 'Kubernetes'].map(
          (tool) =>
          <span
            key={tool}
            className="border-[3px] border-ink bg-paper px-2.5 py-1 font-display text-base uppercase tracking-wide shadow-panel-sm">
            
              {tool}
            </span>

        )}
      </Panel>

      <IssueFooterNav currentSlug={issue.slug} />
    </div>);

}