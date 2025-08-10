'use client';

export default function EmptyState() {
  return (
    <div className="rounded-2xl border bg-white p-8 text-center text-gray-600">
      <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
        <span className="text-xl">📝</span>
      </div>
      <p className="font-medium">No history yet</p>
      <p className="text-sm text-gray-500 mt-1">
        Kamu belum memiliki sesi tes. Mulai satu tes dan hasilnya akan muncul di sini.
      </p>
    </div>
  );
}
