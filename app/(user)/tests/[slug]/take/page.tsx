'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

import HeaderBar from './components/HeaderBar';
import TimerBadge from './components/TimerBadge';
import QuestionCard from './components/QuestionCard';
import OptionsList from './components/OptionsList';
import FooterActions from './components/FooterActions';
import type { Question, Answer } from './components/types';
import QuestionListDrawer from './components/QuestionListDrawer';
import LoadingState from './components/LoadingState';
import UnansweredConfirmDrawer from './components/UnasweredConfirmDrawer';

// ---------------- utils & guards ----------------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const isDummyMode = () =>
  process.env.NEXT_PUBLIC_USE_DUMMY === '1' || !process.env.NEXT_PUBLIC_API_BASE_URL;

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
const isQuestion = (v: unknown): v is Question => {
  if (!isRecord(v)) return false;
  const { id, question, options, answer } = v as Record<string, unknown>;
  return (
    typeof id === 'number' &&
    typeof question === 'string' &&
    isRecord(options) &&
    typeof answer === 'string'
  );
};
const isApiQuestions = (v: unknown): v is { data: Question[] } =>
  isRecord(v) &&
  Array.isArray((v as { data: unknown }).data) &&
  (v as { data: unknown[] }).data.every(isQuestion);

const safeJSON = <T,>(raw: string | null, fallback: T): T => {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

// ---------------- dummy bank ----------------
const dummyBank: Record<string, Question[]> = {
  cpns: [
    {
      id: 101,
      question:
        'Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah...',
      options: { A: 'Bandung', B: 'Jakarta', C: 'Surabaya', D: 'Medan' },
      answer: 'B'
    },
    {
      id: 102,
      question: 'Hasil dari 12 × 8 adalah...',
      options: { A: '80', B: '88', C: '96', D: '98' },
      answer: 'C'
    },
    {
      id: 103,
      question: 'Sinonim kata “segera” adalah...',
      options: { A: 'Lambat', B: 'Nanti', C: 'Lekas', D: 'Perlahan' },
      answer: 'C'
    },
    {
      id: 104,
      question:
        'Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah...',
      options: { A: 'Bandung', B: 'Jakarta', C: 'Surabaya', D: 'Medan' },
      answer: 'B'
    },
    {
      id: 105,
      question: 'Hasil dari 12 × 8 adalah...',
      options: { A: '80', B: '88', C: '96', D: '98' },
      answer: 'C'
    },
    {
      id: 106,
      question: 'Sinonim kata “segera” adalah...',
      options: { A: 'Lambat', B: 'Nanti', C: 'Lekas', D: 'Perlahan' },
      answer: 'C'
    },
    {
      id: 107,
      question:
        'Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah...',
      options: { A: 'Bandung', B: 'Jakarta', C: 'Surabaya', D: 'Medan' },
      answer: 'B'
    },
    {
      id: 108,
      question: 'Hasil dari 12 × 8 adalah...',
      options: { A: '80', B: '88', C: '96', D: '98' },
      answer: 'C'
    },
    {
      id: 109,
      question: 'Sinonim kata “segera” adalah...',
      options: { A: 'Lambat', B: 'Nanti', C: 'Lekas', D: 'Perlahan' },
      answer: 'C'
    },
    {
      id: 110,
      question:
        'Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah... Ibu kota Indonesia adalah...',
      options: { A: 'Bandung', B: 'Jakarta', C: 'Surabaya', D: 'Medan' },
      answer: 'B'
    },
    {
      id: 111,
      question: 'Hasil dari 12 × 8 adalah...',
      options: { A: '80', B: '88', C: '96', D: '98' },
      answer: 'C'
    },
    {
      id: 112,
      question: 'Sinonim kata “segera” adalah...',
      options: { A: 'Lambat', B: 'Nanti', C: 'Lekas', D: 'Perlahan' },
      answer: 'C'
    }
  ],
  default: [
    { id: 201, question: '2 + 2 = ...', options: { A: '3', B: '4', C: '5', D: '22' }, answer: 'B' }
  ]
};

async function fetchQuestions(slug: string): Promise<{ data: Question[] }> {
  if (isDummyMode()) {
    await sleep(400);
    return { data: dummyBank[slug] ?? dummyBank.default };
  }
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const res = await fetch(`${base}/api/admin/categories/${slug}/questions`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('Gagal memuat soal');
  const json: unknown = await res.json();
  if (!isApiQuestions(json)) throw new Error('Response tidak valid');
  return json as { data: Question[] };
}

// ---------------- page ----------------
export default function TakeTestPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const qs = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [startedAt, setStartedAt] = useState<string>('');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // TIMER
  const timerEnabled = qs.get('timer') === '1';
  const durationMin = Math.max(0, Number(qs.get('duration') ?? 0)) || 0;
  const totalSeconds = durationMin * 60;
  const [remaining, setRemaining] = useState<number>(totalSeconds);

  // UI state
  const [selectingKey, setSelectingKey] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Confirm submit drawer (kalau masih ada kosong)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // derived
  const answeredIds = useMemo(() => new Set(answers.map((a) => a.question_id)), [answers]);
  const unansweredIndexes = useMemo(
    () => questions.map((q, i) => (answeredIds.has(q.id) ? -1 : i)).filter((v) => v >= 0),
    [questions, answeredIds]
  );

  useEffect(() => {
    (async () => {
      try {
        const r = await fetchQuestions(slug);
        setQuestions(r.data);

        const isNew = qs.get('session') === 'new';
        const started = isNew
          ? new Date().toISOString()
          : localStorage.getItem(`session:${slug}:started_at`);
        const savedAnswers = isNew
          ? []
          : safeJSON<Answer[]>(localStorage.getItem(`session:${slug}:answers`), []);

        const s = started || new Date().toISOString();
        setStartedAt(s);
        setAnswers(savedAnswers);
        localStorage.setItem(`session:${slug}:started_at`, s);

        if (timerEnabled && totalSeconds > 0) {
          const elapsedSinceStart = Math.floor((Date.now() - new Date(s).getTime()) / 1000) || 0;
          setRemaining(Math.max(totalSeconds - elapsedSinceStart, 0));
        }
      } catch {
        toast.error('Gagal memuat tes');
        router.replace(`/tests/${slug}`);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // countdown
  useEffect(() => {
    if (!timerEnabled || totalSeconds <= 0) return;
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [timerEnabled, totalSeconds, remaining]);

  // auto submit when time is up
  useEffect(() => {
    if (!timerEnabled) return;
    if (remaining === 0 && !isSubmitting) {
      toast.info('Waktu habis. Mengirim jawaban...');
      doSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, timerEnabled]);

  // persist answers
  useEffect(() => {
    localStorage.setItem(`session:${slug}:answers`, JSON.stringify(answers));
  }, [answers, slug]);

  const current = questions[idx];
  const isLast = idx === Math.max(questions.length - 1, 0);

  const selectedOfCurrent = useMemo(
    () => answers.find((a) => a.question_id === current?.id)?.selected,
    [answers, current]
  );

  // pilih opsi
  const selectOption = async (key: string) => {
    if (!current || selectingKey || isSubmitting) return;
    setSelectingKey(key);
    await sleep(350);

    setAnswers((prev) => {
      const other = prev.filter((a) => a.question_id !== current.id);
      return [...other, { question_id: current.id, selected: key }];
    });

    setSelectingKey(null);
    if (!isLast) setIdx((i) => i + 1);
  };

  // submit handler with confirm flow
  const handleSubmitClick = () => {
    if (isSubmitting) return;
    if (unansweredIndexes.length > 0) {
      setIsConfirmOpen(true);
      return;
    }
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      setIsSubmitting(true);
      setLoading(true);

      // hitung durasi kalau pakai timer
      const durationSec =
        qs.get('timer') === '1' && durationMin > 0 ? totalSeconds - remaining : undefined;

      if (isDummyMode()) {
        // ---- DUMMY SCORING ----
        const keyById = new Map(questions.map((q) => [q.id, q.answer]));
        const correctCount = answers.reduce(
          (acc, a) => acc + (keyById.get(a.question_id) === a.selected ? 1 : 0),
          0
        );
        const total = questions.length || 0;
        const accuracy = total ? (correctCount / total) * 100 : 0;

        // simpan payload untuk drawer di History
        localStorage.setItem(
          'latestResult',
          JSON.stringify({
            // sessionId bisa dikosongin utk dummy
            title: `Tryout ${slug.toUpperCase()}`,
            category: slug.toUpperCase(),
            correct: correctCount,
            total,
            accuracy,
            durationSec,
            startedAt,
            finishedAt: new Date().toISOString()
          })
        );

        await sleep(600);
        toast.success(`Jawaban terkirim! (dummy) • Benar ${correctCount}/${total}`);
      } else {
        // ---- REAL API ----
        const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const res = await fetch(`${base}/api/user/tests/${slug}/submit`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ started_at: startedAt, answers })
        });
        if (!res.ok) throw new Error();

        // PERBAIKAN: Mengganti `any` dengan tipe yang lebih spesifik
        const json: {
          id?: string;
          session_id?: string;
          correct?: number;
          correct_count?: number;
          score?: { correct: number; total: number };
          total?: number;
          total_questions?: number;
          accuracy?: number;
          percentage?: number;
          duration_sec?: number;
          duration?: number;
          time_spent?: number;
          title?: string;
          category?: string;
          started_at?: string;
          finished_at?: string;
        } = await res.json().catch(() => ({}));

        const sessionId = String(json.id ?? json.session_id ?? '');

        const correct = Number(json.correct ?? json.correct_count ?? json.score?.correct ?? 0);
        const total = Number(
          json.total ?? json.total_questions ?? json.score?.total ?? questions.length
        );
        const accuracy = Number(
          json.accuracy ?? json.percentage ?? (total ? (correct / total) * 100 : 0)
        );
        const dur =
          Number(json.duration_sec ?? json.duration ?? json.time_spent ?? durationSec ?? 0) ||
          undefined;

        localStorage.setItem(
          'latestResult',
          JSON.stringify({
            sessionId,
            title: json.title ?? `Tryout ${slug.toUpperCase()}`,
            category: json.category ?? slug.toUpperCase(),
            correct,
            total,
            accuracy,
            durationSec: dur,
            startedAt: json.started_at ?? startedAt,
            finishedAt: json.finished_at ?? new Date().toISOString()
          })
        );

        toast.success('Jawaban terkirim!');
      }

      // bersihkan cache sesi
      localStorage.removeItem(`session:${slug}:answers`);
      localStorage.removeItem(`session:${slug}:started_at`);

      // pindah ke history — drawer akan auto-open dari localStorage.latestResult
      router.replace('/history');
    } catch {
      toast.error('Submit gagal');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const timeText = `${mm}:${ss}`;

  if (loading && !questions.length) return <LoadingState />;
  if (!current) return <div className="p-6">Tidak ada soal.</div>;

  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-primary/10 to-transparent">
      <div className="relative h-full overflow-y-auto mx-auto max-w-[500px] px-8 pt-4">
        <HeaderBar onBack={() => router.back()} onOpenDrawer={() => setIsDrawerOpen(true)} />

        <TimerBadge
          show={timerEnabled && totalSeconds > 0}
          timeText={timeText}
          durationMin={durationMin}
          danger={remaining <= 30}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            className="mt-4"
          >
            <QuestionCard q={current} index={idx} total={questions.length} />
            <OptionsList
              options={current.options}
              selectedKey={selectedOfCurrent}
              selectingKey={selectingKey}
              onSelect={selectOption}
            />
          </motion.div>
        </AnimatePresence>

        <FooterActions
          canPrev={idx > 0}
          canNext={!!selectedOfCurrent}
          isLast={isLast}
          onPrev={() => setIdx((i) => Math.max(0, i - 1))}
          onNext={() => setIdx((i) => Math.min(questions.length - 1, i + 1))}
          onSubmit={handleSubmitClick}
          disabled={!!selectingKey || isSubmitting}
        />
      </div>

      {/* Drawer daftar soal */}
      <QuestionListDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        questions={questions}
        currentIndex={idx}
        answeredIds={answeredIds}
        onJump={(i) => setIdx(i)}
      />

      {/* Drawer konfirmasi jika masih ada kosong */}
      <UnansweredConfirmDrawer
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        unansweredIndexes={unansweredIndexes}
        onJump={(i) => {
          setIdx(i);
        }}
        onConfirmSubmit={() => {
          setIsConfirmOpen(false);
          doSubmit();
        }}
      />
    </div>
  );
}
