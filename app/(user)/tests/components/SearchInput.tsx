'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchInput({ value, onChange, placeholder }: Props) {
  const [local, setLocal] = useState(value);
  const debounced = useMemo(() => {
    let t: NodeJS.Timeout | null = null;
    return (v: string) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => onChange(v), 250);
    };
  }, [onChange]);

  useEffect(() => setLocal(value), [value]);

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-muted-foreground" />
      </span>

      <input
        value={local}
        onChange={(e) => {
          setLocal(e.target.value);
          debounced(e.target.value);
        }}
        placeholder={placeholder ?? 'Cari tes…'}
        className="w-full h-11 pl-10 pr-10 rounded-xl border border-input bg-background
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {local && (
        <button
          onClick={() => {
            setLocal('');
            onChange('');
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-muted"
          aria-label="Clear"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
