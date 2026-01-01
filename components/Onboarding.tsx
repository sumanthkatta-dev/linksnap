import React, { useState } from 'react';
import { ArrowRight, Scan, ShieldCheck, Zap, Key, Cpu, Upload, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [showSteps, setShowSteps] = useState(false);

  const steps = [
    {
      icon: <Key className="w-5 h-5" />,
      title: 'Add API Key',
      description: 'Get your free Google Gemini API key from ai.google.dev',
      color: 'from-blue-500/20 to-blue-600/20',
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: 'Select Free Model',
      description: 'Choose from free Gemini models (no charges)',
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      icon: <Upload className="w-5 h-5" />,
      title: 'Upload Image',
      description: 'Screenshot or paste URL of the tool/website',
      color: 'from-green-500/20 to-green-600/20',
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'Done!',
      description: 'AI analyzes and catalogs your digital tools',
      color: 'from-nt-red/20 to-red-600/20',
    },
  ];
  return (
    <div className="fixed inset-0 z-[100] bg-nt-black flex items-center justify-center overflow-hidden">
      <div className="w-full h-full md:max-w-md bg-nt-black relative overflow-hidden flex flex-col md:rounded-[40px] md:border-8 md:border-nt-gray pt-safe pb-safe">
        {/* Background grid */}
        <div className="absolute inset-0 nothing-grid opacity-20 pointer-events-none z-0"></div>

        <div className="flex flex-col items-center h-full py-8 px-6 text-center animate-ios relative z-10 overflow-hidden">
          <div className="w-full flex justify-end px-2 mb-4">
            <button 
              onClick={onComplete}
              className="text-[10px] font-dot text-white/40 hover:text-white tracking-widest uppercase relative z-20 min-h-[44px] min-w-[44px]"
            >
              Skip
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full overflow-hidden">
            {!showSteps && (
              <div className="relative group">
                <div className="w-48 h-48 md:w-56 md:h-56 squircle border-2 border-white/5 flex items-center justify-center relative overflow-hidden bg-white/[0.02] shadow-[0_0_50px_rgba(215,25,33,0.1)]">
                   <div className="absolute inset-0 nothing-grid opacity-20 pointer-events-none"></div>
                   <Scan className="w-12 h-12 text-white opacity-80" strokeWidth={1} />
                   <div className="absolute top-6 right-6 w-2 h-2 bg-nt-red rounded-full shadow-[0_0_15px_#D71921] animate-pulse"></div>
                   <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-dot text-white/20 tracking-widest uppercase">System_Active_V.1</span>
                </div>
                <div className="absolute -inset-6 border border-white/5 rounded-full animate-[spin_15s_linear_infinite] pointer-events-none"></div>
                <div className="absolute -inset-10 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse] pointer-events-none opacity-50"></div>
              </div>
            )}
          </div>

          <div className="space-y-4 w-full relative z-20 flex-1 flex flex-col max-h-[60vh] overflow-y-auto pb-4">
            {!showSteps ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <ShieldCheck className="w-3 h-3 text-nt-red" />
                    <span className="text-[8px] font-bold text-white/40 tracking-[0.4em] uppercase">Neural_Link_Verified</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-dot tracking-[0.2em] text-white uppercase leading-none">
                    LINK<span className="text-nt-red">SNAP</span>
                  </h1>
                  <p className="text-[10px] md:text-xs font-medium text-white/40 tracking-widest uppercase max-w-[240px] mx-auto leading-relaxed">
                    The high-precision archive for your <br/>
                    <span className="text-white">digital tool ecosystem.</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 px-2 w-full">
                  <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 flex flex-col items-center gap-1">
                    <Zap className="w-3 h-3 text-nt-red" />
                    <span className="text-[7px] font-dot text-white/60 uppercase tracking-widest">Instant_Scan</span>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5 flex flex-col items-center gap-1">
                    <Scan className="w-3 h-3 text-nt-red" />
                    <span className="text-[7px] font-dot text-white/60 uppercase tracking-widest">Deep_Grounding</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowSteps(true)}
                  className="w-full h-12 bg-nt-red text-white rounded-xl font-dot uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2 glitch-btn shadow-xl shadow-nt-red/20 active:bg-nt-red/80 mt-4"
                >
                  INITIALIZE APP <ArrowRight className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <div className="text-center animate-in fade-in slide-in-from-top-4 duration-500 flex-shrink-0">
                  <h2 className="text-2xl md:text-3xl font-dot tracking-[0.2em] text-white uppercase">Get Started</h2>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">4 Simple Steps</p>
                </div>

                <div className="space-y-2 w-full flex-1 overflow-y-auto no-scrollbar">
                  {steps.map((step, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border border-white/10 bg-gradient-to-r ${step.color} backdrop-blur-sm animate-in fade-in slide-in-from-left duration-500 transition-all hover:scale-102 hover:border-white/30 flex-shrink-0`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div className="text-nt-red flex-shrink-0 animate-pulse">{React.cloneElement(step.icon, { className: "w-4 h-4" })}</div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className="inline-block bg-white/20 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                              STEP {index + 1}
                            </span>
                          </div>
                          <h3 className="text-xs font-dot text-white uppercase mt-0.5 tracking-wide">{step.title}</h3>
                          <p className="text-[9px] text-white/60 mt-0.5">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 w-full flex-shrink-0 mt-2">
                  <button 
                    onClick={onComplete}
                    className="w-full h-11 bg-nt-red text-white rounded-lg font-dot uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 shadow-lg shadow-nt-red/20 active:bg-nt-red/80"
                  >
                    START ARCHIVING <ArrowRight className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setShowSteps(false)}
                    className="w-full h-9 text-white/40 font-dot uppercase tracking-[0.2em] text-xs hover:text-white"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
            
          </div>
            
            <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em] flex-shrink-0 mt-2">
              BY CONTINUING YOU AGREE TO SYSTEM_LOGS
            </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;