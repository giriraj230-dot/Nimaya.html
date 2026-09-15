import { ShieldCheck, Heart, Sparkles, Droplets, CheckCircle, FileText } from 'lucide-react';
import heroImg from '../assets/images/nimaya_hero_baby_1789380666451.jpg';
import { Logo } from './Logo';

interface AboutSectionProps {
  onOpenBrandPack?: () => void;
}

export function AboutSection({ onOpenBrandPack }: AboutSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5] text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section 1: Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFEA] text-[#5C554D] border border-[#E5DDD2]">
              <Heart className="w-3.5 h-3.5 text-[#C49E85]" />
              Our Story
            </div>

            <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl text-[#2C2926] leading-tight">
              At Nimaya, we believe little skin deserves thoughtful care from the very beginning.
            </h2>

            <p className="text-base sm:text-lg text-[#524B43] leading-relaxed font-normal">
              We created Nimaya to make everyday skin and hygiene care simpler for parents of little ones aged 0–4 years. From bath time and hair care to sun protection and quick clean-ups, our essentials are designed to become an easy part of your child’s daily routine.
            </p>

            <p className="text-base text-[#524B43] leading-relaxed">
              Our approach is simple — gentle care, clear information and thoughtful choices that help parents feel more confident about what they choose for their little ones.
            </p>

            <div className="pt-2">
              <p className="font-serif-brand italic text-xl text-[#3D352E] border-l-2 border-[#C49E85] pl-4 py-1">
                Because every little touch of care matters.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#E9E1D6] bg-white p-2">
              <img
                src={heroImg}
                alt="Gentle touch baby care - Nimaya"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="p-5 flex flex-col items-center justify-center text-center bg-[#FAF8F5] rounded-b-2xl">
                <Logo layout="vertical" size="sm" showTagline={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Our Approach to Safety */}
        <div className="pt-10 border-t border-[#EAE3D9] space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0EB] text-[#425E45] border border-[#D5E1D6]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6B7F6D]" />
              Our Approach to Safety
            </div>
            <h3 className="font-serif-brand text-3xl sm:text-4xl text-[#2C2926]">
              Your little one’s well-being comes first in every choice we make.
            </h3>
            <p className="text-sm text-[#665D54]">
              Four non-negotiable principles that guide every batch, formula, and label we produce.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Pillar 1: Clear Ingredients */}
            <div className="p-6 rounded-2xl bg-white border border-[#EAE3D9] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#6B7F6D]">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-serif-brand text-lg font-semibold text-[#2C2926]">
                Clear Ingredients
              </h4>
              <p className="text-sm text-[#544D45] leading-relaxed">
                We believe parents should know what goes into the products they choose. Our product pages clearly explain key ingredients, their origin source, and their exact purpose in simple, unmasked language.
              </p>
            </div>

            {/* Pillar 2: Age & Usage Guidance */}
            <div className="p-6 rounded-2xl bg-white border border-[#EAE3D9] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#C49E85]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif-brand text-lg font-semibold text-[#2C2926]">
                Age & Usage Guidance
              </h4>
              <p className="text-sm text-[#544D45] leading-relaxed">
                Every product provides clear directions, age guidance (0–6m, 6–12m, 1–4y), and important precautions so parents know exactly how and when to use it with complete confidence.
              </p>
            </div>

            {/* Pillar 3: Thoughtful Formulation */}
            <div className="p-6 rounded-2xl bg-white border border-[#EAE3D9] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#6B7F6D]">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif-brand text-lg font-semibold text-[#2C2926]">
                Thoughtful Formulation
              </h4>
              <p className="text-sm text-[#544D45] leading-relaxed">
                Our products are designed specifically with the tender needs of delicate young skin in mind, with a focus on gentle everyday care that respects the developing skin barrier and natural acid mantle.
              </p>
            </div>

            {/* Pillar 4: Honest Communication */}
            <div className="p-6 rounded-2xl bg-white border border-[#EAE3D9] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#C49E85]">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-serif-brand text-lg font-semibold text-[#2C2926]">
                Honest Communication
              </h4>
              <p className="text-sm text-[#544D45] leading-relaxed">
                No confusing promises or artificial marketing buzzwords. We aim to communicate product benefits, directions, and safety information in simple language parents can understand without stress.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Our Promise */}
        <div className="pt-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#F4EFE7] via-[#FAF8F5] to-[#F1EBE2] border border-[#E6DDD2] text-center space-y-5 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-widest text-[#786D61]">
              Our Promise
            </span>

            <h3 className="font-serif-brand text-2xl sm:text-3xl lg:text-4xl text-[#2C2926] max-w-2xl mx-auto leading-snug">
              To keep everyday baby care <span className="italic">gentle, simple and transparent</span>, so you can spend less time worrying about choices and more time enjoying the little moments.
            </h3>

            <p className="font-serif-brand text-lg text-[#5A5046] italic">
              Nimaya — Gentle care, from the very beginning.
            </p>

            {onOpenBrandPack && (
              <div className="pt-4">
                <button
                  id="about-open-deck-btn"
                  onClick={onOpenBrandPack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#4A433B] border border-[#E0D7CC] text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#C49E85]" />
                  View Full Brand Strategy & Academic Jury Deck
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
