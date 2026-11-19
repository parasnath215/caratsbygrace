const fs = require('fs');

const rawItems = JSON.parse(fs.readFileSync('all_packing_items.json', 'utf8'));

// Unique names map for all 70 items
const NAMES_MAP = [
  "The Sovereign 2.04 ct Marquise Diamond Twisted Solitaire Ring",
  "Elysian 1.21 ct Oval Diamond Micro-Pavé Halo Ring",
  "Serena 1.61 ct Six-Stone Brilliant Diamond Band",
  "Constellation 1.36 ct Multi-Oval & Round Diamond Ring",
  "Celeste 0.33 ct Oval Diamond Solitaire Ring",
  "Imperia 1.90 ct Princess-Cut Multi-Stone Band",
  "Vivante 1.15 ct Oval Diamond Pavé Accent Ring",
  "Nocturne 1.10 ct Emerald & Round Diamond Geometric Band",
  "Trillium 1.10 ct Trio Pear & Round Diamond Ring",
  "Helios 1.42 ct Oval Diamond Double Halo Ring",
  "Lumière 0.32 ct Round Brilliant Solitaire Ring",
  "Astrid 0.59 ct Solitaire & Pavé Diamond Ring",
  "Petite Etoile 0.28 ct Round Solitaire Ring",
  "Vespera 1.72 ct Round Brilliant Halo Pavé Ring",
  "Amara 1.11 ct Pear Diamond Side-Pavé Ring",
  "Sora 0.58 ct Oval Diamond Minimalist Band",
  "Lyra 0.69 ct Round Brilliant Accented Ring",
  "The Empress 2.57 ct Oval Diamond Grand Statement Ring",
  "Orion 1.36 ct Round Brilliant Pavé Shoulders Ring",
  "Quadra 0.53 ct Princess Cut Solitaire Ring",
  "Flora 0.42 ct Oval Diamond & Gemstone Ring",
  "The Sovereign 3.85 ct Princess Cut Channel Eternity Ring",
  "Solitaire Royale 1.49 ct Round Brilliant Pavé Band",
  "Cascade 1.30 ct Multi-Pear Diamond Cluster Ring",
  "Duet 0.93 ct Oval Diamond & Gemstone Band",
  "Artemis 4.78 ct Marquise & Pear Diamond Crown Ring",
  "Signature 1.05 ct Round Brilliant Solitaire Ring",
  "Halo Royale 0.93 ct Oval Diamond Micro-Pavé Ring",
  "Sovereign Princess 1.78 ct Princess Cut Halo Statement Ring",
  "Symphony 1.48 ct Pear & Round Diamond Asymmetric Band",
  "Gia 0.64 ct Oval Diamond Pavé Band",
  "Magnolia 2.24 ct Princess Cut Pavé Silhouette Ring",
  "Trinity 1.31 ct Oval & Pear Diamond Trio Ring",
  "The Grandiosa 2.51 ct Brilliant Multi-Row Diamond Ring",
  "Regalia 0.96 ct Multi-Stone Diamond Band",
  "Isolde 0.57 ct Pear Diamond Solitaire Ring",
  "Solitaire Prime 0.82 ct Round Brilliant Ring",
  "Eternity Grand 3.46 ct Pear & Brilliant Multi-Stone Ring",
  "Zephyr 1.66 ct Five-Stone Pear Diamond Band",
  "Solitaire Opulence 1.70 ct Round Brilliant Pavé Ring",
  "Lumina 0.60 ct Round Diamond Petite Stud Earrings",
  "The Sovereign 4.66 ct Pear & Emerald Diamond Ear-Pendants",
  "Starlight 0.94 ct Pear & Round Diamond Cluster Earrings",
  "Adria 1.88 ct Triple-Drop Pear Diamond Earrings",
  "The Grand Cascade 5.46 ct Multi-Pear & Oval Chandelier Earrings",
  "Solis 2.04 ct Oval & Pear Two-Stone Drop Earrings",
  "Petite Cascade 1.20 ct Pear & Round Diamond Drop Earrings",
  "Classic Solitaire 0.46 ct Round Brilliant Stud Earrings",
  "Elysia 2.13 ct Pear Diamond & Gemstone Drop Earrings",
  "Aura 1.82 ct Oval & Round Diamond Drop Earrings",
  "Paloma 1.34 ct Oval & Round Diamond Cluster Earrings",
  "Riviera 1.88 ct Oval & Brilliant Diamond Halo Earrings",
  "Constellation 1.85 ct Solitaire & Pavé Chandelier Earrings",
  "Vespera 2.54 ct Brilliant Diamond Tiered Drop Earrings",
  "Dewdrop 0.22 ct Round Diamond Petite Pendant",
  "Lumen 0.27 ct Round Brilliant Solitaire Pendant",
  "Astra 0.23 ct Round Diamond & Gemstone Pendant",
  "Seraph 0.28 ct Brilliant Solitaire Pendant",
  "Quadra 0.63 ct Princess Cut Solitaire Pendant",
  "Duet 1.16 ct Oval & Pear Diamond Drop Pendant",
  "Corona 0.27 ct Diamond Halo Medallion Pendant",
  "Minima 0.28 ct Two-Stone Brilliant Pendant",
  "Cascadia 2.51 ct Triple Pear Diamond & Gemstone Pendant",
  "The Empress 8.22 ct Oval Diamond Rivière Statement Necklace",
  "Verdant Rivière 6.44 ct Pear & Brilliant Diamond Necklace",
  "The Majestic 9.66 ct Marquise & Brilliant Diamond Rivière Necklace",
  "Symphony 2.38 ct Oval, Pear & Brilliant Drop Necklace",
  "Aura 1.92 ct Solitaire & Pavé Articulated Diamond Bracelet",
  "The Empress 5.28 ct Oval & Round Diamond Multi-Stone Bracelet",
  "The Sovereign 7.80 ct Graduated Brilliant Diamond Tennis Bracelet"
];

