
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
  onExport 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ls-muted/50" strokeWidth={2.5} />
        <input 
          type="text" 
          placeholder="Filter by site, category, or summary..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full glass-ios rounded-xl py-3.5 pl-11 pr-5 focus:outline-none ring-offset-2 focus:ring-2 ring-ls-muted/20 transition-all text-sm font-medium text-ls-beige placeholder:text-ls-muted/30 shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="segmented-bg flex p-1 shadow-inner">
          <button 
            onClick={() => onViewModeChange('grid')}
            className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-ls-muted text-ls-navy shadow-lg scale-100' : 'text-ls-muted hover:text-ls-beige scale-95 opacity-60'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onViewModeChange('list')}
            className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-ls-muted text-ls-navy shadow-lg scale-100' : 'text-ls-muted hover:text-ls-beige scale-95 opacity-60'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={onExport}
          className="p-3 bg-ls-muted/10 rounded-xl text-ls-muted hover:bg-ls-muted/20 transition-all border border-white/5 active:scale-95"
          title="Export Catalog as PDF"
        >
          <FileDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RegistryHeader;
