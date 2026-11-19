// src/pages/ProductPage.jsx
// Carats by Grace — Luxury Product Detail Page (PDP)
// Grown Diamond Fine Jewellery Atelier · Mahanagar, Lucknow
// No e-commerce · Direct WhatsApp ordering and private consultation booking

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  ShieldCheck,
  Award,
  MapPin,
  Calendar,
  CheckCircle2,
  Lock,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useWishlist } from '../context/WishlistContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getStoredProducts, getProductBySlug } from '../data/products';
import { buildWhatsAppUrl, SHOWROOM_ADDRESS, SHOWROOM_PHONE } from '../utils/whatsapp';

const PDP_CSS = `
:root {
  --white: #FFFFFF;
  --ivory: #FAF6F1;
  --burgundy: #5D0A24;
  --wine: #3D0617;
  --wine-deep: #25030E;
  --gold: #C6A15B;
  --gold-light: #E0C88F;
  --ink: #17120F;
  --muted: #7A6F70;
  --line: #E9E1D8;
  --blush: #F1E3DC;
  --serif: "Cormorant Garamond", Georgia, serif;
  --sans: "Jost", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --pad-x: clamp(20px, 5vw, 80px);
}

.pd-wrap {
  max-width: 1440px;
  margin: 0 auto;
  padding-inline: var(--pad-x);
}

.pd-crumb {
  padding-block: 22px;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.pd-crumb a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.pd-crumb a:hover {
  color: var(--burgundy);
}
.pd-crumb span {
  color: var(--line);
}

.pd-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(32px, 5vw, 72px);
  padding-bottom: clamp(60px, 8vw, 100px);
  align-items: start;
}

/* Gallery */
.pd-gallery {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  align-items: start;
}
.pd-thumbs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 96px;
}
.pd-thumb {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: var(--blush);
  border: 1px solid transparent;
  padding: 0;
  cursor: pointer;
  transition: border-color 0.25s ease;
  border-radius: 2px;
}
.pd-thumb.is-active {
  border-color: var(--burgundy);
}
.pd-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pd-stage {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: var(--blush);
  cursor: zoom-in;
  user-select: none;
  border-radius: 3px;
}
.pd-stage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
  transform-origin: center;
}
.pd-stage.is-zoomed img {
  transition: transform 0.1s linear;
}
.pd-stage__zoom {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(250, 246, 241, 0.94);
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  color: var(--ink);
  pointer-events: none;
}
.pd-dots {
  display: none;
  justify-content: center;
  gap: 6px;
  padding-top: 14px;
}
.pd-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--line);
  transition: all 0.25s ease;
  border: none;
  padding: 0;
}
.pd-dot.is-active {
  background: var(--burgundy);
  width: 20px;
}

/* Info Column */
.pd-info {
  position: sticky;
  top: 96px;
}

.pd-badge-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.pd-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.64rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
}
.pd-badge--one {
  background: var(--burgundy);
  color: #FFF;
}
.pd-badge--sold {
  background: #25030E;
  color: #E0C88F;
  border: 1px solid #E0C88F;
}
.pd-badge--cert {
  background: rgba(198, 161, 91, 0.15);
  color: var(--burgundy);
  border: 1px solid rgba(198, 161, 91, 0.4);
}

.pd-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
}
.pd-title {
  font-family: var(--serif);
  font-size: clamp(2rem, 3.4vw, 2.7rem);
  font-weight: 400;
  line-height: 1.12;
  color: var(--ink);
  margin: 0 0 10px;
}
.pd-subtitle {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 20px;
}

/* Specs Matrix */
.pd-specs-card {
  background: var(--ivory);
  border: 1px solid var(--line);
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 24px;
}
.pd-specs-title {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--burgundy);
  font-weight: 600;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pd-specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 18px;
}
.pd-spec-item {
  display: flex;
  flex-direction: column;
}
.pd-spec-label {
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 2px;
}
.pd-spec-val {
  font-size: 0.86rem;
  color: var(--ink);
  font-weight: 500;
}

/* CTAs */
.pd-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}
.pd-btn-wa {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  background: var(--burgundy);
  color: #FAF6F1;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.25s ease;
  border: 1px solid var(--burgundy);
  cursor: pointer;
  width: 100%;
}
.pd-btn-wa:hover {
  background: var(--wine);
  color: #FFF;
}
.pd-btn-wa.is-disabled {
  background: #EAE3DA;
  color: #9C948F;
  border-color: #EAE3DA;
  cursor: not-allowed;
}

.pd-secondary-row {
  display: grid;
  grid-template-columns: 1fr 52px;
  gap: 10px;
}
.pd-btn-visit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--ink);
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.25s ease;
}
.pd-btn-visit:hover {
  background: var(--ink);
  color: var(--ivory);
}

.pd-btn-wish {
  min-height: 48px;
  width: 52px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  background: var(--white);
  color: var(--ink);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.pd-btn-wish:hover,
.pd-btn-wish.is-saved {
  border-color: var(--burgundy);
  color: var(--burgundy);
}

/* Trust Pill Strip */
.pd-trust-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding-block: 16px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 24px;
}
.pd-trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.04em;
}
.pd-trust-item svg {
  color: var(--gold);
}

/* Accordions */
.pd-accordion {
  border-bottom: 1px solid var(--line);
}
.pd-acc-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  background: none;
  border: none;
  font-family: var(--serif);
  font-size: 1.1rem;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
}
.pd-acc-trigger:hover {
  color: var(--burgundy);
}
.pd-acc-body {
  overflow: hidden;
  transition: max-height 0.3s ease;
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.65;
  padding-bottom: 16px;
}
.pd-acc-body ul {
  margin: 0;
  padding-left: 20px;
}

@media (max-width: 1024px) {
  .pd-layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .pd-info {
    position: static;
  }
  .pd-gallery {
    grid-template-columns: 1fr;
  }
  .pd-thumbs {
    display: none;
  }
  .pd-dots {
    display: flex;
  }
}
`;

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef(null);

  return (
    <div className="pd-accordion">
      <button
        className="pd-acc-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type="button"
      >
        <span>{title}</span>
        <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="pd-acc-body"
        ref={bodyRef}
        style={{
          maxHeight: open ? `${bodyRef.current?.scrollHeight || 400}px` : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const allProducts = useMemo(() => getStoredProducts(), []);
  const product = useMemo(() => {
    return (
      getProductBySlug(slug) ||
      allProducts.find((p) => p.slug === slug || p.id === slug) ||
      allProducts[0]
    );
  }, [slug, allProducts]);

  useDocumentTitle(product ? `${product.name} | Carats by Grace` : 'Jewellery Piece');

  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const stageRef = useRef(null);

  const images = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    if (product.img) return [product.img, product.hover].filter(Boolean);
    return ['/assets/model1/m1_8252_final.webp'];
  }, [product]);

  const saved = isWishlisted(product.name);
  const isOneOfOne = Boolean(
    product.isOneOfOne ||
    product.collection === 'exclusive-designs' ||
    product.isExclusiveCollection ||
    product.collection === 'the-exclusive-collection'
  );
  const isSold = product.status === 'sold';

  // Handle zoom cursor move
  const handleMouseMove = (e) => {
    if (!zoomed || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleWhatsAppOrder = () => {
    if (isSold) {
      // Direct bespoke enquiry for similar
      const bespokeUrl = buildWhatsAppUrl({
        type: 'bespoke',
        details: {
          style: `Inquiry regarding sold piece: "${product.name}". Would love to discuss a bespoke creation inspired by this aesthetic.`,
        },
      });
      window.open(bespokeUrl, '_blank');
      return;
    }

    const orderUrl = buildWhatsAppUrl({
      type: 'order',
      product: {
        name: product.name,
        slug: product.slug || product.id,
        specs: product.specs,
      },
    });
    window.open(orderUrl, '_blank');
  };

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <style>{PDP_CSS}</style>

      {/* Breadcrumb Navigation */}
      <div className="pd-wrap pd-crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/collections">Collections</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link to={`/collections/${product.category.toLowerCase()}`}>
              {product.category}
            </Link>
            <span>/</span>
          </>
        )}
        <span style={{ color: 'var(--ink)' }}>{product.name}</span>
      </div>

      <div className="pd-wrap pd-layout">
        {/* ── Left Gallery ── */}
        <div className="pd-gallery" aria-label="Product photography gallery">
          <div className="pd-thumbs">
            {images.map((src, i) => (
              <button
                key={src + i}
                className={`pd-thumb ${i === activeImg ? 'is-active' : ''}`}
                onClick={() => setActiveImg(i)}
                aria-label={`View angle ${i + 1}`}
                type="button"
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>

          <div>
            <div
              ref={stageRef}
              className={`pd-stage ${zoomed ? 'is-zoomed' : ''}`}
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => {
                setZoomed(false);
                setZoomPos({ x: 50, y: 50 });
              }}
              onMouseMove={handleMouseMove}
              role="region"
              aria-label="High resolution photography viewer"
            >
              <img
                src={images[activeImg] || images[0]}
                alt={`${product.name} — Fine grown diamond jewellery`}
                style={{
                  transform: zoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              />
              <span className="pd-stage__zoom" aria-hidden="true">
                <ZoomIn size={16} />
              </span>
            </div>

            <div className="pd-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`pd-dot ${i === activeImg ? 'is-active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Details & WhatsApp Order ── */}
        <div className="pd-info">
          {/* Status & Exclusivity Badges */}
          <div className="pd-badge-row">
            {isOneOfOne && (
              <span className="pd-badge pd-badge--one">
                Exclusive · 1-of-1
              </span>
            )}
            {isSold ? (
              <span className="pd-badge pd-badge--sold">
                <Lock size={11} />
                Sold · Never Recreated
              </span>
            ) : (
              <span className="pd-badge pd-badge--cert">
                <Award size={11} />
                IGI Certified
              </span>
            )}
            <span style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
              Mahanagar Atelier
            </span>
          </div>

          <span className="pd-eyebrow">
            {product.category || 'Fine Jewellery'} · {isOneOfOne ? 'Exclusive Masterpiece' : 'Signature Collection'}
          </span>
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-subtitle">
            {product.description ||
              'A celebration of contemporary diamond artistry, crafted in Lucknow with certified grown diamonds.'}
          </p>

          {/* Sold Notice or One of One Guarantee */}
          {isOneOfOne && (
            <div
              style={{
                background: isSold ? '#25030E' : 'rgba(93, 10, 36, 0.05)',
                color: isSold ? '#FAF6F1' : 'var(--burgundy)',
                border: `1px solid ${isSold ? 'rgba(198, 161, 91, 0.4)' : 'rgba(93, 10, 36, 0.2)'}`,
                padding: '14px 18px',
                borderRadius: 2,
                fontSize: '0.82rem',
                lineHeight: 1.55,
                marginBottom: 24,
              }}
            >
              <div style={{ fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.72rem', color: 'var(--gold)', marginBottom: 4 }}>
                {isSold ? 'Designs That Never Repeat — Archived' : 'One Design. One Owner. Forever Yours.'}
              </div>
              <div>
                {isSold
                  ? 'This singular creation has found its owner and will never be recreated. However, our master craftsmen can design a unique bespoke piece tailored to your personal aesthetic.'
                  : 'This exclusive creation follows our philosophy of no repeats. Designed for a single owner, it will never be recreated once acquired.'}
              </div>
            </div>
          )}

          {/* Diamond Specifications Matrix (Part 3 requirement) */}
          <div className="pd-specs-card">
            <h3 className="pd-specs-title">
              <ShieldCheck size={14} />
              Diamond &amp; Atelier Specifications
            </h3>
            <div className="pd-specs-grid">
              {product.itemNo && (
                <div className="pd-spec-item">
                  <span className="pd-spec-label">Item No / SKU</span>
                  <span className="pd-spec-val">{product.itemNo}</span>
                </div>
              )}
              {product.designNo && (
                <div className="pd-spec-item">
                  <span className="pd-spec-label">Design Code</span>
                  <span className="pd-spec-val">{product.designNo}</span>
                </div>
              )}
              {product.huid && (
                <div className="pd-spec-item">
                  <span className="pd-spec-label">BIS Hallmark (HUID)</span>
                  <span className="pd-spec-val" style={{ color: 'var(--burgundy)', fontWeight: 600 }}>{product.huid}</span>
                </div>
              )}
              <div className="pd-spec-item">
                <span className="pd-spec-label">Certification</span>
                <span className="pd-spec-val">{product.certification || 'IGI Certified Diamond'}</span>
              </div>
              <div className="pd-spec-item">
                <span className="pd-spec-label">Precious Metal</span>
                <span className="pd-spec-val">{product.metal || '18K Hallmarked Gold'}</span>
              </div>
              {product.netWeight > 0 && (
                <div className="pd-spec-item">
                  <span className="pd-spec-label">Gold Net Weight</span>
                  <span className="pd-spec-val">{Number(product.netWeight).toFixed(3)} g (Gross: {Number(product.grossWeight).toFixed(3)}g)</span>
                </div>
              )}
              <div className="pd-spec-item">
                <span className="pd-spec-label">Diamond Weight</span>
                <span className="pd-spec-val">{product.caratWeight || 'VVS Grown Diamonds'}</span>
              </div>
              {product.diamondPcs > 0 && (
                <div className="pd-spec-item">
                  <span className="pd-spec-label">Diamond Pieces</span>
                  <span className="pd-spec-val">{product.diamondPcs} pcs</span>
                </div>
              )}
              <div className="pd-spec-item">
                <span className="pd-spec-label">Diamond Shape &amp; Cut</span>
                <span className="pd-spec-val">{product.diamondShape || 'Round Brilliant'}</span>
              </div>
              <div className="pd-spec-item">
                <span className="pd-spec-label">Clarity &amp; Colour</span>
                <span className="pd-spec-val">{product.clarity || 'VVS'} · {product.colour || 'D–F Colourless'}</span>
              </div>
              {product.stoneType && (
                <div className="pd-spec-item" style={{ gridColumn: 'span 2' }}>
                  <span className="pd-spec-label">Gemstone Accents</span>
                  <span className="pd-spec-val">{product.stonePcs} pcs · {product.stoneWeight} ct {product.stoneType}</span>
                </div>
              )}
              {product.diamondDetails && (
                <div className="pd-spec-item" style={{ gridColumn: 'span 2' }}>
                  <span className="pd-spec-label">Detailed Stone Lines</span>
                  <span className="pd-spec-val" style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.45 }}>{product.diamondDetails}</span>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Direct Ordering & Enquiries (Strictly No E-commerce) */}
          <div className="pd-actions">
            <button
              className="pd-btn-wa"
              onClick={handleWhatsAppOrder}
              type="button"
            >
              <MessageCircle size={18} />
              <span>
                {isSold
                  ? 'Enquire About Bespoke Creation'
                  : 'Order via WhatsApp'}
              </span>
            </button>

            <div className="pd-secondary-row">
              <Link to="/contact" className="pd-btn-visit">
                <Calendar size={16} />
                <span>Book Showroom Visit</span>
              </Link>

              <button
                className={`pd-btn-wish ${saved ? 'is-saved' : ''}`}
                onClick={() =>
                  toggleWishlist({
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    specs: product.specs,
                    img: images[0],
                  })
                }
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                type="button"
              >
                <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="pd-trust-row">
            <div className="pd-trust-item">
              <Award size={18} />
              <span>IGI Certified Grown Diamonds</span>
            </div>
            <div className="pd-trust-item">
              <ShieldCheck size={18} />
              <span>BIS 750 Hallmarked Gold</span>
            </div>
            <div className="pd-trust-item">
              <MapPin size={18} />
              <span>Mahanagar, Lucknow Atelier</span>
            </div>
          </div>

          {/* Editorial Accordions */}
          <div>
            <Accordion title="Design Details & Craftsmanship" defaultOpen={true}>
              <p style={{ margin: '0 0 10px' }}>
                {product.description ||
                  'Each piece from Carats by Grace is conceived with architectural balance, high-precision prong settings, and hand-finished comfort bands.'}
              </p>
              <ul>
                <li>Individual hand-finishing by master artisans.</li>
                <li>Precision micro-pave and secure solitaire claws for maximum brilliance.</li>
                <li>Custom engraving and tailored sizing available upon enquiry.</li>
              </ul>
            </Accordion>

            <Accordion title="Exceptional Diamond Quality & 4Cs">
              <p style={{ margin: '0 0 10px' }}>
                We curate exclusively high-clarity grown diamonds (predominantly VVS grade) possessing the identical chemical, optical, and physical lattice structure of mined diamonds.
              </p>
              <ul>
                <li><strong>Cut:</strong> Precision-angled facets designed to maximize scintillation and fire.</li>
                <li><strong>Clarity:</strong> VVS grade diamonds with inclusions invisible under 10x magnification.</li>
                <li><strong>Color:</strong> Exceptional colourless spectrum (D, E, F) and select fancy hues.</li>
                <li><strong>Carat:</strong> Ethical, conscious scale without traditional mined compromises.</li>
              </ul>
            </Accordion>

            <Accordion title="Showroom Consultation & Ordering Process">
              <p style={{ margin: '0 0 10px' }}>
                We do not operate impersonal cart checkouts. Every commission is a bespoke relationship:
              </p>
              <ul>
                <li><strong>1. WhatsApp Enquiry:</strong> Connect directly with our founding gemologists in Lucknow to receive video walk-throughs and diamond certificates.</li>
                <li><strong>2. Private Salon Viewing:</strong> Visit our flagship atelier in Mahanagar, Lucknow for personal inspection under natural light.</li>
                <li><strong>3. Customization & Delivery:</strong> Choose your exact carat, gold karatage, and ring size with insured personal delivery.</li>
              </ul>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
}
