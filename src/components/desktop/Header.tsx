'use client';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '#hero' },
        { label: 'Dogs', href: '#categories' },
        { label: 'Cats', href: '#categories' },
        { label: 'Birds', href: '#categories' },
        { label: 'Visit Us', href: '#visit' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '43.2px' }}>
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-2 group">
                    <span className="text-3xl group-hover:animate-paw-bounce">🐾</span>
                    <span
                        className={`font-heading text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'
                            }`}
                    >
                        Happy<span className="text-primary">Pets</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={`relative font-medium text-sm tracking-wide transition-colors duration-300 group ${scrolled ? 'text-charcoal hover:text-primary' : 'text-white/90 hover:text-white'
                                }`}
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Cart Button */}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className={`relative p-2.5 rounded-full transition-all duration-300 ${scrolled
                            ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                            : 'bg-white/15 hover:bg-white/25 text-white'
                            }`}
                        aria-label="Open cart"
                        style={{ width: '22.15px', height: '25.7px', left: '-22px', top: '-1px', transform: 'translate(-5.6px, 0px)', transition: 'none' }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ width: '26.79px', height: '29.25px', transform: 'translate(-7.21px, 0px)', position: 'relative' }}
                        >
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute bg-accent text-charcoal text-xs font-bold rounded-full flex items-center justify-center animate-scale-in"
                                style={{ width: '26.09px', height: '22.25px', left: '11px', top: '-6px' }}
                            >
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Call CTA */}
                    <a
                        href="tel:+919876543210"
                        className={`hidden md:flex items-center gap-2.5 px-7 py-3 rounded-full font-heading font-semibold text-sm transition-all duration-300 ${scrolled
                            ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg'
                            : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                            }`}
                        style={{ transform: 'translate(-1.6px, -3.2px)', whiteSpace: 'nowrap', transition: 'none' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ width: '24.73px', height: '15.08px' }}
                        >
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        Call Now
                    </a>

                    {/* Mobile Menu */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-charcoal' : 'text-white'
                            }`}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {menuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 animate-slide-up">
                    <nav className="flex flex-col p-4 gap-1">
                        {navLinks.map(link => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-xl text-charcoal font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
