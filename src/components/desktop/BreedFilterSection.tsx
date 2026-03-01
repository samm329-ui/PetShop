'use client';
import { useState, useEffect, useRef } from 'react';
import { getPetsByCategory, getBreedsByCategory, Pet } from '@/data/pets';
import { useCart } from '@/context/CartContext';

const petImages: Record<string, string> = {
    'dog-1': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    'dog-2': 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop',
    'dog-3': 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop',
    'dog-4': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop',
    'dog-5': 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop',
    'dog-6': 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop',
    'cat-1': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop',
    'cat-2': 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&h=400&fit=crop',
    'cat-3': 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop',
    'cat-4': 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400&h=400&fit=crop',
    'cat-5': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop',
    'bird-1': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop',
    'bird-2': 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=400&h=400&fit=crop',
    'bird-3': 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400&h=400&fit=crop',
    'bird-4': 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=400&h=400&fit=crop',
    'exotic-1': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop',
    'exotic-2': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=400&fit=crop',
    'exotic-3': 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&h=400&fit=crop',
    'exotic-4': 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&h=400&fit=crop',
};

interface Props {
    category: string;
    onPetClick: (pet: Pet) => void;
    onBack: () => void;
}

export default function BreedFilterSection({ category, onPetClick, onBack }: Props) {
    const [selectedBreed, setSelectedBreed] = useState<string>('All');
    const breeds = getBreedsByCategory(category);
    const allPets = getPetsByCategory(category);
    const { addToCart } = useCart();
    const sectionRef = useRef<HTMLDivElement>(null);

    const filteredPets = selectedBreed === 'All'
        ? allPets
        : allPets.filter(p => p.breed === selectedBreed);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.05 }
        );
        sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [filteredPets]);

    const categoryNames: Record<string, string> = {
        dogs: '🐕 Dogs', cats: '🐱 Cats', birds: '🐦 Birds', exotic: '🦎 Exotic',
    };

    return (
        <section className="section bg-cream" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Back + Title */}
                <div className="flex items-center gap-4 mb-8 reveal">
                    <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2E2E" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="section-title text-3xl">{categoryNames[category] || category}</h2>
                        <p className="text-muted text-sm">{filteredPets.length} pets available</p>
                    </div>
                </div>

                {/* Breed filters */}
                <div className="flex gap-2 flex-wrap mb-10 reveal">
                    <button
                        onClick={() => setSelectedBreed('All')}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${selectedBreed === 'All'
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white text-charcoal hover:bg-primary/10'
                            }`}
                    >
                        All ({allPets.length})
                    </button>
                    {breeds.map(breed => {
                        const count = allPets.filter(p => p.breed === breed).length;
                        return (
                            <button
                                key={breed}
                                onClick={() => setSelectedBreed(breed)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${selectedBreed === breed
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white text-charcoal hover:bg-primary/10'
                                    }`}
                            >
                                {breed} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Pet grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPets.map((pet, i) => (
                        <div
                            key={pet.id}
                            className="reveal card group cursor-pointer"
                            style={{ animationDelay: `${i * 60}ms` }}
                            onClick={() => onPetClick(pet)}
                        >
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src={petImages[pet.id] || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop'}
                                    alt={pet.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className={`badge text-xs ${pet.availability === 'Available' ? 'badge-available' :
                                        pet.availability === 'Coming Soon' ? 'badge-coming-soon' : 'badge-sold-out'
                                        }`}>
                                        {pet.availability}
                                    </span>
                                </div>
                                {pet.availability === 'Available' && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={e => { e.stopPropagation(); addToCart(pet); }}
                                            className="w-full bg-white text-charcoal text-sm font-semibold py-2 rounded-xl hover:bg-primary hover:text-white transition-colors"
                                        >
                                            Quick Add — ₹{pet.price.toLocaleString()}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-heading font-bold text-charcoal">{pet.name}</h3>
                                <p className="text-xs text-muted">{pet.breed} • {pet.age} • {pet.gender}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-heading font-bold text-primary">₹{pet.price.toLocaleString()}</span>
                                    <span className={`w-2 h-2 rounded-full ${pet.vaccination === 'Fully Vaccinated' ? 'bg-green-400' : 'bg-amber-400'
                                        }`} title={pet.vaccination} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
