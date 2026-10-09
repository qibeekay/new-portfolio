import React from 'react';

interface AttachmentCardProps {
  accent?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}

/** The bordered attachment block a bot posts into a channel. */
export function AttachmentCard({ accent = '#1264a3', eyebrow, title, children }: AttachmentCardProps) {
  return (
    <div
      className="rounded-r-md border border-l-4 border-work-line bg-white px-4 py-3"
      style={{ borderLeftColor: accent }}>
      
      {eyebrow ?
      <p className="text-[11px] font-semibold uppercase tracking-wide text-work-muted">{eyebrow}</p> :
      null}
      <p className="text-[15px] font-bold text-work-ink">{title}</p>
      <div className="mt-2 space-y-2 text-[14px] leading-relaxed text-work-ink/90">{children}</div>
    </div>);

}