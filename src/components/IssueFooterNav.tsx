import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { issues } from '../data/issues';

interface IssueFooterNavProps {
  currentSlug: string;
}

/** "Continued in..." — the page-turn prompt at the foot of every issue. */
export function IssueFooterNav({ currentSlug }: IssueFooterNavProps) {
  const index = issues.findIndex((issue) => issue.slug === currentSlug);
  const previous = index > 0 ? issues[index - 1] : null;
  const next = index >= 0 && index < issues.length - 1 ? issues[index + 1] : null;

  return (
    <nav
      aria-label="Issue navigation"
      className="mt-14 flex flex-col gap-3 border-t-[3px] border-ink pt-6 sm:flex-row sm:items-stretch sm:justify-between">
      
      {previous ?
      <Link
        to={previous.path}
        className="focus-ink group flex items-center gap-3 border-[3px] border-ink bg-paper-light px-4 py-3 shadow-panel-sm transition-transform duration-150 ease-pulp hover:-translate-x-1">
        
          <ArrowLeftIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="text-left">
            <span className="block font-caption text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Previously
            </span>
            <span className="block font-display text-xl leading-none tracking-wide">{previous.title}</span>
          </span>
        </Link> :

      <span aria-hidden="true" />
      }

      {next ?
      <Link
        to={next.path}
        className="focus-ink group flex items-center gap-3 border-[3px] border-ink bg-ink px-4 py-3 text-paper-light shadow-panel-sm transition-transform duration-150 ease-pulp hover:translate-x-1">
        
          <span className="text-right">
            <span className="block font-caption text-[10px] uppercase tracking-[0.2em] text-paper-dark">
              Continued in
            </span>
            <span className="block font-display text-xl leading-none tracking-wide">{next.title}</span>
          </span>
          <ArrowRightIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        </Link> :

      <span aria-hidden="true" />
      }
    </nav>);

}