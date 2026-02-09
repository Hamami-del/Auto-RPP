
import React from 'react';
import { RPPContent, SavedRPP } from '../types';

interface RPPPreviewProps {
  rpp: SavedRPP;
  onBack: () => void;
}

const RPPPreview: React.FC<RPPPreviewProps> = ({ rpp, onBack }) => {
  const { content } = rpp;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in zoom-in-95 duration-500">
      <div className="no-print flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm sticky top-4 z-40">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          Kembali
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Cetak / PDF
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-md p-8 md:p-16 min-h-[1000px] text-slate-800" id="printable-rpp">
        <header className="text-center mb-10 space-y-2 border-b-2 border-slate-900 pb-6">
          <h1 className="text-2xl font-bold uppercase">Rencana Pelaksanaan Pembelajaran (RPP)</h1>
          <h2 className="text-xl font-bold uppercase">Kurikulum Merdeka</h2>
        </header>

        {/* 1. IDENTITAS */}
        <section className="mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-sm rounded-full">1</span>
            IDENTITAS MODUL
          </h3>
          <div className="grid grid-cols-[150px_1fr] gap-y-2 text-sm leading-relaxed ml-8">
            <span className="font-semibold">Mata Pelajaran</span>
            <span>: {content.identitas.mataPelajaran}</span>
            <span className="font-semibold">Kelas / Semester</span>
            <span>: {content.identitas.kelasSemester}</span>
            <span className="font-semibold">Materi Pokok</span>
            <span>: {content.identitas.materiPokok}</span>
            <span className="font-semibold">Alokasi Waktu</span>
            <span>: {content.identitas.alokasiWaktu}</span>
          </div>
        </section>

        {/* 2. TUJUAN PEMBELAJARAN */}
        <section className="mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-sm rounded-full">2</span>
            TUJUAN PEMBELAJARAN
          </h3>
          <ul className="list-disc ml-14 space-y-1 text-sm">
            {content.tujuanPembelajaran.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </section>

        {/* 3. MATERI & METODE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <section>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
              <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-sm rounded-full">3</span>
              MATERI PEMBELAJARAN
            </h3>
            <p className="ml-8 text-sm">{content.materiPembelajaran}</p>
          </section>
          <section>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
              <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-sm rounded-full">4</span>
              METODE & MEDIA
            </h3>
            <div className="ml-8 text-sm space-y-2">
              <p><span className="font-semibold">Metode:</span> {content.metodePembelajaran}</p>
              <div>
                <span className="font-semibold">Media:</span>
                <ul className="list-circle ml-4 mt-1">
                  {content.mediaPembelajaran.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* 4. LANGKAH-LANGKAH PEMBELAJARAN */}
        <section className="mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-sm rounded-full">5</span>
            KEGIATAN PEMBELAJARAN
          </h3>
          
          <div className="ml-8 space-y-6">
            <div>
              <h4 className="font-bold text-blue-800 mb-2 border-l-4 border-blue-600 pl-3">Pendahuluan (Apersepsi)</h4>
              <ul className="list-decimal ml-8 space-y-1 text-sm">
                {content.langkahPembelajaran.pendahuluan.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-blue-800 mb-2 border-l-4 border-blue-600 pl-3">Kegiatan Inti</h4>
              <ul className="list-decimal ml-8 space-y-1 text-sm">
                {content.langkahPembelajaran.inti.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-blue-800 mb-2 border-l-4 border-blue-600 pl-3">Penutup</h4>
              <ul className="list-decimal ml-8 space-y-1 text-sm">
                {content.langkahPembelajaran.penutup.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. ASESMEN */}
        <section className="mb-12">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-1">
            <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center text-sm rounded-full">6</span>
            ASESMEN (PENILAIAN)
          </h3>
          <div className="ml-8 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-3 text-left">Aspek</th>
                  <th className="p-3 text-left">Teknik / Instrumen</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-semibold">Sikap</td>
                  <td className="p-3">{content.asesmen.sikap}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3 font-semibold">Pengetahuan</td>
                  <td className="p-3">{content.asesmen.pengetahuan}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Keterampilan</td>
                  <td className="p-3">{content.asesmen.keterampilan}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tanda Tangan */}
        <div className="grid grid-cols-2 gap-10 mt-20 text-sm">
          <div className="text-center">
            <p>Mengetahui,</p>
            <p className="mb-20">Kepala Sekolah</p>
            <div className="border-b border-slate-800 w-48 mx-auto"></div>
            <p className="mt-1">NIP. ................................</p>
          </div>
          <div className="text-center">
            <p>Jakarta, {new Date(rpp.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="mb-20">Guru Mata Pelajaran</p>
            <div className="border-b border-slate-800 w-48 mx-auto"></div>
            <p className="mt-1">NIP. ................................</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPPPreview;
