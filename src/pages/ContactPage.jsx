// src/pages/ContactPage.jsx
// Carats by Grace — Showroom Experience, Location & Consultation Booking

import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Calendar } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  SHOWROOM_ADDRESS,
  SHOWROOM_PHONE,
  GOOGLE_MAPS_LINK,
  buildWhatsAppUrl,
} from '../utils/whatsapp';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  useDocumentTitle('Showroom Experience & Atelier Consultation · Lucknow');

  const consultationUrl = buildWhatsAppUrl({ type: 'consultation' });

  return (
    <main className={styles.page}>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>
            <MapPin size={14} /> Mahanagar, Lucknow
          </span>
          <h1 className={styles.title}>EXPERIENCE THE BRILLIANCE.</h1>
          <p className={styles.lede}>
            Discover your next treasured piece at Carats by Grace, Mahanagar,
            Lucknow. We invite you into an intimate private salon setting for
            curated one-on-one viewing and bespoke consultations.
          </p>
        </div>
      </section>

      {/* ── Showroom Details ── */}
      <section className={styles.showroomSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.visualFrame}>
              <img
                src="/assets/model2/cg_jewellers8593.webp"
                alt="Carats by Grace Atelier Boutique Interior in Mahanagar, Lucknow"
                loading="lazy"
              />
            </div>

            <div className={styles.infoCard}>
              <h2>The Flagship Salon</h2>

              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} size={22} />
                <div>
                  <span className={styles.infoLabel}>Address & Location</span>
                  <p className={styles.infoValue}>
                    Carats By Grace<br />
                    Mahanagar, Lucknow, Uttar Pradesh 226006
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock className={styles.infoIcon} size={22} />
                <div>
                  <span className={styles.infoLabel}>Hours</span>
                  <p className={styles.infoValue}>
                    Monday – Saturday · 11:00 AM – 8:00 PM<br />
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted, #7A6F70)' }}>
                      Sunday by appointment only
                    </span>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} size={22} />
                <div>
                  <span className={styles.infoLabel}>Telephone</span>
                  <p className={styles.infoValue}>
                    <a href={`tel:${SHOWROOM_PHONE.replace(/\s+/g, '')}`}>
                      {SHOWROOM_PHONE}
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.actionRow}>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  <ExternalLink size={16} />
                  GET DIRECTIONS ↗
                </a>

                <a
                  href={consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnWhatsApp}
                >
                  <MessageCircle size={16} />
                  BOOK A VISIT VIA WHATSAPP
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className={styles.mapEmbed}>
            <iframe
              title="Carats by Grace Mahanagar Lucknow Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.908077592476!2d80.9427!3d26.8776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd9ea0c46231%3A0xc3c513258c735d4f!2sMahanagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
