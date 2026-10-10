import React from 'react';

interface ProjectsSkeletonProps {
  view: 'index' | 'grid';
  count?: number;
}

export function ProjectsSkeleton({ view, count = 3 }: ProjectsSkeletonProps) {
  if (view === 'grid') {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-paper/10 bg-surface/40 p-4"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-paper/[0.04] to-transparent" />

            {/* Top badges placeholder */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-28 animate-pulse rounded-full bg-paper/10" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-paper/10" />
            </div>

            {/* Bottom card content */}
            <div className="absolute inset-x-3 bottom-3 rounded-xl border border-paper/5 bg-ink/70 p-4 backdrop-blur-sm">
              <div className="flex items-end justify-between gap-4">
                <div className="w-full space-y-2">
                  <div className="h-7 w-3/4 animate-pulse rounded-md bg-paper/15" />
                  <div className="h-4 w-1/2 animate-pulse rounded-md bg-paper/10" />
                </div>
                <div className="size-10 shrink-0 animate-pulse rounded-full bg-paper/15" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Index view skeleton
  return (
    <ul className="border-t border-paper/10">
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="relative grid grid-cols-12 items-center gap-x-4 gap-y-2 overflow-hidden border-b border-paper/10 py-5"
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-paper/[0.04] to-transparent" />

          {/* Year */}
          <div className="col-span-2 md:col-span-1">
            <div className="h-4 w-10 animate-pulse rounded bg-paper/15" />
          </div>

          {/* Title */}
          <div className="col-span-8 min-w-0 md:col-span-4">
            <div
              className="h-8 animate-pulse rounded-md bg-paper/15"
              style={{ width: `${60 + (i % 3) * 15}%` }}
            />
          </div>

          {/* Tagline */}
          <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto">
            <div
              className="h-4 animate-pulse rounded bg-paper/10"
              style={{ width: `${70 + (i % 2) * 20}%` }}
            />
          </div>

          {/* Status badge */}
          <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-auto">
            <div className="h-6 w-24 animate-pulse rounded-full bg-paper/10" />
          </div>

          {/* Arrow button */}
          <div className="col-span-2 row-start-1 flex justify-end md:col-span-1 md:row-start-auto">
            <div className="size-9 animate-pulse rounded-full border border-paper/10 bg-paper/5" />
          </div>
        </li>
      ))}
    </ul>
  );
}
