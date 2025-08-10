'use client';
export default function TimerBadge({
  show,
  timeText,
  durationMin,
  danger
}: {
  show: boolean;
  timeText: string;
  durationMin: number;
  danger: boolean;
}) {
  if (!show) return null;
  return (
    <div className="mt-4">
      <div className="mx-auto max-w-[500px]">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5 px-4 h-10 grid place-items-center">
            <span className={['font-semibold', danger ? 'text-red-600' : 'text-primary'].join(' ')}>
              {timeText}
            </span>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          Sisa waktu • {durationMin} menit total
        </div>
      </div>
    </div>
  );
}
