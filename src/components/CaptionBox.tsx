import React from 'react';

interface CaptionBoxProps {
  children: React.ReactNode;
  className?: string;
}

/** The yellow narration box a silver-age issue opens its panels with. */
export function CaptionBox({ children, className = '' }: CaptionBoxProps) {
  return (
    <p
      className={`border-[3px] border-ink bg-pulp-yellow px-4 py-2 font-caption text-[13px] leading-relaxed text-ink shadow-panel-sm ${className}`}>
      
      {children}
    </p>);

}