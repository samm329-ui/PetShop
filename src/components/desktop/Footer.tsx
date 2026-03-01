'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = {
        'Quick Links': ['Home', 'About Us', 'Contact', 'Visit Store', 'FAQs'],
        'Pet Categories': ['Dogs', 'Cats', 'Birds', 'Exotic Pets'],
        'Support': ['Delivery Info', 'Return Policy', 'Health Guarantee', 'Care Guides'],
    };

    return (
        <footer id="contact" className="bg-charcoal text-white">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-3xl">🐾</span>
                            <span className="font-heading text-2xl font-bold">
                                Happy<span className="text-primary">Pets</span>
                            </span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Your trusted companion marketplace. We connect loving families with
                            healthy, happy pets from certified breeders.
                        </p>
                        <div className="flex gap-3">
                            {['Instagram', 'Facebook', 'Twitter'].map(social => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition-colors"
                                    aria-label={social}
                                >
                                    <span className="text-sm">
                                        {social === 'Instagram' ? '📸' : social === 'Facebook' ? '👤' : '🐦'}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([heading, items]) => (
                        <div key={heading}>
                            <h4 className="font-heading font-semibold text-white mb-4">{heading}</h4>
                            <ul className="space-y-2.5">
                                {items.map(item => (
                                    <li key={item}>
                                        <a href="#" className="text-white/50 hover:text-primary text-sm transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact bar */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <span className="text-xl">📍</span>
                            <span className="text-white/60 text-sm">123, Happy Street, Pet Town, India</span>
                        </div>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <span className="text-xl">📞</span>
                            <a href="tel:+919876543210" className="text-white/60 text-sm hover:text-primary transition-colors">
                                +91 98765 43210
                            </a>
                        </div>
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <span className="text-xl">📧</span>
                            <a href="mailto:hello@happypets.in" className="text-white/60 text-sm hover:text-primary transition-colors">
                                hello@happypets.in
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-xs">
                        © {currentYear} Happy Pets. All rights reserved. Made with ❤️ for pet lovers.
                    </p>
                    <div className="flex gap-4 text-xs text-white/40">
                        <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
