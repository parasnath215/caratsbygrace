// src/pages/ExclusiveCollectionPage.jsx
// Carats by Grace — The Exclusive Collection
// Unified "Swirls as Borders" Luxury Atelier Theme:
// 1. Cinematic Hero with top swirly crest
// 2. Curator's Note Card framed in gold swirly boundary
// 3. Section Header crowned with swirly crest & flourish divider
// 4. Strict CSS grid (3 cols desktop, 2 cols mobile) where every 4:5 tile is framed in gold micro-swirls
// 5. Enquire Privately card framed in gold swirly boundary on rich dark burgundy

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getStoredProducts } from '../data/products';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import {
  CornerSwirl,
  CornerSwirlMicro,
  CenterCrest,
  SwirlDivider,
} from '../components/ui/SwirlDecorations';
import styles from './ExclusiveCollectionPage.module.css';

export default function ExclusiveCollectionPage() {
  useDocumentTitle('The Exclusive Collection · Carats by Grace');

  const allProducts = useMemo(() => getStoredProducts(), []);

  // Strict list of the 12 exclusive pieces
  const pieces = useMemo(() => {
    return allProducts
      .filter(
        (p) =>
          p.isExclusiveCollection ||
          p.collection === 'the-exclusive-collection' ||
          p.isOneOfOne
      )
      .slice(0, 12);
  }, [allProducts]);

  const pageWhatsAppUrl = buildWhatsAppUrl({
    type: 'general',
    customMessage: 'Hello, I would like to enquire privately about The Exclusive Collection.',
  });

  return (
    <main className={styles.page}>
      {/* ============================================================
          1. CINEMATIC HERO (Dark Burgundy Atelier Treatment)
          ============================================================ */}
      <section className={styles.hero} aria-label="The Exclusive Collection">
        <div className={styles.heroMedia}>
          <img
            src="/assets/model2/cg_jewellers8471.webp"
            alt="The Exclusive Collection · Carats by Grace Atelier"
            className={styles.heroBgImg}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          {/* Subtle Top Swirl Crest */}
          <div className={styles.heroCrestWrap}>
            <CenterCrest className={styles.heroCrestSvg} />
          </div>

          <span className={styles.heroEyebrow}>
            ONE-TIME-ONLY ATELIER RELEASE
          </span>

          <h1 className={styles.heroTitle}>THE EXCLUSIVE COLLECTION</h1>

          <p className={styles.heroIntro}>
            A singular curation of fine jewellery creations, each crafted once in
            the history of the atelier, never to be repeated.
          </p>
        </div>
      </section>

      {/* ============================================================
          2. SHORT CURATOR'S NOTE (Framed with Gold Swirly Boundary)
          ============================================================ */}
      <section className={styles.curatorSection}>
        <div className={styles.curatorContainer}>
          <div className={styles.curatorCard}>
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

            {/* Inner Hairline */}
            <div className={styles.innerHairline} aria-hidden="true" />

            {/* Content */}
            <div className={styles.curatorCardInner}>
              <div className={styles.sealMark} aria-hidden="true">
                <img
                  src="/brand/logo-mark-dark.png"
                  alt=""
                  style={{ width: 28, height: 28, objectFit: 'contain' }}
                />
              </div>

              <p className={styles.curatorText}>
                At Carats by Grace, we believe certain creations deserve a story of
                their own. Not to be repeated, not to be recreated, not to be found
                elsewhere. Each piece in this collection is conceived as a singular
                work of artistry, designed to belong to one person alone. Once chosen,
                its design is retired forever.
              </p>

              <div className={styles.curatorMotto}>
                ONE CREATION. ONE SOUL. ONE FOREVER.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. "THE PIECES" GRID (Strict Minimal Geometric Grid)
             Every 4:5 tile framed in delicate gold micro-swirls
          ============================================================ */}
      <section className={styles.gridSection} aria-label="The Pieces">
        <div className={styles.gridContainer}>
          {/* Section Header with Swirly Crest & Divider */}
          <header className={styles.sectionHeader}>
            <div className={styles.sectionCrestWrap}>
              <CenterCrest className={styles.sectionCrestSvg} />
            </div>

            <div className={styles.sectionHeaderInner}>
              <h2 className={styles.sectionLabel}>The Pieces</h2>
              <span className={styles.pieceCount}>({pieces.length} Pieces)</span>
            </div>

            <SwirlDivider className={styles.sectionDivider} />
          </header>

          {/* Strict 3-Col Desktop, 2-Col Tablet/Mobile CSS Grid */}
          <div className={styles.piecesGrid}>
            {pieces.map((piece, index) => {
              const isSold = piece.status === 'sold';
              const primaryImg = piece.images[0];
              const secondaryImg = piece.images[1] || piece.images[0];
              const targetUrl = `/products/${piece.slug}`;

              // Row index for light stagger
              const rowIndex = Math.floor(index / 3);

              return (
                <div
                  key={piece.id}
                  className={`${styles.tile} ${isSold ? styles.tileSold : ''}`}
                  style={{ animationDelay: `${rowIndex * 120}ms` }}
                >
                  {isSold ? (
                    /* Sold State: identical tile & position, no purchase link */
                    <div className={styles.tileInner}>
                      <div className={styles.imageBox}>
                        {/* 4 Micro Corner Swirls */}
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microTL}`} />
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microTR}`} />
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microBL}`} />
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microBR}`} />

                        <img
                          src={primaryImg}
                          alt={piece.name}
                          className={styles.imagePrimary}
                          loading="lazy"
                        />
                      </div>

                      <div className={styles.metaBox}>
                        <span className={styles.pieceName}>{piece.name}</span>
                        <span className={styles.soldNotice}>Found its home</span>
                      </div>
                    </div>
                  ) : (
                    /* Available State: hover crossfade + champagne gold underline */
                    <Link to={targetUrl} className={styles.tileLink}>
                      <div className={styles.imageBox}>
                        {/* 4 Micro Corner Swirls framing the jewellery piece */}
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microTL}`} />
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microTR}`} />
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microBL}`} />
                        <CornerSwirlMicro className={`${styles.microCorner} ${styles.microBR}`} />

                        <img
                          src={primaryImg}
                          alt={piece.name}
                          className={styles.imagePrimary}
                          loading="lazy"
                        />
                        <img
                          src={secondaryImg}
                          alt={`${piece.name} preview`}
                          className={styles.imageSecondary}
                          loading="lazy"
                          aria-hidden="true"
                        />
                      </div>

                      <div className={styles.metaBox}>
                        <span className={styles.pieceName}>
                          {piece.name}
                          <span className={styles.nameUnderline} />
                        </span>
                        <span className={styles.piecePrice}>
                          {piece.priceDisplay || 'Price on Request'}
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. ENQUIRE PRIVATELY BLOCK (Framed with Gold Swirly Boundary)
          ============================================================ */}
      <section className={styles.enquireSection}>
        <div className={styles.enquireContainer}>
          <div className={styles.enquireCard}>
            {/* 4 Corner Swirl Ornaments on Dark Velvet */}
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerTL}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerTR}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerBL}`} />
            <CornerSwirl className={`${styles.swirlCorner} ${styles.cornerBR}`} />

            {/* Top & Bottom Center Swirly Crests */}
            <div className={styles.crestTopWrapDark}>
              <CenterCrest className={styles.crestSvg} />
            </div>
            <div className={styles.crestBottomWrapDark}>
              <CenterCrest className={styles.crestSvg} />
            </div>

            {/* Inner Hairline */}
            <div className={styles.innerHairlineDark} aria-hidden="true" />

            {/* Content */}
            <div className={styles.enquireCardInner}>
              <span className={styles.enquireEyebrow}>
                PRIVATE ATELIER CONSULTATION
              </span>

              <h2 className={styles.enquireTitle}>
                Looking for an Unrepeatable Creation?
              </h2>

              <p className={styles.enquireText}>
                Our atelier founders and master craftsmen accept a limited number of
                private commissions each year. Connect directly with our concierge to
                discuss acquiring a piece from The Exclusive Collection or commissioning
                a bespoke silhouette.
              </p>

              <div className={styles.enquireActions}>
                <a
                  href={pageWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.enquireWhatsAppBtn}
                >
                  <MessageCircle size={17} />
                  <span>ENQUIRE PRIVATELY ON WHATSAPP</span>
                </a>

                <Link to="/contact" className={styles.enquireVisitBtn}>
                  <span>BOOK AN ATELIER VISIT</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. FLOATING CONCIERGE BUTTON (Exclusive Collection Only)
          ============================================================ */}
    </main>
  );
}
