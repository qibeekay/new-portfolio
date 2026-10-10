import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

interface TagInputProps {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function TagInput({ id, value, onChange, placeholder }: TagInputProps) {
  const [text, setText] = useState('');

  const add = (raw: string) => {
    const tag = raw.trim().replace(/,$/, '').trim();
    setText('');
    if (!tag || value.some((v) => v.toLowerCase() === tag.toLowerCase())) return;
    onChange([...value, tag]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(text);
    } else if (e.key === 'Backspace' && !text && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-paper/15 bg-ink px-2 py-1.5 transition-colors duration-150 focus-within:border-paper/30 focus-within:ring-2 focus-within:ring-accent/50">
      {value.map((tag) =>
      <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-paper/10 py-1 pl-3 pr-1 text-xs">
          {tag}
          <button
          type="button"
          onClick={() => onChange(value.filter((v) => v !== tag))}
          aria-label={`Remove ${tag}`}
          className="grid size-5 place-items-center rounded-full text-paper/60 transition-colors duration-150 hover:bg-paper/15 hover:text-paper">
          
            <XIcon className="size-3" />
          </button>
        </span>
      )}
      <input
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => text && add(text)}
        placeholder={value.length ? '' : placeholder}
        className="min-w-[8rem] flex-1 bg-transparent px-2 py-1 text-paper placeholder:text-paper/30 focus:outline-none" />
      
    </div>);

}