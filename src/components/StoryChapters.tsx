import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { chapters } from '../data/chapters';
import { profile } from '../data/profile';
import { SplitReveal } from './text/SplitReveal';
import { scrollToTarget } from '../utils/smoothScroll';
import { EASE_OUT } from '../utils/motion';

export function StoryChapters() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.18],
    ['inset(14% 14% 14% 14% round 24px)', 'inset(0% 0% 0% 0% round 16px)']
  );

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(chapters.length - 1, Math.max(0, Math.floor(v * chapters.length)));
    setActive((prev) => prev === next ? prev : next);
  });

  const goTo = (i: number) => {
    if (!ref.current) return;
    scrollToTarget(ref.current.offsetTop + i * window.innerHeight + 4);
  };

  const chapter = chapters[active];

  return (
    <section
      id="story"
      ref={ref}
      aria-label="My story"
      className="relative"
      style={{ height: `${chapters.length * 100}vh` }}>
      
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-6 py-20 md:px-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <motion.figure style={{ clipPath }} className="relative overflow-hidden lg:col-span-5">
            <motion.img
              src={profile.portrait}
              alt={profile.portraitAlt}
              style={{ scale: imageScale, y: imageY }}
              className="h-[30svh] w-full object-cover lg:aspect-[4/5] lg:h-auto lg:max-h-[74svh]" />
            
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-3 py-1 font-mono text-[11px] text-paper/80 backdrop-blur">
              {profile.first}, {profile.location.split(',')[0]} studio
            </figcaption>
          </motion.figure>

          <div className="flex flex-col lg:col-span-7">
            <p className="font-mono text-xs text-paper/50">(01) — The story</p>
            <ol className="mt-5 flex flex-wrap gap-x-6 gap-y-2" aria-label="Chapters">
              {chapters.map((c, i) =>
              <li key={c.id}>
                  <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? 'step' : undefined}
                  className={`relative pb-2 text-sm transition-colors duration-150 ${
                  i === active ? 'text-paper' : 'text-paper/40 hover:text-paper/70'}`
                  }>
                  
                    <span className="mr-1.5 font-mono text-[11px] text-paper/40">0{i + 1}</span>
                    {c.label}
                    {i === active &&
                  <motion.span
                    layoutId="chapter-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-accent"
                    transition={{ duration: 0.25, ease: EASE_OUT }} />

                  }
                  </button>
                </li>
              )}
            </ol>

            <div className="mt-8 min-h-[22rem] md:mt-12 md:min-h-[26rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.article
                  key={chapter.id}
                  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}>
                  
                  <SplitReveal
                    parts={[chapter.title]}
                    trigger="mount"
                    stagger={0.035}
                    className="max-w-2xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl" />
                  
                  <motion.p
                    className="mt-6 max-w-xl text-lg leading-relaxed text-paper/65"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.18 }}>
                    
                    {chapter.body}
                  </motion.p>
                  <motion.div
                    className="mt-10 flex items-baseline gap-4"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.26 }}>
                    
                    <span className="font-display text-6xl italic text-accent md:text-7xl">{chapter.stat.value}</span>
                    <span className="max-w-[12rem] text-sm text-paper/55">{chapter.stat.label}</span>
                  </motion.div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-paper/10">
                <motion.div className="h-px origin-left bg-paper/70" style={{ scaleX: scrollYProgress }} />
              </div>
              <span className="font-mono text-xs tabular-nums text-paper/50">
                {active + 1} / {chapters.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}