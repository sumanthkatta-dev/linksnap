
import React from 'react';
import { CheckCircle2, ArrowUpRight, Trash2 } from 'lucide-react';
import { ScanResult } from '../types';

interface AnalysisCardProps {
  result: ScanResult;
  onDiscard: () => void;
  onKeep: () => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ result, onDiscard, onKeep }) => {
  return (
    <div className="glass-ios squircle p-7 flex flex-col gap-6 min-h-[380px] shadow-2xl border-white/5">
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
              href={result.url.startsWith('http') ? result.url : `https://${result.url}`}
              target="_blank"
              className="text-xl md:text-2xl font-bold text-ls-beige hover:text-ls-blue transition-colors break-all leading-tight decoration-ls-blue/40 decoration-2 underline-offset-4"
            >
              {result.url}
            </a>
          </div>
          
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-ls-muted uppercase tracking-widest opacity-50">Taxonomy</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 bg-ls-muted text-ls-navy rounded-lg text-xs font-black flex items-center gap-2 shadow-md ring-1 ring-white/10">
                {result.category}
              </span>
              <span className="px-3.5 py-1.5 bg-ls-blue/20 text-ls-beige rounded-lg text-xs font-bold border border-ls-blue/10">
                {result.subCategory}
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-ls-muted uppercase tracking-widest mb-1 opacity-50">Brief</p>
            <p className="text-ls-muted font-medium italic opacity-90 leading-relaxed">"{result.description}"</p>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-white/5">
          <a 
            href={result.url.startsWith('http') ? result.url : `https://${result.url}`}
            target="_blank"
            className="flex-1 h-12 flex items-center justify-center gap-2 bg-ls-blue text-ls-beige rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Visit <ArrowUpRight className="w-4 h-4" />
          </a>
          <div className="flex gap-2">
            <button 
              onClick={onKeep}
              className="px-5 h-12 bg-ls-beige/5 text-ls-beige rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all"
            >
              Keep
            </button>
            <button 
              onClick={onDiscard}
              className="px-4 h-12 bg-red-500/10 text-red-400 rounded-xl font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
              title="Discard this scan"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCard;
