export type ScreenView = 'home' | 'collection' | 'about' | 'faq' | 'brand-pack';

export interface Ingredient {
  name: string;
  inci: string;
  purpose: string;
  source: string;
  ewgScore: number; // 1 is green/safest
}

export interface Product {
  id: string;
  name: string;
  category: 'Bath & Cleansing' | 'Hair Care' | 'Sun Protection' | 'Daily Hygiene';
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  size: string;
  ageGuidance: string;
  ageBracket: '0-6m' | '6-12m' | '1-4y' | 'all';
  image: string;
  secondaryImage?: string;
  keyBenefits: string[];
  certifications: string[];
  ingredients: Ingredient[];
  usageDirections: string[];
  precautions: string;
  texture: string;
  scent: string;
  phLevel: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  purchaseType: 'one-time' | 'subscribe';
}

export interface Review {
  id: string;
  author: string;
  childAge: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  date: string;
}
