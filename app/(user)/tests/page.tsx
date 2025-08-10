// app/(user)/tests/page.tsx
import Header from '../components/Header';
import TestList from './components/TestList';

// NOTE: sementara pakai data dummy. Nanti ganti ke fetch API.
async function getTests() {
  // TODO: ganti ke fetch dari backend (misal: /api/user/categories atau endpoint listing tes)
  // const res = await fetch(`${process.env.API_BASE_URL}/api/...`, { cache: 'no-store', headers: { ...auth }});
  // return await res.json();
  return [
    {
      id: 'cpns',
      title: 'Tes CPNS 2025',
      subtitle: 'TWK • TIU • TKP',
      badge: 'Populer',
      rating: 4.8,
      questions: 110,
      duration: 90,
      cover: '/assets/images/covers/cpns.jpg'
    },
    {
      id: 'pppk',
      title: 'Tes PPPK',
      subtitle: 'Kompetensi Teknis & Sosio Kultural',
      badge: 'Baru',
      rating: 4.6,
      questions: 80,
      duration: 75,
      cover: '/assets/images/covers/pppk.jpg'
    },
    {
      id: 'logika',
      title: 'Tes Logika',
      subtitle: 'Penalaran & Analitis',
      rating: 4.7,
      questions: 60,
      duration: 60,
      cover: '/assets/images/covers/logika.jpg'
    }
  ];
}

export default async function TestsPage() {
  const tests = await getTests();

  return (
    <>
      <Header title="Daftar Tes" variant="root" />
      <section className="max-w-[560px] mx-auto px-4 py-4">
        <TestList initialItems={tests} />
      </section>
    </>
  );
}
