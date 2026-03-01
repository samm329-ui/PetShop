'use client';
import { getFeaturedPets, Pet } from '@/data/pets';
import { useCart } from '@/context/CartContext';
import { useEffect, useRef } from 'react';

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
    onPetClick: (pet: Pet) => void;
}

export default function FeaturedPetsSection({ onPetClick }: Props) {
    const featured = getFeaturedPets();
    const { addToCart } = useCart();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="featured" className="section" ref={sectionRef} style={{ background: 'white' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14 reveal">
                    <span className="inline-block text-sm font-semibold text-accent-dark uppercase tracking-widest mb-3">
                        ⭐ Top Picks
                    </span>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Pets</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Our most loved companions, handpicked for your family
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((pet, i) => (
                        <div
                            key={pet.id}
                            className="reveal card group cursor-pointer"
                            style={{ animationDelay: `${i * 100}ms` }}
                            onClick={() => onPetClick(pet)}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src={petImages[pet.id] || `https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop`}
                                    alt={pet.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className={`badge ${pet.availability === 'Available' ? 'badge-available' :
                                        pet.availability === 'Coming Soon' ? 'badge-coming-soon' : 'badge-sold-out'
                                        }`}>
                                        {pet.availability}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="badge bg-white/90 text-charcoal backdrop-blur-sm">
                                        {pet.gender === 'Male' ? '♂️' : '♀️'} {pet.gender}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-charcoal">{pet.name}</h3>
                                        <p className="text-muted text-sm">{pet.breed} • {pet.age}</p>
                                    </div>
                                    <span className="font-heading text-xl font-bold text-primary">
                                        ₹{pet.price.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {pet.personality.slice(0, 3).map(trait => (
                                        <span key={trait} className="text-xs bg-cream px-2.5 py-1 rounded-full text-muted font-medium">
                                            {trait}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`w-2 h-2 rounded-full ${pet.vaccination === 'Fully Vaccinated' ? 'bg-green-400' : 'bg-amber-400'
                                        }`} />
                                    <span className="text-xs text-muted">{pet.vaccination}</span>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); addToCart(pet); }}
                                    className="w-full btn-primary rounded-xl py-3 text-center flex items-center justify-center gap-2"
                                    disabled={pet.availability !== 'Available'}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                                    </svg>
                                    {pet.availability === 'Available' ? 'Add to Cart' : 'Coming Soon'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
