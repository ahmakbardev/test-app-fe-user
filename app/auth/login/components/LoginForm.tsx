'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email === 'admin@demo.com' && password === 'password') {
        toast.success('Login success', {
          description: 'You are now logged in!'
        });

        // ⏩ Redirect ke profiling page
        router.push('/profiling');
      } else {
        toast.error('Login failed', {
          description: 'Invalid credentials.'
        });
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full px-4 py-2 border border-input bg-white text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 w-full px-4 py-2 border border-input bg-white text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground uppercase">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={() => toast.info('Login with Google (dummy)')}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-muted text-muted-foreground font-medium rounded-md hover:bg-muted/70 transition-colors"
      >
        <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}
