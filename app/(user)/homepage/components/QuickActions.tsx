'use client';

export default function QuickTestActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button className="bg-green-500 text-white py-3 rounded-lg shadow active:scale-[0.98] transition">
        Mulai Tes
      </button>
      <button className="bg-blue-500 text-white py-3 rounded-lg shadow active:scale-[0.98] transition">
        Lihat Hasil
      </button>
    </div>
  );
}
