import React from 'react';
import { motion } from 'framer-motion';

const beats = [
{
  kanji: '一',
  title: 'A borrowed laptop, 2 A.M.',
  body:
  'It began with a game I wanted to change. Fourteen hours of trial and error later the mod loaded, and I understood that software is only something someone decided.'
},
{
  kanji: '二',
  title: 'The first outage',
  body:
  'A checkout page fell on a Saturday. That afternoon of log-reading taught more than six months of tutorials: a system is only as good as what it tells you when it breaks.'
},
{
  kanji: '三',
  title: 'The hard part is people',
  body:
  'Second engineer at a young company. Shipping alone is a sprint; shipping with a team is a craft. I began writing reviews that teach and documents people reread.'
}];


export function Origin() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-edo text-[11px] tracking-[0.42em] text-edo-vermilion">起源 · ORIGIN</p>
      <h3 className="mt-3 max-w-lg font-edo text-3xl font-semibold leading-snug text-sumi">
        How one engineer learned to ship
      </h3>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {beats.map((beat, index) =>
        <motion.article
          key={beat.kanji}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.26, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
          className="flex h-full flex-col border-t-2 border-sumi/70 pt-4">
          
            <span className="font-edo-accent text-3xl text-edo-indigo">{beat.kanji}</span>
            <h4 className="mt-2 font-edo text-xl font-semibold text-sumi">{beat.title}</h4>
            <p className="mt-3 font-edo text-[15px] leading-loose text-sumi-soft">{beat.body}</p>
          </motion.article>
        )}
      </div>

      <blockquote className="mt-10 max-w-2xl border-l-2 border-edo-vermilion pl-5 font-edo text-lg italic leading-loose text-sumi">
        “I do not need to be the ablest hand on the team. I intend to be the one who leaves the work easier for whoever
        keeps watch next.”
        <footer className="mt-2 font-edo text-[11px] not-italic tracking-[0.24em] text-sumi-wash">— 利場</footer>
      </blockquote>
    </div>);

}