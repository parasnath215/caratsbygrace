/* ============================================================
   CARATS BY GRACE — Product Catalog Data & Dynamic CMS Layer
   Grown Diamond Fine Jewellery Atelier · Mahanagar, Lucknow
   ============================================================ */

export const INITIAL_PRODUCTS = [
  // ── Exclusive / One of One Creations (Designs That Never Repeat) ─────────
  {
    id: 'cg-ex-001',
    slug: 'the-empress-pear-suite',
    name: 'The Empress Pear Diamond Suite',
    category: 'necklaces',
    collection: 'the-empress',
    isOneOfOne: true,
    status: 'available', // 'available' | 'sold'
    specs: '18K White Gold · 7.50 ct Total Weight · VVS1 Clarity · D-E Colour · IGI Certified',
    metal: '18K White Gold',
    diamondShape: 'Pear & Round Brilliant',
    caratWeight: '7.50 ct TW',
    clarity: 'VVS1',
    colour: 'D-E',
    cut: 'Super Ideal',
    certification: 'IGI Certified (Grown Diamond)',
    description:
      'Created as a singular, never-to-be-repeated atelier masterwork. A cascading rivière of pear-shaped grown diamonds tapering into a magnificent 3.50 ct centre drop.',
    images: [
      '/assets/model2/cg_jewellers8471.webp',
      '/assets/model2/cg_jewellers8620.webp',
      '/assets/model1/m1_8424_final.webp',
    ],
    isNew: true,
    isBestseller: false,
    featured: true,
  },
  {
    id: 'cg-ex-002',
    slug: 'solis-yellow-cushion-ring',
    name: 'Solis Fancy Vivid Yellow Cushion Ring',
    category: 'rings',
    collection: 'the-empress',
    isOneOfOne: true,
    status: 'available',
    specs: '18K Two-Tone Gold · 3.20 ct Fancy Vivid Yellow Cushion · VVS2 Clarity · IGI Certified',
    metal: '18K Yellow & White Gold',
    diamondShape: 'Cushion Cut',
    caratWeight: '3.20 ct Centre (+ 0.60 ct Halo)',
    clarity: 'VVS2',
    colour: 'Fancy Vivid Yellow',
    cut: 'Excellent',
    certification: 'IGI Certified',
    description:
      'An arresting one-of-a-kind statement ring centering a vivid golden-yellow grown diamond within micro-pavé halos of brilliant colourless diamonds.',
    images: [
      '/assets/model1/m1_8403_final.webp',
      '/assets/model1/m1_8425_final.webp',
    ],
    isNew: true,
    isBestseller: false,
    featured: true,
  },
  {
    id: 'cg-ex-003',
    slug: 'nocturne-emerald-cut-choker',
    name: 'Nocturne Geometric Diamond Choker',
    category: 'necklaces',
    collection: 'the-nocturne-edit',
    isOneOfOne: true,
    status: 'sold', // Archived sold piece
    specs: '18K White Gold · 10.20 ct Total Weight · VVS Clarity · Sold to Private Collector',
    metal: '18K White Gold',
    diamondShape: 'Emerald & Baguette Cut',
    caratWeight: '10.20 ct TW',
    clarity: 'VVS',
    colour: 'E-F',
    cut: 'Step Cut',
    certification: 'IGI Certified',
    description:
      'An archival one-of-one creation crafted once and forever retired. Art-deco architectural geometry featuring calibrated baguette and step-cut grown diamonds.',
    images: [
      '/assets/model2/m2_8090.webp',
      '/assets/model2/m2_8095.webp',
    ],
    isNew: false,
    isBestseller: false,
    featured: true,
  },
  {
    id: 'cg-ex-004',
    slug: 'aurora-sculpted-mesh-cuff',
    name: 'Aurora Architectural Diamond Cuff',
    category: 'bracelets',
    collection: 'the-empress',
    isOneOfOne: true,
    status: 'available',
    specs: '18K Yellow Gold · 4.80 ct Brilliant Pavé · VVS1 Clarity · Hinged Silhouette',
    metal: '18K Yellow Gold',
    diamondShape: 'Round Brilliant & Marquise',
    caratWeight: '4.80 ct TW',
    clarity: 'VVS1',
    colour: 'D-F',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'Individually sculpted by hand with articulated gold mesh and pavé-set grown diamonds that catch ambient light from every viewing angle.',
    images: [
      '/assets/model2/m2_8124.webp',
      '/assets/model2/m2_8182.webp',
    ],
    isNew: true,
    isBestseller: false,
    featured: true,
  },

  // ── Signature Rings & Engagement Rings ──────────────────────────────────
  {
    id: 'cg-r001',
    slug: 'ananya-oval-solitaire-ring',
    name: 'Ananya Solitaire Oval Ring',
    category: 'engagement-rings',
    collection: 'solitaire-essentials',
    isOneOfOne: false,
    status: 'available',
    specs: '18K Yellow Gold · 2.00 ct Oval Grown Diamond · VVS1 · E Colour · IGI Certified',
    metal: '18K Yellow Gold',
    diamondShape: 'Oval Brilliant',
    caratWeight: '2.00 ct',
    clarity: 'VVS1',
    colour: 'E',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'A timeless classic reimagined. A clean four-prong cathedral setting designed to lift an exceptional 2.00 ct oval grown diamond to maximum light refraction.',
    images: [
      '/assets/model1/m1_8252_final.webp',
      '/assets/model1/m1_8253_final.webp',
    ],
    isNew: true,
    isBestseller: true,
    featured: true,
  },
  {
    id: 'cg-r002',
    slug: 'celeste-emerald-cut-solitaire',
    name: 'Celeste Emerald Cut Solitaire',
    category: 'engagement-rings',
    collection: 'solitaire-essentials',
    isOneOfOne: false,
    status: 'available',
    specs: '950 Platinum · 2.50 ct Emerald Cut · VVS2 Clarity · F Colour · Hidden Halo',
    metal: '950 Platinum',
    diamondShape: 'Emerald Cut',
    caratWeight: '2.50 ct',
    clarity: 'VVS2',
    colour: 'F',
    cut: 'Excellent',
    certification: 'IGI Certified',
    description:
      'Featuring clean architectural step cuts with a delicate secret pavé halo beneath the basket, set in heirloom-grade 950 platinum.',
    images: [
      '/assets/model1/m1_8255_final.webp',
      '/assets/model1/m1_8256_final.webp',
    ],
    isNew: false,
    isBestseller: true,
    featured: true,
  },
  {
    id: 'cg-r003',
    slug: 'ishaan-eternity-band',
    name: 'Ishaan Full Diamond Eternity Band',
    category: 'rings',
    collection: 'solitaire-essentials',
    isOneOfOne: false,
    status: 'available',
    specs: '18K White Gold · 1.50 ct Total Weight · VVS Clarity · Round Cut Diamonds',
    metal: '18K White Gold',
    diamondShape: 'Round Brilliant',
    caratWeight: '1.50 ct TW',
    clarity: 'VVS',
    colour: 'E-F',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'Continuous brilliance with low-profile shared prongs engineered for supreme comfort and stacking versatility.',
    images: [
      '/assets/model1/m1_8275_final.webp',
      '/assets/model1/m1_8256_final.webp',
    ],
    isNew: false,
    isBestseller: true,
    featured: false,
  },
  {
    id: 'cg-r004',
    slug: 'zara-pear-cocktail-ring',
    name: 'Zara Architectural Cocktail Ring',
    category: 'rings',
    collection: 'the-empress',
    isOneOfOne: false,
    status: 'available',
    specs: '18K Rose Gold · 1.80 ct Pear Diamond Cluster · VVS2 · Modern Contour',
    metal: '18K Rose Gold',
    diamondShape: 'Pear Cut',
    caratWeight: '1.80 ct TW',
    clarity: 'VVS2',
    colour: 'F',
    cut: 'Very Good',
    certification: 'IGI Certified',
    description:
      'A contemporary statement silhouette featuring tilted pear-cut diamonds set in fluid 18K rose gold ribbons.',
    images: [
      '/assets/model1/m1_8404_final.webp',
      '/assets/model1/m1_8403_final.webp',
    ],
    isNew: true,
    isBestseller: false,
    featured: true,
  },

  // ── Earrings ─────────────────────────────────────────────────────────────
  {
    id: 'cg-e001',
    slug: 'riya-diamond-chandelier-earrings',
    name: 'Riya Diamond Chandelier Earrings',
    category: 'earrings',
    collection: 'the-empress',
    isOneOfOne: false,
    status: 'available',
    specs: '18K White Gold · 3.80 ct Total Weight · VVS Clarity · Articulated Drops',
    metal: '18K White Gold',
    diamondShape: 'Round & Pear Cut',
    caratWeight: '3.80 ct TW',
    clarity: 'VVS',
    colour: 'D-F',
    cut: 'Super Ideal',
    certification: 'IGI Certified',
    description:
      'Feather-light articulated chandelier drops that dance with movement, catching light across red carpet and evening galas.',
    images: [
      '/assets/model1/m1_8440_final.webp',
      '/assets/model1/m1_8441_final.webp',
    ],
    isNew: false,
    isBestseller: true,
    featured: true,
  },
  {
    id: 'cg-e002',
    slug: 'gulshan-solitaire-studs',
    name: 'Gulshan Diamond Solitaire Studs',
    category: 'earrings',
    collection: 'solitaire-essentials',
    isOneOfOne: false,
    status: 'available',
    specs: '18K Yellow Gold · 1.00 ct Each (2.00 ct TW) · VVS1 Clarity · D Colour · Triple Ex Cut',
    metal: '18K Yellow Gold',
    diamondShape: 'Round Brilliant',
    caratWeight: '2.00 ct TW',
    clarity: 'VVS1',
    colour: 'D',
    cut: 'Triple Excellent',
    certification: 'IGI Certified',
    description:
      'The quintessential diamond studs. Hand-selected matched pair of D colour, VVS1 clarity grown diamonds with screw-back security.',
    images: [
      '/assets/model1/m1_8443_final.webp',
      '/assets/model1/m1_8446_final.webp',
    ],
    isNew: true,
    isBestseller: true,
    featured: false,
  },
  {
    id: 'cg-e003',
    slug: 'meera-cascading-drops',
    name: 'Meera Linear Diamond Drop Earrings',
    category: 'earrings',
    collection: 'the-nocturne-edit',
    isOneOfOne: false,
    status: 'available',
    specs: '18K White Gold · 2.20 ct TW · Graduated Bezel Setting · VVS2 Clarity',
    metal: '18K White Gold',
    diamondShape: 'Round Brilliant',
    caratWeight: '2.20 ct TW',
    clarity: 'VVS2',
    colour: 'E-F',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'Sleek linear minimalism featuring graduated bezel-set grown diamonds linked with invisible hinges for seamless movement.',
    images: [
      '/assets/model2/m2_8126.webp',
      '/assets/model2/m2_8135.webp',
    ],
    isNew: false,
    isBestseller: false,
    featured: false,
  },

  // ── Necklaces ────────────────────────────────────────────────────────────
  {
    id: 'cg-n001',
    slug: 'empress-diamond-riviere',
    name: 'Empress Diamond Rivière Necklace',
    category: 'necklaces',
    collection: 'the-empress',
    isOneOfOne: false,
    status: 'available',
    specs: '18K White Gold · 6.50 ct Graduated Diamonds · VVS1 · 16 inch Collar',
    metal: '18K White Gold',
    diamondShape: 'Round Brilliant',
    caratWeight: '6.50 ct TW',
    clarity: 'VVS1',
    colour: 'D-E',
    cut: 'Super Ideal',
    certification: 'IGI Certified',
    description:
      'A continuous stream of pure light. Hand-matched graduated round grown diamonds designed to sit flush along the collarbone.',
    images: [
      '/assets/model2/m2_8090.webp',
      '/assets/model2/m2_8095.webp',
      '/assets/model1/m1_8201_final.webp',
    ],
    isNew: true,
    isBestseller: true,
    featured: true,
  },
  {
    id: 'cg-n002',
    slug: 'kavya-layered-diamond-necklace',
    name: 'Kavya Two-Row Diamond Choker',
    category: 'necklaces',
    collection: 'the-nocturne-edit',
    isOneOfOne: false,
    status: 'available',
    specs: '18K Rose Gold · 4.20 ct Diamonds · Dual-Strand Setting · VVS Clarity',
    metal: '18K Rose Gold',
    diamondShape: 'Round & Marquise',
    caratWeight: '4.20 ct TW',
    clarity: 'VVS',
    colour: 'E-F',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'Delicate dual strands of prong-set diamonds accented by floating marquise motifs, rendered in warm 18K rose gold.',
    images: [
      '/assets/model2/cg_jewellers8599.webp',
      '/assets/model2/cg_jewellers8612.webp',
    ],
    isNew: false,
    isBestseller: true,
    featured: false,
  },

  // ── Pendants ─────────────────────────────────────────────────────────────
  {
    id: 'cg-p001',
    slug: 'lumina-solitaire-pear-pendant',
    name: 'Lumina Pear Diamond Solitaire Pendant',
    category: 'pendants',
    collection: 'solitaire-essentials',
    isOneOfOne: false,
    status: 'available',
    specs: '18K Yellow Gold · 1.50 ct Pear Grown Diamond · VVS1 Clarity · E Colour · 18" Chain',
    metal: '18K Yellow Gold',
    diamondShape: 'Pear Cut',
    caratWeight: '1.50 ct',
    clarity: 'VVS1',
    colour: 'E',
    cut: 'Very Good',
    certification: 'IGI Certified',
    description:
      'Clean three-prong modern bail highlighting an elongated teardrop pear diamond that floats gracefully on a diamond-cut link chain.',
    images: [
      '/assets/categories/cat_pendants.webp',
      '/assets/model1/m1_8424_final.webp',
    ],
    isNew: true,
    isBestseller: true,
    featured: true,
  },
  {
    id: 'cg-p002',
    slug: 'celestial-emerald-pendant',
    name: 'Celestial Emerald Cut Diamond Pendant',
    category: 'pendants',
    collection: 'the-nocturne-edit',
    isOneOfOne: false,
    status: 'available',
    specs: '18K White Gold · 1.20 ct Emerald Cut · VVS2 · Floating Bezel Silhouette',
    metal: '18K White Gold',
    diamondShape: 'Emerald Cut',
    caratWeight: '1.20 ct',
    clarity: 'VVS2',
    colour: 'F',
    cut: 'Step Cut',
    certification: 'IGI Certified',
    description:
      'Geometric clarity captured within an ultra-slim modern bezel that highlights the hall-of-mirrors effect of step-cut faceting.',
    images: [
      '/assets/model1/m1_8440_final.webp',
      '/assets/model1/m1_8448_final.webp',
    ],
    isNew: false,
    isBestseller: false,
    featured: false,
  },

  // ── Bracelets ────────────────────────────────────────────────────────────
  {
    id: 'cg-b001',
    slug: 'sitara-classic-tennis-bracelet',
    name: 'Sitara Classic Diamond Tennis Bracelet',
    category: 'bracelets',
    collection: 'solitaire-essentials',
    isOneOfOne: false,
    status: 'available',
    specs: '18K White Gold · 3.50 ct Total Weight · VVS2 Clarity · Double Safety Clasp',
    metal: '18K White Gold',
    diamondShape: 'Round Brilliant',
    caratWeight: '3.50 ct TW',
    clarity: 'VVS2',
    colour: 'E-F',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'The modern heirloom tennis bracelet. Individually set four-prong baskets offering silky wrist drape and secure daily wearability.',
    images: [
      '/assets/model2/m2_8186.webp',
      '/assets/model2/m2_8188.webp',
      '/assets/categories/cat_bracelets.webp',
    ],
    isNew: true,
    isBestseller: true,
    featured: true,
  },
  {
    id: 'cg-b002',
    slug: 'priya-sculpted-diamond-kada',
    name: 'Priya Diamond Bypass Bangle',
    category: 'bracelets',
    collection: 'the-empress',
    isOneOfOne: false,
    status: 'available',
    specs: '18K Yellow Gold · 2.10 ct Round Diamonds · Hinged Bypass Mechanism',
    metal: '18K Yellow Gold',
    diamondShape: 'Round Brilliant',
    caratWeight: '2.10 ct TW',
    clarity: 'VVS',
    colour: 'F',
    cut: 'Ideal',
    certification: 'IGI Certified',
    description:
      'A contemporary interpretation of the Indian kada. Asymmetrical bypass ends crowned with clusters of radiant grown diamonds.',
    images: [
      '/assets/model1/m1_8247_final.webp',
      '/assets/model1/m1_8201_final.webp',
      '/assets/categories/cat_bangles.webp',
    ],
    isNew: false,
    isBestseller: true,
    featured: false,
  },
];

