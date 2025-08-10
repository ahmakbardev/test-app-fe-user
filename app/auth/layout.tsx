import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[500px] font-inter-tight  bg-background">{children}</div>
    </div>
  );
}
