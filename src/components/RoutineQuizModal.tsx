import { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Heart, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatINR } from '../utils/format';

interface RoutineQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoutineToCart: (products: Product[]) => void;
}

export function RoutineQuizModal({ isOpen, onClose, onAddRoutineToCart }: RoutineQuizModalProps) {
  const [step, setStep] = useState(1);
  const [ageGroup, setAgeGroup] = useState<string>('0-3m');
  const [focusArea, setFocusArea] = useState<string>('bath');
  const [bathFreq, setBathFreq] = useState<string>('2-3x');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setCompleted(false);
  };

  // Determine recommended products based on answers
  const getRecommendedProducts = (): Product[] => {
    if (ageGroup === '0-3m') {
      // Newborns need ultra gentle wash & pure water wipes
      return PRODUCTS.filter(p => p.id === 'gentle-foaming-cleanser' || p.id === 'pure-water-baby-wipes');
    }
    if (ageGroup === '1-4y' || focusArea === 'outdoor') {
      // Active toddlers / outdoor need sunscreen + shampoo + wash
      return PRODUCTS.filter(p => p.id !== 'pure-water-baby-wipes');
    }
    // Default comprehensive routine
    return PRODUCTS;
  };

  const recommended = getRecommendedProducts();
  const totalPrice = recommended.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#2C2926]/50 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E6DDD2] shadow-2xl overflow-hidden my-auto p-6 sm:p-8 text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        {/* Close */}
        <button
          id="close-quiz-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#4A443E] border border-[#E8DFD5] transition-colors cursor-pointer"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div className="space-y-6">
            {/* Progress Header */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#7A7167] mb-2">
                <span className="flex items-center gap-1.5 text-[#6B7F6D]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Nimaya Routine Guide
                </span>
                <span>Step {step} of 3</span>
              </div>
              <div className="w-full h-1.5 bg-[#F3EFEA] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6B7F6D] transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Age */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 id="quiz-modal-title" className="font-serif-brand text-2xl text-[#2C2926]">
                    How old is your little one?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B635A] mt-1">
                    Skin thickness and barrier lipids change significantly between newborn days and toddlerhood.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: '0-3m', title: '0–3 Months (Newborn)', desc: 'Delicate acid-mantle forming, ultra gentle sponge or tub baths.' },
                    { id: '4-6m', title: '4–6 Months (Infant)', desc: 'First giggles, rolling over, beginning sensory water play.' },
                    { id: '7-12m', title: '7–12 Months (Explorer)', desc: 'Crawling, outdoor stroller strolls, high-chair messy meals.' },
                    { id: '1-4y', title: '1–4 Years (Toddler)', desc: 'Walking, park playgrounds, sunscreen defense & daily bathtimes.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAgeGroup(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        ageGroup === opt.id
                          ? 'border-[#6B7F6D] bg-[#F1F6F2] ring-1 ring-[#6B7F6D]'
                          : 'border-[#E8DFD5] bg-[#FAF8F5] hover:bg-[#F5EFE7]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#2C2926]">{opt.title}</div>
                      <div className="text-[11px] text-[#6B635A] mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs font-semibold cursor-pointer"
                  >
                    Next Question
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Skin Priority */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="font-serif-brand text-2xl text-[#2C2926]">
                    What is your top everyday focus?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B635A] mt-1">
                    Select the daily routine challenge you most want gentle support with.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'bath', title: 'Tear-Free Calming Baths', desc: 'Soothe baby before bed without stinging or redness.' },
                    { id: 'scalp', title: 'Cradle Cap & Fine Hair', desc: 'Moisturize flake-prone scalp while keeping hair feather-soft.' },
                    { id: 'outdoor', title: 'Safe Outdoor Sun Protection', desc: 'Mineral defense without ghost cast or synthetic chemicals.' },
                    { id: 'hygiene', title: 'Messy Feeding & Diapering', desc: 'Pure water cleanups that prevent diaper rash and irritation.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFocusArea(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        focusArea === opt.id
                          ? 'border-[#6B7F6D] bg-[#F1F6F2] ring-1 ring-[#6B7F6D]'
                          : 'border-[#E8DFD5] bg-[#FAF8F5] hover:bg-[#F5EFE7]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#2C2926]">{opt.title}</div>
                      <div className="text-[11px] text-[#6B635A] mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-[#7A7167] hover:text-[#2C2926] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs font-semibold cursor-pointer"
                  >
                    Next Question
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Bath Frequency */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="font-serif-brand text-2xl text-[#2C2926]">
                    How often does your little one take a bath?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B635A] mt-1">
                    Pediatric dermatologists often recommend adjusting wash frequency to preserve the lipid mantle.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'daily', title: 'Every Evening', desc: 'Part of regular bedtime wind-down.' },
                    { id: '2-3x', title: '2–3 Times a Week', desc: 'Pediatrician recommended gentle rhythm.' },
                    { id: 'sponge', title: 'Quick Sponge Clean', desc: 'Focusing on folds, neck, and diaper zone.' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBathFreq(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        bathFreq === opt.id
                          ? 'border-[#6B7F6D] bg-[#F1F6F2] ring-1 ring-[#6B7F6D]'
                          : 'border-[#E8DFD5] bg-[#FAF8F5] hover:bg-[#F5EFE7]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#2C2926]">{opt.title}</div>
                      <div className="text-[11px] text-[#6B635A] mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-[#7A7167] hover:text-[#2C2926] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompleted(true)}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#6B7F6D] hover:bg-[#596D5B] text-white text-xs font-semibold cursor-pointer"
                  >
                    See My Baby’s Routine
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results View */
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0EB] text-[#425E45] border border-[#D5E1D6]">
                <Heart className="w-3.5 h-3.5 text-[#C49E85]" />
                Personalized Gentle Routine
              </span>
              <h3 className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
                Your Tailored Nimaya Care Set
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635A] max-w-md mx-auto">
                Based on your {ageGroup} stage, here are the gentle, non-stripping essentials for everyday peace of mind.
              </p>
            </div>

            {/* Recommended Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
              {recommended.map((prod) => (
                <div key={prod.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD5] flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#EFE9E1]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#2C2926] truncate">{prod.name}</div>
                    <div className="text-[11px] text-[#7A7167] mt-0.5">{prod.size}</div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs font-serif-brand font-semibold text-[#2C2926]">
                        {formatINR(prod.price)}
                      </span>
                      {prod.originalPrice && prod.originalPrice > prod.price && (
                        <span className="line-through text-[10px] text-[#8C8377]">
                          {formatINR(prod.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pediatrician Reassurance */}
            <div className="p-3.5 rounded-2xl bg-[#F3EFEA] border border-[#E8DFD5] flex items-center gap-3 text-xs text-[#524B43]">
              <ShieldCheck className="w-5 h-5 text-[#6B7F6D] shrink-0" />
              <span>
                All recommended items feature <strong>pH 5.2–5.8</strong>, 0% synthetic fragrance, and tear-free ophthalmologist testing.
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A7167] hover:text-[#2C2926] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>

              <button
                type="button"
                onClick={() => {
                  onAddRoutineToCart(recommended);
                  onClose();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" />
                Add Routine to Bag — {formatINR(totalPrice)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
