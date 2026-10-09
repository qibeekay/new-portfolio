import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import { Panel } from "../components/Panel";
import { CaptionBox } from "../components/CaptionBox";
import { SpeechBubble } from "../components/SpeechBubble";
import { HeroReveal } from "../components/HeroReveal";
import { issues } from "../data/issues";
import type { SpotColor } from "../types/portfolio";

const INK: Record<SpotColor, string> = {
  red: "#e63946",
  yellow: "#f4a300",
  blue: "#2f6690",
  teal: "#1d7874",
};

export function Cover() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b-[3px] border-ink pb-3">
        <p className="font-caption text-[11px] uppercase tracking-[0.3em] text-ink-soft">
          qibeekay Comics · No. 00 · Silver Age Edition
        </p>
        <p className="font-caption text-[11px] uppercase tracking-[0.3em] text-ink-soft">
          Approved · 25¢
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="ink-stroke font-display text-[clamp(3.2rem,10vw,8.5rem)] uppercase leading-[0.82] tracking-wide text-pulp-red"
            style={{ textShadow: "9px 9px 0 #141210" }}
          >
            Anugo Mokwe
            <span className="block text-pulp-yellow">The Refactor</span>
          </motion.h1>

          <p className="mt-4 max-w-2xl font-body text-xl font-bold leading-snug sm:text-2xl">
            Staff software engineer. Nine years of shipping realtime systems,
            collaborative editors and interfaces that hold up when everything
            else is on fire.
          </p>

          <CaptionBox className="mt-5 max-w-xl -rotate-1">
            In this volume: an origin story, a measured power chart, a full
            stack of case files — closed and still open — and a way to send the
            signal.
          </CaptionBox>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/case-files"
              className="focus-ink inline-flex items-center gap-2 border-[3px] border-ink bg-pulp-red px-5 py-3 font-display text-2xl uppercase tracking-wide text-paper-light shadow-panel transition-transform duration-150 ease-pulp hover:-translate-y-1"
            >
              Open the case files{" "}
              <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to="/signal"
              className="focus-ink inline-flex items-center gap-2 border-[3px] border-ink bg-paper-light px-5 py-3 font-display text-2xl uppercase tracking-wide shadow-panel transition-transform duration-150 ease-pulp hover:-translate-y-1"
            >
              <MailIcon className="h-5 w-5" aria-hidden="true" /> Send the
              signal
            </Link>
          </div>
        </div>

        <div className="relative">
          <HeroReveal />
          <SpeechBubble
            className="mt-6 max-w-[320px] rotate-2"
            speaker="Issue 00"
          >
            “Ship it, watch it, then make it faster.”
          </SpeechBubble>
        </div>
      </div>

      <section aria-labelledby="rack" className="mt-20">
        <h2 id="rack" className="font-display text-3xl uppercase tracking-wide">
          In this volume
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {issues.slice(1).map((issue, index) => (
            <motion.li
              key={issue.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.24,
                delay: 0.05 + index * 0.04,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="h-full"
            >
              <Link to={issue.path} className="focus-ink block h-full">
                <Panel
                  color={issue.color}
                  interactive
                  className="flex h-full flex-col p-4"
                >
                  <span
                    className="font-display text-4xl leading-none"
                    style={{ color: INK[issue.color] }}
                    aria-hidden="true"
                  >
                    #{issue.number}
                  </span>
                  <span className="mt-2 block font-display text-2xl uppercase leading-none tracking-wide">
                    {issue.title}
                  </span>
                  <span className="mt-2 block font-body text-sm leading-snug text-ink-soft">
                    {issue.tagline}
                  </span>
                  <span className="mt-auto flex items-center gap-1 pt-4 font-caption text-[10px] uppercase tracking-[0.2em]">
                    Read{" "}
                    <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Panel>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
