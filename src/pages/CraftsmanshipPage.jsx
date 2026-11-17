// src/pages/CraftsmanshipPage.jsx
// Carats by Grace — Craftsmanship & Standards Page
// The artisanal process, BIS 750 gold hallmarking, IGI certified diamonds, and heirloom standards.

import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { EDITORIAL_ASSETS } from '../data/assets';

const CRAFT_CSS = `
.cr-page {
  background: var(--ivory, #FAF6F1);
  color: var(--ink, #17120F);
  font-family: var(--sans, 'Jost', sans-serif);
  overflow-x: hidden;
}
.cr-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(20px, 5vw, 64px);
}
.cr-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold, #C6A15B);
  font-weight: 600;
  margin-bottom: 12px;
}
.cr-display {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
}

/* Hero */
.cr-hero {
  padding-top: clamp(48px, 7vw, 96px);
  padding-bottom: clamp(36px, 5vw, 64px);
  text-align: center;
  border-bottom: 1px solid var(--line, #E9E1D8);
  background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F1 100%);
}
.cr-hero__title {
  font-size: clamp(2.4rem, 5vw, 4rem);
  color: var(--ink, #17120F);
  margin-bottom: 18px;
}
.cr-hero__lede {
  color: var(--muted, #7A6F70);
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  max-width: 64ch;
  margin: 0 auto;
  line-height: 1.65;
}

/* Spotlight Media Section */
.cr-spotlight {
  padding-block: clamp(48px, 7vw, 84px);
}
.cr-spotlight__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 6vw, 72px);
  align-items: center;
}
.cr-spotlight__media {
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(23, 18, 15, 0.06);
  background: #EFE8E0;
}
.cr-spotlight__media img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  display: block;
}
.cr-spotlight__copy h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin: 8px 0 18px;
  color: var(--ink, #17120F);
}
.cr-spotlight__copy p {
  color: #4A3E3D;
  font-size: 0.98rem;
  line-height: 1.75;
  margin: 0 0 16px;
}

/* Steps Section */
.cr-steps {
  padding-block: clamp(48px, 7vw, 96px);
  background: #FFFFFF;
  border-block: 1px solid var(--line, #E9E1D8);
}
.cr-steps__head {
  text-align: center;
  margin-bottom: clamp(36px, 6vw, 64px);
}
.cr-steps__head h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin: 8px 0 0;
}
.cr-steps__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.cr-step-card {
  padding: 32px 24px;
  background: var(--ivory, #FAF6F1);
  border: 1px solid var(--line, #E9E1D8);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
}
.cr-step-card__num {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-size: 2.2rem;
  color: var(--gold, #C6A15B);
  line-height: 1;
  margin-bottom: 16px;
}
.cr-step-card h3 {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0 0 12px;
  color: var(--ink, #17120F);
}
.cr-step-card p {
  color: var(--muted, #7A6F70);
  font-size: 0.88rem;
  line-height: 1.65;
  margin: 0;
}

/* Guarantees Strip */
.cr-guarantees {
  padding-block: clamp(48px, 7vw, 84px);
}
.cr-guarantees__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.cr-g-card {
  background: #FFFFFF;
  border: 1px solid var(--line, #E9E1D8);
  padding: 32px 26px;
  border-radius: 2px;
  text-align: center;
}
.cr-g-card__icon {
  font-size: 1.8rem;
  color: var(--burgundy, #7B1E3A);
  margin-bottom: 14px;
  display: inline-block;
}
.cr-g-card h3 {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-size: 1.35rem;
  font-weight: 500;
  margin: 0 0 10px;
  color: var(--ink, #17120F);
}
.cr-g-card p {
  color: var(--muted, #7A6F70);
  font-size: 0.88rem;
  line-height: 1.65;
  margin: 0;
}

/* CTA */
.cr-cta {
  padding-block: clamp(48px, 6vw, 76px);
  background: var(--burgundy, #7B1E3A);
  color: var(--ivory, #FAF6F1);
  text-align: center;
}
.cr-cta h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  color: var(--ivory, #FAF6F1);
  margin: 8px 0 12px;
}
.cr-cta p {
  color: rgba(250, 246, 241, 0.82);
  font-size: 0.95rem;
  max-width: 52ch;
  margin: 0 auto 28px;
  line-height: 1.6;
}
.cr-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 24px;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  border-radius: 1px;
  transition: all 0.25s ease;
}
.cr-btn--gold {
  background: var(--gold, #C6A15B);
  color: var(--ink, #17120F);
  border: 1px solid var(--gold, #C6A15B);
}
.cr-btn--gold:hover {
  background: #B38E46;
}
.cr-btn--ghost {
  background: transparent;
  color: var(--ivory, #FAF6F1);
  border: 1px solid rgba(250, 246, 241, 0.4);
  margin-left: 12px;
}
.cr-btn--ghost:hover {
  border-color: var(--ivory, #FAF6F1);
  background: rgba(250, 246, 241, 0.1);
}

/* Responsive */
@media (max-width: 960px) {
  .cr-steps__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cr-guarantees__grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 800px) {
  .cr-spotlight__grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .cr-steps__grid {
    grid-template-columns: 1fr;
  }
  .cr-btn--ghost {
    margin-left: 0;
    margin-top: 10px;
  }
}
`;

