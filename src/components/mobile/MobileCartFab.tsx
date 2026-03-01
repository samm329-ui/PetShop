'use client';
import { useCart } from '@/context/CartContext';

export default function MobileCartFab() {
    const { totalItems, setIsCartOpen } = useCart();

    if (totalItems === 0) return null;

    return (
        <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full bg-primary shadow-xl shadow-primary/30 flex items-center justify-center text-white animate-scale-in hover:scale-105 transition-transform"
            aria-label="Open cart"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-accent text-charcoal text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
            </span>
        </button>
    );
}
