'use client';

export default function Hero() {
  return (
    <div
      className="rounded-2xl p-5 text-white shadow-md
      bg-gradient-to-tr from-[#3A24FF] via-[#4C2CF8] to-[#7B35F4] relative overflow-hidden"
    >
      {/* soft circles */}
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute right-10 bottom-0 w-28 h-28 rounded-full bg-white/10" />

      <h2 className="text-xl font-semibold">Play and Win</h2>
      <p className="text-sm mt-1 opacity-90">
        Start a quiz now and enjoy. Asah kemampuanmu di Test Center.
      </p>

      <button
        className="mt-4 inline-flex items-center gap-2 bg-white text-[#3A24FF] font-medium
                   px-4 py-2 rounded-xl shadow active:scale-95 transition"
      >
        Get Started
        <span className="-mr-1">&rarr;</span>
      </button>
    </div>
  );
}
