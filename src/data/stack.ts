import type { StackLayer } from '../types/portfolio';

export const stackLayers: StackLayer[] = [
{
  id: 'frontend',
  name: 'Pixels',
  discipline: 'Frontend',
  caption: 'Frontend architecture & UI engineering',
  share: 55,
  tools: [
  { name: 'React & Next.js', years: 7, note: 'Product UIs, SSR, app architecture' },
  { name: 'TypeScript', years: 6, note: 'Strict mode, everywhere' },
  { name: 'Tailwind & CSS', years: 8, note: 'Design systems, fluid layouts' },
  { name: 'Accessibility', years: 5, note: 'WCAG 2.2, screen-reader testing' },
  { name: 'Vitest & Playwright', years: 4, note: 'Unit, visual and e2e coverage' }]

},
{
  id: 'creative',
  name: 'Motion',
  discipline: 'Creative development',
  caption: 'Interaction, animation & real-time graphics',
  share: 30,
  tools: [
  { name: 'Framer Motion', years: 5, note: 'UI choreography, gestures' },
  { name: 'GSAP', years: 6, note: 'Scroll storytelling, timelines' },
  { name: 'Three.js / WebGL', years: 5, note: 'Scenes, particles, post-processing' },
  { name: 'GLSL', years: 4, note: 'Custom materials and shaders' },
  { name: 'Figma', years: 6, note: 'Prototyping motion before code' }]

},
{
  id: 'backend',
  name: 'Systems',
  discipline: 'Backend',
  caption: 'APIs, data & just enough infrastructure',
  share: 15,
  tools: [
  { name: 'Node.js', years: 6, note: 'REST and tRPC services' },
  { name: 'PostgreSQL', years: 5, note: 'Schema design, query tuning' },
  { name: 'Redis', years: 3, note: 'Caching, queues, rate limits' },
  { name: 'GraphQL', years: 3, note: 'Federated product APIs' },
  { name: 'Docker & AWS', years: 3, note: 'Containers, Lambda, CloudFront' }]

}];