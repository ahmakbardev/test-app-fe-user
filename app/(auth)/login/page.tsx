import { redirect } from 'next/navigation';

export default function LoginPage() {
  redirect('/auth?mode=login');
  return null;
}
