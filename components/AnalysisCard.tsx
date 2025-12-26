import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Save, ExternalLink, ShieldCheck, Globe, Info } from 'lucide-react';
import { ScanResult } from '../types';

interface AnalysisCardProps {
  result: ScanResult;
  onDiscard: () => void;
  onKeep: (updated: ScanResult) => void;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ result, onDiscard, onKeep }) => {
  const [edited, setEdited] = useState<ScanResult>({ ...result });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEdited({ ...result });
  }, [result]);

  return (
    <div className="glass-nothing squircle p-10 flex flex-col gap-10 h-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-white/20 relative overflow-hidden group animate-ios">
      <div className="absolute top-0 left-0 w-full h-1 bg-nt-red"></div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-nt-red flex items-center justify-center text-nt-red shadow-lg shadow-nt-red/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[16px] font-dot text-nt-white uppercase tracking-[0.4em]">Scan Complete</h2>
            <span className="text-[10px] text-nt-red font-bold uppercase tracking-widest mt-1">Grounding Verified</span>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all glitch-btn ${isEditing ? 'bg-nt-red text-nt-white' : 'border border-white/10 text-white/40 hover:text-nt-white'}`}
        >
          {isEditing ? <Save className="w-6 h-6" /> : <Edit3 className="w-6 h-6" />}
        </button>
      </div>

      <div className="space-y-10 flex-1 overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] block">Resource Identity</label>
          {isEditing ? (
            <input 
              type="text" 
              value={edited.url}
              onChange={(e) => setEdited({...edited, url: e.target.value})}
              className="w-full bg-transparent border-b-2 border-nt-red py-3 text-2xl font-dot outline-none uppercase tracking-widest text-nt-white"
            />
          ) : (
            <div className="flex items-center justify-between group/title">
               <h3 className="text-4xl font-dot text-nt-white break-all leading-tight uppercase tracking-wider">{edited.url}</h3>
               <a 
                href={edited.url.startsWith('http') ? edited.url : `https://${edited.url}`}
                target="_blank"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-nt-red text-nt-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
               >
                 <Globe className="w-6 h-6" />
               </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] block">Taxonomy</span>
            <div className="px-5 py-3 border border-white/10 inline-block font-dot text-sm text-nt-white uppercase tracking-widest">
              {edited.category}
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] block">Licensing</span>
            <div className="px-5 py-3 border border-nt-red/40 text-nt-red inline-block font-dot text-sm uppercase tracking-widest">
              {edited.pricing || 'FREE_MOD'}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Info className="w-3.5 h-3.5 text-nt-red" />
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] block">Summary Brief</span>
          </div>
          {isEditing ? (
            <textarea 
              value={edited.description}
              onChange={(e) => setEdited({...edited, description: e.target.value})}
              className="w-full bg-nt-gray border border-white/10 rounded-3xl p-6 text-sm text-white/80 outline-none h-32 focus:border-nt-red transition-all"
            />
          ) : (
            <p className="text-white/60 font-medium italic text-base leading-relaxed pl-4 border-l-2 border-white/5">
              "{edited.description}"
            </p>
          )}
        </div>

        {edited.sources && edited.sources.length > 0 && (
          <div className="pt-6 space-y-5">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] block">System Verification Logs</span>
            <div className="grid grid-cols-1 gap-3">
              {edited.sources.slice(0, 3).map((source, idx) => (
                <a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  className="flex items-center justify-between p-5 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-nt-red transition-all group/link rounded-2xl"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-dot text-white uppercase tracking-widest">{source.title}</span>
                    <span className="text-[8px] text-white/20 truncate max-w-[200px] font-mono">{source.uri}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover/link:text-nt-red" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-5 pt-10 border-t border-white/10">
        <button
          onClick={() => onKeep(edited)}
          className="flex-1 h-20 bg-nt-white text-nt-black font-dot uppercase tracking-[0.6em] text-sm hover:bg-nt-red hover:text-nt-white transition-all glitch-btn shadow-2xl"
        >
          Archive Entry
        </button>
        <button
          onClick={onDiscard}
          className="w-20 h-20 flex items-center justify-center border-2 border-white/10 text-white/20 hover:text-nt-red hover:border-nt-red transition-all glitch-btn rounded-full"
        >
          <Trash2 className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default AnalysisCard;