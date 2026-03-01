'use client';
import { categories } from '@/data/pets';
import { useRef, useEffect } from 'react';

interface Props {
    onSelectCategory: (slug: string) => void;
}

const categoryImages: Record<string, string> = {
    dogs: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
    cats: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop',
    birds: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop',
    exotic: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&h=400&fit=crop',
};

export default function CategorySection({ onSelectCategory }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) e.target.classList.add('visible');
                });
            },
            { threshold: 0.15 }
        );
        const els = sectionRef.current?.querySelectorAll('.reveal');
        els?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="categories" className="section bg-cream" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14 reveal">
                    <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                        Our Family
                    </span>
                    <h2 className="section-title">
                        Choose Your <span className="gradient-text">Companion</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        From loyal dogs to graceful cats, chirpy birds to unique exotics — find the perfect pet for your home.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.slug)}
                            className={`reveal delay-${(i + 1) * 100} group relative overflow-hidden rounded-[20px] aspect-[3/4] cursor-pointer border-0 p-0 text-left`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            {/* Image */}
                            <img
                                src={categoryImages[cat.slug]}
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-6">
                                <span className="text-4xl mb-3 transition-transform duration-300 group-hover:-translate-y-1">
                                    {cat.icon}
                                </span>
                                <h3 className="text-white text-2xl font-heading font-bold mb-1">{cat.name}</h3>
                                <p className="text-white/70 text-sm mb-4">{cat.description}</p>
                                <div className="flex items-center gap-2 text-white/80 text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <span>Explore</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover ring */}
                            <div className="absolute inset-0 rounded-[20px] border-2 border-transparent transition-colors duration-300 group-hover:border-primary/50" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
