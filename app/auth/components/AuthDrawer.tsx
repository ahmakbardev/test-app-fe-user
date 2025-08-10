'use client';

import { Drawer } from 'vaul';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginForm from '../login/components/LoginForm';
import RegisterForm from '../register/components/RegisterForm';
import { toast } from 'sonner';

export default function AuthDrawer() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as 'login' | 'register' | null;

  const [view, setView] = useState<'login' | 'register'>('login');
  const [isOpen, setIsOpen] = useState(false);
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);

  const openDrawer = (target: 'login' | 'register') => {
    setView(target);
    setIsOpen(true);
  };

  const switchView = (target: 'login' | 'register') => {
    setIsOpen(false);
    setTimeout(() => {
      setView(target);
      setIsOpen(true);
    }, 300);
  };

  // Auto-open drawer sesuai query param ?mode=login / ?mode=register
  useEffect(() => {
    if (mode === 'login' || mode === 'register') {
      setView(mode);
      setIsOpen(true);
    }
  }, [mode]);

  return (
    <>
      {/* Bottom Sheet Card */}
      <div className="fixed inset-x-0 bottom-4 mx-auto w-screen max-w-[500px] px-4 sm:bottom-6">
        <div className="mx-auto w-full max-w-[500px] rounded-3xl bg-white/95 backdrop-blur shadow-xl ring-1 ring-black/5 px-5 pt-5 pb-4">
          <div className="space-y-3">
            {/* Primary CTA */}
            <button
              ref={drawerTriggerRef}
              onClick={() => openDrawer('register')}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-sm active:translate-y-[1px]"
            >
              Create new account
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => openDrawer('login')}
              className="w-full h-12 rounded-xl bg-neutral-100 text-foreground font-medium shadow-sm active:translate-y-[1px]"
            >
              I already have an account
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <span className="h-px flex-1 bg-neutral-200" />
            <span className="text-xs text-muted-foreground">or sign up with</span>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Social row (opsional, bisa di-hide kalau belum kepake) */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => toast.info('Register with Google (dummy)')}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-muted text-muted-foreground font-medium rounded-xl hover:bg-muted/70 transition-colors"
            >
              <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Root */}
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen} shouldScaleBackground>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/5 z-10" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[11] font-inter-tight rounded-t-[24px] bg-white px-6 pt-6 pb-10 max-h-[100%] w-full max-w-[500px] mx-auto animate-in slide-in-from-bottom duration-300">
            <Drawer.Title className="sr-only">
              {view === 'login' ? 'Login Page' : 'Register Page'}
            </Drawer.Title>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {view === 'login' ? 'Welcome Back!' : 'Getting Started'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {view === 'login'
                  ? 'Please enter your details to login.'
                  : 'Create account to continue!'}
              </p>
            </div>

            {view === 'login' ? (
              <LoginForm />
            ) : (
              <RegisterForm onRegisterSuccess={() => switchView('login')} />
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {view === 'login' ? (
                <>
                  Don’t have an account?{' '}
                  <button
                    className="text-primary font-medium"
                    onClick={() => switchView('register')}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button className="text-primary font-medium" onClick={() => switchView('login')}>
                    Sign in
                  </button>
                </>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
