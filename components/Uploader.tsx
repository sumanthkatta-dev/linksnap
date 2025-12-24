
import React, { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';

interface UploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
  previewImage: string | null;
  onClear: () => void;
}

const Uploader: React.FC<UploaderProps> = ({ onUpload, isProcessing, previewImage, onClear }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`relative h-[380px] squircle border-0 transition-all duration-500 flex flex-col items-center justify-center glass-ios overflow-hidden group shadow-2xl ${
        dragActive ? 'bg-ls-muted/20 ring-2 ring-ls-muted/40' : 'hover:bg-ls-muted/5'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {!isProcessing && !previewImage ? (
        <div className="flex flex-col items-center text-center px-8 cursor-pointer relative z-10 w-full h-full justify-center">
          <div className="w-16 h-16 rounded-3xl bg-ls-blue/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-xl">
            <Plus className="w-8 h-8 text-ls-beige" strokeWidth={2} />
          </div>
          <p className="text-lg font-bold text-ls-beige mb-1">New Snapshot</p>
          <p className="text-ls-muted text-xs font-semibold opacity-60">Upload YouTube or Instagram screens</p>
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="relative w-full h-full p-2">
          <img 
            src={previewImage!} 
            alt="Preview" 
            className={`w-full h-full object-contain rounded-[28px] transition-all duration-700 ${isProcessing ? 'opacity-30 blur-2xl grayscale' : ''}`} 
          />
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-ls-muted animate-spin mb-3 opacity-80" strokeWidth={2} />
              <span className="text-[10px] font-black tracking-widest text-ls-beige uppercase animate-pulse text-center px-4">Deep Content Scanning...</span>
            </div>
          )}
          {!isProcessing && (
            <button 
              onClick={onClear}
              className="absolute top-4 right-4 p-2 bg-ls-navy/80 rounded-full text-ls-beige border border-white/10 shadow-2xl hover:bg-ls-muted transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Uploader;
