'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (overlayRef.current) {
                const scroll = window.scrollY;
                const opacity = Math.min(scroll / 600, 0.7);
                overlayRef.current.style.background = `rgba(0,0,0,${0.35 + opacity * 0.3})`;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="/images/hero-poster.jpg"
            >
                <source
                    src="https://iozilxcfbnztrqozmzcq.supabase.co/storage/v1/object/public/asset/Man_laughing_with_pets_35da6518ed.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Gradient Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 transition-colors duration-200"
                style={{ background: 'rgba(0,0,0,0.35)' }}
            />

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF8EE] to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                <div className="animate-fade-in-up">
                    <span className="inline-block text-6xl mb-6 animate-paw-bounce">🐾</span>
                </div>

                <h1
                    className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up max-w-4xl leading-tight"
                    style={{ animationDelay: '200ms', animationFillMode: 'both' }}
                >
                    Find Your Perfect
                    <br />
                    <span className="bg-gradient-to-r from-[#5FBDB3] to-[#F4B860] bg-clip-text text-transparent">
                        Furry Friend
                    </span>
                </h1>

                <p
                    className="text-lg md:text-xl text-white/85 max-w-2xl mb-10 animate-fade-in-up font-light leading-relaxed"
                    style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                >
                    Discover healthy, happy pets ready to fill your home with love.
                    Dogs, cats, birds & exotic companions — all from trusted breeders.
                </p>

                <div
                    className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
                    style={{ animationDelay: '600ms', animationFillMode: 'both' }}
                >
                    <a
                        href="#categories"
                        className="btn-primary text-lg px-8 py-4 rounded-full inline-flex items-center gap-3 shadow-xl hover:shadow-2xl"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        Browse Pets
                    </a>
                    <a
                        href="#visit"
                        className="btn-outline text-lg px-8 py-4 rounded-full border-white/40 text-white hover:bg-white hover:text-charcoal inline-flex items-center gap-3"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Book a Visit
                    </a>
                </div>

                {/* Scroll indicator */}
                <div
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-fade-in"
                    style={{ animationDelay: '1000ms', animationFillMode: 'both' }}
                >
                    <div className="flex flex-col items-center gap-2 text-white/60">
                        <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
