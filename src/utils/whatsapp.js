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
 *
 * @param {Object} options
 * @param {'order'|'exclusive'|'bespoke'|'consultation'|'general'|'wishlist'} options.type
 * @param {string} [options.productName]
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
    productName = '',
    productUrl = typeof window !== 'undefined' ? window.location.href : '',
    specs = '',
    bespokeData = {},
    items = [],
    customMessage = '',
  } = options;

  let text = '';

  if (customMessage) {
    text = customMessage;
  } else if (type === 'order') {
    text = `Hello Carats by Grace!

I'm interested in the following jewellery design:

Design Name: ${productName || 'Signature Design'}
${specs ? `Specifications: ${specs}\n` : ''}Product Link: ${productUrl}

Please share more details regarding pricing, availability and customisation options.

Thank you!`;
  } else if (type === 'exclusive') {
    text = `Hello Carats by Grace!

I am enquiring about this exclusive one-of-one creation:

Design Name: ${productName || 'Exclusive One-of-One Piece'}
Status: One Design · One Owner · Forever Yours
Product Link: ${productUrl}

Please confirm if this exclusive creation is currently available and share the acquisition details.

Thank you!`;
  } else if (type === 'bespoke') {
    const { name, phone, preference, shape, metal, message } = bespokeData;
    text = `Hello Carats by Grace!

I would like to enquire about bespoke jewellery customisation:

${name ? `Name: ${name}\n` : ''}${phone ? `Contact: ${phone}\n` : ''}${preference ? `Jewellery Preference: ${preference}\n` : ''}${shape ? `Preferred Diamond Shape: ${shape}\n` : ''}${metal ? `Preferred Metal: ${metal}\n` : ''}${message ? `Vision / Notes: ${message}\n` : ''}
I would love to explore customising my diamond jewellery with your atelier.

Thank you!`;
  } else if (type === 'consultation') {
    text = `Hello Carats by Grace!

I would like to book a personal consultation at your flagship showroom in Mahanagar, Lucknow.

Please let me know the available time slots for a private viewing.

Thank you!`;
  } else if (type === 'wishlist') {
    const itemList = items.map((it, idx) => `${idx + 1}. ${it.name} (${it.specs || 'Grown Diamond'})`).join('\n');
    text = `Hello Carats by Grace!

I have shortlisted the following designs from your digital catalogue and would like to enquire about their pricing and availability:

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
