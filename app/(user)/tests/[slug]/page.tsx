'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import DetailHero from './components/DetailHero';
import InfoChips from './components/InfoChips';
import PurchaseBar from './components/PurchaseBar';

type TestDetail = {
  slug: string;
  title: string;
  coverUrl: string;
  price: number; // 0 = gratis
  rating: number; // 0-5
  category: string; // CPNS / PPPK / dll
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: number;
  durationMin: number;
  description: string;
};

function getDummyDetail(slug: string): TestDetail {
  return {
    slug,
    title: 'Tryout CPNS SKD 2025 – Paket A',
    coverUrl: '/assets/images/tests/cpns-a.jpg',
    price: 45000,
    rating: 4.8,
    category: 'CPNS',
    level: 'Intermediate',
    questions: 110,
    durationMin: 100,
    description:
      'Paket latihan SKD format CAT. Soal HOTS, pembahasan ringkas, dan update kisi terbaru. Cocok untuk simulasi waktu nyata.'
  };
}

export default function TestDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const detail = useMemo(() => getDummyDetail(slug), [slug]);

  // --- purchase state (dummy) ---
  const storageKey = `purchase:tests:${slug}`;
  const [purchased, setPurchased] = useState(false);

  // bedakan: checking (cek status awal) vs actionLoading (proses bayar/klaim)
  const [statusLoading, setStatusLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // cek status pembelian saat mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      // simulasi delay fetch status
      await new Promise((r) => setTimeout(r, 500));
      const saved = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      if (!mounted) return;
      setPurchased(saved === '1');
      setStatusLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [storageKey]);

  const handleBuy = async () => {
    setActionLoading(true);
    // simulasi proses pembayaran
    await new Promise((r) => setTimeout(r, 900));
    localStorage.setItem(storageKey, '1');
    setPurchased(true);
    setActionLoading(false);
  };

  const handleStart = () => {
    // ke halaman intro terlebih dulu
    router.push(`/tests/${slug}/start`);
  };

  return (
    <>
      <Header title="Detail Tes" variant="child" />

      <main className="max-w-[560px] mx-auto pb-24">
        <DetailHero title={detail.title} coverUrl={detail.coverUrl} rating={detail.rating} />

        <section className="px-4 py-4 space-y-6">
          <InfoChips
            category={detail.category}
            level={detail.level}
            questions={detail.questions}
            durationMin={detail.durationMin}
          />

          <article className="rounded-2xl border border-border p-4 bg-white">
            <h2 className="font-semibold mb-2">Deskripsi</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{detail.description}</p>
          </article>

          <article className="rounded-2xl border border-border p-4 bg-white">
            <h3 className="font-semibold mb-3">Yang kamu dapat</h3>
            <ul className="grid gap-2 text-sm text-muted-foreground">
              <li>• Akses 1x simulasi CAT ({detail.durationMin} menit)</li>
              <li>• Skoring otomatis + waktu pengerjaan</li>
              <li>• Riwayat hasil & detail jawaban</li>
              <li>• Pembahasan ringkas per soal (coming soon)</li>
            </ul>
          </article>

          {/* Purchase / Start */}
          <div className="pt-2">
            <PurchaseBar
              price={detail.price}
              purchased={purchased}
              checking={statusLoading} // loading awal (cek status)
              loading={actionLoading} // loading aksi (bayar/klaim)
              onBuy={handleBuy}
              onStart={handleStart}
              // triggerLabel="Ambil Paket" // optional override label
            />
          </div>
        </section>
      </main>
    </>
  );
}
