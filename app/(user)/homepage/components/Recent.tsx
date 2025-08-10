'use client';

type RecentItem = {
  id: number;
  title: string;
  questions: number;
  status: 'completed' | 'incomplete';
};

const RECENTS: RecentItem[] = [
  { id: 1, title: 'Tryout CPNS – SKD Paket A', questions: 12, status: 'completed' },
  { id: 2, title: 'PPPK Kemampuan Dasar', questions: 20, status: 'incomplete' }
];

function StatusBadge({ status }: { status: RecentItem['status'] }) {
  const isDone = status === 'completed';
  return (
    <span
      className={
        'text-xs px-2.5 py-1 rounded-full font-medium ' +
        (isDone
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-orange-50 text-orange-700 border border-orange-200')
      }
    >
      {isDone ? 'Completed' : 'Incomplete'}
    </span>
  );
}

export default function Recent() {
  return (
    <section className="space-y-3">
      <h3 className="font-semibold text-lg">Recent</h3>

      <div className="space-y-3">
        {RECENTS.map((r) => (
          <button
            key={r.id}
            className="w-full flex items-center justify-between rounded-xl border bg-white
                       p-4 shadow-sm hover:shadow active:scale-[0.98] transition text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100
                              flex items-center justify-center"
              >
                {/* small beaker icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-indigo-600"
                >
                  <path
                    d="M9 3v3l-4 7a4 4 0 0 0 3.5 6h7A4 4 0 0 0 19 13l-4-7V3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-medium leading-snug">{r.title}</div>
                <div className="text-xs text-gray-500">{r.questions} questions</div>
              </div>
            </div>
            <StatusBadge status={r.status} />
          </button>
        ))}
      </div>
    </section>
  );
}
