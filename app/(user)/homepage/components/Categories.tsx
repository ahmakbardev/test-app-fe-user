'use client';

type Cat = { key: string; name: string; icon: React.ReactNode };

const CATS: Cat[] = [
  { key: 'cpns', name: 'CPNS', icon: <span>📘</span> },
  { key: 'pppk', name: 'PPPK', icon: <span>🧩</span> },
  { key: 'logic', name: 'Logika', icon: <span>🧠</span> },
  { key: 'math', name: 'Matematika', icon: <span>📐</span> },
  { key: 'english', name: 'English', icon: <span>🔤</span> }
];

export default function Categories() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Categories</h3>
        <button className="text-primary text-sm font-medium">See all</button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 mx-auto w-full max-w-[95vw] px-4 snap-x">
        {CATS.map((c) => (
          <button
            key={c.key}
            className="min-w-[140px] snap-start rounded-xl bg-fuchsia-50 hover:bg-fuchsia-100
                       text-left p-4 border border-fuchsia-100 shadow-sm active:scale-95 transition"
          >
            <div className="text-2xl">{c.icon}</div>
            <div className="mt-3 font-medium">{c.name}</div>
            <div className="text-xs text-gray-500">Explore questions</div>
          </button>
        ))}
      </div>
    </section>
  );
}
