import React from 'react';
import { X } from 'lucide-react';

interface DocumentPageProps {
  onClose: () => void;
}

const DocumentPage: React.FC<DocumentPageProps & { title: string; content: string }> = ({ 
  title, 
  content, 
  onClose 
}) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg md:text-2xl font-dot uppercase tracking-widest">{title}</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="prose prose-invert max-w-none prose-headings:font-dot prose-headings:tracking-wide prose-a:text-nt-red hover:prose-a:underline">
          {content}
        </div>
      </main>
    </div>
  );
};

export default DocumentPage;
