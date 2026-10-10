import React from 'react';

interface SegmentedControlProps<T extends string> {
  label: string;
  options: {id: T;label: string;}[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ label, options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-xl border border-paper/15 bg-ink p-1">
      {options.map((option) =>
      <button
        key={option.id}
        type="button"
        role="radio"
        aria-checked={value === option.id}
        onClick={() => onChange(option.id)}
        className={`flex-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
        value === option.id ? 'bg-paper text-ink' : 'text-paper/60 hover:bg-paper/5 hover:text-paper'}`
        }>
        
          {option.label}
        </button>
      )}
    </div>);

}