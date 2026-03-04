import React, { useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface DocumentPageProps {
  onClose: () => void;
}

const DocumentPage: React.FC<DocumentPageProps & { title: string; content: string }> = ({ 
  title, 
  content, 
  onClose 
}) => {
  // Scroll to top when component mounts (robust reset)
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white nothing-grid">
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />
      
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-nt-red transition-colors group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden md:inline">Back</span>
            </button>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <h1 className="text-base md:text-xl font-bold">
              Link<span className="text-nt-red">Snap</span>
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">
        {/* Document Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-nt-red to-transparent rounded-full" />
        </div>

        {/* Document Content with improved readability */}
        <div className="glass-nothing squircle-inner p-6 md:p-10 border-white/10">
          <div className="prose prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:mb-6
            prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
            prose-h3:text-lg prose-h3:md:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-white/90
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-nt-red prose-a:no-underline hover:prose-a:underline prose-a:transition-all
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:my-4 prose-ul:text-white/70
            prose-ol:my-4 prose-ol:text-white/70
            prose-li:mb-2 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-nt-red prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg
            prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-white/60 prose-blockquote:italic
            prose-code:text-nt-red prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          ">
            {content}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 bg-nt-red hover:bg-nt-red/90 text-white rounded-lg font-semibold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to LinkSnap
          </button>
        </div>
      </main>
    </div>
  );
};

export default DocumentPage;
