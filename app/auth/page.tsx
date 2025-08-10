// app/(auth)/page.tsx
import AuthIllustration from './components/AuthIllustration';
import AuthDrawer from './components/AuthDrawer';

export default async function AuthIndexPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const m = sp.mode;
  const initialMode = m === 'login' || m === 'register' ? (m as 'login' | 'register') : 'login';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[500px] w-full mx-auto px-4 pb-5">
      <AuthIllustration />
      <AuthDrawer initialMode={initialMode} />
    </div>
  );
}
