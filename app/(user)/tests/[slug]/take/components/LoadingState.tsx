'use client';

import Skeleton from './Skeleton';

export default function LoadingState() {
  return (
    <div className="min-h-[100svh] bg-gradient-to-b from-primary/10 to-transparent">
      <div className="relative mx-auto max-w-[500px] px-8 pt-4">
        {/* Header (back + drawer button) */}
        <div className="flex items-center justify-between text-muted-foreground">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>

        {/* Timer chip */}
        <div className="mt-4">
          <div className="mx-auto max-w-[500px]">
            <div className="flex items-center justify-center">
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
            <div className="mt-2 flex justify-center">
              <Skeleton className="h-3 w-40 rounded" />
            </div>
          </div>
        </div>

        {/* Card soal */}
        <div className="mt-4 rounded-2xl bg-white ring-1 ring-black/5 p-5 shadow-xl">
          <div className="mx-auto flex max-w-[420px] flex-col items-center">
            <Skeleton className="h-3 w-24 rounded" />
            <div className="mt-4 w-full space-y-3">
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-10/12 rounded" />
              <Skeleton className="h-4 w-9/12 rounded" />
            </div>
          </div>
        </div>

        {/* Options skeleton (4 baris) */}
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full rounded-xl border bg-white px-4 py-3 ring-1 ring-black/5"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-6 rounded" />
                <Skeleton className="h-4 w-9/12 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-8 mb-6 flex items-center justify-between">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
