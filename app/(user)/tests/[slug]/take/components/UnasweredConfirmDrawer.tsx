'use client';

import { Drawer } from 'vaul';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unansweredIndexes: number[]; // index berbasis 0
  onJump: (index: number) => void;
  onConfirmSubmit: () => void;
};

export default function UnansweredConfirmDrawer({
  open,
  onOpenChange,
  unansweredIndexes,
  onJump,
  onConfirmSubmit
}: Props) {
  const totalUnanswered = unansweredIndexes.length;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 rounded-t-2xl bg-white shadow-2xl outline-none">
          <div aria-hidden className="mx-auto w-12 h-1.5 rounded-full bg-zinc-300 mb-1 mt-4" />

          <div className="p-4 bg-white rounded-t-2xl font-inter-tight">
            <div className="mb-3 flex items-center justify-between">
              <Drawer.Title className="text-base font-semibold">Masih ada yang kosong</Drawer.Title>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-full p-2 hover:bg-zinc-100"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground">
              Terdapat <span className="font-semibold text-foreground">{totalUnanswered}</span> soal
              yang belum dijawab. Kamu bisa lompat ke nomor yang kosong, atau tetap kirim sekarang.
            </p>

            {/* grid nomor yang belum dijawab */}
            <ul className="mt-4 grid grid-cols-5 gap-2">
              {unansweredIndexes.map((i) => (
                <li key={i}>
                  <button
                    className="h-10 w-full rounded-lg border border-amber-300 bg-amber-50 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    onClick={() => {
                      onJump(i);
                      onOpenChange(false);
                    }}
                    title={`Lompat ke soal ${i + 1}`}
                    aria-label={`Lompat ke soal ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 rounded-lg border bg-white"
              >
                Kembali isi dulu
              </button>
              <button
                onClick={onConfirmSubmit}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
              >
                Tetap kirim
              </button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              *Kosong akan dihitung salah. (Pengolahan akhirnya dari backend)
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
