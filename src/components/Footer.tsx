import { useState, FormEvent } from 'react';
import { ShieldCheck, Heart, Droplets, Sparkles, Check, ArrowRight, FileText } from 'lucide-react';
import { Logo } from './Logo';
import { ScreenView } from '../types';

interface FooterProps {
  onNavigate: (view: ScreenView) => void;
  onOpenQuiz: () => void;
  onOpenBrandPack: () => void;
}

export function Footer({ onNavigate, onOpenQuiz, onOpenBrandPack }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#2B4436] text-[#E1ECE6] border-t border-[#385444] pt-16 pb-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Exact match to brand reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            {/* White Circular Badge Logo + Tracked White NIMAYA */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0">
                <Logo layout="mark-only" size="xs" />
              </div>
              <span className="font-serif-brand font-medium tracking-[0.22em] text-white text-xl sm:text-2xl uppercase">
                Nimaya
              </span>
            </div>

            {/* Italic Serif Tagline */}
            <p className="font-serif-brand italic text-lg sm:text-xl text-[#F5EFE6] leading-snug pt-1">
              Gentle care, from the very beginning.
            </p>

            {/* Subtitle */}
            <p className="text-xs text-[#A2BDB0] leading-relaxed max-w-sm">
              Thoughtful skin &amp; hygiene essentials for little ones aged 0–4 years.
            </p>
          </div>

          {/* Column 1: SHOP ESSENTIALS */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EBB097]">
              Shop Essentials
            </h4>
            <ul className="space-y-3 text-sm text-[#E1ECE6]">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Foaming Cleanser
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Baby Sunscreen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Baby Shampoo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Baby Wipes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: TRANSPARENCY */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EBB097]">
              Transparency
            </h4>
            <ul className="space-y-3 text-sm text-[#E1ECE6]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Safety &amp; Testing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-left text-xs text-[#A2BDB0] hover:text-[#E1ECE6] pt-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#EBB097]" />
                  <span>Baby Routine Quiz</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrandPack}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-left text-xs text-[#A2BDB0] hover:text-[#E1ECE6]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#EBB097]" />
                  <span>Brand Architecture Deck</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SUPPORT & Gentle Notes */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#EBB097]">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-[#E1ECE6]">
              <li>
                <button
                  id="footer-faq-btn"
                  onClick={() => {
                    onNavigate('faq');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Care &amp; FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shipping &amp; Returns
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@nimayacare.com"
                  className="hover:text-white transition-colors text-left block"
                >
                  hello@nimayacare.com
                </a>
              </li>
            </ul>

            {/* Gentle Newsletter Signup */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-full bg-[#345242] border border-[#436452] overflow-hidden p-1 shadow-inner">
                  <input
                    type="email"
                    required
                    placeholder="Parent email for gentle updates"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 text-xs text-white placeholder-[#8FAFA0] bg-transparent focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-3 py-1.5 rounded-full bg-[#EBB097] hover:bg-[#F2BC9F] text-[#2B4436] text-xs font-bold cursor-pointer shrink-0 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {subscribed && (
                  <div className="text-[11px] text-[#A2E3B8] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Welcome to gentle, quiet care.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Certifications Row (Translucent on Botanical Evergreen) */}
        <div className="pt-8 border-t border-[#3F594A] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#A2BDB0]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#EBB097]" />
            <span className="text-[#E1ECE6]">Pediatrician Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#EBB097]" />
            <span className="text-[#E1ECE6]">Tear-Free Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#EBB097]" />
            <span className="text-[#E1ECE6]">100% Fragrance-Free</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#EBB097]" />
            <span className="text-[#E1ECE6]">Safe for 0–4 Years</span>
          </div>
        </div>

        {/* Bottom Bar: Exact match to user image */}
        <div className="pt-6 border-t border-[#3F594A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8FAFA0] gap-4">
          <div>
            © 2026 Nimaya Baby Care. All rights reserved.
          </div>
          <div className="tracking-[0.2em] text-[11px] font-medium text-[#8FAFA0] uppercase">
            Every little touch of care matters
          </div>
        </div>
      </div>
    </footer>
  );
}
