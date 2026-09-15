import { useState } from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, Gift, Check, Package, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (freeSample: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [selectedSample, setSelectedSample] = useState<string>('sponge');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 499;
  const SHIPPING_FEE = 49;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.purchaseType === 'subscribe' ? Math.round(item.product.price * 0.9) : item.product.price) * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const samples = [
    { id: 'sponge', name: 'Organic Konjac Newborn Bath Sponge', value: '₹199 Free' },
    { id: 'travel-wipes', name: 'Travel Mini Pure Water Wipes (20ct)', value: '₹149 Free' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C2926]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E6DDD2] shadow-2xl flex flex-col text-left">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <span className="font-serif-brand text-xl text-[#2C2926]">Your Gentle Bag</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EAE3D9] text-[#524B43]">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EAE3D9] text-[#524B43] cursor-pointer transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-[#F5EFE7] border-b border-[#EAE3D9] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              {remainingForFreeShipping > 0 ? (
                <span className="text-[#594E42]">
                  Add <strong className="text-[#2C2926]">{formatINR(remainingForFreeShipping)}</strong> more for <strong>Free Carbon-Neutral Shipping</strong>
                </span>
              ) : (
                <span className="font-semibold text-[#426146] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#6B7F6D]" />
                  You unlocked Free Carbon-Neutral Shipping!
                </span>
              )}
              <span className="font-mono text-[11px] text-[#7A7167]">
                {formatINR(subtotal)} / {formatINR(FREE_SHIPPING_THRESHOLD)}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#E8DDD0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6B7F6D] transition-all duration-300 rounded-full"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#7A7167]">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8DFD5] flex items-center justify-center text-[#B0A699]">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif-brand text-lg text-[#2C2926]">Your bag is currently empty</h4>
                  <p className="text-xs text-[#7A7167] mt-1 max-w-xs">
                    Choose from our 4 pediatric-tested daily essentials to start your gentle routine.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs font-semibold cursor-pointer"
                >
                  Explore Essentials
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = item.purchaseType === 'subscribe' ? item.product.price * 0.9 : item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.purchaseType}`}
                    className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] flex gap-3.5 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-[#EFE9E1] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#2C2926] truncate">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#968D82] hover:text-[#B84A39] p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-[#786F64]">{item.product.size}</span>
                        {item.purchaseType === 'subscribe' && (
                          <span className="text-[9px] font-bold text-[#426146] bg-[#EAF0EB] px-1.5 py-0.5 rounded-sm">
                            Auto-Replenish (-10%)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity incrementer */}
                        <div className="flex items-center border border-[#DDD3C7] rounded-lg bg-white overflow-hidden text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 hover:bg-[#F3EFEA] font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-[#F3EFEA] font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif-brand font-bold text-sm text-[#2C2926]">
                          {formatINR(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Complimentary Free Sample for First-Time Parents */}
            {cartItems.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FFF8F3] border border-[#F3DFD2] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C2926]">
                    <Gift className="w-4 h-4 text-[#C49E85]" />
                    <span>Complimentary First-Time Parent Gift</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#C49E85] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#EED7CB]">
                    100% Free
                  </span>
                </div>
                <p className="text-[11px] text-[#695D52]">
                  Select one thoughtful addition to accompany your order:
                </p>

                <div className="space-y-1.5">
                  {samples.map((s) => (
                    <label
                      key={s.id}
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedSample === s.id
                          ? 'bg-white border-[#C49E85] text-[#2C2926] shadow-2xs'
                          : 'bg-white/50 border-[#EFE5DC] text-[#6B6156] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="free-sample"
                          checked={selectedSample === s.id}
                          onChange={() => setSelectedSample(s.id)}
                          className="accent-[#C49E85]"
                        />
                        <span className="font-medium text-[11px]">{s.name}</span>
                      </div>
                      <span className="text-[10px] text-[#C49E85] font-semibold">{s.value}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#EAE3D9] bg-[#FAF8F5] space-y-4">
              <div className="space-y-1.5 text-xs text-[#6B635A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C2926]">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon-Neutral Shipping</span>
                  <span>{remainingForFreeShipping === 0 ? <strong className="text-[#426146]">Free</strong> : formatINR(SHIPPING_FEE)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Complimentary Newborn Gift</span>
                  <span className="text-[#C49E85] font-semibold">Included (₹0)</span>
                </div>
                <div className="pt-2 border-t border-[#EAE3D9] flex justify-between text-sm font-bold text-[#2C2926]">
                  <span className="font-serif-brand text-base">Estimated Total</span>
                  <span className="font-serif-brand text-base">
                    {formatINR(subtotal + (remainingForFreeShipping === 0 ? 0 : SHIPPING_FEE))}
                  </span>
                </div>
              </div>

              {/* Conversion Reassurance */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A7167]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6B7F6D]" />
                <span>30-Day Gentleness Promise • Pediatrician Verified</span>
              </div>

              {/* Checkout Trigger */}
              <button
                id="cart-checkout-btn"
                type="button"
                onClick={() => onProceedToCheckout(selectedSample)}
                className="w-full py-3.5 px-6 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Gentle Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
