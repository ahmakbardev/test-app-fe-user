'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchInput from './SearchInput';
import TestCard from './TestCard';

type TestItem = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  rating?: number;
  questions?: number;
  duration?: number;
  cover?: string;
};

type Props = {
  initialItems: TestItem[];
};

export default function TestList({ initialItems }: Props) {
  const router = useRouter();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return initialItems;
    return initialItems.filter((i) =>
      [i.title, i.subtitle].some((t) => (t ?? '').toLowerCase().includes(term))
    );
  }, [q, initialItems]);

  const handleClick = (id: string) => {
    // arahkan ke detail/konfirmasi tes
    // NOTE: pastikan route detail nanti tersedia (misal: /tests/[slug])
    router.push(`/tests/${id}`);
  };

  return (
    <div className="space-y-5">
      <SearchInput value={q} onChange={setQ} placeholder="Cari tes (CPNS, PPPK, Logika…)" />

      {/* grid cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((t) => (
            <TestCard key={t.id} {...t} onClick={handleClick} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-sm text-muted-foreground">
          Tidak ada tes yang cocok dengan pencarianmu.
        </div>
      )}
    </div>
  );
}
