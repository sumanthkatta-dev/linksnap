
import React from 'react';
import { Search, LayoutGrid, List, FileDown } from 'lucide-react';
import { ViewMode } from '../types';

interface RegistryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  onExport: () => void;
}

const RegistryHeader: React.FC<RegistryHeaderProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onExport,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
      <div className="relative flex-1 w-full group">
        <Search className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-nt-red transition-colors" />
        <input
          type="text"
          placeholder="FILTER REGISTRY..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent border-2 border-white/10 rounded-full py-3.5 md:py-4.5 pl-12 md:pl-14 pr-6 md:pr-8 focus:outline-none focus:border-nt-red transition-all text-xs md:text-sm font-dot text-nt-white placeholder:text-white/10 h-14 md:h-16 tracking-widest"
        />
      </div>

      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        <div className="flex flex-1 md:flex-none p-1 border-2 border-white/10 rounded-full h-14 md:h-16 bg-nt-black">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`flex-1 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all ${
              viewMode === 'grid' ? 'bg-nt-white text-nt-black' : 'text-white/20 hover:text-nt-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex-1 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all ${
              viewMode === 'list' ? 'bg-nt-white text-nt-black' : 'text-white/20 hover:text-nt-white'
            }`}
          >
            <List className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        <button
          onClick={onExport}
          className="w-14 h-14 md:w-16 md:h-16 border-2 border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-nt-red hover:border-nt-red transition-all active:scale-90 bg-nt-black"
        >
          <FileDown className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default RegistryHeader;
