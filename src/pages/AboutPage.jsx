// src/pages/AboutPage.jsx
// Carats by Grace — About Page
// The story of Carats by Grace, founded by Nishi Athwani, and our flagship atelier in Mahanagar, Lucknow.

import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { EDITORIAL_ASSETS } from '../data/assets';

const ABOUT_CSS = `
.ab-page {
  background: var(--ivory, #FAF6F1);
  color: var(--ink, #17120F);
  font-family: var(--sans, 'Jost', sans-serif);
  overflow-x: hidden;
}
.ab-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding-inline: clamp(20px, 5vw, 64px);
}
.ab-eyebrow {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold, #C6A15B);
  font-weight: 600;
  margin-bottom: 12px;
}
.ab-display {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 0;
}

/* Hero */
.ab-hero {
  padding-top: clamp(48px, 7vw, 96px);
  padding-bottom: clamp(36px, 5vw, 64px);
  text-align: center;
  border-bottom: 1px solid var(--line, #E9E1D8);
  background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F1 100%);
}
.ab-hero__title {
  font-size: clamp(2.4rem, 5vw, 4rem);
  color: var(--ink, #17120F);
  margin-bottom: 18px;
}
.ab-hero__lede {
  color: var(--muted, #7A6F70);
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  max-width: 64ch;
  margin: 0 auto;
  line-height: 1.65;
}

/* Two-column Narrative Section */
.ab-story {
  padding-block: clamp(48px, 7vw, 96px);
}
.ab-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 6vw, 80px);
  align-items: center;
}
.ab-media {
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 12px 36px rgba(23, 18, 15, 0.06);
  background: #EFE8E0;
}
.ab-media img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  display: block;
}
.ab-copy h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin: 8px 0 20px;
  color: var(--ink, #17120F);
}
.ab-copy p {
  color: #4A3E3D;
  font-size: 0.98rem;
  line-height: 1.75;
  margin: 0 0 18px;
}
.ab-quote {
  margin: 28px 0 0;
  padding: 20px 24px;
  border-left: 2px solid var(--gold, #C6A15B);
  background: rgba(198, 161, 91, 0.08);
}
.ab-quote p {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-style: italic;
  font-size: 1.15rem;
  line-height: 1.5;
  color: var(--burgundy, #7B1E3A);
  margin: 0 0 8px;
}
.ab-quote cite {
  display: block;
  font-size: 0.76rem;
  font-style: normal;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted, #7A6F70);
  font-weight: 500;
}

/* Atelier / Showroom Section */
.ab-atelier {
  padding-block: clamp(48px, 7vw, 96px);
  background: #FFFFFF;
  border-block: 1px solid var(--line, #E9E1D8);
}
.ab-atelier__card {
  margin-top: 24px;
  padding: 22px 24px;
  background: var(--ivory, #FAF6F1);
  border: 1px solid var(--line, #E9E1D8);
  border-radius: 2px;
}
.ab-atelier__address {
  font-size: 0.95rem;
  color: var(--ink, #17120F);
  margin: 0 0 14px;
  line-height: 1.5;
}
.ab-atelier__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.ab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 20px;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  border-radius: 1px;
  transition: all 0.25s ease;
}
.ab-btn--solid {
  background: var(--burgundy, #7B1E3A);
  color: var(--ivory, #FAF6F1);
  border: 1px solid var(--burgundy, #7B1E3A);
}
.ab-btn--solid:hover {
  background: #4A1124;
  color: #FFFFFF;
}
.ab-btn--ghost {
  background: transparent;
  color: var(--ink, #17120F);
  border: 1px solid var(--ink, #17120F);
}
.ab-btn--ghost:hover {
  background: var(--ink, #17120F);
  color: #FFFFFF;
}

/* Pillars Grid */
.ab-pillars {
  padding-block: clamp(48px, 7vw, 84px);
}
.ab-pillars__head {
  text-align: center;
  margin-bottom: clamp(32px, 5vw, 56px);
}
.ab-pillars__head h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  margin: 8px 0 0;
}
.ab-pillars__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.ab-pillar-card {
  background: #FFFFFF;
  border: 1px solid var(--line, #E9E1D8);
  padding: 28px 24px;
  border-radius: 2px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.ab-pillar-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(23, 18, 15, 0.05);
}
.ab-pillar-card__icon {
  font-size: 1.4rem;
  color: var(--gold, #C6A15B);
  margin-bottom: 14px;
  display: inline-block;
}
.ab-pillar-card h3 {
  font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0 0 10px;
  color: var(--ink, #17120F);
}
.ab-pillar-card p {
  color: var(--muted, #7A6F70);
  font-size: 0.86rem;
  line-height: 1.6;
  margin: 0;
}

/* CTA strip */
.ab-cta {
  padding-block: clamp(48px, 6vw, 72px);
  background: var(--burgundy, #7B1E3A);
  color: var(--ivory, #FAF6F1);
  text-align: center;
}
.ab-cta h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  color: var(--ivory, #FAF6F1);
  margin: 8px 0 12px;
}
.ab-cta p {
  color: rgba(250, 246, 241, 0.8);
  font-size: 0.95rem;
  max-width: 52ch;
  margin: 0 auto 26px;
  line-height: 1.6;
}
.ab-cta .ab-btn--solid {
  background: var(--gold, #C6A15B);
  border-color: var(--gold, #C6A15B);
  color: var(--ink, #17120F);
}
.ab-cta .ab-btn--solid:hover {
  background: #B38E46;
}

/* Responsive */
@media (max-width: 900px) {
  .ab-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .ab-pillars__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .ab-pillars__grid {
    grid-template-columns: 1fr;
  }
  .ab-atelier__actions {
    flex-direction: column;
  }
  .ab-btn {
    width: 100%;
  }
}
`;

