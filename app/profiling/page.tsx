'use client';

import ProfilingStepper from './components/ProfilingStepper';
import { motion } from 'framer-motion';

export default function ProfilingPage() {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full"
      >
        <ProfilingStepper />
      </motion.div>
    </div>
  );
}
