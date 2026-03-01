'use client';
import { useCart } from '@/context/CartContext';

export default function CartSheet() {
    const {
        items, removeFromCart, updateQuantity, totalItems,
        subtotal, deliveryCharge, total,
        isCartOpen, setIsCartOpen,
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="overlay" onClick={() => setIsCartOpen(false)} />

            {/* Sheet */}
            <div className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-white shadow-2xl animate-slide-in-right flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🛒</span>
                        <h2 className="font-heading text-xl font-bold text-charcoal">Your Cart</h2>
                        <span className="bg-primary/10 text-primary text-sm font-semibold px-2.5 py-0.5 rounded-full">
                            {totalItems}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                        aria-label="Close cart"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2E2E" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <span className="text-6xl mb-4 animate-float">🐾</span>
                            <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">Your cart is empty</h3>
                            <p className="text-muted text-sm mb-6">Add some adorable pets to get started!</p>
                            <button onClick={() => setIsCartOpen(false)} className="btn-primary rounded-xl">
                                Browse Pets
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.pet.id} className="flex gap-4 p-4 bg-cream rounded-2xl">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                                        <div className="w-full h-full flex items-center justify-center text-3xl">
                                            {item.pet.category === 'dogs' ? '🐕' :
                                                item.pet.category === 'cats' ? '🐱' :
                                                    item.pet.category === 'birds' ? '🐦' : '🦎'}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-heading font-semibold text-charcoal truncate">{item.pet.name}</h4>
                                        <p className="text-xs text-muted">{item.pet.breed}</p>
                                        <p className="font-heading font-bold text-primary mt-1">₹{item.pet.price.toLocaleString()}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.pet.id, item.quantity - 1)}
                                                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-primary transition-colors text-sm"
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.pet.id, item.quantity + 1)}
                                                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-primary transition-colors text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.pet.id)}
                                        className="self-start p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-colors"
                                        aria-label="Remove item"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 p-6 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Subtotal</span>
                            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted">Delivery</span>
                            <span className="font-medium">{deliveryCharge > 0 ? `₹${deliveryCharge}` : 'Free'}</span>
                        </div>
                        {deliveryCharge === 0 && subtotal > 0 && (
                            <p className="text-xs text-green-600">🎉 Free delivery on orders above ₹10,000</p>
                        )}
                        <div className="flex justify-between text-base border-t pt-3">
                            <span className="font-heading font-bold">Total</span>
                            <span className="font-heading font-bold text-primary text-lg">₹{total.toLocaleString()}</span>
                        </div>
                        <button
                            className="w-full btn-primary py-4 rounded-2xl text-base font-bold mt-2"
                            onClick={() => {
                                setIsCartOpen(false);
                                document.getElementById('checkout-trigger')?.click();
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
