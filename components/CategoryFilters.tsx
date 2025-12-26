import React from 'react';

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="overflow-x-auto no-scrollbar py-4">
      <div className="flex gap-4 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-8 py-3 rounded-full text-[10px] font-dot uppercase tracking-[0.3em] transition-all border-2 ${
              selectedCategory === cat
                ? 'bg-nt-red border-nt-red text-nt-white'
                : 'border-white/10 text-white/40 hover:border-white/30 hover:text-nt-white'
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