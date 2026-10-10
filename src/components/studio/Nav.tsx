import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { profile } from "../../data/profile";
import { Magnetic } from "../Magnetic";
import { lockScroll } from "../../utils/smoothScroll";
import { EASE_OUT } from "../../utils/motion";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "work", label: "Work" },
  // { id: 'thoughts', label: 'Thoughts' },
  { id: "toolkit", label: "Toolkit" },
  { id: "experience", label: "Experience" },
];

export function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 240);
    setScrolled(v > 40);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...LINKS.map((l) => l.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: "-100%" }}
        animate={{ y: !ready || (hidden && !open) ? "-100%" : "0%" }}
        transition={{
          duration: 0.25,
          ease: EASE_OUT,
          delay: ready && !scrolled ? 0.6 : 0,
        }}
      >
        <div
          className={`flex h-16 items-center justify-between border-b px-6 transition-colors duration-200 md:px-10 ${
            scrolled || open
              ? "border-paper/10 bg-ink/80 backdrop-blur-md"
              : "border-transparent"
          }`}
        >
          <a
            href="#top"
            className="font-display text-2xl leading-none"
            onClick={() => setOpen(false)}
          >
            {profile.name}
            <sup className="ml-1 font-mono text-[10px] text-paper/50">©26</sup>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={active === link.id ? "true" : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-150 ${
                      active === link.id
                        ? "text-paper"
                        : "text-paper/60 hover:text-paper"
                    }`}
                  >
                    {active === link.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-paper/10"
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 whitespace-nowrap text-xs text-paper/60 xl:flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Available Jan ’27
            </span>
            <Magnetic className="hidden lg:inline-block">
              <a
                href="#contact"
                className="inline-block whitespace-nowrap rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-accent"
              >
                Let’s talk
              </a>
            </Magnetic>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-paper/15 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? (
                <XIcon className="size-4" />
              ) : (
                <MenuIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <ul className="space-y-2">
              {[...LINKS, { id: "contact", label: "Contact" }].map(
                (link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: EASE_OUT,
                      delay: i * 0.04,
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="font-display text-5xl"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ),
              )}
            </ul>
            <p className="text-sm text-paper/60">{profile.email}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
