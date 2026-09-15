import { useState } from 'react';
import { Gift, Check, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/format';

interface BundleBuilderProps {
  products: Product[];
  onAddBundleToCart: (products: Product[]) => void;
}

export function BundleBuilder({ products, onAddBundleToCart }: BundleBuilderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(products.map(p => p.id));
  const [addedNotice, setAddedNotice] = useState(false);

  const toggleProduct = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const subtotal = selectedProducts.reduce((acc, curr) => acc + curr.price, 0);
  const discountRate = selectedProducts.length === 4 ? 0.15 : 0.10;
  const bundleSavings = Math.round(subtotal * discountRate);
  const finalPrice = subtotal - bundleSavings;

  const handleAddBundle = () => {
    onAddBundleToCart(selectedProducts);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <section className="my-12 py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F0E8] via-[#FAF7F2] to-[#F2EDE5] rounded-3xl border border-[#E6DDD2] max-w-6xl mx-auto shadow-sm text-left">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3DBD0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF0EB] text-[#425E45] border border-[#D5E1D6] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#6B7F6D]" />
              Parent’s Favorite Routine Set
            </div>
            <h3 className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
              Build Your Complete Gentle Routine
            </h3>
            <p className="text-xs sm:text-sm text-[#665D54] mt-1">
              Bundle 3 or more essentials for up to <strong>15% off</strong> + get a Free Organic Bamboo Bath Cloth.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#E8DFD5] shrink-0">
            <div className="text-right">
              <span className="line-through text-xs text-[#8C8377] mr-2">
                {formatINR(subtotal)}
              </span>
              <span className="font-serif-brand text-2xl font-bold text-[#2C2926]">
                {formatINR(finalPrice)}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#6B7F6D]">
              You save {formatINR(bundleSavings)} ({Math.round(discountRate * 100)}% off)
            </span>
          </div>
        </div>

        {/* 4 Items Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6">
          {products.map((prod) => {
            const isChecked = selectedIds.includes(prod.id);
            return (
              <div
                key={prod.id}
                onClick={() => toggleProduct(prod.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isChecked
                    ? 'bg-white border-[#6B7F6D] ring-1 ring-[#6B7F6D]/50 shadow-xs'
                    : 'bg-white/50 border-[#E8DFD5] opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain rounded-xl bg-[#FAF8F5] p-1 border border-[#EFE9E1]"
                  />
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isChecked ? 'bg-[#6B7F6D] border-[#6B7F6D] text-white' : 'border-[#C8BFB4] bg-white'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold text-[#2C2926] line-clamp-1">{prod.name}</div>
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
            );
          })}
        </div>

        {/* Free Gift Notification */}
        <div className="mt-6 p-3.5 rounded-2xl bg-[#FFF8F3] border border-[#F3DFD2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF0E7] text-[#C49E85] flex items-center justify-center shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#2C2926]">Bonus Gift Included: </span>
              <span className="text-xs text-[#5F5448]">100% Organic Bamboo Cloud Washcloth (₹249 value)</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#C49E85] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-[#EED7CB]">
            Free
          </span>
        </div>

        {/* Add Bundle CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#6B635A]">
            <ShieldCheck className="w-4 h-4 text-[#6B7F6D]" />
            <span>Delivered in tamper-sealed, 100% recyclable shipping box.</span>
          </div>

          <button
            id="bundle-add-to-cart-btn"
            type="button"
            onClick={handleAddBundle}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-[#FAF8F5] text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            {addedNotice ? (
              <>
                <Check className="w-4 h-4 text-[#A8D5AE]" />
                <span>Bundle Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add {selectedProducts.length} Essentials to Bag — {formatINR(finalPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
