'use client';

import Image from 'next/image';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

type Props = {
  title: string;
  /**
   * 'auto'  : deteksi dari kedalaman segmen route
   * 'root'  : homepage (logo kiri, avatar kanan)
   * 'child' : halaman turunan (back kiri, kanan kosong)
   */
  variant?: 'auto' | 'root' | 'child';
  /** konten sisi kiri ketika di mode root (default = logo) */
  leftSlot?: React.ReactNode;
  /** avatar untuk sisi kanan (mode root) */
  avatarUrl?: string;
  /** path logo default (sisi kiri, mode root) */
  logoSrc?: string;
};

export default function Header({
  title,
  variant = 'auto',
  leftSlot,
  avatarUrl = '/assets/images/user/default.png',
  logoSrc = '/assets/logo/logo_black.png'
}: Props) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  // contoh: (user)/homepage -> ['homepage']; (user)/homepage/child -> ['homepage','child']
  const isChildByDepth = segments.length > 1;
  const mode = variant === 'auto' ? (isChildByDepth ? 'child' : 'root') : variant;

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
      {/* grid: kiri (auto) - tengah (1fr) - kanan (auto) */}
      <div className="h-16 max-w-[560px] mx-auto px-4 grid grid-cols-[auto,1fr,auto] items-center gap-3">
        {/* KIRI */}
        <div className="min-w-0">
          {mode === 'child' ? (
            <button
              onClick={() => router.back()}
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted active:scale-[0.98]"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            // mode root: pakai leftSlot jika ada, kalau tidak tampilkan logo
            (leftSlot ?? (
              <div className="h-9 w-9 flex items-center justify-center">
                <img src={logoSrc} alt="App Logo" className="w-7 h-7 object-contain" />
              </div>
            ))
          )}
        </div>

        {/* TENGAH: Title selalu center */}
        <h1 className="text-base sm:text-lg font-semibold text-center truncate">{title}</h1>

        {/* KANAN */}
        <div className="flex items-center justify-end">
          {mode === 'root' ? (
            <div className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-black/5 bg-muted">
              <Image
                src={avatarUrl}
                alt="Profile"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            // spacer agar title tetap center saat di child
            <div className="h-9 w-9" />
          )}
        </div>
      </div>
    </header>
  );
}
