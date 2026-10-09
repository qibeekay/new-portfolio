import type { Thought } from '../types/portfolio';

export const currently = {
  learning: 'WGSL compute shaders & Rust',
  reading: 'Designing Data-Intensive Applications, 2nd ed.',
  building: 'Tidepool — a fluid type playground'
};

export const thoughts: Thought[] = [
{
  id: 'lumen-webgpu',
  kind: 'log',
  title: 'Rebuilding Lumen’s particle sim on WebGPU',
  excerpt: 'Moving 1.2M particles from fragment-shader ping-pong to compute shaders — what got faster, and what got weird.',
  date: '2026-09-28',
  readMinutes: 6,
  tags: ['WebGPU', 'WGSL', 'Lumen'],
  pinned: true,
  body: [
  { type: 'p', text: 'Lumen has run on a WebGL ping-pong setup since day one: two float textures, a fragment shader that reads one and writes the other, swap, repeat. It works, but every particle update pays for a full-screen quad and a texture fetch it does not really need.' },
  { type: 'p', text: 'Compute shaders let me treat particles as what they are — a buffer of structs. The first naive port was already 1.8× faster on my M2, mostly because I stopped round-tripping through RGBA32F.' },
  { type: 'code', lang: 'wgsl', text: '@compute @workgroup_size(256)\nfn step(@builtin(global_invocation_id) id: vec3u) {\n  let i = id.x;\n  var p = particles[i];\n  p.vel += curl(p.pos * 0.8, uniforms.time) * uniforms.dt;\n  p.pos += p.vel * uniforms.dt;\n  particles[i] = p;\n}' },
  { type: 'p', text: 'The weird part: Safari Technology Preview clamps workgroup storage differently, so the shared-memory neighbour search I was proud of silently returned zeros. Next entry will be about building a fallback path without duplicating every shader.' }]

},
{
  id: 'safari-stutter',
  kind: 'problem',
  title: 'Why does my scroll animation stutter only on Safari?',
  excerpt: 'A transform-only animation that janks on one engine. Notes from an evening with the Web Inspector timeline.',
  date: '2026-09-12',
  readMinutes: 4,
  tags: ['Performance', 'Safari', 'CSS'],
  body: [
  { type: 'p', text: 'The hero on a client site scaled down on scroll — transform and opacity only, by the book. Chrome: buttery. Safari: a visible hitch every few frames.' },
  { type: 'p', text: 'The culprit was a backdrop-filter on a sibling header. Every scale change invalidated the blur region underneath, forcing a repaint of the filtered layer.' },
  { type: 'quote', text: 'Compositor-friendly properties are only cheap if nothing nearby makes them expensive.' },
  { type: 'p', text: 'Fix: swap the live blur for a solid translucent fill while scrolling, and restore it once the user stops. Nobody notices the blur is gone mid-scroll; everybody notices jank.' }]

},
{
  id: 'interfaces-with-weight',
  kind: 'idea',
  title: 'Interfaces with weight: a case for physics in UI',
  excerpt: 'Duration-based easing describes time. Springs describe objects. I think users can feel the difference.',
  date: '2026-08-30',
  readMinutes: 5,
  tags: ['Motion', 'Design'],
  body: [
  { type: 'p', text: 'A 250ms ease-out is a promise about time. A spring is a promise about mass, tension and friction — and it stays honest when the user interrupts it mid-flight.' },
  { type: 'p', text: 'That interruptibility is the whole point. Drag a sheet halfway, let go, grab it again: a spring picks up the current velocity; a keyframe animation snaps back to its script.' },
  { type: 'p', text: 'I am sketching a tiny motion vocabulary — three springs (snappy, settled, heavy) — and wondering if a whole product could get away with only those.' }]

},
{
  id: 'advisory-locks',
  kind: 'learning',
  title: 'TIL: Postgres advisory locks are the queue you already have',
  excerpt: 'Before reaching for Redis or SQS, it is worth knowing pg_try_advisory_lock exists.',
  date: '2026-08-14',
  readMinutes: 3,
  tags: ['PostgreSQL', 'Backend'],
  body: [
  { type: 'p', text: 'For a low-volume job runner I needed exactly-once processing across three workers. Advisory locks gave me that without a new piece of infrastructure.' },
  { type: 'code', lang: 'sql', text: 'SELECT id FROM jobs\nWHERE status = \'pending\'\n  AND pg_try_advisory_xact_lock(id)\nORDER BY created_at\nLIMIT 1;' },
  { type: 'p', text: 'The lock releases when the transaction ends, so a crashed worker never leaves a job stuck. Not a replacement for a real queue at scale — but a great first one.' }]

},
{
  id: 'springy-input',
  kind: 'experiment',
  title: 'Typing with springs — a text field that wobbles back',
  excerpt: 'Each character lands with a tiny spring. Delightful for ten seconds, exhausting after a minute. Why?',
  date: '2026-07-22',
  readMinutes: 2,
  tags: ['Motion', 'Prototype'],
  body: [
  { type: 'p', text: 'I gave every new character a 4px drop with a soft spring. It felt magical on the first word and tiring by the fifth sentence.' },
  { type: 'p', text: 'Lesson re-learned: frequency decides whether motion should exist. Things you do hundreds of times a day should be instant.' }]

},
{
  id: 'idempotency-keys',
  kind: 'problem',
  title: 'Idempotency keys: where do they actually live?',
  excerpt: 'Client-generated, server-stored, expiring when? Working through the edge cases from the Ledger API.',
  date: '2026-06-30',
  readMinutes: 7,
  tags: ['API design', 'Ledger'],
  body: [
  { type: 'p', text: 'Everyone agrees retries should be safe. Fewer people agree on what “the same request” means when the body changes but the key does not.' },
  { type: 'p', text: 'Ledger stores a hash of the request body next to each key. Same key plus a different body returns a 422 rather than quietly replaying the old response.' },
  { type: 'p', text: 'Still open: how long to keep keys. Twenty-four hours covers mobile retries; it does not cover a batch job replaying last week’s file.' }]

},
{
  id: 'rust-for-ts',
  kind: 'learning',
  title: 'Notes from learning Rust as a TypeScript person',
  excerpt: 'The borrow checker is less a wall and more a very strict pair-programmer. Week four notes.',
  date: '2026-06-02',
  readMinutes: 8,
  tags: ['Rust', 'Learning'],
  body: [
  { type: 'p', text: 'Discriminated unions in TypeScript prepared me for Rust enums better than any tutorial. Pattern matching feels like the switch statement I always wanted.' },
  { type: 'p', text: 'Ownership clicked when I stopped thinking about memory and started thinking about who is allowed to change this value right now.' }]

}];