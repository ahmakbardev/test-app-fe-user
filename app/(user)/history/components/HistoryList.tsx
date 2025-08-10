'use client';

import { useEffect, useState } from 'react';
import HistoryItem, { TestHistory } from './HistoryItem';
import EmptyState from './EmptyState';

// ganti ke fetch API beneran nanti:
// GET /api/user/tests  -> array TestHistory
async function fetchHistory(): Promise<TestHistory[]> {
  // dummy sementara
  await new Promise((r) => setTimeout(r, 400));
  return [
    {
      id: 'ts_1001',
      title: 'Tryout CPNS – SKD Paket A',
      category: 'CPNS',
      started_at: '2025-08-10T09:12:00Z',
      duration_sec: 1320,
      total_questions: 50,
      correct: 38,
      status: 'completed'
    },
    {
      id: 'ts_1002',
      title: 'PPPK Kemampuan Dasar',
      category: 'PPPK',
      started_at: '2025-08-09T19:05:00Z',
      duration_sec: 0,
      total_questions: 40,
      correct: 0,
      status: 'incomplete'
    }
  ];
}

export default function HistoryList() {
  const [items, setItems] = useState<TestHistory[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetchHistory().then((res) => alive && setItems(res));
    return () => {
      alive = false;
    };
  }, []);

  if (items === null) {
    // skeleton simple
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl border bg-white animate-pulse" />
        ))}
      </div>
    );
  }

  if (!items.length) return <EmptyState />;

  return (
    <div className="space-y-3">
      {items.map((it) => (
        <HistoryItem key={it.id} data={it} />
      ))}
    </div>
  );
}
