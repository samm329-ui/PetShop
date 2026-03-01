'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface Props {
    onNavigate: (section: string) => void;
}

export default function MobileBottomNav({ onNavigate }: Props) {
    const { totalItems, setIsCartOpen } = useCart();
    const [active, setActive] = useState('home');

    const tabs = [
        {
            id: 'home', label: 'Home', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            )
        },
        {
            id: 'categories', label: 'Explore', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
            )
        },
        {
            id: 'search', label: 'Search', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            )
        },
        {
            id: 'cart', label: 'Cart', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
            )
        },
        {
            id: 'profile', label: 'More', icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
            )
        },
    ];

    const handleTap = (id: string) => {
        setActive(id);
        if (id === 'cart') {
            setIsCartOpen(true);
        } else {
            onNavigate(id);
        }
    };

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTap(tab.id)}
                        className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative transition-colors ${active === tab.id ? 'text-primary' : 'text-gray-400'
                            }`}
                        aria-label={tab.label}
                    >
                        {active === tab.id && (
                            <span className="absolute -top-0 w-8 h-0.5 bg-primary rounded-full" />
                        )}
                        <span className="relative">
                            {tab.icon}
                            {tab.id === 'cart' && totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-accent text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </span>
                        <span className="text-[10px] font-semibold leading-none mt-0.5">{tab.label}</span>
                    </button>
                ))}
            </div>
            {/* Safe area for iPhones */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
}
