import { redirect } from 'next/navigation';

export default function RegisterPage() {
  redirect('/auth?mode=register');
  return null;
}
