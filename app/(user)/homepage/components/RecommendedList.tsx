'use client';

const tests = [
  { id: 1, name: 'Tes CPNS 2025', desc: 'Latihan soal CPNS lengkap' },
  { id: 2, name: 'Tes PPPK', desc: 'Persiapan tes PPPK terbaru' },
  { id: 3, name: 'Tes Logika', desc: 'Asah kemampuan logika & penalaran' },
];

export default function RecommendedTestsList() {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Rekomendasi Tes</h3>
      <div className="space-y-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="p-4 rounded-lg border hover:shadow active:scale-[0.98] transition cursor-pointer"
          >
            <h4 className="font-medium">{test.name}</h4>
            <p className="text-sm opacity-70">{test.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
