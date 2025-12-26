import React from 'react';
import { ArrowRight, Scan, ShieldCheck, Zap } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-nt-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full md:max-w-md bg-nt-black relative overflow-hidden flex flex-col md:rounded-[40px] md:border-8 md:border-nt-gray pt-safe pb-safe">
        {/* Background grid */}
        <div className="absolute inset-0 nothing-grid opacity-20 pointer-events-none z-0"></div>

        <div className="flex flex-col items-center justify-between h-full py-12 px-8 text-center animate-ios relative z-10">
          <div className="w-full flex justify-end px-4">
            <button 
              onClick={onComplete}
              className="text-[10px] font-dot text-white/40 hover:text-white tracking-widest uppercase relative z-20 min-h-[44px] min-w-[44px]"
            >
              Skip
            </button>
          </div>

          <div className="relative group">
            <div className="w-56 h-56 md:w-64 md:h-64 squircle border-2 border-white/5 flex items-center justify-center relative overflow-hidden bg-white/[0.02] shadow-[0_0_50px_rgba(215,25,33,0.1)]">
               <div className="absolute inset-0 nothing-grid opacity-20 pointer-events-none"></div>
               <Scan className="w-16 h-16 text-white opacity-80" strokeWidth={1} />
               <div className="absolute top-6 right-6 w-2 h-2 bg-nt-red rounded-full shadow-[0_0_15px_#D71921] animate-pulse"></div>
               <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-dot text-white/20 tracking-widest uppercase">System_Active_V.1</span>
            </div>
            <div className="absolute -inset-6 border border-white/5 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none"></div>
            <div className="absolute -inset-10 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none opacity-50"></div>
          </div>

          <div className="space-y-8 w-full relative z-20">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldCheck className="w-3 h-3 text-nt-red" />
                <span className="text-[8px] font-bold text-white/40 tracking-[0.4em] uppercase">Neural_Link_Verified</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-dot tracking-[0.2em] text-white uppercase leading-none">
                LINK<span className="text-nt-red">SNAP</span>
              </h1>
              <p className="text-[11px] md:text-xs font-medium text-white/40 tracking-widest uppercase max-w-[280px] mx-auto leading-relaxed">
                The high-precision archive for your <br/>
                <span className="text-white">digital tool ecosystem.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 px-4">
              <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                <Zap className="w-4 h-4 text-nt-red" />
                <span className="text-[8px] font-dot text-white/60 uppercase tracking-widest">Instant_Scan</span>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex flex-col items-center gap-2">
                <Scan className="w-4 h-4 text-nt-red" />
                <span className="text-[8px] font-dot text-white/60 uppercase tracking-widest">Deep_Grounding</span>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="w-full h-16 md:h-18 bg-nt-red text-white rounded-2xl font-dot uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 glitch-btn shadow-2xl shadow-nt-red/20 active:bg-nt-red/80"
            >
              INITIALIZE APP <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">
              BY CONTINUING YOU AGREE TO SYSTEM_LOGS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;