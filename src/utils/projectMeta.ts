import type { Project, ProjectCategory, ProjectStatus, TerminalLine } from '../types/portfolio';

export const CATEGORIES: {id: ProjectCategory;label: string;blurb: string;}[] = [
{ id: 'creative', label: 'Creative', blurb: 'Motion, WebGL and generative work — made to be felt.' },
{ id: 'functional', label: 'Functional', blurb: 'Products and tools people open every single day.' },
{ id: 'systems', label: 'Systems', blurb: 'APIs, infrastructure and the quiet machinery underneath.' }];


export const STATUSES: {id: ProjectStatus;label: string;}[] = [
{ id: 'completed', label: 'Completed' },
{ id: 'ongoing', label: 'Ongoing' },
{ id: 'ideating', label: 'Ideating' },
{ id: 'paused', label: 'Paused' }];


export function categoryLabel(id: ProjectCategory) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function statusLabel(id: ProjectStatus) {
  return STATUSES.find((s) => s.id === id)?.label ?? id;
}

export function slugify(text: string) {
  return (
    text.
    toLowerCase().
    replace(/[^a-z0-9]+/g, '-').
    replace(/(^-|-$)/g, '') || 'project');

}

export function terminalLinesFor(project: Project): TerminalLine[] {
  const lines: TerminalLine[] = [
  { text: `$ ${slugify(project.title)} status --verbose`, tone: 'cmd' },
  { text: `→ ${statusLabel(project.status).toLowerCase()} · since ${project.year}`, tone: 'ok' }];

  project.metrics.slice(0, 3).forEach((m) => {
    lines.push({ text: `${`${m.label.toLowerCase()} `.padEnd(24, '.')} ${m.value}`, tone: 'muted' });
  });
  return lines;
}