// ── Categories ─────────────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    name: 'Rings',
    slug: 'rings',
    description: 'Statement solitaires, eternity bands & stackable signatures.',
    image: '/assets/categories/cat_rings.webp',
  },
  {
    name: 'Engagement Rings',
    slug: 'engagement-rings',
    description: 'Heirloom commitment rings centered on certified grown diamonds.',
    image: '/assets/model1/m1_8252_final.webp',
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    description: 'Triple-excellent studs, cascading drops & red carpet chandeliers.',
    image: '/assets/categories/cat_earrings.webp',
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Luminous rivières, architectural chokers & layered statements.',
    image: '/assets/categories/cat_necklaces.webp',
  },
  {
    name: 'Pendants',
    slug: 'pendants',
    description: 'Minimalist solitaires and iconic geometric talismans.',
    image: '/assets/categories/cat_pendants.webp',
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Classic tennis bracelets, sculpted cuffs & articulated kadas.',
    image: '/assets/categories/cat_bracelets.webp',
  },
];

// ── Featured Collections ───────────────────────────────────────────────────
export const COLLECTIONS = [
  {
    name: 'The Empress',
    slug: 'the-empress',
    tagline: 'Bold, Sovereign Brilliance',
    description:
      'A statement collection featuring bold and distinctive diamond jewellery crafted for presence and commanding poise.',
    heroImage: '/assets/model2/cg_jewellers8471.webp',
  },
  {
    name: 'The Nocturne Edit',
    slug: 'the-nocturne-edit',
    tagline: 'Sculptural Shadows & Midnight Sparkle',
    description:
      'Geometric silhouettes, step-cut clarity and contrasting metalwork conceived for evening celebration.',
    heroImage: '/assets/model2/m2_8090.webp',
  },
  {
    name: 'Solitaire Essentials',
    slug: 'solitaire-essentials',
    tagline: 'The Purest Expressions of Light',
    description:
      'Uncompromised VVS clarity grown diamonds set in minimalist architectural claws to let pure brilliance lead.',
    heroImage: '/assets/model1/m1_8255_final.webp',
  },
  {
    name: 'Exclusive Designs',
    slug: 'exclusive-designs',
    tagline: 'Designs That Never Repeat',
    description:
      'One design. One owner. Forever yours. Each singular creation exists once in the world and will never be recreated.',
    heroImage: '/assets/model1/m1_8424_final.webp',
    isOneOfOne: true,
  },
];

