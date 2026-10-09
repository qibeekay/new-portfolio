import type { ThoughtKind } from '../types/portfolio';

export const THOUGHT_KINDS: {id: ThoughtKind;label: string;}[] = [
{ id: 'log', label: 'Build log' },
{ id: 'problem', label: 'Problem' },
{ id: 'idea', label: 'Idea' },
{ id: 'learning', label: 'Learning' },
{ id: 'experiment', label: 'Experiment' }];


export function thoughtKindLabel(id: ThoughtKind) {
  return THOUGHT_KINDS.find((k) => k.id === id)?.label ?? id;
}