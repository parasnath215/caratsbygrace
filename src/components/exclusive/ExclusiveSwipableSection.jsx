// src/components/exclusive/ExclusiveSwipableSection.jsx
// Carats by Grace — The Exclusive Collection (3D Coverflow Deck)
// Clean original website UI: 1 center card, 2 behind on each side with graduated blur.
// ~15 cards in total, ending with the dedicated "View All" card.

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getStoredProducts } from '../../data/products';
import styles from './ExclusiveSwipableSection.module.css';

export default function ExclusiveSwipableSection() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Drag / swipe gesture tracking
  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);
  const mouseStartXRef = useRef(0);
  const isMouseDownRef = useRef(false);
  const hasDraggedRef = useRef(false);

  // Resize listener for responsive 3D card translation
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prepare ~15 items: first 14 exclusive pieces + 1 "View All" card
  const cards = useMemo(() => {
    const all = getStoredProducts();
    const exclusive = all.filter(
      (p) =>
        p.isExclusiveCollection ||
        p.collection === 'the-exclusive-collection' ||
        p.isOneOfOne
    );
    const topPieces = exclusive.slice(0, 14);

    // Return the 14 pieces + final View All card
    return [
      ...topPieces.map((p) => ({ ...p, isViewAll: false })),
      {
        id: 'cg-exclusive-view-all',
        isViewAll: true,
        totalCount: exclusive.length,
      },
    ];
  }, []);

  const totalCards = cards.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(totalCards - 1, prev + 1));
  }, [totalCards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaXRef.current > 40) {
      handlePrev();
    } else if (touchDeltaXRef.current < -40) {
      handleNext();
    }
    touchDeltaXRef.current = 0;
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    isMouseDownRef.current = true;
    mouseStartXRef.current = e.clientX;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    if (Math.abs(e.clientX - mouseStartXRef.current) > 8) {
      hasDraggedRef.current = true;
    }
  };

  const handleMouseUp = (e) => {
    if (isMouseDownRef.current && hasDraggedRef.current) {
      const delta = e.clientX - mouseStartXRef.current;
      if (delta > 40) {
        handlePrev();
      } else if (delta < -40) {
        handleNext();
      }
    }
    isMouseDownRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  // Card click handler: if side card, bring to center; if center card, navigate
  const handleCardClick = (index, card) => {
    if (hasDraggedRef.current) return;

    if (index !== activeIndex) {
      setActiveIndex(index);
    } else {
      if (card.isViewAll) {
        navigate('/exclusive-collection');
      } else {
        navigate(`/products/${card.slug}`);
      }
    }
  };

  // Calculate dynamic 3D positioning for Cover Flow effect
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    // Spread spacing depending on screen size
    const step1 = isMobile ? 80 : isTablet ? 135 : 175;
    const step2 = isMobile ? 145 : isTablet ? 245 : 315;

    let translateX = 0;
    let scale = 1;
    let opacity = 1;
    let blur = 0;
    let zIndex = 10;
    let pointerEvents = 'auto';
    let visibility = 'visible';

    if (offset === 0) {
      // Center card: fully clear, full size, top z-index
      translateX = 0;
      scale = 1;
      opacity = 1;
      blur = 0;
      zIndex = 10;
    } else if (absOffset === 1) {
      // 1 behind on left/right: slightly scaled down, slightly blurred
      translateX = offset > 0 ? step1 : -step1;
      scale = isMobile ? 0.88 : 0.86;
      opacity = 0.78;
      blur = 2.5;
      zIndex = 8;
    } else if (absOffset === 2) {
      // 2 behind on left/right: more scaled down, more blurred
      translateX = offset > 0 ? step2 : -step2;
      scale = isMobile ? 0.74 : 0.72;
      opacity = 0.45;
      blur = 5.5;
      zIndex = 5;
    } else {
      // Offscreen cards
      translateX = offset > 0 ? (isMobile ? 210 : 450) : (isMobile ? -210 : -450);
      scale = 0.58;
      opacity = 0;
      blur = 8;
      zIndex = 1;
      pointerEvents = 'none';
      visibility = 'hidden';
    }

    return {
      transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      zIndex,
      pointerEvents,
      visibility,
    };
  };

  return (
    <section
      className={styles.section}
      aria-label="The Exclusive Collection"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>Exclusive Collection</span>
          <h2 className={styles.title}>The Exclusive Collection</h2>
          <p className={styles.subtitle}>
            A singular curation of unrepeatable creations, each crafted once in history
            and never to be repeated. Designed to belong to one person alone.
          </p>
        </header>

        {/* 3D Cover Flow Deck Stage */}
        <div className={styles.stageWrapper}>
          <div
            className={styles.stage}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            {cards.map((card, index) => {
              const isCenter = index === activeIndex;
              const style = getCardStyle(index);

              // ── LAST CARD: "VIEW ALL" CARD ──
              if (card.isViewAll) {
                return (
                  <div
                    key={card.id}
                    className={`${styles.viewAllCard} ${isCenter ? styles.cardCenter : styles.cardSide}`}
                    style={style}
                    onClick={() => handleCardClick(index, card)}
                    role="button"
                    tabIndex={0}
                    aria-label="View all creations in the Exclusive Collection"
                  >
                    <div className={styles.viewAllInner}>
                      <span className={styles.viewAllEyebrow}>Atelier Archive</span>
                      <h3 className={styles.viewAllTitle}>
                        The Complete Exclusive Collection
                      </h3>
                      <p className={styles.viewAllText}>
                        Explore all {card.totalCount || 70} singular 1-of-1 creations.
                        Each design is retired forever once acquired.
                      </p>
                      <button
                        type="button"
                        className={styles.viewAllActionBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/exclusive-collection');
                        }}
                      >
                        <span>VIEW ALL CREATIONS</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              }

              // ── PRODUCT CARD ──
              const primaryImg =
                card.images && card.images[0]
                  ? card.images[0]
                  : '/brand/logo-mark-dark.png';
              const displaySpecs =
                card.specs ||
                `${card.metalColor || card.metal || '18KT Gold'} · ${card.caratWeight || ''}`;

              return (
                <div
                  key={card.id}
                  className={`${styles.card} ${isCenter ? styles.cardCenter : styles.cardSide}`}
                  style={style}
                  onClick={() => handleCardClick(index, card)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${card.name}`}
                >
                  {/* Image Box */}
                  <div className={styles.imageBox}>
                    <span className={styles.oneOfOneBadge}>1 OF 1</span>
                    <img
                      src={primaryImg}
                      alt={card.name}
                      className={styles.productImg}
                      loading="lazy"
                      draggable="false"
                    />
                  </div>

                  {/* Card Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle} title={card.name}>
                      {card.name}
                    </h3>
                    <span className={styles.cardSpecs} title={card.metal || '18KT Gold'}>
                      {card.metal || '18KT Gold'}
                    </span>

                    <div className={styles.cardFooter}>
                      <span className={styles.cardPrice} style={{ display: 'none' }} />
                      <button
                        type="button"
                        className={styles.viewPieceBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${card.slug}`);
                        }}
                      >
                        <span>View</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls: Prev / Counter / Next */}
          <div className={styles.controlsRow}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous card"
            >
              <ChevronLeft size={20} />
            </button>

            <span className={styles.counter}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
            </span>

            <button
              type="button"
              className={styles.navBtn}
              onClick={handleNext}
              disabled={activeIndex === totalCards - 1}
              aria-label="Next card"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className={styles.swipeGuide}>
            Swipe or click side cards to explore
          </p>
        </div>
      </div>
    </section>
  );
}
