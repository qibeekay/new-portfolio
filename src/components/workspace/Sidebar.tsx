import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, HashIcon, XIcon } from 'lucide-react';
import { channels, workspaceMeta } from '../../data/channels';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-work-plum text-white/80 transition-transform duration-200 ease-pulp lg:static lg:translate-x-0 ${
      open ? 'translate-x-0' : '-translate-x-full'}`
      }
      aria-label="Channels">
      
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="flex items-center gap-1.5 text-[15px] font-bold text-white">
            {workspaceMeta.name}
            <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12px]">
            <span className="h-2 w-2 rounded-full bg-work-green" aria-hidden="true" />
            {workspaceMeta.person}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 hover:bg-white/10 lg:hidden"
          aria-label="Close channel list">
          
          <XIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <p className="flex items-center gap-1.5 px-2 py-1 text-[13px] font-semibold text-white/60">
          <ChevronDownIcon className="h-3 w-3" aria-hidden="true" /> Channels
        </p>
        <ul className="mt-1 space-y-0.5">
          {channels.map((channel) => {
            const active = pathname === channel.path;
            return (
              <li key={channel.id}>
                <Link
                  to={channel.path}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded px-2 py-1.5 text-[15px] transition-colors duration-150 ease-pulp ${
                  active ? 'bg-work-blue text-white' : 'hover:bg-work-plum-hover'}`
                  }>
                  
                  <HashIcon className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                  <span className="truncate">{channel.name}</span>
                  {channel.badge ?
                  <span className="ml-auto rounded-full bg-work-red px-1.5 text-[11px] font-bold text-white">
                      {channel.badge}
                    </span> :
                  null}
                </Link>
              </li>);

          })}
        </ul>

        <p className="mt-5 flex items-center gap-1.5 px-2 py-1 text-[13px] font-semibold text-white/60">
          <ChevronDownIcon className="h-3 w-3" aria-hidden="true" /> Direct messages
        </p>
        <ul className="mt-1 space-y-0.5">
          <li>
            <Link
              to="/signal"
              onClick={onClose}
              className="flex items-center gap-2 rounded px-2 py-1.5 text-[15px] hover:bg-work-plum-hover">
              
              <span className="relative grid h-5 w-5 shrink-0 place-items-center rounded bg-work-yellow text-[10px] font-bold text-work-ink">
                AR
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-work-plum bg-work-green"
                  aria-hidden="true" />
                
              </span>
              <span className="truncate">{workspaceMeta.person}</span>
              <span className="ml-auto text-[11px] text-white/50">you</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <p className="text-[12px] font-semibold text-white">{workspaceMeta.role}</p>
        <p className="mt-0.5 text-[12px] text-white/60">{workspaceMeta.status}</p>
      </div>
    </aside>);

}