export default function AboutPage() {
  useDocumentTitle('About Us · The House of Grace');

  return (
    <div className="ab-page">
      <style>{ABOUT_CSS}</style>

      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-wrap">
          <span className="ab-eyebrow">The House of Grace</span>
          <h1 className="ab-display ab-hero__title">Every Carat, A Choice.</h1>
          <p className="ab-hero__lede">
            Founded by Nishi Athwani, Carats by Grace was born from a desire to reimagine modern diamond jewellery — pieces considered in proportion, crafted with restraint, and made to be lived in every day.
          </p>
        </div>
      </section>

      {/* Origin & Founder Story */}
      <section className="ab-story">
        <div className="ab-wrap">
          <div className="ab-grid">
            <div className="ab-media">
              <img
                src={EDITORIAL_ASSETS.story1}
                alt="Carats by Grace jewellery curation"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ab-copy">
              <span className="ab-eyebrow">The Origin</span>
              <h2 className="ab-display">Made To Be Worn, Not Kept Away</h2>
              <p>
                For generations, fine jewellery in India has often been reserved for rare family celebrations and locked away in bank vaults. Carats by Grace was born to change that dialogue.
              </p>
              <p>
                Founded by creator and fashion storyteller <strong>Nishi Athwani</strong>, the brand brings a fresh, contemporary sensibility to the world of fine diamonds. Each piece is designed to transition seamlessly from your morning espresso to evening galas — marrying heirloom longevity with daily wearability.
              </p>
              <div className="ab-quote">
                <p>
                  &ldquo;Fine jewellery should not be an afterthought reserved for once a year. It should be a personal signature — an extension of your own everyday grace.&rdquo;
                </p>
                <cite>— Nishi Athwani, Founder</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Lucknow Showroom & Atelier */}
      <section className="ab-atelier">
        <div className="ab-wrap">
          <div className="ab-grid" style={{ direction: 'rtl' }}>
            <div className="ab-media" style={{ direction: 'ltr' }}>
              <img
                src={EDITORIAL_ASSETS.visitAtelier}
                alt="Carats by Grace Lucknow atelier interior"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ab-copy" style={{ direction: 'ltr' }}>
              <span className="ab-eyebrow">Flagship Boutique</span>
              <h2 className="ab-display">The Mahanagar Atelier, Lucknow</h2>
              <p>
                Located in the heart of Mahanagar, Lucknow, our physical boutique offers an intimate salon experience. Clients are invited to view our full collection of solitaires, cocktail rings, and bridal edits in an unhurried, private setting.
              </p>
              <p>
                Whether you are selecting a diamond milestone gift, discussing a bespoke ring commission, or having an heirloom piece inspected, our gemologists provide dedicated one-on-one guidance.
              </p>

              <div className="ab-atelier__card">
                <div className="ab-atelier__address">
                  <strong>Carats By Grace</strong><br />
                  Mahanagar, Lucknow, Uttar Pradesh<br />
                  <span style={{ color: 'var(--muted, #7A6F70)', fontSize: '0.85rem' }}>
                    Open Monday – Saturday · 11:00 AM – 8:00 PM
                  </span>
                </div>
                <div className="ab-atelier__actions">
                  <a
                    href="https://share.google/FkH78O9JeWQrn62Ik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ab-btn ab-btn--solid"
                  >
                    View on Google Maps ↗
                  </a>
                  <a
                    href="https://wa.me/919120530531?text=Hello%20Carats%20by%20Grace%2C%20I%20would%20like%20to%20book%20a%20private%20atelier%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ab-btn ab-btn--ghost"
                  >
                    Book Private Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Strip */}
      <section className="ab-cta">
        <div className="ab-wrap">
          <span className="ab-eyebrow" style={{ color: 'var(--gold, #C6A15B)' }}>Begin Your Journey</span>
          <h2 className="ab-display">Explore The Collections</h2>
          <p>
            Discover our curated edits of solitaires, fine bands, diamond necklaces, and earrings made for modern living.
          </p>
          <Link to="/" className="ab-btn ab-btn--solid">
            Discover Fine Jewellery
          </Link>
        </div>
      </section>
    </div>
  );
}

