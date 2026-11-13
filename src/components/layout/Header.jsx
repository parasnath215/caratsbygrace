// src/components/layout/Header.jsx
// Carats by Grace — Global Header (for inner pages)
// Matches the exact alignment, layout, and luxury aesthetic of the Home Page header.

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import BrandLogo from '../ui/BrandLogo';
import styles from './Header.module.css';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
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

  // Close any open menu when the route changes
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const nav = [
    { label: 'Rings', href: '/collections/rings', mega: true },
    { label: 'Earrings', href: '/collections/earrings', mega: true },
    { label: 'Necklaces', href: '/collections/necklaces', mega: true },
    { label: 'Bracelets', href: '/collections/bracelets', mega: true },
    { label: 'Bridal', href: '/collections/bridal' },
    { label: 'Gifting', href: '/collections/gifting' },
    { label: 'High Jewellery', href: '/collections/high-jewellery' },
  ];

  const megaData = {
    'By Category': [
      { name: 'Rings', href: '/collections/rings' },
      { name: 'Earrings', href: '/collections/earrings' },
      { name: 'Necklaces', href: '/collections/necklaces' },
      { name: 'Bracelets', href: '/collections/bracelets' },
      { name: 'Bangles', href: '/collections/bangles' },
      { name: 'Pendants', href: '/collections/pendants' },
    ],
    'By Occasion': [
      { name: 'Everyday', href: '/collections/everyday' },
      { name: 'Gifting', href: '/collections/gifting' },
      { name: 'Bridal', href: '/collections/bridal' },
      { name: 'Festive', href: '/collections/festive' },
      { name: 'Anniversary', href: '/collections/anniversary' },
    ],
    'By Price': [
      { name: 'Under ₹50K', href: '/collections/under-50k' },
      { name: '₹50K – ₹1L', href: '/collections/50k-1l' },
      { name: 'Above ₹1L', href: '/collections/above-1l' },
    ],
  };

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
              <span className={styles.badge} aria-hidden="true">{wishlistCount}</span>
            )}
          </Link>

          <button
            className={styles.iconBtn}
            onClick={() => navigate('/account')}
            aria-label="Account"
            type="button"
          >
            <User size={20} strokeWidth={1.5} />
          </button>

          <button
            className={styles.iconBtn}
            onClick={toggleCart}
            aria-label={`Bag (${totalItems} items)`}
            type="button"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className={styles.badge} aria-hidden="true">{totalItems}</span>
            )}
          </button>
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
            <h4>Featured</h4>
            <Link
              className={styles.megaImg}
              to="/collections/rings"
              onClick={() => setMegaOpen(false)}
            >
              <img
                src="/assets/model1/m1_8247_final.webp"
                alt="New collection preview"
                loading="lazy"
              />
            </Link>
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
          {Object.entries(megaData).map(([title, items]) => (
            <div className={styles.mobileGroup} key={title}>
              <button
                className={styles.mobileTrigger}
                aria-expanded={mobileGroup === title}
                onClick={() =>
                  setMobileGroup(mobileGroup === title ? null : title)
                }
                type="button"
              >
                <span>{title}</span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileGroup === title ? 'rotate(180deg)' : 'none',
                    transition: 'transform .25s ease',
                  }}
                />
              </button>
              <div
                className={styles.mobileSub}
                style={{ maxHeight: mobileGroup === title ? 400 : 0 }}
              >
                {items.map((i) => (
                  <Link
                    key={i.name}
                    to={i.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {[
            { label: 'Bridal', href: '/collections/bridal' },
            { label: 'Gifting', href: '/collections/gifting' },
            { label: 'High Jewellery', href: '/collections/high-jewellery' },
            { label: 'Wishlist', href: '/wishlist' },
            { label: 'My Account', href: '/account' },
          ].map((l) => (
            <div className={styles.mobileGroup} key={l.label}>
              <Link
                className={styles.mobileTrigger}
                to={l.href}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            </div>
          ))}
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
