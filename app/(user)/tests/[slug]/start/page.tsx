'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { CardStack } from './components/CardStack';

type Detail = {
  title: string;
  category: string;
  questions: number;
  durationMin: number;
};

const getDummyDetail = (slug: string): Detail => ({
  title: `Tryout CPNS SKD 2025 – Paket A (${slug})`,
  category: 'CPNS',
  questions: 110,
  durationMin: 100
});

export default function IntroTestPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const detail = useMemo(() => getDummyDetail(params.slug), [params.slug]);
  const [step, setStep] = useState(0);
  const [useTimer, setUseTimer] = useState(true);

  const steps = useMemo(
    () => [
      {
        key: 'welcome',
        title: detail.category,
        content: (
          <div className="text-center space-y-3">
            <div className="text-4xl font-bold">{step + 1}</div>
            <p className="text-sm text-muted-foreground">
              Selamat datang! Ini adalah sesi pengantar sebelum memulai tes.
            </p>
          </div>
        )
      },
      {
        key: 'rules',
        title: 'Aturan Ringkas',
        content: (
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• {detail.questions} soal pilihan ganda.</li>
            <li>• {detail.durationMin} menit (jika timer aktif).</li>
            <li>• Jawaban tersimpan otomatis per soal.</li>
            <li>• Tidak ada penalti jawaban salah.</li>
          </ul>
        )
      },
      {
        key: 'timer',
        title: 'Timer Pengerjaan',
        content: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Kamu bisa mengaktifkan timer untuk mensimulasikan kondisi ujian.
            </p>
            <label className="flex items-center justify-between rounded-xl border px-3 py-2">
              <span className="text-sm">Aktifkan timer</span>
              <button
                type="button"
                onClick={() => setUseTimer((v) => !v)}
                className={`h-6 w-11 rounded-full transition relative ${
                  useTimer ? 'bg-primary' : 'bg-muted'
                }`}
                aria-pressed={useTimer}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    useTimer ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </label>
            <div className="text-xs text-muted-foreground">
              {useTimer
                ? 'Timer akan mulai ketika tes dimulai.'
                : 'Timer dimatikan. Kamu bisa mengerjakan tanpa batas waktu.'}
            </div>
          </div>
        )
      },
      {
        key: 'ready',
        title: 'Siap Mulai?',
        content: (
          <div className="space-y-2 text-center">
            <p className="text-sm text-muted-foreground">
              {detail.questions} soal • {useTimer ? `${detail.durationMin} menit` : 'tanpa timer'}
            </p>
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/tests/${params.slug}/take?session=new&timer=${useTimer ? 1 : 0}&duration=${detail.durationMin}`
                )
              }
              className="mt-2 w-full rounded-xl bg-primary text-primary-foreground py-3 font-medium"
            >
              Mulai Tes
            </button>
          </div>
        )
      }
    ],
    [detail, params.slug, router, step, useTimer]
  );

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-600">
      <div className="mx-auto h-screen max-w-[480px] px-5 pt-5 pb-24">
        {/* header */}
        <div className="flex items-center justify-between text-white/90">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-base font-semibold drop-shadow">{detail.title}</div>
          <span className="w-8" />
        </div>

        {/* card area */}
        <div className="mt-6 grid h-full place-items-center">
          <CardStack
            index={step}
            count={steps.length}
            onNext={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            onPrev={() => setStep((s) => Math.max(0, s - 1))}
            height={260}
          >
            {steps.map((c) => (
              <div key={c.key}>
                <div className="text-center text-indigo-600/90 font-semibold">{c.title}</div>
                <div className="mt-4">{c.content}</div>
              </div>
            ))}
          </CardStack>
        </div>

        {/* footer controls */}
        <div className="fixed inset-x-0 bottom-0">
          <div className="mx-auto max-w-[480px] px-5 pb-[max(14px,env(safe-area-inset-bottom))]">
            <div className="rounded-[20px] bg-white/90 backdrop-blur ring-1 ring-black/5 shadow-lg px-4 py-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-4 py-2 text-sm rounded-xl border bg-white disabled:opacity-50"
              >
                Back
              </button>
              <div className="text-xs text-muted-foreground">
                {step + 1} / {steps.length}
              </div>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                  className="px-4 py-2 text-sm rounded-xl bg-amber-500 text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/tests/${params.slug}/take?session=new&timer=${useTimer ? 1 : 0}&duration=${detail.durationMin}`
                    )
                  }
                  className="px-4 py-2 text-sm rounded-xl bg-amber-500 text-white"
                >
                  Mulai
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
