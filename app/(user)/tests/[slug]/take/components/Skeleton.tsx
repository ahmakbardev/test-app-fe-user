'use client';

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className = '', ...rest }: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-200/80 dark:bg-zinc-800/60 ${className}`}
      {...rest}
    >
      {/* shimmer overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer
                   bg-gradient-to-r from-transparent via-white/70 to-transparent
                   dark:via-white/10"
      />
    </div>
  );
}
