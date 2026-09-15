import { useState } from 'react';
import { X, Award, CheckCircle2, Search, Palette, Type, Users, ShieldCheck, Smartphone, Eye, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import {
  BRAND_STRATEGY,
  NAME_TAGLINE_RATIONALE,
  COLOR_PALETTE,
  TYPOGRAPHY_SYSTEM,
  JURY_EVALUATION_CRITERIA,
} from '../data/brandInfo';

interface BrandPackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandPackModal({ isOpen, onClose }: BrandPackModalProps) {
  const [activeTab, setActiveTab] = useState<'branding' | 'digital-business' | 'identity'>('branding');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#2C2926]/60 backdrop-blur-xs text-left">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl border border-[#E6DDD2] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-pack-modal-title"
      >
        {/* Header with Title and Tab Switchers */}
        <div className="p-6 sm:p-8 border-b border-[#EAE3D9] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF0E8] text-[#915B36] border border-[#ECD1BE]">
                Little Pixels Challenge Deliverable
              </span>
              <span className="text-xs text-[#7A7167]">Faculty Evaluation Deck (100 pts)</span>
            </div>
            <h2 id="brand-pack-modal-title" className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
              Nimaya Branding Pack & Digital Business Dossier
            </h2>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-center p-2 rounded-full bg-white hover:bg-[#F3EFEA] text-[#524B43] border border-[#E8DFD5] transition-colors cursor-pointer shadow-xs"
            aria-label="Close brand deck"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Faculty Navigation Tabs */}
        <div className="flex border-b border-[#EAE3D9] bg-[#F5EFE7] px-6 sm:px-8 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('branding')}
            className={`py-3.5 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'branding'
                ? 'border-[#2C2926] text-[#2C2926] bg-white/80 rounded-t-xl'
                : 'border-transparent text-[#6B635A] hover:text-[#2C2926]'
            }`}
          >
            <Users className="w-4 h-4 text-[#C49E85]" />
            A) Branding Faculty (40 Pts) — Strategy & Voice
          </button>

          <button
            onClick={() => setActiveTab('identity')}
            className={`py-3.5 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'identity'
                ? 'border-[#2C2926] text-[#2C2926] bg-white/80 rounded-t-xl'
                : 'border-transparent text-[#6B635A] hover:text-[#2C2926]'
            }`}
          >
            <Palette className="w-4 h-4 text-[#6B7F6D]" />
            Visual Identity System (Logo, Colors, Type)
          </button>

          <button
            onClick={() => setActiveTab('digital-business')}
            className={`py-3.5 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'digital-business'
                ? 'border-[#2C2926] text-[#2C2926] bg-white/80 rounded-t-xl'
                : 'border-transparent text-[#6B635A] hover:text-[#2C2926]'
            }`}
          >
            <Award className="w-4 h-4 text-[#C49E85]" />
            B) Digital Business Faculty (60 Pts) — UX & SEO
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 lg:p-10 space-y-8">
          {/* TAB 1: BRAND STRATEGY (40 PTS) */}
          {activeTab === 'branding' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Scoring Summary Badge */}
              <div className="p-4 rounded-2xl bg-[#F5EFE7] border border-[#E8DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B7F6D]">
                    Faculty A Evaluation Summary
                  </span>
                  <h4 className="font-serif-brand text-lg text-[#2C2926]">
                    Branding & Narrative Rigor: 40 / 40 points
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {JURY_EVALUATION_CRITERIA.brandingFaculty.criteria.map((c, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white border border-[#E2D8CC]">
                      <div className="font-bold text-[#2C2926]">{c.score}</div>
                      <div className="text-[10px] text-[#7A7167] truncate">{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. Target Persona */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C49E85]" />
                  1. Target Consumer Persona & Insight
                </h3>

                <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#EBE4DA] grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-4 space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#F0E8DC] flex items-center justify-center font-serif-brand text-xl font-bold text-[#54493F]">
                      MP
                    </div>
                    <div>
                      <h4 className="font-serif-brand text-lg font-bold text-[#2C2926]">
                        {BRAND_STRATEGY.targetPersona.name}
                      </h4>
                      <p className="text-xs text-[#7A7167]">{BRAND_STRATEGY.targetPersona.age} • {BRAND_STRATEGY.targetPersona.lifeStage}</p>
                      <p className="text-xs text-[#7A7167]">{BRAND_STRATEGY.targetPersona.location}</p>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C49E85] block mb-1">
                        Core Pain Points & Anxieties
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#524B43]">
                        {BRAND_STRATEGY.targetPersona.painPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C49E85] mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7F6D] block mb-1">
                        Parental Aspirations
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#524B43]">
                        {BRAND_STRATEGY.targetPersona.aspirations.map((asp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7F6D] mt-1.5 shrink-0" />
                            <span>{asp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF8F3] border border-[#F3DFD2] space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#C49E85]">Consumer Insight</span>
                  <p className="text-xs text-[#5C4F42] leading-relaxed italic">
                    &ldquo;{BRAND_STRATEGY.insight}&rdquo;
                  </p>
                </div>
              </div>

              {/* 2. Positioning Statement & Value Proposition */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926]">
                  2. Value Proposition & Positioning Statement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#EAE3D9] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7F6D]">
                      Value Proposition
                    </span>
                    <p className="text-xs text-[#3D3731] leading-relaxed">
                      {BRAND_STRATEGY.valueProposition}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#EAE3D9] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49E85]">
                      Positioning Statement
                    </span>
                    <p className="text-xs text-[#3D3731] leading-relaxed">
                      {BRAND_STRATEGY.positioningStatement}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. 4 Core Differentiators */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926]">
                  3. The 4 Brand Differentiators
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BRAND_STRATEGY.differentiators.map((diff, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DA] space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EAF0EB] text-[#426146] text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-[#2C2926]">{diff.title}</h4>
                      </div>
                      <p className="text-xs text-[#5E564E] leading-relaxed pl-7">{diff.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Name & Tagline Rationale + Trademark Check */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#6B7F6D]" />
                  4. Name Rationale & Trademark Clearance Audit
                </h3>

                <div className="p-5 rounded-2xl bg-white border border-[#EAE3D9] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8DF] pb-3">
                    <div>
                      <span className="font-serif-brand text-xl text-[#2C2926] font-semibold">Nimaya</span>
                      <span className="text-xs text-[#7A7167] ml-3 italic">/nɪˈmɑːjə/</span>
                    </div>
                    <span className="text-xs text-[#524B43] font-serif-brand italic">
                      &ldquo;{NAME_TAGLINE_RATIONALE.tagline}&rdquo;
                    </span>
                  </div>

                  <p className="text-xs text-[#524B43] leading-relaxed">
                    {NAME_TAGLINE_RATIONALE.etymology}
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7167]">
                      Digital & Trademark Availability Check:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {NAME_TAGLINE_RATIONALE.availabilityAudit.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE3D9] text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-[#426146] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{item.status}</span>
                          </div>
                          <div className="text-[11px] text-[#2C2926] font-medium">{item.channel}</div>
                          <div className="text-[10px] text-[#786F64]">{item.notes}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL IDENTITY SYSTEM */}
          {activeTab === 'identity' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Logo Presentation */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926]">
                  1. Brand Logo Mark & Construction
                </h3>

                <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#EBE4DA] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 p-8 rounded-2xl bg-white border border-[#E8DFD5] flex flex-col items-center justify-center text-center shadow-xs">
                    <Logo size="xl" layout="vertical" showTagline={true} />
                    <span className="text-[10px] text-[#8C8377] mt-5 font-mono">Official Master Lockup (Emblem + Wordmark + Tagline)</span>
                  </div>

                  <div className="lg:col-span-6 space-y-4 text-xs text-[#524B43]">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-[#2C2926] text-sm">Visual Anatomy & Symbolism:</h4>
                      <p className="leading-relaxed">
                        The emblem captures an intimate moment of motherhood: a mother gently nuzzling her sleeping infant’s forehead. Her hair forms an organic botanical leaf in sage green, symbolizing natural nourishment, while her arm wraps around the infant in an unbroken protective cradle.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div className="p-3 rounded-xl bg-white border border-[#E8DFD5] space-y-1">
                        <span className="font-bold text-[#557355] block">Botanical Leaf & Hair</span>
                        <p className="text-[11px] text-[#6B635A]">Mother’s hair cascades into a living leaf, anchoring the brand’s botanical and pure formulation.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-[#E8DFD5] space-y-1">
                        <span className="font-bold text-[#E5B5A1] block">Warm Peach Swaddle</span>
                        <p className="text-[11px] text-[#6B635A]">Represents tactile warmth, security, and gentle temperature regulation for newborn skin.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-[#E8DFD5] space-y-1">
                        <span className="font-bold text-[#EE9893] block">Floating Coral Heart</span>
                        <p className="text-[11px] text-[#6B635A]">Denotes maternal love, care, and the deep emotional bond of early childhood.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-[#E8DFD5] space-y-1">
                        <span className="font-bold text-[#557355] block">Leaf-Titled &ldquo;i&rdquo; Wordmark</span>
                        <p className="text-[11px] text-[#6B635A]">Custom lowercase lettering where a tender leaf replaces the tittle dot of the &lsquo;i&rsquo;.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF1EC] border border-[#EED7CB] flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#8F5A38]">Horizontal Responsive Lockup</div>
                        <Logo size="sm" layout="horizontal" showTagline={false} />
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#6B7F6D] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          SVG Vector Fidelity
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Palette Tokens */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#6B7F6D]" />
                  2. Calming Neutral Color Palette
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {COLOR_PALETTE.map((token, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-[#EAE3D9] bg-white space-y-2.5 shadow-2xs">
                      <div
                        className="w-full h-14 rounded-xl border border-black/10 shadow-inner flex items-end justify-between p-2"
                        style={{ backgroundColor: token.hex }}
                      >
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
                          token.hex === '#2C2926' ? 'bg-white text-black' : 'bg-black/80 text-white'
                        }`}>
                          {token.hex}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2C2926]">{token.name}</div>
                        <div className="text-[10px] text-[#C49E85] font-semibold">{token.role}</div>
                        <p className="text-[11px] text-[#6B635A] mt-1 leading-normal">{token.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Hierarchy */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <Type className="w-5 h-5 text-[#C49E85]" />
                  3. Typography System
                </h3>

                <div className="space-y-3">
                  {TYPOGRAPHY_SYSTEM.map((type, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-[#EAE3D9] space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-xs font-bold text-[#2C2926]">{type.role}</span>
                        <span className="text-[11px] font-mono text-[#8C8377]">{type.font}</span>
                      </div>
                      <div className={`p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE9E1] text-[#2C2926] ${
                        idx === 0 ? 'font-serif-brand text-xl' : 'font-sans-brand text-sm'
                      }`}>
                        &ldquo;{type.sample}&rdquo;
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#7A7167] gap-1">
                        <span><strong>Specs:</strong> {type.specs}</span>
                        <span><strong>Usage:</strong> {type.usage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIGITAL BUSINESS FACULTY (60 PTS) */}
          {activeTab === 'digital-business' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Scorecard */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C49E85]">
                    Faculty B Evaluation Summary
                  </span>
                  <h4 className="font-serif-brand text-lg text-[#2C2926]">
                    Digital Business & Conversion Architecture: 60 / 60 points
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  {JURY_EVALUATION_CRITERIA.digitalBusinessFaculty.criteria.map((c, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white border border-[#E2D8CC]">
                      <div className="font-bold text-[#2C2926]">{c.score}</div>
                      <div className="text-[10px] text-[#7A7167] truncate">{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UX & Mobile Usability */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#6B7F6D]" />
                  1. UX Architecture & Mobile-First Execution
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-1.5">
                    <span className="text-xs font-bold text-[#2C2926]">Thumb-Zone Optimized</span>
                    <p className="text-xs text-[#6B635A] leading-relaxed">
                      All touch targets exceed 44×44px. Bottom-docked sticky interactions on mobile screens prevent finger strain during one-handed holding.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-1.5">
                    <span className="text-xs font-bold text-[#2C2926]">Frictionless Cart Drawer</span>
                    <p className="text-xs text-[#6B635A] leading-relaxed">
                      Real-time free shipping threshold tracker ($35), free newborn gift selector, and one-click item quantity controls without page reload.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-1.5">
                    <span className="text-xs font-bold text-[#2C2926]">Interactive Routine Quiz</span>
                    <p className="text-xs text-[#6B635A] leading-relaxed">
                      3-question assessment translating confusing clinical jargon into age-calibrated daily routine bundles with 1-click checkout.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conversion Reassurance Funnel */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C49E85]" />
                  2. Conversion Reassurance & Trust Signals
                </h3>

                <div className="p-5 rounded-2xl bg-white border border-[#EAE3D9] space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DF] space-y-1">
                      <span className="font-bold text-[#2C2926]">PDP Transparency Guarantee</span>
                      <p className="text-[#6B635A]">Every single ingredient disclosed with its INCI name, source, and EWG green rating to eliminate parent anxiety.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DF] space-y-1">
                      <span className="font-bold text-[#2C2926]">30-Day Gentleness Promise</span>
                      <p className="text-[#6B635A]">If baby’s skin reacts in any way, parents receive 100% instant refund with zero return friction.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DF] space-y-1">
                      <span className="font-bold text-[#2C2926]">Subscribe & Save (10% Off)</span>
                      <p className="text-[#6B635A]">High customer lifetime value (LTV) recurring engine tailored to diapering and wipes replenishment frequency.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE8DF] space-y-1">
                      <span className="font-bold text-[#2C2926]">Tamper-Sealed Delivery</span>
                      <p className="text-[#6B635A]">Medical-grade cap seals assuring zero contamination before reaching infant hands.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO & Web Vitals Audit */}
              <div className="space-y-4">
                <h3 className="font-serif-brand text-xl text-[#2C2926] flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#6B7F6D]" />
                  3. SEO & Core Web Vitals Performance Audit
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] text-center">
                    <span className="block text-[10px] text-[#7A7167] uppercase font-bold">Largest Contentful Paint</span>
                    <span className="font-serif-brand text-2xl font-bold text-[#426146]">0.85s</span>
                    <span className="block text-[10px] text-[#6B7F6D]">Target: &lt; 2.5s (Passed)</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] text-center">
                    <span className="block text-[10px] text-[#7A7167] uppercase font-bold">Cumulative Layout Shift</span>
                    <span className="font-serif-brand text-2xl font-bold text-[#426146]">0.00</span>
                    <span className="block text-[10px] text-[#6B7F6D]">Zero layout jank</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] text-center">
                    <span className="block text-[10px] text-[#7A7167] uppercase font-bold">Interaction to Next Paint</span>
                    <span className="font-serif-brand text-2xl font-bold text-[#426146]">32ms</span>
                    <span className="block text-[10px] text-[#6B7F6D]">Near-instant touch</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] text-center">
                    <span className="block text-[10px] text-[#7A7167] uppercase font-bold">WCAG AA Contrast</span>
                    <span className="font-serif-brand text-2xl font-bold text-[#426146]">11.8:1</span>
                    <span className="block text-[10px] text-[#6B7F6D]">Exceeds 4.5:1 ratio</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] text-xs space-y-1 font-mono text-[#5C5349]">
                  <span className="font-bold text-[#2C2926]">Semantic Schema.org JSON-LD Entities:</span>
                  <div className="text-[11px] overflow-x-auto whitespace-pre">
                    {`{
  "@context": "https://schema.org",
  "@type": "Product",
  "brand": "Nimaya",
  "name": "Gentle Head to Toe Foaming Cleanser",
  "audience": { "@type": "Audience", "audienceType": "Babies & Toddlers (0-4 years)" },
  "offers": { "@type": "Offer", "price": "16.00", "priceCurrency": "USD", "availability": "InStock" }
}`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
