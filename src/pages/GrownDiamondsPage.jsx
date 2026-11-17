// src/pages/GrownDiamondsPage.jsx
// Carats by Grace — The Art of Grown Diamonds & IGI Certification

import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './GrownDiamondsPage.module.css';

export default function GrownDiamondsPage() {
  useDocumentTitle('The Art of Grown Diamonds · Science & Brilliance');

  const comparisonRows = [
    {
      feature: 'Chemical Composition',
      grown: '100% Pure Crystallized Carbon',
      mined: '100% Pure Crystallized Carbon',
      match: true,
    },
    {
      feature: 'Hardness (Mohs Scale)',
      grown: '10 (Hardest substance known)',
      mined: '10 (Hardest substance known)',
      match: true,
    },
    {
      feature: 'Refractive Index',
      grown: '2.42 (Identical optical sparkle)',
      mined: '2.42 (Identical optical sparkle)',
      match: true,
    },
    {
      feature: 'Crystal System',
      grown: 'Cubic (Isometric)',
      mined: 'Cubic (Isometric)',
      match: true,
    },
    {
      feature: 'Type IIa Purity',
      grown: '100% Type IIa (Rarest nitrogen-free purity)',
      mined: 'Less than 2% of mined stones qualify',
      match: true,
    },
    {
      feature: 'Independent Certification',
      grown: 'IGI Certified with unique laser inscription',
      mined: 'IGI / GIA Certified',
      match: true,
    },
    {
      feature: 'Origin & Ethics',
      grown: 'Consciously created with clean energy',
      mined: 'Extensive earth excavation',
      match: false,
    },
  ];

  const fourCs = [
    {
      letter: 'C',
      title: 'Cut',
      desc: 'Precision cuts engineered for maximum fire, scintillation, and optical dispersion. We feature Super Ideal and Triple Excellent grades.',
    },
    {
      letter: 'C',
      title: 'Colour',
      desc: 'Focused in the premium colourless range (D, E, F) as well as vivid natural fancy hues that represent the pinnacle of diamond rarity.',
    },
    {
      letter: 'C',
      title: 'Clarity',
      desc: 'Curated for VVS (Very Very Slightly Included) clarity, where microscopic inclusions are undetectable even under 10x magnification.',
    },
    {
      letter: 'C',
      title: 'Carat',
      desc: 'Measured with calibrated precision, allowing you to achieve commanding presence and balanced proportions without ethical compromise.',
    },
  ];

  return (
    <main className={styles.page}>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>
            <Sparkles size={14} /> The Science of Brilliance
          </span>
          <h1 className={styles.title}>
            THE SCIENCE OF BRILLIANCE.<br />
            THE ART OF PERFECTION.
          </h1>
          <p className={styles.lede}>
            Grown diamonds possess the same essential physical, chemical and
            optical properties as mined diamonds. Created through advanced
            technology, they offer the same diamond brilliance with a different
            origin story.
          </p>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Side-by-Side Analysis</span>
            <h2 className={styles.sectionTitle}>
              Identical Brilliance. A Modern Origin.
            </h2>
            <p style={{ color: 'var(--muted, #7A6F70)', fontSize: '0.95rem' }}>
              From atomic crystal lattice to optical fire, explore how grown
              diamonds match mined diamonds in every scientific dimension.
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.compTable}>
              <thead>
                <tr>
                  <th>Property / Quality</th>
                  <th>Carats by Grace Grown Diamonds</th>
                  <th>Mined Earth Diamonds</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className={styles.featureCol}>{row.feature}</td>
                    <td className={styles.highlightCell}>{row.grown}</td>
                    <td>{row.mined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── The 4Cs Breakdown ── */}
      <section className={styles.fourCsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader} style={{ color: 'var(--ivory, #FAF6F1)' }}>
            <span className={styles.eyebrow}>Grading Standards</span>
            <h2 className={styles.sectionTitle} style={{ color: 'var(--ivory, #FAF6F1)' }}>
              Understanding the 4Cs
            </h2>
            <p style={{ color: 'rgba(250, 246, 241, 0.75)', fontSize: '0.95rem' }}>
              Every grown diamond at Carats by Grace is evaluated under identical
              international gemological criteria.
            </p>
          </div>

          <div className={styles.fourCsGrid}>
            {fourCs.map((c, idx) => (
              <div key={idx} className={styles.fourCCard}>
                <div className={styles.fourCLabel}>{c.letter}</div>
                <h3 className={styles.fourCTitle}>{c.title}</h3>
                <p className={styles.fourCDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IGI Certification & Trust ── */}
      <section className={styles.certSection}>
        <div className={styles.container}>
          <div className={styles.certGrid}>
            <div className={styles.certContent}>
              <span className={styles.eyebrow}>
                <ShieldCheck size={14} /> Trust & Transparency
              </span>
              <h2>BRILLIANCE, BACKED BY CERTIFICATION.</h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4A3E3D' }}>
                At Carats by Grace, confidence is integral to every creation.
                All major diamond centre stones are independently graded and
                certified by the International Gemological Institute (IGI).
              </p>

              <div className={styles.certPoints}>
                <div className={styles.certPoint}>
                  <CheckCircle2 size={20} className={styles.certPointIcon} />
                  <div className={styles.certPointText}>
                    <strong>Independent Grading Report</strong>
                    <p>
                      Each certificate documents exact cut proportions, colour
                      grades, clarity characteristics, and carat measurement.
                    </p>
                  </div>
                </div>

                <div className={styles.certPoint}>
                  <CheckCircle2 size={20} className={styles.certPointIcon} />
                  <div className={styles.certPointText}>
                    <strong>Microscopic Laser Inscription</strong>
                    <p>
                      The unique IGI report number is microscopically inscribed
                      onto the diamond girdle for lifelong traceability.
                    </p>
                  </div>
                </div>

                <div className={styles.certPoint}>
                  <CheckCircle2 size={20} className={styles.certPointIcon} />
                  <div className={styles.certPointText}>
                    <strong>Type IIa Chemical Purity</strong>
                    <p>
                      100% of our featured collection represents Type IIa
                      crystallization — diamonds completely devoid of nitrogen
                      impurities.
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/collections" className={styles.btnCta}>
                KNOW YOUR DIAMOND · EXPLORE COLLECTIONS
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.certVisualCard}>
              <div className={styles.certBadgeWrap}>IGI Certified Excellence</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', margin: '0 0 12px' }}>
                Sample Laboratory Report
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted, #7A6F70)', margin: '0 0 20px' }}>
                Official documentation issued for Carats by Grace grown diamonds
              </p>

              <div className={styles.certDetailsList}>
                <div className={styles.certRow}>
                  <span>Report Type</span>
                  <strong>Laboratory Grown Diamond Report</strong>
                </div>
                <div className={styles.certRow}>
                  <span>Shape & Cut</span>
                  <strong>Round Brilliant / Oval Cut</strong>
                </div>
                <div className={styles.certRow}>
                  <span>Clarity Grade</span>
                  <strong>VVS1 / VVS2 (Eye Clean)</strong>
                </div>
                <div className={styles.certRow}>
                  <span>Colour Grade</span>
                  <strong>D – E (Colourless)</strong>
                </div>
                <div className={styles.certRow}>
                  <span>Cut Grade</span>
                  <strong>Ideal / Triple Excellent</strong>
                </div>
                <div className={styles.certRow}>
                  <span>Fluorescence</span>
                  <strong>None</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
