// src/pages/ExclusiveDesignsPage.jsx
// Carats by Grace — Designs That Never Repeat (One of One Exclusive Gallery)

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getStoredProducts } from '../data/products';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import styles from './ExclusiveDesignsPage.module.css';

export default function ExclusiveDesignsPage() {
  useDocumentTitle('Designs That Never Repeat · One of One Exclusive');
  const [filter, setFilter] = useState('all'); // 'all' | 'available' | 'sold'

  const allProducts = getStoredProducts();
  const exclusivePieces = useMemo(() => {
    return allProducts.filter((p) => p.isOneOfOne || p.collection === 'the-empress');
  }, [allProducts]);

  const filteredPieces = useMemo(() => {
    if (filter === 'available') {
      return exclusivePieces.filter((p) => p.status !== 'sold');
    }
    if (filter === 'sold') {
      return exclusivePieces.filter((p) => p.status === 'sold');
    }
    return exclusivePieces;
  }, [exclusivePieces, filter]);

  return (
    <main className={styles.page}>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>
            The Atelier Signature Edit
          </span>
          <h1 className={styles.heroTitle}>DESIGNS THAT NEVER REPEAT.</h1>
          <div className={styles.subheading}>
            ONE DESIGN. ONE OWNER. FOREVER YOURS.
          </div>
          <p className={styles.heroDesc}>
            Some things are too special to be made twice. Every exclusive design
            at Carats by Grace is thoughtfully envisioned to stand apart. Created
            as a one-time expression of artistry, each design is available for a
            single purchase only. Once it finds its owner, it will never be
            recreated.
          </p>

          <div className={styles.philosophyCard}>
            <p className={styles.philosophyQuote}>
              "Because true exclusivity isn't about owning something rare. It's
              about owning something no one else can."
            </p>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('all')}
        >
          All Singular Pieces ({exclusivePieces.length})
        </button>
        <button
          className={`${styles.filterBtn} ${filter === 'available' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('available')}
        >
          Available Now ({exclusivePieces.filter((p) => p.status !== 'sold').length})
        </button>
        <button
          className={`${styles.filterBtn} ${filter === 'sold' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('sold')}
        >
          Acquired Archive ({exclusivePieces.filter((p) => p.status === 'sold').length})
        </button>
      </div>

      {/* ── Gallery Grid ── */}
      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {filteredPieces.map((piece) => {
            const isSold = piece.status === 'sold';
            const whatsappUrl = buildWhatsAppUrl({
              type: 'exclusive',
              productName: piece.name,
              productUrl: typeof window !== 'undefined' ? `${window.location.origin}/products/${piece.slug}` : '',
              specs: piece.specs,
            });

            return (
              <article key={piece.id} className={styles.card}>
                <div className={styles.imgWrap}>
                  <img
                    src={piece.images[0]}
                    alt={piece.name}
                    loading="lazy"
                  />
                  <span className={styles.oneOfOneBadge}>ONE OF ONE</span>

                  {isSold ? (
                    <>
                      <span className={styles.statusBadgeSold}>SOLD / ARCHIVED</span>
                      <div className={styles.soldOverlay}>Acquired · Private Collection</div>
                    </>
                  ) : (
                    <span className={styles.statusBadgeAvailable}>Available for Acquisition</span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{piece.name}</h2>
                  <div className={styles.cardSpecs}>{piece.specs}</div>
                  <p className={styles.cardDesc}>{piece.description}</p>

                  <div className={styles.cardActions}>
                    {isSold ? (
                      <button className={styles.btnSold} disabled>
                        Acquired · Not Reproducible
                      </button>
                    ) : (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnEnquire}
                      >
                        <MessageCircle size={15} />
                        ENQUIRE ABOUT THIS DESIGN
                      </a>
                    )}
                    <Link
                      to={`/products/${piece.slug}`}
                      className={styles.btnDetails}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
