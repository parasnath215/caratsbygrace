// src/components/bespoke/BespokeSummaryStep.jsx
// Carats by Grace — Bespoke Studio Summary / Result Step
// Spec breakdown, live quote estimation, WhatsApp Enquiry, Save, Share & Consultation actions.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Share2,
  Check,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { BESPOKE_CONFIG, calculateEstimatedPrice } from '../../data/bespokeConfig';
import { buildWhatsAppUrl, SHOWROOM_PHONE } from '../../utils/whatsapp';
import styles from './BespokeSummaryStep.module.css';

export default function BespokeSummaryStep({
  design,
  onEditStep,
  onReset,
}) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const price = calculateEstimatedPrice(design);

  // Lookups
  const pieceObj =
    BESPOKE_CONFIG.pieces.find((p) => p.id === design.piece) ||
    BESPOKE_CONFIG.pieces[0];

  const settingsForPiece =
    BESPOKE_CONFIG.settings[design.piece] || BESPOKE_CONFIG.settings.ring;
  const settingObj =
    settingsForPiece.find((s) => s.id === design.setting) || settingsForPiece[0];

  const stoneShapeObj =
    BESPOKE_CONFIG.stones.shapes.find((s) => s.id === design.stoneShape) ||
    BESPOKE_CONFIG.stones.shapes[0];

  const stoneTypeObj =
    BESPOKE_CONFIG.stones.types.find((t) => t.id === design.stoneType) ||
    BESPOKE_CONFIG.stones.types[0];

  const metalObj =
    BESPOKE_CONFIG.metals.find((m) => m.id === design.metal) ||
    BESPOKE_CONFIG.metals[0];

  const purityObj =
    BESPOKE_CONFIG.purities.find((p) => p.id === design.purity) ||
    BESPOKE_CONFIG.purities[0];

  // Generate WhatsApp Message with full encoded spec
  const bespokeSummaryText = `Hello Carats by Grace, I have customized a bespoke piece through the Atelier Studio:
• Piece: ${pieceObj.name}
• Setting: ${settingObj.name}
• Stone Shape: ${stoneShapeObj.name}
• Carat Weight: ${design.carat} ct
• Diamond Grade: ${stoneTypeObj.name} (${stoneTypeObj.grade})
• Metal & Purity: ${metalObj.name} (${purityObj.label})
• Calibrated Size: ${design.size}
${design.engravingText ? `• Engraving: "${design.engravingText}"` : ''}
${design.note ? `• Client Note: "${design.note}"` : ''}
• Estimated Quote: ${price.rangeDisplay}

I would like to discuss acquiring this piece or commissioning the creation.`;

  const whatsappUrl = `https://wa.me/${SHOWROOM_PHONE}?text=${encodeURIComponent(bespokeSummaryText)}`;

  // Copy shareable link
  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('p', design.piece);
    url.searchParams.set('s', design.setting);
    url.searchParams.set('sh', design.stoneShape);
    url.searchParams.set('c', design.carat);
    url.searchParams.set('st', design.stoneType);
    url.searchParams.set('m', design.metal);
    url.searchParams.set('pu', design.purity);
    url.searchParams.set('sz', design.size);
    if (design.engravingText) url.searchParams.set('eng', design.engravingText);

    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  // Save design to localStorage
  const handleSaveDesign = () => {
    try {
      const existingRaw = localStorage.getItem('cg_saved_bespoke_designs');
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      const newEntry = {
        id: `bespoke-${Date.now()}`,
        date: new Date().toISOString(),
        design,
        priceDisplay: price.rangeDisplay,
        title: `${design.carat} ct ${stoneShapeObj.name} ${settingObj.name} ${pieceObj.name}`,
      };
      list.unshift(newEntry);
      localStorage.setItem('cg_saved_bespoke_designs', JSON.stringify(list.slice(0, 10)));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error('Failed to save bespoke design', e);
    }
  };

  return (
    <div className={styles.summaryWrap}>
      <header className={styles.summaryHeader}>
        <span className={styles.summaryEyebrow}>STEP 06 · FINAL CURATION</span>
        <h2 className={styles.summaryTitle}>Your Bespoke Creation</h2>
        <p className={styles.summarySubtitle}>
          Review your handcrafted specifications below. Connect directly with our atelier
          concierge to finalize stone curation and craftsmanship timelines.
        </p>
      </header>

      {/* ── Specifications Matrix ── */}
      <div className={styles.specMatrix}>
        <div className={styles.specRow}>
          <span className={styles.specKey}>Jewellery Piece</span>
          <span className={styles.specVal}>
            {pieceObj.name}
            <button
              type="button"
              className={styles.specEditBtn}
              onClick={() => onEditStep(1)}
            >
              Edit
            </button>
          </span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specKey}>Setting Architecture</span>
          <span className={styles.specVal}>
            {settingObj.name}
            <button
              type="button"
              className={styles.specEditBtn}
              onClick={() => onEditStep(2)}
            >
              Edit
            </button>
          </span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specKey}>Diamond Shape</span>
          <span className={styles.specVal}>
            {stoneShapeObj.name}
            <button
              type="button"
              className={styles.specEditBtn}
              onClick={() => onEditStep(3)}
            >
              Edit
            </button>
          </span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specKey}>Carat Proportion</span>
          <span className={styles.specVal}>{design.carat} Carats</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specKey}>Grown Diamond Grade</span>
          <span className={styles.specVal}>
            {stoneTypeObj.name}
            <span className={styles.specSubGrade}>{stoneTypeObj.grade}</span>
          </span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specKey}>Precious Metal</span>
          <span className={styles.specVal}>
            {metalObj.name} ({purityObj.label})
            <button
              type="button"
              className={styles.specEditBtn}
              onClick={() => onEditStep(4)}
            >
              Edit
            </button>
          </span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specKey}>Calibrated Size</span>
          <span className={styles.specVal}>
            {design.size}
            <button
              type="button"
              className={styles.specEditBtn}
              onClick={() => onEditStep(5)}
            >
              Edit
            </button>
          </span>
        </div>

        {design.engravingText && (
          <div className={styles.specRow}>
            <span className={styles.specKey}>Laser Engraving</span>
            <span className={styles.specVal}>“{design.engravingText}”</span>
          </div>
        )}

        {design.note && (
          <div className={styles.specRow}>
            <span className={styles.specKey}>Client Requests</span>
            <span className={styles.specVal}>“{design.note}”</span>
          </div>
        )}
      </div>

      {/* ── Price Quotation Box ── */}
      <div className={styles.quoteCard}>
        <div className={styles.quoteLeft}>
          <span className={styles.quoteEyebrow}>ESTIMATED COMMISSION VALUE</span>
          <span className={styles.quotePrice}>{price.rangeDisplay}</span>
        </div>
        <p className={styles.quoteDisclaimer}>
          Includes certified Type IIa grown diamonds, hallmark certification, bespoke
          presentation case, and insured global delivery. Final price confirmed upon stone allocation.
        </p>
      </div>

      {/* ── Actions Matrix ── */}
      <div className={styles.actionsMatrix}>
        {/* Primary Action: Enquire on WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnPrimaryWhatsApp}
          title="Connect with our concierge on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>ENQUIRE ON WHATSAPP</span>
        </a>

        {/* Secondary: Book Consultation */}
        <Link
          to="/contact"
          className={styles.btnSecondaryVisit}
          title="Book an in-person atelier consultation"
        >
          <Calendar size={16} />
          <span>BOOK AN ATELIER CONSULTATION</span>
        </Link>

        {/* Tertiary Actions Row: Save Design & Copy Share Link */}
        <div className={styles.auxActionsRow}>
          <button
            type="button"
            className={styles.btnAux}
            onClick={handleSaveDesign}
          >
            {saved ? <BookmarkCheck size={16} color="var(--burgundy, #5D0A24)" /> : <Bookmark size={16} />}
            <span>{saved ? 'Saved to Atelier' : 'Save Design'}</span>
          </button>

          <button
            type="button"
            className={styles.btnAux}
            onClick={handleCopyLink}
          >
            {copied ? <Check size={16} color="var(--burgundy, #5D0A24)" /> : <Share2 size={16} />}
            <span>{copied ? 'Link Copied' : 'Copy Share Link'}</span>
          </button>

          <button
            type="button"
            className={styles.btnAux}
            onClick={onReset}
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
