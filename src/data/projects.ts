import type { Project } from '../types/portfolio';

export const projects: Project[] = [
{
  id: 'lumen',
  title: 'Lumen',
  tagline: 'A generative, audio-reactive visualiser for live sets',
  year: '2026',
  category: 'creative',
  status: 'completed',
  featured: true,
  image: "/56475c9e-fe69-4098-b9f3-ff38ab4fc43b.jpg",
  imageAlt: 'Glowing particle ribbons flowing across a black canvas',
  description:
  'Lumen turns a DJ’s live audio feed into flowing particle choreography. A GPU simulation reacts to frequency bands in real time, while a tiny control surface lets VJs steer palettes and turbulence mid-set without touching code.',
  role: 'Concept, creative development and shader authoring',
  stack: ['Three.js', 'GLSL', 'Web Audio API', 'React', 'Zustand'],
  metrics: [
  { value: '120fps', label: 'On M-series GPUs' },
  { value: '1.2M', label: 'Particles per frame' },
  { value: 'SOTD', label: 'Awwwards, March 2026' }],

  liveUrl: 'https://example.com',
  codeUrl: 'https://github.com'
},
{
  id: 'tidepool',
  title: 'Tidepool',
  tagline: 'A fluid-simulation playground for distorting type',
  year: '2026',
  category: 'creative',
  status: 'ongoing',
  image: "/8251829f-3653-4d11-9977-f9fe959e14d9.jpg",
  imageAlt: 'Serif letters being smeared by swirling ink',
  description:
  'Drag through letterforms and watch them bleed like ink in water. Tidepool runs a stable-fluids solver on the GPU and samples any Google Font as its starting dye — exports go straight to MP4 or PNG sequences.',
  role: 'Solo project — simulation, UI and export pipeline',
  stack: ['WebGL2', 'GLSL', 'TypeScript', 'WebCodecs'],
  metrics: [
  { value: '60fps', label: '2K simulation grid' },
  { value: '1,400+', label: 'Fonts supported' },
  { value: 'Beta', label: 'Public launch Q1 2027' }]

},
{
  id: 'orbit',
  title: 'Orbit',
  tagline: '3D sneaker configurator with real-time materials',
  year: '2024',
  category: 'creative',
  status: 'completed',
  image: "/7d9a9165-3acf-480e-8d3f-4db071bd20e5.jpg",
  imageAlt: 'A sneaker floating in a dark studio beside material swatches',
  description:
  'A configurator that lets shoppers swap leather, mesh and suede in real time. Compressed PBR textures and a hand-tuned lighting rig keep the whole scene under 2.1MB while still feeling tactile.',
  role: 'Creative development and performance budget',
  stack: ['Three.js', 'React', 'Draco', 'KTX2', 'Shopify'],
  metrics: [
  { value: '+34%', label: 'Conversion lift' },
  { value: '2.1MB', label: 'Total scene weight' },
  { value: '0.9s', label: 'Time to interactive' }],

  liveUrl: 'https://example.com'
},
{
  id: 'murmur',
  title: 'Murmur',
  tagline: 'Starling murmurations shaped by your voice',
  year: '2026',
  category: 'creative',
  status: 'ideating',
  description:
  'A gallery piece in early sketches: a flock of ten thousand boids that tighten, scatter and swirl based on the pitch and volume of whoever is speaking into the room.',
  role: 'Concept and prototyping',
  stack: ['WebGPU', 'Web Audio API', 'TouchDesigner'],
  metrics: []
},
{
  id: 'atlas',
  title: 'Atlas',
  tagline: 'Realtime multiplayer whiteboard for product teams',
  year: '2025',
  category: 'functional',
  status: 'completed',
  featured: true,
  image: "/82775392-81e2-409b-86ad-1b6f1831f0b8.jpg",
  imageAlt: 'Dark whiteboard with sticky notes, flow diagrams and multiplayer cursors',
  description:
  'An infinite canvas where product teams map flows together. I built the canvas renderer, presence layer and the CRDT sync service — so 200 people can edit one board without a single conflict dialog.',
  role: 'Lead engineer across canvas, presence and sync service',
  stack: ['React', 'TypeScript', 'Yjs', 'WebSockets', 'Node.js'],
  metrics: [
  { value: '<50ms', label: 'Median sync latency' },
  { value: '200', label: 'Concurrent cursors' },
  { value: '18k', label: 'Weekly active users' }],

  liveUrl: 'https://example.com'
},
{
  id: 'fernweh',
  title: 'Fernweh',
  tagline: 'Offline-first travel journal with map timelines',
  year: '2026',
  category: 'functional',
  status: 'ongoing',
  image: "/c5e90f91-6fbe-4d3d-8d5f-d609675a53ff.jpg",
  imageAlt: 'Travel journal app with a dark map route and timeline of entries',
  description:
  'Write on a mountain with no signal; it syncs when you land. Fernweh stores everything locally first, then reconciles through a tiny sync server — and turns your trip into an animated route you can scrub through.',
  role: 'Product design, frontend and sync layer',
  stack: ['React', 'IndexedDB', 'MapLibre', 'Hono', 'SQLite'],
  metrics: [
  { value: '100%', label: 'Usable offline' },
  { value: '640', label: 'Beta testers' },
  { value: '4.8★', label: 'TestFlight rating' }]

},
{
  id: 'pulse',
  title: 'Pulse',
  tagline: 'Analytics dashboard for indie SaaS founders',
  year: '2023',
  category: 'functional',
  status: 'completed',
  image: "/84e1e8f9-bda9-47f2-999f-fee5bd301402.jpg",
  imageAlt: 'Dark analytics dashboard with a revenue line chart and KPIs',
  description:
  'Revenue, churn and signups in one calm screen. I wrote a 9kB charting core so the dashboard loads instantly on any connection, and an onboarding that connects Stripe in under a minute.',
  role: 'Product design and frontend engineering',
  stack: ['React', 'TypeScript', 'D3', 'Tailwind', 'Stripe API'],
  metrics: [
  { value: '9kB', label: 'Charting core' },
  { value: '4.9★', label: 'Product Hunt rating' },
  { value: '3k', label: 'Teams onboarded' }],

  liveUrl: 'https://example.com',
  codeUrl: 'https://github.com'
},
{
  id: 'quill',
  title: 'Quill',
  tagline: 'A distraction-free markdown editor with focus modes',
  year: '2025',
  category: 'functional',
  status: 'paused',
  description:
  'A writing app that dims everything but the sentence you are on. Paused while I rethink sync — the editor core is solid, but I want it to work across devices without an account.',
  role: 'Solo project — design and engineering',
  stack: ['Tauri', 'ProseMirror', 'TypeScript'],
  metrics: [{ value: '38kB', label: 'Editor bundle' }],
  codeUrl: 'https://github.com'
},
{
  id: 'ledger',
  title: 'Ledger API',
  tagline: 'Double-entry payments ledger with idempotent transfers',
  year: '2024',
  category: 'systems',
  status: 'completed',
  description:
  'A small, boring-on-purpose service that keeps money correct. Every transfer is idempotent and written as balanced double-entry rows, with Redis guarding hot accounts and Postgres doing what it does best.',
  role: 'API design, data modelling and load testing',
  stack: ['Node.js', 'PostgreSQL', 'Redis', 'Docker', 'k6'],
  metrics: [
  { value: '42ms', label: 'p99 latency' },
  { value: '12.4k', label: 'Requests / second' },
  { value: '0', label: 'Balance drift incidents' }],

  codeUrl: 'https://github.com'
},
{
  id: 'kiln',
  title: 'Kiln',
  tagline: 'Design-token compiler for web, iOS and Android',
  year: '2025',
  category: 'systems',
  status: 'completed',
  description:
  'One tokens file in, platform-native themes out: CSS variables, Swift enums and Compose objects. Kiln powers the motion and colour system at Northwind and is open source.',
  role: 'Author and maintainer',
  stack: ['TypeScript', 'Node.js', 'Style Dictionary', 'GitHub Actions'],
  metrics: [
  { value: '2.3k', label: 'GitHub stars' },
  { value: '3', label: 'Platforms emitted' },
  { value: '40ms', label: 'Full rebuild' }],

  codeUrl: 'https://github.com'
},
{
  id: 'relay',
  title: 'Relay',
  tagline: 'Edge webhook relay with replay and retries',
  year: '2026',
  category: 'systems',
  status: 'ongoing',
  description:
  'Receive webhooks at the edge, store them durably, and fan them out to local or staging environments with one-click replay. Built because I was tired of re-triggering Stripe events by hand.',
  role: 'Solo project — architecture and implementation',
  stack: ['Cloudflare Workers', 'Durable Objects', 'Hono', 'D1'],
  metrics: [
  { value: '18ms', label: 'Median ingest' },
  { value: '7 days', label: 'Replay window' }]

},
{
  id: 'sundial',
  title: 'Sundial',
  tagline: 'Cron as a service, scheduled in plain English',
  year: '2026',
  category: 'systems',
  status: 'ideating',
  description:
  '“Every weekday at 9 in Lisbon, except holidays.” Sundial would parse schedules written like that, show the next ten runs before you save, and alert when a job silently stops.',
  role: 'Concept and API design',
  stack: ['Go', 'PostgreSQL'],
  metrics: []
}];