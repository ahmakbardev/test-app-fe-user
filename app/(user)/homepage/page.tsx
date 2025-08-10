import Header from '../components/Header';
import HeroSection from './components/Hero';
import QuickTestActions from './components/QuickActions';
import RecommendedTestsList from './components/RecommendedList';

export default function Homepage() {
  return (
    <>
      <Header title="Test Center" variant="root" />
      <section className="max-w-[560px] mx-auto px-4 py-4 space-y-6">
        <HeroSection />
        <QuickTestActions />
        <RecommendedTestsList />
      </section>
    </>
  );
}