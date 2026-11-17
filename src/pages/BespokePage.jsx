// src/pages/BespokePage.jsx
// Carats by Grace — Bespoke Jewellery & Atelier Customisation Experience

import React, { useState } from 'react';
import { MessageCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { DIAMOND_SHAPES } from '../data/products';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import styles from './BespokePage.module.css';

export default function BespokePage() {
  useDocumentTitle('Bespoke Jewellery · Designed Around You');

  const [selectedShape, setSelectedShape] = useState('Round Brilliant');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preference: 'Solitaire Ring',
    metal: '18K Yellow Gold',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildWhatsAppUrl({
      type: 'bespoke',
      bespokeData: {
        ...formData,
        shape: selectedShape,
      },
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const steps = [
    {
      num: '01',
      title: 'Private Ideation',
      desc: 'Connect with our gemologists in person at our Mahanagar salon or via digital consultation to discuss your vision, stone preferences, and budget.',
    },
    {
      num: '02',
      title: 'Diamond Curation',
      desc: 'We curate certified grown diamonds with optimal ratios, VVS clarity, and exceptional cut grades for your personal inspection and selection.',
    },
    {
      num: '03',
      title: '3D Render & Proportion',
      desc: 'Our design atelier drafts photorealistic 3D architectural renders and wax models to ensure stone security, comfort, and perfect balance.',
    },
    {
      num: '04',
      title: 'Master Handcrafting',
      desc: 'Crafted in 18K solid gold or 950 platinum by master jewelers, hallmarked, IGI certified, and presented in bespoke handcrafted casing.',
    },
  ];

  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>
            <Sparkles size={14} /> Made For You · Only For You
          </span>
          <h1 className={styles.title}>A DESIGN THAT BEGINS WITH YOU.</h1>
          <p className={styles.lede}>
            Your vision, your choice, your diamond. Discover jewellery designed
            around your individuality, crafted to reflect your personal style
            and story.
          </p>
        </div>
      </section>

      {/* ── Diamond Shapes Showcase ── */}
      <section className={styles.shapesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Step 1 · Explore Proportions</span>
            <h2 className={styles.sectionTitle}>Curate Your Diamond Shape</h2>
            <p style={{ color: 'var(--muted, #7A6F70)', fontSize: '0.95rem' }}>
              Select a signature silhouette to anchor your bespoke design.
            </p>
          </div>

          <div className={styles.shapesGrid}>
            {DIAMOND_SHAPES.map((shape) => {
              const isSelected = selectedShape === shape.label;
              return (
                <div
                  key={shape.id}
                  className={`${styles.shapeCard} ${isSelected ? styles.shapeCardActive : ''}`}
                  onClick={() => setSelectedShape(shape.label)}
                >
                  <span className={styles.shapeIcon}>✦</span>
                  <h3 className={styles.shapeName}>{shape.label}</h3>
                  <p className={styles.shapeDesc}>{shape.desc}</p>
                  {isSelected && (
                    <div style={{ marginTop: 12, color: 'var(--burgundy, #5D0A24)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                      Selected Shape
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The Bespoke Process ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} style={{ color: 'var(--ivory, #FAF6F1)' }}>
            <span className={styles.eyebrow}>The Atelier Journey</span>
            <h2 className={styles.sectionTitle} style={{ color: 'var(--ivory, #FAF6F1)' }}>
              How We Co-Create Your Piece
            </h2>
            <p style={{ color: 'rgba(250, 246, 241, 0.75)', fontSize: '0.95rem' }}>
              From initial sketch to certified heirloom, every step is deliberate.
            </p>
          </div>

          <div className={styles.processGrid}>
            {steps.map((st) => (
              <div key={st.num} className={styles.processCard}>
                <div className={styles.processStep}>{st.num}</div>
                <h3 className={styles.processTitle}>{st.title}</h3>
                <p className={styles.processDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formInfo}>
              <span className={styles.eyebrow}>Begin Your Commission</span>
              <h2>Start the Conversation</h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.75', color: '#4A3E3D', marginBottom: 24 }}>
                Whether you have an exact concept or simply an inspiration, our
                concierge team will guide you through diamond options, setting
                architectures, and metal finishes.
              </p>
              <div style={{ padding: '20px', background: 'var(--ivory, #FAF6F1)', borderLeft: '3px solid var(--burgundy, #5D0A24)' }}>
                <p style={{ margin: 0, fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--burgundy, #5D0A24)' }}>
                  Selected Diamond Shape: <strong>{selectedShape}</strong>
                </p>
              </div>
            </div>

            <div className={styles.formCard}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className={styles.formInput}
                    placeholder="e.g. Radhika Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>WhatsApp / Contact Number *</label>
                  <input
                    type="tel"
                    required
                    className={styles.formInput}
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Jewellery Preference</label>
                  <select
                    className={styles.formSelect}
                    value={formData.preference}
                    onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                  >
                    <option value="Solitaire Engagement Ring">Solitaire Engagement Ring</option>
                    <option value="Cocktail / Statement Ring">Cocktail / Statement Ring</option>
                    <option value="Eternity Band">Eternity Band</option>
                    <option value="Diamond Choker / Necklace">Diamond Choker / Necklace</option>
                    <option value="Tennis Bracelet / Cuff">Tennis Bracelet / Cuff</option>
                    <option value="Chandelier or Stud Earrings">Chandelier or Stud Earrings</option>
                    <option value="Full Bridal Suite">Full Bridal Suite</option>
                    <option value="Other Custom Piece">Other Custom Piece</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Preferred Metal</label>
                  <select
                    className={styles.formSelect}
                    value={formData.metal}
                    onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
                  >
                    <option value="18K Yellow Gold">18K Yellow Gold</option>
                    <option value="18K White Gold">18K White Gold</option>
                    <option value="18K Rose Gold">18K Rose Gold</option>
                    <option value="950 Platinum">950 Platinum</option>
                    <option value="Two-Tone Gold">Two-Tone Gold</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Vision / Specific Requests</label>
                  <textarea
                    rows={4}
                    className={styles.formTextarea}
                    placeholder="Tell us about your timeline, preferred carat weight, or design inspirations..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className={styles.btnSubmit}>
                  <MessageCircle size={18} />
                  SUBMIT & CONNECT ON WHATSAPP
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
