import React from 'react';
import { motion } from 'framer-motion';
import type { Issue } from '../types/portfolio';

const INK: Record<Issue['color'], string> = {
  red: '#e63946',
  yellow: '#f4a300',
  blue: '#2f6690',
  teal: '#1d7874'
};

interface IssueHeaderProps {
  issue: Issue;
}

export function IssueHeader({ issue }: IssueHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
      className="mb-8 flex flex-col gap-4 border-b-[3px] border-dashed border-ink pb-6 sm:flex-row sm:items-end sm:justify-between">
      
      <div>
        <p className="font-caption text-[11px] uppercase tracking-[0.32em] text-ink-soft">
          Issue #{issue.number} — {issue.tagline}
        </p>
        <h1
          className="ink-stroke mt-1 font-display text-5xl uppercase leading-[0.9] tracking-wide sm:text-7xl"
          style={{ color: INK[issue.color], textShadow: '5px 5px 0 #141210' }}>
          
          {issue.title}
        </h1>
      </div>
      <span
        className="hidden h-16 w-16 shrink-0 place-items-center rounded-full border-[3px] border-ink font-display text-3xl text-paper-light shadow-panel-sm sm:grid"
        style={{ backgroundColor: INK[issue.color] }}
        aria-hidden="true">
        
        {issue.number}
      </span>
    </motion.div>);

}