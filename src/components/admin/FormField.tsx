import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, hint, error, className = '', children }: FormFieldProps) {
  return (
    <div className={className}>
      {htmlFor ?
      <label htmlFor={htmlFor} className="text-sm text-paper/75">
          {label}
        </label> :

      <p className="text-sm text-paper/75">{label}</p>
      }
      <div className="mt-2">{children}</div>
      {error ?
      <p className="mt-1.5 text-xs text-accent" role="alert">
          {error}
        </p> :

      hint && <p className="mt-1.5 text-xs text-paper/40">{hint}</p>
      }
    </div>);

}

export function inputClass(hasError = false) {
  return `w-full rounded-xl border bg-ink px-4 py-2.5 text-paper placeholder:text-paper/30 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
  hasError ? 'border-accent' : 'border-paper/15 focus:border-paper/30'}`;

}