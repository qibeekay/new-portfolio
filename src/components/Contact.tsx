import React, { useState } from 'react';
import {
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  GlobeIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
  SendIcon,
} from 'lucide-react';
import { profile } from '../data/profile';
import { SplitReveal } from './text/SplitReveal';
import { useLocalTime } from '../hooks/useLocalTime';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime(profile.timeZone);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center md:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/50">(06) — Get in Touch</p>
          <SplitReveal
            parts={[
              'Let’s make something that ',
              { text: 'feels alive.', className: 'italic text-accent' },
            ]}
            className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          />
          <p className="mt-6 max-w-2xl text-base text-paper/65 sm:text-lg">
            {profile.availability} Reach out directly via email, WhatsApp, or phone — I respond promptly to inquiries, collaborations, and opportunities.
          </p>
        </div>

        {/* Contact Methods Cards Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Email Hero Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-paper/10 bg-surface/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-paper/20 md:col-span-2 lg:col-span-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <MailIcon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-paper/40 font-mono">Primary Channel</p>
                  <h3 className="text-sm font-medium text-paper/80">Direct Electronic Mail</h3>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/10 bg-paper/5 px-3 py-1 font-mono text-[11px] text-accent">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                Replies within 24h
              </span>
            </div>

            <div className="my-8">
              <p className="font-display text-2xl tracking-tight text-paper sm:text-3xl md:text-4xl lg:text-5xl">
                {profile.email}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-xs font-semibold text-ink transition-transform duration-150 hover:bg-accent active:scale-95"
              >
                {copied ? <CheckIcon className="size-3.5 text-ink" /> : <CopyIcon className="size-3.5" />}
                {copied ? 'Copied to Clipboard' : 'Copy Email Address'}
              </button>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-paper/15 px-5 py-2.5 text-xs font-medium text-paper/80 transition-colors hover:border-paper/30 hover:text-paper"
              >
                <SendIcon className="size-3.5" />
                Open in Email App <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>

          {/* WhatsApp Direct Card */}
          <a
            href={profile.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between rounded-3xl border border-paper/10 bg-surface/80 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#25D366]/15 text-[#25D366] transition-transform duration-300 group-hover:scale-105">
                  <MessageCircleIcon className="size-5" />
                </span>
                <span className="font-mono text-xs text-paper/40 transition-colors group-hover:text-accent">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-paper/40">Instant Messaging</p>
              <h4 className="mt-1 font-display text-2xl text-paper">WhatsApp</h4>
              <p className="mt-2 font-mono text-sm text-paper/70">{profile.whatsappFormatted}</p>
            </div>
            <p className="mt-6 text-xs text-paper/45 group-hover:text-accent transition-colors">
              Chat directly on WhatsApp →
            </p>
          </a>

          {/* Phone Call Card */}
          <a
            href={profile.phoneHref}
            className="group flex flex-col justify-between rounded-3xl border border-paper/10 bg-surface/80 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-105">
                  <PhoneIcon className="size-5" />
                </span>
                <span className="font-mono text-xs text-paper/40 transition-colors group-hover:text-accent">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-paper/40">Direct Phone Line</p>
              <h4 className="mt-1 font-display text-2xl text-paper">Voice Call</h4>
              <p className="mt-2 font-mono text-sm text-paper/70">{profile.phoneFormatted}</p>
            </div>
            <p className="mt-6 text-xs text-paper/45 group-hover:text-accent transition-colors">
              Call directly via phone line →
            </p>
          </a>

          {/* Time & Location Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-paper/10 bg-surface/80 p-7 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-paper/10 text-paper/70">
                  <GlobeIcon className="size-5" />
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-paper/50">
                  <ClockIcon className="size-3.5" />
                  <span className="tabular-nums">{localTime}</span>
                </span>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-paper/40">Time Zone & Location</p>
              <h4 className="mt-1 font-display text-2xl text-paper">{profile.location}</h4>
              <p className="mt-2 text-xs leading-relaxed text-paper/55">
                West Africa Time (UTC+1). Seamless collaboration across European, US, and African timezones.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-paper/40">
              <span className="size-1.5 rounded-full bg-accent" />
              Available for Global Remote
            </div>
          </div>
        </div>

        {/* Social Presence Strip */}
        <div className="mt-10 rounded-3xl border border-paper/10 bg-surface/40 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="font-display text-xl text-paper">Digital Frequencies & Profiles</h4>
              <p className="mt-1 text-xs text-paper/50 font-mono">Connect and follow across platforms</p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-4 py-2 font-mono text-xs text-paper/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-ink"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}