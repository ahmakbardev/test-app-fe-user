import Header from '../components/Header';
import Categories from './components/Categories';
import Hero from './components/Hero';
import QuickTestActions from './components/QuickActions';
import Recent from './components/Recent';
import SearchBar from './components/SearchBar';

export default function Homepage() {
  return (
    <>
      <Header title="Test Center" variant="root" />
      <section className="max-w-[560px] mx-auto px-4 py-4 space-y-6">
        <SearchBar />
        <Hero />
        <QuickTestActions />
        <Categories />
        <Recent />
      </section>
    </>
  );
}