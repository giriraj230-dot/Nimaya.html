import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, ArrowRight, FileText, Check } from 'lucide-react';
import { ScreenView, Product, CartItem } from './types';
import { PRODUCTS, REVIEWS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { RoutineBar, AgeFilter } from './components/RoutineBar';
import { BundleBuilder } from './components/BundleBuilder';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { RoutineQuizModal } from './components/RoutineQuizModal';
import { BrandPackModal } from './components/BrandPackModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('home');
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBrandPackOpen, setIsBrandPackOpen] = useState(false);
  const [selectedFreeSample, setSelectedFreeSample] = useState<string>('sponge');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Cart State with Local Storage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nimaya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [currentView]);

  useEffect(() => {
    try {
      localStorage.setItem('nimaya_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1, purchaseType: 'one-time' | 'subscribe' = 'one-time') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.purchaseType === purchaseType
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, purchaseType }];
    });
    showToast(`Added ${product.name} to your gentle bag`);
  };

  const handleAddBundleToCart = (bundleProducts: Product[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      bundleProducts.forEach((prod) => {
        const existingIndex = updated.findIndex(
          (item) => item.product.id === prod.id && item.purchaseType === 'one-time'
        );
        if (existingIndex > -1) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({ product: prod, quantity: 1, purchaseType: 'one-time' });
        }
      });
      return updated;
    });
    showToast(`Added ${bundleProducts.length} essentials starter set to bag!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = (sampleId: string) => {
    setSelectedFreeSample(sampleId);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  // Filtered Products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (ageFilter === 'all') return true;
    if (ageFilter === '0-6m') return p.id === 'gentle-foaming-cleanser' || p.id === 'pure-water-baby-wipes';
    if (ageFilter === '6-12m') return p.id !== 'tear-free-baby-shampoo';
    return true; // 1-4y
  });

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="nimaya-page min-h-screen flex flex-col text-[#26372F] selection:bg-[#E6B39A]/40" style={{ '--scroll-progress': `${scrollProgress}%` } as React.CSSProperties}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#2C2926] text-white text-xs font-medium shadow-lg flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-[#86C290]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sticky Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'brand-pack') {
            setIsBrandPackOpen(true);
          }
        }}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBrandPack={() => setIsBrandPackOpen(true)}
      />

      {/* Main View Engine */}
      <main className="flex-1">
        {/* VIEW 1: HOME SCREEN */}
        {currentView === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <Hero
              onExploreClick={() => {
                const collectionElem = document.getElementById('collection-section');
                if (collectionElem) {
                  collectionElem.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setCurrentView('collection');
                }
              }}
              onQuizClick={() => setIsQuizOpen(true)}
            />


            {/* Collection Section */}
            <section id="collection-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C49E85]">
                  Daily Skin & Hygiene
                </span>
                <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#2C2926]">
                  The 4 Nimaya Essentials
                </h2>
                <p className="text-xs sm:text-sm text-[#665D54]">
                  Calibrated for the delicate newborn and toddler skin barrier (0–4 years).
                </p>
              </div>

              {/* Routine Age Filter */}
              <div className="mb-8">
                <RoutineBar
                  selectedFilter={ageFilter}
                  onSelectFilter={(f) => setAgeFilter(f)}
                />
              </div>

              {/* 4 Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1, 'one-time')}
                  />
                ))}
              </div>
            </section>

            {/* Bundle Builder Section */}
            <BundleBuilder
              products={PRODUCTS}
              onAddBundleToCart={handleAddBundleToCart}
            />

            {/* Testimonials / Parent Voices */}
            <section className="nimaya-testimonials max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
              <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7F6D]">
                  Quiet Confidence
                </span>
                <h3 className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
                  Trusted in the Moments That Matter Most
                </h3>
                <p className="text-xs text-[#6B635A]">
                  Real feedback from parents and pediatricians navigating the 0–4 journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REVIEWS.map((rev) => (
                  <div key={rev.id} className="p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-2xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[#C49E85]">
                        <span className="text-xs font-bold font-serif-brand mr-1">5.0</span>
                        <span>★★★★★</span>
                      </div>
                      <h4 className="font-serif-brand text-base text-[#2C2926] font-medium leading-snug">
                        &ldquo;{rev.title}&rdquo;
                      </h4>
                      <p className="text-xs text-[#595046] leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[#2C2926]">{rev.author}</div>
                        <div className="text-[10px] text-[#7A7167]">{rev.childAge}</div>
                      </div>
                      <span className="text-[10px] font-semibold text-[#6B7F6D] bg-[#EAF0EB] px-2 py-0.5 rounded-full border border-[#D5E1D6]">
                        Verified Parent
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Frequently Asked Questions Section */}
            <FaqSection onOpenQuiz={() => setIsQuizOpen(true)} />

            {/* Routine Finder Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="p-8 rounded-3xl bg-[#FAF1EC] border border-[#EED7CB] flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
                <div className="space-y-2 max-w-xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#7D5A42] border border-[#E8C8B6]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C49E85]" />
                    Interactive Baby Care Quiz
                  </span>
                  <h3 className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
                    Not sure where to begin? Find your little one’s routine in 60 seconds.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E5B4B]">
                    Answer 3 quick questions about your baby’s age and bath habits to receive a customized pediatric routine note.
                  </p>
                </div>

                <button
                  id="home-open-quiz-btn"
                  onClick={() => setIsQuizOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm shrink-0"
                >
                  Start Routine Quiz
                </button>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: COLLECTION / CATEGORY SCREEN */}
        {currentView === 'collection' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="text-left space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7F6D]">
                The Everyday Collection
              </span>
              <h1 className="font-serif-brand text-3xl sm:text-4xl text-[#2C2926]">
                Thoughtful Essentials for Little Skin (0–4 Years)
              </h1>
              <p className="text-xs sm:text-sm text-[#665D54]">
                Clean foaming bath wash, broad spectrum mineral sunscreen, tear-free shampoo, and 99% pure water wipes.
              </p>
            </div>

            {/* Age Filter */}
            <RoutineBar
              selectedFilter={ageFilter}
              onSelectFilter={(f) => setAgeFilter(f)}
            />

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p, 1, 'one-time')}
                />
              ))}
            </div>

            {/* Bundle Builder Section */}
            <BundleBuilder
              products={PRODUCTS}
              onAddBundleToCart={handleAddBundleToCart}
            />
          </div>
        )}

        {/* VIEW 3: ABOUT / CREDENTIALS SCREEN */}
        {currentView === 'about' && (
          <AboutSection onOpenBrandPack={() => setIsBrandPackOpen(true)} />
        )}

        {/* VIEW 4: DEDICATED FAQ SCREEN */}
        {currentView === 'faq' && (
          <div className="py-6">
            <FaqSection onOpenQuiz={() => setIsQuizOpen(true)} />
          </div>
        )}
      </main>

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty, type) => {
          handleAddToCart(product, qty, type);
          setSelectedProduct(null);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        freeSampleId={selectedFreeSample}
        onOrderComplete={handleOrderComplete}
      />

      {/* Routine Quiz Modal */}
      <RoutineQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddRoutineToCart={handleAddBundleToCart}
      />

      {/* Little Pixels Challenge Jury & Branding Deck Modal */}
      <BrandPackModal
        isOpen={isBrandPackOpen}
        onClose={() => setIsBrandPackOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenBrandPack={() => setIsBrandPackOpen(true)}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EAE3D9] p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-[#DDD3C7] text-xs font-semibold text-[#4A443E] flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6B7F6D]" />
            Routine Quiz
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#2C2926] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>View Gentle Bag</span>
            {cartTotalCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#6B7F6D] text-white text-[10px] font-bold flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
