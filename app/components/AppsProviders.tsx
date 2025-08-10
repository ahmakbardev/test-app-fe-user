'use client';

import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

export default function AppProviders() {
  return (
    <>
      <NextTopLoader color="#f97316" height={3} showSpinner={false} />
      <Toaster
        position="top-center"
        richColors={true}
        toastOptions={{
          classNames: {
            toast: 'rounded-xl shadow-lg border'
          }
        }}
      />
    </>
  );
}
