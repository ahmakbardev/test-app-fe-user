'use client';

import { useMemo } from 'react';
import { Drawer } from 'vaul';

type PurchaseBarProps = {
  price: number;
  purchased: boolean;
  loading: boolean; // loading aksi bayar/klaim
  checking?: boolean; // loading cek status pembelian
  onBuy: () => void;
  onStart: () => void;
  triggerLabel?: string;
};

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.25"
      />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  );
}

export default function PurchaseBar({
  price,
  purchased,
  loading,
  checking = false,
  onBuy,
  onStart,
  triggerLabel
}: PurchaseBarProps) {
  const priceText = useMemo(
    () => (price > 0 ? `Rp ${Intl.NumberFormat('id-ID').format(price)}` : 'Gratis'),
    [price]
  );

  // 1) Sedang cek status (awal render)
  if (checking) {
    return (
      <button
        type="button"
        disabled
        aria-busy="true"
        className="h-11 w-full rounded-xl bg-muted text-muted-foreground/70 font-medium flex items-center justify-center gap-2"
      >
        <Spinner />
        Memuat status…
      </button>
    );
  }

  // 2) Sudah kebeli
  if (purchased) {
    return (
      <button
        type="button"
        onClick={onStart}
        className="h-11 w-full rounded-xl bg-black text-white font-medium active:scale-[0.99]"
      >
        Mulai Tes
      </button>
    );
  }

  // 3) Belum kebeli
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild className="font-inter-tight">
        <button
          type="button"
          className="h-11 w-full rounded-xl bg-primary text-primary-foreground font-medium active:scale-[0.99] disabled:opacity-60"
          disabled={loading}
          aria-haspopup="dialog"
          aria-expanded="false"
        >
          {loading
            ? 'Memproses…'
            : (triggerLabel ?? (price > 0 ? 'Beli Sekarang' : 'Klaim Gratis'))}
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 font-inter-tight bottom-0 z-50 rounded-t-2xl bg-white shadow-2xl">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted-foreground/20" />

          <div className="mx-auto w-full max-w-[560px] p-4 pb-6">
            <Drawer.Title className="text-base font-semibold">Konfirmasi Pembelian</Drawer.Title>
            <Drawer.Description className="mt-1 text-sm text-muted-foreground">
              Akses paket ini dan mulai latihan sekarang juga.
            </Drawer.Description>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-border p-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground leading-none">Harga</div>
                <div className="text-lg font-semibold">{priceText}</div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                {price > 0 ? 'Termasuk update konten' : 'Tanpa biaya'}
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-muted-foreground">
              <p>• Pembayaran aman dan instan.</p>
              <p>• Akses langsung setelah transaksi berhasil.</p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Drawer.Close asChild>
                <button
                  type="button"
                  className="h-11 flex-1 rounded-xl border border-input bg-white text-foreground font-medium active:scale-[0.99]"
                >
                  Batal
                </button>
              </Drawer.Close>

              <button
                type="button"
                onClick={onBuy}
                disabled={loading}
                className="h-11 flex-1 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-60 active:scale-[0.99] inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Spinner /> Memproses…
                  </>
                ) : price > 0 ? (
                  'Bayar & Dapatkan'
                ) : (
                  'Klaim Sekarang'
                )}
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
