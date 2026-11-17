// src/components/ui/FloatingWhatsApp.jsx
import React from 'react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  const url = buildWhatsAppUrl({ type: 'general' });

  return (
    <div className={styles.floatWrap}>
      <span className={styles.tooltip}>Chat with Atelier Concierge</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatBtn}
        aria-label="Connect with Carats by Grace on WhatsApp"
      >
        <span className={styles.pulseRing} aria-hidden="true" />
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 20l1.5-4A8 8 0 1 1 9 19.4L4 20Z" />
          <path d="M9 10c.5 2 2 3.5 4 4" />
        </svg>
      </a>
    </div>
  );
}
