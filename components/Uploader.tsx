
import React, { useState } from 'react';
import { X, Loader2, Plus, Link2, ArrowRight } from 'lucide-react';

interface UploaderProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isProcessing: boolean;
  previewImage: string | null;
  scanStep?: string;
  onClear: () => void;
}

const Uploader: React.FC<UploaderProps> = ({ onUpload, onUrlSubmit, isProcessing, previewImage, scanStep, onClear }) => {
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState('');

  const sanitizeUrlInput = (value: string): string => {
    const cleaned = value.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001F\u007F]/g, '').trim();
    try {
      const parsed = new URL(cleaned);
      if (!['http:', 'https:'].includes(parsed.protocol)) return '';
      return parsed.toString();
    } catch {
      return '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) onUpload(e.dataTransfer.files[0]);
  };

  const handleSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeUrlInput(url);
    if (sanitized) {
      onUrlSubmit(sanitized);
      setUrl('');
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative h-[320px] md:h-[400px] squircle transition-all duration-500 flex flex-col items-center justify-center glass-nothing overflow-hidden group border-2 ${
          dragActive ? 'border-nt-red bg-nt-red/5' : 'border-white/10'
        } hover:border-white/30`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 nothing-grid opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110 pointer-events-none"></div>
        
        {!isProcessing && !previewImage ? (
          <div className="flex flex-col items-center text-center px-8 md:px-12 cursor-pointer relative z-10 w-full h-full justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-nt-red transition-all duration-500 group-hover:scale-110 relative bg-white/[0.02]">
              <Plus className="w-8 h-8 md:w-10 md:h-10 text-nt-white group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-0 border border-nt-red/0 group-hover:border-nt-red/50 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-xl md:text-2xl font-dot tracking-wider text-nt-white mb-2 uppercase group-hover:tracking-[0.2em] transition-all duration-500">Drop Visual</h3>
            <p className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">Screenshot or Media File</p>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="relative w-full h-full p-4 md:p-6 overflow-hidden flex items-center justify-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className={`w-full h-full object-cover rounded-[20px] md:rounded-[24px] border border-white/5 transition-all duration-1000 group-hover:scale-105 ${
                  isProcessing ? 'grayscale blur-md opacity-30' : 'opacity-90 group-hover:opacity-100'
                }`}
              />
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-nt-black/40 backdrop-blur-sm">
                <div className="scan-line absolute top-0 left-0 w-full"></div>
                <div className="mb-6">
                  <Loader2 className="w-12 h-12 text-nt-red animate-spin" strokeWidth={1.5} />
                </div>
                <div className="text-center px-8">
                  <span className="text-[12px] font-dot tracking-[0.3em] text-nt-white uppercase block mb-3 animate-pulse">
                    {scanStep || 'Analyzing Data'}
                  </span>
                  <div className="w-32 h-[2px] bg-white/10 relative overflow-hidden rounded-full mx-auto">
                    <div className="absolute inset-0 bg-nt-red w-1/3 animate-[loading-bar_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            )}
            
            {!isProcessing && (
              <button
                onClick={(e) => { e.stopPropagation(); onClear(); }}
                className="absolute top-4 right-4 w-10 h-10 bg-nt-black/80 rounded-full text-nt-white border border-white/20 shadow-2xl hover:bg-nt-red transition-all z-40 flex items-center justify-center glitch-btn"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="animate-ios" style={{ animationDelay: '0.1s' }}>
        <form onSubmit={handleSubmitUrl} className="relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-nt-red transition-colors">
            <Link2 className="w-5 h-5" />
          </div>
          <input
            type="url"
            placeholder="PASTE REMOTE LINK_ADDR..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isProcessing}
            className="w-full bg-nt-gray border-2 border-white/10 rounded-2xl py-5 pl-14 pr-24 focus:outline-none focus:border-nt-red transition-all text-xs md:text-sm font-dot text-nt-white placeholder:text-white/10 h-16 tracking-widest disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isProcessing || !url.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-6 bg-nt-white text-nt-black rounded-xl font-dot text-[10px] uppercase tracking-widest disabled:opacity-0 flex items-center gap-2 group/btn instant-glitch-btn"
          >
            Map <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>
        <div className="mt-3 flex items-center gap-2 px-6">
          <div className="w-1 h-1 bg-nt-red rounded-full"></div>
          <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Protocol: Direct_Neural_Mapping</span>
        </div>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .instant-glitch-btn {
          transition: transform 0.05s cubic-bezier(0.16, 1, 0.3, 1);
          filter: invert(0);
        }

        .instant-glitch-btn:hover:not(:disabled) {
          filter: invert(1);
          transform: scale(0.96) skewX(-1deg);
        }

        .instant-glitch-btn:active:not(:disabled) {
          transform: scale(0.92) skewX(1deg);
          filter: invert(1) brightness(1.1);
        }
      `}</style>
    </div>
  );
};

export default Uploader;
