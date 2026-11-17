import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, ArrowUp, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import {
  SHOWROOM_ADDRESS,
  SHOWROOM_PHONE,
  SHOWROOM_HOURS,
  GOOGLE_MAPS_LINK,
  INSTAGRAM_LINK,
  buildWhatsAppUrl,
} from '../../utils/whatsapp';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directWhatsAppUrl = buildWhatsAppUrl({ type: 'general' });

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* ── Top: Logo + Brand Philosophy ── */}
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.brandRow}>
            <Link to="/" className={styles.logoLink} aria-label="Carats by Grace — Home">
              <BrandLogo variant="light" height={48} />
            </Link>
            <p className={styles.tagline}>
              Beyond the Ordinary. Born to be Distinctive.
            </p>
          </div>
        </div>
      </div>

      {/* ── Gold divider ── */}
      <hr className={styles.divider} aria-hidden="true" />

      {/* ── Link grid ── */}
      <div className={styles.grid}>
        <div className={styles.container}>
          <div className={styles.cols}>
            {/* Col 1: Fine Jewellery */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>Fine Jewellery</h3>
              <ul className={styles.linkList}>
                <li><Link to="/collections/rings" className={styles.footerLink}>Rings & Solitaires</Link></li>
                <li><Link to="/collections/rings" className={styles.footerLink}>Engagement Rings</Link></li>
                <li><Link to="/collections/earrings" className={styles.footerLink}>Earrings & Studs</Link></li>
                <li><Link to="/collections/necklaces" className={styles.footerLink}>Necklaces & Chokers</Link></li>
                <li><Link to="/collections/pendants" className={styles.footerLink}>Pendants</Link></li>
                <li><Link to="/collections/bracelets" className={styles.footerLink}>Bracelets & Cuffs</Link></li>
              </ul>
            </div>

            {/* Col 2: The Atelier */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>The Atelier</h3>
              <ul className={styles.linkList}>
                <li><Link to="/about" className={styles.footerLink}>About Us & Founders</Link></li>
                <li><Link to="/exclusive-designs" className={styles.footerLink}>Designs That Never Repeat</Link></li>
                <li><Link to="/bespoke" className={styles.footerLink}>Bespoke Jewellery Experience</Link></li>
                <li><Link to="/grown-diamonds" className={styles.footerLink}>The Art of Grown Diamonds</Link></li>
                <li><Link to="/grown-diamonds#4cs" className={styles.footerLink}>IGI Quality & 4Cs Guide</Link></li>
                <li><Link to="/wishlist" className={styles.footerLink}>Saved Pieces</Link></li>
              </ul>
            </div>

            {/* Col 3: Showroom & Concierge */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>Showroom & Concierge</h3>
              <ul className={styles.linkList}>
                <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start', color: 'rgba(250, 246, 241, 0.8)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                  <MapPin size={16} style={{ flexShrink: 0, marginTop: 3, color: 'var(--gold)' }} />
                  <span>{SHOWROOM_ADDRESS}</span>
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                  <Phone size={14} style={{ color: 'var(--gold)' }} />
                  <a href={`tel:${SHOWROOM_PHONE.replace(/\s+/g, '')}`} className={styles.footerLink}>
                    {SHOWROOM_PHONE}
                  </a>
                </li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Mail size={14} style={{ color: 'var(--gold)' }} />
                  <a href="mailto:hello@caratsbygrace.com" className={styles.footerLink}>
                    hello@caratsbygrace.com
                  </a>
                </li>
                <li style={{ fontSize: '0.78rem', color: 'rgba(250, 246, 241, 0.65)', marginTop: 4 }}>
                  Hours: {SHOWROOM_HOURS}
                </li>
                <li style={{ marginTop: 6 }}>
                  <a
                    href={GOOGLE_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLink}
                    style={{ color: 'var(--gold)', textDecoration: 'underline' }}
                  >
                    View on Google Maps ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Private Consultation */}
            <div className={styles.col}>
              <h3 className={styles.colHeading}>Private Experience</h3>
              <p style={{ fontSize: '0.84rem', color: 'rgba(250, 246, 241, 0.75)', lineHeight: 1.6, margin: '0 0 16px' }}>
                Every diamond deserves an intentional journey. Connect directly with our founding gemologists on WhatsApp or schedule an atelier viewing in Mahanagar, Lucknow.
              </p>
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--gold)',
                  color: '#17120F',
                  padding: '10px 18px',
                  borderRadius: 2,
                  fontSize: '0.74rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Atelier</span>
              </a>
              <div style={{ marginTop: 20 }}>
                <Link to="/admin" style={{ fontSize: '0.72rem', color: 'rgba(250, 246, 241, 0.4)', textDecoration: 'none' }}>
                  Staff CMS Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.bottomRow}>
            {/* Social */}
            <div className={styles.socials}>
              <a
                href={INSTAGRAM_LINK}
                className={styles.socialLink}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href={directWhatsAppUrl}
                className={styles.socialLink}
                aria-label="WhatsApp Concierge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} strokeWidth={1.5} />
              </a>
            </div>

            {/* Atelier credentials */}
            <p className={styles.payments} aria-label="Atelier Credentials">
              100% Certified Grown Diamonds · IGI Certified · BIS 750 Hallmarked · No E-commerce (Direct WhatsApp Ordering)
            </p>

            {/* Back to top */}
            <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
              <ArrowUp size={16} strokeWidth={1.5} />
            </button>
          </div>

          <p className={styles.legal}>
            © {new Date().getFullYear()} Carats by Grace. All rights reserved. Mahanagar, Lucknow.
          </p>
        </div>
      </div>
    </footer>
  );
}
