'use client';
import { useState, useEffect } from 'react';
import { Pet, pets, getPetsByCategory, getFeaturedPets } from '@/data/pets';

// Desktop components
import Header from '@/components/desktop/Header';
import HeroSection from '@/components/desktop/HeroSection';
import CategorySection from '@/components/desktop/CategorySection';
import FeaturedPetsSection from '@/components/desktop/FeaturedPetsSection';
import BreedFilterSection from '@/components/desktop/BreedFilterSection';
import PetDetailDialog from '@/components/desktop/PetDetailDialog';
import CartSheet from '@/components/desktop/CartSheet';
import CheckoutDialog from '@/components/desktop/CheckoutDialog';
import WhyChooseUs from '@/components/desktop/WhyChooseUs';
import VisitBookingSection from '@/components/desktop/VisitBookingSection';
import ReviewsSection from '@/components/desktop/ReviewsSection';
import Footer from '@/components/desktop/Footer';

// Mobile components
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileHeroCarousel from '@/components/mobile/MobileHeroCarousel';
import IconCategoryStrip from '@/components/mobile/IconCategoryStrip';
import HorizontalPetScroller from '@/components/mobile/HorizontalPetScroller';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';
import MobileCartFab from '@/components/mobile/MobileCartFab';

// Shared
import LoadingScreen from '@/components/shared/LoadingScreen';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string>('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileNavigate = (section: string) => {
    if (section === 'categories') {
      document.getElementById('m-categories')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'search') {
      // trigger search in header
    }
  };

  // Mobile pet lists
  const mobileDogs = getPetsByCategory('dogs');
  const mobileCats = getPetsByCategory('cats');
  const mobileBirds = getPetsByCategory('birds');
  const mobileExotic = getPetsByCategory('exotic');
  const mobileFeatured = getFeaturedPets();

  // Filter for mobile category
  const getMobilePets = () => {
    if (!mobileCategory) return null;
    return getPetsByCategory(mobileCategory);
  };

  const filteredMobilePets = getMobilePets();

  return (
    <>
      <LoadingScreen />

      {/* ==================== DESKTOP ==================== */}
      <div className="hidden lg:block">
        <Header />

        {selectedCategory ? (
          <div className="pt-20">
            <BreedFilterSection
              category={selectedCategory}
              onPetClick={setSelectedPet}
              onBack={() => setSelectedCategory(null)}
            />
          </div>
        ) : (
          <>
            <HeroSection />
            <CategorySection onSelectCategory={setSelectedCategory} />
            <FeaturedPetsSection onPetClick={setSelectedPet} />
            <WhyChooseUs />
            <VisitBookingSection />
            <ReviewsSection />
          </>
        )}

        <Footer />
        <CartSheet />
        {selectedPet && (
          <PetDetailDialog pet={selectedPet} onClose={() => setSelectedPet(null)} />
        )}
        <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        <button
          id="checkout-trigger"
          className="hidden"
          onClick={() => setIsCheckoutOpen(true)}
        />
      </div>

      {/* ==================== MOBILE ==================== */}
      <div className="lg:hidden">
        <MobileHeader />
        <MobileHeroCarousel />

        <div className="mt-4">
          <IconCategoryStrip
            onSelectCategory={setMobileCategory}
            activeCategory={mobileCategory || null}
          />
        </div>

        {/* Filtered category view */}
        {filteredMobilePets && filteredMobilePets.length > 0 && (
          <div className="px-5 mb-6 mt-2">
            <div className="grid grid-cols-2 gap-4">
              {filteredMobilePets.map(pet => {
                const imgMap: Record<string, string> = {
                  'dog-1': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
                  'dog-2': 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&h=300&fit=crop',
                  'dog-3': 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=300&fit=crop',
                  'dog-4': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
                  'dog-5': 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=300&h=300&fit=crop',
                  'dog-6': 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=300&h=300&fit=crop',
                  'cat-1': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&h=300&fit=crop',
                  'cat-2': 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&h=300&fit=crop',
                  'cat-3': 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&h=300&fit=crop',
                  'cat-4': 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=300&h=300&fit=crop',
                  'cat-5': 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=300&h=300&fit=crop',
                  'bird-1': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&h=300&fit=crop',
                  'bird-2': 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=300&h=300&fit=crop',
                  'bird-3': 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=300&h=300&fit=crop',
                  'bird-4': 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=300&h=300&fit=crop',
                  'exotic-1': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=300&fit=crop',
                  'exotic-2': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&h=300&fit=crop',
                  'exotic-3': 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=300&h=300&fit=crop',
                  'exotic-4': 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=300&h=300&fit=crop',
                };
                return (
                  <div
                    key={pet.id}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                    onClick={() => setSelectedPet(pet)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={imgMap[pet.id] || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop'}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-heading font-bold text-sm truncate">{pet.name}</h4>
                      <p className="text-[11px] text-muted">{pet.breed}</p>
                      <p className="font-heading font-bold text-primary text-sm mt-1">₹{pet.price.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Default scrolling sections */}
        {!mobileCategory && (
          <div className="space-y-2 mt-4">
            <HorizontalPetScroller title="⭐ Featured Pets" pets={mobileFeatured} onPetClick={setSelectedPet} />
            <HorizontalPetScroller title="🐕 Dogs" pets={mobileDogs} onPetClick={setSelectedPet} />
            <HorizontalPetScroller title="🐱 Cats" pets={mobileCats} onPetClick={setSelectedPet} />
            <HorizontalPetScroller title="🐦 Birds" pets={mobileBirds} onPetClick={setSelectedPet} />
            <HorizontalPetScroller title="🦎 Exotic" pets={mobileExotic} onPetClick={setSelectedPet} />
          </div>
        )}

        {/* Mobile trust section */}
        <div className="px-5 py-8">
          <h3 className="font-heading font-bold text-charcoal text-lg mb-4 text-center">Why Happy Pets?</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏥', title: 'Vet Certified' },
              { icon: '💉', title: 'Vaccinated' },
              { icon: '🚚', title: 'Safe Delivery' },
              { icon: '💬', title: 'Lifetime Support' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <span className="text-2xl mb-2 block">{f.icon}</span>
                <span className="text-xs font-semibold text-charcoal">{f.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile visit CTA */}
        <div className="px-5 py-4">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-6 text-white text-center">
            <span className="text-4xl mb-3 block">📅</span>
            <h3 className="font-heading text-xl font-bold mb-2">Visit Our Store</h3>
            <p className="text-white/80 text-sm mb-4">Meet your future pet in person before buying</p>
            <a href="#visit" className="inline-block bg-white text-primary font-heading font-semibold text-sm px-6 py-2.5 rounded-full">
              Book a Visit
            </a>
          </div>
        </div>

        {/* Mobile call CTA */}
        <div className="px-5 pb-8">
          <a href="tel:+919876543210" className="flex items-center justify-center gap-2 bg-accent text-charcoal font-heading font-semibold py-3.5 rounded-2xl shadow-sm w-full">
            📞 Call Us — +91 98765 43210
          </a>
        </div>

        {/* Bottom padding for nav */}
        <div className="h-20" />

        <MobileBottomNav onNavigate={handleMobileNavigate} />
        <MobileCartFab />
        <CartSheet />
        {selectedPet && (
          <PetDetailDialog pet={selectedPet} onClose={() => setSelectedPet(null)} />
        )}
        <CheckoutDialog isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        <button
          id="checkout-trigger"
          className="hidden"
          onClick={() => setIsCheckoutOpen(true)}
        />
      </div>
    </>
  );
}
