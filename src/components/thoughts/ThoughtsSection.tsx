import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRightIcon, PinIcon } from 'lucide-react';
import { currently, thoughts } from '../../data/thoughts';
import type { ThoughtKind } from '../../types/portfolio';
import { SplitReveal } from '../text/SplitReveal';
import { ThoughtReader } from './ThoughtReader';
import { THOUGHT_KINDS, thoughtKindLabel } from '../../utils/thoughtMeta';
import { EASE_OUT } from '../../utils/motion';

type KindFilter = 'all' | ThoughtKind;

export function ThoughtsSection() {
  const [kind, setKind] = useState<KindFilter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = kind === 'all' ? thoughts : thoughts.filter((t) => t.kind === kind);
  const pinned = kind === 'all' ? visible.find((t) => t.pinned) : undefined;
  const rest = visible.filter((t) => t !== pinned);
  const open = thoughts.find((t) => t.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);
  const count = (k: KindFilter) => k === 'all' ? thoughts.length : thoughts.filter((t) => t.kind === k).length;

  return (
    <section id="thoughts" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs text-paper/50">(03) — Notebook</p>
            <SplitReveal
              parts={['Thoughts', { text: '& experiments', className: 'italic text-paper/60' }]}
              className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl" />
            
            <p className="mt-6 max-w-sm text-paper/60">
              Where I think out loud — half-formed ideas, problems I’m stuck on, and notes on whatever I’m learning this month.
            </p>

            <ul className="mt-10 border-t border-paper/10" aria-label="Filter entries">
              {[{ id: 'all' as KindFilter, label: 'Everything' }, ...THOUGHT_KINDS].map((k) =>
              <li key={k.id}>
                  <button
                  type="button"
                  aria-pressed={kind === k.id}
                  onClick={() => setKind(k.id)}
                  className={`group flex w-full items-center justify-between border-b border-paper/10 py-3 text-left text-sm transition-colors duration-150 ${
                  kind === k.id ? 'text-paper' : 'text-paper/50 hover:text-paper'}`
                  }>
                  
                    <span className="flex items-center gap-3">
                      <motion.span
                      className="h-px bg-accent"
                      animate={{ width: kind === k.id ? 20 : 0 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }} />
                    
                      {k.label}
                    </span>
                    <span className="font-mono text-xs tabular-nums opacity-70">{count(k.id)}</span>
                  </button>
                </li>
              )}
            </ul>

            <dl className="mt-10 grid gap-5 text-sm">
              {[
              ['Currently learning', currently.learning],
              ['Reading', currently.reading],
              ['On the bench', currently.building]].
              map(([term, value]) =>
              <div key={term}>
                  <dt className="font-mono text-xs text-paper/45">{term}</dt>
                  <dd className="mt-1 text-paper/85">{value}</dd>
                </div>
              )}
            </dl>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {pinned &&
            <motion.button
              key={pinned.id}
              layout
              type="button"
              onClick={() => setOpenId(pinned.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="group mb-6 block w-full rounded-3xl border border-paper/10 bg-surface/70 p-7 text-left backdrop-blur transition-colors duration-200 hover:border-paper/25 md:p-10">
              
                <span className="flex flex-wrap items-center gap-3 font-mono text-xs text-paper/50">
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    <PinIcon className="size-3.5" /> Pinned
                  </span>
                  <span>{thoughtKindLabel(pinned.kind)}</span>
                  <span>{format(new Date(pinned.date), 'MMM d, yyyy')}</span>
                </span>
                <span className="mt-6 block font-display text-4xl leading-[1.02] md:text-5xl">{pinned.title}</span>
                <span className="mt-4 block max-w-xl text-paper/65">{pinned.excerpt}</span>
                <span className="mt-8 flex items-center justify-between gap-4">
                  <span className="flex flex-wrap gap-1.5">
                    {pinned.tags.map((t) =>
                  <span key={t} className="rounded-full border border-paper/15 px-2.5 py-1 text-xs text-paper/70">
                        {t}
                      </span>
                  )}
                  </span>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-paper/80">
                    Read entry
                    <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </span>
                </span>
              </motion.button>
            }
          </AnimatePresence>

          <ul className="border-t border-paper/10">
            <AnimatePresence mode="popLayout" initial={false}>
              {rest.map((t) =>
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="border-b border-paper/10">
                
                  <button
                  type="button"
                  onClick={() => setOpenId(t.id)}
                  className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 py-6 text-left">
                  
                    <span className="col-span-6 font-mono text-xs text-paper/45 md:col-span-2">
                      {format(new Date(t.date), 'MMM d')}
                    </span>
                    <span className="col-span-6 text-right text-xs text-paper/55 md:col-span-2 md:text-left md:text-sm">
                      {thoughtKindLabel(t.kind)}
                    </span>
                    <span className="col-span-12 md:col-span-7">
                      <span className="block font-display text-2xl leading-snug transition-[transform,color] duration-200 ease-out group-hover:translate-x-2 group-hover:text-accent md:text-3xl">
                        {t.title}
                      </span>
                      <span className="mt-1.5 block text-sm text-paper/55">{t.excerpt}</span>
                    </span>
                    <span className="col-span-12 hidden text-right font-mono text-xs text-paper/45 md:col-span-1 md:block">
                      {t.readMinutes}m
                    </span>
                  </button>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      <ThoughtReader thought={open} onClose={close} />
    </section>);

}