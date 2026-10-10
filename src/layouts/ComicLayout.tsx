import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ComicNav } from "../components/comic/ComicNav";
import { HalftoneBackground } from "../components/comic/HalftoneBackground";
import { InkCursor } from "../components/comic/InkCursor";
import { SfxLayer } from "../components/comic/SfxLayer";
import { PageTransition } from "../components/ui/PageTransition";
import { Cover } from "../pages/comic/Cover";
import { OriginStory } from "../pages/comic/OriginStory";
import { Powers } from "../pages/comic/Powers";
import { CaseFiles } from "../pages/comic/CaseFiles";
import { Chronicles } from "../pages/comic/Chronicles";
import { Signal } from "../pages/comic/Signal";

const INK_BY_PATH: Record<string, number> = {
  "/": 0,
  "/origin": 1,
  "/powers": 2,
  "/case-files": 0,
  "/chronicles": 2,
  "/signal": 1,
};

export function ComicLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full">
      <HalftoneBackground inkIndex={INK_BY_PATH[location.pathname] ?? 0} />
      <InkCursor />
      <SfxLayer />
      <ComicNav />

      <main className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Cover />} />
              <Route path="/origin" element={<OriginStory />} />
              <Route path="/powers" element={<Powers />} />
              <Route path="/case-files" element={<CaseFiles />} />
              <Route path="/chronicles" element={<Chronicles />} />
              <Route path="/signal" element={<Signal />} />
              <Route path="*" element={<Cover />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Backward-compatibility alias
export { ComicLayout as ComicShell };
