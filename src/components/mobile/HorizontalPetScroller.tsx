'use client';
import { Pet } from '@/data/pets';
import { useCart } from '@/context/CartContext';

const petImages: Record<string, string> = {
    'dog-1': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
    'dog-2': 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&h=300&fit=crop',
    'dog-3': 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop',
    'dog-4': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
    'dog-5': 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=300&h=300&fit=crop',
    'dog-6': 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop',
    'cat-1': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=300&fit=crop',
    'cat-2': 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&h=300&fit=crop',
    'cat-3': 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&h=300&fit=crop',
    'cat-4': 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=300&h=300&fit=crop',
    'cat-5': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=300&h=300&fit=crop',
    'bird-1': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=300&fit=crop',
    'bird-2': 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=300&h=300&fit=crop',
    'bird-3': 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=300&h=300&fit=crop',
    'bird-4': 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=300&h=300&fit=crop',
    'exotic-1': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=300&fit=crop',
    'exotic-2': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&h=300&fit=crop',
    'exotic-3': 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=300&h=300&fit=crop',
    'exotic-4': 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=300&h=300&fit=crop',
};

interface Props {
    title: string;
    pets: Pet[];
    onPetClick: (pet: Pet) => void;
}

export default function HorizontalPetScroller({ title, pets, onPetClick }: Props) {
    const { addToCart } = useCart();

    if (pets.length === 0) return null;

    return (
        <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
                <h3 className="font-heading font-bold text-charcoal text-base">{title}</h3>
                <button className="text-primary text-xs font-semibold">View All →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
                {pets.map(pet => (
                    <div
                        key={pet.id}
                        className="flex-shrink-0 w-[160px] bg-white rounded-2xl shadow-sm overflow-hidden"
                        onClick={() => onPetClick(pet)}
                    >
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={petImages[pet.id] || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop'}
                                alt={pet.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute top-2 left-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${pet.availability === 'Available'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    {pet.availability === 'Available' ? '●' : '◐'} {pet.availability}
                                </span>
                            </div>
                        </div>
                        <div className="p-3">
                            <h4 className="font-heading font-bold text-sm text-charcoal truncate">{pet.name}</h4>
                            <p className="text-[11px] text-muted truncate">{pet.breed} • {pet.age}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="font-heading font-bold text-primary text-sm">₹{pet.price.toLocaleString()}</span>
                                <button
                                    onClick={e => { e.stopPropagation(); addToCart(pet); }}
                                    className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                                    disabled={pet.availability !== 'Available'}
                                    aria-label="Add to cart"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
