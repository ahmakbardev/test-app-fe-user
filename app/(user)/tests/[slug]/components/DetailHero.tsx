'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

export default function DetailHero({
  title,
  coverUrl,
  rating
}: {
  title: string;
  coverUrl: string;
  rating: number;
}) {
  return (
    <section className="px-4 pt-4">
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src={coverUrl}
          alt={title}
          width={1120}
          height={700}
          className="w-full h-[220px] object-cover"
          priority
        />
        {/* badge rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-xs font-medium shadow">
          <Star className="h-3.5 w-3.5 fill-current" />
          {rating.toFixed(1)}
        </div>

        {/* overlay text */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="rounded-2xl bg-black/45 text-white px-4 py-3">
            <h1 className="text-base font-semibold leading-snug">{title}</h1>
            <p className="text-[11px] opacity-90">Simulasi CAT • Update 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