// ── Testimonials ───────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    quote:
      'Visiting the Mahanagar atelier was like a private Parisian salon. Nishi and Prateek guided me through diamond clarity and custom setting. My oval solitaire is beyond stunning.',
    name: 'Dr. Aradhana Verma',
    city: 'Lucknow',
    rating: 5,
    piece: 'Bespoke 2.20 ct Oval Solitaire',
  },
  {
    quote:
      'The Empress Pear Suite took my breath away. Knowing that the grown diamond has identical optical and chemical properties with zero compromise makes it even more special.',
    name: 'Radhika Jhunjhunwala',
    city: 'New Delhi',
    rating: 5,
    piece: 'The Empress Diamond Suite',
  },
  {
    quote:
      'WhatsApp ordering was seamless. The team sent high-res 4K videos under natural light, and the IGI documentation was crystal clear. Unmatched luxury experience.',
    name: 'Meera K. Rao',
    city: 'Bengaluru',
    rating: 5,
    piece: 'Sitara Tennis Bracelet',
  },
  {
    quote:
      'The "Designs That Never Repeat" philosophy is why I chose Carats by Grace. Knowing my ring will never exist on another hand is the ultimate definition of true luxury.',
    name: 'Simran Bajaj',
    city: 'Mumbai',
    rating: 5,
    piece: 'One-of-One Solis Cushion Ring',
  },
];

