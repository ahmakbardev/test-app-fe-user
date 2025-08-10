import BottomNav from './components/BottomNav';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background mx-auto w-full max-w-[500px] font-inter-tight">
      <main className="pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