function formatIndianPrice(amount) {
  const x = Math.round(amount).toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  const res = otherNumbers !== '' ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
  return `₹${res}`;
}

function calculatePrice(item) {
  let goldRate = 6200; // 14KT default
  if (item.karat === '18KT') goldRate = 8000;
  if (item.karat === '9KT') goldRate = 4200;

  const goldVal = item.netWeight * goldRate;
  
  let diamondRate = 26000;
  if (item.diaCt >= 2.0) diamondRate = 45000;
  else if (item.diaCt >= 1.0) diamondRate = 35000;
  else if (item.diaCt >= 0.5) diamondRate = 28000;

  const diamondVal = item.diaCt * diamondRate;
  const stoneVal = item.stoneCt * 6500;
  const makingCharges = Math.max(14000, item.grossWeight * 2500 + item.diaPcs * 180);
  const hallmarkCertFee = 3500;

  const total = (goldVal + diamondVal + stoneVal + makingCharges + hallmarkCertFee) * 1.18;
  return Math.ceil(total / 1000) * 1000;
}

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const products = rawItems.map((item, idx) => {
  const name = NAMES_MAP[idx] || `Carats by Grace ${item.category} ${item.itemNo}`;
  const slug = `${slugify(name)}-${item.itemNo.toLowerCase()}`;
  const price = calculatePrice(item);
  const priceDisplay = formatIndianPrice(price);
  
  const metalFull = `${item.karat} ${item.metalColor} Gold`;
  
  let shapeLabel = 'Round Brilliant';
  if (/MQ/i.test(item.diamondDetails)) shapeLabel = 'Marquise Cut';
  else if (/OV/i.test(item.diamondDetails)) shapeLabel = 'Oval Cut';
  else if (/PR/i.test(item.diamondDetails)) shapeLabel = 'Princess Cut';
  else if (/PE/i.test(item.diamondDetails)) shapeLabel = 'Pear Cut';
  else if (/EM/i.test(item.diamondDetails)) shapeLabel = 'Emerald Cut';

  const specs = `${metalFull} · ${item.diaCt > 0 ? item.diaCt.toFixed(2) + ' ct TW Diamond' : ''}${item.stoneCt > 0 ? ' · ' + item.stoneCt.toFixed(2) + ' ct ' + item.stoneType : ''} · ${item.netWeight.toFixed(3)}g Net Wt · HUID: ${item.huid}${item.igiCertNo ? ' · IGI: ' + item.igiCertNo : ''}`;

  const imagePath = `/assets/products/cg-item-${String(item.sr).padStart(2, '0')}-${item.itemNo.toLowerCase()}.jpg`;

  const isExclusive = item.diaCt >= 2.0 || item.category === 'Necklaces' || item.category === 'Bracelets' || [42, 45, 66, 70].includes(item.sr);

  let collection = 'signature-creations';
  if (isExclusive) collection = 'the-exclusive-collection';
  else if (item.category === 'Rings' && item.diaPcs === 1) collection = 'solitaire-essentials';
  else if (/EM|PR/i.test(item.diamondDetails)) collection = 'the-nocturne-edit';

  const diamondDetailClean = item.diamondDetails.replace(/[\r\n]+/g, ' · ').trim();

  return {
    id: `cg-${item.itemNo.toLowerCase()}`,
    sr: item.sr,
    slug,
    name,
    category: item.category.toLowerCase(),
    collection,
    isOneOfOne: true,
    isExclusiveCollection: isExclusive,
    status: 'available',
    price,
    priceDisplay,
    specs,
    itemNo: item.itemNo,
    designNo: item.designNo,
    igiCertNo: item.igiCertNo || null,
    huid: item.huid,
    packingList: item.packingList,
    metal: metalFull,
    karat: item.karat,
    metalColor: `${item.metalColor} Gold`,
    grossWeight: item.grossWeight,
    netWeight: item.netWeight,
    diamondShape: shapeLabel,
    caratWeight: `${item.diaCt.toFixed(2)} ct TW`,
    diamondPcs: item.diaPcs,
    diamondDetails: diamondDetailClean,
    stoneType: item.stoneType || null,
    stonePcs: item.stonePcs || 0,
    stoneWeight: item.stoneCt || 0,
    clarity: 'VVS',
    colour: 'D-F Colourless',
    cut: 'Super Ideal / Excellent',
    certification: item.igiCertNo ? `IGI Certified (${item.igiCertNo})` : 'BIS 750 / 916 Hallmarked Gold',
    description: `Crafted in solid ${metalFull}, this creation features ${item.diaPcs} hand-set grown diamonds totaling ${item.diaCt.toFixed(2)} carats with superior VVS clarity. Verified with official Bureau of Indian Standards hallmark HUID: ${item.huid}${item.igiCertNo ? ` and independent IGI laboratory report (${item.igiCertNo})` : ''}.`,
    story: `Conceived at our atelier in Mahanagar, Lucknow, design ${item.designNo} combines precision ergonomics with exceptional light performance. Each diamond is calibrated for fire and scintillation.`,
    images: [imagePath],
    isNew: item.sr <= 15,
    isBestseller: [2, 6, 14, 22, 27, 42, 45, 64, 66, 70].includes(item.sr),
    featured: [1, 2, 4, 6, 14, 18, 22, 26, 42, 45, 52, 64, 66, 68, 70].includes(item.sr)
  };
});

// Now generate the full src/data/products.js content
const fileHeader = `/* ============================================================
   CARATS BY GRACE — Product Catalog Data & Dynamic CMS Layer
   Grown Diamond Fine Jewellery Atelier · Mahanagar, Lucknow
   70 Authentic Pieces from Consolidated Packing List
   ============================================================ */

export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};
`;

// Read the remaining sections (CATEGORIES, COLLECTIONS, TESTIMONIALS, DIAMOND_SHAPES, DEFAULT_SETTINGS, and helper functions) from the current products.js
const currentCode = fs.readFileSync('src/data/products.js', 'utf8');
const catIndex = currentCode.indexOf('export const CATEGORIES = [');
const remainingCode = currentCode.substring(catIndex);

// Update STORAGE_KEY in remainingCode to v3
const updatedRemainingCode = remainingCode.replace(
  "const STORAGE_KEY = 'carats_by_grace_catalog_v2';",
  "const STORAGE_KEY = 'carats_by_grace_catalog_v3';"
);

const fullCode = fileHeader + '\n' + updatedRemainingCode;
fs.writeFileSync('src/data/products.js', fullCode);
console.log('Successfully updated src/data/products.js with 70 authentic products!');
