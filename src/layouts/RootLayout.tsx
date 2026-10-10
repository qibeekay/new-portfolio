import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme, type SiteTheme } from "../store/themeStore";
import { MorphOverlay } from "../shared/MorphOverlay";
import { ThemeNudge } from "../shared/ThemeNudge";
import { ThemeDock } from "../shared/ThemeDock";
import { StudioLayout } from "./StudioLayout";
import { WorkspaceLayout } from "./WorkspaceLayout";
import { ComicLayout } from "./ComicLayout";
import { EdoLayout } from "./EdoLayout";

const SCOPE: Record<SiteTheme, string> = {
  studio: "relative min-h-screen w-full bg-ink font-sans text-paper",
  workspace: "theme-workspace",
  comic: "theme-comic",
  edo: "theme-edo",
};

interface RootLayoutProps {
  accentRgb: string;
  showLoader: boolean;
}

export function RootLayout({ accentRgb, showLoader }: RootLayoutProps) {
  const { theme } = useTheme();

  return (
    <>
      <MorphOverlay />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          className={SCOPE[theme]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {theme === "studio" ? (
            <StudioLayout accentRgb={accentRgb} showLoader={showLoader} />
          ) : theme === "workspace" ? (
            <WorkspaceLayout />
          ) : theme === "comic" ? (
            <ComicLayout />
          ) : (
            <EdoLayout />
          )}
        </motion.div>
      </AnimatePresence>
      <ThemeNudge />
      <ThemeDock />
    </>
  );
}
