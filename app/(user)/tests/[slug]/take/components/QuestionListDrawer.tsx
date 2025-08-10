'use client';

import { Drawer } from 'vaul'; // ⬅️ ganti: named import
import { X } from 'lucide-react';
import type { Question } from './types';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: Question[];
  currentIndex: number;
  answeredIds: Set<number>;
  onJump: (index: number) => void;
};

export default function QuestionListDrawer({
  open,
  onOpenChange,
  questions,
  currentIndex,
  answeredIds,
  onJump
}: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 rounded-t-2xl bg-white shadow-2xl outline-none">
          <div aria-hidden className="mx-auto w-12 h-1.5 rounded-full bg-zinc-300 mb-1 mt-4" />
          {/* A11y: wajib ada Title di dalam Content */}
          <div className="p-4 bg-white rounded-t-2xl font-inter-tight">
            <div className="mb-3 flex items-center justify-between">
              <Drawer.Title className="text-base font-semibold">Daftar Soal</Drawer.Title>

              <button
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 hover:bg-zinc-100"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* handle (drag bar) */}

            {/* grid nomor */}
            <ul className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {
                const isCurrent = i === currentIndex;
                const isAnswered = answeredIds.has(q.id);

                const base =
                  'h-10 w-10 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary';
                const cls = isCurrent
                  ? 'bg-primary text-primary-foreground border-primary'
                  : isAnswered
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-400 hover:bg-emerald-100'
                    : 'bg-white text-foreground border-zinc-300 hover:bg-zinc-50';

                return (
                  <li key={q.id}>
                    <button
                      className={`${base} ${cls} w-full`}
                      onClick={() => {
                        onJump(i);
                        onOpenChange(false);
                      }}
                      aria-current={isCurrent ? 'page' : undefined}
                      title={q.question}
                    >
                      {i + 1}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* legend */}
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-primary" /> Saat ini
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-emerald-500/20 ring-1 ring-emerald-400" />{' '}
                Terjawab
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded bg-zinc-200" /> Belum
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
