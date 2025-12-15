import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutGrid, 
  List, 
  Trash2, 
  Search, 
  Zap,
  Loader2,
  FileDown,
  X,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Calendar,
  FolderInput,
  Info,
  AlertCircle
} from 'lucide-react';
import { ScanResult, ViewMode } from './types';
import { analyzeScreenshot } from './services/geminiService';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [history, setHistory] = useState<ScanResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<ScanResult | null>(null);
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkCategoryMenuOpen, setIsBulkCategoryMenuOpen] = useState(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('linksnap_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      } catch (e) {
        console.error("History parse error", e);
      }
    }
  }, []);

  // Save history on change
  useEffect(() => {
    localStorage.setItem('linksnap_history', JSON.stringify(history));
  }, [history]);

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
        
        // Final sanity check: if the AI still returned youtube/instagram, we add a warning or handle it
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
          setError("Note: AI identified the host platform. Try a closer screenshot of the content if this isn't what you wanted.");
        }
      } catch (err) {
        setError("AI Analysis failed. Our vision models couldn't process this image.");
      } finally {
        setIsProcessing(false);
      }
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const deleteItem = (id: string) => {
    // Immediate state update for responsiveness
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      return updated;
    });
    
    // Cleanup other related states
    if (lastAnalyzed?.id === id) setLastAnalyzed(null);
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const discardLastAnalysis = () => {
    if (lastAnalyzed) {
      deleteItem(lastAnalyzed.id);
      setPreviewImage(null);
    }
  };

  const updateCategory = (id: string, newCategory: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, category: newCategory } : item
    ));
    if (lastAnalyzed?.id === id) {
      setLastAnalyzed(prev => prev ? { ...prev, category: newCategory } : null);
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredHistory.length && filteredHistory.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredHistory.map(item => item.id)));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Permanently remove ${selectedIds.size} items?`)) {
      setHistory(prev => prev.filter(item => !selectedIds.has(item.id)));
      setSelectedIds(new Set());
    }
  };

  const handleBulkCategoryUpdate = (cat: string) => {
    setHistory(prev => prev.map(item => 
      selectedIds.has(item.id) ? { ...item, category: cat } : item
    ));
    setIsBulkCategoryMenuOpen(false);
    setSelectedIds(new Set());
  };

  const categories = useMemo(() => {
    const cats = new Set(history.map(item => item.category));
    return ['All', ...Array.from(cats)].sort();
  }, [history]);

  const filteredHistory = history.filter(item => {
    const search = searchQuery.toLowerCase();
    const matchesSearch = item.url.toLowerCase().includes(search) ||
                        item.description.toLowerCase().includes(search) ||
                        item.category.toLowerCase().includes(search);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const exportPDF = async () => {
    try {
      const loadScript = (src: string) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js');
      const { jsPDF } = (window as any).jspdf;
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.setTextColor(33, 52, 72);
      doc.text('LinkSnap Registry Export', 14, 22);
      const targetItems = selectedIds.size > 0 ? history.filter(item => selectedIds.has(item.id)) : history;
      const tableData = targetItems.map(item => [new Date(item.timestamp).toLocaleDateString(), item.url, item.category, item.description]);
      (doc as any).autoTable({
        head: [['Date', 'Source URL', 'Category', 'Description']],
        body: tableData,
        startY: 35,
        headStyles: { fillColor: [84, 119, 146] },
      });
      doc.save('LinkSnap-Registry.pdf');
    } catch (err) { alert("PDF Engine failed to initialize."); }
  };

  return (
    <div className="min-h-screen pb-48 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 mt-12 space-y-12 md:space-y-20">
        <header className="text-center space-y-4 animate-ios">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ls-beige flex items-center justify-center gap-4">
            Registry
          </h1>
          <p className="text-ls-muted text-base md:text-lg max-w-lg mx-auto font-medium opacity-70">
            Intelligent capture. We ignore the host (YouTube/Instagram) and find the actual tool.
          </p>
        </header>

        {error && (
          <div className="max-w-xl mx-auto glass-ios border-ls-blue/20 p-4 rounded-2xl flex items-center gap-3 text-ls-beige animate-ios">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto opacity-50 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <section className="animate-ios" style={{animationDelay: '0.1s'}}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className={`lg:col-span-${(isProcessing || previewImage) ? '5' : '12'} transition-all duration-700`}>
              <div 
                className={`relative h-[380px] squircle border-0 transition-all duration-500 flex flex-col items-center justify-center glass-ios overflow-hidden group shadow-2xl ${
                  dragActive ? 'bg-ls-muted/20 ring-2 ring-ls-muted/40' : 'hover:bg-ls-muted/5'
                }`}
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { setDragActive(false); handleDrop(e); }}
              >
                {!isProcessing && !previewImage ? (
                  <div className="flex flex-col items-center text-center px-8 cursor-pointer relative z-10 w-full h-full justify-center">
                    <div className="w-16 h-16 rounded-3xl bg-ls-blue/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                      <Plus className="w-8 h-8 text-ls-beige" strokeWidth={2} />
                    </div>
                    <p className="text-lg font-bold text-ls-beige mb-1">New Snapshot</p>
                    <p className="text-ls-muted text-xs font-semibold opacity-60">Upload YouTube or Instagram screens</p>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full p-2">
                    <img 
                      src={previewImage!} 
                      alt="Registry Preview" 
                      className={`w-full h-full object-contain rounded-[28px] transition-all duration-700 ${isProcessing ? 'opacity-30 blur-2xl grayscale' : ''}`} 
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 text-ls-muted animate-spin mb-3 opacity-80" strokeWidth={2} />
                        <span className="text-[10px] font-black tracking-widest text-ls-beige uppercase animate-pulse text-center px-4">Deep Content Scanning...</span>
                      </div>
                    )}
                    {!isProcessing && (
                      <button 
                        onClick={() => { setPreviewImage(null); setLastAnalyzed(null); }}
                        className="absolute top-4 right-4 p-2 bg-ls-navy/80 rounded-full text-ls-beige border border-white/10 shadow-2xl hover:bg-ls-muted transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {(isProcessing || lastAnalyzed) && (
              <div className="lg:col-span-7 animate-ios" style={{animationDelay: '0.2s'}}>
                <div className="glass-ios squircle p-7 flex flex-col gap-6 min-h-[380px] shadow-2xl border-white/5">
                  {isProcessing ? (
                    <div className="space-y-6 my-auto">
                      <div className="h-3 w-20 bg-ls-muted/10 rounded-full animate-pulse"></div>
                      <div className="h-10 w-full bg-ls-muted/10 rounded-2xl animate-pulse"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-24 bg-ls-muted/10 rounded-xl animate-pulse"></div>
                        <div className="h-8 w-24 bg-ls-muted/10 rounded-xl animate-pulse"></div>
                      </div>
                      <div className="h-20 w-full bg-ls-muted/10 rounded-2xl animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-xl bg-ls-muted/20 flex items-center justify-center text-ls-muted shadow-inner">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm font-black text-ls-muted uppercase tracking-[0.2em]">Archived</h2>
                      </div>
                      
                      <div className="space-y-6 flex-1">
                        <div>
                          <p className="text-[10px] font-bold text-ls-muted uppercase tracking-widest mb-1 opacity-50">Identified Tool</p>
                          <a 
                            href={lastAnalyzed!.url.startsWith('http') ? lastAnalyzed!.url : `https://${lastAnalyzed!.url}`}
                            target="_blank"
                            className="text-xl md:text-2xl font-bold text-ls-beige hover:text-ls-blue transition-colors break-all leading-tight decoration-ls-blue/40 decoration-2 underline-offset-4"
                          >
                            {lastAnalyzed!.url}
                          </a>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-[10px] font-bold text-ls-muted uppercase tracking-widest opacity-50">Taxonomy</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3.5 py-1.5 bg-ls-muted text-ls-navy rounded-lg text-xs font-black flex items-center gap-2 shadow-md ring-1 ring-white/10">
                              {lastAnalyzed!.category}
                            </span>
                            <span className="px-3.5 py-1.5 bg-ls-blue/20 text-ls-beige rounded-lg text-xs font-bold border border-ls-blue/10">
                              {lastAnalyzed!.subCategory}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] font-bold text-ls-muted uppercase tracking-widest mb-1 opacity-50">Brief</p>
                          <p className="text-ls-muted font-medium italic opacity-90 leading-relaxed">"{lastAnalyzed!.description}"</p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-6 border-t border-white/5">
                        <a 
                          href={lastAnalyzed!.url.startsWith('http') ? lastAnalyzed!.url : `https://${lastAnalyzed!.url}`}
                          target="_blank"
                          className="flex-1 h-12 flex items-center justify-center gap-2 bg-ls-blue text-ls-beige rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
                        >
                          Visit <ArrowUpRight className="w-4 h-4" />
                        </a>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setPreviewImage(null); setLastAnalyzed(null); }}
                            className="px-5 h-12 bg-ls-beige/5 text-ls-beige rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all"
                          >
                            Keep
                          </button>
                          <button 
                            onClick={discardLastAnalysis}
                            className="px-4 h-12 bg-red-500/10 text-red-400 rounded-xl font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                            title="Discard this scan"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-6 animate-ios" style={{animationDelay: '0.3s'}}>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ls-muted/50" strokeWidth={2.5} />
              <input 
                type="text" 
                placeholder="Filter by site, category, or summary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-ios rounded-xl py-3.5 pl-11 pr-5 focus:outline-none ring-offset-2 focus:ring-2 ring-ls-muted/20 transition-all text-sm font-medium text-ls-beige placeholder:text-ls-muted/30 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="segmented-bg flex p-1 shadow-inner">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-ls-muted text-ls-navy shadow-lg scale-100' : 'text-ls-muted hover:text-ls-beige scale-95 opacity-60'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-ls-muted text-ls-navy shadow-lg scale-100' : 'text-ls-muted hover:text-ls-beige scale-95 opacity-60'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={exportPDF}
                className="p-3 bg-ls-muted/10 rounded-xl text-ls-muted hover:bg-ls-muted/20 transition-all border border-white/5 active:scale-95"
                title="Export Catalog as PDF"
              >
                <FileDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar py-1">
            <div className="flex gap-2 min-w-max">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat 
                      ? 'bg-ls-muted text-ls-navy shadow-lg shadow-ls-muted/10 translate-y-[-1px]' 
                      : 'bg-ls-beige/5 text-ls-muted hover:bg-ls-muted/5 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="animate-ios" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between mb-6 px-1">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ls-muted animate-pulse"></div>
                <h3 className="text-[10px] font-black text-ls-muted uppercase tracking-[0.25em]">{filteredHistory.length} Registered</h3>
             </div>
             <button onClick={selectAll} className="text-[10px] font-black text-ls-muted/60 hover:text-ls-muted uppercase tracking-widest transition-colors">
               {selectedIds.size > 0 ? 'Deselect All' : 'Select All'}
             </button>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'}>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <BookmarkItem 
                  key={item.id} 
                  item={item} 
                  viewMode={viewMode} 
                  isSelected={selectedIds.has(item.id)}
                  onSelect={() => toggleSelect(item.id)}
                  onDelete={() => deleteItem(item.id)} 
                />
              ))
            ) : (
              <div className="col-span-full py-32 text-center glass-ios-dark squircle border-dashed border-2 border-white/5 flex flex-col items-center justify-center group">
                <Info className="w-12 h-12 text-ls-muted/10 mx-auto mb-4 group-hover:scale-110 group-hover:text-ls-muted/20 transition-all" strokeWidth={1} />
                <h3 className="text-sm font-bold text-ls-muted/40 uppercase tracking-widest">No matching entries</h3>
                <p className="text-ls-muted/30 text-xs mt-2 font-medium">Add a screenshot to begin your catalog.</p>
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
              <span className="text-[9px] font-black text-ls-beige uppercase tracking-widest hidden sm:inline">Selected</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setIsBulkCategoryMenuOpen(!isBulkCategoryMenuOpen)}
                  className="px-4 py-2 bg-ls-muted/10 rounded-xl text-ls-muted hover:text-ls-beige border border-white/5 transition-all font-black text-[9px] uppercase tracking-widest flex items-center gap-2"
                >
                  <FolderInput className="w-3.5 h-3.5" />
                  <span>Move</span>
                </button>
                {isBulkCategoryMenuOpen && (
                  <div className="absolute bottom-full mb-4 right-0 glass-ios-dark squircle-inner p-1.5 min-w-[180px] shadow-2xl overflow-hidden animate-ios">
                    {['Music', 'Design', 'Development', 'Entertainment', 'Social', 'Productivity', 'Content'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleBulkCategoryUpdate(cat)}
                        className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-ls-muted hover:text-ls-navy transition-all text-xs font-bold"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={handleBulkDelete}
                className="px-4 h-10 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10 active:scale-95 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden xs:inline">Delete</span>
              </button>
              
              <button 
                onClick={() => setSelectedIds(new Set())}
                className="p-3 bg-white/5 text-ls-muted rounded-xl hover:bg-ls-blue/20 transition-all border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookmarkItem: React.FC<{ 
  item: ScanResult; 
  viewMode: ViewMode; 
  onDelete: () => void;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ item, viewMode, onDelete, isSelected, onSelect }) => {
  const isGrid = viewMode === 'grid';
  
  if (isGrid) {
    return (
      <div 
        className={`group glass-ios squircle-inner overflow-hidden transition-all duration-500 flex flex-col h-full relative cursor-pointer border-0 shadow-xl ${
          isSelected ? 'ring-2 ring-ls-muted/40 scale-[0.98] bg-ls-muted/5' : 'hover:scale-[1.01] hover:bg-white/5'
        }`}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      >
        <div className="aspect-[1.5] relative overflow-hidden bg-ls-navy/20">
          {item.imageData ? (
            <img src={item.imageData} alt="Registry Entry" className={`w-full h-full object-cover transition-all duration-1000 ${isSelected ? 'opacity-20 scale-105 blur-md' : 'group-hover:scale-110'}`} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-ls-navy/40">
              <Zap className="w-10 h-10 text-ls-muted/10" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-ls-navy/60 via-transparent to-transparent"></div>
          
          <div className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected ? 'bg-ls-muted border-ls-muted shadow-lg' : 'bg-ls-navy/60 border-white/20 opacity-0 group-hover:opacity-100'
          }`}>
            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-ls-navy" strokeWidth={4} />}
          </div>

          <div className="absolute bottom-4 left-4 flex flex-col gap-1">
             <span className="px-3 py-1 bg-ls-muted/90 text-ls-navy rounded-md text-[8px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-sm self-start">
                {item.category}
             </span>
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base font-bold text-ls-beige truncate mb-1 leading-tight group-hover:text-ls-blue transition-colors">
            {item.url.replace(/^https?:\/\//, '').split('/')[0]}
          </h3>
          <p className="text-[9px] text-ls-muted font-bold truncate opacity-40 mb-3 font-mono">{item.url}</p>
          
          <p className="text-xs text-ls-muted/80 font-medium line-clamp-2 italic mb-5 leading-relaxed">
            "{item.description}"
          </p>
          
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[9px] font-black text-ls-muted/30 uppercase tracking-widest">
              <Calendar className="w-3 h-3" />
              {new Date(item.timestamp).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <a 
                href={item.url.startsWith('http') ? item.url : `https://${item.url}`} 
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-ls-muted hover:text-ls-beige transition-all active:scale-90"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-2 text-red-400/50 hover:text-red-400 transition-all opacity-70 hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`glass-ios rounded-[20px] p-4 flex flex-col md:flex-row items-center gap-5 transition-all duration-300 relative cursor-pointer group shadow-sm border-white/5 ${
        isSelected ? 'bg-ls-muted/10 scale-[0.99] ring-1 ring-ls-muted/30' : 'hover:bg-white/5'
      }`}
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
    >
      <div className="flex items-center gap-5 w-full md:w-auto">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isSelected ? 'bg-ls-muted border-ls-muted shadow-md' : 'bg-ls-navy/60 border-white/10'
        }`}>
          {isSelected && <CheckCircle2 className="w-4 h-4 text-ls-navy" strokeWidth={4} />}
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-ls-navy/50 border border-white/5 flex items-center justify-center text-ls-muted font-bold text-xl shrink-0 group-hover:text-ls-beige transition-all ${isSelected ? 'bg-ls-muted text-ls-navy shadow-lg' : ''}`}>
          {item.category.charAt(0)}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-0.5">
          <h3 className="font-bold text-base text-ls-beige truncate">{item.url.replace(/^https?:\/\//, '').split('/')[0]}</h3>
          <div className="flex gap-1.5">
            <span className="text-[8px] px-2 py-0.5 bg-ls-muted/10 text-ls-muted rounded-md font-black tracking-widest uppercase">
              {item.category}
            </span>
          </div>
        </div>
        <div className="text-[10px] text-ls-muted/50 truncate font-medium">{item.description}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <a 
          href={item.url.startsWith('http') ? item.url : `https://${item.url}`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-3 text-ls-muted hover:text-ls-beige transition-all"
        >
          <ArrowUpRight className="w-5 h-5" />
        </a>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-3 text-red-400/40 hover:text-red-400 transition-all opacity-80 hover:opacity-100"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default App;