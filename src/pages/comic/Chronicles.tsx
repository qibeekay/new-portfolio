import React from 'react';
import { motion } from 'framer-motion';
import { Panel } from '../components/Panel';
import { CaptionBox } from '../components/CaptionBox';
import { IssueHeader } from '../components/IssueHeader';
import { IssueFooterNav } from '../components/IssueFooterNav';
import { issues } from '../data/issues';
import { experience } from '../data/experience';
import { roleSpot } from '../utils/themeColors';
import type { SpotColor } from '../types/portfolio';

const issue = issues[4];

const INK: Record<SpotColor, string> = {
  red: '#e63946',
  yellow: '#f4a300',
  blue: '#2f6690',
  teal: '#1d7874'
};

export function Chronicles() {
  return (
    <div>
      <IssueHeader issue={issue} />

      <CaptionBox className="mb-8 max-w-2xl -rotate-[0.5deg]">
        {experience.length} arcs, newest first. The ink runs down the spine — each chapter hangs off it.
      </CaptionBox>

      <ol className="relative space-y-6 pl-8 sm:pl-14">
        <span className="absolute bottom-2 left-3 top-2 w-[4px] bg-ink sm:left-6" aria-hidden="true" />
        {experience.map((role, index) => {
          const spot = roleSpot(index);
          return (
            <motion.li
              key={role.id}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.26, delay: Math.min(index, 3) * 0.04, ease: [0.23, 1, 0.32, 1] }}
              className="relative">
              
              <span
                className="absolute -left-[26px] top-6 h-4 w-4 rounded-full border-[3px] border-ink sm:-left-[44px] sm:h-5 sm:w-5"
                style={{ backgroundColor: INK[spot] }}
                aria-hidden="true" />
              
              <Panel color={spot} className="p-6" tilt={index % 2 === 0 ? -0.4 : 0.4}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">{role.title}</h2>
                  <p className="font-caption text-[12px] uppercase tracking-[0.2em] text-ink-soft">
                    {role.period} · {role.location}
                  </p>
                </div>
                <p className="mt-1 font-display text-xl uppercase tracking-wide" style={{ color: INK[spot] }}>
                  {role.company}
                </p>
                <p className="mt-3 max-w-3xl font-body text-base leading-relaxed">{role.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {role.highlights.map((win) =>
                  <li key={win} className="border-[3px] border-ink bg-paper px-3 py-2 font-body text-sm leading-snug">
                      {win}
                    </li>
                  )}
                </ul>
                <p className="mt-4 font-caption text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                  Gear: {role.stack.join(' · ')}
                </p>
              </Panel>
            </motion.li>);

        })}
      </ol>

      <IssueFooterNav currentSlug={issue.slug} />
    </div>);

}