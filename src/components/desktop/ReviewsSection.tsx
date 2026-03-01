'use client';
import { useEffect, useRef } from 'react';

const reviews = [
    {
        name: 'Priya Sharma',
        pet: 'Golden Retriever',
        rating: 5,
        text: 'Absolutely thrilled with Luna! She was delivered healthy, vaccinated, and so playful. The Happy Pets team was supportive throughout.',
        avatar: '👩',
    },
    {
        name: 'Rahul Verma',
        pet: 'Persian Cat',
        rating: 5,
        text: 'Snowball is the most beautiful Persian cat I have ever seen. The entire process from browsing to delivery was seamless.',
        avatar: '👨',
    },
    {
        name: 'Ananya Das',
        pet: 'Cockatiel',
        rating: 4,
        text: 'Sunny is such a joy! She whistles beautiful tunes every morning. Happy Pets made bird parenting so easy with their guidance.',
        avatar: '👩',
    },
    {
        name: 'Vikram Singh',
        pet: 'German Shepherd',
        rating: 5,
        text: 'Rex is incredibly well-trained for his age. The breed certification and health documents were all genuine. Highly recommend!',
        avatar: '👨',
    },
    {
        name: 'Meera Patel',
        pet: 'Rabbit',
        rating: 5,
        text: 'Oreo is the cutest little rabbit! My kids are in love. The delivery was so careful and the team even called to check on us.',
        avatar: '👩',
    },
    {
        name: 'Arjun Kumar',
        pet: 'Beagle',
        rating: 5,
        text: "Max has been the best addition to our family. Great temperament, fully vaccinated, and the team's support has been fantastic.",
        avatar: '👨',
    },
];

export default function ReviewsSection() {
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
        <section className="section bg-cream" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14 reveal">
                    <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                        Testimonials
                    </span>
                    <h2 className="section-title">
                        Happy Pet <span className="gradient-text">Parents</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Don&apos;t just take our word for it — hear from our family of pet parents
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className="reveal bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: 5 }, (_, j) => (
                                    <span key={j} className={j < r.rating ? 'text-amber-400' : 'text-gray-200'}>★</span>
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-charcoal text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                                    {r.avatar}
                                </div>
                                <div>
                                    <p className="font-heading font-semibold text-sm text-charcoal">{r.name}</p>
                                    <p className="text-xs text-muted">Adopted a {r.pet}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
