
import React, { useState } from 'react';
import { RPPInput, Jenjang } from '../types';

interface RPPFormProps {
  onGenerate: (data: RPPInput) => void;
  isLoading: boolean;
}

const JENJANG_OPTIONS: Jenjang[] = ['TK', 'SD', 'SMP', 'SMA', 'SMK'];

const RPPForm: React.FC<RPPFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<RPPInput>({
    jenjang: 'SD',
    mataPelajaran: '',
    kelas: '',
    semester: '1',
    materiPokok: '',
    alokasiWaktu: '2 x 35 Menit',
    cp: '',
    tujuanTambahan: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Form Pembuatan RPP</h2>
          <p className="text-slate-500">Lengkapi data untuk generate RPP otomatis.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Jenjang Pendidikan</label>
            <div className="flex flex-wrap gap-2">
              {JENJANG_OPTIONS.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, jenjang: opt }))}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${formData.jenjang === opt ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Mata Pelajaran</label>
            <input 
              required
              name="mataPelajaran"
              value={formData.mataPelajaran}
              onChange={handleChange}
              placeholder="Contoh: Matematika, Bahasa Indonesia"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Kelas</label>
            <input 
              required
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              placeholder="Contoh: 4, VII, X-A"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Semester</label>
            <select 
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            >
              <option value="1">Ganjil (1)</option>
              <option value="2">Genap (2)</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Materi Pokok</label>
            <input 
              required
              name="materiPokok"
              value={formData.materiPokok}
              onChange={handleChange}
              placeholder="Contoh: Perkalian Bilangan Cacah, Teks Eksposisi"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Capaian Pembelajaran (CP)</label>
            <textarea 
              required
              name="cp"
              rows={4}
              value={formData.cp}
              onChange={handleChange}
              placeholder="Tempelkan atau ketik elemen CP dari Kemendikbud di sini..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Alokasi Waktu</label>
            <input 
              required
              name="alokasiWaktu"
              value={formData.alokasiWaktu}
              onChange={handleChange}
              placeholder="Contoh: 2 x 35 Menit"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Tujuan Tambahan (Opsional)</label>
            <input 
              name="tujuanTambahan"
              value={formData.tujuanTambahan}
              onChange={handleChange}
              placeholder="Contoh: Menggunakan media video, fokus pada diskusi kelompok"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isLoading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98]'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyusun RPP Cerita...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 14 6 6 8-14"/></svg>
                Generate RPP Sekarang
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-4">Proses ini memakan waktu sekitar 10-20 detik menggunakan AI Gemini.</p>
        </div>
      </form>
    </div>
  );
};

export default RPPForm;
