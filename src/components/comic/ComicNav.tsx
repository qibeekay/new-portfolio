import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpenIcon } from "lucide-react";
import { issues } from "../data/issues";
import type { SpotColor } from "../types/portfolio";

const FILLS: Record<SpotColor, string> = {
  red: "bg-pulp-red text-paper-light",
  yellow: "bg-pulp-yellow text-ink",
  blue: "bg-pulp-blue text-paper-light",
  teal: "bg-pulp-teal text-paper-light",
};

/** The comic rack: every issue spine visible, current one pulled forward. */
export function ComicNav() {
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Issues"
        className="mx-auto flex max-w-[1400px] items-center gap-3 border-b-[3px] border-ink bg-paper/95 px-4 py-2 backdrop-blur-[2px] sm:px-6"
      >
        <Link
          to="/"
          className="focus-ink flex shrink-0 items-center gap-2 border-[3px] border-ink bg-ink px-2.5 py-1.5 text-paper-light shadow-panel-sm transition-colors duration-150 ease-pulp hover:bg-pulp-red"
        >
          <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
          <span className="font-display text-lg leading-none tracking-wide">
            qibeekay
          </span>
        </Link>

        <ul className="flex flex-1 items-end gap-1.5 overflow-x-auto pb-0.5 sm:gap-2">
          {issues.slice(1).map((issue) => {
            const active = pathname === issue.path;
            return (
              <li key={issue.slug} className="shrink-0">
                <Link
                  to={issue.path}
                  aria-current={active ? "page" : undefined}
                  className="focus-ink group block"
                >
                  <motion.span
                    className={`flex items-center gap-2 border-[3px] border-ink px-2.5 py-1.5 ${
                      active ? FILLS[issue.color] : "bg-paper-light text-ink"
                    }`}
                    animate={{
                      y: active ? -3 : 0,
                      boxShadow: active
                        ? "4px 4px 0 0 #141210"
                        : "2px 2px 0 0 #141210",
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="font-caption text-[10px] leading-none opacity-70">
                      #{issue.number}
                    </span>
                    <span className="font-display text-base leading-none tracking-wide whitespace-nowrap">
                      {issue.title}
                    </span>
                  </motion.span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
