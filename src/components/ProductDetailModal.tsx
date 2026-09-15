import { useEffect, useState } from 'react';
import { X, Star, Check, ChevronDown, ChevronLeft, ChevronRight, Droplets, Leaf, Sparkles, ListChecks, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { REVIEWS } from '../data/products';
import { formatINR } from '../utils/format';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, purchaseType: 'one-time' | 'subscribe') => void;
}

type Tab = 'overview' | 'usage' | 'reviews' | 'faq';
type Frequency = 30 | 60 | 90;

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscribe'>('one-time');
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [showIngredients, setShowIngredients] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    setActiveTab('overview'); setActiveImage(0); setQuantity(1); setPurchaseType('one-time');
    setFrequency(null); setShowIngredients(false); setReviewIndex(0);
  }, [product?.id]);

  if (!product) return null;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const subscriptionPrice = Math.round(product.price * 0.9);
  const currentPrice = purchaseType === 'subscribe' ? subscriptionPrice : product.price;
  const topIngredients = product.ingredients.slice(0, 3);
  const topBenefits = product.keyBenefits.slice(0, 3);
  const review = REVIEWS[reviewIndex % REVIEWS.length];

  const galleryLabels = [
    { title: 'Product', sub: product.size },
    { title: 'Ingredients + benefits', sub: 'Simple, clear care' },
    { title: 'How to use', sub: 'Simple steps' },
    { title: 'Terms & conditions', sub: 'Care & safety' },
  ];

  const handleAdd = () => {
    if (purchaseType === 'subscribe' && !frequency) return;
    onAddToCart(product, quantity, purchaseType);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  const GalleryVisual = ({ index, thumb = false }: { index: number; thumb?: boolean }) => {
    if (index === 0) return <img src={product.image} alt={product.name} className="w-full h-full object-contain" />;
    if (index === 1) return (
      <div className="w-full h-full bg-[#DDEED8] flex flex-col justify-center p-5">
        {!thumb && <p className="font-serif-brand text-xl text-[#214832] mb-4 text-center">Key Ingredients + Benefits</p>}
        <div className={`grid ${thumb ? 'grid-cols-1 gap-1' : 'grid-cols-3 gap-2'}`}>
          {topIngredients.map((ing) => (
            <div key={ing.name} className={`bg-white rounded-xl ${thumb ? 'p-1' : 'p-3'} text-center border border-[#C9DEC4]`}>
              {!thumb && <div className="mx-auto mb-2 w-8 h-8 rounded-full bg-[#CFE4C9] flex items-center justify-center"><Sparkles className="w-4 h-4 text-[#31533C]" /></div>}
              <p className={`${thumb ? 'text-[6px]' : 'text-[11px]'} font-semibold text-[#284633] line-clamp-2`}>{ing.name}</p>
              {!thumb && <p className="text-[10px] text-[#596B5C] mt-1 line-clamp-3">{ing.purpose}</p>}
            </div>
          ))}
        </div>
      </div>
    );
    if (index === 2) return (
      <div className="w-full h-full bg-[#E5F2E7] flex flex-col justify-center p-5">
        {!thumb && <div className="text-center mb-4"><ListChecks className="w-8 h-8 mx-auto text-[#356044] mb-2"/><p className="font-serif-brand text-xl text-[#214832]">How to Use</p></div>}
        <div className="space-y-2">{product.usageDirections.slice(0, thumb ? 3 : 4).map((step,i)=><div key={step} className={`flex items-start ${thumb ? 'gap-1' : 'gap-2'} bg-white/90 rounded-xl ${thumb ? 'p-1' : 'p-2.5'} border border-[#CFE2D1]`}><span className={`${thumb ? 'w-3 h-3 text-[6px]' : 'w-6 h-6 text-[10px]'} shrink-0 rounded-full bg-[#4F7759] text-white flex items-center justify-center font-bold`}>{i+1}</span><p className={`${thumb ? 'text-[5px]' : 'text-[10px]'} text-[#526658] leading-snug line-clamp-2`}>{step}</p></div>)}</div>
      </div>
    );
    return (
      <div className="w-full h-full bg-[#FFF4E9] flex flex-col justify-center p-5 text-center">
        <ShieldCheck className={`${thumb ? 'w-6 h-6 mb-1' : 'w-10 h-10 mb-3'} mx-auto text-[#9A6446]`} />
        <p className={`${thumb ? 'text-[7px]' : 'text-xl'} font-serif-brand text-[#6E452D]`}>Terms & Conditions</p>
        {!thumb && <><p className="text-[10px] text-[#7B6658] mt-3 leading-relaxed max-w-sm mx-auto">{product.precautions}</p><div className="mt-4 rounded-xl bg-white/80 border border-[#EFD9C7] p-3"><p className="text-[10px] font-semibold text-[#76513B]">Please follow the product directions and age guidance shown on this page.</p></div></>}
      </div>
    );
  };

  return (
    <div className="nimaya-pdp-overlay fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-[#243128]/55 backdrop-blur-sm">
      <div className="nimaya-pdp-modal relative w-full max-w-6xl bg-[#FFFDF7] rounded-[28px] border border-[#D8E6D3] shadow-2xl overflow-hidden max-h-[94vh] flex flex-col" role="dialog" aria-modal="true" aria-labelledby="modal-pdp-title">
        <button onClick={onClose} className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/95 hover:bg-[#EDF2EA] text-[#294735] border border-[#DCE5D8] shadow-sm" aria-label="Close details"><X className="w-5 h-5" /></button>

        <div className="nimaya-pdp-scroll overflow-y-auto flex-1 p-4 sm:p-7 lg:p-9 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-10 items-start">
            <div>
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                  {galleryLabels.map((item, idx) => (
                    <button key={item.title} onClick={() => setActiveImage(idx)} className={`shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden border-2 bg-[#F7F4EE] transition-all ${activeImage === idx ? 'border-[#31533C] shadow-sm' : 'border-[#E5E4DC] hover:border-[#9FB19D]'}`} aria-label={`View ${item.title}`}><GalleryVisual index={idx} thumb /></button>
                  ))}
                </div>
                <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden border border-[#E0E7DC] bg-[#F1F7ED] min-h-[310px] sm:min-h-0">
                  <GalleryVisual index={activeImage} />
                  {discountPercent > 0 && <span style={{ backgroundColor: '#FFF7F2', color: '#8A5947', borderColor: '#F1DCD2' }} className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold border">{discountPercent}% OFF</span>}
                  <span className="absolute top-4 right-4 max-w-[58%] px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-[#31533C] border border-[#DDE7DA] truncate">{galleryLabels[activeImage].title}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-xl bg-[#F6F3ED] border border-[#E8E4DB] p-2.5"><span className="block text-[9px] uppercase tracking-wider text-[#8A8177]">Texture</span><span className="text-xs font-semibold text-[#304437] line-clamp-1">{product.texture}</span></div>
                <div className="rounded-xl bg-[#EAF1E7] border border-[#DCE7D8] p-2.5"><span className="block text-[9px] uppercase tracking-wider text-[#71806F]">Age guidance</span><span className="text-xs font-semibold text-[#304437] line-clamp-1">{product.ageGuidance}</span></div>
              </div>
            </div>

            <div className="space-y-4 pr-0 lg:pr-4 rounded-[28px] bg-[#FFF5E8] border border-[#F1D8BE] p-5 sm:p-6 shadow-[0_12px_35px_rgba(91,75,53,0.08)]">
              <div className="flex flex-wrap items-center gap-2 pr-12">
                <span className="text-[11px] font-semibold text-[#31533C] bg-[#E7EFE4] px-2.5 py-1 rounded-full">{product.category}</span>
                <span className="flex items-center gap-1 text-xs text-[#6F6A62]"><Star className="w-3.5 h-3.5 fill-[#B98D55] text-[#B98D55]"/><b className="text-[#294735]">{product.rating}</b> ({product.reviewCount})</span>
              </div>
              <div><h2 id="modal-pdp-title" className="font-serif-brand text-3xl sm:text-4xl text-[#274634] font-medium leading-tight">{product.name}</h2><p className="font-serif-brand italic text-[#71806F] mt-1">“{product.tagline}”</p></div>
              <p className="text-sm text-[#5F5A53] leading-relaxed">{product.shortDescription}</p>

              <div className="grid grid-cols-3 gap-2">
                {topBenefits.map((benefit) => <div key={benefit} className="rounded-xl bg-[#E3F1DD] border border-[#BED6B7] p-2.5 text-center shadow-sm"><Check className="w-4 h-4 text-[#31533C] mx-auto mb-1"/><p className="text-[10px] leading-snug text-[#5F675F] line-clamp-3">{benefit}</p></div>)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button onClick={() => { setPurchaseType('one-time'); setFrequency(null); }} className={`p-3.5 rounded-2xl border text-left transition-all ${purchaseType === 'one-time' ? 'border-[#C97C5D] bg-[#FFE7D6] ring-1 ring-[#C97C5D] shadow-sm' : 'border-[#E8C7B3] bg-[#FFF0E4] hover:bg-[#FFE8D8]'}`}>
                  <p className="text-xs font-bold text-[#2E4034]">One-Time Purchase</p><div className="flex items-baseline gap-2 mt-1"><span className="font-serif-brand text-xl font-bold text-[#274634]">{formatINR(product.price)}</span>{product.originalPrice && <span className="text-xs line-through text-[#999086]">{formatINR(product.originalPrice)}</span>}</div>
                </button>
                <button onClick={() => setPurchaseType('subscribe')} className={`relative p-3.5 rounded-2xl border text-left transition-all bg-[#D4E8C9] hover:bg-[#C8E0BC] ${purchaseType === 'subscribe' ? 'border-[#5E8A63] ring-1 ring-[#5E8A63] shadow-sm' : 'border-[#AAC8A6]'}`}>
                  <span className="absolute -top-2 right-2 text-[9px] font-bold bg-[#F4B184] text-[#5A321F] border border-[#E99A68] px-2 py-1 rounded-full shadow-sm">SAVE 10%</span><p className="text-xs font-bold text-[#274634]">Subscribe & Save 10%</p><p className="font-serif-brand text-xl font-bold text-[#274634] mt-1">{formatINR(subscriptionPrice)} <span className="text-[10px] font-sans font-normal">/ delivery</span></p>
                </button>
              </div>

              {purchaseType === 'subscribe' && <div className="rounded-2xl bg-[#F1F6EE] border border-[#D7E4D2] p-3.5"><p className="text-xs font-bold text-[#31533C] mb-2">Choose delivery frequency</p><div className="flex flex-wrap gap-2">{([30,60,90] as Frequency[]).map(days => <button key={days} onClick={() => setFrequency(days)} className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition ${frequency === days ? 'bg-[#31533C] border-[#31533C] text-white' : 'bg-white border-[#CAD8C7] text-[#48604A]'}`}>Every {days} days</button>)}</div><p className="text-[10px] text-[#738071] mt-2">Skip, pause or cancel anytime.</p></div>}

              <div className="nimaya-pdp-buyrow flex items-center gap-3 pt-1"><div className="nimaya-pdp-qty flex items-center border border-[#E4BFA8] rounded-xl bg-[#FFEBDD] overflow-hidden"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-3 hover:bg-[#FAD9C3]">−</button><span className="px-3 text-xs font-bold">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="px-3 py-3 hover:bg-[#FAD9C3]">+</button></div><button onClick={handleAdd} disabled={purchaseType === 'subscribe' && !frequency} className="nimaya-pdp-add flex-1 py-3.5 px-5 rounded-xl bg-[#BFDDB8] hover:bg-[#A9D0A2] disabled:bg-[#F2F3F0] text-[#244B31] disabled:text-[#9AA29A] border border-[#8FB58D] text-sm font-bold shadow-md transition hover:-translate-y-0.5">{addedNotice ? 'Added to Gentle Routine ✓' : purchaseType === 'subscribe' && !frequency ? 'Choose delivery frequency' : `Add to Gentle Routine — ${formatINR(currentPrice * quantity)}`}</button></div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#6F776F]"><span>✓ Secure checkout</span><span>✓ Gentle-care support</span><span>✓ Easy routine ordering</span></div>
            </div>
          </div>

          <div className="mt-9 border-t border-[#E1E7DD] pt-6">
            <div className="flex flex-wrap gap-2">{([['overview','Overview'],['usage','How to Use'],['reviews','Parent Reviews'],['faq','FAQs']] as [Tab,string][]).map(([key,label]) => <button key={key} onClick={() => setActiveTab(key)} className={`px-4 py-2 rounded-full text-xs font-semibold ${activeTab === key ? 'bg-[#274634] text-white' : 'bg-[#F3F3ED] text-[#59645B] hover:bg-[#E8ECE4]'}`}>{label}</button>)}</div>

            {activeTab === 'overview' && <div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-4"><div className="rounded-2xl bg-[#F0F7EC] border border-[#D8E8D3] p-5"><h3 className="font-serif-brand text-xl text-[#274634]">Why Parents Love It</h3><div className="space-y-2 mt-3">{topBenefits.map(b => <div key={b} className="flex gap-2 text-xs text-[#596159]"><Check className="w-4 h-4 text-[#31533C] shrink-0"/><span>{b}</span></div>)}</div></div><div className="rounded-2xl bg-[#E0F0DB] border border-[#CDE3C7] p-5"><h3 className="font-serif-brand text-xl text-[#274634]">Key Ingredients</h3><p className="text-xs text-[#657064] mt-1">The essentials, kept simple.</p><div className="flex flex-wrap gap-2 mt-3">{topIngredients.map(i => <span key={i.name} className="bg-white/80 border border-white rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#3D5B45]">{i.name}</span>)}</div><button onClick={() => setShowIngredients(!showIngredients)} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#31533C]">View full ingredient list <ChevronDown className={`w-3.5 h-3.5 transition ${showIngredients ? 'rotate-180' : ''}`}/></button></div>{showIngredients && <div className="lg:col-span-2 rounded-2xl border border-[#E3E5DE] overflow-hidden bg-white">{product.ingredients.map(ing => <div key={ing.name} className="p-3.5 border-b last:border-b-0 border-[#ECEDE8]"><p className="text-xs font-bold text-[#304437]">{ing.name}</p><p className="text-[11px] text-[#6D716B] mt-0.5">{ing.purpose}</p></div>)}</div>}</div>}

            {activeTab === 'usage' && <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">{product.usageDirections.map((step,i) => <div key={step} className="rounded-2xl border border-[#E3E5DE] bg-[#FBFAF6] p-4 flex gap-3"><span className="w-7 h-7 rounded-full bg-[#31533C] text-white text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span><p className="text-xs leading-relaxed text-[#5D625C]">{step}</p></div>)}<div className="sm:col-span-2 rounded-2xl bg-[#F8EFE7] border border-[#EDDED1] p-4"><p className="text-xs font-bold text-[#775A46]">Please note</p><p className="text-xs text-[#6C5F55] mt-1">{product.precautions}</p></div></div>}

            {activeTab === 'reviews' && <div className="pt-5"><div className="max-w-2xl rounded-3xl bg-[#F5F6F0] border border-[#E0E6DC] p-5 sm:p-6"><div className="flex justify-between gap-4"><div><div className="flex gap-1 text-[#B98D55]">{Array.from({length: review.rating}).map((_,i)=><Star key={i} className="w-4 h-4 fill-current"/>)}</div><h3 className="font-serif-brand text-xl text-[#274634] mt-2">{review.title}</h3></div><span className="text-[10px] text-[#7A8179]">{review.date}</span></div><p className="text-sm text-[#5C625C] leading-relaxed mt-3">“{review.comment}”</p><div className="flex items-center justify-between mt-4"><div><p className="text-xs font-bold text-[#304437]">{review.author}</p><p className="text-[10px] text-[#788078]">{review.childAge}{review.verified ? ' • Verified parent' : ''}</p></div><div className="flex gap-2"><button onClick={() => setReviewIndex((reviewIndex - 1 + REVIEWS.length) % REVIEWS.length)} className="p-2 rounded-full border border-[#D6DDD3] bg-white"><ChevronLeft className="w-4 h-4"/></button><button onClick={() => setReviewIndex((reviewIndex + 1) % REVIEWS.length)} className="p-2 rounded-full border border-[#D6DDD3] bg-white"><ChevronRight className="w-4 h-4"/></button></div></div></div></div>}

            {activeTab === 'faq' && <div className="pt-5 space-y-2 max-w-3xl"><details className="group rounded-2xl bg-[#F8F7F2] border border-[#E4E5DF] p-4"><summary className="cursor-pointer text-xs font-bold text-[#304437]">Who is this product suitable for?</summary><p className="text-xs text-[#687068] mt-2">{product.ageGuidance}. Follow the usage directions and precautions shown on this page.</p></details><details className="group rounded-2xl bg-[#F8F7F2] border border-[#E4E5DF] p-4"><summary className="cursor-pointer text-xs font-bold text-[#304437]">How does Subscribe & Save work?</summary><p className="text-xs text-[#687068] mt-2">Choose delivery every 30, 60 or 90 days and receive 10% off the current product price for each scheduled delivery. The interface allows the routine to be selected before adding it to cart.</p></details><details className="group rounded-2xl bg-[#F8F7F2] border border-[#E4E5DF] p-4"><summary className="cursor-pointer text-xs font-bold text-[#304437]">Where can I see the complete ingredient list?</summary><p className="text-xs text-[#687068] mt-2">Open Overview and select “View full ingredient list” to see all ingredients already stored for this product.</p></details></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
