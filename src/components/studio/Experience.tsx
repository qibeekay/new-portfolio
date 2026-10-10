import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { experience } from "../data/experience";
import { SectionHeading } from "./SectionHeading";
import { EASE_OUT } from "../utils/motion";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0].id);

  return (
    <section id="experience" className="px-6 py-28 md:px-10 md:py-40">
      <SectionHeading
        index="05"
        label="Experience"
        title={[
          "Five years of",
          { text: "shipping.", className: "italic text-paper/60" },
        ]}
        description="Studios, startups and a stretch on my own. Open a role for what I actually did there."
      />

      <ul className="mt-16 border-t border-paper/10">
        {experience.map((role) => {
          const isOpen = openId === role.id;
          return (
            <li key={role.id} className="border-b border-paper/10">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`role-${role.id}`}
                onClick={() => setOpenId(isOpen ? null : role.id)}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-1 py-7 text-left"
              >
                <span className="col-span-12 font-mono text-xs text-paper/50 md:col-span-2">
                  {role.period}
                </span>
                <span
                  className={`col-span-10 font-display text-3xl leading-tight transition-colors duration-150 md:col-span-4 md:text-4xl ${
                    isOpen
                      ? "text-paper"
                      : "text-paper/75 group-hover:text-paper"
                  }`}
                >
                  {role.company}
                </span>
                <span className="col-span-12 order-last text-paper/70 md:order-none md:col-span-3">
                  {role.title}
                </span>
                <span className="hidden text-sm text-paper/45 md:col-span-2 md:block">
                  {role.location}
                </span>
                <span className="col-span-2 flex justify-end md:col-span-1">
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className={`grid size-9 place-items-center rounded-full border transition-colors duration-150 ${
                      isOpen
                        ? "border-accent bg-accent text-ink"
                        : "border-paper/15 group-hover:border-paper/40"
                    }`}
                  >
                    <PlusIcon className="size-4" />
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`role-${role.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-4 gap-y-6 pb-10">
                      <div className="col-span-12 md:col-span-6 md:col-start-3">
                        <p className="text-lg leading-relaxed text-paper/80">
                          {role.summary}
                        </p>
                        <ul className="mt-5 space-y-3">
                          {role.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-paper/65">
                              <span
                                className="mt-[0.7em] h-px w-4 shrink-0 bg-accent"
                                aria-hidden="true"
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-12 md:col-span-3">
                        <p className="font-mono text-xs text-paper/45">Stack</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {role.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-paper/15 px-2.5 py-1 text-xs text-paper/75"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
