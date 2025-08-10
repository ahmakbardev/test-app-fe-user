'use client';
import { Question } from './types';

export default function QuestionCard({
  q,
  index,
  total
}: {
  q: Question;
  index: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-5">
      <div className="text-center text-xs text-muted-foreground">
        Question <span className="font-semibold text-foreground">{index + 1}</span> / {total}
      </div>
      <h1 className="mt-3 text-center text-lg font-semibold leading-snug">{q.question}</h1>
    </div>
  );
}
