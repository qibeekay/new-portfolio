import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRightIcon, XIcon } from "lucide-react";
import { useTheme, type SiteTheme } from "../contexts/ThemeContext";

const DELAY = 60_000;
const TYPING = 1600;
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface Door {
  id: Exclude<SiteTheme, "studio">;
  cta: string;
  line: string;
  preview: React.ReactNode;
}

const DOORS: Door[] = [
  {
    id: "comic",
    cta: "Enter the comic",
    line: "Hover the cover to unmask me.",
    preview: (
      <span className="relative block h-full bg-[#f4ecd6] p-2">
        <span className="block h-2.5 w-12 border border-[#141210] bg-[#e63946]" />
        <span className="mt-1.5 block h-1.5 w-16 bg-[#141210]/70" />
        <span className="mt-1 block h-1.5 w-10 bg-[#f4a300]" />
        <span className="absolute bottom-1.5 right-1.5 h-5 w-5 rounded-full border-2 border-[#141210] bg-[#2f6690]" />
      </span>
    ),
  },
  {
    id: "edo",
    cta: "Unroll the scroll",
    line: "Brush ink across the page.",
    preview: (
      <span className="relative block h-full bg-[#efe6d3] p-2">
        <span className="block h-2 w-2 bg-[#b23a2c]" />
        <span className="mt-1.5 block h-1.5 w-16 bg-[#1c1a17]/60" />
        <span className="mt-1 block h-1.5 w-10 bg-[#27415f]/70" />
        <span className="absolute bottom-1.5 right-2 top-1.5 w-px bg-[#1c1a17]/40" />
      </span>
    ),
  },
  {
    id: "workspace",
    cta: "Join the workspace",
    line: "Chat with my projects.",
    preview: (
      <span className="flex h-full bg-white">
        <span className="block w-4 bg-[#3f0e40]" />
        <span className="flex-1 p-2">
          <span className="block h-1.5 w-12 bg-[#1d1c1d]/70" />
          <span className="mt-1.5 block h-1.5 w-16 bg-[#e2e0e2]" />
          <span className="mt-1.5 block h-3 w-10 rounded-sm border-l-2 border-[#2eb67d] bg-[#f6f5f6]" />
        </span>
      </span>
    ),
  },
];

/**
 * After a minute in the Studio, Alex "types" a note inviting the visitor
 * into the other three worlds — pointing at the dock so they know where it lives.
 */
export function ThemeNudge() {
  const { theme, hasSwitched, setTheme } = useTheme();
  const [stage, setStage] = useState<"hidden" | "typing" | "open">("hidden");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || hasSwitched || theme !== "studio") return;
    const start = window.setTimeout(() => setStage("typing"), DELAY);
    return () => window.clearTimeout(start);
  }, [dismissed, hasSwitched, theme]);

  useEffect(() => {
    if (stage !== "typing") return;
    const open = window.setTimeout(() => setStage("open"), TYPING);
    return () => window.clearTimeout(open);
  }, [stage]);

  const close = () => {
    setStage("hidden");
    setDismissed(true);
  };

  const visible = theme === "studio" && !hasSwitched && stage !== "hidden";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="nudge"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.97 }}
          transition={{ duration: 0.26, ease: EASE }}
          className="fixed bottom-[76px] right-5 z-[112] w-[min(360px,calc(100vw-2.5rem))] origin-bottom-right rounded-2xl border border-[#edeae3]/10 bg-[#141416] text-[#edeae3] shadow-2xl shadow-black/60"
          style={{ fontFamily: "Geist, system-ui, sans-serif" }}
          aria-live="polite"
          aria-label="A note from Alex"
        >
          <header className="flex items-center gap-3 border-b border-[#edeae3]/10 px-4 py-3">
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#ff5e3a] text-[11px] font-semibold text-[#0a0a0b]">
              AR
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#141416] bg-[#2eb67d]"
                aria-hidden="true"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-tight">
                Anugo Mokwe
              </p>
              <p className="text-[11px] leading-tight text-[#edeae3]/45">
                {stage === "typing" ? "typing…" : "just now"}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="grid h-7 w-7 place-items-center rounded-full text-[#edeae3]/50 transition-colors duration-150 hover:bg-[#edeae3]/10 hover:text-[#edeae3]"
              aria-label="Dismiss note"
            >
              <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </header>

          {stage === "typing" ? (
            <div className="px-4 py-5">
              <span
                className="inline-flex gap-1 rounded-2xl rounded-bl-sm bg-[#edeae3]/[0.07] px-3.5 py-3"
                aria-label="Alex is typing"
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-[#edeae3]/60"
                    animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: dot * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="px-4 pb-4 pt-3"
            >
              <p className="text-[14px] leading-relaxed text-[#edeae3]/85">
                You’ve spent a minute in the studio — thank you. Want to see the
                same work{" "}
                <span className="font-['Instrument_Serif',serif] text-[17px] italic text-[#ff5e3a]">
                  somewhere stranger?
                </span>
              </p>

              <ul className="mt-4 space-y-2">
                {DOORS.map((door, index) => (
                  <motion.li
                    key={door.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.08 + index * 0.05,
                      ease: EASE,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setTheme(door.id)}
                      className="group flex w-full items-center gap-3 rounded-xl border border-[#edeae3]/10 p-2 text-left transition-colors duration-150 hover:border-[#ff5e3a]/60 hover:bg-[#edeae3]/[0.04]"
                    >
                      <span className="block h-12 w-20 shrink-0 overflow-hidden rounded-md border border-black/30 transition-transform duration-200 ease-pulp group-hover:-rotate-2 group-hover:scale-[1.04]">
                        {door.preview}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium">
                          {door.cta}
                        </span>
                        <span className="block truncate text-[12px] text-[#edeae3]/50">
                          {door.line}
                        </span>
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full px-3 py-1.5 text-[12px] text-[#edeae3]/55 transition-colors duration-150 hover:bg-[#edeae3]/10 hover:text-[#edeae3]"
                >
                  I’ll stay in the studio
                </button>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#edeae3]/40">
                  Switch any time below{" "}
                  <ArrowDownRightIcon
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </motion.div>
          )}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
