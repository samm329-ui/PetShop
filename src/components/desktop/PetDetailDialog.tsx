'use client';
import { Pet } from '@/data/pets';
import { useCart } from '@/context/CartContext';
import { useBooking } from '@/context/BookingContext';
import { useState } from 'react';

const petImages: Record<string, string> = {
    'dog-1': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    'dog-2': 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=600&fit=crop',
    'dog-3': 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&h=600&fit=crop',
    'dog-4': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop',
    'dog-5': 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&h=600&fit=crop',
    'dog-6': 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&h=600&fit=crop',
    'cat-1': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop',
    'cat-2': 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800&h=600&fit=crop',
    'cat-3': 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=600&fit=crop',
    'cat-4': 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=800&h=600&fit=crop',
    'cat-5': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&h=600&fit=crop',
    'bird-1': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&h=600&fit=crop',
    'bird-2': 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=800&h=600&fit=crop',
    'bird-3': 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=800&h=600&fit=crop',
    'bird-4': 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=800&h=600&fit=crop',
    'exotic-1': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&h=600&fit=crop',
    'exotic-2': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=600&fit=crop',
    'exotic-3': 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=600&fit=crop',
    'exotic-4': 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&h=600&fit=crop',
};

interface Props {
    pet: Pet;
    onClose: () => void;
}

export default function PetDetailDialog({ pet, onClose }: Props) {
    const { addToCart } = useCart();
    const { setIsBookingOpen, setSelectedPetForBooking } = useBooking();
    const [selectedDelivery, setSelectedDelivery] = useState(pet.deliveryOptions[0]);

    const handleBookVisit = () => {
        setSelectedPetForBooking(pet.id);
        setIsBookingOpen(true);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div className="overlay" onClick={onClose} />

            {/* Dialog */}
            <div className="fixed inset-4 md:inset-10 lg:inset-y-10 lg:inset-x-[12%] z-50 bg-white rounded-[24px] shadow-2xl overflow-hidden animate-scale-in flex flex-col lg:flex-row max-h-[92vh]">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors"
                    aria-label="Close"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2E2E" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Gallery — Left */}
                <div className="lg:w-3/5 relative bg-gray-100">
                    <img
                        src={petImages[pet.id] || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop'}
                        alt={pet.name}
                        className="w-full h-64 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`badge ${pet.availability === 'Available' ? 'badge-available' :
                            pet.availability === 'Coming Soon' ? 'badge-coming-soon' : 'badge-sold-out'
                            }`}>
                            {pet.availability}
                        </span>
                    </div>
                </div>

                {/* Details — Right (Sticky Sidebar on Desktop) */}
                <div className="lg:w-2/5 overflow-y-auto p-6 lg:p-10 flex flex-col">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{pet.breed}</span>
                            <span className="text-sm text-muted">• {pet.category}</span>
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-charcoal mb-1">{pet.name}</h2>
                        <p className="text-muted">{pet.gender} • {pet.age}</p>
                    </div>

                    {/* Price */}
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 mb-8">
                        <span className="text-sm text-muted block mb-1">Price</span>
                        <span className="font-heading text-3xl font-bold text-primary">₹{pet.price.toLocaleString()}</span>
                        <span className="text-sm text-muted ml-2">Inclusive of all charges</span>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="font-heading text-lg font-semibold mb-3">About {pet.name}</h3>
                        <p className="text-muted text-sm leading-relaxed">{pet.description}</p>
                    </div>

                    {/* Personality */}
                    <div className="mb-8">
                        <h3 className="font-heading text-lg font-semibold mb-3">Personality</h3>
                        <div className="flex flex-wrap gap-2">
                            {pet.personality.map(trait => (
                                <span key={trait} className="px-4 py-2 bg-cream rounded-full text-sm font-medium text-charcoal">
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Health */}
                    <div className="mb-8">
                        <h3 className="font-heading text-lg font-semibold mb-2">Health Details</h3>
                        <div className="flex items-start gap-2 bg-green-50 rounded-xl p-4">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <p className="text-sm text-green-800">{pet.healthDetails}</p>
                        </div>
                    </div>

                    {/* Delivery Options */}
                    <div className="mb-8">
                        <h3 className="font-heading text-lg font-semibold mb-3">Delivery Options</h3>
                        <div className="flex flex-col gap-2">
                            {pet.deliveryOptions.map(opt => (
                                <label
                                    key={opt}
                                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedDelivery === opt
                                        ? 'border-primary bg-primary/5'
                                        : 'border-gray-200 hover:border-primary/30'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value={opt}
                                        checked={selectedDelivery === opt}
                                        onChange={() => setSelectedDelivery(opt)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedDelivery === opt ? 'border-primary' : 'border-gray-300'
                                        }`}>
                                        {selectedDelivery === opt && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm font-medium">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons — Sticky bottom */}
                    <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
                        <button
                            onClick={() => { addToCart(pet); onClose(); }}
                            className="w-full btn-primary py-4 rounded-2xl text-base flex items-center justify-center gap-2"
                            disabled={pet.availability !== 'Available'}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                            </svg>
                            Add to Cart — ₹{pet.price.toLocaleString()}
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handleBookVisit} className="btn-outline py-3 rounded-2xl text-sm text-center">
                                📅 Book Visit
                            </button>
                            <a href="tel:+919876543210" className="btn-accent py-3 rounded-2xl text-sm text-center flex items-center justify-center gap-1">
                                📞 Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
