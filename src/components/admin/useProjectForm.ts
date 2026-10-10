import { useMemo, useState } from 'react';
import type { Project, ProjectCategory, ProjectStatus } from '../../types/portfolio';
import { slugify } from '../../utils/projectMeta';

export interface ProjectDraft {
  title: string;
  tagline: string;
  year: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  description: string;
  role: string;
  stack: string[];
  metrics: {value: string;label: string;}[];
  image: string;
  imageAlt: string;
  liveUrl: string;
  codeUrl: string;
}

export type DraftField = keyof ProjectDraft;
export type DraftErrors = Partial<Record<DraftField, string>>;

const emptyMetrics = () => Array.from({ length: 3 }, () => ({ value: '', label: '' }));

function toDraft(project: Project | null): ProjectDraft {
  if (!project) {
    return {
      title: '',
      tagline: '',
      year: String(new Date().getFullYear()),
      category: 'creative',
      status: 'ideating',
      featured: false,
      description: '',
      role: '',
      stack: [],
      metrics: emptyMetrics(),
      image: '',
      imageAlt: '',
      liveUrl: '',
      codeUrl: ''
    };
  }
  return {
    title: project.title,
    tagline: project.tagline,
    year: project.year,
    category: project.category,
    status: project.status,
    featured: !!project.featured,
    description: project.description,
    role: project.role,
    stack: [...project.stack],
    metrics: [...project.metrics, ...emptyMetrics()].slice(0, 3),
    image: project.image ?? '',
    imageAlt: project.imageAlt ?? '',
    liveUrl: project.liveUrl ?? '',
    codeUrl: project.codeUrl ?? ''
  };
}

function toProject(d: ProjectDraft, id: string): Project {
  return {
    id,
    title: d.title.trim(),
    tagline: d.tagline.trim(),
    year: d.year.trim(),
    category: d.category,
    status: d.status,
    featured: d.featured,
    description: d.description.trim(),
    role: d.role.trim(),
    stack: d.stack,
    metrics: d.metrics.
    filter((m) => m.value.trim() && m.label.trim()).
    map((m) => ({ value: m.value.trim(), label: m.label.trim() })),
    image: d.image.trim() || undefined,
    imageAlt: d.imageAlt.trim() || undefined,
    liveUrl: d.liveUrl.trim() || undefined,
    codeUrl: d.codeUrl.trim() || undefined
  };
}

function isUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validate(d: ProjectDraft): DraftErrors {
  const errors: DraftErrors = {};
  if (!d.title.trim()) errors.title = 'Give the project a name.';
  if (!d.tagline.trim()) errors.tagline = 'A one-line summary is required.';
  if (!/^\d{4}$/.test(d.year.trim())) errors.year = 'Use a four-digit year.';
  if (d.description.trim().length < 20) errors.description = 'Write at least a couple of sentences.';
  (['image', 'liveUrl', 'codeUrl'] as const).forEach((field) => {
    if (d[field].trim() && !isUrl(d[field].trim())) errors[field] = 'Must be a full URL, starting with https://';
  });
  return errors;
}

export function useProjectForm(project: Project | null, onSave: (project: Project) => void) {
  const initial = useMemo(() => toDraft(project), [project]);
  const [draft, setDraft] = useState<ProjectDraft>(initial);
  const [errors, setErrors] = useState<DraftErrors>({});
  const dirty = JSON.stringify(draft) !== JSON.stringify(initial);

  const set = <K extends DraftField,>(key: K, value: ProjectDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => e[key] ? { ...e, [key]: undefined } : e);
  };

  const setMetric = (index: number, field: 'value' | 'label', value: string) => {
    setDraft((d) => ({ ...d, metrics: d.metrics.map((m, i) => i === index ? { ...m, [field]: value } : m) }));
  };

  const submit = (): Project | null => {
    const next = validate(draft);
    setErrors(next);
    if (Object.keys(next).length > 0) return null;
    const id = project?.id ?? `${slugify(draft.title)}-${Date.now().toString(36)}`;
    const saved = toProject(draft, id);
    onSave(saved);
    setDraft(toDraft(saved));
    return saved;
  };

  const reset = () => {
    setDraft(initial);
    setErrors({});
  };

  const preview = useMemo(
    () =>
    toProject(
      {
        ...draft,
        title: draft.title || 'Untitled project',
        tagline: draft.tagline || 'Your one-line summary appears here'
      },
      project?.id ?? 'preview'
    ),
    [draft, project]
  );

  return { draft, errors, dirty, set, setMetric, submit, reset, preview };
}