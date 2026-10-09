import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type SiteTheme = 'studio' | 'workspace' | 'comic' | 'edo';

export const themeLabels: Record<SiteTheme, string> = {
  studio: 'Studio',
  workspace: 'Workspace',
  comic: 'Comic',
  edo: 'Edo'
};

export const themeOrder: SiteTheme[] = ['studio', 'workspace', 'comic', 'edo'];

interface ThemeContextValue {
  theme: SiteTheme;
  /** The theme being morphed into, used by the wipe overlay. */
  incoming: SiteTheme | null;
  morphing: boolean;
  /** True once the visitor has ever left the default studio theme. */
  hasSwitched: boolean;
  setTheme: (next: SiteTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const MORPH_HOLD = 260;

export function ThemeProvider({ children }: {children: React.ReactNode;}) {
  const [theme, setThemeState] = useState<SiteTheme>('studio');
  const [incoming, setIncoming] = useState<SiteTheme | null>(null);
  const [morphing, setMorphing] = useState(false);
  const [hasSwitched, setHasSwitched] = useState(false);

  const setTheme = useCallback(
    (next: SiteTheme) => {
      if (next === theme) return;
      setIncoming(next);
      setMorphing(true);
      setHasSwitched(true);
      window.setTimeout(() => {
        setThemeState(next);
        window.scrollTo({ top: 0, behavior: 'auto' });
        window.setTimeout(() => {
          setMorphing(false);
          setIncoming(null);
        }, 40);
      }, MORPH_HOLD);
    },
    [theme]
  );

  const value = useMemo(
    () => ({ theme, incoming, morphing, hasSwitched, setTheme }),
    [theme, incoming, morphing, hasSwitched, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}