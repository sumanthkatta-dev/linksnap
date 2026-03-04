import React from 'react';
import { Link2, ArrowRight } from 'lucide-react';

type PageType = 'privacy' | 'terms' | 'support' | 'contact' | 'pricing' | 'security';

interface FooterProps {
  onNavigate?: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (key: PageType) => {
    if (onNavigate) {
      onNavigate(key);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Left Column - Brand & CTA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Link2 className="w-6 h-6 text-nt-red" />
                <h3 className="text-xl font-bold">
                  Link<span className="text-nt-red">Snap</span>
                </h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-3">
                AI-powered link extraction and bookmark management.
                Upload a screenshot, get your links instantly — no account
                needed.
              </p>
              <a
                href="mailto:linksnap.ai@gmail.com"
                className="text-sm text-nt-red hover:underline"
              >
                linksnap.ai@gmail.com
              </a>
            </div>

            {/* Upgrade CTA Card */}
            <div className="glass-nothing squircle-inner p-6 border-white/20">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-2">
                WANT MORE POWER?
              </h4>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Upgrade to Pro or Max for faster processing, bulk uploads
                & team collaboration.
              </p>
              <button 
                onClick={() => handleLinkClick('pricing')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-nt-red hover:bg-nt-red/90 text-white text-sm font-medium rounded-lg transition-all duration-200"
              >
                View Plans <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">
              PRODUCT
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('pricing')}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/sumanthkatta-dev/linksnap/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-nt-red transition-colors inline-block"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sumanthkatta-dev/linksnap/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-nt-red transition-colors inline-block"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleLinkClick('support')}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors text-left"
                >
                  Support & FAQ
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/sumanthkatta-dev/linksnap#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-nt-red transition-colors inline-block"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sumanthkatta-dev/linksnap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-nt-red transition-colors inline-block"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sumanthkatta-dev/linksnap/issues/new?labels=bug&template=bug_report.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-nt-red transition-colors inline-block"
                >
                  Report a Bug
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/90 mb-4">
              LEGAL
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleLinkClick('privacy')}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('terms')}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('security')}
                  className="text-sm text-white/60 hover:text-nt-red transition-colors text-left"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} LinkSnap. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <span className="text-nt-red">❤️</span> using React · Tailwind · Vite · Hosted on Vercel
            </p>
            <p>Powered by Google Gemini AI</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
