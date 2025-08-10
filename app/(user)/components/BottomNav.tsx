'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpenCheck, Clock3, User } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  { label: 'Home', href: '/homepage', icon: Home },
  { label: 'Tes', href: '/tests', icon: BookOpenCheck },
  { label: 'Histori', href: '/(user)/history', icon: Clock3 },
  { label: 'Profil', href: '/(user)/profile', icon: User }
];

export default function BottomNav() {
  const pathname = usePathname();
  const hide =
    pathname?.includes('/tests/') && (pathname?.includes('/take') || pathname?.includes('/start'));

  // Hide nav kalau sedang di halaman take test
  if (hide) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== '/(user)' && pathname?.startsWith(href));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30">
      <div className="mx-auto w-full max-w-[500px] px-4 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div className="relative rounded-2xl bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/5 h-16 grid grid-cols-4">
          {items.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className="relative flex items-center justify-center"
              >
                {active && (
                  <motion.div
                    layoutId="navHighlight"
                    className="absolute inset-1 rounded-xl bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center gap-1">
                  <Icon
                    className={`h-5 w-5 ${active ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                  <span
                    className={`text-[11px] leading-none ${
                      active ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
