import { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles, Mail, ShieldCheck } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'Safety & Ingredients' | 'Products & Routine' | 'Orders & Shipping';
  question: string;
  answer: string;
  badge?: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-age',
    category: 'Safety & Ingredients',
    question: 'At what age can I start using Nimaya products on my baby?',
    answer:
      'Our Gentle Foaming Cleanser, Tear-Free Shampoo, and Soft Baby Wipes are formulated with ultra-mild botanicals and are safe for delicate newborn skin from day one (0+ months). For our Mineral Sunscreen SPF 50, pediatric dermatologists recommend protective clothing, wide-brim hats, and shade for infants under 6 months; for babies 6 months and older (up to 4+ years and beyond), it provides daily broad-spectrum non-nano mineral sun protection.',
    badge: '0–4 Years Safe',
  },
  {
    id: 'faq-tear-free',
    category: 'Safety & Ingredients',
    question: 'Are Nimaya products truly tear-free and fragrance-free?',
    answer:
      'Yes, 100%. All our formulas are ophthalmologist-evaluated and clinically tested to be tear-free and non-irritating to sensitive little eyes. We do not use any synthetic perfumes, masking fragrances, or volatile essential oils that might trigger allergies or irritate a newborn’s developing sense of smell.',
    badge: 'Pediatrician Tested',
  },
  {
    id: 'faq-sunscreen',
    category: 'Products & Routine',
    question: 'What makes your mineral sunscreen safe, and does it leave a white cast?',
    answer:
      'Our sunscreen uses 100% non-nano zinc oxide that creates a physical shield on top of the skin barrier, reflecting harmful UVA and UVB rays without being absorbed into your child’s bloodstream. It is blended with organic chamomile and oat lipids to spread smoothly without feeling sticky, greasy, or leaving a heavy, chalky white residue.',
    badge: 'Non-Nano Zinc',
  },
  {
    id: 'faq-cleanser-dual',
    category: 'Products & Routine',
    question: 'Can the Foaming Cleanser be used for both hair and body?',
    answer:
      'Yes! The Gentle Head to Toe Foaming Cleanser is pH-balanced (5.5) and specially calibrated to cleanse both scalp and body without stripping essential lipids. For toddlers with thicker hair, curls, or cradle cap, our Gentle Baby Shampoo provides extra nourishing conditioning and provitamin B5 (panthenol).',
  },
  {
    id: 'faq-wipes-material',
    category: 'Products & Routine',
    question: 'What are Nimaya Soft Baby Wipes made of?',
    answer:
      'Our wipes are crafted from 100% unbleached, plant-derived bamboo fibers soaked in 99.2% purified hospital-grade water, chamomile extract, and vegetable glycerin. They are free from plastics, parabens, alcohol, and phenoxyethanol, and feature an airtight moisture-lock flip-top lid so the 120 wipes remain moist until the very last sheet.',
    badge: '99.2% Pure Water',
  },
  {
    id: 'faq-patch-test',
    category: 'Safety & Ingredients',
    question: 'How should I perform a patch test on my child?',
    answer:
      'Before full application of any new product, gently apply a small pea-sized amount to the inside of your baby’s upper arm or inner thigh. Leave undisturbed for 24 hours. If no redness, itching, or swelling occurs, you can comfortably proceed with full daily usage.',
  },
  {
    id: 'faq-shipping-returns',
    category: 'Orders & Shipping',
    question: 'What is your shipping policy and delivery timeline across India?',
    answer:
      'We offer free standard shipping on all orders over ₹499 across India. All orders are carefully packaged in recyclable packaging and dispatched within 24 hours. Typical transit time is 3 to 5 business days depending on your city. You will receive an SMS and email with live tracking details upon dispatch.',
    badge: 'Free Over ₹499',
  },
  {
    id: 'faq-return-policy',
    category: 'Orders & Shipping',
    question: 'What is your return or exchange guarantee?',
    answer:
      'We want every parent to feel completely confident with their choice. If any product arrives damaged or if your little one experiences unexpected sensitivity, contact us at hello@nimayacare.com within 15 days of delivery for a replacement or full refund.',
  },
];

interface FaqSectionProps {
  onOpenQuiz?: () => void;
  className?: string;
}

export function FaqSection({ onOpenQuiz, className = '' }: FaqSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-age': true,
    'faq-tear-free': true,
  });

  const categories = ['All', 'Safety & Ingredients', 'Products & Routine', 'Orders & Shipping'];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq-section" className={`py-16 md:py-20 text-left ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFEA] text-[#5C554D] border border-[#E5DDD2]">
            <HelpCircle className="w-3.5 h-3.5 text-[#6B7F6D]" />
            Frequently Asked Questions
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl text-[#2C2926]">
            Clear Answers for Thoughtful Parents
          </h2>
          <p className="text-xs sm:text-sm text-[#665D54] leading-relaxed">
            Everything you need to know about our pediatric safety standards, age brackets, clean formulations, and gentle everyday routines.
          </p>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="space-y-4">
          {/* Live Search Input */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C8276]">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., newborn, tear-free, sunscreen, shipping)..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-[#E3DBD0] text-xs sm:text-sm text-[#2C2926] placeholder-[#9C9388] shadow-2xs focus:outline-hidden focus:border-[#6B7F6D] transition-colors"
            />
            {searchQuery && (
              <button
                id="faq-search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-[#8C8276] hover:text-[#2C2926] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`faq-cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#2C2926] text-white shadow-xs'
                      : 'bg-white hover:bg-[#F3EFEA] text-[#5C554D] border border-[#E7DFD4]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#EAE3D9] text-[#70665C] space-y-2">
              <p className="text-sm font-medium">No matching questions found for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-[#8F857A]">
                Have a specific question? Write to us directly at hello@nimayacare.com and our team will gladly assist you.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#DCD3C7] shadow-xs'
                      : 'bg-white/80 hover:bg-white border-[#EBE4DA]'
                  }`}
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer gap-4 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B7F6D] shrink-0" />
                      <span className="font-serif-brand text-base sm:text-lg text-[#2C2926] font-medium leading-snug">
                        {faq.question}
                      </span>
                      {faq.badge && (
                        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-[#FAF4ED] border border-[#EADFCF] text-[10px] font-semibold text-[#8C5D38] shrink-0">
                          {faq.badge}
                        </span>
                      )}
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#F3EFEA] text-[#2C2926] rotate-180' : 'text-[#8C8276]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C544B] leading-relaxed border-t border-[#F5F0E8] mt-1 space-y-2">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Reassurance Callout Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F4EFE7] via-[#FAF8F5] to-[#F1EBE2] border border-[#E6DDD2] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#6B7F6D] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Still have a question about your little one?</span>
            </div>
            <h3 className="font-serif-brand text-xl sm:text-2xl text-[#2C2926]">
              Take our 60-second routine quiz or contact our care team.
            </h3>
            <p className="text-xs text-[#6B635A]">
              We reply with calm, pediatric-informed guidance within 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenQuiz && (
              <button
                id="faq-open-quiz-btn"
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#EBB097]" />
                Routine Quiz
              </button>
            )}
            <a
              id="faq-email-btn"
              href="mailto:hello@nimayacare.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#2C2926] border border-[#DDD3C6] text-xs font-semibold shadow-2xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#6B7F6D]" />
              Email Care Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
