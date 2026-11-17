// src/components/product/ProductQuickViewModal.jsx
// Carats by Grace — Product Quick View & Direct WhatsApp Enquiry Modal
// Digital Jewellery Catalogue & Showroom Viewing · Mahanagar, Lucknow

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MessageCircle, ShieldCheck, Award, Lock, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const MODAL_CSS = `
:root {
  --pq-white: #FFFFFF;
  --pq-ivory: #FAF6F1;
  --pq-burgundy: #5D0A24;
  --pq-wine: #3D0617;
  --pq-gold: #C6A15B;
  --pq-ink: #17120F;
  --pq-muted: #7A6F70;
  --pq-line: #E9E1D8;
  --pq-blush: #F1E3DC;
  --pq-serif: "Cormorant Garamond", Georgia, serif;
  --pq-sans: "Jost", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --pq-ease: cubic-bezier(.22, .61, .36, 1);
}

.pq-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(23, 18, 15, 0.68);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 120;
  display: grid;
  place-items: center;
  padding: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s var(--pq-ease);
}
.pq-backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

.pq-panel {
  background: var(--pq-white);
  width: min(840px, 100%);
  max-height: 90vh;
  border-radius: 4px;
  box-shadow: 0 30px 70px rgba(23, 18, 15, 0.4);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  font-family: var(--pq-sans);
  color: var(--pq-ink);
  transform: scale(0.96) translateY(12px);
  transition: all 0.35s var(--pq-ease);
}
.pq-backdrop.is-open .pq-panel {
  transform: scale(1) translateY(0);
}

.pq-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(250, 246, 241, 0.95);
  border: 1px solid var(--pq-line);
  display: grid;
  place-items: center;
  color: var(--pq-ink);
  cursor: pointer;
  transition: all 0.25s var(--pq-ease);
}
.pq-close:hover {
  background: var(--pq-burgundy);
  color: #FFF;
  border-color: var(--pq-burgundy);
}

.pq-scroll {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0;
  max-height: 90vh;
}

.pq-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  min-height: 480px;
}

/* Left Media Column */
.pq-media-col {
  background: var(--pq-ivory);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--pq-line);
}
.pq-img-wrap {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: var(--pq-blush);
  border-radius: 2px;
}
.pq-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--pq-ease);
}
.pq-img-wrap:hover img {
  transform: scale(1.04);
}

.pq-badge-wrap {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
}
.pq-badge {
  background: var(--pq-burgundy);
  color: #FAF6F1;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.pq-badge--sold {
  background: #25030E;
  color: #E0C88F;
  border: 1px solid #E0C88F;
}

/* Right Info Column */
.pq-info-col {
  padding: 32px 32px 28px;
  display: flex;
  flex-direction: column;
}
.pq-eyebrow {
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--pq-muted);
  margin-bottom: 6px;
  font-weight: 500;
}
.pq-title {
  font-family: var(--pq-serif);
  font-size: clamp(1.6rem, 2.6vw, 2.1rem);
  font-weight: 400;
  margin: 0 0 8px;
  line-height: 1.15;
  color: var(--pq-ink);
}
.pq-desc {
  font-size: 0.84rem;
  color: var(--pq-muted);
  line-height: 1.55;
  margin: 0 0 18px;
}

/* Specs Box */
.pq-specs {
  background: var(--pq-ivory);
  border: 1px solid var(--pq-line);
  padding: 14px 16px;
  border-radius: 2px;
  margin-bottom: 22px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 12px;
  font-size: 0.78rem;
}
.pq-spec-item {
  display: flex;
  flex-direction: column;
}
.pq-spec-k {
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--pq-muted);
}
.pq-spec-v {
  font-weight: 500;
  color: var(--pq-ink);
}

/* Actions */
.pq-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pq-btn-wa {
  min-height: 48px;
  width: 100%;
  background: var(--pq-burgundy);
  color: #FAF6F1;
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  border: 1px solid var(--pq-burgundy);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 2px;
  transition: background 0.25s var(--pq-ease);
  text-decoration: none;
}
.pq-btn-wa:hover {
  background: var(--pq-wine);
}
.pq-btn-link {
  min-height: 44px;
  width: 100%;
  background: transparent;
  color: var(--pq-ink);
  border: 1px solid var(--pq-line);
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 2px;
  transition: all 0.25s;
}
.pq-btn-link:hover {
  border-color: var(--pq-ink);
  background: var(--pq-ivory);
}

@media (max-width: 700px) {
  .pq-grid {
    grid-template-columns: 1fr;
  }
  .pq-media-col {
    padding: 20px;
  }
  .pq-info-col {
    padding: 20px;
  }
}
`;

