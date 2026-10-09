import React from 'react';

interface SpeechBubbleProps {
  children: React.ReactNode;
  speaker?: string;
  className?: string;
}

export function SpeechBubble({ children, speaker, className = '' }: SpeechBubbleProps) {
  return (
    <div
      className={`bubble-tail relative rounded-[28px] border-[3px] border-ink bg-paper-light px-6 py-4 shadow-panel-sm ${className}`}>
      
      <p className="font-body text-base font-bold leading-snug text-ink sm:text-lg">{children}</p>
      {speaker ?
      <p className="mt-2 font-caption text-[11px] uppercase tracking-[0.2em] text-ink-soft">— {speaker}</p> :
      null}
    </div>);

}