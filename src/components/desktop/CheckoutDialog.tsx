'use client';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useRef } from 'react';

type PaymentMethod = 'upi' | 'cod' | null;
type CheckoutStep = 'review' | 'address' | 'payment' | 'confirmation';

interface DeliveryAddress {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    address: string;
    landmark: string;
    pincode: string;
    city: string;
    state: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutDialog({ isOpen, onClose }: Props) {
    const { items, subtotal, deliveryCharge, total, clearCart } = useCart();
    const [step, setStep] = useState<CheckoutStep>('review');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
    const [orderId, setOrderId] = useState('');
    const [addressForm, setAddressForm] = useState<DeliveryAddress>({
        firstName: '', lastName: '', mobile: '', email: '',
        address: '', landmark: '', pincode: '', city: '', state: '',
    });
    const [formErrors, setFormErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (step === 'payment' && paymentMethod === 'upi' && canvasRef.current) {
            generateQR();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, paymentMethod]);

    const generateQR = async () => {
        try {
            const QRCode = (await import('qrcode')).default;
            const upiString = `upi://pay?pa=happypets@upi&pn=Happy%20Pets&am=${total}&cu=INR&tn=Pet%20Purchase%20Order`;
            if (canvasRef.current) {
                QRCode.toCanvas(canvasRef.current, upiString, {
                    width: 240, margin: 2,
                    color: { dark: '#2E2E2E', light: '#FFFFFF' },
                });
            }
        } catch (err) {
            console.error('QR generation failed:', err);
        }
    };

    const validateAddress = (): boolean => {
        const errors: Partial<Record<keyof DeliveryAddress, string>> = {};
        if (!addressForm.firstName.trim()) errors.firstName = 'Required';
        if (!addressForm.lastName.trim()) errors.lastName = 'Required';
        if (!addressForm.mobile.trim() || addressForm.mobile.length < 10) errors.mobile = 'Enter valid 10-digit number';
        if (!addressForm.email.trim() || !addressForm.email.includes('@')) errors.email = 'Enter valid email';
        if (!addressForm.address.trim()) errors.address = 'Required';
        if (!addressForm.pincode.trim() || addressForm.pincode.length !== 6) errors.pincode = 'Enter 6-digit pincode';
        if (!addressForm.city.trim()) errors.city = 'Required';
        if (!addressForm.state.trim()) errors.state = 'Required';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddressContinue = () => {
        if (validateAddress()) {
            setStep('payment');
        }
    };

    const handleConfirm = () => {
        setOrderId(`HP-${Date.now().toString(36).toUpperCase()}`);
        setStep('confirmation');
        clearCart();
    };

    const handleClose = () => {
        setStep('review');
        setPaymentMethod(null);
        setOrderId('');
        setFormErrors({});
        onClose();
    };

    const updateField = (field: keyof DeliveryAddress, value: string) => {
        setAddressForm(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
        }
    };

    if (!isOpen) return null;

    const stepLabels = { review: 'Order', address: 'Address', payment: 'Payment', confirmation: 'Done' };
    const stepIcons = { review: '🛒', address: '📍', payment: '💳', confirmation: '✅' };
    const steps: CheckoutStep[] = ['review', 'address', 'payment', 'confirmation'];

    return (
        <>
            <div className="overlay" onClick={handleClose} />
            <div className="fixed inset-4 md:inset-8 lg:inset-y-8 lg:inset-x-[18%] z-50 bg-white rounded-[24px] shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[92vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{stepIcons[step]}</span>
                        <h2 className="font-heading text-xl font-bold text-charcoal">
                            {step === 'review' ? 'Review Order' : step === 'address' ? 'Delivery Address' : step === 'payment' ? 'Payment' : 'Order Confirmed!'}
                        </h2>
                    </div>
                    <button onClick={handleClose} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center" aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E2E2E" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Progress bar */}
                {step !== 'confirmation' && (
                    <div className="flex items-center gap-1 px-6 py-3 bg-gray-50">
                        {steps.slice(0, 3).map((s, i) => (
                            <div key={s} className="flex items-center flex-1">
                                <div className={`flex items-center gap-1.5 text-xs font-semibold ${steps.indexOf(step) >= i ? 'text-primary' : 'text-gray-300'
                                    }`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${steps.indexOf(step) > i ? 'bg-primary text-white' :
                                            steps.indexOf(step) === i ? 'bg-primary/10 text-primary border-2 border-primary' :
                                                'bg-gray-100 text-gray-400'
                                        }`}>{i + 1}</span>
                                    <span className="hidden sm:inline">{stepLabels[s]}</span>
                                </div>
                                {i < 2 && (
                                    <div className={`flex-1 h-0.5 mx-2 rounded ${steps.indexOf(step) > i ? 'bg-primary' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-6">
                    {/* ===== Step: Review ===== */}
                    {step === 'review' && (
                        <div className="space-y-5">
                            <h3 className="font-heading font-semibold text-sm text-muted uppercase tracking-wider">Items in Cart</h3>
                            {items.map(item => (
                                <div key={item.pet.id} className="flex items-center gap-4 p-4 bg-cream rounded-2xl">
                                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm">
                                        {item.pet.category === 'dogs' ? '🐕' : item.pet.category === 'cats' ? '🐱' : item.pet.category === 'birds' ? '🐦' : '🦎'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-heading font-semibold text-sm truncate">{item.pet.name} ({item.pet.breed})</p>
                                        <p className="text-xs text-muted mt-0.5">Qty: {item.quantity} • {item.deliveryMethod}</p>
                                    </div>
                                    <p className="font-heading font-bold text-primary whitespace-nowrap">₹{(item.pet.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}

                            <div className="space-y-2 bg-cream rounded-2xl p-5 mt-4">
                                <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-muted">Delivery</span><span>{deliveryCharge > 0 ? `₹${deliveryCharge}` : 'Free'}</span></div>
                                <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3 mt-2">
                                    <span>Total</span>
                                    <span className="text-primary text-lg">₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== Step: Address ===== */}
                    {step === 'address' && (
                        <div className="animate-fade-in">
                            <p className="text-sm text-muted mb-6">Please fill in your delivery details. All fields marked with <span className="text-red-500">*</span> are required.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" placeholder="John"
                                        value={addressForm.firstName} onChange={e => updateField('firstName', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Last Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" placeholder="Doe"
                                        value={addressForm.lastName} onChange={e => updateField('lastName', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                                </div>
                                {/* Mobile */}
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel" placeholder="+91 XXXXX XXXXX" maxLength={10}
                                        value={addressForm.mobile} onChange={e => updateField('mobile', e.target.value.replace(/\D/g, ''))}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.mobile && <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>}
                                </div>
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="email" placeholder="you@email.com"
                                        value={addressForm.email} onChange={e => updateField('email', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                </div>
                                {/* Address — full width */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Delivery Address <span className="text-red-500">*</span></label>
                                    <textarea
                                        placeholder="House/Flat no., Street, Area"
                                        value={addressForm.address} onChange={e => updateField('address', e.target.value)}
                                        rows={2}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors resize-none ${formErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                                </div>
                                {/* Landmark */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Landmark</label>
                                    <input
                                        type="text" placeholder="Near school, opposite park, etc."
                                        value={addressForm.landmark} onChange={e => updateField('landmark', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary bg-white text-sm outline-none transition-colors"
                                    />
                                </div>
                                {/* Pincode */}
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">Pincode <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" placeholder="400001" maxLength={6}
                                        value={addressForm.pincode} onChange={e => updateField('pincode', e.target.value.replace(/\D/g, ''))}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.pincode ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
                                </div>
                                {/* City */}
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">City <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" placeholder="Mumbai"
                                        value={addressForm.city} onChange={e => updateField('city', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                                </div>
                                {/* State */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-charcoal mb-1.5">State <span className="text-red-500">*</span></label>
                                    <input
                                        type="text" placeholder="Maharashtra"
                                        value={addressForm.state} onChange={e => updateField('state', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${formErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-primary bg-white'}`}
                                    />
                                    {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="mt-8">
                                <h3 className="font-heading font-semibold text-sm text-muted uppercase tracking-wider mb-4">Select Payment Method</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`p-5 rounded-2xl border-2 text-center transition-all ${paymentMethod === 'upi' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/30'
                                            }`}
                                    >
                                        <span className="text-3xl block mb-2">📱</span>
                                        <span className="font-heading font-semibold text-sm block">Pay via UPI</span>
                                        <p className="text-xs text-muted mt-1">Scan QR code</p>
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-5 rounded-2xl border-2 text-center transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/30'
                                            }`}
                                    >
                                        <span className="text-3xl block mb-2">🏠</span>
                                        <span className="font-heading font-semibold text-sm block">Pay on Delivery</span>
                                        <p className="text-xs text-muted mt-1">Cash/UPI at door</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== Step: Payment ===== */}
                    {step === 'payment' && paymentMethod === 'upi' && (
                        <div className="flex flex-col items-center text-center py-8 animate-fade-in">
                            <h3 className="font-heading text-xl font-bold mb-2">Scan to Pay</h3>
                            <p className="text-muted text-sm mb-8">Scan the QR code with any UPI app to complete payment</p>
                            <div className="bg-white p-5 rounded-2xl shadow-lg mb-6">
                                <canvas ref={canvasRef} />
                            </div>
                            <p className="font-heading text-3xl font-bold text-primary mb-2">₹{total.toLocaleString()}</p>
                            <p className="text-xs text-muted mb-8">UPI ID: happypets@upi</p>

                            {/* Show delivery summary */}
                            <div className="bg-cream rounded-2xl p-4 mb-6 text-left w-full max-w-sm">
                                <p className="text-xs text-muted mb-1">Delivering to</p>
                                <p className="text-sm font-semibold">{addressForm.firstName} {addressForm.lastName}</p>
                                <p className="text-xs text-muted mt-1">{addressForm.address}{addressForm.landmark ? `, ${addressForm.landmark}` : ''}</p>
                                <p className="text-xs text-muted">{addressForm.city} – {addressForm.pincode}, {addressForm.state}</p>
                            </div>

                            <button onClick={handleConfirm} className="btn-primary px-10 py-3.5 rounded-2xl text-base">
                                I&apos;ve Completed Payment
                            </button>
                        </div>
                    )}

                    {step === 'payment' && paymentMethod === 'cod' && (
                        <div className="flex flex-col items-center text-center py-8 animate-fade-in">
                            <span className="text-6xl mb-5">🏠</span>
                            <h3 className="font-heading text-xl font-bold mb-2">Pay on Delivery</h3>
                            <p className="text-muted text-sm mb-2">Amount to be paid at delivery:</p>
                            <p className="font-heading text-3xl font-bold text-primary mb-6">₹{total.toLocaleString()}</p>

                            {/* Show delivery summary */}
                            <div className="bg-cream rounded-2xl p-4 mb-6 text-left w-full max-w-sm">
                                <p className="text-xs text-muted mb-1">Delivering to</p>
                                <p className="text-sm font-semibold">{addressForm.firstName} {addressForm.lastName}</p>
                                <p className="text-xs text-muted mt-1">{addressForm.address}{addressForm.landmark ? `, ${addressForm.landmark}` : ''}</p>
                                <p className="text-xs text-muted">{addressForm.city} – {addressForm.pincode}, {addressForm.state}</p>
                                <p className="text-xs text-muted mt-1">📞 {addressForm.mobile} • ✉️ {addressForm.email}</p>
                            </div>

                            <p className="text-sm text-muted mb-8 max-w-sm">
                                Our delivery executive will accept cash or UPI payment at the time of delivery.
                                You&apos;ll receive a confirmation call on <strong>{addressForm.mobile}</strong> before dispatch.
                            </p>
                            <button onClick={handleConfirm} className="btn-primary px-10 py-3.5 rounded-2xl text-base">
                                Confirm Order
                            </button>
                        </div>
                    )}

                    {/* ===== Step: Confirmation ===== */}
                    {step === 'confirmation' && (
                        <div className="flex flex-col items-center text-center py-12 animate-fade-in-up">
                            <span className="text-7xl mb-6 animate-paw-bounce">🎉</span>
                            <h3 className="font-heading text-2xl font-bold text-charcoal mb-2">Order Confirmed!</h3>
                            <p className="text-muted mb-6">Your furry friend is on its way to you</p>
                            <div className="bg-cream rounded-2xl p-6 mb-6 inline-block">
                                <p className="text-xs text-muted mb-1">Order ID</p>
                                <p className="font-heading text-xl font-bold text-primary">{orderId}</p>
                            </div>
                            <p className="text-sm text-muted max-w-sm mb-10">
                                We&apos;ll send you a confirmation message with tracking details.
                                Expected delivery within 2-3 business days.
                            </p>
                            <button onClick={handleClose} className="btn-primary px-10 py-3.5 rounded-2xl text-base">
                                Back to Home
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer buttons */}
                {step === 'review' && (
                    <div className="border-t border-gray-100 p-6">
                        <button
                            onClick={() => setStep('address')}
                            className="w-full btn-primary py-4 rounded-2xl text-base font-bold"
                        >
                            Continue — ₹{total.toLocaleString()}
                        </button>
                    </div>
                )}

                {step === 'address' && paymentMethod && (
                    <div className="border-t border-gray-100 p-6 flex gap-3">
                        <button
                            onClick={() => setStep('review')}
                            className="btn-outline py-3.5 rounded-2xl text-sm flex-shrink-0"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={handleAddressContinue}
                            className="flex-1 btn-primary py-3.5 rounded-2xl text-base font-bold"
                        >
                            Proceed to Pay — ₹{total.toLocaleString()}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
