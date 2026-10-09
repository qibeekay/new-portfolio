/* ---------- Shared portfolio content (base design) ---------- */

export type ProjectCategory = 'creative' | 'functional' | 'systems';
export type ProjectStatus = 'completed' | 'ongoing' | 'ideating' | 'paused';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  year: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  description: string;
  role: string;
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface TerminalLine {
  text: string;
  tone: 'cmd' | 'ok' | 'muted' | 'plain';
}

export interface Chapter {
  id: string;
  label: string;
  title: string;
  body: string;
  stat: {value: string;label: string;};
}

export interface Role {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface Tool {
  name: string;
  years: number;
  note: string;
}

export interface StackLayer {
  id: string;
  name: string;
  discipline: string;
  caption: string;
  share: number;
  tools: Tool[];
}

export type ThoughtKind = 'idea' | 'problem' | 'log' | 'learning' | 'experiment';

export type ThoughtBlock =
{type: 'p';text: string;} |
{type: 'code';text: string;lang: string;} |
{type: 'quote';text: string;};

export interface Thought {
  id: string;
  kind: ThoughtKind;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tags: string[];
  pinned?: boolean;
  body: ThoughtBlock[];
}

/* ---------- Themed-world helpers (comic, edo, workspace) ---------- */

export type SpotColor = 'red' | 'yellow' | 'blue' | 'teal';

export interface Issue {
  number: string;
  slug: string;
  title: string;
  tagline: string;
  path: string;
  color: SpotColor;
}

export interface Power {
  id: string;
  name: string;
  level: number;
  detail: string;
  color: SpotColor;
}

export interface PowerGroup {
  id: string;
  label: string;
  powers: Power[];
}