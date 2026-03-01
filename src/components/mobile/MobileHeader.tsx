'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function MobileHeader() {
    const { totalItems, setIsCartOpen } = useCart();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-50 shadow-sm">
            <div className="flex items-center justify-between px-4 h-14">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-1.5">
                    <span className="text-xl">🐾</span>
                    <span className="font-heading text-lg font-bold text-charcoal">
                        Happy<span className="text-primary">Pets</span>
                    </span>
                </a>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                        aria-label="Search"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center relative"
                        aria-label="Cart"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5FBDB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-accent text-charcoal text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Search Expand */}
            {searchOpen && (
                <div className="px-4 pb-3 animate-slide-up">
                    <div className="relative">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for pets, breeds..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
