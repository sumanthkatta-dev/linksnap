
import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, X, AlertCircle, Loader2 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { ScanResult, ViewMode } from './types';
import { analyzeResource } from './services/geminiService';
import { saveToStorage, getFromStorage, clearAllStorage, initializeStorage } from './services/storageService';
import Navbar from './components/Navbar';
import Uploader from './components/Uploader';
import AnalysisCard from './components/AnalysisCard';
import RegistryHeader from './components/RegistryHeader';
import CategoryFilters from './components/CategoryFilters';
import BookmarkItem from './components/BookmarkItem';
import Onboarding from './components/Onboarding';
import SettingsDrawer from './components/SettingsDrawer';

const App: React.FC = () => {
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<ScanResult | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBatchDeleteConfirm, setShowBatchDeleteConfirm] = useState(false);

  // Initialize storage and load data on app start
  useEffect(() => {
    // Initialize storage system
    initializeStorage();
    
    // Load history from secure storage
    const saved = getFromStorage<ScanResult[]>('history', []);
    if (saved && Array.isArray(saved)) {
      setHistory(saved);
    }

    // Load onboarding state
    const onboarded = getFromStorage<boolean>('onboarded', false);
    setShowOnboarding(!onboarded);
  }, []);

  // Save history to storage whenever it changes
  useEffect(() => {
    saveToStorage('history', history);
  }, [history]);

  const handleError = (err: any) => {
    const msg = err?.message || String(err);
    if (msg.includes("Requested entity was not found")) {
      setError("IDENTITY_ERROR: SELECTED_PROJECT_NOT_FOUND. PLEASE RE-LINK API KEY.");
      setIsSettingsOpen(true);
    } else {
      setError(`ANALYSIS_HALTED: ${msg.toUpperCase()}`);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("UPLOAD_ERROR: INVALID_TYPE");
      return;
    }

    setIsProcessing(true);
    setScanStep('INITIATING_NEURAL_LINK...');
    setError(null);
    setLastAnalyzed(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
      
      try {
        const result = await analyzeResource({ base64Data: base64 });
        const newEntry: ScanResult = {
          id: crypto.randomUUID(),
          ...result,
          timestamp: Date.now(),
          imageData: base64,
        };
        setLastAnalyzed(newEntry);
      } catch (err) {
        handleError(err);
      } finally {
        setIsProcessing(false);
        setScanStep('');
      }
    };
  };

  const handleUrlSubmit = async (url: string) => {
    if (!url) return;
    
    setIsProcessing(true);
    setScanStep('MAPPING_REMOTE_ASSET...');
    setError(null);
    setLastAnalyzed(null);
    setPreviewImage(null);

    try {
      const result = await analyzeResource({ url });
      const newEntry: ScanResult = {
        id: crypto.randomUUID(),
        ...result,
        timestamp: Date.now(),
      };
      setLastAnalyzed(newEntry);
    } catch (err) {
      handleError(err);
    } finally {
      setIsProcessing(false);
      setScanStep('');
    }
  };

  const finalizeSave = (updated: ScanResult) => {
    setHistory((prev) => [updated, ...prev]);
    setLastAnalyzed(null);
    setPreviewImage(null);
  };

  const clearHistory = () => {
    setHistory([]);
    setSelectedIds(new Set());
    clearAllStorage();
  };

  const executeBatchDelete = () => {
    setHistory(history.filter(i => !selectedIds.has(i.id)));
    setSelectedIds(new Set());
    setShowBatchDeleteConfirm(false);
  };

  const categories = useMemo(() => {
    const cats = new Set(history.map((item) => item.category));
    return ['All', ...Array.from(cats)].sort();
  }, [history]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const search = searchQuery.toLowerCase();
      const matchesSearch = item.url.toLowerCase().includes(search) || item.category.toLowerCase().includes(search);
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [history, searchQuery, selectedCategory]);

  const exportPDF = async () => {
    try {
      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text('LinkSnap Registry Export', 14, 22);
      doc.save(`LinkSnap_Registry_${Date.now()}.pdf`);
    } catch (err) { alert("EXPORT_FAILED"); }
  };

  const handleOnboardingComplete = () => {
    saveToStorage('onboarded', true);
    setShowOnboarding(false);
  };

  if (showOnboarding === null) return null;

  return (
    <div className="min-h-screen pb-48 pt-safe">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      
      <Navbar onOpenSettings={() => setIsSettingsOpen(true)} />
      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onClearHistory={clearHistory}
      />

      {/* Batch Delete Confirmation Modal */}
      {showBatchDeleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-nt-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowBatchDeleteConfirm(false)} />
          <div className="relative glass-nothing squircle p-10 max-w-sm w-full text-center space-y-8 animate-ios border-nt-red/30 shadow-[0_0_80px_rgba(215,25,33,0.15)]">
             <div className="w-16 h-16 bg-nt-red/10 border border-nt-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-nt-red" />
             </div>
             <div className="space-y-4">
               <h2 className="text-xl font-dot tracking-[0.2em] text-nt-white uppercase">Confirm Purge</h2>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                 You are about to permanently remove {selectedIds.size} entities from the registry. This action cannot be undone.
               </p>
             </div>
             <div className="flex flex-col gap-3 pt-4">
               <button 
                 onClick={executeBatchDelete}
                 className="w-full h-14 bg-nt-red text-nt-white font-dot uppercase tracking-[0.3em] text-[10px] glitch-btn shadow-xl"
               >
                 Confirm Deletion
               </button>
               <button 
                 onClick={() => setShowBatchDeleteConfirm(false)}
                 className="w-full h-14 border border-white/10 text-white/40 font-dot uppercase tracking-[0.3em] text-[10px] hover:text-nt-white transition-colors"
               >
                 Abort Mission
               </button>
             </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 md:px-8 mt-12 md:mt-20 space-y-16 md:space-y-28">
        <header className="text-left space-y-4 md:space-y-6 max-w-3xl animate-ios">
          <div className="flex items-center gap-4 mb-2">
            <div className="dot-pulse"></div>
            <span className="text-[9px] md:text-[10px] font-bold text-nt-red tracking-[0.5em] uppercase">Version_1.0</span>
          </div>
          <h1 className="text-5xl md:text-9xl font-dot tracking-widest text-nt-white uppercase leading-[0.9] border-l-4 border-nt-red pl-6 md:pl-8">
            LINKSNAP
          </h1>
          <p className="text-white/30 text-xs md:text-base font-bold uppercase tracking-[0.4em] max-w-xl">
            The smartest way to save links. Powered by visual intelligence.
          </p>
        </header>

        {error && (
          <div className="border-2 border-nt-red p-6 md:p-8 rounded-3xl flex items-center gap-4 md:gap-6 text-nt-red bg-nt-red/5 animate-pulse">
            <AlertCircle className="w-6 h-6 md:w-8 md:h-8" />
            <p className="text-[10px] md:text-sm font-dot tracking-widest uppercase flex-1">{error}</p>
            <button onClick={() => setError(null)} className="hover:scale-125 transition-transform"><X className="w-5 h-5 md:w-6 md:h-6"/></button>
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          <div className={`lg:col-span-${isProcessing || lastAnalyzed ? '6' : '12'} transition-all duration-700`}>
            <Uploader
              onUpload={handleFileUpload}
              onUrlSubmit={handleUrlSubmit}
              isProcessing={isProcessing}
              previewImage={previewImage}
              scanStep={scanStep}
              onClear={() => { setPreviewImage(null); setLastAnalyzed(null); }}
            />
          </div>
          {(isProcessing || lastAnalyzed) && (
            <div className="lg:col-span-6 min-h-[400px] md:min-h-[480px]">
              {isProcessing ? (
                <div className="glass-nothing squircle p-8 md:p-12 h-full flex flex-col items-center justify-center space-y-8 md:space-y-10 border-nt-red/30">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 md:w-20 md:h-20 text-nt-red animate-spin" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-nt-white rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-nt-white font-dot uppercase tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm">{scanStep}</p>
                    <p className="text-white/20 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em]">Querying High-Precision Nodes</p>
                  </div>
                </div>
              ) : (
                <AnalysisCard
                  result={lastAnalyzed!}
                  onKeep={finalizeSave}
                  onDiscard={() => { setLastAnalyzed(null); setPreviewImage(null); }}
                />
              )}
            </div>
          )}
        </section>

        <section className="space-y-8 md:space-y-14">
          <RegistryHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onExport={exportPDF}
          />
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <section className="animate-ios" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-12">
            <div className="w-2.5 h-2.5 rounded-full bg-nt-red shadow-[0_0_15px_#D71921]"></div>
            <h3 className="text-[10px] md:text-sm font-dot text-white/40 uppercase tracking-[0.4em] md:tracking-[0.6em]">
              Archive_Index // {filteredHistory.length} ENTITIES_CATALOGED
            </h3>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10' : 'space-y-4 md:space-y-6'}>
            {filteredHistory.map((item) => (
              <BookmarkItem
                key={item.id}
                item={item}
                viewMode={viewMode}
                isSelected={selectedIds.has(item.id)}
                onSelect={(id) => {
                  const next = new Set(selectedIds);
                  if (next.has(id)) next.delete(id); else next.add(id);
                  setSelectedIds(next);
                }}
                onDelete={(id) => {
                   if(confirm("PERMANENT_REMOVAL: CONFIRM?")) {
                     setHistory(history.filter(i => i.id !== id));
                   }
                }}
              />
            ))}
          </div>
        </section>
      </main>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl animate-ios pb-safe">
          <div className="bg-nt-white p-4 md:p-7 rounded-full flex items-center justify-between border-[4px] md:border-[6px] border-nt-black shadow-[0_0_60px_rgba(215,25,33,0.3)]">
            <div className="flex items-center gap-4 md:gap-8 pl-4 md:pl-8">
              <span className="text-nt-black font-dot text-xl md:text-2xl">{selectedIds.size}</span>
              <span className="text-[9px] md:text-[11px] font-bold text-nt-black uppercase tracking-[0.2em] md:tracking-[0.4em]">Objects_Marked</span>
            </div>
            <div className="flex gap-2 md:gap-4">
               <button
                onClick={() => setSelectedIds(new Set())}
                className="bg-nt-black text-nt-white px-5 md:px-8 py-3 md:py-4 rounded-full text-[8px] md:text-[10px] font-dot uppercase tracking-widest hover:bg-nt-gray transition-all"
              >
                Abort
              </button>
              <button
                onClick={() => setShowBatchDeleteConfirm(true)}
                className="bg-nt-red text-nt-white px-6 md:px-10 py-3 md:py-4 rounded-full text-[8px] md:text-[10px] font-dot uppercase tracking-[0.2em] md:tracking-[0.3em] hover:invert transition-all"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Left Side */}
            <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]">
              DEV: <span className="text-nt-red">SUMANTH KATTA</span>
            </div>

            {/* Center */}
            <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-center whitespace-nowrap">
              STACK: REACT // TYPESCRIPT // TAILWIND // VITE // GEMINI_API
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6">
              <a
                href="https://github.com/sumanthkatta-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] border border-white/30 px-3 md:px-4 py-2 hover:border-nt-red hover:text-nt-red transition-colors"
              >
                [GITHUB]
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
};

export default App;
