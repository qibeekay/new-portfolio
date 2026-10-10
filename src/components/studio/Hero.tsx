import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { useLocalTime } from '../hooks/useLocalTime';
import { RotatingWord } from './text/RotatingWord';
import { Magnetic } from './Magnetic';
import { EASE_OUT } from '../utils/motion';

const ROTATING = ['interfaces', 'experiments', 'systems', 'tools'];

export function Hero({ ready }: {ready: boolean;}) {
  const ref = useRef<HTMLElement>(null);
  const time = useLocalTime(profile.timeZone);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const nameX = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const letters = profile.name.split('');

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: { duration: 0.3, ease: EASE_OUT, delay }
  });

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div
        style={{ scale, opacity, y }}
        className="flex h-full origin-top flex-col justify-between px-6 pb-8 pt-28 md:px-10">
        
        <motion.div {...fade(0.6)} className="grid gap-8 md:grid-cols-12">
          <p className="max-w-md text-lg leading-relaxed text-paper/80 md:col-span-6 md:text-xl">
            {profile.intro}
          </p>
          <dl className="grid grid-cols-2 gap-6 text-sm md:col-span-5 md:col-start-8 md:grid-cols-3">
            <div>
              <dt className="font-mono text-xs text-paper/45">Based in</dt>
              <dd className="mt-1.5">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-paper/45">Local time</dt>
              <dd className="mt-1.5 tabular-nums">{time}</dd>
            </div>
            <div className="col-span-2 md:col-span-1">
              <dt className="font-mono text-xs text-paper/45">Currently</dt>
              <dd className="mt-1.5">{profile.current}</dd>
            </div>
          </dl>
        </motion.div>

        <div>
          <motion.h1
            style={{ x: nameX }}
            aria-label={profile.name}
            className="whitespace-nowrap font-display text-[17vw] leading-[0.85] tracking-[-0.03em] md:text-[15vw]">
            
            {letters.map((ch, i) =>
            ch === ' ' ?
            <span key={i} aria-hidden="true" className="inline-block w-[0.22em]" /> :

            <motion.span
              key={i}
              aria-hidden="true"
              className="inline-block"
              initial={{ opacity: 0, y: '45%', filter: 'blur(10px)' }}
              animate={
              ready ?
              { opacity: 1, y: '0%', filter: 'blur(0px)' } :
              { opacity: 0, y: '45%', filter: 'blur(10px)' }
              }
              transition={{ duration: 0.3, ease: EASE_OUT, delay: ready ? 0.1 + i * 0.045 : 0 }}>
              
                  <span className="inline-block cursor-default transition-[transform,color] duration-150 ease-out hover:-translate-y-[0.06em] hover:italic hover:text-accent">
                    {ch}
                  </span>
                </motion.span>

            )}
          </motion.h1>

          <motion.div
            {...fade(0.75)}
            className="mt-6 grid grid-cols-2 items-end gap-4 border-t border-paper/10 pt-5 text-sm md:grid-cols-3">
            
            <p>
              <span className="font-display text-2xl md:text-3xl">
                Building <RotatingWord words={ROTATING} className="italic text-accent" /> that move.
              </span>
              <span className="mt-1 block text-paper/50">Frontend · Creative development · Backend</span>
            </p>
            <div className="hidden justify-center md:flex">
              <Magnetic strength={0.4}>
                <a
                  href="#story"
                  className="group flex items-center gap-2 rounded-full border border-paper/15 px-4 py-2 text-paper/70 transition-colors duration-150 hover:border-paper/40 hover:text-paper">
                  
                  Scroll to begin the story
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                    
                    <ArrowDownIcon className="size-4" />
                  </motion.span>
                </a>
              </Magnetic>
            </div>
            <p className="text-right font-mono text-xs text-paper/50">Click anywhere — the field reacts</p>
          </motion.div>
        </div>
      </motion.div>
    </section>);

}