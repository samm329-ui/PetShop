'use client';
import React, { createContext, useContext, useState } from 'react';

export interface Booking {
    id: string;
    petId: string;
    petName: string;
    date: string;
    timeSlot: string;
    customerName: string;
    customerPhone: string;
    status: 'confirmed' | 'pending';
}

interface BookingContextType {
    bookings: Booking[];
    addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
    isBookingOpen: boolean;
    setIsBookingOpen: (open: boolean) => void;
    selectedPetForBooking: string | null;
    setSelectedPetForBooking: (petId: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedPetForBooking, setSelectedPetForBooking] = useState<string | null>(null);

    const addBooking = (booking: Omit<Booking, 'id' | 'status'>) => {
        const newBooking: Booking = {
            ...booking,
            id: `BK-${Date.now()}`,
            status: 'confirmed',
        };
        setBookings(prev => [...prev, newBooking]);
    };

    return (
        <BookingContext.Provider value={{
            bookings, addBooking, isBookingOpen, setIsBookingOpen,
            selectedPetForBooking, setSelectedPetForBooking,
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error('useBooking must be used within BookingProvider');
    return ctx;
}
