import { useState, FormEvent } from 'react';
import { X, Check, ShieldCheck, Lock, Heart, ArrowLeft, Package, Sparkles, MapPin, Loader2, Navigation, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';
import { CartItem } from '../types';
import { formatINR } from '../utils/format';
import { fetchLocationByPostalCode } from '../utils/locationLookup';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  freeSampleId: string;
  onOrderComplete: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  freeSampleId,
  onOrderComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [childAge, setChildAge] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [detectedLocationInfo, setDetectedLocationInfo] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [paymentOption, setPaymentOption] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleZipChange = async (newZip: string) => {
    setZip(newZip);
    setLocationError(null);
    const clean = newZip.replace(/\D/g, '');
    if (clean.length === 6) {
      setIsFetchingLocation(true);
      try {
        const loc = await fetchLocationByPostalCode(clean);
        if (loc) {
          setCity(loc.city);
          if (loc.state) setState(loc.state);
          const areaNote = loc.area ? ` (${loc.area})` : '';
          setDetectedLocationInfo(`${loc.city}, ${loc.state}${areaNote}`);
        } else {
          setDetectedLocationInfo(null);
          setLocationError('Postal code not found. You can enter City & State manually.');
        }
      } catch {
        setDetectedLocationInfo(null);
      } finally {
        setIsFetchingLocation(false);
      }
    } else {
      setDetectedLocationInfo(null);
    }
  };

  const handleDetectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setIsFetchingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const postcode = addr.postcode ? addr.postcode.replace(/\D/g, '') : '';
            const detectedCity = addr.city || addr.town || addr.village || addr.county || addr.state_district || 'Bengaluru';
            const detectedState = addr.state || 'Karnataka';

            if (postcode && postcode.length === 6) {
              setZip(postcode);
              setCity(detectedCity);
              setState(detectedState);
              setDetectedLocationInfo(`${detectedCity}, ${detectedState}`);
            } else {
              setCity(detectedCity);
              setState(detectedState);
              setDetectedLocationInfo(`${detectedCity}, ${detectedState}`);
            }
          }
        } catch {
          setZip('560038');
          setCity('Bengaluru');
          setState('Karnataka');
          setDetectedLocationInfo('Bengaluru, Karnataka');
        } finally {
          setIsFetchingLocation(false);
        }
      },
      () => {
        setIsFetchingLocation(false);
        setLocationError('Could not access current location. Please enter 6-digit PIN code.');
      },
      { timeout: 6000 }
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.purchaseType === 'subscribe' ? Math.round(item.product.price * 0.9) : item.product.price) * item.quantity,
    0
  );
  const shippingFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shippingFee;

  const sampleNames: Record<string, string> = {
    sponge: 'Organic Konjac Newborn Bath Sponge',
    'travel-wipes': 'Travel Mini Pure Water Wipes (20ct)',
  };

  const handleSubmitDetails = (e: FormEvent) => {
    e.preventDefault();
    if (
      !parentName.trim() ||
      !email.trim() ||
      !childAge.trim() ||
      !address.trim() ||
      !zip.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      setFormError('Please fill in all mandatory fields marked with an asterisk (*) to proceed to payment.');
      return;
    }
    const cleanZip = zip.replace(/\D/g, '');
    if (cleanZip.length !== 6) {
      setFormError('Please enter a valid 6-digit PIN / Postal Code.');
      return;
    }
    setFormError(null);
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onOrderComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#2C2926]/50 backdrop-blur-xs text-left">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E6DDD2] shadow-2xl overflow-hidden my-auto p-6 sm:p-8 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        {/* Close Button */}
        {step !== 'success' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#524B43] border border-[#E8DFD5] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Step 1: Parent & Little One Details */}
        {step === 'details' && (
          <form onSubmit={handleSubmitDetails} className="space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7F6D] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Conversion Step 1 of 2</span>
              </div>
              <h2 id="checkout-modal-title" className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
                Gentle Care Delivery
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs mt-1">
                <p className="text-[#6B635A]">
                  Where should we send your tamper-sealed, pediatrician-approved baby care parcel?
                </p>
                <span className="text-[11px] font-medium text-[#736B62] shrink-0">
                  <span className="text-[#D94F3D] font-bold">*</span> Mandatory fields
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    Parent’s Full Name <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={parentName}
                    onChange={(e) => {
                      setParentName(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    Email Address <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ananya@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    Little One’s Age or Due Date <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 Months or Due Nov 2026"
                    value={childAge}
                    onChange={(e) => {
                      setChildAge(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                    Street Address <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Apartment, Street name"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                  />
                </div>
              </div>

              {/* Location & PIN Code (Auto-fetch) */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* PIN Code with auto-fetch */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-[#4A443E]">
                        PIN / Postal Code <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleDetectCurrentLocation}
                        className="text-[10px] text-[#6B7F6D] hover:text-[#2B4436] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                        title="Auto-detect using device GPS"
                      >
                        <Navigation className="w-2.5 h-2.5" />
                        <span>Detect GPS</span>
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 560038"
                        value={zip}
                        onChange={(e) => {
                          handleZipChange(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs font-mono text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                      />
                      {isFetchingLocation && (
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#6B7F6D]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* City (Auto-populated) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                      City <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="e.g. Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                    />
                  </div>

                  {/* State (Auto-populated) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4A443E] mb-1">
                      State <span className="text-[#D94F3D] font-bold ml-0.5" title="Required field">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="e.g. Karnataka"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC3] bg-[#FAF8F5] text-xs text-[#2C2926] focus:outline-hidden focus:ring-1 focus:ring-[#6B7F6D]"
                    />
                  </div>
                </div>

                {/* Auto-detected notification banner */}
                {detectedLocationInfo && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#EBF2ED] text-[#2B4436] text-[11px] font-medium border border-[#D2E2D6] animate-fadeIn">
                    <MapPin className="w-3.5 h-3.5 text-[#2B4436] shrink-0" />
                    <span>Auto-fetched location: <strong>{detectedLocationInfo}</strong></span>
                  </div>
                )}

                {locationError && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFF3EE] text-[#9A4628] text-[11px] font-medium border border-[#F5D5C6] animate-fadeIn">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{locationError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Free Sample Reminder */}
            <div className="p-3.5 rounded-2xl bg-[#FFF8F3] border border-[#F3DFD2] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#5E5144]">
                <Heart className="w-4 h-4 text-[#C49E85]" />
                <span>Complimentary gift included: <strong>{sampleNames[freeSampleId] || 'Newborn Konjac Sponge'}</strong></span>
              </div>
              <span className="font-bold text-[#C49E85] text-[10px] uppercase">Free</span>
            </div>

            {/* Validation Error Banner */}
            {formError && (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFF1F0] text-[#B83A2C] border border-[#FCD2CF] text-xs font-medium animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#D94F3D]" />
                <span>{formError}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between border-t border-[#EAE3D9]">
              <div className="text-xs text-[#7A7167]">
                Total: <strong className="text-sm font-serif-brand text-[#2C2926]">{formatINR(total)}</strong>
              </div>
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs sm:text-sm font-semibold cursor-pointer shadow-sm"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment & Reassurance */}
        {step === 'payment' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7F6D] mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Secure 256-Bit Encrypted Payment</span>
              </div>
              <h2 className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
                Review & Confirm Order
              </h2>
              <p className="text-xs text-[#6B635A] mt-1">
                Delivering to {parentName} at {address}, {city}, {state} - {zip}
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold text-[#4A443E]">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentOption('upi')}
                  className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all ${
                    paymentOption === 'upi'
                      ? 'border-[#2C2926] bg-[#FAF8F5] ring-1 ring-[#2C2926]'
                      : 'border-[#E8DFD5] bg-white hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#2C2926]">UPI / Google Pay / PhonePe</div>
                  <div className="text-[10px] text-[#7A7167] mt-0.5">Instant QR or VPA</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentOption('card')}
                  className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all ${
                    paymentOption === 'card'
                      ? 'border-[#2C2926] bg-[#FAF8F5] ring-1 ring-[#2C2926]'
                      : 'border-[#E8DFD5] bg-white hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#2C2926]">Credit or Debit Card / Net Banking</div>
                  <div className="text-[10px] text-[#7A7167] mt-0.5">RuPay, Visa, Mastercard</div>
                </button>
              </div>
            </div>

            {/* Mini Order Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] space-y-2 text-xs">
              <div className="font-semibold text-[#2C2926] mb-1">Items in this Gentle Delivery:</div>
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between text-[#595045]">
                  <span>{item.quantity}x {item.product.name} ({item.product.size})</span>
                  <span className="font-medium">{formatINR(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between text-[#C49E85]">
                <span>1x {sampleNames[freeSampleId] || 'Complimentary Gift'}</span>
                <span className="font-semibold">₹0 (Free)</span>
              </div>
              <div className="pt-2 border-t border-[#EAE3D9] flex justify-between font-bold text-[#2C2926] text-sm">
                <span>Final Billed Amount</span>
                <span className="font-serif-brand text-base">{formatINR(total)}</span>
              </div>
            </div>

            {/* Reassurance Checklist */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#635A50]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6B7F6D]" />
                <span>30-day gentle refund guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#6B7F6D]" />
                <span>Sealed tamper-proof hygiene cap</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between border-t border-[#EAE3D9]">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A7167] hover:text-[#2C2926] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Edit Details
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteOrder}
                className="px-8 py-3.5 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Securing your order...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize & Place Order — {formatINR(total)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 'success' && (
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="flex justify-center mb-2">
              <Logo layout="vertical" size="sm" showTagline={true} />
            </div>

            <div className="w-14 h-14 rounded-full bg-[#EAF0EB] text-[#486B4C] flex items-center justify-center mx-auto shadow-xs border border-[#D5E1D6]">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6B7F6D]">
                Order Confirmed • #NM-2026-8891
              </span>
              <h2 className="font-serif-brand text-2xl sm:text-3xl text-[#2C2926]">
                Thank you, {parentName}!
              </h2>
              <p className="text-sm text-[#5C534A] max-w-md mx-auto leading-relaxed">
                Your gentle routine parcel is being carefully packed in sealed tamper-proof packaging. We’ve sent your confirmation and tracking link to <strong>{email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between text-[#6B635A]">
                <span>Estimated Arrival:</span>
                <strong className="text-[#2C2926]">2–3 Business Days (Carbon-Neutral)</strong>
              </div>
              <div className="flex justify-between text-[#6B635A]">
                <span>Care Recipient:</span>
                <strong className="text-[#2C2926]">{childAge} Little One</strong>
              </div>
              <div className="flex justify-between text-[#6B635A]">
                <span>Complimentary Inclusion:</span>
                <strong className="text-[#C49E85]">{sampleNames[freeSampleId] || 'Newborn Konjac Sponge'}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF8F3] border border-[#F3DFD2] max-w-md mx-auto">
              <p className="font-serif-brand italic text-xs text-[#6E5B4B]">
                &ldquo;To keep everyday baby care gentle, simple and transparent, so you can spend less time worrying about choices and more time enjoying the little moments.&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#2C2926] hover:bg-[#433D38] text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                Back to Nimaya Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
