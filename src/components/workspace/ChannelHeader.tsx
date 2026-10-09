import React from 'react';
import { HashIcon, MenuIcon, UsersIcon } from 'lucide-react';
import type { Channel } from '../../data/channels';

interface ChannelHeaderProps {
  channel: Channel;
  onOpenSidebar: () => void;
}

export function ChannelHeader({ channel, onOpenSidebar }: ChannelHeaderProps) {
  return (
    <header className="flex items-center gap-3 border-b border-work-line bg-white px-4 py-2.5 sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="rounded p-1.5 text-work-muted hover:bg-work-hover lg:hidden"
        aria-label="Open channel list">
        
        <MenuIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="flex items-center gap-1 text-[17px] font-bold text-work-ink">
          <HashIcon className="h-4 w-4 text-work-muted" aria-hidden="true" />
          {channel.name}
        </h1>
        <p className="truncate text-[13px] text-work-muted">{channel.topic}</p>
      </div>

      <span className="hidden items-center gap-1.5 rounded border border-work-line px-2 py-1 text-[13px] text-work-muted sm:flex">
        <UsersIcon className="h-3.5 w-3.5" aria-hidden="true" />
        {channel.members}
      </span>
    </header>);

}