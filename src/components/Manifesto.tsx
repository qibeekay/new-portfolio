import React from 'react';
import { ScrubText } from './text/ScrubText';

export function Manifesto() {
  return (
    <section aria-label="Manifesto" className="relative px-6 py-32 md:px-10 md:py-48">
      <p className="font-mono text-xs text-paper/50">A note before the story</p>
      <ScrubText
        className="mt-8 max-w-6xl font-display text-4xl leading-[1.08] tracking-tight md:text-6xl lg:text-7xl"
        text="I build interfaces that feel inevitable — where every hover, scroll and transition earns its place, and the code underneath is as considered as the pixels on top."
        highlight={['inevitable', 'earns', 'considered']} />
      
    </section>);

}