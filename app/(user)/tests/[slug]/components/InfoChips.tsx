'use client';

export default function InfoChips({
  category,
  level,
  questions,
  durationMin
}: {
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: number;
  durationMin: number;
}) {
  const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 text-xs">
      {children}
    </span>
  );

  return (
    <div className="flex flex-wrap gap-2">
      <Chip>{category}</Chip>
      <Chip>{level}</Chip>
      <Chip>{questions} soal</Chip>
      <Chip>{durationMin} menit</Chip>
    </div>
  );
}
