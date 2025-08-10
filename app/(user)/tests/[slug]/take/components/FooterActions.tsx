'use client';

type Props = {
  canPrev: boolean;
  canNext: boolean; // tetap diterima buat info status terjawab
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  allowSkip?: boolean; // NEW: boleh lanjut tanpa jawab? default true
};

export default function FooterActions({
  canPrev,
  canNext,
  isLast,
  onPrev,
  onNext,
  onSubmit,
  disabled,
  allowSkip = true
}: Props) {
  // next button hanya disable kalau disabled=true
  // kecuali allowSkip=false, maka ikut aturan lama (harus sudah jawab)
  const nextDisabled = !!disabled || (!allowSkip && !canNext);

  return (
    <div className="mt-8 mb-6 flex items-center justify-between">
      <button
        onClick={onPrev}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!canPrev || !!disabled}
      >
        Sebelumnya
      </button>

      {isLast ? (
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!!disabled}
        >
          Kirim Jawaban
        </button>
      ) : (
        <button
          onClick={onNext}
          className={`px-4 py-2 rounded-lg text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed
            ${!canNext && allowSkip ? 'bg-primary/80' : 'bg-primary'}`}
          disabled={nextDisabled}
          title={!canNext && allowSkip ? 'Belum ada jawaban, tapi kamu bisa lanjut' : undefined}
        >
          Selanjutnya
        </button>
      )}
    </div>
  );
}
