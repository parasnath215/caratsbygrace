// src/components/exclusive/ExclusiveAnnouncementSection.jsx
// Carats by Grace — Exclusive Collection Announcement
// White background minimalist section with gold swirly boundary on the Home Page.

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { CornerSwirl, CenterCrest } from '../ui/SwirlDecorations';
import styles from './ExclusiveAnnouncementSection.module.css';

export default function ExclusiveAnnouncementSection() {
  const whatsappUrl = buildWhatsAppUrl({
    type: 'general',
    customMessage: 'Hello, I would like to enquire privately about The Exclusive Collection.',
  });

  return (
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
                title="ENQUIRE ON WHATSAPP"
              >
                <MessageCircle size={15} />
                <span>ENQUIRE ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
