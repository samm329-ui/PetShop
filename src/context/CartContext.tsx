'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Pet } from '@/data/pets';

export interface CartItem {
    pet: Pet;
    quantity: number;
    deliveryMethod: 'Home Delivery' | 'Store Pickup' | 'Visit Before Purchase';
}

interface CartContextType {
    items: CartItem[];
    addToCart: (pet: Pet) => void;
    removeFromCart: (petId: string) => void;
    updateQuantity: (petId: string, quantity: number) => void;
    updateDelivery: (petId: string, method: CartItem['deliveryMethod']) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
    deliveryCharge: number;
    total: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('happy-pets-cart');
        if (saved) {
            try { setItems(JSON.parse(saved)); } catch { }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('happy-pets-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback((pet: Pet) => {
        setItems(prev => {
            const existing = prev.find(i => i.pet.id === pet.id);
            if (existing) {
                return prev.map(i => i.pet.id === pet.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { pet, quantity: 1, deliveryMethod: 'Home Delivery' }];
        });
        setIsCartOpen(true);
    }, []);

    const removeFromCart = useCallback((petId: string) => {
        setItems(prev => prev.filter(i => i.pet.id !== petId));
    }, []);

    const updateQuantity = useCallback((petId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems(prev => prev.filter(i => i.pet.id !== petId));
            return;
        }
        setItems(prev => prev.map(i => i.pet.id === petId ? { ...i, quantity } : i));
    }, []);

    const updateDelivery = useCallback((petId: string, method: CartItem['deliveryMethod']) => {
        setItems(prev => prev.map(i => i.pet.id === petId ? { ...i, deliveryMethod: method } : i));
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.pet.price * i.quantity, 0);
    const hasDelivery = items.some(i => i.deliveryMethod === 'Home Delivery');
    const deliveryCharge = hasDelivery && subtotal < 10000 ? 500 : 0;
    const total = subtotal + deliveryCharge;

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity, updateDelivery,
            clearCart, totalItems, subtotal, deliveryCharge, total,
            isCartOpen, setIsCartOpen,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
