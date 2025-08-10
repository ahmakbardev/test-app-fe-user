import AuthIllustration from './components/AuthIllustration';
import AuthDrawer from './components/AuthDrawer';

export default function AuthIndexPage({ searchParams }: { searchParams: { mode?: string } }) {
  const initialMode =
    searchParams.mode === 'login' || searchParams.mode === 'register'
      ? (searchParams.mode as 'login' | 'register')
      : 'login';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[500px] w-full mx-auto px-4 pb-5">
      <AuthIllustration />
      <AuthDrawer initialMode={initialMode} />
    </div>
  );
}
