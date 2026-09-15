import { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { ScreenView } from '../types';

interface NavbarProps {
  currentView: ScreenView;
  onNavigate: (view: ScreenView) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenBrandPack: () => void;
}

const ANNOUNCEMENTS = [
  'Gentle care for little ones aged 0–4 years',
  '100% Tear-free & Pediatrician Approved',
  'Free Shipping on Orders over ₹499',
  'EWG Verified™ Clean Ingredients',
  '0% Fragrance, Parabens, Sulfates & Phthalates',
  'Clinically Tested on Delicate Infant Skin',
];

export function Navbar({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onOpenBrandPack,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF8F5]/90 border-b border-[#EFE9E1] transition-all">
      {/* Reassurance Announcement Banner - Sliding Marquee */}
      <div className="bg-[#F3EFEA] text-[#5C554D] text-xs font-medium py-2 border-b border-[#EBE4DA] overflow-hidden select-none">
        <div className="animate-marquee flex items-center">
          {/* First loop track */}
          <div className="flex items-center gap-10 shrink-0 pr-10">
            {ANNOUNCEMENTS.map((item, idx) => (
              <span key={`ann-1-${idx}`} className="inline-flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B7F6D] shrink-0" />
                <span className="text-xs text-[#524B43] tracking-wide">{item}</span>
                <span className="text-[#C8BEB2] ml-8">•</span>
              </span>
            ))}
          </div>

          {/* Second identical loop track for seamless infinite scroll */}
          <div className="flex items-center gap-10 shrink-0 pr-10" aria-hidden="true">
            {ANNOUNCEMENTS.map((item, idx) => (
              <span key={`ann-2-${idx}`} className="inline-flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B7F6D] shrink-0" />
                <span className="text-xs text-[#524B43] tracking-wide">{item}</span>
                <span className="text-[#C8BEB2] ml-8">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer text-left focus:outline-hidden"
          >
            <Logo size="md" showTagline={true} />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A443E]">
            <button
              id="nav-collection-btn"
              onClick={() => {
                onNavigate('collection');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#2C2926] transition-colors cursor-pointer py-1 relative ${
                currentView === 'collection' ? 'text-[#2C2926] font-semibold' : ''
              }`}
            >
              The 4 Essentials
              {currentView === 'collection' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C49E85] rounded-full" />
              )}
            </button>

            <button
              id="nav-about-btn"
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#2C2926] transition-colors cursor-pointer py-1 relative ${
                currentView === 'about' ? 'text-[#2C2926] font-semibold' : ''
              }`}
            >
              Our Story & Safety
              {currentView === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C49E85] rounded-full" />
              )}
            </button>

            <button
              id="nav-faq-btn"
              onClick={() => {
                onNavigate('faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#2C2926] transition-colors cursor-pointer py-1 relative ${
                currentView === 'faq' ? 'text-[#2C2926] font-semibold' : ''
              }`}
            >
              FAQ
              {currentView === 'faq' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C49E85] rounded-full" />
              )}
            </button>

            {/* Routine Finder Quiz Trigger */}
            <button
              id="nav-quiz-trigger-btn"
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#526454] bg-[#EAF0EB] hover:bg-[#DEE7DF] border border-[#D5E1D6] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6B7F6D]" />
              Routine Quiz
            </button>
          </nav>

          {/* Action CTAs: Cart & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#F3EFEA] hover:bg-[#EBE4DA] text-[#2C2926] border border-[#E5DDD2] transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#2C2926]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#6B7F6D] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#4A443E] hover:bg-[#F3EFEA] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#EFE9E1] space-y-3 pb-6 animate-fadeIn">
            <button
              id="nav-mobile-home-btn"
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#2C2926] hover:bg-[#F3EFEA]"
            >
              Home
            </button>

            <button
              id="nav-mobile-collection-btn"
              onClick={() => {
                onNavigate('collection');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#2C2926] hover:bg-[#F3EFEA]"
            >
              The 4 Essentials (Collection)
            </button>

            <button
              id="nav-mobile-about-btn"
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#2C2926] hover:bg-[#F3EFEA]"
            >
              Our Story & Safety Approach
            </button>

            <button
              id="nav-mobile-faq-btn"
              onClick={() => {
                onNavigate('faq');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#2C2926] hover:bg-[#F3EFEA]"
            >
              Frequently Asked Questions (FAQ)
            </button>

            <div className="pt-2">
              <button
                id="nav-mobile-quiz-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#526454] bg-[#EAF0EB] border border-[#D5E1D6]"
              >
                <Sparkles className="w-4 h-4 text-[#6B7F6D]" />
                Take Baby Routine Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
