
import React from 'react';
import { View, SavedRPP } from '../types';

interface DashboardProps {
  history: SavedRPP[];
  setView: (view: View) => void;
  onSelectRPP: (rpp: SavedRPP) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, setView, onSelectRPP }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang, Bapak/Ibu Guru 👋</h2>
        <p className="text-slate-500">Apa yang ingin Anda susun hari ini?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Buat Baru</h3>
            <p className="text-slate-500 text-sm mt-1">Susun RPP Kurikulum Merdeka dalam hitungan detik.</p>
          </div>
          <button 
            onClick={() => setView('create')}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-colors"
          >
            Mulai Sekarang
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Total RPP</h3>
            <p className="text-slate-500 text-sm mt-1">Anda telah membuat {history.length} dokumen RPP.</p>
          </div>
          <button 
            onClick={() => setView('history')}
            className="mt-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-xl transition-colors"
          >
            Lihat Riwayat
          </button>
        </div>

        <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200 flex flex-col justify-between text-white">
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-50">Tips Guru Cerdas</h3>
            <p className="text-blue-100 text-sm leading-relaxed italic">"Gunakan deskripsi Capaian Pembelajaran yang jelas agar AI memberikan langkah pembelajaran yang lebih akurat."</p>
          </div>
          <div className="text-xs text-blue-200 mt-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Kurikulum Merdeka 2024
          </div>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-bold text-xl text-slate-800">Riwayat Terakhir</h3>
          <button onClick={() => setView('history')} className="text-blue-600 text-sm font-medium hover:underline">Lihat Semua</button>
        </div>
        
        {history.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.slice(0, 4).map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectRPP(item)}
                className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider">{item.input.jenjang}</span>
                  <span className="text-slate-400 text-xs">{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{item.input.materiPokok}</h4>
                <p className="text-sm text-slate-500 mt-1">{item.input.mataPelajaran} - Kelas {item.input.kelas}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-100 rounded-2xl py-12 text-center text-slate-400">
             <p>Belum ada riwayat RPP.</p>
             <button onClick={() => setView('create')} className="text-blue-600 font-medium mt-2">Buat RPP Pertamamu</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
