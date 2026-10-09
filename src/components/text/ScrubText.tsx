import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ScrubWord } from './ScrubWord';

interface ScrubTextProps {
  text: string;
  className?: string;
  highlight?: string[];
}

export function ScrubText({ text, className = '', highlight = [] }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[^\p{L}\p{N}’']/gu, '').toLowerCase();
        return (
          <ScrubWord
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={highlight.includes(clean)}>
            
            {word}
          </ScrubWord>);

      })}
    </p>);

}