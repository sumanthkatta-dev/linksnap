import React from 'react';
import { Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="glass-ios h-14 sticky top-0 z-50 flex items-center shadow-lg border-b-0">
      <div className="max-w-4xl mx-auto w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 group cursor-pointer active:scale-95 transition-transform">
          <div className="bg-ls-blue w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-ls-blue/20">
            <Zap className="w-4 h-4 text-ls-beige fill-ls-beige" />
          </div>
          <span className="text-base font-black tracking-tighter text-ls-beige">
            LINKSNAP
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-ls-muted/5 border border-white/5 px-2.5 py-1 rounded-full">
            <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
            <span className="text-[8px] font-black tracking-widest text-ls-muted uppercase opacity-70">Lattice v1</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;