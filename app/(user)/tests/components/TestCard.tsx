'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  rating?: number;
  questions?: number;
  duration?: number; // minutes
  cover?: string;
  onClick?: (id: string) => void;
};

export default function TestCard({
  id,
  title,
  subtitle,
  badge,
  rating,
  questions,
  duration,
  cover,
  onClick
}: Props) {
  return (
    <button
      onClick={() => onClick?.(id)}
      className="w-full overflow-hidden rounded-2xl bg-card text-card-foreground border
                 shadow-sm active:scale-[0.99] transition text-left"
    >
      {/* Cover */}
      <div className="relative h-36 w-full">
        <Image
          src={cover ?? '/assets/images/covers/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 560px) 100vw, 560px"
        />
        {/* overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* badge + rating */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          {badge && (
            <span className="px-2 py-0.5 text-[11px] rounded-full bg-white/90 shadow">{badge}</span>
          )}
        </div>
        {typeof rating === 'number' && (
          <div className="absolute top-2 right-2 px-2 py-0.5 text-[11px] rounded-full bg-white/90 shadow flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
        {/* title on image */}
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <h3 className="font-semibold drop-shadow">{title}</h3>
          {subtitle && <p className="text-xs opacity-90 line-clamp-1">{subtitle}</p>}
        </div>
      </div>

      {/* Meta */}
      <div className="p-3 text-sm text-muted-foreground flex items-center gap-3">
        {typeof questions === 'number' && <span>{questions} soal</span>}
        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
        {typeof duration === 'number' && <span>{duration} menit</span>}
      </div>
    </button>
  );
}
