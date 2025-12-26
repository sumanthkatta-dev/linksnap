import React, { useState } from 'react';
import { Trash2, CheckCircle2, ArrowUpRight, Copy, Check, ShieldCheck, Globe } from 'lucide-react';
import { ScanResult, ViewMode } from '../types';

interface BookmarkItemProps {
  item: ScanResult;
  viewMode: ViewMode;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ item, viewMode, onDelete, isSelected, onSelect }) => {
  const [copied, setCopied] = useState(false);
  const isGrid = viewMode === 'grid';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardClasses = `group glass-nothing squircle-inner overflow-hidden transition-all duration-300 relative cursor-pointer border-white/10 active:scale-[0.98] ${
    isSelected ? 'border-nt-red ring-2 ring-nt-red/20 bg-nt-red/5' : 'hover:border-nt-white/40'
  }`;

  if (isGrid) {
    return (
      <div className={cardClasses} onClick={() => onSelect(item.id)}>
        <div className="aspect-[1.5] relative bg-nt-gray overflow-hidden">
          {item.imageData && (
            <img
              src={item.imageData}
              alt="Preview"
              className={`w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110 ${
                isSelected ? 'opacity-20 blur-xl' : 'opacity-70'
              }`}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-nt-black via-transparent to-transparent opacity-60"></div>

          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-nt-red animate-ios" strokeWidth={1} />
            </div>
          )}

          {item.sources && item.sources.length > 0 && (
            <div className="absolute top-5 right-5 w-10 h-10 bg-nt-red flex items-center justify-center rounded-full shadow-2xl border border-white/20">
              <ShieldCheck className="w-5 h-5 text-nt-white" />
            </div>
          )}

          <div className="absolute bottom-5 left-5">
            <span className="px-4 py-1.5 bg-nt-white text-nt-black text-[10px] font-dot tracking-widest uppercase border border-white/10 shadow-lg">
              {item.category}
            </span>
          </div>
        </div>

        <div className="p-7">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-dot tracking-wider text-nt-white uppercase truncate flex-1">
              {item.url.replace(/^https?:\/\//, '').split('/')[0]}
            </h3>
            <span className="text-[10px] font-bold text-nt-red uppercase tracking-widest opacity-60 ml-3">
              {item.pricing || 'FREE'}
            </span>
          </div>
          <p className="text-[11px] font-medium text-white/40 line-clamp-2 leading-relaxed h-10 italic mb-6">
            "{item.description}"
          </p>

          <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-nt-white hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10"
              >
                {copied ? <Check className="w-4 h-4 text-nt-red" /> : <Copy className="w-4 h-4" />}
              </button>
              <a
                href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-11 h-11 flex items-center justify-center bg-nt-white text-nt-black hover:bg-nt-red hover:text-nt-white rounded-full transition-all glitch-btn shadow-xl"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
              className="w-11 h-11 flex items-center justify-center text-white/20 hover:text-nt-red transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-5 flex items-center gap-7 ${cardClasses}`} onClick={() => onSelect(item.id)}>
      <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl font-dot shrink-0 transition-all ${isSelected ? 'bg-nt-red border-nt-red text-nt-white scale-110 shadow-lg shadow-nt-red/20' : 'bg-nt-gray border-white/10 text-white/40'}`}>
        {item.category.charAt(0)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="font-dot tracking-widest text-nt-white uppercase truncate text-lg">
            {item.url.replace(/^https?:\/\//, '').split('/')[0]}
          </h3>
          {item.sources && item.sources.length > 0 && <ShieldCheck className="w-3.5 h-3.5 text-nt-red" />}
        </div>
        <p className="text-[10px] text-white/30 truncate uppercase tracking-[0.3em] font-bold mt-1">
          {item.category} // {item.pricing || 'UNSPECIFIED'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <a
          href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
          target="_blank"
          className="w-14 h-14 flex items-center justify-center rounded-full bg-nt-white text-nt-black hover:bg-nt-red hover:text-nt-white transition-all glitch-btn border border-white/10 shadow-xl"
        >
          <Globe className="w-6 h-6" />
        </a>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="w-14 h-14 flex items-center justify-center text-white/20 hover:text-nt-red transition-all"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkItem;