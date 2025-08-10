'use client';

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a quiz"
        className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/80 border border-gray-200 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {/* magnifier */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
    </div>
  );
}
