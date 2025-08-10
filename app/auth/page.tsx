// app/(auth)/page.tsx
import AuthIllustration from './components/AuthIllustration';
import AuthDrawer from './components/AuthDrawer';

export default function AuthIndexPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-[500px] w-full mx-auto px-4 pb-5">
      <AuthIllustration />
      <AuthDrawer />
      {/* <p className="text-xs text-orange-500 mt-6 underline">Looking for help?</p> */}
    </div>
  );
}