// ── Diamond Shapes for Bespoke ─────────────────────────────────────────────
export const DIAMOND_SHAPES = [
  { id: 'round', label: 'Round Brilliant', desc: 'Maximum fire and timeless optical scintillation.' },
  { id: 'oval', label: 'Oval Brilliant', desc: 'Elongating proportions with exceptional surface area.' },
  { id: 'emerald', label: 'Emerald Cut', desc: 'Step-cut hall of mirrors celebrating pure VVS clarity.' },
  { id: 'pear', label: 'Pear Cut', desc: 'Graceful teardrop combining brilliant and marquise cuts.' },
  { id: 'cushion', label: 'Cushion Cut', desc: 'Soft pillow silhouette with deep, romantic sparkle.' },
  { id: 'marquise', label: 'Marquise Cut', desc: 'Dramatic pointed oval maximizing optical presence.' },
  { id: 'radiant', label: 'Radiant Cut', desc: 'Vibrant hybrid of emerald contours with brilliant faceting.' },
  { id: 'princess', label: 'Princess Cut', desc: 'Contemporary crisp square with intense geometrical flash.' },
];

// ── LocalStorage Dynamic CMS Storage Helpers ──────────────────────────────
const STORAGE_KEY = 'carats_by_grace_catalog_v2';
const SETTINGS_STORAGE_KEY = 'carats_by_grace_settings_v2';

export const DEFAULT_SETTINGS = {
  brandName: 'Carats by Grace',
  location: 'Mahanagar, Lucknow',
  phone: '+91 91205 30531',
  whatsappNumber: '919120530531',
  email: 'hello@caratsbygrace.com',
  instagram: 'https://www.instagram.com/caratsbygrace/',
  mapsUrl: 'https://share.google/FkH78O9JeWQrn62Ik',
  hours: 'Monday – Saturday · 11:00 AM – 8:00 PM',
};

export function getStoredProducts() {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PRODUCTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Failed to read products from storage', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(productsList) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList));
  } catch (err) {
    console.error('Failed to save products to storage', err);
  }
}

export function getProductBySlug(slug) {
  const all = getStoredProducts();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}

export function getExclusiveDesigns() {
  const all = getStoredProducts();
  return all.filter((p) => p.isOneOfOne || p.collection === 'exclusive-designs');
}

export function getStoredSettings() {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

// Backward-compatible exports
export const products = INITIAL_PRODUCTS;
export const categories = CATEGORIES;
export const collections = COLLECTIONS;
export const testimonials = TESTIMONIALS;
