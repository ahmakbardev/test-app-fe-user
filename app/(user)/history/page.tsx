'use client';

import Header from '../components/Header';
import HistoryList from './components/HistoryList';
import { useEffect, useState } from 'react';
import ResultDrawer, { TestResult } from './components/ResultDrawer';

export default function HistoryPage() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('latestResult');
    if (raw) {
      try {
        setResult(JSON.parse(raw));
        setOpen(true);
      } catch {}
      localStorage.removeItem('latestResult');
    }
  }, []);

  return (
    <>
      <Header title="History" variant="root" />
      <section className="max-w-[560px] mx-auto px-4 py-4">
        <HistoryList />
      </section>

      <ResultDrawer
        open={open}
        onOpenChange={setOpen}
        result={result}
      />
    </>
  );
}
