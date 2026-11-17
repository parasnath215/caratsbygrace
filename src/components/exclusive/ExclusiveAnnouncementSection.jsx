// src/components/exclusive/ExclusiveAnnouncementSection.jsx
// Carats by Grace — Exclusive Collection Announcement
// 1. White background minimalist section with gold swirly boundary on the Home Page.
// 2. An elegant stationery pop-up modal that opens after scrolling past the hero video.
// 3. Compact CTAs & redirection to /exclusive-collection.

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, X, MailOpen } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { CornerSwirl, CenterCrest } from '../ui/SwirlDecorations';
import styles from './ExclusiveAnnouncementSection.module.css';

export default function ExclusiveAnnouncementSection() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const popupRef = useRef(null);

  const whatsappUrl = buildWhatsAppUrl({
    type: 'general',
    customMessage: 'Hello, I would like to enquire privately about The Exclusive Collection.',
  });

  // Scroll detection: auto-open popup once when user scrolls past the hero video
  useEffect(() => {
    // Check if user has already dismissed or seen the popup in this browser session
    const viewed = sessionStorage.getItem('cg_exclusive_popup_dismissed');
    if (viewed) return;

    const handleScroll = () => {
      // Trigger when scrolling past ~380px (after the hero video)
      if (window.scrollY > 380 && !hasAutoOpened) {
        setPopupOpen(true);
        setHasAutoOpened(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAutoOpened]);

  // Lock scroll and handle escape key when popup modal is open
  useEffect(() => {
    if (!popupOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClosePopup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [popupOpen]);

  const handleClosePopup = () => {
    setPopupOpen(false);
    sessionStorage.setItem('cg_exclusive_popup_dismissed', 'true');
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  return (
    <>
      {/* ============================================================
          1. SMALL MINIMALIST SECTION ON HOME PAGE (WHITE BACKGROUND)
             Features the gold swirly boundary and essential CTAs
          ============================================================ */}
      <section
        className={styles.section}
        aria-label="The Exclusive Collection Announcement"
      >
        <div className={styles.container}>
          {/* Card with Gold Swirly Boundary */}
          <article className={styles.boundaryCard}>
            {/* 4 Corner Swirl Ornaments */}
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerTL}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerTR}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerBL}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerBR}`} />

            {/* Top & Bottom Center Swirly Crests */}
            <div className={styles.crestTopWrap}>
              <CenterCrest className={styles.crestSvg} />
            </div>
            <div className={styles.crestBottomWrap}>
              <CenterCrest className={styles.crestSvg} />
            </div>

            {/* Delicate Inner Inset Hairline Frame */}
            <div className={styles.innerHairline} aria-hidden="true" />

            {/* Section Content */}
            <div className={styles.cardContent}>
              <div className={styles.eyebrow}>
                <span>EXCLUSIVE COLLECTION</span>
              </div>

              <h2 className={styles.heading}>
                SOME THINGS ARE MEANT TO EXIST ONLY ONCE.
              </h2>

              <p className={styles.briefText}>
                A singular atelier curation of fine jewellery creations, each crafted once
                in history and never to be repeated. Designed to belong to one person alone.
              </p>

              {/* Minimalist CTAs */}
              <div className={styles.ctaRow}>
                <Link
                  to="/exclusive-collection"
                  className={styles.primaryCta}
                  title="Discover The Exclusive Collection"
                >
                  <span>DISCOVER THE EXCLUSIVE COLLECTION</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryCta}
                  title="Enquire Privately on WhatsApp"
                >
                  <MessageCircle size={15} />
                  <span>ENQUIRE ON WHATSAPP</span>
                </a>
              </div>

              {/* Link to trigger popup letter */}
              <button
                type="button"
                onClick={handleOpenPopup}
                className={styles.openLetterBtn}
                title="Read the Atelier Invitation Letter"
              >
                <MailOpen size={13} />
                <span>Read the Private Invitation Letter</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* ============================================================
          2. ANNOUNCEMENT LETTER POP-UP MODAL
             Opens after scrolling past hero video (or on button click)
          ============================================================ */}
      {popupOpen && (
        <div
          className={styles.popupBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePopup();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Exclusive Collection Invitation Letter"
        >
          <div className={styles.popupCard} ref={popupRef}>
            {/* Close Button */}
            <button
              type="button"
              className={styles.popupCloseBtn}
              onClick={handleClosePopup}
              aria-label="Close invitation"
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Corner Swirls for the Popup as well */}
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerTL}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerTR}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerBL}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerBR}`} />

            <div className={styles.popupInner}>
              {/* Subtle brand seal mark */}
              <div className={styles.sealMark} aria-hidden="true">
                <img
                  src="/brand/logo-mark-dark.png"
                  alt=""
                  style={{ width: 28, height: 28, objectFit: 'contain' }}
                />
              </div>

              {/* Eyebrow */}
              <div className={styles.popupEyebrow}>
                <span>EXCLUSIVE COLLECTION</span>
              </div>

              {/* Collection Heading */}
              <h2 className={styles.popupTitle}>THE EXCLUSIVE COLLECTION</h2>

              <div className={styles.popupStatement}>
                SOME THINGS ARE MEANT TO EXIST ONLY ONCE.
              </div>

              {/* Announcement Letter Body */}
              <div className={styles.letterBody}>
                <p className={styles.letterLead}>
                  There is beauty in brilliance. And then, there is beauty in being irreplaceable.
                </p>
                <p>
                  At Carats by Grace, we believe certain creations deserve a story of their own.
                  Not to be repeated, not to be recreated, not to be found elsewhere.
                </p>
                <p>
                  Our exclusive collection is an expression of this belief. Each creation is
                  conceived as a singular work of artistry, designed to belong to one person,
                  and one person alone.
                </p>
                <p>
                  Once chosen, it becomes a part of your story. Its design is retired, never to be
                  made again.
                </p>
                <p>
                  Because true luxury isn't always about what you wear. Sometimes, it's about
                  knowing that what you wear exists nowhere else.
                </p>
              </div>

              {/* Divider */}
              <div className={styles.divider} aria-hidden="true">
                <span className={styles.dividerLine} />
              </div>

              {/* Signature Block */}
              <div className={styles.signatureBlock}>
                <div className={styles.signatureMotto}>
                  ONE CREATION. ONE SOUL. ONE FOREVER.
                </div>
                <div className={styles.signatureSignoff}>
                  Exclusively yours, by design.
                </div>
                <div className={styles.signatureAuthor}>
                  With grace, <em>Carats by Grace Atelier</em>
                </div>
              </div>

              {/* CTAs inside the popup */}
              <div className={styles.popupCtaRow}>
                <Link
                  to="/exclusive-collection"
                  onClick={handleClosePopup}
                  className={styles.primaryCta}
                  title="Discover The Exclusive Collection"
                >
                  <span>DISCOVER THE EXCLUSIVE COLLECTION</span>
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryCta}
                  title="Enquire Privately on WhatsApp"
                >
                  <MessageCircle size={15} />
                  <span>ENQUIRE ON WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
