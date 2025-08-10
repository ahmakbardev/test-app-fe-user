'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

type Step = {
  key: string;
  label: string;
  options: string[];
  optional?: boolean;
};

const steps: Step[] = [
  {
    key: 'education',
    label: 'Tingkat Pendidikan',
    options: ['SMP', 'SMA/SMK', 'Kuliah', 'Umum', 'Lainnya']
  },
  {
    key: 'goal',
    label: 'Tujuan Mengikuti Tes',
    options: ['UTBK', 'Masuk Kerja', 'Asesmen Minat', 'Lainnya']
  },
  {
    key: 'preference',
    label: 'Preferensi Belajar',
    options: ['Video', 'Latihan Soal', 'Bacaan', 'Diskusi', 'Lainnya']
  },
  {
    key: 'availableTime',
    label: 'Waktu Belajar per Hari',
    options: ['< 1 Jam', '1-2 Jam', '> 2 Jam', 'Lainnya']
  },
  {
    key: 'specialNeeds',
    label: 'Kebutuhan Khusus (Opsional)',
    options: ['Tidak Ada', 'Disleksia', 'Autisme', 'Lainnya'],
    optional: true
  }
];

export default function ProfilingStepper() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [customInput, setCustomInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processingValue, setProcessingValue] = useState<string | null>(null);
  const [showCheck, setShowCheck] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;
  const canSkip = useMemo(() => !!currentStep.optional && !isLast, [currentStep.optional, isLast]);

  useEffect(() => {
    if (data[currentStep.key] === 'Lainnya') {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setCustomInput('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, currentStep.key]);

  const fakeSave = (ms = 650) => new Promise((r) => setTimeout(r, ms)); // TODO: ganti ke API beneran

  const goNext = () => {
    if (!isLast) {
      setStep((s) => s + 1);
    } else {
      // success terakhir -> simpen flag (opsional) + redirect
      toast.success('Profil disimpan!', { description: 'Semua data berhasil dikumpulkan.' });
      try {
        // contoh: simpan ke localStorage buat guard halaman
        localStorage.setItem('profiling_done', 'true');
        localStorage.setItem('profiling_data', JSON.stringify(data));
      } catch {}
      // kasih sedikit jeda biar toast keliatan, boleh dihilangin kalau mau langsung
      setTimeout(() => {
        router.replace('/homepage'); // ⬅️ redirect ke homepage
      }, 350);
    }
  };

  const runWithSpinner = async (value: string, after?: () => void) => {
    setProcessing(true);
    setProcessingValue(value);
    try {
      await fakeSave(); // panggil API di sini
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
        after?.();
      }, 350);
    } finally {
      setProcessing(false);
      setProcessingValue(null);
    }
  };

  const handleSelect = (value: string) => {
    setData((prev) => ({ ...prev, [currentStep.key]: value }));
    if (value === 'Lainnya') return;
    runWithSpinner(value, () => goNext());
  };

  const commitCustomAndNext = async () => {
    const v = (customInput || '').trim();
    if (!v) {
      toast.error('Masukkan pilihan lainnya dulu!');
      return;
    }
    setData((p) => ({ ...p, [currentStep.key]: v }));
    await runWithSpinner(v, () => goNext());
  };

  const handleBack = () => {
    if (step > 0 && !processing) setStep((s) => s - 1);
  };

  const OptionContent = ({ option, selected }: { option: string; selected: boolean }) => {
    const isThisProcessing = processing && processingValue === option;
    const showThisCheck = showCheck && processingValue === option;

    return (
      <div className="flex items-center gap-2">
        {isThisProcessing && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.25"
            />
            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        )}
        {showThisCheck && !isThisProcessing && (
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M20 6 9 17l-5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span>{option}</span>
        {selected && !isThisProcessing && !showThisCheck && (
          <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Dipilih
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-[50vh] flex items-center justify-center px-4">
      <div
        className={`w-full h-full max-w-xl bg-white p-6 rounded-xl shadow flex flex-col justify-between space-y-6 ${processing ? 'opacity-90' : ''}`}
        aria-busy={processing}
      >
        {/* Progress */}
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div
              key={s.key}
              className={`flex-1 h-2 mx-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <label className="block text-2xl text-center mb-14 font-medium">
              {currentStep.label}
            </label>

            <div className={`grid grid-cols-2 gap-3 ${processing ? 'pointer-events-none' : ''}`}>
              {currentStep.options.map((option) => {
                const selected = data[currentStep.key] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    disabled={processing}
                    className={`text-sm px-4 py-2 rounded-md border text-left transition flex items-center ${
                      selected ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted/40'
                    } ${processing ? 'opacity-70' : ''}`}
                  >
                    <OptionContent option={option} selected={selected} />
                  </button>
                );
              })}
            </div>

            {data[currentStep.key] === 'Lainnya' && (
              <div className="mt-4 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !processing && commitCustomAndNext()}
                  disabled={processing}
                  className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                  placeholder="Tulis pilihan lainnya lalu tekan Enter…"
                />
                <button
                  type="button"
                  onClick={commitCustomAndNext}
                  disabled={processing}
                  className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md disabled:opacity-60"
                >
                  {processing && processingValue === customInput.trim() ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.25"
                      />
                      <path
                        d="M22 12a10 10 0 0 1-10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  ) : (
                    'OK'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="flex justify-between pt-2">
          <button
            onClick={handleBack}
            disabled={step === 0 || processing}
            className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-md disabled:opacity-50"
          >
            Back
          </button>

          {isLast ? (
            <button
              onClick={async () => {
                if (data[currentStep.key] === 'Lainnya' && !customInput.trim()) {
                  toast.error('Lengkapi dulu ya!');
                  return;
                }
                if (data[currentStep.key] === 'Lainnya' && customInput.trim()) {
                  setData((p) => ({ ...p, [currentStep.key]: customInput.trim() }));
                  await runWithSpinner(customInput.trim(), () => goNext());
                } else {
                  await runWithSpinner('finish', () => goNext());
                }
              }}
              disabled={processing}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md disabled:opacity-60"
            >
              {processing ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    d="M22 12a10 10 0 0 1-10 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              ) : (
                'Selesai'
              )}
            </button>
          ) : canSkip ? (
            <button
              onClick={() => runWithSpinner('skip', () => goNext())}
              disabled={processing}
              className="px-4 py-2 text-sm bg-transparent underline text-muted-foreground disabled:opacity-60"
            >
              {processing ? '...' : 'Lewati'}
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
