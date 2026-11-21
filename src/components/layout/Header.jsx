// src/components/layout/Header.jsx
// Carats by Grace — Luxury Two-Tier Global Header
// Top Bar: Logo (Left) · Pill Search Bar with Camera & Mic (Center) · 5 Luxury Action Icons (Right)
// Bottom Bar: Category / Navigation row with delicate micro-icons matching reference aesthetic

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Gem,
  Store, Menu,
  X,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import BrandLogo from '../ui/BrandLogo';
import AnnouncementBar from './AnnouncementBar';
import { buildWhatsAppUrl, SHOWROOM_PHONE } from '../../utils/whatsapp';
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

  // Carats by Grace navigation items (clean minimalist menu items without icons)
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Exclusive Collection', href: '/exclusive-collection', badge: '1-OF-1', isHighlight: true },
    { label: 'Collections', href: '/collections', mega: true },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'About Us', href: '/about' },
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
    ],
    'The Atelier': [
      { name: 'Our Story & Founders', href: '/about' },
      { name: 'The Art of Grown Diamonds', href: '/grown-diamonds' },
      { name: 'IGI Quality Commitment', href: '/grown-diamonds#4cs' },
      { name: 'Lucknow Showroom Visit', href: '/contact' },
    ],
  };

  const directWhatsAppUrl = buildWhatsAppUrl({ type: 'general' });

  return (
    <header className={styles.headerWrapper} onMouseLeave={() => setMegaOpen(false)}>
      {/* ── Top Announcement Bar with Dismiss Cross Button ── */}
      {/* <AnnouncementBar /> — Hidden for now */}

      {/* ============================================================
          ROW 1: MAIN HEADER
          Logo (Left) · Wide Pill Search (Center) · 5 Action Icons (Right)
          ============================================================ */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          {/* Mobile Menu Trigger */}
          <button
            className={styles.mobileBurger}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            type="button"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Left: Brand Logo */}
          <div className={styles.logoCol}>
            <Link to="/" className={styles.logoLink} aria-label="Carats by Grace — Home">
              <BrandLogo height={44} variant="dark" />
            </Link>
          </div>

          {/* Center: Luxury Pill Search Bar */}
          <div
            className={styles.searchPill}
            onClick={toggleSearch}
            role="search"
            aria-label="Search fine jewellery and grown diamonds"
            title="Click to search rings, solitaires, jewellery..."
          >
            <div className={styles.searchPillLeft}>
              <Search size={18} strokeWidth={1.6} className={styles.searchPillIcon} />
              <span className={styles.searchPlaceholder}>
                Search for engagement rings, solitaires, fine jewellery...
              </span>
            </div>

            </div>

          {/* Right: Action icons & guaranteed visible Book a Visit CTA */}
          <div className={styles.actionIconsRow}>
            {/* Mobile Search Icon (visible on <= 1024px) */}
            <button
              type="button"
              className={styles.mobileSearchIconBtn}
              onClick={toggleSearch}
              aria-label="Search fine jewellery"
              title="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* 1. Grown Diamonds Icon */}
            <Link
              to="/grown-diamonds"
              className={`${styles.actionIconBtn} ${styles.hideOnSmallMobile}`}
              aria-label="The Art of Grown Diamonds"
              title="Grown Diamonds"
            >
              <Gem size={19} strokeWidth={1.5} />
            </Link>

            {/* 2. Visit Atelier Icon (hidden on mobile <= 768px because 'Book a Visit' CTA is already right here) */}
            <Link
              to="/contact"
              className={`${styles.actionIconBtn} ${styles.hideOnMobile}`}
              aria-label="Visit Atelier · Mahanagar, Lucknow"
              title="Visit Atelier"
            >
              <Store size={19} strokeWidth={1.5} />
            </Link>

            {/* 3. Contact WhatsApp Icon */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionIconBtn}
              aria-label="Contact Atelier on WhatsApp"
              title="Contact WhatsApp"
            >
              <MessageCircle size={19} strokeWidth={1.5} />
            </a>

            {/* 4. Book a Visit CTA — Guaranteed 100% visible and never cut off */}
            <Link
              to="/contact"
              className={styles.bookVisitBtn}
              title="Book a Private Atelier Visit"
            >
              <span className={styles.bookVisitTextDesktop}>Book a Visit</span>
              <span className={styles.bookVisitTextMobile}>Book Visit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          ROW 2: SUB-NAVIGATION BAR (Clean Minimalist Menu Row)
          ============================================================ */}
      <nav className={styles.subNavBar} aria-label="Category and Collection Navigation">
        <div className={styles.subNavInner}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <div
                key={item.label}
                className={styles.subNavItem}
                onMouseEnter={() => setMegaOpen(Boolean(item.mega))}
              >
                <Link
                  to={item.href}
                  className={`${styles.subNavLink} ${isActive ? styles.subNavLinkActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge && <span className={styles.subBadge}>{item.badge}</span>}
                  {item.mega && (
                    <ChevronDown
                      size={12}
                      strokeWidth={1.8}
                      className={`${styles.subNavChevron} ${megaOpen ? styles.chevronRotated : ''}`}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* ============================================================
          MEGA MENU (Opens under Collections)
          ============================================================ */}
      <div
        className={`${styles.mega} ${megaOpen ? styles.megaOpen : ''}`}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
        role="region"
        aria-label="Collections Submenu"
      >
        <div className={styles.megaInner}>
          {Object.entries(megaData).map(([heading, items]) => (
            <div className={styles.megaCol} key={heading}>
              <h4 className={styles.megaHeading}>{heading}</h4>
              <ul className={styles.megaList}>
                {items.map((it) => (
                  <li key={it.name}>
                    <Link
                      to={it.href}
                      className={styles.megaLink}
                      onClick={() => setMegaOpen(false)}
                    >
                      {it.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured Editorial Preview */}
          <div className={styles.megaEditorial}>
            <span className={styles.megaEditorialTag}>Singular Masterpiece</span>
            <Link
              to="/exclusive-designs"
              className={styles.megaImgWrap}
              onClick={() => setMegaOpen(false)}
            >
              <img
                src="/assets/model1/m1_8424_final.webp"
                alt="Designs That Never Repeat preview"
                loading="lazy"
              />
            </Link>
            <p className={styles.megaEditorialCaption}>
              One design. One owner. Forever yours.
            </p>
            <Link
              to="/exclusive-designs"
              className={styles.megaEditorialBtn}
              onClick={() => setMegaOpen(false)}
            >
              Discover Exclusive Creations →
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================
          MOBILE DRAWER
          ============================================================ */}
      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileHeader}>
          <Link
            to="/"
            className={styles.logoLink}
            onClick={() => setMobileOpen(false)}
          >
            <BrandLogo height={34} variant="dark" />
          </Link>
          <button
            className={styles.mobileCloseBtn}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Search Button */}
        <div className={styles.mobileSearchWrap}>
          <button
            type="button"
            className={styles.mobileSearchBtn}
            onClick={() => {
              setMobileOpen(false);
              toggleSearch();
            }}
          >
            <Search size={16} strokeWidth={1.6} />
            <span>Search fine jewellery...</span>
          </button>
        </div>

        <div className={styles.mobileLinks}>
          <Link
            className={styles.mobileLink}
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            <span>Home</span>
          </Link>

          {/* Expandable Collections */}
          <div className={styles.mobileAccordion}>
            <button
              className={styles.mobileAccordionTrigger}
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
                  transition: 'transform 0.25s ease',
                }}
              />
            </button>
            <div
              className={styles.mobileSubList}
              style={{ maxHeight: mobileGroup === 'Collections' ? 360 : 0 }}
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

          <Link
            className={styles.mobileLink}
            to="/exclusive-collection"
            onClick={() => setMobileOpen(false)}
          >
            <span>Exclusive Collection</span>
            <span className={styles.subBadge} style={{ marginLeft: 'auto' }}>1-OF-1</span>
          </Link>

          <Link
            className={styles.mobileLink}
            to="/craftsmanship"
            onClick={() => setMobileOpen(false)}
          >
            <span>Craftsmanship</span>
          </Link>

          <Link
            className={styles.mobileLink}
            to="/about"
            onClick={() => setMobileOpen(false)}
          >
            <span>About Us</span>
          </Link>

          <Link
            className={styles.mobileLink}
            to="/contact"
            onClick={() => setMobileOpen(false)}
          >
            <span>Visit Atelier</span>
          </Link>

          <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #ECE3D9' }}>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileConciergeBtn}
            >
              <MessageCircle size={18} />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