export default function CraftsmanshipPage() {
  useDocumentTitle('Craftsmanship & Standards · The House of Grace');

  return (
    <div className="cr-page">
      <style>{CRAFT_CSS}</style>

      {/* Hero */}
      <section className="cr-hero">
        <div className="cr-wrap">
          <span className="cr-eyebrow">Atelier Standards</span>
          <h1 className="cr-display cr-hero__title">Considered At Every Step.</h1>
          <p className="cr-hero__lede">
            Fine jewellery engineered with architectural balance, handcrafted in certified 18K solid gold, and set with master gemological precision using certified lab-grown diamonds.
          </p>
        </div>
      </section>

      {/* Spotlight */}
      <section className="cr-spotlight">
        <div className="cr-wrap">
          <div className="cr-spotlight__grid">
            <div className="cr-spotlight__media">
              <img
                src={EDITORIAL_ASSETS.craft}
                alt="Precision goldsmithing and diamond setting at Carats by Grace"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="cr-spotlight__copy">
              <span className="cr-eyebrow">The Philosophy</span>
              <h2 className="cr-display">Heirloom Quality for Daily Life</h2>
              <p>
                At Carats by Grace, craftsmanship begins with ergonomics. A ring should feel like second skin; a necklace must rest flush against the collarbone without twisting; earrings must hold their sparkle with lightweight poise.
              </p>
              <p>
                By blending cutting-edge optical modeling with age-old bench goldsmithing techniques, our master artisans ensure that every piece is structurally sound, brilliantly refractive, and durable enough to wear without hesitation.
              </p>
              <p>
                Every jewel created in our atelier carries an authentic BIS 750 hallmark stamp for gold purity and is set with IGI-certified lab-grown diamonds offering conscious brilliance and identical physical fire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Step Process */}
      <section className="cr-steps">
        <div className="cr-wrap">
          <div className="cr-steps__head">
            <span className="cr-eyebrow">The Journey of a Jewel</span>
            <h2 className="cr-display">From Sketch to Heirloom</h2>
          </div>

          <div className="cr-steps__grid">
            <div className="cr-step-card">
              <div className="cr-step-card__num">01</div>
              <h3>Curated Lab-Grown Diamonds</h3>
              <p>
                Each lab-grown diamond is hand-selected for optimal cut symmetry, clarity, and vivid light dispersion. Graded and verified with recognized laboratory reports (IGI).
              </p>
            </div>

            <div className="cr-step-card">
              <div className="cr-step-card__num">02</div>
              <h3>Solid 18K Gold</h3>
              <p>
                Formulated in solid 18K yellow, rose, and white gold alloys to ensure lustrous richness, hypoallergenic comfort, and official BIS hallmarking.
              </p>
            </div>

            <div className="cr-step-card">
              <div className="cr-step-card__num">03</div>
              <h3>Micro-Pavé Setting</h3>
              <p>
                Artisans set every gemstone under high-magnification stereomicroscopes, burnishing each prong and bezel for seamless snag-free wear.
              </p>
            </div>

            <div className="cr-step-card">
              <div className="cr-step-card__num">04</div>
              <h3>Multi-Point Inspection</h3>
              <p>
                Final high-luster mirror polishing followed by comprehensive gemological and structural stress tests before presentation in our signature packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cr-cta">
        <div className="cr-wrap">
          <span className="cr-eyebrow" style={{ color: 'var(--gold, #C6A15B)' }}>Experience The Artistry</span>
          <h2 className="cr-display">Visit Our Lucknow Salon</h2>
          <p>
            Feel the weight, see the brilliance, and discuss bespoke diamond creations with our master gemologists in Mahanagar, Lucknow.
          </p>
          <div>
            <Link to="/collections/rings" className="cr-btn cr-btn--gold">
              Explore Collections
            </Link>
            <a
              href="https://share.google/FkH78O9JeWQrn62Ik"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-btn cr-btn--ghost"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

