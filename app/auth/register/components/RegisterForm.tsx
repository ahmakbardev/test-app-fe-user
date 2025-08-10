'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  onRegisterSuccess?: () => void;
};

export default function RegisterForm({ onRegisterSuccess }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);

  // Realtime validation
  useEffect(() => {
    if (name && name.length < 3) {
      setNameError('Name must be at least 3 characters.');
    } else {
      setNameError('');
    }

    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }

    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  }, [name, email, password]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (nameError || emailError || passwordError) {
      toast.error('Fix the errors before submitting.');
      return;
    }

    setLoading(true);

    // Simulasi registrasi sukses
    setTimeout(() => {
      setLoading(false);
      toast.success('Registration successful', {
        description: 'You can now login.'
      });

      // Panggil callback untuk menutup drawer dan buka login
      onRegisterSuccess?.();
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleRegister} className="space-y-4 w-full">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 w-full px-4 py-2 border border-input bg-white text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
        </div>

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
          />
          {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
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
          />
          {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? 'Registering...' : 'Register'}
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
        onClick={() => toast.info('Register with Google (dummy)')}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-muted text-muted-foreground font-medium rounded-md hover:bg-muted/70 transition-colors"
      >
        <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>
    </div>
  );
}
