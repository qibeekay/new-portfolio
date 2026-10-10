import React, { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { LayoutGridIcon, ListIcon } from "lucide-react";
import { useProjects } from "../../contexts/ProjectsContext";
import type {
  Project,
  ProjectCategory,
  ProjectStatus,
} from "../../types/portfolio";
import { SectionHeading } from "../SectionHeading";
import { ProjectGridCard } from "./ProjectGridCard";
import { ProjectIndexRow } from "./ProjectIndexRow";
import { HoverPreview } from "./HoverPreview";
import { ProjectDrawer } from "./ProjectDrawer";
import { ProjectsSkeleton } from "./ProjectsSkeleton";
import { CATEGORIES, STATUSES } from "../../utils/projectMeta";
import { EASE_OUT } from "../../utils/motion";

type CategoryFilter = "all" | ProjectCategory;
type StatusFilter = "any" | ProjectStatus;
type View = "index" | "grid";

export function ProjectsSection() {
  const { projects, isLoading } = useProjects();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("any");
  const [view, setView] = useState<View>("index");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Project | null>(null);

  const byCategory =
    category === "all"
      ? projects
      : projects.filter((p) => p.category === category);
  const filtered =
    status === "any"
      ? byCategory
      : byCategory.filter((p) => p.status === status);
  const groups = (
    category === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === category)
  )
    .map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.id) }))
    .filter((g) => g.items.length > 0);
  const ordered = groups.flatMap((g) => g.items);
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const showFeatured =
    !isLoading && category === "all" && status === "any" && featured.length > 0;
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  const open = (p: Project) => setSelectedId(p.id);
  const close = useCallback(() => setSelectedId(null), []);
  const next = () => {
    const list = ordered.some((p) => p.id === selectedId) ? ordered : projects;
    const i = list.findIndex((p) => p.id === selectedId);
    setSelectedId(list[(i + 1) % list.length]?.id ?? null);
  };

  const categoryCount = (c: CategoryFilter) =>
    c === "all"
      ? projects.length
      : projects.filter((p) => p.category === c).length;
  const statusCount = (s: StatusFilter) =>
    s === "any"
      ? byCategory.length
      : byCategory.filter((p) => p.status === s).length;

  return (
    <section id="work" className="relative px-6 py-28 md:px-10 md:py-40">
      <SectionHeading
        index="02"
        label="Work"
        title={[
          "Things I’ve built,",
          { text: "shipped", className: "italic text-paper/60" },
          "and obsessed over.",
        ]}
        description={
          isLoading
            ? "Fetching live projects from endpoint..."
            : `${projects.length} projects across creative, functional and systems work — finished, in flight, and still on the whiteboard.`
        }
      />

      {showFeatured && (
        <div className="mt-16">
          <p className="font-mono text-xs text-paper/50">Spotlight</p>
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {featured.map((p) => (
              <ProjectGridCard key={p.id} project={p} onOpen={open} large />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-16 flex flex-col gap-4 border-b border-paper/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Project category"
          className="flex w-fit flex-wrap rounded-full border border-paper/10 p-1"
        >
          {[{ id: "all" as CategoryFilter, label: "All" }, ...CATEGORIES].map(
            (c) => (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={category === c.id}
                onClick={() => setCategory(c.id)}
                className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors duration-150 ${
                  category === c.id
                    ? "text-ink"
                    : "text-paper/60 hover:text-paper"
                }`}
              >
                {category === c.id && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-paper"
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  />
                )}
                <span className="relative">
                  {c.label}
                  <span className="ml-1 font-mono text-[10px] opacity-60">
                    {categoryCount(c.id)}
                  </span>
                </span>
              </button>
            ),
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex flex-wrap gap-1.5"
            role="group"
            aria-label="Filter by status"
          >
            {[
              { id: "any" as StatusFilter, label: "Any status" },
              ...STATUSES,
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={status === s.id}
                onClick={() => setStatus(s.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs transition-colors duration-150 ${
                  status === s.id
                    ? "border-accent text-paper"
                    : "border-paper/10 text-paper/55 hover:border-paper/30 hover:text-paper"
                }`}
              >
                {s.label}{" "}
                <span className="font-mono opacity-60">
                  {statusCount(s.id)}
                </span>
              </button>
            ))}
          </div>

          <div
            className="flex rounded-full border border-paper/10 p-1"
            role="group"
            aria-label="Layout"
          >
            {(
              [
                { id: "index", label: "Index view", Icon: ListIcon },
                { id: "grid", label: "Grid view", Icon: LayoutGridIcon },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={`grid size-8 place-items-center rounded-full transition-colors duration-150 ${
                  view === id
                    ? "bg-paper text-ink"
                    : "text-paper/55 hover:text-paper"
                }`}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <LayoutGroup>
        {isLoading ? (
          <div className="mt-12">
            <div className="mb-6 flex items-baseline justify-between border-b border-paper/10 pb-4">
              <div className="h-8 w-44 animate-pulse rounded bg-paper/15" />
              <div className="hidden h-4 w-48 animate-pulse rounded bg-paper/10 md:block" />
            </div>
            <ProjectsSkeleton view={view} count={4} />
          </div>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-start gap-4 py-20">
            <p className="font-display text-3xl">Nothing here — yet.</p>
            <p className="text-paper/55">
              No projects match that combination of filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setStatus("any");
              }}
              className="rounded-full border border-paper/20 px-4 py-2 text-sm transition-colors duration-150 hover:bg-paper/10"
            >
              Clear filters
            </button>
          </div>
        ) : (
          groups.map((group) => (
            <motion.div layout="position" key={group.id} className="mt-12">
              {category === "all" && (
                <div className="flex items-baseline justify-between gap-6 pb-4">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-4xl md:text-5xl">
                      {group.label}
                    </h3>
                    <span className="font-mono text-xs text-paper/45">
                      {group.items.length}
                    </span>
                  </div>
                  <p className="hidden max-w-sm text-right text-sm text-paper/50 md:block">
                    {group.blurb}
                  </p>
                </div>
              )}
              {view === "index" ? (
                <ul
                  className="border-t border-paper/10"
                  onMouseLeave={() => setHovered(null)}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {group.items.map((p) => (
                      <ProjectIndexRow
                        key={p.id}
                        project={p}
                        onOpen={open}
                        onHover={setHovered}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {group.items.map((p) => (
                      <ProjectGridCard key={p.id} project={p} onOpen={open} />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </motion.div>
          ))
        )}
      </LayoutGroup>

      {view === "index" && <HoverPreview project={selected ? null : hovered} />}
      <ProjectDrawer project={selected} onClose={close} onNext={next} />
    </section>
  );
}
