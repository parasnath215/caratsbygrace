/* ============================================================
   CARATS BY GRACE — Navigation Data
   Mega-menu structure for all primary categories.
   ============================================================ */

export const navLinks = [
  {
    label: 'Rings',
    slug: 'rings',
    subcategories: [
      { label: 'Solitaire Rings',    slug: 'rings/solitaire' },
      { label: 'Engagement Rings',   slug: 'rings/engagement' },
      { label: 'Cocktail Rings',     slug: 'rings/cocktail' },
      { label: 'Eternity Bands',     slug: 'rings/eternity-bands' },
      { label: 'Stackable Rings',    slug: 'rings/stackable' },
      { label: 'Statement Rings',    slug: 'rings/statement' },
    ],
    byOccasion: [
      { label: 'Engagement',  slug: 'rings/engagement' },
      { label: 'Wedding',     slug: 'rings/wedding' },
      { label: 'Everyday',    slug: 'rings/everyday' },
      { label: 'Anniversary', slug: 'rings/anniversary' },
    ],
    byPrice: [
      { label: 'Under ₹30,000',       slug: 'rings?maxPrice=30000' },
      { label: '₹30,000 – ₹75,000',   slug: 'rings?minPrice=30000&maxPrice=75000' },
      { label: '₹75,000 – ₹1,50,000', slug: 'rings?minPrice=75000&maxPrice=150000' },
      { label: 'Above ₹1,50,000',      slug: 'rings?minPrice=150000' },
    ],
    editorialImage: { src: '/assets/categories/cat_rings.webp', alt: 'Curated rings editorial' },
  },
  {
    label: 'Earrings',
    slug: 'earrings',
    subcategories: [
      { label: 'Jhumkas',          slug: 'earrings/jhumkas' },
      { label: 'Chandeliers',      slug: 'earrings/chandeliers' },
      { label: 'Studs',            slug: 'earrings/studs' },
      { label: 'Hoops',            slug: 'earrings/hoops' },
      { label: 'Drop Earrings',    slug: 'earrings/drops' },
      { label: 'Ear Cuffs',        slug: 'earrings/ear-cuffs' },
    ],
    byOccasion: [
      { label: 'Bridal',      slug: 'earrings/bridal' },
      { label: 'Festive',     slug: 'earrings/festive' },
      { label: 'Everyday',    slug: 'earrings/everyday' },
      { label: 'Office Wear', slug: 'earrings/office' },
    ],
    byPrice: [
      { label: 'Under ₹20,000',       slug: 'earrings?maxPrice=20000' },
      { label: '₹20,000 – ₹50,000',   slug: 'earrings?minPrice=20000&maxPrice=50000' },
      { label: '₹50,000 – ₹1,00,000', slug: 'earrings?minPrice=50000&maxPrice=100000' },
      { label: 'Above ₹1,00,000',      slug: 'earrings?minPrice=100000' },
    ],
    editorialImage: { src: '/assets/categories/cat_earrings.webp', alt: 'Curated earrings editorial' },
  },
  {
    label: 'Necklaces',
    slug: 'necklaces',
    subcategories: [
      { label: 'Chokers',           slug: 'necklaces/chokers' },
      { label: 'Pendant Necklaces', slug: 'necklaces/pendants' },
      { label: 'Layered Necklaces', slug: 'necklaces/layered' },
      { label: 'Temple Jewellery',  slug: 'necklaces/temple' },
      { label: 'Mangalsutras',      slug: 'necklaces/mangalsutras' },
      { label: 'Tennis Necklaces',  slug: 'necklaces/tennis' },
    ],
    byOccasion: [
      { label: 'Bridal',  slug: 'necklaces/bridal' },
      { label: 'Festive', slug: 'necklaces/festive' },
      { label: 'Casual',  slug: 'necklaces/casual' },
      { label: 'Gifting', slug: 'necklaces/gifting' },
    ],
    byPrice: [
      { label: 'Under ₹30,000',         slug: 'necklaces?maxPrice=30000' },
      { label: '₹30,000 – ₹1,00,000',   slug: 'necklaces?minPrice=30000&maxPrice=100000' },
      { label: '₹1,00,000 – ₹2,00,000', slug: 'necklaces?minPrice=100000&maxPrice=200000' },
      { label: 'Above ₹2,00,000',        slug: 'necklaces?minPrice=200000' },
    ],
    editorialImage: { src: '/assets/categories/cat_necklaces.webp', alt: 'Curated necklaces editorial' },
  },
  {
    label: 'Bracelets',
    slug: 'bracelets',
    subcategories: [
      { label: 'Bangles',          slug: 'bracelets/bangles' },
      { label: 'Cuffs',            slug: 'bracelets/cuffs' },
      { label: 'Tennis Bracelets', slug: 'bracelets/tennis' },
      { label: 'Charm Bracelets',  slug: 'bracelets/charm' },
      { label: 'Kadas',            slug: 'bracelets/kadas' },
      { label: 'Stackable Sets',   slug: 'bracelets/stackable' },
    ],
    byOccasion: [
      { label: 'Bridal',   slug: 'bracelets/bridal' },
      { label: 'Festive',  slug: 'bracelets/festive' },
      { label: 'Everyday', slug: 'bracelets/everyday' },
      { label: 'Gifting',  slug: 'bracelets/gifting' },
    ],
    byPrice: [
      { label: 'Under ₹25,000',       slug: 'bracelets?maxPrice=25000' },
      { label: '₹25,000 – ₹75,000',   slug: 'bracelets?minPrice=25000&maxPrice=75000' },
      { label: '₹75,000 – ₹1,50,000', slug: 'bracelets?minPrice=75000&maxPrice=150000' },
      { label: 'Above ₹1,50,000',      slug: 'bracelets?minPrice=150000' },
    ],
    editorialImage: { src: '/assets/categories/cat_bracelets.webp', alt: 'Curated bracelets editorial' },
  },
  {
    label: 'Bridal',
    slug: 'bridal',
    subcategories: [
      { label: 'Bridal Sets',         slug: 'bridal/sets' },
      { label: 'Maang Tikka',         slug: 'bridal/maang-tikka' },
      { label: 'Nath',                slug: 'bridal/nath' },
      { label: 'Haath Phool',         slug: 'bridal/haath-phool' },
      { label: 'Payal & Anklets',     slug: 'bridal/payal' },
      { label: 'Bridal Consultation', slug: 'bridal/consultation' },
    ],
    byOccasion: [
      { label: 'Hindu Wedding',  slug: 'bridal/hindu' },
      { label: 'Muslim Wedding', slug: 'bridal/muslim' },
      { label: 'Sikh Wedding',   slug: 'bridal/sikh' },
      { label: 'South Indian',   slug: 'bridal/south-indian' },
    ],
    byPrice: [
      { label: 'Under ₹1,00,000',        slug: 'bridal?maxPrice=100000' },
      { label: '₹1,00,000 – ₹2,50,000',  slug: 'bridal?minPrice=100000&maxPrice=250000' },
      { label: 'Above ₹2,50,000',         slug: 'bridal?minPrice=250000' },
    ],
    editorialImage: { src: '/assets/model2/m2_8463.webp', alt: 'Bridal jewellery editorial' },
  },
  {
    label: 'Gifting',
    slug: 'gifting',
    subcategories: [
      { label: 'Gold Coins & Bars',  slug: 'gifting/gold-coins' },
      { label: 'Gift Sets',          slug: 'gifting/sets' },
      { label: 'Personalised Gifts', slug: 'gifting/personalised' },
      { label: 'Birth Jewellery',    slug: 'gifting/birth' },
      { label: 'Corporate Gifting',  slug: 'gifting/corporate' },
    ],
    byOccasion: [
      { label: 'Diwali',       slug: 'gifting/diwali' },
      { label: 'Wedding Gift', slug: 'gifting/wedding' },
      { label: 'Birthday',     slug: 'gifting/birthday' },
      { label: 'Baby Shower',  slug: 'gifting/baby-shower' },
    ],
    byPrice: [
      { label: 'Under ₹10,000',     slug: 'gifting?maxPrice=10000' },
      { label: '₹10,000 – ₹30,000', slug: 'gifting?minPrice=10000&maxPrice=30000' },
      { label: '₹30,000 – ₹75,000', slug: 'gifting?minPrice=30000&maxPrice=75000' },
      { label: 'Above ₹75,000',      slug: 'gifting?minPrice=75000' },
    ],
    editorialImage: { src: '/assets/categories/cat_pendants.webp', alt: 'Gifting jewellery editorial' },
  },
  {
    label: 'High Jewellery',
    slug: 'high-jewellery',
    subcategories: [
      { label: 'Diamonds',           slug: 'high-jewellery/diamonds' },
      { label: 'Coloured Gemstones', slug: 'high-jewellery/gemstones' },
      { label: 'Platinum',           slug: 'high-jewellery/platinum' },
      { label: 'One-of-a-Kind',      slug: 'high-jewellery/one-of-a-kind' },
      { label: 'Atelier Bespoke',    slug: 'high-jewellery/bespoke' },
    ],
    byOccasion: [
      { label: 'Black Tie',  slug: 'high-jewellery/black-tie' },
      { label: 'Investment', slug: 'high-jewellery/investment' },
      { label: 'Heirloom',   slug: 'high-jewellery/heirloom' },
    ],
    byPrice: [
      { label: '₹1,00,000 – ₹2,50,000', slug: 'high-jewellery?maxPrice=250000' },
      { label: 'Above ₹2,50,000',        slug: 'high-jewellery?minPrice=250000' },
    ],
    editorialImage: { src: '/assets/model1/m1_8306_final.webp', alt: 'High jewellery editorial' },
  },
];
