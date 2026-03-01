'use client';

export default function MobileHeroCarousel() {
    return (
        <section className="relative lg:hidden mt-14">
            {/* Video hero for mobile */}
            <div className="relative h-[50vh] overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source
                        src="https://iozilxcfbnztrqozmzcq.supabase.co/storage/v1/object/public/asset/Man_laughing_with_pets_35da6518ed.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#FFF8EE]" />

                <div className="relative z-10 h-full flex flex-col justify-end px-5 pb-8">
                    <span className="text-4xl mb-3 animate-paw-bounce">🐾</span>
                    <h1 className="font-heading text-3xl font-extrabold text-white leading-tight mb-2">
                        Find Your Perfect
                        <br />
                        <span className="bg-gradient-to-r from-[#5FBDB3] to-[#F4B860] bg-clip-text text-transparent">
                            Companion
                        </span>
                    </h1>
                    <p className="text-white/80 text-sm mb-5 max-w-xs">
                        Healthy, happy pets ready to fill your home with love
                    </p>
                    <div className="flex gap-3">
                        <a href="#m-categories" className="btn-primary text-sm px-5 py-2.5 rounded-full">
                            Browse Pets
                        </a>
                        <a href="#visit" className="bg-white/20 backdrop-blur-sm text-white text-sm px-5 py-2.5 rounded-full border border-white/30">
                            Book Visit
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
