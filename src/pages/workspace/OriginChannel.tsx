import React from 'react';
import { Message } from '../../components/workspace/Message';
import { AttachmentCard } from '../../components/workspace/AttachmentCard';

const beats = [
{
  time: '10:12 am',
  title: 'A borrowed laptop, 2 a.m.',
  body:
  'It started with a game I wanted to change. Fourteen hours of trial and error later the mod loaded — and I understood that software is just something someone decided.',
  reactions: [{ emoji: '🎮', count: 9 }]
},
{
  time: '10:18 am',
  title: 'The first outage',
  body:
  'A checkout page went down on a Saturday. I learned more in that afternoon of log-reading than in six months of tutorials: a system is only as good as what it tells you when it breaks.',
  reactions: [{ emoji: '🔥', count: 14 }],
  replies: 6
},
{
  time: '10:26 am',
  title: 'The hard part is people',
  body:
  'Second engineer at Kite & Co. Shipping alone is a sprint; shipping with a team is a craft. I started writing reviews that teach and docs people actually reread.',
  reactions: [{ emoji: '🙌', count: 12 }]
}];


export function OriginChannel() {
  return (
    <>
      <Message time="10:10 am" pinned reactions={[{ emoji: '📖', count: 8 }]}>
        <p>Every engineer has an origin. Mine involves a modding forum and a great deal of stubbornness.</p>
      </Message>

      {beats.map((beat) =>
      <Message key={beat.title} time={beat.time} reactions={beat.reactions} replies={beat.replies}>
          <AttachmentCard accent="#ecb22e" title={beat.title}>
            <p>{beat.body}</p>
          </AttachmentCard>
        </Message>
      )}

      <Message time="10:31 am" reactions={[{ emoji: '💬', count: 5 }]}>
        <p className="border-l-4 border-work-line pl-3 italic text-work-ink/90">
          “I don’t want to be the smartest person on the team. I want to be the one who leaves the codebase easier for
          whoever’s on call next.”
        </p>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
          { label: 'Years shipping', value: '9' },
          { label: 'Incidents survived', value: '63' },
          { label: 'Engineers mentored', value: '17' },
          { label: 'Coffee per deploy', value: '1.4' }].
          map((stat) =>
          <div key={stat.label} className="rounded-md border border-work-line px-3 py-2">
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-work-muted">{stat.label}</dt>
              <dd className="text-[19px] font-bold text-work-ink">{stat.value}</dd>
            </div>
          )}
        </dl>
      </Message>
    </>);

}