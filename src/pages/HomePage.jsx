// src/pages/HomePage.jsx
// Carats by Grace — Luxury Digital Catalogue & Brand Showcase
// Official Brand Color: Burgundy #5D0A24 · Mahanagar, Lucknow
// No e-commerce / No online payments — Direct WhatsApp ordering and private consultation booking

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Gem,
  Compass,
  ArrowRight,
  MessageCircle,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Search,
  Heart,
  User,
  Star,
  CheckCircle2,
} from 'lucide-react';
import BrandLogo from '../components/ui/BrandLogo';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWishlist } from '../context/WishlistContext';
import { useUI } from '../context/UIContext';
import {
  CATEGORIES,
  COLLECTIONS,
  TESTIMONIALS,
  DIAMOND_SHAPES,
  getStoredProducts,
} from '../data/products';
import {
  buildWhatsAppUrl,
  SHOWROOM_ADDRESS,
  SHOWROOM_PHONE,
  GOOGLE_MAPS_LINK,
  INSTAGRAM_LINK,
} from '../utils/whatsapp';
import ExclusiveAnnouncementSection from '../components/exclusive/ExclusiveAnnouncementSection';
import InstagramReelsSection from '../components/home/InstagramReelsSection';

/* ===========================================================================
   1. BRAND TOKENS & LUXURY EDITORIAL STYLES
=========================================================================== */
const HOME_CSS = `
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
  --serif: "Cormorant Garamond", "Playfair Display", Georgia, serif;
  --sans: "Jost", "Inter", system-ui, -apple-system, sans-serif;
  --ease: cubic-bezier(.22, .61, .36, 1);
  --pad-x: clamp(20px, 5vw, 80px);
}

.cg-page { background: var(--white); color: var(--ink); font-family: var(--sans); overflow-x: hidden; }
.cg-wrap { max-width: 1400px; margin: 0 auto; padding-inline: var(--pad-x); }
.cg-wrap-narrow { max-width: 980px; margin: 0 auto; padding-inline: var(--pad-x); }

.cg-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--gold); font-weight: 500; margin-bottom: 14px;
}
.cg-eyebrow-light { color: rgba(250, 246, 241, 0.78); }

.cg-display {
  font-family: var(--serif); font-weight: 400; line-height: 1.08;
  letter-spacing: -0.01em; margin: 0 0 18px; color: var(--ink);
}
.cg-display-light { color: var(--ivory); }

.cg-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 50px; padding: 0 28px; border-radius: 1px; font-size: 0.75rem;
  letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600;
  transition: all 0.3s var(--ease); cursor: pointer; text-decoration: none;
  white-space: nowrap; box-sizing: border-box;
}
.cg-btn-solid {
  background: var(--burgundy); color: var(--ivory); border: 1px solid var(--burgundy);
}
.cg-btn-solid:hover {
  background: var(--wine); border-color: var(--wine); transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(93, 10, 36, 0.25);
}
.cg-btn-gold {
  background: linear-gradient(135deg, #C6A15B 0%, #E2C98F 50%, #B8934A 100%);
  color: #17120F;
  border: 1px solid #EAD5A5;
  letter-spacing: 0.22em;
  font-weight: 600;
  box-shadow: 0 6px 24px rgba(198, 161, 91, 0.4);
}
.cg-btn-gold:hover {
  background: linear-gradient(135deg, #D4B26F 0%, #F0D7A0 50%, #C6A15B 100%);
  border-color: #FFFFFF;
  color: #120D0A;
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(198, 161, 91, 0.55);
}
.cg-btn-luxury-concierge {
  background: rgba(37, 3, 14, 0.75);
  color: var(--ivory);
  border: 1px solid rgba(198, 161, 91, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  letter-spacing: 0.2em;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.cg-btn-luxury-concierge:hover {
  background: var(--burgundy);
  border-color: var(--gold-light);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(93, 10, 36, 0.45);
}
.cg-btn-ghost-light {
  background: rgba(255, 255, 255, 0.08); color: var(--ivory);
  border: 1px solid rgba(250, 246, 241, 0.45); backdrop-filter: blur(4px);
}
.cg-btn-ghost-light:hover {
  background: var(--ivory); color: var(--wine-deep); border-color: var(--ivory); transform: translateY(-2px);
}
.cg-btn-outline {
  background: transparent; color: var(--ink); border: 1px solid var(--ink);
}
.cg-btn-outline:hover {
  background: var(--ink); color: var(--ivory); transform: translateY(-2px);
}
.cg-btn-whatsapp {
  background: linear-gradient(135deg, #133D2A 0%, #1A5238 100%);
  color: #FFFFFF;
  border: 1px solid rgba(198, 161, 91, 0.6);
  box-shadow: 0 6px 20px rgba(19, 61, 42, 0.3);
  letter-spacing: 0.18em;
}
.cg-btn-whatsapp:hover {
  background: linear-gradient(135deg, #194D35 0%, #226445 100%);
  border-color: var(--gold);
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(19, 61, 42, 0.45);
}

/* Announcement */
.cg-ann {
  background: var(--burgundy); color: var(--ivory); font-size: 0.68rem;
  letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500;
  text-align: center; padding: 8px var(--pad-x); border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Header */
.cg-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
  transition: all 0.3s ease;
}
.cg-header__inner {
  display: grid; grid-template-columns: auto 1fr auto;
  align-items: center; min-height: 76px; gap: 20px;
}
.cg-nav-desktop {
  display: flex; gap: 24px; align-items: center; justify-content: center;
}
.cg-nav-link {
  font-size: 0.74rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink); font-weight: 500; position: relative; padding: 6px 0;
  transition: color 0.2s ease;
}
.cg-nav-link::after {
  content: ""; position: absolute; left: 0; bottom: 0;
  height: 1px; width: 0; background: var(--burgundy);
  transition: width 0.3s var(--ease);
}
.cg-nav-link:hover::after, .cg-nav-link.active::after { width: 100%; }
.cg-nav-link:hover { color: var(--burgundy); }

.cg-header-actions {
  display: flex; align-items: center; gap: 14px;
}
.cg-icon-btn {
  width: 40px; height: 40px; display: grid; place-items: center;
  color: var(--ink); border-radius: 50%; transition: all 0.2s ease;
  position: relative;
}
.cg-icon-btn:hover { color: var(--burgundy); background: var(--ivory); }
.cg-badge {
  position: absolute; top: 4px; right: 4px; background: var(--burgundy);
  color: var(--ivory); font-size: 0.6rem; border-radius: 999px;
  width: 16px; height: 16px; display: grid; place-items: center; font-weight: 600;
}
.cg-burger { display: none; width: 40px; height: 40px; place-items: center; cursor: pointer; border: 0; background: none; }

/* Mobile Menu */
.cg-mobile-menu {
  position: fixed; inset: 0; z-index: 150; background: var(--white);
  padding: 32px var(--pad-x); display: flex; flex-direction: column;
  overflow-y: auto; transform: translateX(-100%); transition: transform 0.35s var(--ease);
}
.cg-mobile-menu.open { transform: translateX(0); }
.cg-mobile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.cg-mobile-links { display: flex; flex-direction: column; gap: 20px; }
.cg-mobile-link { font-family: var(--serif); font-size: 1.45rem; color: var(--ink); text-transform: uppercase; }

/* ── Hero Banner ── */
.cg-hero {
  position: relative; min-height: 88vh; display: flex; align-items: center;
  justify-content: center; text-align: center; color: var(--ivory);
  overflow: hidden; background: #17120F;
}
.cg-hero-media {
  position: absolute; inset: 0; z-index: 1;
}
.cg-hero-media video,
.cg-hero-media img {
  width: 100%; height: 100%; object-fit: cover; object-position: center;
}
.cg-hero-overlay {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(18, 12, 14, 0.32) 0%,
    rgba(18, 12, 14, 0.18) 35%,
    rgba(18, 12, 14, 0.22) 65%,
    rgba(18, 12, 14, 0.42) 100%
  );
  pointer-events: none;
}
.cg-hero-content {
  position: relative; z-index: 3; max-width: 960px; padding: 60px var(--pad-x);
}
.cg-hero-title {
  font-family: var(--serif); font-size: clamp(2.8rem, 6.5vw, 5.2rem);
  font-weight: 400; line-height: 1.05; letter-spacing: -0.015em;
  margin: 12px 0 24px; color: var(--ivory);
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.75), 0 1px 4px rgba(0, 0, 0, 0.5);
}
.cg-hero-sub {
  font-size: clamp(1.05rem, 1.4vw, 1.25rem); line-height: 1.75;
  color: rgba(250, 246, 241, 0.96); max-width: 680px; margin: 0 auto 36px;
  font-weight: 300;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.7);
}
.cg-hero-ctas {
  display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
}

/* ── Shop by Category ── */
.cg-section { padding-block: clamp(64px, 8vw, 110px); }
.cg-cat-grid {
  display: grid; grid-template-columns: repeat(6, 1fr);
  gap: 20px; margin-top: 36px;
}
.cg-cat-card {
  display: flex; flex-direction: column; align-items: center;
  text-decoration: none; group: hover;
}
.cg-cat-thumb {
  width: 100%; aspect-ratio: 1/1.2; overflow: hidden;
  border-radius: 2px; background: #F0EAE4; margin-bottom: 14px;
  border: 1px solid var(--line); transition: all 0.35s var(--ease);
}
.cg-cat-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s var(--ease);
}
.cg-cat-card:hover .cg-cat-thumb {
  border-color: var(--burgundy); transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(93, 10, 36, 0.12);
}
.cg-cat-card:hover .cg-cat-thumb img { transform: scale(1.06); }
.cg-cat-name {
  font-family: var(--serif); font-size: 1.15rem; color: var(--ink);
  margin: 0; text-align: center; transition: color 0.2s ease;
}
.cg-cat-card:hover .cg-cat-name { color: var(--burgundy); }

/* ── Featured Collections ── */
.cg-coll-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 28px; margin-top: 40px;
}
.cg-coll-card {
  background: var(--ivory); border: 1px solid var(--line);
  border-radius: 2px; overflow: hidden; display: flex; flex-direction: column;
  transition: all 0.3s ease;
}
.cg-coll-card:hover {
  border-color: var(--gold); transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0,0,0,0.06);
}
.cg-coll-img {
  aspect-ratio: 4/5; overflow: hidden; background: #EAE3DA;
}
.cg-coll-img img {
  width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;
}
.cg-coll-card:hover .cg-coll-img img { transform: scale(1.05); }
.cg-coll-body { padding: 26px; display: flex; flex-direction: column; flex-grow: 1; }
.cg-coll-title { font-family: var(--serif); font-size: 1.6rem; margin: 0 0 8px; }
.cg-coll-desc { font-size: 0.9rem; line-height: 1.6; color: var(--muted); margin-bottom: 20px; flex-grow: 1; }

/* ── DESIGNS THAT NEVER REPEAT (Section 7) ── */
.cg-excl-section {
  background: linear-gradient(180deg, #1C030B 0%, #300512 40%, #5D0A24 100%);
  color: var(--ivory); position: relative; overflow: hidden;
}
.cg-excl-section::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 20%, rgba(198, 161, 91, 0.12) 0%, transparent 60%);
  pointer-events: none;
}
.cg-excl-inner {
  display: grid; grid-template-columns: 1fr 1.15fr;
  gap: clamp(40px, 6vw, 84px); align-items: center;
}
.cg-excl-copy { max-width: 540px; }
.cg-excl-highlight-box {
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(198, 161, 91, 0.35);
  padding: 24px; border-radius: 2px; margin: 24px 0; backdrop-filter: blur(6px);
}
.cg-excl-highlight-box p {
  font-family: var(--serif); font-size: 1.3rem; font-style: italic;
  color: var(--gold-light); margin: 0; line-height: 1.5;
}
.cg-excl-gallery {
  display: grid; grid-template-columns: 1fr 1fr; gap: 18px;
}
.cg-excl-card {
  background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(250, 246, 241, 0.15);
  border-radius: 2px; overflow: hidden; transition: all 0.3s ease; position: relative;
}
.cg-excl-card:hover { transform: translateY(-4px); border-color: var(--gold); }
.cg-excl-img { aspect-ratio: 4/5; overflow: hidden; position: relative; }
.cg-excl-img img { width: 100%; height: 100%; object-fit: cover; }
.cg-one-badge {
  position: absolute; top: 12px; left: 12px;
  background: var(--burgundy); color: #FFF; font-size: 0.62rem;
  letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px;
  font-weight: 600; border-radius: 1px;
}
.cg-excl-details { padding: 18px; }
.cg-excl-details h3 { font-family: var(--serif); font-size: 1.15rem; margin: 0 0 6px; }
.cg-excl-details span { font-size: 0.76rem; color: var(--gold-light); display: block; }

/* ── The Art of Grown Diamonds ── */
.cg-science-section { background: var(--ivory); }
.cg-science-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 80px); align-items: center;
}
.cg-comp-pills { display: flex; flex-direction: column; gap: 12px; margin: 28px 0; }
.cg-comp-pill {
  background: var(--white); border: 1px solid var(--line);
  padding: 16px 20px; border-radius: 2px; display: flex; justify-content: space-between;
  align-items: center; font-size: 0.9rem;
}
.cg-comp-pill strong { color: var(--burgundy); }

/* ── Bespoke Jewellery ── */
.cg-bespoke-grid {
  display: grid; grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(40px, 6vw, 84px); align-items: center;
}
.cg-shapes-mini-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 12px; margin: 24px 0;
}
.cg-shape-mini-btn {
  background: var(--ivory); border: 1px solid var(--line);
  padding: 12px 8px; border-radius: 2px; text-align: center;
  font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s ease;
}
.cg-shape-mini-btn:hover, .cg-shape-mini-btn.active {
  border-color: var(--burgundy); background: var(--burgundy); color: #FFF;
}
.cg-form-box {
  background: var(--white); border: 1px solid var(--line);
  padding: clamp(24px, 4vw, 36px); border-radius: 2px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.04);
}

/* ── Why Carats by Grace ── */
.cg-why-grid {
  display: grid; grid-template-columns: repeat(5, 1fr);
  gap: 20px; margin-top: 40px; text-align: center;
}
.cg-why-card {
  padding: 28px 18px; background: var(--ivory); border: 1px solid var(--line);
  border-radius: 2px; display: flex; flex-direction: column; align-items: center;
}
.cg-why-icon {
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(198, 161, 91, 0.12); color: var(--burgundy);
  display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
}
.cg-why-title {
  font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase;
  font-weight: 600; margin: 0 0 8px; color: var(--ink);
}
.cg-why-desc { font-size: 0.84rem; line-height: 1.55; color: var(--muted); margin: 0; }

/* ── Showroom Experience ── */
.cg-showroom-grid {
  display: grid; grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(40px, 6vw, 80px); align-items: center;
}
.cg-showroom-card {
  background: var(--ivory); border: 1px solid var(--line);
  padding: clamp(24px, 4vw, 36px); border-radius: 2px;
}

/* ── Testimonials ── */
.cg-testi-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 24px; margin-top: 36px;
}
.cg-testi-card {
  background: var(--white); border: 1px solid var(--line);
  padding: 30px; border-radius: 2px; display: flex; flex-direction: column;
}
.cg-testi-quote {
  font-family: var(--serif); font-size: 1.15rem; font-style: italic;
  line-height: 1.6; color: #2B2423; flex-grow: 1; margin-bottom: 20px;
}

/* ── Instagram Grid ── */
.cg-insta-grid {
  display: grid; grid-template-columns: repeat(6, 1fr);
  gap: 12px; margin: 36px 0;
}
.cg-insta-item {
  aspect-ratio: 1/1; overflow: hidden; border-radius: 2px; position: relative;
}
.cg-insta-item img {
  width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;
}
.cg-insta-item:hover img { transform: scale(1.08); }

/* ── Certified Authenticity ── */
.cg-cert-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
.cg-cert-card {
  background: var(--ivory);
  border: 1px solid var(--line);
  padding: clamp(20px, 4vw, 32px);
  border-radius: 2px;
  text-align: center;
}
.cg-cert-img {
  width: 100%;
  height: clamp(180px, 30vw, 240px);
  object-fit: cover;
  border-radius: 2px;
  display: block;
}

/* ── Brand Philosophy ── */
.cg-philosophy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 6vw, 84px);
  align-items: center;
}
.cg-philosophy-img-wrap {
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.cg-philosophy-img {
  width: 100%;
  height: clamp(280px, 45vw, 520px);
  object-fit: cover;
  display: block;
}

/* Responsive */
@media (max-width: 1100px) {
  .cg-cat-grid { grid-template-columns: repeat(3, 1fr); }
  .cg-why-grid { grid-template-columns: repeat(3, 1fr); }
  .cg-testi-grid { grid-template-columns: 1fr; }
  .cg-coll-grid { grid-template-columns: 1fr; }
  .cg-insta-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 860px) {
  .cg-nav-desktop { display: none; }
  .cg-burger { display: grid; }
  .cg-excl-inner,
  .cg-science-grid,
  .cg-bespoke-grid,
  .cg-cert-grid,
  .cg-philosophy-grid,
  .cg-showroom-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .cg-excl-gallery { grid-template-columns: 1fr; }
  .cg-why-grid { grid-template-columns: 1fr; }
  .cg-cat-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 540px) {
  .cg-cert-grid .cg-btn,
  .cg-philosophy-grid .cg-btn,
  .cg-bespoke-grid .cg-btn {
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
  }
  .cg-cert-card {
    padding: 20px 16px;
  }
  .cg-philosophy-img {
    height: 300px;
  }
}
`;

