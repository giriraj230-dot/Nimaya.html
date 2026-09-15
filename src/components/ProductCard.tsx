import { Star, ShieldCheck, Eye, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/format';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct, onAddToCart }: ProductCardProps) {
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-[#EBE4DA] hover:border-[#D5C9BA] transition-all duration-300 hover:shadow-md overflow-hidden text-left">
      {/* Product Image Stage */}
      <div className="relative w-full aspect-square bg-[#FAF8F5] overflow-hidden p-6 flex items-center justify-center cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-[#F3EFEA]/90 backdrop-blur-xs text-[#524B43] border border-[#E3DBD0]">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF0EB] text-[#48604A] border border-[#D5E1D6]">
              {product.ageBracket === 'all' ? '0–4 Yrs' : '6m+ Safe'}
            </span>
            {discountPercent > 0 && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#8C3C2A] text-white shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Generated Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick View Floating Action */}
        <button
          id={`quick-view-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2C2926]/85 backdrop-blur-xs text-white text-xs font-medium cursor-pointer shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          View Safety & Ingredients
        </button>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating and Reviews */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A7167]">
            <div className="flex items-center text-[#C49E85]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#2C2926]">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif-brand text-lg font-medium text-[#2C2926] hover:text-[#5C554D] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="text-xs text-[#6B635A] line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Transparency Feature Pill */}
        <div className="pt-2 border-t border-[#F2ECE4] flex items-center gap-1.5 text-[11px] text-[#546856]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6B7F6D] shrink-0" />
          <span className="truncate font-medium">
            {product.ingredients.slice(0, 2).map((ing) => ing.name).join(' • ')}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-lg font-bold font-serif-brand text-[#2C2926]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="line-through text-xs text-[#8C8377] font-medium">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-[11px] font-bold text-[#8C3C2A]">
                  ({discountPercent}% off)
                </span>
              )}
            </div>
            <span className="block text-[10px] text-[#8C8377] mt-0.5">{product.size}</span>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#2C2926] text-[#2C2926] hover:text-[#FAF8F5] border border-[#DDD3C7] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
