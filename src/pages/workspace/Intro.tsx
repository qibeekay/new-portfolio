import React from "react";
import { Link } from "react-router-dom";
import { Message } from "../../components/workspace/Message";
import { AttachmentCard } from "../../components/workspace/AttachmentCard";
import { workspaceMeta } from "../../data/channels";

const facts = [
  { label: "Role", value: "Staff Software Engineer · Northwind Systems" },
  { label: "Based", value: "Ibadan· CET · remote-first for 5 years" },
  {
    label: "Depth",
    value: "Realtime systems, collaborative editing, performance",
  },
  { label: "Status", value: "Open to staff & lead roles" },
];

export function Intro() {
  return (
    <>
      <Message
        time="9:02 am"
        pinned
        reactions={[
          { emoji: "👋", count: 26 },
          { emoji: "🚀", count: 11 },
        ]}
        replies={4}
      >
        <p>
          Hi — I’m <span className="font-semibold">{workspaceMeta.person}</span>
          , a software engineer of Five years. I build realtime systems,
          collaborative editors, and interfaces that keep their composure when
          everything around them is on fire.
        </p>
        <AttachmentCard accent="#3f0e40" eyebrow="Profile" title="At a glance">
          <dl className="grid gap-2 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-work-muted">
                  {fact.label}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </AttachmentCard>
      </Message>

      <Message time="9:04 am" reactions={[{ emoji: "🧭", count: 7 }]}>
        <p>Where to go from here:</p>
        <ul className="space-y-1.5">
          {[
            {
              to: "/case-files",
              channel: "projects",
              note: "four builds, with what actually broke",
            },
            {
              to: "/powers",
              channel: "skills",
              note: "the stack, honestly rated",
            },
            {
              to: "/chronicles",
              channel: "experience",
              note: "Five years, four teams",
            },
            {
              to: "/signal",
              channel: "contact",
              note: "the fastest way to reach me",
            },
          ].map((item) => (
            <li
              key={item.channel}
              className="flex flex-wrap items-baseline gap-2"
            >
              <Link
                to={item.to}
                className="rounded bg-work-blue/10 px-1.5 py-0.5 font-semibold text-work-blue hover:bg-work-blue/20"
              >
                #{item.channel}
              </Link>
              <span className="text-work-muted">— {item.note}</span>
            </li>
          ))}
        </ul>
      </Message>

      <Message
        author="Northwind Bot"
        badge="App"
        initials="NB"
        avatarColor="#2eb67d"
        time="9:05 am"
        reactions={[{ emoji: "😄", count: 4 }]}
      >
        <p className="text-work-muted">
          Fun fact: this portfolio has two other lives. Try the theme switcher
          in the top right — one of them is a 1960s comic book.
        </p>
      </Message>
    </>
  );
}
