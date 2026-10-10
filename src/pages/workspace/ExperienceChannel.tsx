import React from "react";
import { Message } from "../../components/workspace/Message";
import { AttachmentCard } from "../../components/workspace/AttachmentCard";
import { experience } from "../../data/experience";
import { roleSpot } from "../../utils/themeColors";
import type { SpotColor } from "../../types/portfolio";

const ACCENT: Record<SpotColor, string> = {
  red: "#e01e5a",
  yellow: "#ecb22e",
  blue: "#1264a3",
  teal: "#2eb67d",
};

const TIMES = [
  "3:05 pm",
  "3:11 pm",
  "3:20 pm",
  "3:28 pm",
  "3:34 pm",
  "3:41 pm",
];

export function ExperienceChannel() {
  return (
    <>
      <Message time="3:02 pm" pinned reactions={[{ emoji: "🗂️", count: 6 }]}>
        <p>
          Five years, {experience.length} teams, newest first. Each post lists
          what actually changed while I was there.
        </p>
      </Message>

      {experience.map((role, index) => (
        <div key={role.id}>
          <p className="relative px-4 py-3 text-center sm:px-6">
            <span
              className="absolute left-4 right-4 top-1/2 h-px bg-work-line sm:left-6 sm:right-6"
              aria-hidden="true"
            />
            <span className="relative rounded-full border border-work-line bg-white px-3 py-1 text-[12px] font-bold text-work-muted">
              {role.period}
            </span>
          </p>

          <Message
            time={TIMES[index % TIMES.length]}
            reactions={[{ emoji: "👏", count: Math.max(3, 12 - index * 2) }]}
            replies={index === 0 ? 4 : undefined}
          >
            <AttachmentCard
              accent={ACCENT[roleSpot(index)]}
              eyebrow={`${role.company} · ${role.location}`}
              title={role.title}
            >
              <p>{role.summary}</p>
              <ul className="space-y-1">
                {role.highlights.map((win) => (
                  <li key={win} className="flex gap-2">
                    <span className="text-work-green" aria-hidden="true">
                      ✓
                    </span>
                    {win}
                  </li>
                ))}
              </ul>
              <p className="text-[12px] text-work-muted">
                {role.stack.join(" · ")}
              </p>
            </AttachmentCard>
          </Message>
        </div>
      ))}
    </>
  );
}
