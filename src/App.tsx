import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import {
  ThemeProvider,
  useTheme,
  type SiteTheme,
} from "./contexts/ThemeContext";
import { ProjectsProvider } from "./contexts/ProjectsContext";
import { Cursor } from "./components/Cursor";
import { Home } from "./pages/Home";
import { WorkspaceShell } from "./components/workspace/WorkspaceShell";
import { ComicShell } from "./components/ComicShell";
import { EdoShell } from "./components/edo/EdoShell";
import { MorphOverlay } from "./components/MorphOverlay";
import { ThemeNudge } from "./components/ThemeNudge";
import { ThemeDock } from "./components/ThemeDock";
import { AdminPage } from "./pages/admin/AdminPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";

interface AppProps {
  accent?: "ember" | "lime" | "ice";
  showLoader?: boolean;
}

const ACCENTS = {
  ember: "255 94 58",
  lime: "205 247 92",
  ice: "125 200 255",
};

const SCOPE: Record<SiteTheme, string> = {
  studio: "relative min-h-screen w-full bg-ink font-sans text-paper",
  workspace: "theme-workspace",
  comic: "theme-comic",
  edo: "theme-edo",
};

function ThemedSite({
  accentRgb,
  showLoader,
}: {
  accentRgb: string;
  showLoader: boolean;
}) {
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
            <>
              <Cursor />
              <Home accentRgb={accentRgb} showLoader={showLoader} />
            </>
          ) : theme === "workspace" ? (
            <WorkspaceShell />
          ) : theme === "comic" ? (
            <ComicShell />
          ) : (
            <EdoShell />
          )}
        </motion.div>
      </AnimatePresence>
      <ThemeNudge />
      <ThemeDock />
    </>
  );
}

export function App({ accent = "ember", showLoader = true }: AppProps) {
  const accentRgb = ACCENTS[accent];

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="min-h-screen w-full"
        style={{ "--accent": accentRgb } as React.CSSProperties}
      >
        <ProjectsProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/admin-path/login" element={<AdminLoginPage />} />
            <Route path="/admin-path/admin" element={<AdminPage />} />
            <Route path="/admin-path" element={<Navigate to="/admin-path/admin" replace />} />
            <Route
              path="/*"
              element={
                <ThemeProvider>
                  <ThemedSite accentRgb={accentRgb} showLoader={showLoader} />
                </ThemeProvider>
              }
            />
          </Routes>
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0c0d10",
                borderColor: "rgba(242, 239, 230, 0.12)",
                color: "#f2efe6",
              },
            }}
          />
        </BrowserRouter>
      </ProjectsProvider>
    </div>
  </QueryClientProvider>
);
}
