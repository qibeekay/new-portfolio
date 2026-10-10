import React from 'react';
import { ArrowUpIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { useLocalTime } from '../hooks/useLocalTime';

export function Footer() {
  const time = useLocalTime(profile.timeZone);

  return (
    <footer className="relative z-10 border-t border-paper/10 px-6 py-8 md:px-10">
      <div className="flex flex-col gap-6 text-sm text-paper/55 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {profile.name}. Designed & built by hand.</p>
        <p className="font-mono text-xs tabular-nums">
          {profile.location} · {time}
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-paper/70 transition-colors duration-150 hover:text-paper">
          
          Back to top <ArrowUpIcon className="size-4" />
        </a>
      </div>
    </footer>);

}