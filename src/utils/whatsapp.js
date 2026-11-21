// src/utils/whatsapp.js
// Carats by Grace — Official WhatsApp Integration & Message Formatter

export const WHATSAPP_NUMBER = '919120530531';
export const SHOWROOM_PHONE = '+91 91205 30531';
export const SHOWROOM_ADDRESS = 'Mahanagar, Lucknow, Uttar Pradesh';
export const SHOWROOM_HOURS = 'Monday – Saturday · 11:00 AM – 8:00 PM';
export const GOOGLE_MAPS_LINK = 'https://share.google/FkH78O9JeWQrn62Ik';
export const INSTAGRAM_LINK = 'https://www.instagram.com/caratsbygrace/';

/**
 * Builds an official URL-encoded WhatsApp link with brand-standard pre-filled copy.
 * Keeps inventory IDs (Product ID, Item No, Design No, HUID) intact in the background
 * preformatted WhatsApp enquiry message to the atelier owner.
 *
 * @param {Object} options
 * @param {'order'|'exclusive'|'bespoke'|'consultation'|'general'|'wishlist'} [options.type='general']
 * @param {Object} [options.product] - Full product entity containing background IDs
 * @param {string} [options.productName]
 * @param {string} [options.productId]
 * @param {string} [options.itemNo]
 * @param {string} [options.designNo]
 * @param {string} [options.huid]
 * @param {string} [options.productUrl]
 * @param {string} [options.specs]
 * @param {Object} [options.bespokeData] - { shape, metal, preference, message, name, phone }
 * @param {Array} [options.items] - For wishlist multi-enquiry
 * @param {string} [options.customMessage]
 * @returns {string} WhatsApp web/app URL
 */
export function buildWhatsAppUrl(options = {}) {
  const {
    type = 'general',
    product,
    productName = '',
    productUrl = typeof window !== 'undefined' ? window.location.href : '',
    specs = '',
    bespokeData = {},
    items = [],
    customMessage = '',
  } = options;

  const productObj = product || {};
  const resolvedName = productName || productObj.name || 'Signature Design';
  const resolvedId = options.productId || options.id || productObj.id || '';
  const resolvedItemNo = options.itemNo || productObj.itemNo || '';
  const resolvedDesignNo = options.designNo || productObj.designNo || '';
  const resolvedHuid = options.huid || productObj.huid || '';
  const resolvedMetal = options.metal || productObj.metal || '';
  const resolvedCarat = options.caratWeight || productObj.caratWeight || '';
  const resolvedSpecs =
    specs ||
    productObj.specs ||
    (resolvedMetal && resolvedCarat ? `${resolvedMetal} · ${resolvedCarat}` : resolvedMetal || resolvedCarat || '');

  let text = '';

  if (customMessage) {
    text = customMessage;
  } else if (type === 'order' || type === 'exclusive' || type === 'product') {
    const isExcl =
      type === 'exclusive' ||
      Boolean(
        productObj.isOneOfOne ||
        productObj.collection === 'exclusive-designs' ||
        productObj.isExclusiveCollection ||
        productObj.collection === 'the-exclusive-collection'
      );

    const lines = [
      'Hello Carats by Grace!',
      '',
      isExcl
        ? 'I am enquiring about this exclusive one-of-one creation:'
        : 'I am interested in enquiring about this jewellery design:',
      '',
      `Design: ${resolvedName}`,
    ];

    if (resolvedId) lines.push(`Product ID: ${resolvedId}`);
    if (resolvedItemNo) lines.push(`Item No: ${resolvedItemNo}`);
    if (resolvedDesignNo) lines.push(`Design Code: ${resolvedDesignNo}`);
    if (resolvedHuid) lines.push(`BIS Hallmark (HUID): ${resolvedHuid}`);
    if (resolvedSpecs) lines.push(`Specifications: ${resolvedSpecs}`);
    if (productUrl) lines.push(`Product Link: ${productUrl}`);

    lines.push('');
    lines.push(
      isExcl
        ? 'Please confirm if this exclusive creation is currently available and share the private viewing details.'
        : 'Please share further details regarding private viewing and availability.'
    );
    lines.push('');
    lines.push('Thank you!');
    text = lines.join('\n');
  } else if (type === 'bespoke') {
    const { name, phone, preference, shape, metal, message, details } = bespokeData || {};
    const bespokeDetails = details || options.details || {};
    const styleNote = bespokeDetails.style || message || '';

    const lines = [
      'Hello Carats by Grace!',
      '',
      'I would like to enquire about bespoke jewellery customisation:',
      '',
    ];

    if (name) lines.push(`Name: ${name}`);
    if (phone) lines.push(`Contact: ${phone}`);
    if (preference) lines.push(`Jewellery Preference: ${preference}`);
    if (shape) lines.push(`Preferred Diamond Shape: ${shape}`);
    if (metal) lines.push(`Preferred Metal: ${metal}`);
    if (styleNote) lines.push(`Vision / Notes: ${styleNote}`);
    if (resolvedId) lines.push(`Reference Product ID: ${resolvedId}`);
    if (resolvedItemNo) lines.push(`Reference Item No: ${resolvedItemNo}`);
    if (productUrl) lines.push(`Reference Link: ${productUrl}`);

    lines.push('');
    lines.push('I would love to explore customising fine jewellery with your atelier.');
    lines.push('');
    lines.push('Thank you!');
    text = lines.join('\n');
  } else if (type === 'consultation') {
    text = `Hello Carats by Grace!

I would like to book a personal consultation at your flagship showroom in Mahanagar, Lucknow.

Please let me know the available time slots for a private viewing.

Thank you!`;
  } else if (type === 'wishlist') {
    const itemList = items
      .map((it, idx) => {
        const itemSpecs = it.spec || it.specs || it.metal || 'Grown Diamond';
        const itemCode = it.itemNo ? ` · SKU: ${it.itemNo}` : (it.id ? ` · ID: ${it.id}` : '');
        return `${idx + 1}. ${it.name} (${itemSpecs}${itemCode})`;
      })
      .join('\n');

    text = `Hello Carats by Grace!

I have shortlisted the following designs from your digital catalogue and would like to enquire about availability and a private viewing:

${itemList || 'Shortlisted items'}

Thank you!`;
  } else {
    text = `Hello Carats by Grace!

I am exploring your grown diamond fine jewellery collection and would like to connect with your concierge for details regarding your designs.

Thank you!`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Direct helper to open WhatsApp in a new window/tab
 */
export function openWhatsApp(options = {}) {
  const url = buildWhatsAppUrl(options);
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
}
