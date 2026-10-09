import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ComicNav } from "./ComicNav";
import { HalftoneBackground } from "./HalftoneBackground";
import { InkCursor } from "./InkCursor";
import { SfxLayer } from "./SfxLayer";
import { PageTransition } from "./PageTransition";
import { Cover } from "../pages/Cover";
import { OriginStory } from "../pages/OriginStory";
import { Powers } from "../pages/Powers";
import { CaseFiles } from "../pages/CaseFiles";
import { Chronicles } from "../pages/Chronicles";
import { Signal } from "../pages/Signal";

const INK_BY_PATH: Record<string, number> = {
  "/": 0,
  "/origin": 1,
  "/powers": 2,
  "/case-files": 0,
  "/chronicles": 2,
  "/signal": 1,
};

export function ComicShell() {
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

      <footer className="relative z-10 border-t-[3px] border-ink bg-ink px-4 py-4 text-center sm:px-6">
        <p className="font-caption text-[11px] uppercase tracking-[0.24em] text-paper-dark">
          qibeekay Comics · Vol. 1 · Printed on the web · Approved by the Code
          Review Authority
        </p>
      </footer>
    </div>
  );
}
