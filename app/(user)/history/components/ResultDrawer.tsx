'use client';

import { Drawer } from 'vaul';
import { X } from 'lucide-react';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import ReactConfetti from 'react-confetti';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// Helper untuk menggabungkan class Tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TestResult = {
  sessionId?: string;
  title?: string;
  category?: string;
  correct: number;
  total: number;
  accuracy: number; // 0-100
  durationSec?: number; // detik
  startedAt?: string;
  finishedAt?: string;
};

// Helper untuk memformat durasi menjadi mm:ss
function formatMmSs(durationSec?: number) {
  if (!durationSec) return '-';
  const m = Math.floor(durationSec / 60);
  const s = durationSec % 60;
  return `${m}m ${s}s`;
}

// Custom hook untuk logika confetti dengan react-confetti
const useConfetti = (open: boolean) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Efek untuk memicu dan menghentikan confetti
  useEffect(() => {
    if (open) {
      // Nyalakan confetti saat drawer terbuka
      setShowConfetti(true);
      // Atur timer untuk menghentikan confetti setelah beberapa saat
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Confetti akan berhenti setelah 5 detik
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Efek untuk memperbarui dimensi jendela saat diubah
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { showConfetti, windowDimension };
};

export default function ResultDrawer({
  open,
  onOpenChange,
  result,
  onRetake,
  onReview,
  onHome,
  onLeaderboard
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  result: TestResult | null;
  onRetake?: () => void;
  onReview?: () => void;
  onHome?: () => void;
  onLeaderboard?: () => void;
}) {
  // Menggunakan custom hook untuk mengelola confetti
  const { showConfetti, windowDimension } = useConfetti(open);

  const { wrong, completion, scoreText, mmss } = useMemo(() => {
    if (!result) {
      return { wrong: 0, completion: 0, scoreText: '-', mmss: '-' };
    }
    const wrong = Math.max(0, result.total - result.correct);
    const completion = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    const scoreText = Number.isFinite(result.accuracy) ? `${Math.round(result.accuracy)}%` : '-';
    const mmss = formatMmSs(result.durationSec);
    return { wrong, completion, scoreText, mmss };
  }, [result]);

  // Pindahkan conditional return setelah semua hooks dipanggil
  if (!result) return null;

  // ----- helpers -----
  const share = async () => {
    const text = `My quiz result: ${result.title ?? 'Test'} • Score ${scoreText} • ${result.correct}/${result.total} correct.`;
    try {
      if (navigator.share) await navigator.share({ title: 'Test Result', text });
      else await navigator.clipboard.writeText(text);
    } catch (err) {
       
      console.debug('Share cancelled or failed', err);
    }
  };

  const genPdf = () => {
     
    console.log('Generate PDF: coming soon');
  };

  return (
    <>
      <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
        <Drawer.Portal>
          {/* Layer Confetti - diposisikan secara absolut di dalam Drawer.Portal */}

          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 font-inter-tight rounded-t-2xl bg-white shadow-2xl outline-none max-w-[500px] mx-auto">
            <div aria-hidden className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-zinc-300" />

            {/* Dialog Title & Close */}
            <div className="px-5 pt-3">
              <div className="mb-3 flex items-center justify-between">
                <Drawer.Title className="text-base font-semibold">
                  Result
                  {result.title ? ` • ${result.title}` : ''}
                </Drawer.Title>
                <button
                  onClick={() => onOpenChange(false)}
                  className="rounded-full p-2 hover:bg-zinc-100"
                  aria-label="Close"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            {showConfetti && (
              <ReactConfetti
                width={windowDimension.width}
                height={windowDimension.height}
                recycle={false} // Confetti hanya muncul satu kali
                numberOfPieces={500} // Meningkatkan jumlah keping
                gravity={0.4} // Mengurangi gravitasi agar jatuh lebih lambat
                wind={0.05} // Menambahkan angin untuk gerakan horizontal
                initialVelocityX={{ min: -10, max: 10 }} // Menambahkan kecepatan horizontal awal
                initialVelocityY={{ min: -10, max: 10 }} // Menambahkan kecepatan vertikal awal
                run={true}
              />
            )}

            {/* TOP GRADIENT HEADER WITH SCORE CIRCLE */}
            <div className="px-5">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#6C3BFF] via-[#7E49FF] to-[#B272FF]">
                <div className="relative px-6 pt-6 pb-8 text-white">
                  <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
                  <div className="absolute bottom-3 right-8 h-28 w-28 rounded-full bg-white/10" />
                  <div className="flex flex-col items-center">
                    <div className="h-44 w-44 rounded-full bg-white/15 p-4 cursor-pointer">
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white/90 text-[#6C3BFF] shadow-inner">
                        <div className="text-xs font-medium opacity-80">Your Score</div>
                        <div className="text-4xl font-extrabold leading-tight">{scoreText}</div>
                      </div>
                    </div>
                    <div className=" w-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING STATS CARD */}
            <div className="px-5">
              <div className=" -mt-10 w-full rounded-2xl border bg-white p-4 shadow-lg">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <Stat label="Completion" value={`${completion}%`} dotClass="bg-purple-500" />
                  <Stat
                    label="Total Question"
                    value={String(result.total)}
                    dotClass="bg-purple-500"
                  />
                  <Stat label="Correct" value={String(result.correct)} dotClass="bg-emerald-500" />
                  <Stat label="Wrong" value={String(wrong)} dotClass="bg-rose-500" />
                </div>
              </div>
            </div>

            {/* ACTION GRID */}
            {/* <div className="mt-8 grid grid-cols-3 gap-4 px-5 text-center">
              <Action label="Play Again" onClick={onRetake} icon="↻" />
              <Action label="Review Answer" onClick={onReview} icon="👁️" />
              <Action label="Share Score" onClick={share} icon="📤" />
              <Action label="Generate PDF" onClick={genPdf} icon="📄" />
              <Action label="Home" onClick={onHome} icon="🏠" />
              <Action label="Leaderboard" onClick={onLeaderboard} icon="⭐" />
            </div> */}

            {/* META */}
            <div className="px-5 pb-6 pt-6">
              <div className="rounded-xl border p-3 text-sm text-gray-600">
                <Row k="Category" v={result.category ?? '-'} />
                <Row k="Duration" v={mmss} />
                <Row
                  k="Started"
                  v={result.startedAt ? new Date(result.startedAt).toLocaleString() : '-'}
                />
                <Row
                  k="Finished"
                  v={result.finishedAt ? new Date(result.finishedAt).toLocaleString() : '-'}
                />
                {result.sessionId && (
                  <Row
                    k="Session ID"
                    v={<span className="font-mono text-xs">{result.sessionId}</span>}
                  />
                )}
              </div>

              <div className="mt-4 mb-20 flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition active:scale-95"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Komponen-komponen pembantu
function Stat({ label, value, dotClass }: { label: string; value: string; dotClass: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={cn('inline-block h-2 w-2 rounded-full', dotClass)} />
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function Action({ label, icon, onClick }: { label: string; icon: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-2 rounded-2xl border p-4 transition hover:shadow active:scale-95"
      onClick={onClick}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
        <span className="translate-y-[1px]">{icon}</span>
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-gray-500">{k}</span>
      <span className="text-gray-800">{v}</span>
    </div>
  );
}
