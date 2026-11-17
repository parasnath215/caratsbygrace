// src/pages/BespokePage.jsx
// Carats by Grace — Bespoke Studio (Interactive Jewellery Customizer)
// Strict Brand Language: White & Ivory surfaces · Burgundy (#5D0A24) single accent · Ink typography · Neutral hairlines.
// NO gold, champagne, or metallic styling in UI. Metal colors appear ONLY as swatches and preview.

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import BespokePreviewStage from '../components/bespoke/BespokePreviewStage';
import BespokeOptionPanel from '../components/bespoke/BespokeOptionPanel';
import BespokeSummaryStep from '../components/bespoke/BespokeSummaryStep';
import { BESPOKE_CONFIG } from '../data/bespokeConfig';
import styles from './BespokePage.module.css';

const DEFAULT_DESIGN = {
  piece: 'ring',
  setting: 'solitaire',
  stoneShape: 'round',
  carat: 1.5,
  stoneType: 'grown-type-iia',
  metal: 'yellow-gold',
  purity: '18k',
  size: '14',
  engravingText: '',
  engravingFont: 'script',
  note: '',
};

export default function BespokePage() {
  useDocumentTitle('Bespoke Studio · Interactive Fine Jewellery Customizer');

  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize design from URL search params if provided, otherwise default
  const [design, setDesign] = useState(() => {
    return {
      piece: searchParams.get('p') || DEFAULT_DESIGN.piece,
      setting: searchParams.get('s') || DEFAULT_DESIGN.setting,
      stoneShape: searchParams.get('sh') || DEFAULT_DESIGN.stoneShape,
      carat: parseFloat(searchParams.get('c')) || DEFAULT_DESIGN.carat,
      stoneType: searchParams.get('st') || DEFAULT_DESIGN.stoneType,
      metal: searchParams.get('m') || DEFAULT_DESIGN.metal,
      purity: searchParams.get('pu') || DEFAULT_DESIGN.purity,
      size: searchParams.get('sz') || DEFAULT_DESIGN.size,
      engravingText: searchParams.get('eng') || DEFAULT_DESIGN.engravingText,
      engravingFont: searchParams.get('ef') || DEFAULT_DESIGN.engravingFont,
      note: searchParams.get('nt') || DEFAULT_DESIGN.note,
    };
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [activeAngle, setActiveAngle] = useState('front');
  const [history, setHistory] = useState([]);

  // Update design and record history for undo
  const updateDesign = useCallback((patch) => {
    setDesign((prev) => {
      // Run auto-fix feasibility rules (e.g. Platinum -> 950 purity)
      let next = { ...prev, ...patch };
      BESPOKE_CONFIG.feasibilityRules.forEach((rule) => {
        if (rule.condition(next) && rule.severity === 'auto-fix' && rule.fix) {
          next = { ...next, ...rule.fix };
        }
      });
      return next;
    });
  }, []);

  const handleReset = () => {
    if (window.confirm('Reset this custom design back to initial atelier defaults?')) {
      setDesign(DEFAULT_DESIGN);
      setCurrentStep(1);
      setActiveAngle('front');
    }
  };

  const stepsOverview = [
    { num: '01', title: 'Private Consultation', desc: 'Discuss diamond proportions, finger ratios, and setting ergonomics with our atelier gemologists.' },
    { num: '02', title: 'Stone Sourcing & Curation', desc: 'Every diamond is individually calibrated for fire, light return, and optical purity.' },
    { num: '03', title: 'Master Bench Handcrafting', desc: 'Crafted in 18K solid gold or 950 platinum with microscopic precision claws and hand-polished comfort shanks.' },
    { num: '04', title: 'Hallmark & Certification', desc: 'BIS 750 / 950 hallmarking, independent IGI certificate, and presented in bespoke leather atelier casing.' },
  ];

  return (
    <main className={styles.page}>
      {/* ── Studio Header ── */}
      <header className={styles.studioHeader}>
        <div className={styles.container}>
          <span className={styles.studioEyebrow}>ATELIER BESPOKE STUDIO</span>
          <h1 className={styles.studioTitle}>DESIGN YOUR BESPOKE HEIRLOOM.</h1>
          <p className={styles.studioLede}>
            Every silhouette begins with your vision. Select your piece, architectural
            setting, diamond proportion, and precious metal to co-create a singular creation.
          </p>
        </div>
      </header>

      {/* ============================================================
          MAIN STUDIO INTERACTIVE WORKSPACE (Two-Column Desktop Split)
          ============================================================ */}
      <section className={styles.studioWorkspace} aria-label="Interactive Jewellery Customizer">
        <div className={styles.workspaceGrid}>
          {/* Left Column (~60%): 2D Layered Preview Stage */}
          <div className={styles.stageColumn}>
            <div className={styles.stageStickyBox}>
              <BespokePreviewStage
                design={design}
                activeAngle={activeAngle}
                onAngleChange={setActiveAngle}
              />
            </div>
          </div>

          {/* Right Column (~40%): Slim Option Panel & Stepper */}
          <div className={styles.optionColumn}>
            {currentStep === 6 ? (
              <BespokeSummaryStep
                design={design}
                onEditStep={(st) => setCurrentStep(st)}
                onReset={handleReset}
              />
            ) : (
              <BespokeOptionPanel
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                design={design}
                updateDesign={updateDesign}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          ATELIER PROCESS SECTION (Editorial Heritage)
          ============================================================ */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.studioEyebrow}>THE ATELIER JOURNEY</span>
            <h2 className={styles.processMainTitle}>How We Co-Create Your Piece</h2>
            <p className={styles.processMainDesc}>
              From raw gold and crystallized diamond seed to hallmarked heirloom,
              every step is executed under the supervision of our master craftsmen.
            </p>
          </div>

          <div className={styles.processGrid}>
            {stepsOverview.map((st) => (
              <div key={st.num} className={styles.processCard}>
                <span className={styles.processStepNum}>{st.num}</span>
                <h3 className={styles.processCardTitle}>{st.title}</h3>
                <p className={styles.processCardDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
