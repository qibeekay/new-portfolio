import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AsteriskIcon } from 'lucide-react';
import { stackLayers } from '../data/stack';
import { SectionHeading } from './SectionHeading';
import { EASE_OUT } from '../utils/motion';

const MAX_YEARS = 8;

export function StackExplorer() {
  const [activeId, setActiveId] = useState(stackLayers[0].id);
  const active = stackLayers.find((l) => l.id === activeId) ?? stackLayers[0];
  const marqueeItems = stackLayers.flatMap((l) => l.tools.map((t) => t.name));

  return (
    <section id="toolkit" className="py-28 md:py-40">
      <div className="px-6 md:px-10">
        <SectionHeading
          index="04"
          label="Toolkit"
          title={['Three layers,', { text: 'one craft.', className: 'italic text-paper/60' }]}
          description="Most of my week lives in the browser. The rest is making sure what’s behind it is just as considered." />
        
      </div>

      <div className="marquee-wrap mt-16 overflow-hidden border-y border-paper/10 py-6" aria-hidden="true">
        <div className="animate-marquee flex w-max items-center">
          {[...marqueeItems, ...marqueeItems].map((name, i) =>
          <span key={`${name}-${i}`} className="flex items-center">
              <span className={`whitespace-nowrap px-6 font-display text-4xl md:text-6xl ${i % 2 ? 'italic text-paper/50' : ''}`}>
                {name}
              </span>
              <AsteriskIcon className="size-6 text-accent" />
            </span>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div role="tablist" aria-label="Disciplines" aria-orientation="vertical" className="lg:col-span-5">
          {stackLayers.map((layer) => {
            const isActive = layer.id === activeId;
            return (
              <button
                key={layer.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls="toolkit-panel"
                onClick={() => setActiveId(layer.id)}
                className="group flex w-full items-end justify-between gap-6 border-b border-paper/10 py-6 text-left">
                
                <span>
                  <span
                    className={`block font-display text-5xl leading-none transition-colors duration-200 md:text-7xl ${
                    isActive ? 'text-paper' : 'text-paper/25 group-hover:text-paper/55'}`
                    }>
                    
                    {layer.name}
                  </span>
                  <span className="mt-2 block text-sm text-paper/50">{layer.discipline}</span>
                </span>
                <span className={`font-mono text-sm tabular-nums ${isActive ? 'text-accent' : 'text-paper/35'}`}>
                  {layer.share}%
                </span>
              </button>);

          })}
        </div>

        <div id="toolkit-panel" role="tabpanel" className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-lg">{active.caption}</p>
            <p className="whitespace-nowrap font-mono text-xs text-paper/50">~{active.share}% of my week</p>
          </div>
          <div className="mt-4 flex h-2 gap-1 overflow-hidden rounded-full" aria-hidden="true">
            {stackLayers.map((l) =>
            <motion.span
              key={l.id}
              className="h-full rounded-full"
              style={{ flexBasis: `${l.share}%` }}
              animate={{ backgroundColor: l.id === activeId ? 'rgb(var(--accent))' : 'rgb(var(--paper) / 0.12)' }}
              transition={{ duration: 0.2, ease: EASE_OUT }} />

            )}
          </div>

          <ul className="mt-10 divide-y divide-paper/10 border-t border-paper/10">
            <AnimatePresence mode="wait" initial={false}>
              {active.tools.map((tool, i) =>
              <motion.li
                key={`${active.id}-${tool.name}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT, delay: i * 0.04 }}
                className="grid grid-cols-12 items-center gap-x-4 gap-y-2 py-5">
                
                  <span className="col-span-8 font-medium md:col-span-4">{tool.name}</span>
                  <span className="col-span-4 text-right font-mono text-xs tabular-nums text-paper/50 md:order-last md:col-span-1">
                    {tool.years} yrs
                  </span>
                  <span className="col-span-12 h-1 overflow-hidden rounded-full bg-paper/10 md:col-span-3">
                    <motion.span
                    className="block h-full origin-left rounded-full bg-paper/80"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: tool.years / MAX_YEARS }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.1 + i * 0.04 }} />
                  
                  </span>
                  <span className="col-span-12 text-sm text-paper/55 md:col-span-4">{tool.note}</span>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>);

}