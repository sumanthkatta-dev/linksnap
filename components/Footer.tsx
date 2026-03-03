import React from 'react';

type PageType = 'privacy' | 'terms' | 'support' | 'contact';

interface FooterProps {
  onNavigate?: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const links: Array<{ label: string; key: PageType }> = [
    { label: 'Privacy', key: 'privacy' },
    { label: 'Terms', key: 'terms' },
    { label: 'Support', key: 'support' },
    { label: 'Contact Dev', key: 'contact' },
  ];

  const handleLinkClick = (key: PageType) => {
    if (onNavigate) {
      onNavigate(key);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8">
        {/* Top Section - Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/10">
          {/* Left Side */}
          <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em]">
            DEV: <span className="text-nt-red">SUMANTH KATTA</span>
          </div>

          {/* Center */}
          <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-center whitespace-nowrap">
            STACK: REACT // TYPESCRIPT // TAILWIND // VITE // GEMINI_API
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="https://github.com/sumanthkatta-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] border border-white/30 px-3 md:px-4 py-2 hover:border-nt-red hover:text-nt-red hover:shadow-[0_0_15px_#D71921] transition-all"
            >
              [GITHUB]
            </a>
          </div>
        </div>

        {/* Bottom Section - Documentation Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {links.map((link, index) => (
            <React.Fragment key={link.key}>
              <button
                onClick={() => handleLinkClick(link.key)}
                className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] border border-white/30 px-3 md:px-4 py-2 hover:border-nt-red hover:text-nt-red hover:shadow-[0_0_15px_#D71921] transition-all cursor-pointer bg-transparent"
              >
                [{link.label}]
              </button>
              {index < links.length - 1 && (
                <span className="text-white/20">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
