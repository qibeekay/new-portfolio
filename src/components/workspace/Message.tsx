import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquareIcon, PinIcon, SmilePlusIcon } from "lucide-react";

export interface Reaction {
  emoji: string;
  count: number;
}

interface MessageProps {
  author?: string;
  badge?: string;
  time: string;
  avatarColor?: string;
  initials?: string;
  pinned?: boolean;
  reactions?: Reaction[];
  replies?: number;
  children: React.ReactNode;
}

/** One posted message: avatar, byline, body, and reactions you can actually add to. */
export function Message({
  author = "Anugo Mokwe",
  badge = "Staff Engineer",
  time,
  avatarColor = "#3f0e40",
  initials = "AR",
  pinned = false,
  reactions = [],
  replies,
  children,
}: MessageProps) {
  const [tally, setTally] = useState<Reaction[]>(reactions);
  const [mine, setMine] = useState<string[]>([]);

  const toggle = (emoji: string) => {
    const owned = mine.includes(emoji);
    setMine((current) =>
      owned ? current.filter((item) => item !== emoji) : [...current, emoji],
    );
    setTally((current) =>
      current.map((item) =>
        item.emoji === emoji
          ? { ...item, count: item.count + (owned ? -1 : 1) }
          : item,
      ),
    );
  };

  const addReaction = () => {
    const pool = ["🔥", "🙌", "🧠", "🚀", "👏"];
    const next = pool.find(
      (emoji) => !tally.some((item) => item.emoji === emoji),
    );
    if (!next) return;
    setTally((current) => [...current, { emoji: next, count: 1 }]);
    setMine((current) => [...current, next]);
  };

  return (
    <article className="group relative px-4 py-2.5 transition-colors duration-150 ease-pulp hover:bg-work-hover sm:px-6">
      {pinned ? (
        <p className="mb-1.5 flex items-center gap-1.5 pl-[46px] text-[11px] font-semibold text-work-muted">
          <PinIcon className="h-3 w-3" aria-hidden="true" /> Pinned by {author}
        </p>
      ) : null}

      <div className="flex gap-3">
        <span
          className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md text-[13px] font-semibold text-white"
          style={{ backgroundColor: avatarColor }}
          aria-hidden="true"
        >
          {initials}
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-bold text-work-ink">
              {author}
            </span>
            <span className="rounded border border-work-line bg-work-hover px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-work-muted">
              {badge}
            </span>
            <span className="text-[12px] text-work-muted">{time}</span>
          </p>

          <div className="mt-1 space-y-3 text-[15px] leading-relaxed text-work-ink">
            {children}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {tally.map((reaction) => {
              const owned = mine.includes(reaction.emoji);
              return (
                <button
                  key={reaction.emoji}
                  type="button"
                  onClick={() => toggle(reaction.emoji)}
                  aria-pressed={owned}
                  className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[12px] transition-colors duration-150 ease-pulp ${
                    owned
                      ? "border-work-blue bg-work-blue/10 text-work-blue"
                      : "border-work-line bg-white text-work-muted hover:border-work-muted/40"
                  }`}
                >
                  <span aria-hidden="true">{reaction.emoji}</span>
                  <span className="font-semibold">{reaction.count}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={addReaction}
              className="rounded-full border border-work-line bg-white p-1 text-work-muted opacity-0 transition-opacity duration-150 ease-pulp hover:text-work-ink focus-visible:opacity-100 group-hover:opacity-100"
              aria-label="Add reaction"
            >
              <SmilePlusIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {replies ? (
            <motion.button
              type="button"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="mt-2 flex items-center gap-1.5 rounded px-1.5 py-1 text-[13px] font-semibold text-work-blue hover:bg-work-blue/5"
            >
              <MessageSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {replies} {replies === 1 ? "reply" : "replies"}
            </motion.button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
