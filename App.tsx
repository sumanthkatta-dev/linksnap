
import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, X, AlertCircle, Info, FolderInput, Loader2 } from 'lucide-react';
import { ScanResult, ViewMode } from './types';
import { analyzeScreenshot } from './services/geminiService';
import Navbar from './components/Navbar';
import Uploader from './components/Uploader';
import AnalysisCard from './components/AnalysisCard';
import RegistryHeader from './components/RegistryHeader';
import CategoryFilters from './components/CategoryFilters';
import BookmarkItem from './components/BookmarkItem';

const App: React.FC = () => {
  // --- State ---
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<ScanResult | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkCategoryMenuOpen, setIsBulkCategoryMenuOpen] = useState(false);

  // --- Initialization & Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem('linksnap_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch (e) { console.error("History parse error", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('linksnap_history', JSON.stringify(history));
  }, [history]);

  // --- Handlers ---
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (PNG/JPG).");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setLastAnalyzed(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
      try {
        const result = await analyzeScreenshot(base64);
        
        const isGenericPlatform = result.url.toLowerCase().includes('youtube.com') || 
                                  result.url.toLowerCase().includes('instagram.com');
        
        const newEntry: ScanResult = {
          id: crypto.randomUUID(),
          ...result,
          timestamp: Date.now(),
          imageData: base64
        };
        
        setHistory(prev => [newEntry, ...prev]);
        setLastAnalyzed(newEntry);
        
        if (isGenericPlatform) {
          setError("AI identified the host platform. We recommend a closer crop of the featured content.");
        }
      } catch (err) {
        setError("Analysis failed. Our vision models couldn't process this image.");
      } finally {
        setIsProcessing(false);
      }
    };
  };

  const deleteItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (lastAnalyzed?.id === id) setLastAnalyzed(null);
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    if (confirm(`Permanently remove ${selectedIds.size} items?`)) {
      setHistory(prev => prev.filter(item => !selectedIds.has(item.id)));
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  // --- Memoized Data ---
  const categories = useMemo(() => {
    const cats = new Set(history.map(item => item.category));
    return ['All', ...Array.from(cats)].sort();
  }, [history]);

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const search = searchQuery.toLowerCase();
      const matchesSearch = item.url.toLowerCase().includes(search) ||
                          item.description.toLowerCase().includes(search) ||
                          item.category.toLowerCase().includes(search);
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [history, searchQuery, selectedCategory]);

  const exportPDF = async () => {
    try {
      const { jsPDF } = (window as any).jspdf || await import('jspdf');
      const doc = new jsPDF();
      doc.text('LinkSnap Registry Export', 14, 22);
      const tableData = filteredHistory.map(item => [new Date(item.timestamp).toLocaleDateString(), item.url, item.category, item.description]);
      (doc as any).autoTable({
        head: [['Date', 'Source URL', 'Category', 'Description']],
        body: tableData,
        startY: 35,
      });
      doc.save('LinkSnap-Registry.pdf');
    } catch (err) { alert("Export engine unavailable."); }
  };

  return (
    <div className="min-h-screen pb-48 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12 md:space-y-20">
        <header className="text-center space-y-4 animate-ios">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ls-beige">Registry</h1>
          <p className="text-ls-muted text-base md:text-lg max-w-lg mx-auto font-medium opacity-70">
            Intelligent capture that isolates tools from their social containers.
          </p>
        </header>

        {error && (
          <div className="max-w-xl mx-auto glass-ios border-ls-blue/20 p-4 rounded-2xl flex items-center gap-3 text-ls-beige animate-ios">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto opacity-50"><X className="w-4 h-4" /></button>
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-ios">
          <div className={`lg:col-span-${(isProcessing || previewImage) ? '5' : '12'} transition-all duration-700`}>
            <Uploader 
              onUpload={handleFileUpload} 
              isProcessing={isProcessing} 
              previewImage={previewImage}
              onClear={() => { setPreviewImage(null); setLastAnalyzed(null); }}
            />
          </div>
          {(isProcessing || lastAnalyzed) && (
            <div className="lg:col-span-7">
              {isProcessing ? (
                <div className="glass-ios squircle p-7 h-full flex items-center justify-center min-h-[380px]">
                   {/* Fix: Added missing Loader2 import */}
                   <Loader2 className="w-8 h-8 text-ls-muted animate-spin" />
                </div>
              ) : (
                <AnalysisCard 
                  result={lastAnalyzed!} 
                  onKeep={() => { setPreviewImage(null); setLastAnalyzed(null); }}
                  onDiscard={() => { deleteItem(lastAnalyzed!.id); setPreviewImage(null); }}
                />
              )}
            </div>
          )}
        </section>

        <section className="space-y-6 animate-ios">
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

        <section className="animate-ios">
          <div className="flex items-center justify-between mb-6 px-1">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ls-muted"></div>
                <h3 className="text-[10px] font-black text-ls-muted uppercase tracking-[0.25em]">{filteredHistory.length} Registered</h3>
             </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'}>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <BookmarkItem 
                  key={item.id} 
                  item={item} 
                  viewMode={viewMode} 
                  isSelected={selectedIds.has(item.id)}
                  onSelect={toggleSelect}
                  onDelete={deleteItem} 
                />
              ))
            ) : (
              <div className="col-span-full py-32 text-center glass-ios-dark squircle border-dashed border-2 border-white/5 flex flex-col items-center justify-center">
                <Info className="w-12 h-12 text-ls-muted/10 mb-4" />
                <h3 className="text-sm font-bold text-ls-muted/40 uppercase tracking-widest">Registry Empty</h3>
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-lg animate-ios">
          <div className="glass-ios-dark squircle-inner p-3 shadow-2xl flex items-center justify-between border-white/10">
            <div className="flex items-center gap-3 pl-3">
              <div className="w-8 h-8 rounded-full bg-ls-muted flex items-center justify-center text-ls-navy font-black text-xs">
                {selectedIds.size}
              </div>
              <span className="text-[9px] font-black text-ls-beige uppercase tracking-widest">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleBulkDelete} className="px-4 h-10 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="p-3 bg-white/5 text-ls-muted rounded-xl border border-white/5"><X className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
