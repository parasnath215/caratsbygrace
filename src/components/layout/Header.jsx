// src/components/layout/Header.jsx
// Carats by Grace — Global Header
// Luxury Digital Catalogue & Brand Showcase · Mahanagar, Lucknow

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, MessageCircle, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import BrandLogo from '../ui/BrandLogo';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import styles from './Header.module.css';

export default function Header() {
  const { items: wishlistItems } = useWishlist();
  const { toggleSearch } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);

  const wishlistCount = wishlistItems?.length ?? 0;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const nav = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Collections', href: '/collections', mega: true },
    { label: 'Exclusive Designs', href: '/exclusive-designs', badge: '1-of-1' },
    { label: 'Bespoke', href: '/bespoke' },
    { label: 'Grown Diamonds', href: '/grown-diamonds' },
    { label: 'Contact', href: '/contact' },
  ];

  const megaData = {
    'By Category': [
      { name: 'Rings & Solitaires', href: '/collections/rings' },
      { name: 'Engagement Rings', href: '/collections/rings' },
      { name: 'Earrings & Studs', href: '/collections/earrings' },
      { name: 'Necklaces & Chokers', href: '/collections/necklaces' },
      { name: 'Pendants', href: '/collections/pendants' },
      { name: 'Bracelets & Cuffs', href: '/collections/bracelets' },
      { name: 'Bangles', href: '/collections/bangles' },
    ],
    'Signature Lines': [
      { name: 'Exclusive Designs (Never Repeat)', href: '/exclusive-designs' },
      { name: 'The Empress Collection', href: '/collections/the-empress' },
      { name: 'Solitaire Essentials', href: '/collections/solitaire-essentials' },
      { name: 'The Nocturne Edit', href: '/collections/the-nocturne-edit' },
      { name: 'Bespoke Studio', href: '/bespoke' },
    ],
    'The Atelier': [
      { name: 'Our Story & Founders', href: '/about' },
      { name: 'The Art of Grown Diamonds', href: '/grown-diamonds' },
      { name: 'IGI Quality Commitment', href: '/grown-diamonds#4cs' },
      { name: 'Lucknow Showroom Visit', href: '/contact' },
    ],
  };

  const directWhatsAppUrl = buildWhatsAppUrl({
    type: 'general',
  });

  return (
    <header className={styles.header} onMouseLeave={() => setMegaOpen(false)}>
      <div className={styles.inner}>
        {/* Mobile Hamburger on Left */}
        <button
          className={styles.burger}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          type="button"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        {/* ── Left Nav Links (Desktop) ── */}
        <nav className={styles.navLeft} aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`${styles.navLink} ${
                location.pathname === item.href ? styles.navLinkActive : ''
              }`}
              aria-current={location.pathname === item.href ? 'page' : undefined}
              onMouseEnter={() => setMegaOpen(Boolean(item.mega))}
              onFocus={() => setMegaOpen(Boolean(item.mega))}
            >
              {item.label}
              {item.badge && (
                <span
                  style={{
                    fontSize: '0.55rem',
                    padding: '2px 5px',
                    borderRadius: 999,
                    background: 'rgba(93, 10, 36, 0.1)',
                    color: 'var(--burgundy)',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* ── Logo (Centered) ── */}
        <div className={styles.logoWrap}>
          <Link to="/" className={styles.logoLink} aria-label="Carats by Grace — Home">
            <BrandLogo height={44} />
          </Link>
        </div>

        {/* ── Utility Icons (Right) ── */}
        <div className={styles.utilities}>
          <button
            className={styles.iconBtn}
            onClick={toggleSearch}
            aria-label="Search"
            type="button"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Link
            to="/wishlist"
            className={styles.iconBtn}
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {wishlistCount}
              </span>
            )}
          </Link>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconBtn}
            aria-label="Atelier WhatsApp Concierge"
            title="Chat with Atelier Concierge"
          >
            <MessageCircle size={20} strokeWidth={1.5} />
          </a>

          <Link to="/contact" className={styles.consultBtn}>
            Book Visit
          </Link>
        </div>
      </div>

      {/* ── Mega Menu ── */}
      <div
        className={`${styles.mega} ${megaOpen ? styles.megaOpen : ''}`}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className={styles.megaInner}>
          {Object.entries(megaData).map(([heading, items]) => (
            <div className={styles.megaCol} key={heading}>
              <h4>{heading}</h4>
              {items.map((it) => (
                <Link
                  key={it.name}
                  to={it.href}
                  onClick={() => setMegaOpen(false)}
                >
                  {it.name}
                </Link>
              ))}
            </div>
          ))}

          <div className={styles.megaCol}>
            <h4>Exclusive Masterpiece</h4>
            <Link
              className={styles.megaImg}
              to="/exclusive-designs"
              onClick={() => setMegaOpen(false)}
            >
              <img
                src="/assets/model1/m1_8424_final.webp"
                alt="Designs That Never Repeat preview"
                loading="lazy"
              />
            </Link>
            <p
              style={{
                fontSize: '0.74rem',
                color: 'var(--muted)',
                margin: '8px 0 0',
                letterSpacing: '0.04em',
              }}
            >
              One design. One owner. Forever yours.
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileHeader}>
          <Link
            to="/"
            className={styles.logoLink}
            onClick={() => setMobileOpen(false)}
          >
            <BrandLogo height={34} />
          </Link>
          <button
            className={styles.iconBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.mobileBody}>
          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/about"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>
          </div>

          {/* Collections with Sub-categories */}
          <div className={styles.mobileGroup}>
            <button
              className={styles.mobileTrigger}
              aria-expanded={mobileGroup === 'Collections'}
              onClick={() =>
                setMobileGroup(mobileGroup === 'Collections' ? null : 'Collections')
              }
              type="button"
            >
              <span>Collections</span>
              <ChevronDown
                size={16}
                style={{
                  transform: mobileGroup === 'Collections' ? 'rotate(180deg)' : 'none',
                  transition: 'transform .25s ease',
                }}
              />
            </button>
            <div
              className={styles.mobileSub}
              style={{ maxHeight: mobileGroup === 'Collections' ? 400 : 0 }}
            >
              <Link to="/collections" onClick={() => setMobileOpen(false)}>
                All Jewellery
              </Link>
              <Link to="/collections/rings" onClick={() => setMobileOpen(false)}>
                Rings & Solitaires
              </Link>
              <Link to="/collections/earrings" onClick={() => setMobileOpen(false)}>
                Earrings & Studs
              </Link>
              <Link to="/collections/necklaces" onClick={() => setMobileOpen(false)}>
                Necklaces & Chokers
              </Link>
              <Link to="/collections/pendants" onClick={() => setMobileOpen(false)}>
                Pendants
              </Link>
              <Link to="/collections/bracelets" onClick={() => setMobileOpen(false)}>
                Bracelets & Cuffs
              </Link>
            </div>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/exclusive-designs"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>Exclusive Designs</span>
              <span
                style={{
                  fontSize: '0.62rem',
                  padding: '2px 6px',
                  borderRadius: 999,
                  background: 'var(--burgundy)',
                  color: '#FFF',
                  letterSpacing: '0.08em',
                }}
              >
                1-OF-1
              </span>
            </Link>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/bespoke"
              onClick={() => setMobileOpen(false)}
            >
              Bespoke Jewellery
            </Link>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/grown-diamonds"
              onClick={() => setMobileOpen(false)}
            >
              The Art of Grown Diamonds
            </Link>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/contact"
              onClick={() => setMobileOpen(false)}
            >
              Contact & Lucknow Showroom
            </Link>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
            >
              My Saved Pieces ({wishlistCount})
            </Link>
          </div>

          <div className={styles.mobileGroup}>
            <Link
              className={styles.mobileTrigger}
              to="/admin"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '0.9rem', color: 'var(--muted)' }}
            >
              Staff Portal (CMS)
            </Link>
          </div>

          {/* Quick WhatsApp Action inside Mobile Drawer */}
          <div style={{ marginTop: 28 }}>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: 'var(--burgundy)',
                color: '#FAF6F1',
                padding: '12px 18px',
                borderRadius: 2,
                fontSize: '0.74rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <MessageCircle size={16} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
