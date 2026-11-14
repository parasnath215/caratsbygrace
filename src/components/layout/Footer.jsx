import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import styles from './Footer.module.css';

// Pinterest not in lucide-react by default; using a simple SVG inline
function PinterestIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.498 1.806 1.476 1.806 1.771 0 3.136-1.867 3.136-4.563 0-2.386-1.715-4.054-4.163-4.054-2.837 0-4.502 2.128-4.502 4.329 0 .857.33 1.776.742 2.277a.3.3 0 0 1 .069.283c-.076.313-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

const footerLinks = {
  Jewellery: [
    { label: 'Rings', href: '/collections/rings' },
    { label: 'Earrings', href: '/collections/earrings' },
    { label: 'Necklaces', href: '/collections/necklaces' },
    { label: 'Bracelets', href: '/collections/bracelets' },
    { label: 'Bangles', href: '/collections/bangles' },
    { label: 'Pendants', href: '/collections/pendants' },
    { label: 'Bridal', href: '/collections/bridal' },
  ],
  About: [
    { label: 'Our Story', href: '/about' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
  ],
  Atelier: [
    { label: 'Bespoke Commissions', href: '/bespoke' },
    { label: 'Jewelry Care Guide', href: '/policies/care' },
    { label: 'Privacy Policy', href: '/policies/privacy' },
    { label: 'Terms of Service', href: '/policies/terms' },
  ],
  Contact: [
    { label: 'hello@caratsbygrace.com', href: 'mailto:hello@caratsbygrace.com' },
    { label: '+91 91205 30531', href: 'tel:+919120530531' },
    { label: 'Carats By Grace, Mahanagar, Lucknow', href: 'https://share.google/FkH78O9JeWQrn62Ik' },
    { label: 'Location: Google Maps ↗', href: 'https://share.google/FkH78O9JeWQrn62Ik' },
  ],
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/caratsbygrace' },
  { icon: PinterestIcon, label: 'Pinterest', href: 'https://pinterest.com/caratsbygrace' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* ── Top: Logo + tagline ── */}
      <div className={styles.top}>
        <div className={styles.container}>
          <div className={styles.brandRow}>
            <Link to="/" className={styles.logoLink} aria-label="Carats by Grace — Home">
              <BrandLogo variant="light" height={50} />
            </Link>
            {/* [PLACEHOLDER: confirm tagline with client] */}
            <p className={styles.tagline}>Every carat, a choice.</p>
          </div>
        </div>
      </div>

      {/* ── Gold divider ── */}
      <hr className={styles.divider} aria-hidden="true" />

      {/* ── Link grid ── */}
      <div className={styles.grid}>
        <div className={styles.container}>
          <div className={styles.cols}>
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className={styles.col}>
                <h3 className={styles.colHeading}>{heading}</h3>
                <ul className={styles.linkList}>
                  {links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith('http') || l.href.startsWith('mailto') || l.href.startsWith('tel') ? (
                        <a href={l.href} className={styles.footerLink} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {l.label}
                        </a>
                      ) : (
                        <Link to={l.href} className={styles.footerLink}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className={styles.bottom}>
        <div className={styles.container}>
          <div className={styles.bottomRow}>
            {/* Social */}
            <div className={styles.socials}>
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialLink}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Atelier credentials */}
            <p className={styles.payments} aria-label="Atelier Credentials">
              Book Appointment · IGI Certified Diamonds
            </p>

            {/* Back to top */}
            <button className={styles.backToTop} onClick={scrollToTop} aria-label="Back to top">
              <ArrowUp size={16} strokeWidth={1.5} />
            </button>
          </div>

          <p className={styles.legal}>
            © {new Date().getFullYear()} Carats by Grace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
