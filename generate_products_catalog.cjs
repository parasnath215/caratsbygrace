const fs = require('fs');

const rawItems = JSON.parse(fs.readFileSync('all_packing_items.json', 'utf8'));

// Helper for title casing
function titleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// Shape code mapping
const SHAPE_MAP = {
  MQ: 'Marquise Cut',
  OV: 'Oval Cut',
  RB: 'Round Brilliant',
  PR: 'Princess Cut',
  PE: 'Pear Cut',
  EM: 'Emerald Cut',
  CPE: 'Pear Cut',
  CS: 'Colour Stone',
  LS: 'Lab-Grown Gemstone'
};

// Generate an elegant, luxury product name based on category, diamond details, and design
function generateProductName(item) {
  const { category, diaCt, diamondDetails, designNo, stoneType, stoneCt, karat, metalColor } = item;
  
  // Extract primary shape
  let shape = 'Diamond';
  if (/MQ/i.test(diamondDetails)) shape = 'Marquise Diamond';
  else if (/OV/i.test(diamondDetails)) shape = 'Oval Diamond';
  else if (/PR/i.test(diamondDetails)) shape = 'Princess Cut Diamond';
  else if (/PE/i.test(diamondDetails)) shape = 'Pear-Shaped Diamond';
  else if (/EM/i.test(diamondDetails)) shape = 'Emerald-Cut Diamond';
  else if (/RB/i.test(diamondDetails)) shape = 'Brilliant Diamond';

  const ctStr = diaCt > 0 ? `${diaCt.toFixed(2)} ct ` : '';
  const stoneStr = stoneType ? `with ${stoneType}` : '';

  if (category === 'Rings') {
    if (diaCt >= 2.0) return `The Sovereign ${ctStr}${shape} Solitaire Ring`;
    if (diaCt >= 1.0) return `Aria ${ctStr}${shape} Solitaire Ring`;
    if (designNo.includes('HALO') || item.diaPcs > 15) return `Elysian ${ctStr}${shape} Halo Pavé Ring`;
    if (item.diaPcs >= 5 && item.diaPcs <= 9) return `Serena ${ctStr}${shape} Five-Stone Band`;
    if (item.diaPcs === 1) return `Celeste Petite ${ctStr}${shape} Solitaire Ring`;
    return `Ophelia ${ctStr}${shape} Atelier Ring`;
  }
  
  if (category === 'Earrings') {
    if (diaCt >= 3.0) return `Kavya ${ctStr}${shape} Sovereign Ear-Pendants`;
    if (diaCt >= 1.5) return `Solis ${ctStr}${shape} Cascading Drop Earrings`;
    if (item.diaPcs <= 4) return `Lumina ${ctStr}${shape} Solitaire Stud Earrings`;
    return `Vespera ${ctStr}${shape} Halo Cluster Earrings`;
  }
  
  if (category === 'Pendants') {
    if (item.diaPcs === 1) return `Pure Light ${ctStr}${shape} Solitaire Pendant`;
    if (stoneType) return `Astraea ${ctStr}${shape} & Gemstone Pendant`;
    return `Caelum ${ctStr}${shape} Halo Pendant`;
  }
  
  if (category === 'Necklaces') {
    if (diaCt >= 6.0) return `The Empress ${ctStr}${shape} Statement Rivière Necklace`;
    return `Seraphina ${ctStr}${shape} Articulated Collar Necklace`;
  }
  
  if (category === 'Bracelets') {
    if (diaCt >= 5.0) return `Sitara ${ctStr}${shape} Sovereign Tennis Bracelet`;
    return `Aurora ${ctStr}${shape} Articulated Diamond Bracelet`;
  }

  return `Carats by Grace ${ctStr}${shape} ${category.slice(0, -1)}`;
}

// Generate an Indian format price
function formatIndianPrice(amount) {
  const x = Math.round(amount).toString();
  const lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  const res = otherNumbers !== '' ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree : lastThree;
  return `₹${res}`;
}

