'use client';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 300);
                    return 100;
                }
                return prev + 4;
            });
        }, 50);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-6xl animate-paw-bounce mb-6">🐾</span>
            <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">
                Happy<span className="text-primary">Pets</span>
            </h1>
            <p className="text-muted text-sm mb-8">Finding your perfect companion...</p>
            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
