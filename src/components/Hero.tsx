import { ArrowRight, ShieldCheck, Heart, Sparkles, Droplets } from 'lucide-react';
import heroImg from '../assets/images/nimaya_hero_baby_1789380666451.webp';
import { Logo } from './Logo';

interface HeroProps {
  onExploreClick: () => void;
  onQuizClick: () => void;
}

export function Hero({ onExploreClick, onQuizClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Full-Bleed Background Image & Seamless Gradient Scrim */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={heroImg}
          alt="Mother tenderly holding her baby wrapped in a gentle organic blanket - Nimaya"
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[center_30%] sm:object-[75%_center] lg:object-[82%_center]"
        />

        {/* Dynamic Multi-Stop Gradient Scrim: Solid warm neutral behind typography, softly fading into photography on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/98 sm:via-[#FAF8F5]/95 via-50% md:via-[#FAF8F5]/90 md:via-55% lg:via-[#FAF8F5]/80 lg:via-55% to-[#FAF8F5]/10 lg:to-transparent" />

        {/* Top and Bottom gentle edge blending */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF8F5] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Ethos & Content */}
          <div className="lg:col-span-7 space-y-6 text-left max-w-2xl">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA]/95 backdrop-blur-xs border border-[#E7DFD4] text-[#5C554D] text-xs font-medium tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#6B7F6D]" />
              Nimaya Baby Care (0–4 Years)
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl text-[#2C2926] tracking-tight leading-[1.15]">
              Gentle care, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#4A443E]">from the very beginning.</span>
            </h1>

            {/* Subheading & Core Story */}
            <p className="text-base sm:text-lg text-[#5A534B] leading-relaxed font-normal">
              At Nimaya, we believe little skin deserves thoughtful care from day one.
              From bath time and hair care to sun protection and quick clean-ups, our 4 gentle essentials are designed to become an easy, calming part of your daily routine.
            </p>

            {/* Brand Quote */}
            <div className="border-l-2 border-[#C49E85] pl-4 py-1">
              <p className="font-serif-brand italic text-base text-[#6B5E52]">
                &ldquo;Because every little touch of care matters.&rdquo;
              </p>
            </div>

            {/* Interactive CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2C2926] hover:bg-[#433E3A] text-[#FAF8F5] text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                Shop the 4 Essentials
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-quiz-cta-btn"
                onClick={onQuizClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#4A443E] border border-[#E3DBD0] text-sm font-medium transition-all cursor-pointer shadow-2xs backdrop-blur-xs"
              >
                <Sparkles className="w-4 h-4 text-[#6B7F6D]" />
                Find My Baby’s Routine
              </button>
            </div>

            {/* 4 Trust & Credibility Signals */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#EFE9E1]/80">
              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-full bg-white/80 border border-[#EBE3D7] flex items-center justify-center shrink-0 text-[#6B7F6D]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C2926]">Pediatrician</div>
                  <div className="text-[11px] text-[#7A7167]">Tested & Approved</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-full bg-white/80 border border-[#EBE3D7] flex items-center justify-center shrink-0 text-[#C49E85]">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C2926]">Tear-Free</div>
                  <div className="text-[11px] text-[#7A7167]">Ophthalmologist tested</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-full bg-white/80 border border-[#EBE3D7] flex items-center justify-center shrink-0 text-[#6B7F6D]">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C2926]">0% Fragrance</div>
                  <div className="text-[11px] text-[#7A7167]">No masking agents</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-left">
                <div className="w-7 h-7 rounded-full bg-white/80 border border-[#EBE3D7] flex items-center justify-center shrink-0 text-[#C49E85]">
                  <span className="text-xs font-bold font-serif-brand">0-4</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C2926]">Years Special</div>
                  <div className="text-[11px] text-[#7A7167]">Acid-mantle safe</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Ambient Brand Card on Desktop */}
          <div className="hidden lg:flex lg:col-span-5 items-end justify-end self-end pb-8">
            <div className="p-4 rounded-2xl backdrop-blur-md bg-white/85 border border-white/70 shadow-lg max-w-xs transition-all hover:bg-white/95">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#EBE1D2] flex items-center justify-center p-1 shrink-0">
                  <Logo layout="mark-only" size="xs" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C2926]">
                    Honest Care • Clear Ingredients
                  </div>
                  <div className="text-[11px] text-[#696157] mt-0.5">
                    No confusing promises. Pure routine essentials for baby skin.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
