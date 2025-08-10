'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useMemo } from 'react';

type StackProps = PropsWithChildren<{
  index: number;
  count: number;
  onNext: () => void;
  onPrev: () => void;
  height?: number;
}>;

export function CardStack({ index, height = 260, children }: StackProps) {
  const items = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
  const active = items[index];

  return (
    <div className="relative w-full max-w-[360px]" style={{ height }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -24, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="absolute inset-0 rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-5"
        >
          {active}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