export default function HomePage() {
  useDocumentTitle('Your Grown Diamond Destination · Premium Fine Jewellery');
  const navigate = useNavigate();
  const { items: wishlistItems } = useWishlist();
  const { toggleSearch } = useUI();

  const [selectedBespokeShape, setSelectedBespokeShape] = useState('Oval Brilliant');
  const [bespokeName, setBespokeName] = useState('');
  const [bespokePhone, setBespokePhone] = useState('');
  const [bespokePreference, setBespokePreference] = useState('Solitaire Engagement Ring');

  const productsList = useMemo(() => getStoredProducts(), []);
  const exclusiveShowcase = useMemo(() => {
    return productsList.filter((p) => p.isOneOfOne || p.collection === 'the-empress').slice(0, 4);
  }, [productsList]);

  const handleBespokeSubmit = (e) => {
    e.preventDefault();
    const url = buildWhatsAppUrl({
      type: 'bespoke',
      bespokeData: {
        name: bespokeName,
        phone: bespokePhone,
        preference: bespokePreference,
        shape: selectedBespokeShape,
      },
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="cg-page">
      <style>{HOME_CSS}</style>

      {/* ============================================================
          PART 2: SECTION 4 — HERO BANNER
          ============================================================ */}
      <section className="cg-hero" aria-label="Hero Showcase">
        <div className="cg-hero-media">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/video/hero-desktop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cg-hero-overlay" />

        <div className="cg-hero-content">
          <span className="cg-eyebrow cg-eyebrow-light">
            Carats by Grace · Fine Jewellery Atelier
          </span>
          <h1 className="cg-hero-title">YOUR GROWN DIAMOND DESTINATION.</h1>
          <p className="cg-hero-sub">
            Discover a world of exceptional grown diamond jewellery, where
            timeless brilliance meets contemporary design.
          </p>
          <div className="cg-hero-ctas">
            <Link to="/collections" className="cg-btn cg-btn-gold">
              EXPLORE COLLECTIONS
            </Link>
            <a
              href={buildWhatsAppUrl({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="cg-btn cg-btn-luxury-concierge"
            >
              <MessageCircle size={18} color="#E0C88F" />
              CONNECT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXCLUSIVE COLLECTION ANNOUNCEMENT (Landing-Page Block)
          ============================================================ */}
      <ExclusiveAnnouncementSection />

      {/* ============================================================
          PART 2: SECTION 5 — SHOP BY CATEGORY
          ============================================================ */}
      <section className="cg-section" aria-label="Shop by Category">
        <div className="cg-wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <span className="cg-eyebrow">Explore Our Silhouettes</span>
            <h2 className="cg-display" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}>
              Curated by Category
            </h2>
          </div>

          <div className="cg-cat-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} to={`/collections/${cat.slug}`} className="cg-cat-card">
                <div className="cg-cat-thumb">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <h3 className="cg-cat-name">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 6 — FEATURED COLLECTIONS
          ============================================================ */}
      <section className="cg-section" style={{ background: 'var(--ivory)', borderTop: '1px solid var(--line)' }}>
        <div className="cg-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
            <div>
              <span className="cg-eyebrow">Atelier Signatures</span>
              <h2 className="cg-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: 0 }}>
                Featured Collections
              </h2>
            </div>
            <Link to="/collections" className="cg-btn cg-btn-outline" style={{ minHeight: 42, padding: '0 20px' }}>
              View All Edits <ArrowRight size={15} />
            </Link>
          </div>

          <div className="cg-coll-grid">
            {COLLECTIONS.slice(0, 3).map((coll) => (
              <article key={coll.slug} className="cg-coll-card">
                <div className="cg-coll-img">
                  <img src={coll.heroImage} alt={coll.name} loading="lazy" />
                </div>
                <div className="cg-coll-body">
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 6 }}>
                    {coll.tagline}
                  </span>
                  <h3 className="cg-coll-title">{coll.name}</h3>
                  <p className="cg-coll-desc">{coll.description}</p>
                  <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                    <Link to={`/collections/${coll.slug}`} className="cg-btn cg-btn-solid" style={{ flexGrow: 1, minHeight: 44, padding: '0 16px', fontSize: '0.72rem' }}>
                      DISCOVER COLLECTION
                    </Link>
                    <a
                      href={buildWhatsAppUrl({
                        type: 'general',
                        customMessage: `Hello Carats by Grace! I am interested in exploring ${coll.name} collection. Please share designs.`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cg-btn cg-btn-outline"
                      style={{ minHeight: 44, padding: '0 14px' }}
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 7 — NEW SECTION: DESIGNS THAT NEVER REPEAT
          ============================================================ */}
      <section className="cg-section cg-excl-section" aria-label="Designs That Never Repeat">
        <div className="cg-wrap">
          <div className="cg-excl-inner">
            <div className="cg-excl-copy">
              <span className="cg-eyebrow cg-eyebrow-light">
                The Ultimate Expression of Exclusivity
              </span>
              <h2 className="cg-display cg-display-light" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}>
                DESIGNS THAT NEVER REPEAT.
              </h2>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--gold-light)', fontStyle: 'italic', marginBottom: 20 }}>
                ONE DESIGN. ONE OWNER. FOREVER YOURS.
              </div>

              <p style={{ color: 'rgba(250, 246, 241, 0.88)', lineHeight: 1.8, fontSize: '1rem' }}>
                Some things are too special to be made twice. Every exclusive
                design at Carats by Grace is thoughtfully envisioned to stand
                apart. Created as a one-time expression of artistry, each design
                is available for a single purchase only. Once it finds its
                owner, it will never be recreated.
              </p>

              <div className="cg-excl-highlight-box">
                <p>
                  "Because true exclusivity isn't about owning something rare.
                  It's about owning something no one else can."
                </p>
              </div>

              <Link to="/exclusive-designs" className="cg-btn cg-btn-gold">
                DISCOVER EXCLUSIVE DESIGNS
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Exclusive Pieces Visual Mini-Grid */}
            <div className="cg-excl-gallery">
              {exclusiveShowcase.slice(0, 2).map((piece) => (
                <div key={piece.id} className="cg-excl-card">
                  <div className="cg-excl-img">
                    <img src={piece.images[0]} alt={piece.name} loading="lazy" />
                    <span className="cg-one-badge">ONE OF ONE</span>
                  </div>
                  <div className="cg-excl-details">
                    <h3>{piece.name}</h3>
                    <span>{piece.specs}</span>
                    <div style={{ marginTop: 12 }}>
                      <Link
                        to={`/products/${piece.slug}`}
                        style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFF', textDecoration: 'underline' }}
                      >
                        Explore Creation →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 8 — THE ART OF GROWN DIAMONDS
          ============================================================ */}
      <section className="cg-section cg-science-section">
        <div className="cg-wrap">
          <div className="cg-science-grid">
            <div>
              <span className="cg-eyebrow">The Science of Brilliance</span>
              <h2 className="cg-display" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)' }}>
                THE SCIENCE OF BRILLIANCE.<br />
                THE ART OF PERFECTION.
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#4A3E3D' }}>
                Grown diamonds possess the same essential physical, chemical and
                optical properties as mined diamonds. Created through advanced
                technology, they offer the same diamond brilliance with a
                different origin story.
              </p>

              <div className="cg-comp-pills">
                <div className="cg-comp-pill">
                  <span>Carbon Composition</span>
                  <strong>100% Pure Crystallized Carbon</strong>
                </div>
                <div className="cg-comp-pill">
                  <span>Hardness on Mohs Scale</span>
                  <strong>10 (Equal to Mined Diamonds)</strong>
                </div>
                <div className="cg-comp-pill">
                  <span>Optical Refractive Index</span>
                  <strong>2.42 (Identical Scintillation & Fire)</strong>
                </div>
                <div className="cg-comp-pill">
                  <span>Chemical Purity</span>
                  <strong>Type IIa (Top 2% Purity in the World)</strong>
                </div>
              </div>

              <Link to="/grown-diamonds" className="cg-btn cg-btn-solid">
                DISCOVER GROWN DIAMONDS
                <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 48px rgba(0,0,0,0.1)' }}>
              <img
                src="/assets/model2/m2_8153.webp"
                alt="Science and Art of Grown Diamonds"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 9 — BESPOKE STUDIO TEASER
          ============================================================ */}
      <section className="cg-section" style={{ background: 'var(--white)', borderTop: '1px solid var(--line)' }}>
        <div className="cg-wrap">
          <div className="cg-bespoke-grid" style={{ alignItems: 'center' }}>
            <div>
              <span className="cg-eyebrow">Interactive Customizer</span>
              <h2 className="cg-display" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', margin: '0 0 16px' }}>
                Design your own
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#4A3E3D', maxWidth: 540, marginBottom: 28 }}>
                Experience our interactive Bespoke Studio to customize your piece from stone to silhouette.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link
                  to="/bespoke"
                  className="cg-btn cg-btn-solid"
                  style={{ background: 'var(--burgundy)', borderColor: 'var(--burgundy)', color: '#FFF' }}
                >
                  Start Designing
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={buildWhatsAppUrl({ type: 'consultation' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cg-btn cg-btn-outline"
                >
                  <MessageCircle size={16} />
                  Book a Consultation
                </a>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 2, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}>
              <img
                src="/assets/model1/m1_8403_final.webp"
                alt="Bespoke Studio · Design Your Own Fine Jewellery"
                loading="lazy"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 10 — WHY CARATS BY GRACE?
          ============================================================ */}
      <section className="cg-section" style={{ background: '#FAF6F1', borderTop: '1px solid var(--line)' }}>
        <div className="cg-wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <span className="cg-eyebrow">The Atelier Distinction</span>
            <h2 className="cg-display" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}>
              Why Carats by Grace?
            </h2>
          </div>

          <div className="cg-why-grid">
            <div className="cg-why-card">
              <div className="cg-why-icon"><Award size={22} /></div>
              <h3 className="cg-why-title">IGI CERTIFIED DIAMONDS</h3>
              <p className="cg-why-desc">Independently documented with microscopic laser inscription.</p>
            </div>

            <div className="cg-why-card">
              <div className="cg-why-icon"><Compass size={22} /></div>
              <h3 className="cg-why-title">EXCEPTIONAL CRAFTSMANSHIP</h3>
              <p className="cg-why-desc">Hand-finished in solid 18K gold and 950 platinum.</p>
            </div>

            <div className="cg-why-card">
              <div className="cg-why-icon"><Gem size={22} /></div>
              <h3 className="cg-why-title">DISTINCTIVE DESIGNS</h3>
              <p className="cg-why-desc">Art-deco and modern silhouettes made to stand apart.</p>
            </div>

            <div className="cg-why-card">
              <div className="cg-why-icon"><Compass size={22} /></div>
              <h3 className="cg-why-title">BESPOKE CUSTOMISATION</h3>
              <p className="cg-why-desc">Tailored around your individual proportions and vision.</p>
            </div>

            <div className="cg-why-card">
              <div className="cg-why-icon"><ShieldCheck size={22} /></div>
              <h3 className="cg-why-title">PERSONAL CONSULTATIONS</h3>
              <p className="cg-why-desc">Private viewings in our Mahanagar, Lucknow salon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 11 — IGI CERTIFICATION & QUALITY ASSURANCE
          ============================================================ */}
      <section className="cg-section" style={{ background: 'var(--white)' }}>
        <div className="cg-wrap">
          <div className="cg-cert-grid">
            <div>
              <span className="cg-eyebrow">
                <ShieldCheck size={14} /> Certified Authenticity
              </span>
              <h2 className="cg-display" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}>
                BRILLIANCE, BACKED BY CERTIFICATION.
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4A3E3D' }}>
                Every centre stone grown diamond in our collection is
                independently certified by the International Gemological
                Institute (IGI). Our gemologists ensure precision evaluation of
                Cut, Colour, Clarity, and Carat weight, giving you complete
                transparency.
              </p>

              <div style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <CheckCircle2 size={18} color="var(--gold)" />
                  <span style={{ fontSize: '0.92rem' }}>100% Type IIa Optical Purity</span>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <CheckCircle2 size={18} color="var(--gold)" />
                  <span style={{ fontSize: '0.92rem' }}>Unique Girdle Laser Inscription</span>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <CheckCircle2 size={18} color="var(--gold)" />
                  <span style={{ fontSize: '0.92rem' }}>Zero Conflict · Responsible Modern Origin</span>
                </div>
              </div>

              <Link to="/grown-diamonds" className="cg-btn cg-btn-solid">
                KNOW YOUR DIAMOND
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="cg-cert-card">
              <span style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--burgundy)', color: '#FFF', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>
                Independent IGI Laboratory Report
              </span>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', margin: '0 0 10px' }}>
                Verified Diamond Documentation
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 20px' }}>
                Every diamond is delivered with authentic grading documentation.
              </p>
              <img
                src="/assets/categories/cat_pendants.webp"
                alt="Diamond Inspection"
                className="cg-cert-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 12 — ABOUT US / BRAND STORY
          ============================================================ */}
      <section className="cg-section" style={{ background: 'var(--burgundy)', color: 'var(--ivory)' }}>
        <div className="cg-wrap">
          <div className="cg-philosophy-grid">
            <div className="cg-philosophy-img-wrap">
              <img
                src="/assets/model1/m1_8446_final.webp"
                alt="Carats by Grace Craftsmanship and Founders"
                loading="lazy"
                className="cg-philosophy-img"
              />
            </div>

            <div>
              <span className="cg-eyebrow cg-eyebrow-light">
                The Brand Philosophy
              </span>
              <h2 className="cg-display cg-display-light" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
                WHERE EVERY DIAMOND FINDS ITS STORY.
              </h2>
              <p style={{ color: 'rgba(250, 246, 241, 0.88)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 18 }}>
                Carats by Grace was born from a shared vision of bringing a fresh
                perspective to the world of fine jewellery — one that celebrates
                grown diamonds, distinctive design and the beauty of
                individuality.
              </p>
              <p style={{ color: 'rgba(250, 246, 241, 0.88)', lineHeight: 1.8, fontSize: '1rem', marginBottom: 28 }}>
                Founded by Nishi and Prateek, we create more than jewellery; we
                create an invitation to celebrate your own radiance without
                convention.
              </p>
              <Link to="/about" className="cg-btn cg-btn-ghost-light">
                READ OUR STORY
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 13 — SHOWROOM EXPERIENCE
          ============================================================ */}
      <section className="cg-section" style={{ background: 'var(--white)' }}>
        <div className="cg-wrap">
          <div className="cg-showroom-grid">
            <div className="cg-showroom-card">
              <span className="cg-eyebrow">
                <MapPin size={14} /> Flagship Boutique
              </span>
              <h2 className="cg-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}>
                EXPERIENCE THE BRILLIANCE.
              </h2>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: '#4A3E3D', marginBottom: 24 }}>
                Discover your next treasured piece at Carats by Grace,
                Mahanagar, Lucknow.
              </p>

              <div style={{ marginBottom: 20 }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>
                  Showroom Address
                </strong>
                <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--ink)' }}>
                  {SHOWROOM_ADDRESS}
                </p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>
                  Telephone & Enquiries
                </strong>
                <p style={{ margin: 0, fontSize: '0.96rem', color: 'var(--ink)' }}>
                  <a href={`tel:${SHOWROOM_PHONE.replace(/\s+/g, '')}`} style={{ color: 'var(--burgundy)', textDecoration: 'underline' }}>
                    {SHOWROOM_PHONE}
                  </a>
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cg-btn cg-btn-outline"
                >
                  <ExternalLink size={15} />
                  GET DIRECTIONS
                </a>
                <a
                  href={buildWhatsAppUrl({ type: 'consultation' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cg-btn cg-btn-solid"
                >
                  <MessageCircle size={15} />
                  BOOK A VISIT
                </a>
              </div>
            </div>

            <div style={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}>
              <img
                src="/assets/model2/cg_jewellers8593.webp"
                alt="Carats by Grace Mahanagar Lucknow Atelier"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 14 — TESTIMONIALS
          ============================================================ */}
      <section className="cg-section" style={{ background: '#FAF6F1', borderTop: '1px solid var(--line)' }}>
        <div className="cg-wrap">
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <span className="cg-eyebrow">Client Reflections</span>
            <h2 className="cg-display" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}>
              Voices of Grace
            </h2>
          </div>

          <div className="cg-testi-grid">
            {TESTIMONIALS.slice(0, 3).map((t, idx) => (
              <div key={idx} className="cg-testi-card">
                <div style={{ display: 'flex', gap: 4, color: 'var(--gold)', marginBottom: 14 }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="cg-testi-quote">"{t.quote}"</p>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--ink)' }}>{t.name}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.city} · {t.piece}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PART 2: SECTION 15 — LIVE INSTAGRAM REELS INTEGRATION
          ============================================================ */}
      <InstagramReelsSection />

      {/* ============================================================
          FOOTER (Part 5, Section 23 — No Ecommerce / No Online Payment)
          ============================================================ */}
      <footer style={{ background: '#17120F', color: 'var(--ivory)', padding: '64px 0 32px', borderTop: '1px solid #2B2120' }}>
        <div className="cg-wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 36, marginBottom: 48 }}>
            <div>
              <BrandLogo variant="light" height={44} />
              <p style={{ color: 'rgba(250, 246, 241, 0.75)', fontSize: '0.88rem', lineHeight: 1.7, marginTop: 16 }}>
                Carats by Grace — Premium grown diamond fine jewellery atelier.
                Mahanagar, Lucknow.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
                Quick Navigation
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.86rem' }}>
                <li><Link to="/about" style={{ color: 'rgba(250, 246, 241, 0.8)' }}>About Us</Link></li>
                <li><Link to="/collections" style={{ color: 'rgba(250, 246, 241, 0.8)' }}>Collections</Link></li>
                <li><Link to="/exclusive-designs" style={{ color: 'rgba(250, 246, 241, 0.8)' }}>Exclusive Designs</Link></li>
                <li><Link to="/bespoke" style={{ color: 'rgba(250, 246, 241, 0.8)' }}>Bespoke Jewellery</Link></li>
                <li><Link to="/grown-diamonds" style={{ color: 'rgba(250, 246, 241, 0.8)' }}>Grown Diamonds</Link></li>
                <li><Link to="/contact" style={{ color: 'rgba(250, 246, 241, 0.8)' }}>Contact & Showroom</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.74rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
                Showroom & Concierge
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'rgba(250, 246, 241, 0.8)', lineHeight: 1.6, margin: '0 0 10px' }}>
                {SHOWROOM_ADDRESS}
              </p>
              <p style={{ fontSize: '0.86rem', color: 'rgba(250, 246, 241, 0.8)', margin: '0 0 10px' }}>
                Tel: <a href={`tel:${SHOWROOM_PHONE.replace(/\s+/g, '')}`} style={{ color: 'var(--gold)' }}>{SHOWROOM_PHONE}</a>
              </p>
              <p style={{ fontSize: '0.86rem', color: 'rgba(250, 246, 241, 0.8)', margin: '0 0 16px' }}>
                Email: <a href="mailto:hello@caratsbygrace.com" style={{ color: 'var(--gold)' }}>hello@caratsbygrace.com</a>
              </p>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}
              >
                View on Google Maps ↗
              </a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: '0.76rem', color: 'rgba(250, 246, 241, 0.6)' }}>
            <span>© {new Date().getFullYear()} Carats by Grace. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link to="/about" style={{ color: 'inherit' }}>Privacy Policy</Link>
              <Link to="/about" style={{ color: 'inherit' }}>Terms of Service</Link>
              <Link to="/admin" style={{ color: 'inherit' }}>Admin Portal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
