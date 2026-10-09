import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon, CheckIcon, CopyIcon, LoaderCircleIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { SplitReveal } from './text/SplitReveal';
import { EASE_OUT } from '../utils/motion';

type Status = 'idle' | 'sending' | 'sent';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TOPICS = ['Frontend build', 'Creative / WebGL', 'Full-stack product', 'Something else'];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {

      /* clipboard unavailable — still show the address */}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = 'Let me know who you are.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'That email doesn’t look quite right.';
    if (values.message.trim().length < 10) next.message = 'A sentence or two about the project helps.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 1400);
  };

  const reset = () => {
    setValues({ name: '', email: '', message: '' });
    setTopic(TOPICS[0]);
    setStatus('idle');
  };

  const inputClass = (hasError: boolean) =>
  `mt-2 w-full rounded-xl border bg-ink px-4 py-3 text-paper placeholder:text-paper/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/60 ${
  hasError ? 'border-accent' : 'border-paper/15 focus:border-paper/30'}`;


  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs text-paper/50">(06) — Contact</p>
          <SplitReveal
            parts={['Let’s make something that', { text: 'feels alive.', className: 'italic text-accent' }]}
            className="mt-4 font-display text-6xl leading-[0.92] tracking-tight md:text-8xl" />
          
          <p className="mt-8 max-w-md text-lg text-paper/65">{profile.availability}</p>

          <button
            type="button"
            onClick={copyEmail}
            className="group mt-10 flex items-center gap-4 border-b border-paper/20 pb-3 text-left transition-colors duration-150 hover:border-accent">
            
            <span className="font-display text-3xl md:text-4xl">{profile.email}</span>
            <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-paper/50">
              {copied ? <CheckIcon className="size-3.5 text-accent" /> : <CopyIcon className="size-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {profile.socials.map((s) =>
            <li key={s.label}>
                <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-paper/70 transition-colors duration-150 hover:text-paper">
                
                  {s.label} <ArrowUpRightIcon className="size-3.5" />
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="relative rounded-3xl border border-paper/10 bg-surface p-6 md:p-10 lg:col-span-6">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'sent' ?
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="flex min-h-[28rem] flex-col items-start justify-center"
              role="status">
              
                <span className="grid size-12 place-items-center rounded-full bg-accent text-ink">
                  <CheckIcon className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-4xl">Message received.</h3>
                <p className="mt-3 max-w-sm text-paper/65">
                  Thanks, {values.name.split(' ')[0]}. I reply to every note within two working days.
                </p>
                <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-full border border-paper/20 px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-paper/10">
                
                  Send another
                </button>
              </motion.div> :

            <motion.form
              key="form"
              noValidate
              onSubmit={submit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="space-y-6">
              
                <fieldset>
                  <legend className="text-sm text-paper/70">What are we building?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TOPICS.map((t) =>
                  <button
                    key={t}
                    type="button"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                    className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-150 ${
                    topic === t ?
                    'border-paper bg-paper text-ink' :
                    'border-paper/15 text-paper/70 hover:border-paper/40 hover:text-paper'}`
                    }>
                    
                        {t}
                      </button>
                  )}
                  </div>
                </fieldset>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm text-paper/70">
                    Name
                    <input
                    value={values.name}
                    onChange={update('name')}
                    placeholder="Jordan Lee"
                    aria-invalid={!!errors.name}
                    className={inputClass(!!errors.name)} />
                  
                    {errors.name && <span className="mt-1.5 block text-xs text-accent">{errors.name}</span>}
                  </label>
                  <label className="block text-sm text-paper/70">
                    Email
                    <input
                    type="email"
                    value={values.email}
                    onChange={update('email')}
                    placeholder="jordan@company.com"
                    aria-invalid={!!errors.email}
                    className={inputClass(!!errors.email)} />
                  
                    {errors.email && <span className="mt-1.5 block text-xs text-accent">{errors.email}</span>}
                  </label>
                </div>

                <label className="block text-sm text-paper/70">
                  Project details
                  <textarea
                  rows={5}
                  value={values.message}
                  onChange={update('message')}
                  placeholder="Timeline, goals, links — whatever helps."
                  aria-invalid={!!errors.message}
                  className={`${inputClass(!!errors.message)} resize-none`} />
                
                  {errors.message && <span className="mt-1.5 block text-xs text-accent">{errors.message}</span>}
                </label>

                <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-ink transition-[opacity,transform] duration-150 ease-out hover:opacity-90 active:scale-[0.98] disabled:opacity-70">
                
                  {status === 'sending' ?
                <>
                      <LoaderCircleIcon className="size-4 animate-spin" /> Sending…
                    </> :

                <>
                      Send message <ArrowUpRightIcon className="size-4" />
                    </>
                }
                </button>
              </motion.form>
            }
          </AnimatePresence>
        </div>
      </div>
    </section>);

}