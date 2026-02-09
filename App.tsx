
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RPPForm from './components/RPPForm';
import RPPHistory from './components/RPPHistory';
import RPPPreview from './components/RPPPreview';
import { generateRPP } from './services/geminiService';
import { View, RPPInput, SavedRPP } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [history, setHistory] = useState<SavedRPP[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRPP, setSelectedRPP] = useState<SavedRPP | null>(null);

  // Load history from local storage
  useEffect(() => {
    const saved = localStorage.getItem('edupalan_rpp_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    localStorage.setItem('edupalan_rpp_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (data: RPPInput) => {
    setIsLoading(true);
    try {
      const generatedContent = await generateRPP(data);
      const newRPP: SavedRPP = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        input: data,
        content: generatedContent
      };
      
      setHistory(prev => [newRPP, ...prev]);
      setSelectedRPP(newRPP);
      setActiveView('detail');
    } catch (error) {
      console.error("Error generating RPP:", error);
      alert("Terjadi kesalahan saat membuat RPP. Silakan coba lagi. Pastikan koneksi internet stabil.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRPP = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (selectedRPP?.id === id) {
      setSelectedRPP(null);
      setActiveView('history');
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            history={history} 
            setView={setActiveView} 
            onSelectRPP={(rpp) => {
              setSelectedRPP(rpp);
              setActiveView('detail');
            }}
          />
        );
      case 'create':
        return <RPPForm onGenerate={handleGenerate} isLoading={isLoading} />;
      case 'history':
        return (
          <RPPHistory 
            history={history} 
            onSelect={(rpp) => {
              setSelectedRPP(rpp);
              setActiveView('detail');
            }}
            onDelete={handleDeleteRPP}
          />
        );
      case 'detail':
        return selectedRPP ? (
          <RPPPreview rpp={selectedRPP} onBack={() => setActiveView('history')} />
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500">Dokumen tidak ditemukan.</p>
            <button onClick={() => setActiveView('dashboard')} className="text-blue-600 mt-4">Kembali ke Dashboard</button>
          </div>
        );
      default:
        return <Dashboard history={history} setView={setActiveView} onSelectRPP={setSelectedRPP} />;
    }
  };

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
