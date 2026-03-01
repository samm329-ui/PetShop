'use client';
import { categories } from '@/data/pets';

interface Props {
    onSelectCategory: (slug: string) => void;
    activeCategory: string | null;
}

export default function IconCategoryStrip({ onSelectCategory, activeCategory }: Props) {
    const allCategories = [
        { id: 'all', name: 'All Pets', slug: 'all', icon: '🏠' },
        ...categories.map(c => ({ ...c, icon: c.icon })),
    ];

    return (
        <div id="m-categories" className="lg:hidden px-4 py-4">
            <h3 className="font-heading font-bold text-charcoal text-base mb-3">Categories</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {allCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.slug === 'all' ? '' : cat.slug)}
                        className={`flex flex-col items-center gap-1.5 min-w-[68px] py-2.5 px-3 rounded-2xl transition-all ${(activeCategory === cat.slug || (!activeCategory && cat.slug === 'all'))
                                ? 'bg-primary/10 border-2 border-primary/30'
                                : 'bg-white border-2 border-transparent shadow-sm'
                            }`}
                    >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className={`text-[10px] font-semibold ${(activeCategory === cat.slug || (!activeCategory && cat.slug === 'all'))
                                ? 'text-primary'
                                : 'text-muted'
                            }`}>
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
