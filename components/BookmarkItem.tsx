
import React from 'react';
import { Trash2, CheckCircle2, Calendar, ArrowUpRight, Zap } from 'lucide-react';
import { ScanResult, ViewMode } from '../types';

interface BookmarkItemProps {
  item: ScanResult;
  viewMode: ViewMode;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ item, viewMode, onDelete, isSelected, onSelect }) => {
  const isGrid = viewMode === 'grid';
  
  if (isGrid) {
    return (
      <div 
        className={`group glass-ios squircle-inner overflow-hidden transition-all duration-500 flex flex-col h-full relative cursor-pointer border-0 shadow-xl ${
          isSelected ? 'ring-2 ring-ls-muted/40 scale-[0.98] bg-ls-muted/5' : 'hover:scale-[1.01] hover:bg-white/5'
        }`}
        onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}
      >
        <div className="aspect-[1.5] relative overflow-hidden bg-ls-navy/20">
          {item.imageData ? (
            <img src={item.imageData} alt="Entry" className={`w-full h-full object-cover transition-all duration-1000 ${isSelected ? 'opacity-20 scale-105 blur-md' : 'group-hover:scale-110'}`} />
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
                onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
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
      onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}
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
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="p-3 text-red-400/40 hover:text-red-400 transition-all opacity-80 hover:opacity-100"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkItem;
