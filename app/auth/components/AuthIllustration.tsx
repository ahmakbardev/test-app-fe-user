export default function AuthIllustration() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center px-6 pt-10">
      {/* optional: background image section – tinggal pasang di parent page */}
      <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-5">
        <img src="/assets/logo/logo_black.png" alt="App Logo" className="w-12 h-12" />
      </div>

      <h1 className="text-[28px] leading-tight font-extrabold text-foreground tracking-tight">
        TESTAPP
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Online Test &amp; Learning Platform</p>
    </div>
  );
}
