import React, { useState } from 'react';
import { toast } from 'sonner';
import { StarIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { useProjectForm } from './useProjectForm';
import { FormField, inputClass } from './FormField';
import { SegmentedControl } from './SegmentedControl';
import { TagInput } from './TagInput';
import { ProjectGridCard } from '../work/ProjectGridCard';
import { CATEGORIES, STATUSES, categoryLabel, statusLabel } from '../../utils/projectMeta';
import { useUploadImageMutation } from '../../hooks/useProjectsQuery';

interface ProjectFormProps {
  project: Project | null;
  onSave: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectForm({ project, onSave, onDelete }: ProjectFormProps) {
  const { draft, errors, dirty, set, setMetric, submit, reset, preview } = useProjectForm(project, onSave);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const uploadMutation = useUploadImageMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be under 5MB');
      return;
    }

    try {
      toast.loading('Uploading image to Cloudinary…', { id: 'img-upload' });
      const url = await uploadMutation.mutateAsync(file);
      set('image', url);
      toast.success('Image uploaded successfully!', { id: 'img-upload' });
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to upload image';
      toast.error(msg, { id: 'img-upload' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = submit();
    if (saved) {
      toast.success(project ? 'Changes saved' : 'Project published', {
        description: `${saved.title} is now in the ${categoryLabel(saved.category)} section.`
      });
    } else {
      toast.error('A few fields need attention');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-paper/10 pb-6">
        <div>
          <p className="font-mono text-xs text-paper/45">{project ? 'Editing project' : 'New project'}</p>
          <h1 className="mt-1 font-display text-4xl leading-none md:text-5xl">
            {project ? project.title : 'Add something new'}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {dirty &&
          <span className="mr-2 flex items-center gap-2 text-xs text-paper/55">
              <span className="size-1.5 rounded-full bg-accent" /> Unsaved changes
            </span>
          }
          {project && (
          confirmDelete ?
          <>
                <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-full px-4 py-2.5 text-sm text-paper/60 transition-colors duration-150 hover:text-paper">
              
                  Keep it
                </button>
                <button
              type="button"
              onClick={() => onDelete(project.id)}
              className="rounded-full border border-accent px-4 py-2.5 text-sm text-accent transition-colors duration-150 hover:bg-accent hover:text-ink">
              
                  Delete permanently
                </button>
              </> :

          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            aria-label="Delete project"
            className="grid size-10 place-items-center rounded-full border border-paper/15 text-paper/60 transition-colors duration-150 hover:border-accent hover:text-accent">
            
                <Trash2Icon className="size-4" />
              </button>)
          }
          {dirty &&
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-paper/15 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-paper/10">
            
              Discard
            </button>
          }
          <button
            type="submit"
            disabled={!!project && !dirty}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            
            {project ? 'Save changes' : 'Publish project'}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-12">
          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-5 font-display text-2xl">Basics</legend>
            <FormField label="Title" htmlFor="f-title" error={errors.title}>
              <input id="f-title" value={draft.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Tidepool" className={inputClass(!!errors.title)} />
            </FormField>
            <FormField label="Year" htmlFor="f-year" error={errors.year}>
              <input id="f-year" inputMode="numeric" value={draft.year} onChange={(e) => set('year', e.target.value)} className={inputClass(!!errors.year)} />
            </FormField>
            <FormField label="Tagline" htmlFor="f-tagline" error={errors.tagline} hint="One line, shown in the index and on cards." className="sm:col-span-2">
              <input id="f-tagline" value={draft.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="What it is, in a sentence" className={inputClass(!!errors.tagline)} />
            </FormField>
            <FormField label="Category" className="sm:col-span-2">
              <SegmentedControl label="Category" options={CATEGORIES} value={draft.category} onChange={(v) => set('category', v)} />
            </FormField>
            <FormField label="Status" className="sm:col-span-2">
              <SegmentedControl label="Status" options={STATUSES} value={draft.status} onChange={(v) => set('status', v)} />
            </FormField>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-paper/10 p-4 sm:col-span-2">
              <div>
                <p className="flex items-center gap-2 text-sm">
                  <StarIcon className="size-4 text-accent" /> Spotlight this project
                </p>
                <p className="mt-1 text-xs text-paper/45">The first two spotlighted projects appear large above the index.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={draft.featured}
                aria-label="Spotlight this project"
                onClick={() => set('featured', !draft.featured)}
                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  draft.featured ? 'bg-accent' : 'bg-paper/15'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0.5 top-0.5 size-5 rounded-full bg-paper shadow-sm transition-transform duration-200 ease-in-out ${
                    draft.featured ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </fieldset>

          <fieldset className="grid gap-5">
            <legend className="mb-5 font-display text-2xl">Story</legend>
            <FormField label="Description" htmlFor="f-description" error={errors.description} hint={`${draft.description.length} characters`}>
              <textarea id="f-description" rows={6} value={draft.description} onChange={(e) => set('description', e.target.value)} placeholder="The problem, what you built and what happened." className={`${inputClass(!!errors.description)} resize-y`} />
            </FormField>
            <FormField label="Your role" htmlFor="f-role">
              <input id="f-role" value={draft.role} onChange={(e) => set('role', e.target.value)} placeholder="e.g. Creative development, API design" className={inputClass()} />
            </FormField>
          </fieldset>

          <fieldset className="grid gap-5">
            <legend className="mb-5 font-display text-2xl">Details</legend>
            <FormField label="Built with" htmlFor="f-stack" hint="Press Enter or comma to add.">
              <TagInput id="f-stack" value={draft.stack} onChange={(v) => set('stack', v)} placeholder="React, Three.js, Postgres…" />
            </FormField>
            <FormField label="Key results" hint="Up to three. Leave rows empty to skip them.">
              <div className="space-y-2">
                {draft.metrics.map((m, i) =>
                <div key={i} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-2">
                    <input aria-label={`Result ${i + 1} value`} value={m.value} onChange={(e) => setMetric(i, 'value', e.target.value)} placeholder="+34%" className={inputClass()} />
                    <input aria-label={`Result ${i + 1} label`} value={m.label} onChange={(e) => setMetric(i, 'label', e.target.value)} placeholder="Conversion lift" className={inputClass()} />
                  </div>
                )}
              </div>
            </FormField>
          </fieldset>

          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="mb-5 font-display text-2xl">Media & links</legend>
            <FormField label="Cover image URL" htmlFor="f-image" error={errors.image} hint="Enter a URL or upload an image directly to Cloudinary." className="sm:col-span-2">
              <div className="flex gap-2">
                <input id="f-image" value={draft.image} onChange={(e) => set('image', e.target.value)} placeholder="https://…" className={`${inputClass(!!errors.image)} flex-1`} />
                <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-paper/15 px-3.5 py-2 text-xs font-medium text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper">
                  <UploadIcon className="size-3.5" />
                  {uploadMutation.isPending ? 'Uploading…' : 'Upload'}
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={handleFileUpload} disabled={uploadMutation.isPending} />
                </label>
              </div>
            </FormField>
            <FormField label="Image description" htmlFor="f-alt" hint="For screen readers." className="sm:col-span-2">
              <input id="f-alt" value={draft.imageAlt} onChange={(e) => set('imageAlt', e.target.value)} className={inputClass()} />
            </FormField>
            <FormField label="Live URL" htmlFor="f-live" error={errors.liveUrl}>
              <input id="f-live" value={draft.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://…" className={inputClass(!!errors.liveUrl)} />
            </FormField>
            <FormField label="Source URL" htmlFor="f-code" error={errors.codeUrl}>
              <input id="f-code" value={draft.codeUrl} onChange={(e) => set('codeUrl', e.target.value)} placeholder="https://github.com/…" className={inputClass(!!errors.codeUrl)} />
            </FormField>
          </fieldset>
        </div>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          <p className="font-mono text-xs text-paper/45">Live preview</p>
          <ul className="mt-3">
            <ProjectGridCard project={preview} onOpen={() => toast('This is a preview of the card.')} />
          </ul>
          <p className="mt-4 text-sm text-paper/55">
            Appears under <span className="text-paper">{categoryLabel(draft.category)}</span> as{' '}
            <span className="text-paper">{statusLabel(draft.status).toLowerCase()}</span>
            {draft.featured ? ', and in the spotlight.' : '.'}
          </p>
        </aside>
      </div>
    </form>);

}