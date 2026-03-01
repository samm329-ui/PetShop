'use client';
import { useState, useEffect, useRef } from 'react';
import { useBooking } from '@/context/BookingContext';
import { pets } from '@/data/pets';

const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export default function VisitBookingSection() {
    const { addBooking, selectedPetForBooking, isBookingOpen, setIsBookingOpen } = useBooking();
    const [selectedPet, setSelectedPet] = useState(selectedPetForBooking || '');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedPetForBooking) setSelectedPet(selectedPetForBooking);
    }, [selectedPetForBooking]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const pet = pets.find(p => p.id === selectedPet);
        addBooking({
            petId: selectedPet,
            petName: pet?.name || 'Any Pet',
            date: selectedDate,
            timeSlot: selectedTime,
            customerName,
            customerPhone,
        });
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setIsBookingOpen(false);
            setSelectedPet('');
            setSelectedDate('');
            setSelectedTime('');
            setCustomerName('');
            setCustomerPhone('');
        }, 3000);
    };

    return (
        <section id="visit" className="section" ref={sectionRef} style={{ background: 'white' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — info */}
                    <div className="reveal">
                        <span className="inline-block text-sm font-semibold text-accent-dark uppercase tracking-widest mb-3">
                            📅 Schedule a Visit
                        </span>
                        <h2 className="section-title mb-4" style={{ textAlign: 'left' }}>
                            Meet Your Pet <span className="gradient-text">In Person</span>
                        </h2>
                        <p className="text-muted mb-6 leading-relaxed">
                            Want to see your future companion before bringing them home?
                            Book a visit to our store and spend quality time with your favorite pet.
                            Our staff will be happy to guide you.
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: '📍', text: '123, Happy Street, Pet Town, India - 400001' },
                                { icon: '🕐', text: 'Mon - Sat: 10:00 AM - 6:00 PM' },
                                { icon: '📞', text: '+91 98765 43210' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-charcoal">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — form */}
                    <div className="reveal">
                        {isSubmitted ? (
                            <div className="bg-green-50 rounded-3xl p-10 text-center animate-scale-in">
                                <span className="text-6xl mb-4 block">✅</span>
                                <h3 className="font-heading text-2xl font-bold text-green-700 mb-2">Visit Booked!</h3>
                                <p className="text-green-600">We&apos;ll confirm your appointment shortly via phone.</p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-cream rounded-3xl p-8 space-y-5"
                            >
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={customerName}
                                        onChange={e => setCustomerName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        value={customerPhone}
                                        onChange={e => setCustomerPhone(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-2">Select Pet</label>
                                    <select
                                        value={selectedPet}
                                        onChange={e => setSelectedPet(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                    >
                                        <option value="">Any pet / Just browsing</option>
                                        {pets.filter(p => p.availability === 'Available').map(pet => (
                                            <option key={pet.id} value={pet.id}>{pet.name} ({pet.breed})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-charcoal mb-2">Date</label>
                                        <input
                                            type="date"
                                            required
                                            min={today}
                                            value={selectedDate}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-charcoal mb-2">Time Slot</label>
                                        <select
                                            required
                                            value={selectedTime}
                                            onChange={e => setSelectedTime(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                        >
                                            <option value="">Select time</option>
                                            {timeSlots.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 rounded-2xl text-base font-bold">
                                    Book a Visit
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
