// src/data/bespokeConfig.js
// Carats by Grace — Bespoke Studio Configuration & Rules Engine
// Driven by a single config for pieces, settings, stones, metals, angles, pricing & compatibility.

export const BESPOKE_CONFIG = {
  // ── Step 1: Piece Types ──
  pieces: [
    {
      id: 'ring',
      name: 'Ring',
      label: 'Engagement & Fine Rings',
      description: 'Solitaire, halo, three-stone and bespoke band silhouettes.',
      basePrice: 42000,
      iconType: 'ring',
      defaultSetting: 'solitaire',
      supportsEngraving: true,
      sizeType: 'ring',
    },
    {
      id: 'pendant',
      name: 'Pendant',
      label: 'Necklaces & Solitaire Pendants',
      description: 'Suspended solitaires, diamond halos, and floating drops.',
      basePrice: 38000,
      iconType: 'pendant',
      defaultSetting: 'solitaire-drop',
      supportsEngraving: false,
      sizeType: 'chain',
    },
    {
      id: 'earrings',
      name: 'Earrings',
      label: 'Studs & Drop Ear-Pendants',
      description: 'Matching diamond pairs in four-prong, bezel or halo mounts.',
      basePrice: 48000,
      iconType: 'earrings',
      defaultSetting: 'classic-studs',
      supportsEngraving: false,
      sizeType: 'earring-back',
    },
    {
      id: 'bracelet',
      name: 'Bracelet',
      label: 'Bespoke Tennis & Cuffs',
      description: 'Articulated tennis bracelets, bangles, and diamond chain cuffs.',
      basePrice: 65000,
      iconType: 'bracelet',
      defaultSetting: 'tennis-solitaire',
      supportsEngraving: true,
      sizeType: 'wrist',
    },
  ],

  // ── Step 2: Settings per Piece ──
  settings: {
    ring: [
      {
        id: 'solitaire',
        name: 'Classic Solitaire',
        helper: 'Timeless 4 or 6-prong mount accentuating maximum diamond brilliance.',
        priceDelta: 0,
        popular: true,
        previewKey: 'solitaire',
      },
      {
        id: 'cathedral-solitaire',
        name: 'Cathedral Arch',
        helper: 'Elevated architectural shoulders that taper gracefully into the crown.',
        priceDelta: 8000,
        popular: false,
        previewKey: 'cathedral',
      },
      {
        id: 'pave-band',
        name: 'Micro-Pavé Band',
        helper: 'Delicate band lined with brilliant micro-claw grown diamonds (~0.30 ct TW).',
        priceDelta: 16000,
        popular: true,
        previewKey: 'pave',
      },
      {
        id: 'halo',
        name: 'Floating Halo',
        helper: 'Concentric halo of brilliant pavé diamonds framing the centre silhouette.',
        priceDelta: 22000,
        popular: true,
        previewKey: 'halo',
      },
      {
        id: 'three-stone',
        name: 'Three-Stone Trilogy',
        helper: 'Centre stone flanked by tapered baguette or pear-cut side stones.',
        priceDelta: 28000,
        popular: false,
        previewKey: 'threestone',
      },
      {
        id: 'bezel-modern',
        name: 'Contemporary Bezel',
        helper: 'Sleek protective low-profile metal rim contours around the diamond.',
        priceDelta: 12000,
        popular: false,
        previewKey: 'bezel',
      },
    ],
    pendant: [
      {
        id: 'solitaire-drop',
        name: 'Solitaire Four-Prong Drop',
        helper: 'Minimalist prong basket with a hidden back bail for a floating effect.',
        priceDelta: 0,
        popular: true,
        previewKey: 'solitaire',
      },
      {
        id: 'halo-pendant',
        name: 'Pavé Halo Medallion',
        helper: 'Micro-pavé frame amplifying stone diameter and light return.',
        priceDelta: 15000,
        popular: true,
        previewKey: 'halo',
      },
      {
        id: 'bezel-pendant',
        name: 'Modern Full Bezel',
        helper: 'Sculpted gold rim for effortless everyday ergonomic wear.',
        priceDelta: 8000,
        popular: false,
        previewKey: 'bezel',
      },
    ],
    earrings: [
      {
        id: 'classic-studs',
        name: 'Four-Prong Martini Studs',
        helper: 'Low-profile basket sitting flush against the earlobe.',
        priceDelta: 0,
        popular: true,
        previewKey: 'solitaire',
      },
      {
        id: 'halo-studs',
        name: 'Brilliant Halo Studs',
        helper: 'Surrounds each diamond pair in a glittering pavé aura.',
        priceDelta: 24000,
        popular: true,
        previewKey: 'halo',
      },
      {
        id: 'leverback-drops',
        name: 'Articulated Drops',
        helper: 'Suspended articulation with secure European leverback clasps.',
        priceDelta: 18000,
        popular: false,
        previewKey: 'drops',
      },
    ],
    bracelet: [
      {
        id: 'tennis-solitaire',
        name: 'Tennis Line with Solitaire Focus',
        helper: 'Four-prong articulated link bracelet with centre graduated stone.',
        priceDelta: 0,
        popular: true,
        previewKey: 'tennis',
      },
      {
        id: 'hinged-bangle',
        name: 'Sculpted Oval Bangle',
        helper: 'Solid hinged 18K gold bangle with tension-set diamond focal.',
        priceDelta: 32000,
        popular: true,
        previewKey: 'bangle',
      },
    ],
  },

  // ── Step 3: Stones ──
  stones: {
    shapes: [
      { id: 'round', name: 'Round Brilliant', ratio: '1.00', fire: 'Maximum 57-Facet Fire', previewKey: 'round' },
      { id: 'oval', name: 'Oval Brilliant', ratio: '1.35', fire: 'Elongating & Flattering Elegance', previewKey: 'oval' },
      { id: 'pear', name: 'Pear Cut', ratio: '1.50', fire: 'Teardrop Drama & Fluid Silhouette', previewKey: 'pear' },
      { id: 'emerald', name: 'Emerald Cut', ratio: '1.40', fire: 'Architectural Hall-of-Mirrors Step Cut', previewKey: 'emerald' },
      { id: 'cushion', name: 'Cushion Cut', ratio: '1.08', fire: 'Romantic Pillow Corners & Chunky Flashes', previewKey: 'cushion' },
      { id: 'radiant', name: 'Radiant Cut', ratio: '1.25', fire: 'Vibrant Scintillation with Trimmed Corners', previewKey: 'radiant' },
      { id: 'marquise', name: 'Marquise Cut', ratio: '1.80', fire: 'Regal Sovereign Silhouette', previewKey: 'marquise' },
    ],

    caratPresets: [
      { carat: 1.0, label: '1.00 ct', popular: true },
      { carat: 1.5, label: '1.50 ct', popular: true },
      { carat: 2.0, label: '2.00 ct', popular: true },
      { carat: 2.5, label: '2.50 ct', popular: false },
      { carat: 3.0, label: '3.00 ct', popular: true },
      { carat: 4.0, label: '4.00 ct', popular: false },
    ],

    caratMin: 0.75,
    caratMax: 5.0,
    caratStep: 0.25,

    types: [
      {
        id: 'grown-type-iia',
        name: 'Lab-Grown Diamond (Type IIa)',
        grade: 'D-F Colour · VVS1 Clarity · Super Ideal Cut',
        desc: 'Top 2% chemical purity in the world. Certified by IGI.',
        pricePerCarat: 48000,
        badge: 'Recommended',
      },
      {
        id: 'grown-fancy-yellow',
        name: 'Fancy Vivid Yellow Grown Diamond',
        grade: 'Fancy Vivid Golden Canary · VVS2 Clarity',
        desc: 'Intense canary saturation with pure optical warmth.',
        pricePerCarat: 54000,
        badge: 'Rare Hue',
      },
      {
        id: 'grown-rosecut',
        name: 'Rose-Cut Grown Diamond',
        grade: 'Vintage Faceting · E-F Colour · VS1 Clarity',
        desc: 'Flat back with domed geometric crown reminiscent of antique heirlooms.',
        pricePerCarat: 42000,
        badge: 'Antique Style',
      },
    ],
  },

  // ── Step 4: Metals ──
  metals: [
    {
      id: 'yellow-gold',
      name: 'Yellow Gold',
      swatchColor: '#D8B15D',
      gradient: 'linear-gradient(135deg, #F3D993 0%, #D8B15D 50%, #B88B2A 100%)',
      tintFilter: 'sepia(0.65) saturate(2.4) hue-rotate(5deg) brightness(1.02)',
      metalMultiplier: 1.0,
      description: 'Warm, radiant, timeless 18K or 14K classic atelier gold.',
      supportedPurities: ['18k', '14k'],
    },
    {
      id: 'rose-gold',
      name: 'Rose Gold',
      swatchColor: '#E29C8B',
      gradient: 'linear-gradient(135deg, #F7C8BC 0%, #E29C8B 50%, #B86957 100%)',
      tintFilter: 'sepia(0.65) saturate(2.2) hue-rotate(325deg) brightness(1.03)',
      metalMultiplier: 1.02,
      description: 'Romantic blush copper-gold alloy with gentle luminescence.',
      supportedPurities: ['18k', '14k'],
    },
    {
      id: 'white-gold',
      name: 'White Gold',
      swatchColor: '#DFDEE3',
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #DFDEE3 50%, #A9A8B0 100%)',
      tintFilter: 'saturate(0.05) brightness(1.08) contrast(1.05)',
      metalMultiplier: 1.04,
      description: 'High-polish rhodium-plated white gold with icy crispness.',
      supportedPurities: ['18k', '14k'],
    },
    {
      id: 'platinum',
      name: 'Platinum 950',
      swatchColor: '#D1D3D8',
      gradient: 'linear-gradient(135deg, #EBECEF 0%, #D1D3D8 50%, #9B9DA6 100%)',
      tintFilter: 'saturate(0.02) brightness(1.02) contrast(1.12)',
      metalMultiplier: 1.25,
      description: 'Pure, naturally hypoallergenic, substantial heirloom weight.',
      supportedPurities: ['950'],
    },
  ],

  purities: [
    { id: '18k', label: '18K Solid Gold', multiplier: 1.0, desc: '75% pure gold · Standard for fine luxury' },
    { id: '14k', label: '14K Solid Gold', multiplier: 0.88, desc: '58.5% pure gold · Added durability for active wear' },
    { id: '950', label: '950 Solid Platinum', multiplier: 1.25, desc: '95% pure noble metal · Naturally white forever' },
  ],

  // ── Step 5: Finishing & Sizing ──
  sizes: {
    ring: [
      { id: '8', label: 'Size 8 (14.8 mm)' },
      { id: '9', label: 'Size 9 (15.1 mm)' },
      { id: '10', label: 'Size 10 (15.5 mm)' },
      { id: '11', label: 'Size 11 (15.9 mm)' },
      { id: '12', label: 'Size 12 (16.2 mm)' },
      { id: '13', label: 'Size 13 (16.5 mm)' },
      { id: '14', label: 'Size 14 (16.9 mm) · Popular' },
      { id: '15', label: 'Size 15 (17.2 mm)' },
      { id: '16', label: 'Size 16 (17.5 mm) · Popular' },
      { id: '17', label: 'Size 17 (17.8 mm)' },
      { id: '18', label: 'Size 18 (18.1 mm)' },
      { id: '19', label: 'Size 19 (18.5 mm)' },
      { id: '20', label: 'Size 20 (18.8 mm)' },
      { id: '22', label: 'Size 22 (19.4 mm)' },
    ],
    chain: [
      { id: '16in', label: '16 Inches (Choker / Collarbone)' },
      { id: '18in', label: '18 Inches (Classic Standard)' },
      { id: '20in', label: '20 Inches (Lower Plunge)' },
    ],
    wrist: [
      { id: '6.0in', label: '6.0 Inches (Petite)' },
      { id: '6.5in', label: '6.5 Inches (Standard Small)' },
      { id: '7.0in', label: '7.0 Inches (Standard Medium)' },
      { id: '7.5in', label: '7.5 Inches (Comfort Fit)' },
    ],
    'earring-back': [
      { id: 'la-poussette', label: 'La Poussette Lock (Maximum Security)' },
      { id: 'screw-back', label: 'Threaded Screw Back' },
      { id: 'butterfly', label: 'Heavy Friction Butterfly' },
    ],
  },

  engravingFonts: [
    { id: 'script', name: 'Curated Script', cssFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic' },
    { id: 'serif', name: 'Classic Serif', cssFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'normal' },
    { id: 'sans', name: 'Modern Sans', cssFamily: "'Jost', sans-serif", fontStyle: 'normal' },
  ],

  // ── Camera Angles for 2D Stage ──
  angles: [
    { id: 'front', label: 'Front View', key: 'front' },
    { id: 'side', label: 'Side Profile', key: 'side' },
  ],

  // ── Feasibility & Compatibility Rules ──
  feasibilityRules: [
    {
      id: 'large-stone-pave',
      condition: (design) => design.piece === 'ring' && design.setting === 'pave-band' && design.carat >= 3.5,
      message: 'Stones above 3.0 ct require fortified prongs or cathedral gallery rails for structural stone security. Our master craftsmen will engineer a reinforced gallery.',
      severity: 'advisory',
    },
    {
      id: 'platinum-purity',
      condition: (design) => design.metal === 'platinum' && design.purity !== '950',
      message: 'Platinum is alloyed exclusively in noble 950 purity (95% pure platinum). Purity is set to 950 automatically.',
      severity: 'auto-fix',
      fix: { purity: '950' },
    },
    {
      id: 'gold-platinum-purity',
      condition: (design) => design.metal !== 'platinum' && design.purity === '950',
      message: 'Gold selections are crafted in 18K or 14K solid gold. Purity reset to 18K.',
      severity: 'auto-fix',
      fix: { purity: '18k' },
    },
  ],

  // ── Catalog Stills Fallback Mapping ──
  // High-res photography stills for fallbacks
  catalogFallbacks: {
    'ring-solitaire-round': '/assets/model1/m1_8252_final.webp',
    'ring-solitaire-oval': '/assets/model1/m1_8403_final.webp',
    'ring-pave-cushion': '/assets/model1/m1_8425_final.webp',
    'ring-halo-round': '/assets/model1/m1_8253_final.webp',
    'pendant-solitaire': '/assets/model2/cg_jewellers8620.webp',
    'earrings-studs': '/assets/model2/m2_8463.webp',
    'bracelet-tennis': '/assets/model2/m2_8124.webp',
    default: '/assets/model1/m1_8252_final.webp',
  },
};

/**
 * Live Pricing Rules Engine
 * Computes estimated price range in INR (₹)
 */
export function calculateEstimatedPrice(design) {
  const pieceConfig = BESPOKE_CONFIG.pieces.find((p) => p.id === design.piece) || BESPOKE_CONFIG.pieces[0];
  const settingsForPiece = BESPOKE_CONFIG.settings[design.piece] || BESPOKE_CONFIG.settings.ring;
  const settingConfig = settingsForPiece.find((s) => s.id === design.setting) || settingsForPiece[0];
  const stoneTypeConfig = BESPOKE_CONFIG.stones.types.find((t) => t.id === design.stoneType) || BESPOKE_CONFIG.stones.types[0];
  const metalConfig = BESPOKE_CONFIG.metals.find((m) => m.id === design.metal) || BESPOKE_CONFIG.metals[0];
  const purityConfig = BESPOKE_CONFIG.purities.find((p) => p.id === design.purity) || BESPOKE_CONFIG.purities[0];

  const basePrice = pieceConfig.basePrice;
  const settingDelta = settingConfig ? settingConfig.priceDelta : 0;
  const carat = Number(design.carat) || 1.0;
  const stonePrice = carat * stoneTypeConfig.pricePerCarat;

  // Metal & purity scaling
  const metalBase = 22000;
  const metalAdjusted = metalBase * metalConfig.metalMultiplier * purityConfig.multiplier;

  // Earring double stone factor
  const pieceMultiplier = design.piece === 'earrings' ? 1.75 : 1.0;

  const rawEstimate = Math.round((basePrice + settingDelta + stonePrice * pieceMultiplier + metalAdjusted) / 500) * 500;

  // Spread of +/- 4% for estimated range
  const minPrice = Math.round((rawEstimate * 0.96) / 500) * 500;
  const maxPrice = Math.round((rawEstimate * 1.05) / 500) * 500;

  return {
    raw: rawEstimate,
    min: minPrice,
    max: maxPrice,
    displayMin: `₹${minPrice.toLocaleString('en-IN')}`,
    displayMax: `₹${maxPrice.toLocaleString('en-IN')}`,
    rangeDisplay: `₹${minPrice.toLocaleString('en-IN')} – ₹${maxPrice.toLocaleString('en-IN')}`,
  };
}
