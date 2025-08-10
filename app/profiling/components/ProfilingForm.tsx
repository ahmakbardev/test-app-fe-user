'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function ProfilingForm() {
  const [education, setEducation] = useState('');
  const [goal, setGoal] = useState('');
  const [preference, setPreference] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulasi simpan
    toast.success('Profil berhasil disimpan!', {
      description: 'Data kamu sudah tercatat dengan baik.'
    });

    // TODO: redirect
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow"
    >
      <h1 className="text-xl font-semibold text-primary text-center">Profiling Step</h1>
      <p className="text-sm text-muted-foreground text-center">
        Lengkapi data agar pengalaman belajar kamu makin cocok.
      </p>

      <div>
        <label className="block text-sm font-medium mb-1">Tingkat Pendidikan</label>
        <select
          className="w-full border border-input rounded-md px-4 py-2 bg-white"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        >
          <option value="">Pilih...</option>
          <option value="smp">SMP</option>
          <option value="sma">SMA/SMK</option>
          <option value="kuliah">Kuliah</option>
          <option value="umum">Umum</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tujuan Mengikuti Tes</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border border-input rounded-md px-4 py-2"
          placeholder="Contoh: Persiapan UTBK"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preferensi Belajar</label>
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          className="w-full border border-input rounded-md px-4 py-2"
          placeholder="Contoh: Belajar lewat video atau latihan soal"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Waktu Belajar per Hari</label>
        <input
          type="text"
          value={availableTime}
          onChange={(e) => setAvailableTime(e.target.value)}
          className="w-full border border-input rounded-md px-4 py-2"
          placeholder="Contoh: 1 jam sehari"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kebutuhan Khusus (Opsional)</label>
        <input
          type="text"
          value={specialNeeds}
          onChange={(e) => setSpecialNeeds(e.target.value)}
          className="w-full border border-input rounded-md px-4 py-2"
          placeholder="Contoh: Disleksia"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors"
      >
        Simpan dan Lanjut
      </button>
    </form>
  );
}
