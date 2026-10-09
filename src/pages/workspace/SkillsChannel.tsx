import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../components/workspace/Message';
import { AttachmentCard } from '../../components/workspace/AttachmentCard';
import { powerGroups } from '../../data/skills';
import type { SpotColor } from '../../types/portfolio';

const ACCENT: Record<SpotColor, string> = {
  red: '#e01e5a',
  yellow: '#ecb22e',
  blue: '#1264a3',
  teal: '#2eb67d'
};

export function SkillsChannel() {
  return (
    <>
      <Message time="1:40 pm" pinned reactions={[{ emoji: '📊', count: 10 }]}>
        <p>
          Self-rated, and deliberately not all 100s. The number is how confident I am shipping it unsupervised on a
          deadline.
        </p>
      </Message>

      {powerGroups.map((group, groupIndex) =>
      <Message
        key={group.id}
        time={`1:4${groupIndex + 2} pm`}
        reactions={[{ emoji: '👀', count: 4 + groupIndex }]}
        replies={groupIndex === 1 ? 3 : undefined}>
        
          <AttachmentCard accent={ACCENT[group.powers[0].color]} eyebrow="Skill group" title={group.label}>
            <ul className="space-y-3">
              {group.powers.map((power, index) =>
            <li key={power.id}>
                  <p className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-work-ink">{power.name}</span>
                    <span className="text-[12px] text-work-muted">{power.level}</span>
                  </p>
                  <span className="mt-1 block h-1.5 w-full rounded-full bg-work-line">
                    <motion.span
                  className="block h-full rounded-full"
                  style={{ backgroundColor: ACCENT[power.color] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${power.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }} />
                
                  </span>
                  <p className="mt-1 text-[13px] text-work-muted">{power.detail}</p>
                </li>
            )}
            </ul>
          </AttachmentCard>
        </Message>
      )}

      <Message
        author="Northwind Bot"
        badge="App"
        initials="NB"
        avatarColor="#2eb67d"
        time="1:48 pm"
        reactions={[{ emoji: '🧰', count: 6 }]}>
        
        <p className="text-work-muted">Also in the toolbox:</p>
        <p className="flex flex-wrap gap-1.5">
          {['GraphQL', 'Redis', 'Playwright', 'gRPC', 'AWS', 'Docker', 'Vitest', 'Figma', 'Sentry', 'Kubernetes'].map(
            (tool) =>
            <span
              key={tool}
              className="rounded border border-work-line bg-work-hover px-2 py-0.5 text-[13px] text-work-ink/80">
              
                {tool}
              </span>

          )}
        </p>
      </Message>
    </>);

}