// Estimate luxury retail price based on gold + diamond ct + making charges
function calculatePrice(item) {
  let goldRate = 6200; // 14KT default
  if (item.karat === '18KT') goldRate = 8000;
  if (item.karat === '9KT') goldRate = 4200;

  const goldVal = item.netWeight * goldRate;
  
  // Diamond valuation: higher per-carat for larger stones
  let diamondRate = 26000;
  if (item.diaCt >= 2.0) diamondRate = 45000;
  else if (item.diaCt >= 1.0) diamondRate = 35000;
  else if (item.diaCt >= 0.5) diamondRate = 28000;

  const diamondVal = item.diaCt * diamondRate;
  const stoneVal = item.stoneCt * 6500;
  const makingCharges = Math.max(14000, item.grossWeight * 2500 + item.diaPcs * 180);
  const hallmarkCertFee = 3500;

  const total = (goldVal + diamondVal + stoneVal + makingCharges + hallmarkCertFee) * 1.18; // atelier factor
  // Round to nearest 1,000
  return Math.ceil(total / 1000) * 1000;
}

// Generate slug
function generateSlug(name, itemNo) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${itemNo.toLowerCase()}`;
}

const products = rawItems.map((item, idx) => {
  const name = generateProductName(item);
  const slug = generateSlug(name, item.itemNo);
  const price = calculatePrice(item);
  const priceDisplay = formatIndianPrice(price);
  
  const metalFull = `${item.karat} ${item.metalColor} Gold`;
  
  // Primary shape extraction for filters
  let shapeLabel = 'Round Brilliant';
  if (/MQ/i.test(item.diamondDetails)) shapeLabel = 'Marquise';
  else if (/OV/i.test(item.diamondDetails)) shapeLabel = 'Oval';
  else if (/PR/i.test(item.diamondDetails)) shapeLabel = 'Princess';
  else if (/PE/i.test(item.diamondDetails)) shapeLabel = 'Pear';
  else if (/EM/i.test(item.diamondDetails)) shapeLabel = 'Emerald';

  const specs = `${metalFull} · ${item.diaCt.toFixed(2)} ct TW Diamond · ${item.netWeight.toFixed(3)}g Net Wt · HUID: ${item.huid}${item.igiCertNo ? ' · IGI: ' + item.igiCertNo : ''}`;

  const imagePath = `/assets/products/cg-item-${String(item.sr).padStart(2, '0')}-${item.itemNo.toLowerCase()}.jpg`;

  const isExclusive = item.diaCt >= 1.5 || item.category === 'Necklaces' || item.category === 'Bracelets';

  let collection = 'signature-creations';
  if (isExclusive) collection = 'the-exclusive-collection';
  else if (item.category === 'Rings' && item.diaPcs === 1) collection = 'solitaire-essentials';
  else if (/EM|PR/i.test(item.diamondDetails)) collection = 'the-nocturne-edit';

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
    diamondDetails: item.diamondDetails.replace(/\r\n/g, ' · '),
    stoneType: item.stoneType || null,
    stonePcs: item.stonePcs || 0,
    stoneWeight: item.stoneCt || 0,
    clarity: 'VVS',
    colour: 'D-F Colourless',
    cut: 'Super Ideal / Excellent',
    certification: item.igiCertNo ? `IGI Certified (${item.igiCertNo})` : 'BIS Hallmarked Gold',
    description: `Crafted in solid ${metalFull}, this creation features ${item.diaPcs} hand-set grown diamonds totaling ${item.diaCt.toFixed(2)} carats with superior VVS clarity. Verified with official BIS Hallmark HUID: ${item.huid}${item.igiCertNo ? ` and independent IGI certification (${item.igiCertNo})` : ''}.`,
    story: `Conceived at our atelier in Mahanagar, Lucknow, design ${item.designNo} combines precision ergonomics with exceptional light performance. Each diamond is calibrated for fire and scintillation.`,
    images: [imagePath],
    isNew: item.sr <= 15,
    isBestseller: item.sr % 7 === 0,
    featured: [1, 2, 4, 6, 14, 18, 22, 26, 42, 45, 52, 64, 66, 68, 70].includes(item.sr)
  };
});

console.log('Generated products count:', products.length);
console.log('Sample product 1:', products[0]);
console.log('Sample product 42:', products[41]);
console.log('Sample product 64:', products[63]);

fs.writeFileSync('generated_catalog.json', JSON.stringify(products, null, 2));
