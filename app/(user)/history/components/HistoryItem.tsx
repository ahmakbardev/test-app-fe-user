'use client';

export type TestHistory = {
  id: string;
  title: string;
  category: string;
  started_at: string; // ISO
  duration_sec: number; // 0 jika tanpa timer
  total_questions: number;
  correct: number; // 0 jika belum selesai
  status: 'completed' | 'incomplete';
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function fmtDuration(sec: number) {
  if (!sec) return 'No timer';
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

export default function HistoryItem({ data }: { data: TestHistory }) {
  const accuracy =
    data.total_questions > 0 ? Math.round((data.correct / data.total_questions) * 100) : 0;

  const done = data.status === 'completed';

  return (
    <button
      className="w-full rounded-xl border bg-white p-4 shadow-sm hover:shadow active:scale-[0.98] transition text-left"
      // TODO: onClick -> router.push(`/history/${data.id}`)
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {data.category}
            </span>
            <span
              className={
                'text-xs px-2 py-0.5 rounded-full border ' +
                (done
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-orange-50 text-orange-700 border-orange-200')
              }
            >
              {done ? 'Completed' : 'Incomplete'}
            </span>
          </div>
          <h4 className="mt-2 font-medium leading-snug truncate">{data.title}</h4>
          <p className="text-xs text-gray-500 mt-1">
            {fmtDate(data.started_at)} • {fmtDuration(data.duration_sec)}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-sm text-gray-500">Score</div>
          <div className="text-lg font-semibold">{done ? `${accuracy}%` : '-'}</div>
          <div className="text-xs text-gray-500">
            {data.correct}/{data.total_questions}
          </div>
        </div>
      </div>
    </button>
  );
}
