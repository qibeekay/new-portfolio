import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrushIcon, CheckIcon, LayoutPanelLeftIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import { themeLabels, themeOrder, useTheme, type SiteTheme } from '../contexts/ThemeContext';

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const META: Record<SiteTheme, {icon: typeof ZapIcon;blurb: string;swatch: string[];}> = {
  studio: { icon: SparklesIcon, blurb: 'Dark editorial studio', swatch: ['#0a0a0b', '#edeae3', '#ff5e3a'] },
  workspace: { icon: LayoutPanelLeftIcon, blurb: 'A team chat workspace', swatch: ['#3f0e40', '#ffffff', '#2eb67d'] },
  comic: { icon: ZapIcon, blurb: '1960s pulp comic book', swatch: ['#f4ecd6', '#e63946', '#f4a300'] },
  edo: { icon: BrushIcon, blurb: 'Edo-period handscroll', swatch: ['#efe6d3', '#1c1a17', '#b23a2c'] }
};

interface Skin {
  position: string;
  trigger: string;
  panel: string;
  item: string;
  itemActive: string;
  muted: string;
  label: string;
}

/** The dock wears the costume of whichever world it sits in. */
const SKINS: Record<SiteTheme, Skin> = {
  studio: {
    position: 'bottom-5 right-5',
    trigger:
    'rounded-full border border-[#edeae3]/15 bg-[#141416]/90 text-[#edeae3] backdrop-blur hover:border-[#edeae3]/35',
    panel: 'rounded-2xl border border-[#edeae3]/10 bg-[#141416] text-[#edeae3] shadow-2xl shadow-black/60',
    item: 'rounded-xl hover:bg-[#edeae3]/[0.06]',
    itemActive: 'rounded-xl bg-[#edeae3]/[0.08]',
    muted: 'text-[#edeae3]/50',
    label: 'font-["Geist",system-ui,sans-serif]'
  },
  workspace: {
    position: 'bottom-[92px] right-5',
    trigger: 'rounded-lg border border-work-line bg-white text-work-ink shadow-md hover:bg-work-hover',
    panel: 'rounded-xl border border-work-line bg-white text-work-ink shadow-[0_12px_32px_rgba(29,28,29,0.18)]',
    item: 'rounded-md hover:bg-work-hover',
    itemActive: 'rounded-md bg-work-plum text-white',
    muted: 'text-work-muted',
    label: 'font-["Inter",system-ui,sans-serif]'
  },
  comic: {
    position: 'bottom-5 right-5',
    trigger: 'border-[3px] border-[#141210] bg-[#fffdf6] text-[#141210] shadow-panel-sm hover:bg-pulp-yellow',
    panel: 'border-[3px] border-[#141210] bg-[#fffdf6] text-[#141210] shadow-panel',
    item: 'border-2 border-transparent hover:border-[#141210] hover:bg-pulp-yellow/40',
    itemActive: 'border-2 border-[#141210] bg-pulp-blue text-[#fffdf6]',
    muted: 'opacity-70',
    label: 'font-["Comic_Neue",cursive]'
  },
  edo: {
    position: 'bottom-[76px] right-5',
    trigger: 'border border-sumi/50 bg-washi-light text-sumi hover:bg-washi-dark',
    panel: 'border border-sumi/40 bg-washi-light text-sumi shadow-[0_10px_30px_rgba(28,26,23,0.18)]',
    item: 'hover:bg-sumi/[0.06]',
    itemActive: 'bg-sumi text-washi-light',
    muted: 'opacity-60',
    label: 'font-edo'
  }
};

/**
 * Always-present theme control pinned bottom-right so visitors know the
 * portfolio has other worlds. Collapsed it is a small pill; open, a menu.
 */
export function ThemeDock() {
  const { theme, setTheme, morphing } = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const skin = SKINS[theme];
  const Current = META[theme].icon;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onDown = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  useEffect(() => {
    if (morphing) setOpen(false);
  }, [morphing]);

  return (
    <div ref={root} className={`fixed z-[115] ${skin.position} ${skin.label}`} data-theme-dock>
      <AnimatePresence>
        {open ?
        <motion.div
          key="menu"
          id="theme-dock-menu"
          role="menu"
          aria-label="Choose a portfolio theme"
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: EASE }}
          className={`absolute bottom-full right-0 mb-2 w-64 origin-bottom-right p-1.5 ${skin.panel}`}>
          
            <p className={`px-2.5 pb-1.5 pt-1 text-[11px] font-medium ${skin.muted}`}>Same portfolio, four worlds</p>
            {themeOrder.map((id) => {
            const meta = META[id];
            const active = id === theme;
            return (
              <button
                key={id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setOpen(false);
                  setTheme(id);
                }}
                className={`flex w-full items-center gap-3 px-2.5 py-2 text-left transition-colors duration-150 ease-pulp ${
                active ? skin.itemActive : skin.item}`
                }>
                
                  <span className="flex shrink-0 overflow-hidden rounded-sm border border-black/15" aria-hidden="true">
                    {meta.swatch.map((color) =>
                  <span key={color} className="h-6 w-2.5" style={{ backgroundColor: color }} />
                  )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-semibold leading-tight">{themeLabels[id]}</span>
                    <span className={`block truncate text-[11px] leading-tight ${active ? 'opacity-75' : skin.muted}`}>
                      {meta.blurb}
                    </span>
                  </span>
                  {active ? <CheckIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : null}
                </button>);

          })}
          </motion.div> :
        null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="theme-dock-menu"
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12, ease: EASE }}
        className={`flex items-center gap-2 whitespace-nowrap py-2 pl-2.5 pr-3.5 text-[13px] font-semibold transition-colors duration-150 ease-pulp ${skin.trigger}`}>
        
        <span className="relative grid h-6 w-6 place-items-center">
          <Current className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className={skin.muted}>Theme</span>
        <span>{themeLabels[theme]}</span>
        <span className="ml-0.5 flex -space-x-1" aria-hidden="true">
          {themeOrder.
          filter((id) => id !== theme).
          map((id) =>
          <span
            key={id}
            className="h-2.5 w-2.5 rounded-full border border-black/20"
            style={{ backgroundColor: META[id].swatch[id === 'studio' ? 2 : 1] }} />

          )}
        </span>
      </motion.button>
    </div>);

}