import React from "react";
import { motion } from "framer-motion";
import { Panel } from "../components/Panel";
import { CaptionBox } from "../components/CaptionBox";
import { SpeechBubble } from "../components/SpeechBubble";
import { IssueHeader } from "../components/IssueHeader";
import { IssueFooterNav } from "../components/IssueFooterNav";
import { issues } from "../data/issues";

const issue = issues[1];

const beats = [
  {
    id: "spark",
    caption: "PANEL ONE — A borrowed laptop, a modding forum, 2 A.M.",
    body: "It started with a game I wanted to change. Fourteen hours of trial and error later, the mod loaded — and I understood that software is just something someone decided.",
  },
  {
    id: "trial",
    caption: "PANEL TWO — The first paying client, and the first outage.",
    body: "A checkout page went down on a Saturday. I learned more in that afternoon of log-reading than in six months of tutorials: systems are only as good as what they tell you when they break.",
  },
  {
    id: "team",
    caption: "PANEL THREE — Learning that the hard part is people.",
    body: "At Kite & Co. I was the second engineer. Shipping alone is a sprint; shipping with a team is a craft. I started writing reviews that taught and docs people actually reread.",
  },
];

export function OriginStory() {
  return (
    <div>
      <IssueHeader issue={issue} />

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Panel color="yellow" className="p-6 sm:p-8">
          <CaptionBox className="mb-6 max-w-xl -rotate-1">
            Every engineer has an origin. Mine involves a modding forum and a
            great deal of stubbornness.
          </CaptionBox>

          <ol className="space-y-7">
            {beats.map((beat, index) => (
              <motion.li
                key={beat.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.26,
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="flex gap-4 border-l-[3px] border-ink pl-5"
              >
                <span
                  className="mt-1 hidden h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-pulp-red font-display text-lg text-paper-light sm:grid"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-caption text-[12px] uppercase tracking-[0.18em] text-ink-soft">
                    {beat.caption}
                  </h2>
                  <p className="mt-2 max-w-2xl font-body text-lg leading-relaxed">
                    {beat.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </Panel>

        <div className="flex flex-col gap-6">
          <SpeechBubble speaker="Anugo Mokwe" className="rotate-1">
            “I don’t want to be the smartest person on the team. I want to be
            the one who leaves the codebase easier for whoever’s on call next.”
          </SpeechBubble>

          <Panel color="blue" className="p-6" tilt={-0.6}>
            <h2 className="font-display text-3xl uppercase tracking-wide">
              Present day
            </h2>
            <p className="mt-2 font-body text-base leading-relaxed">
              Staff engineer at Northwind Systems. Based in Lisbon, working
              across timezones. Currently obsessed with streaming architectures,
              render budgets, and interfaces that stay honest under load.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: "Years shipping", value: "9" },
                { label: "Prod incidents survived", value: "63" },
                { label: "Engineers mentored", value: "17" },
                { label: "Coffee per deploy", value: "1.4" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-[3px] border-ink bg-paper px-3 py-2"
                >
                  <dt className="font-caption text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-2xl leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>

      <IssueFooterNav currentSlug={issue.slug} />
    </div>
  );
}
