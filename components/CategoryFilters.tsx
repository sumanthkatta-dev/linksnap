
import React from 'react';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="overflow-x-auto no-scrollbar py-1">
      <div className="flex gap-2 min-w-max">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
              selectedCategory === cat 
                ? 'bg-ls-muted text-ls-navy shadow-lg shadow-ls-muted/10 translate-y-[-1px]' 
                : 'bg-ls-beige/5 text-ls-muted hover:bg-ls-muted/5 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