export default function ProductQuickViewModal({ product, isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isOneOfOne = Boolean(product.isOneOfOne || product.collection === 'exclusive-designs');
  const isSold = product.status === 'sold';

  const imgSrc =
    product.images?.[0] ||
    product.img ||
    '/assets/model1/m1_8252_final.webp';

  const handleWhatsAppOrder = () => {
    if (isSold) {
      const bespokeUrl = buildWhatsAppUrl({
        type: 'bespoke',
        details: {
          style: `Inquiry regarding archived one-of-one design: "${product.name}". Interested in bespoke similar commission.`,
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

  const handleViewFullPage = () => {
    onClose();
    const targetSlug = product.slug || product.id;
    navigate(`/products/${targetSlug}`);
  };

  return (
    <div
      className={`pq-backdrop ${isOpen ? 'is-open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <style>{MODAL_CSS}</style>

      <div className="pq-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="pq-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <X size={18} />
        </button>

        <div className="pq-scroll">
          <div className="pq-grid">
            {/* Left Media */}
            <div className="pq-media-col">
              <div className="pq-img-wrap">
                <img src={imgSrc} alt={product.name} />
                <div className="pq-badge-wrap">
                  {(isOneOfOne || product.isExclusiveCollection || product.collection === 'the-exclusive-collection') && (
                    <span className="pq-badge" style={{ background: 'var(--pq-burgundy)', color: '#FAF6F1', border: '1px solid rgba(198, 161, 91, 0.45)' }}>
                      Exclusive · 1-of-1
                    </span>
                  )}
                  {isSold && (
                    <span className="pq-badge pq-badge--sold" style={{ background: '#25030E', color: '#E0C88F', border: '1px solid #E0C88F' }}>
                      <Lock size={10} />
                      Found Its Home
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 14, fontSize: '0.72rem', color: 'var(--pq-muted)', justifyContent: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Award size={13} style={{ color: 'var(--pq-gold)' }} />
                  IGI Certified
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ShieldCheck size={13} style={{ color: 'var(--pq-gold)' }} />
                  100% Grown Diamond
                </span>
              </div>
            </div>

            {/* Right Info */}
            <div className="pq-info-col">
              <span className="pq-eyebrow">
                {product.category || 'Fine Jewellery'} · {isOneOfOne ? 'Exclusive Masterpiece' : 'Signature Collection'}
              </span>
              <h2 className="pq-title">{product.name}</h2>
              <p className="pq-desc">
                {product.description ||
                  product.specs ||
                  'Crafted with hand-selected VVS clarity lab-grown diamonds in our Mahanagar atelier.'}
              </p>

              {/* Diamond Specs Matrix */}
              <div className="pq-specs">
                <div className="pq-spec-item">
                  <span className="pq-spec-k">Diamond Shape</span>
                  <span className="pq-spec-v">{product.diamondShape || 'Round Brilliant'}</span>
                </div>
                <div className="pq-spec-item">
                  <span className="pq-spec-k">Carat Weight</span>
                  <span className="pq-spec-v">{product.caratWeight || 'Varies by setting'}</span>
                </div>
                <div className="pq-spec-item">
                  <span className="pq-spec-k">Clarity</span>
                  <span className="pq-spec-v">{product.clarity || 'VVS Grade'}</span>
                </div>
                <div className="pq-spec-item">
                  <span className="pq-spec-k">Precious Metal</span>
                  <span className="pq-spec-v">{product.metal || '18K Gold'}</span>
                </div>
              </div>

              {isOneOfOne && isSold && (
                <div style={{ fontSize: '0.78rem', color: '#821D38', background: 'rgba(93, 10, 36, 0.08)', padding: '10px 14px', borderRadius: 2, marginBottom: 16 }}>
                  <strong>One Design. One Owner.</strong> This piece has found its owner and will never be remade. Inquire for a bespoke commission.
                </div>
              )}

              {/* Actions */}
              <div className="pq-actions">
                <button
                  className="pq-btn-wa"
                  onClick={handleWhatsAppOrder}
                  type="button"
                >
                  <MessageCircle size={16} />
                  <span>
                    {isSold
                      ? 'Inquire for Bespoke Design'
                      : 'Order via WhatsApp'}
                  </span>
                </button>

                <button
                  className="pq-btn-link"
                  onClick={handleViewFullPage}
                  type="button"
                >
                  <span>View Full Design Specifications</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
