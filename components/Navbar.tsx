import React from 'react';
import { Settings } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSettings }) => {
  return (
    <nav className="glass-nothing h-20 sticky top-0 z-50 flex items-center border-b border-white/10 px-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer active:scale-95 transition-transform duration-200">
          <div className="w-11 h-11 bg-nt-white flex items-center justify-center rounded-full transition-all group-hover:bg-nt-red">
            <div className="w-2.5 h-2.5 bg-nt-black rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-dot tracking-widest text-nt-white uppercase leading-none">
              LINKSNAP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-nt-red animate-ping"></div>
            <span className="text-[10px] font-dot tracking-widest text-white/40 uppercase">Sys_Active</span>
          </div>
          <button 
            onClick={onOpenSettings}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-nt-red hover:text-nt-red transition-all group"
          >
            <Settings className="w-5 h-5 text-white/40 group-hover:text-nt-red transition-colors" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;