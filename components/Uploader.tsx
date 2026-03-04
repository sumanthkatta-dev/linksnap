
import React, { useState } from 'react';
import { X, Loader2, Plus, Link2, ArrowRight, RefreshCw } from 'lucide-react';

interface UploaderProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isProcessing: boolean;
  previewImage: string | null;
  scanStep?: string;
  onClear: () => void;
  onRefresh: () => void;
}

const Uploader: React.FC<UploaderProps> = ({ onUpload, onUrlSubmit, isProcessing, previewImage, scanStep, onClear, onRefresh }) => {
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);

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

  const sanitizedUrl = sanitizeUrlInput(url);
  const hasUrlInput = url.trim().length > 0;
  const isUrlValid = sanitizedUrl.length > 0;

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
      setUrlError(null);
    } else if (url.trim()) {
      setUrlError('Use a valid URL starting with http:// or https://');
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative h-[52vh] min-h-[300px] md:h-[400px] squircle transition-all duration-500 flex flex-col items-center justify-center glass-nothing overflow-hidden group border-2 ${
          dragActive ? 'border-nt-red bg-nt-red/5' : 'border-white/10'
        } hover:border-white/30`}
        aria-busy={isProcessing}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 nothing-grid opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110 pointer-events-none"></div>
        
        {!isProcessing && !previewImage ? (
          <div className="flex flex-col items-center text-center px-6 md:px-12 cursor-pointer relative z-10 w-full h-full justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-nt-red transition-all duration-500 group-hover:scale-110 relative bg-white/[0.02]">
              <Plus className="w-8 h-8 md:w-10 md:h-10 text-nt-white group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-0 border border-nt-red/0 group-hover:border-nt-red/50 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-lg md:text-2xl font-dot tracking-[0.14em] md:tracking-wider text-nt-white mb-2 uppercase group-hover:tracking-[0.2em] transition-all duration-500">Drop Visual</h3>
            <p className="text-white/40 text-[10px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em]">Screenshot or Media File</p>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
              accept="image/*"
              aria-label="Upload screenshot or image"
              onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="relative w-full h-full p-4 md:p-6 overflow-hidden flex items-center justify-center">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className={`w-full h-full object-contain md:object-cover rounded-[16px] md:rounded-[24px] border border-white/5 transition-all duration-1000 group-hover:scale-105 mobile-preview-image ${
                  isProcessing ? 'grayscale blur-md opacity-30' : 'opacity-90 group-hover:opacity-100'
                }`}
              />
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-nt-black/40 backdrop-blur-sm" role="status" aria-live="polite" aria-atomic="true">
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
            
            {previewImage && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); onRefresh(); }}
                  disabled={isProcessing}
                  aria-label="Refresh preview analysis"
                  className="action-btn mobile-action-btn fixed bottom-24 md:bottom-20 right-4 md:right-6 bg-nt-black/80 text-nt-white border border-white/20 shadow-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-5 h-5 action-btn-icon ${isProcessing ? 'animate-spin' : ''}`} />
                </button>
              </>
            )}

            {!isProcessing && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); onClear(); }}
                  aria-label="Clear uploaded preview"
                  className="action-btn mobile-action-btn fixed bottom-8 md:bottom-6 right-4 md:right-6 bg-nt-black/80 text-nt-white border border-white/20 shadow-2xl transition-all"
                >
                  <X className="w-5 h-5 action-btn-icon" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="animate-ios" style={{ animationDelay: '0.1s' }}>
        <form onSubmit={handleSubmitUrl} className="relative group">
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-nt-red transition-colors pointer-events-none">
              <Link2 className="w-5 h-5" />
            </div>
            <input
              type="url"
              placeholder="PASTE REMOTE LINK_ADDR..."
              value={url}
              onChange={(e) => {
                const nextValue = e.target.value;
                setUrl(nextValue);
                if (urlError && (!nextValue.trim() || sanitizeUrlInput(nextValue))) {
                  setUrlError(null);
                }
              }}
              onBlur={() => {
                if (url.trim() && !sanitizeUrlInput(url)) {
                  setUrlError('Use a valid URL starting with http:// or https://');
                }
              }}
              disabled={isProcessing}
              inputMode="url"
              autoComplete="url"
              aria-label="Paste a link to analyze"
              aria-invalid={hasUrlInput && !isUrlValid}
              aria-describedby={urlError ? 'url-error' : undefined}
              className="w-full bg-nt-gray border-2 border-white/10 rounded-2xl py-5 pl-14 pr-4 sm:pr-24 focus:outline-none focus:border-nt-red focus:ring-2 focus:ring-nt-red/20 transition-all text-xs md:text-sm font-dot text-nt-white placeholder:text-white/20 h-16 tracking-[0.1em] md:tracking-widest disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing || !isUrlValid}
            aria-label="Analyze pasted URL"
            className="mt-3 w-full sm:mt-0 sm:w-auto sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2 h-11 min-h-[44px] px-6 bg-nt-white text-nt-black rounded-xl font-dot text-[10px] uppercase tracking-[0.18em] md:tracking-widest disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn transition-transform hover:scale-[0.98] active:scale-95"
          >
            Map <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>
        {urlError && (
          <p id="url-error" className="mt-2 px-2 text-[10px] text-nt-red font-bold uppercase tracking-[0.2em]">
            {urlError}
          </p>
        )}
        <div className="mt-3 flex items-center gap-2 px-2 sm:px-6">
          <div className="w-1 h-1 bg-nt-red rounded-full"></div>
          <span className="text-[9px] md:text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] md:tracking-[0.4em]">Protocol: Direct_Neural_Mapping</span>
        </div>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .action-btn:hover:not(:disabled) {
          background-color: #D71921;
        }

        .action-btn .action-btn-icon {
          color: #FFFFFF;
          stroke: #FFFFFF;
          fill: none;
          transition: color 0.2s ease, stroke 0.2s ease, fill 0.2s ease;
        }

        .action-btn:hover:not(:disabled) .action-btn-icon {
          color: #000000;
          stroke: #000000;
          fill: #000000;
        }
      `}</style>
    </div>
  );
};

export default Uploader;
