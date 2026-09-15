import { Product, Review } from '../types';
import cleanserImg from '../assets/images/prod_cleanser_v2_1789389968959.jpg';
import sunscreenImg from '../assets/images/prod_sunscreen_v2_1789390016266.jpg';
import shampooImg from '../assets/images/prod_shampoo_v2_1789390032446.jpg';
import wipesImg from '../assets/images/prod_wipes_clean_1789393422363.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'gentle-foaming-cleanser',
    name: 'Gentle Head to Toe Foaming Cleanser',
    category: 'Bath & Cleansing',
    tagline: 'Cleanses • Soothes • Nourishes',
    shortDescription: 'Ultra-mild cloud foam with colloidal oat and soothing chamomile to protect delicate skin and scalp from day one.',
    fullDescription: 'Crafted specifically for the tender acid mantle of newborns and toddlers. Our self-foaming pump creates a velvety cloud of foam that minimizes friction on delicate newborn skin. Formulated without sulfates, artificial fragrance, or harsh surfactants, it cleanses effortlessly while locking in natural hydration.',
    price: 600,
    originalPrice: 699,
    rating: 4.9,
    reviewCount: 142,
    size: '200 ml',
    ageGuidance: 'Safe from newborn (0+ Years)',
    ageBracket: 'all',
    image: cleanserImg,
    keyBenefits: [
      'Self-foaming pump requires zero lathering rubbing on delicate skin',
      'pH 5.5 balanced to protect the developing infant acid mantle',
      '100% tear-free clinical ophthalmologist tested',
      'Infused with oat lipids and soothing organic chamomile extract'
    ],
    certifications: [
      'Pediatrician Tested & Approved',
      'Clinical Tear-Free Verified',
      'EWG Verified™ Clean Standard',
      'pH 5.5 Balanced'
    ],
    ingredients: [
      {
        name: 'Purified Water',
        inci: 'Aqua',
        purpose: 'Solvent & hydrating base',
        source: 'Deionized triple-filtered water',
        ewgScore: 1
      },
      {
        name: 'Colloidal Oatmeal',
        inci: 'Avena Sativa Kernel Flour',
        purpose: 'Soothes itching, supports lipid moisture barrier',
        source: 'Organic whole oats',
        ewgScore: 1
      },
      {
        name: 'Organic Chamomile Extract',
        inci: 'Chamomilla Recutita Flower Extract',
        purpose: 'Calms redness and delicate scalp tension',
        source: 'Organic steam-distilled flower',
        ewgScore: 1
      },
      {
        name: 'Decyl Glucoside',
        inci: 'Decyl Glucoside',
        purpose: 'Non-stripping plant surfactant (creates micro foam)',
        source: 'Renewable coconut & corn glucose',
        ewgScore: 1
      },
      {
        name: 'Vegetable Glycerin',
        inci: 'Glycerin',
        purpose: 'Humectant that binds moisture into baby skin',
        source: 'Plant-derived non-GMO rapeseed',
        ewgScore: 1
      },
      {
        name: 'Sodium Levulinate',
        inci: 'Sodium Levulinate',
        purpose: 'Gentle food-grade preservation against microbes',
        source: 'Corn-derived organic acid',
        ewgScore: 1
      }
    ],
    usageDirections: [
      'Wet baby’s skin and scalp with lukewarm water.',
      'Pump 1–2 clouds of foam directly into clean hands or a soft organic washcloth.',
      'Smooth softly over scalp and body with gentle circular sweeps—no scrubbing needed.',
      'Rinse thoroughly with warm water and gently pat dry with a soft towel.'
    ],
    precautions: 'For external use only. While formulation is certified tear-free, avoid direct contact with open eyes. If irritation occurs, rinse with clean water and consult your pediatrician.',
    texture: 'Featherlight cloud foam',
    scent: '100% Fragrance-Free (natural subtle oat scent)',
    phLevel: '5.5 (Acid-mantle protective)',
    inStock: true
  },
  {
    id: 'baby-mineral-sunscreen',
    name: 'Baby Sunscreen SPF 50 PA+++',
    category: 'Sun Protection',
    tagline: 'Gentle Protection for Sunny Adventures',
    shortDescription: 'Broad spectrum SPF 50 PA+++ mineral shield made with non-nano zinc oxide that blends effortlessly with zero ghost-cast.',
    fullDescription: 'Shield your little adventurer without synthetic chemical UV blockers. Our non-nano zinc oxide formula forms a protective physical blanket on top of skin that immediately deflects solar rays. Enriched with botanical squalane, shea butter, and calendula to soothe wind-blown or sun-exposed cheeks.',
    price: 430,
    originalPrice: 500,
    rating: 4.8,
    reviewCount: 98,
    size: '75 ml',
    ageGuidance: 'Ideal for 6+ Months to 4+ years',
    ageBracket: '6-12m',
    image: sunscreenImg,
    keyBenefits: [
      '100% Non-nano zinc oxide physical filter (no oxybenzone or avobenzone)',
      'Broad Spectrum SPF 50 with UVA/UVB PA+++ defense',
      'Water resistant for up to 80 minutes of splash time',
      'Lightweight, breathable rub-in that leaves baby soft and protected'
    ],
    certifications: [
      'Dermatologist Tested on Sensitive Skin',
      'UVA/UVB Protection Verified',
      'Lightweight & Gentle on Skin',
      'Fragrance-Free & Hypoallergenic'
    ],
    ingredients: [
      {
        name: 'Zinc Oxide (Non-Nano 20%)',
        inci: 'Zinc Oxide',
        purpose: 'Physical active UV barrier (reflects solar radiation)',
        source: 'Naturally mined mineral',
        ewgScore: 1
      },
      {
        name: 'Organic Shea Butter',
        inci: 'Butyrospermum Parkii Butter',
        purpose: 'Deep nourishing barrier replenishment against wind',
        source: 'Fair-trade shea nuts',
        ewgScore: 1
      },
      {
        name: 'Calendula Flower Oil',
        inci: 'Calendula Officinalis Flower Extract',
        purpose: 'Comforts sensitive skin exposed to outdoor warmth',
        source: 'Cold-pressed marigold petals',
        ewgScore: 1
      },
      {
        name: 'Caprylic/Capric Triglyceride',
        inci: 'Caprylic/Capric Triglyceride',
        purpose: 'Lightweight glide agent preventing stickiness',
        source: 'Fractionated coconut oil',
        ewgScore: 1
      },
      {
        name: 'Tocopherol (Vitamin E)',
        inci: 'Tocopherol',
        purpose: 'Natural antioxidant preserving botanical freshness',
        source: 'Non-GMO sunflower seeds',
        ewgScore: 1
      }
    ],
    usageDirections: [
      'Warm a dime-sized amount between your fingertips.',
      'Dot gently over baby’s exposed skin (cheeks, nose, ears, neck, arms, and legs) 15 minutes before outdoor play.',
      'Gently smooth until sheer and absorbed.',
      'Reapply at least every 2 hours, or after 80 minutes of swimming or water splashing.'
    ],
    precautions: 'For babies under 6 months, pediatric guidelines recommend protective clothing, hats, and shade as primary sun safety. Keep out of eyes.',
    texture: 'Creamy lotion with velvet matte finish',
    scent: '100% Fragrance-Free (faint natural shea warmth)',
    phLevel: '6.8 (Physiologically neutral)',
    inStock: true
  },
  {
    id: 'tear-free-baby-shampoo',
    name: 'Gentle Baby Shampoo',
    category: 'Hair Care',
    tagline: 'Soft & Healthy Hair • Happy Little Days',
    shortDescription: 'Gentle tear-free apple-amino and hydrolyzed oat shampoo that lifts cradle cap flakes while protecting delicate newborn hair follicles.',
    fullDescription: 'Formulated with ultra-mild apple amino acids and hydrolyzed oat protein, this shampoo cleanses fine infant hair without stripping vital natural scalp oils. Specially formulated to assist with cradle cap comfort, leaving hair silky soft, manageable, and easy to comb without tears or stinging.',
    price: 400,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 114,
    size: '200 ml',
    ageGuidance: 'Safe from newborn (0+ Years)',
    ageBracket: 'all',
    image: shampooImg,
    keyBenefits: [
      'Certified tear-free ocular comfort formulation',
      'Helps gently soften and release stubborn cradle cap scales',
      'Zero sulfates, silicones, dyes, or harsh betaines',
      'Leaves fine baby hair weightless, soft, and tangle-free'
    ],
    certifications: [
      'Tear Free Certified',
      'pH Balanced for Scalp',
      'Mild & Gentle Formula',
      'Vegan & Cruelty-Free'
    ],
    ingredients: [
      {
        name: 'Sodium Cocoyl Apple Amino Acids',
        inci: 'Sodium Cocoyl Apple Amino Acids',
        purpose: 'Ultra-gentle bio-surfactant mimicking infant skin proteins',
        source: 'Natural apple juice amino acids',
        ewgScore: 1
      },
      {
        name: 'Hydrolyzed Oat Protein',
        inci: 'Hydrolyzed Oat Protein',
        purpose: 'Moisturizes fine hair fibers and prevents tangling',
        source: 'Non-GMO enzymatic oat extract',
        ewgScore: 1
      },
      {
        name: 'Aloe Barbadensis Leaf Juice',
        inci: 'Aloe Barbadensis Leaf Juice',
        purpose: 'Cooling scalp hydration and natural pH balancing',
        source: 'Inner fillet organic aloe vera',
        ewgScore: 1
      },
      {
        name: 'Coco-Glucoside',
        inci: 'Coco-Glucoside',
        purpose: 'Gentle secondary cleanser that creates silky lather',
        source: 'Coconut fruit and fruit sugar',
        ewgScore: 1
      },
      {
        name: 'Citric Acid',
        inci: 'Citric Acid',
        purpose: 'Micro pH adjustment to match natural tear duct salinity',
        source: 'Natural citrus fermentation',
        ewgScore: 1
      }
    ],
    usageDirections: [
      'Gently wet baby’s hair with warm cup water or gentle hand spray.',
      'Dispense one pump into your palm and warm together.',
      'Massage delicately onto baby’s scalp with gentle circular motions using the pads of your fingers (not nails).',
      'Rinse gently with warm water, shielding eyes with your cupped hand.'
    ],
    precautions: 'Safe for daily bath routines. If swallowed or contact causes slight redness, rinse with clean warm water.',
    texture: 'Silky clear gel-lotion',
    scent: '100% Fragrance-Free',
    phLevel: '5.8 (Matches ocular tear fluid neutrality)',
    inStock: true
  },
  {
    id: 'pure-water-baby-wipes',
    name: 'Soft Baby Wipes',
    category: 'Daily Hygiene',
    tagline: 'Cleanse • Refresh • Care',
    shortDescription: '120 plant-based fabric wipes with 99.2% pure water, completely alcohol-free and gentle on delicate infant skin.',
    fullDescription: 'Made from unbleached, 100% renewable plant-based fibers, saturated with 99.2% pharmaceutical-grade purified water and a single drop of organic fruit and chamomile extract. Contains 120 extra-soft sheets with a moisture-lock flip-top lid, strong enough not to tear during blowout emergencies yet softer than cotton wool on delicate diaper zones.',
    price: 250,
    originalPrice: 300,
    rating: 5.0,
    reviewCount: 219,
    size: '120 Wipes (Flip-Top Pack)',
    ageGuidance: 'Safe from day one (0+ Years)',
    ageBracket: 'all',
    image: wipesImg,
    keyBenefits: [
      '99.2% Hospital-grade purified water formulation',
      '100% Plant-Based Fabric (Zero microplastics)',
      '100% Alcohol-Free & Gentle on Sensitive Skin',
      'Secure moisture-lock flip lid that stays fresh down to the last sheet'
    ],
    certifications: [
      'Plant-Based Fabric Certified',
      'Alcohol-Free Verified',
      'Dermatologically Tested on Sensitive Skin',
      'Hypoallergenic & Gentle'
    ],
    ingredients: [
      {
        name: 'Hospital-Grade Purified Water (99.2%)',
        inci: 'Aqua',
        purpose: 'Pure cleansing hydration without leaving chemical residue',
        source: '7-stage reverse osmosis purified water',
        ewgScore: 1
      },
      {
        name: 'Organic Aloe Vera Juice',
        inci: 'Aloe Barbadensis Leaf Juice',
        purpose: 'Protects diaper area against chafing and dampness',
        source: 'Certified organic aloe leaves',
        ewgScore: 1
      },
      {
        name: 'Chamomile Extract',
        inci: 'Chamomilla Recutita Flower Extract',
        purpose: 'Calming comfort on redness-prone bottoms',
        source: 'German chamomile flower',
        ewgScore: 1
      },
      {
        name: 'Food-Grade Citric Acid',
        inci: 'Citric Acid',
        purpose: 'Maintains skin-friendly physiological pH',
        source: 'Fermented plant sugar',
        ewgScore: 1
      },
      {
        name: 'Sodium Benzoate',
        inci: 'Sodium Benzoate',
        purpose: 'Food-grade preservative to prevent mold/bacteria in moisture',
        source: 'Berry-derived preservative',
        ewgScore: 1
      }
    ],
    usageDirections: [
      'Pop open the secure flip-top lid and peel back the inner freshness seal.',
      'Pull out one wipe gently—our smart interfold dispenses one sheet at a time without dragging multiples.',
      'Gently wipe diaper area, messy sticky fingers, or milky chin.',
      'Press flip lid firmly closed to lock in moisture.'
    ],
    precautions: 'Do not flush down household toilets (dispose in trash or home compost bin). Store at room temperature away from direct radiator heat.',
    texture: 'Embossed quilted bamboo cloud cloth',
    scent: '100% Fragrance-Free',
    phLevel: '5.2 (Diaper-zone balanced)',
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah M.',
    childAge: 'Mother of 3-month-old Leo',
    rating: 5,
    title: 'The only foaming wash that didn’t flare my son’s eczema',
    comment: 'We tried three different hospital-recommended brands and Leo’s skin kept flaking around his chest. Nimaya’s foaming cleanser has been an absolute godsend. The lather is so soft, requires zero rubbing, and his skin stays calm and baby-soft after every evening bath.',
    verified: true,
    date: '2 days ago'
  },
  {
    id: 'r2',
    author: 'Dr. Priya V., MD',
    childAge: 'Pediatrician & Mom of twins (14 months)',
    rating: 5,
    title: 'Transparent formulation is rare and refreshing',
    comment: 'As a pediatrician, I am constantly fielding questions from exhausted parents terrified of reading 40-syllable chemical lists. Nimaya’s plain-English ingredient breakdown and non-nano zinc sunscreen are exemplary. It’s what I personally use on my twins.',
    verified: true,
    date: '1 week ago'
  },
  {
    id: 'r3',
    author: 'David & Kevin L.',
    childAge: 'Dads to 8-month-old Maya',
    rating: 5,
    title: 'The wipes actually pull out ONE at a time!',
    comment: 'Every parent knows the rage of pulling out a wipe during a 3 AM blowout and having 12 come out stuck together. Nimaya’s pack dispenser works flawlessly, the bamboo cloth is super thick and never rips, and Maya has had zero diaper rash since we switched.',
    verified: true,
    date: '2 weeks ago'
  }
];
