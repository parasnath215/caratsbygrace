// src/components/bespoke/BespokeOptionPanel.jsx
// Carats by Grace — Bespoke Studio Option Panel & Stepper
// White & Ivory surfaces · Burgundy (#5D0A24) single accent · Ink typography · Neutral hairlines.

import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Info,
  Sliders,
  Type,
  HelpCircle,
} from 'lucide-react';
import { BESPOKE_CONFIG, calculateEstimatedPrice } from '../../data/bespokeConfig';
import styles from './BespokeOptionPanel.module.css';

const STEP_TITLES = [
  { step: 1, id: 'piece', label: 'Piece' },
  { step: 2, id: 'setting', label: 'Setting' },
  { step: 3, id: 'stone', label: 'Stone' },
  { step: 4, id: 'metal', label: 'Metal' },
  { step: 5, id: 'finishing', label: 'Finishing' },
  { step: 6, id: 'summary', label: 'Summary' },
];

export default function BespokeOptionPanel({
  currentStep,
  setCurrentStep,
  design,
  updateDesign,
  onReset,
}) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Current pricing calculation
  const price = calculateEstimatedPrice(design);

  // Available settings for chosen piece
  const availableSettings =
    BESPOKE_CONFIG.settings[design.piece] || BESPOKE_CONFIG.settings.ring;

  // Available sizes for chosen piece
  const availableSizes =
    BESPOKE_CONFIG.sizes[design.piece === 'ring' ? 'ring' : design.piece === 'bracelet' ? 'wrist' : design.piece === 'pendant' ? 'chain' : 'earring-back'] ||
    BESPOKE_CONFIG.sizes.ring;

  // Selected metal config
  const selectedMetal =
    BESPOKE_CONFIG.metals.find((m) => m.id === design.metal) ||
    BESPOKE_CONFIG.metals[0];

  // Feasibility Advisory Check
  const activeAdvisory = BESPOKE_CONFIG.feasibilityRules.find(
    (rule) => rule.condition(design) && rule.severity === 'advisory'
  );

  return (
    <div className={styles.panelContainer}>
      {/* ── Stepper Navigation Bar ── */}
      <nav className={styles.stepperNav} aria-label="Bespoke Design Steps">
        <ol className={styles.stepperList}>
          {STEP_TITLES.map((st) => {
            const isCurrent = currentStep === st.step;
            const isCompleted = currentStep > st.step;

            return (
              <li key={st.step} className={styles.stepperItem}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(st.step)}
                  className={`${styles.stepBtn} ${isCurrent ? styles.stepBtnCurrent : ''} ${isCompleted ? styles.stepBtnCompleted : ''}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span className={styles.stepNum}>
                    {isCompleted ? <Check size={12} strokeWidth={2.5} /> : `0${st.step}`}
                  </span>
                  <span className={styles.stepLabel}>{st.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ── Live Estimated Price Badge ── */}
      <div className={styles.priceStrip} aria-live="polite">
        <div className={styles.priceMain}>
          <span className={styles.priceLabel}>ESTIMATED PRICE</span>
          <span className={styles.priceValue}>{price.rangeDisplay}</span>
        </div>
        <span className={styles.priceNote}>Final quote confirmed by our atelier team</span>
      </div>

      {/* ── Feasibility Advisory Notice (if triggered) ── */}
      {activeAdvisory && (
        <div className={styles.advisoryBanner} role="status">
          <Info size={15} className={styles.advisoryIcon} />
          <p className={styles.advisoryText}>{activeAdvisory.message}</p>
        </div>
      )}

      {/* ── Main Step Content ── */}
      <div className={styles.stepContentWrap}>
        {/* ============================================================
            STEP 1: PIECE
            ============================================================ */}
        {currentStep === 1 && (
          <section className={styles.stepSection} aria-labelledby="step1-heading">
            <header className={styles.stepHeader}>
              <span className={styles.stepEyebrow}>STEP 01</span>
              <h2 id="step1-heading" className={styles.stepHeading}>Choose Your Piece</h2>
              <p className={styles.stepDesc}>
                Select the fine jewellery silhouette you wish to co-create with our atelier.
              </p>
            </header>

            <div className={styles.optionsGrid} role="radiogroup" aria-label="Jewellery piece">
              {BESPOKE_CONFIG.pieces.map((pc) => {
                const isSelected = design.piece === pc.id;
                return (
                  <button
                    key={pc.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
                    onClick={() => {
                      updateDesign({
                        piece: pc.id,
                        setting: pc.defaultSetting,
                      });
                    }}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.cardName}>{pc.name}</span>
                      {isSelected && (
                        <span className={styles.selectedCheck}>
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                    <p className={styles.cardHelper}>{pc.description}</p>
                    <span className={styles.cardPriceLead}>From ₹{pc.basePrice.toLocaleString('en-IN')}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================================
            STEP 2: SETTING & STYLE
            ============================================================ */}
        {currentStep === 2 && (
          <section className={styles.stepSection} aria-labelledby="step2-heading">
            <header className={styles.stepHeader}>
              <span className={styles.stepEyebrow}>STEP 02</span>
              <h2 id="step2-heading" className={styles.stepHeading}>Select Setting Architecture</h2>
              <p className={styles.stepDesc}>
                The architectural foundation that holds and protects your centre diamond.
              </p>
            </header>

            <div className={styles.optionsGrid} role="radiogroup" aria-label="Setting architecture">
              {availableSettings.map((set) => {
                const isSelected = design.setting === set.id;
                return (
                  <button
                    key={set.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
                    onClick={() => updateDesign({ setting: set.id })}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.cardName}>{set.name}</span>
                      {isSelected && (
                        <span className={styles.selectedCheck}>
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                    <p className={styles.cardHelper}>{set.helper}</p>
                    <span className={styles.cardPriceDelta}>
                      {set.priceDelta > 0 ? `+ ₹${set.priceDelta.toLocaleString('en-IN')}` : 'Included in base'}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================================
            STEP 3: STONE (SHAPE, CARAT, TYPE)
            ============================================================ */}
        {currentStep === 3 && (
          <section className={styles.stepSection} aria-labelledby="step3-heading">
            <header className={styles.stepHeader}>
              <span className={styles.stepEyebrow}>STEP 03</span>
              <h2 id="step3-heading" className={styles.stepHeading}>Curate Your Diamond</h2>
              <p className={styles.stepDesc}>
                Select facet geometry, carat weight proportion, and certified grown diamond grade.
              </p>
            </header>

            {/* A. Shape Selection */}
            <div className={styles.subGroup}>
              <span className={styles.subGroupLabel}>DIAMOND SHAPE</span>
              <div className={styles.shapePillGrid} role="radiogroup" aria-label="Diamond shape">
                {BESPOKE_CONFIG.stones.shapes.map((sh) => {
                  const isSelected = design.stoneShape === sh.id;
                  return (
                    <button
                      key={sh.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`${styles.shapePill} ${isSelected ? styles.shapePillSelected : ''}`}
                      onClick={() => updateDesign({ stoneShape: sh.id })}
                    >
                      <span className={styles.shapePillName}>{sh.name}</span>
                      <span className={styles.shapePillRatio}>Ratio {sh.ratio}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* B. Carat Slider & Quick Presets */}
            <div className={styles.subGroup}>
              <div className={styles.sliderHeader}>
                <span className={styles.subGroupLabel}>CARAT WEIGHT</span>
                <span className={styles.sliderCurrentValue}>{design.carat} Carats</span>
              </div>

              <input
                type="range"
                min={BESPOKE_CONFIG.stones.caratMin}
                max={BESPOKE_CONFIG.stones.caratMax}
                step={BESPOKE_CONFIG.stones.caratStep}
                value={design.carat}
                onChange={(e) => updateDesign({ carat: parseFloat(e.target.value) })}
                className={styles.caratSlider}
                aria-label="Carat weight slider"
              />

              <div className={styles.presetRow}>
                {BESPOKE_CONFIG.stones.caratPresets.map((pr) => {
                  const isActive = Math.abs(design.carat - pr.carat) < 0.05;
                  return (
                    <button
                      key={pr.carat}
                      type="button"
                      className={`${styles.presetBtn} ${isActive ? styles.presetBtnActive : ''}`}
                      onClick={() => updateDesign({ carat: pr.carat })}
                    >
                      {pr.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* C. Diamond Grade / Type */}
            <div className={styles.subGroup}>
              <span className={styles.subGroupLabel}>GROWN DIAMOND GRADE</span>
              <div className={styles.typeCardsList} role="radiogroup" aria-label="Diamond grade">
                {BESPOKE_CONFIG.stones.types.map((tp) => {
                  const isSelected = design.stoneType === tp.id;
                  return (
                    <button
                      key={tp.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`${styles.typeCard} ${isSelected ? styles.typeCardSelected : ''}`}
                      onClick={() => updateDesign({ stoneType: tp.id })}
                    >
                      <div className={styles.cardTop}>
                        <div>
                          <span className={styles.typeName}>{tp.name}</span>
                          <span className={styles.typeGrade}>{tp.grade}</span>
                        </div>
                        {isSelected && (
                          <span className={styles.selectedCheck}>
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                        )}
                      </div>
                      <p className={styles.typeDesc}>{tp.desc}</p>
                      <span className={styles.typeRate}>₹{tp.pricePerCarat.toLocaleString('en-IN')} / ct</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            STEP 4: METAL & PURITY
            ============================================================ */}
        {currentStep === 4 && (
          <section className={styles.stepSection} aria-labelledby="step4-heading">
            <header className={styles.stepHeader}>
              <span className={styles.stepEyebrow}>STEP 04</span>
              <h2 id="step4-heading" className={styles.stepHeading}>Precious Metal & Purity</h2>
              <p className={styles.stepDesc}>
                Solid gold or platinum hand-alloyed and hallmarked at our atelier.
              </p>
            </header>

            {/* Round Material Swatches */}
            <div className={styles.metalSwatchesGrid} role="radiogroup" aria-label="Precious metal">
              {BESPOKE_CONFIG.metals.map((met) => {
                const isSelected = design.metal === met.id;
                return (
                  <button
                    key={met.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`${styles.metalCard} ${isSelected ? styles.metalCardSelected : ''}`}
                    onClick={() => {
                      const defaultPurity = met.supportedPurities[0];
                      updateDesign({ metal: met.id, purity: defaultPurity });
                    }}
                  >
                    <span
                      className={styles.roundSwatch}
                      style={{ background: met.gradient }}
                      aria-hidden="true"
                    />
                    <span className={styles.metalCardName}>{met.name}</span>
                    <span className={styles.metalCardDesc}>{met.description}</span>
                    {isSelected && (
                      <span className={styles.metalSelectedCheck}>
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Purity Toggle */}
            <div className={styles.subGroup} style={{ marginTop: 28 }}>
              <span className={styles.subGroupLabel}>PURITY STANDARD</span>
              <div className={styles.purityRow} role="radiogroup" aria-label="Metal purity">
                {selectedMetal.supportedPurities.map((pId) => {
                  const purityObj = BESPOKE_CONFIG.purities.find((p) => p.id === pId);
                  if (!purityObj) return null;
                  const isSelected = design.purity === pId;

                  return (
                    <button
                      key={pId}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`${styles.purityBtn} ${isSelected ? styles.purityBtnSelected : ''}`}
                      onClick={() => updateDesign({ purity: pId })}
                    >
                      <span className={styles.purityLabel}>{purityObj.label}</span>
                      <span className={styles.purityDesc}>{purityObj.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            STEP 5: FINISHING & SIZING
            ============================================================ */}
        {currentStep === 5 && (
          <section className={styles.stepSection} aria-labelledby="step5-heading">
            <header className={styles.stepHeader}>
              <span className={styles.stepEyebrow}>STEP 05</span>
              <h2 id="step5-heading" className={styles.stepHeading}>Finishing Details & Engraving</h2>
              <p className={styles.stepDesc}>
                Size calibration, bespoke laser engraving, and custom requests.
              </p>
            </header>

            {/* Size Selector */}
            <div className={styles.subGroup}>
              <div className={styles.sizeHeader}>
                <span className={styles.subGroupLabel}>CALIBRATED SIZE</span>
                <button
                  type="button"
                  className={styles.sizeGuideBtn}
                  onClick={() => setShowSizeGuide(true)}
                >
                  <HelpCircle size={13} /> Size Guide & Measurements
                </button>
              </div>

              <select
                className={styles.sizeSelect}
                value={design.size}
                onChange={(e) => updateDesign({ size: e.target.value })}
                aria-label="Select size"
              >
                {availableSizes.map((sz) => (
                  <option key={sz.id} value={sz.id}>
                    {sz.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Engraving */}
            {design.piece === 'ring' && (
              <div className={styles.subGroup}>
                <div className={styles.sliderHeader}>
                  <span className={styles.subGroupLabel}>INSIDE BAND ENGRAVING (OPTIONAL)</span>
                  <span className={styles.charCount}>
                    {(design.engravingText || '').length} / 15
                  </span>
                </div>

                <input
                  type="text"
                  maxLength={15}
                  value={design.engravingText || ''}
                  onChange={(e) => updateDesign({ engravingText: e.target.value })}
                  placeholder="e.g. Forever Yours / 12.10.24"
                  className={styles.engravingInput}
                />

                <div className={styles.fontSelectRow}>
                  {BESPOKE_CONFIG.engravingFonts.map((fn) => {
                    const isSelected = design.engravingFont === fn.id;
                    return (
                      <button
                        key={fn.id}
                        type="button"
                        className={`${styles.fontBtn} ${isSelected ? styles.fontBtnSelected : ''}`}
                        onClick={() => updateDesign({ engravingFont: fn.id })}
                        style={{ fontFamily: fn.cssFamily }}
                      >
                        {fn.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Notes */}
            <div className={styles.subGroup}>
              <span className={styles.subGroupLabel}>SPECIAL REQUESTS OR TARGET DATE (OPTIONAL)</span>
              <textarea
                rows={3}
                value={design.note || ''}
                onChange={(e) => updateDesign({ note: e.target.value })}
                placeholder="Mention any custom specifications, anniversary deadline, or setting preferences..."
                className={styles.noteTextarea}
              />
            </div>
          </section>
        )}
      </div>

      {/* ── Footer Navigation Actions ── */}
      <footer className={styles.panelFooter}>
        <div className={styles.footerLeft}>
          {currentStep > 1 ? (
            <button
              type="button"
              className={styles.btnBack}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.btnReset}
              onClick={onReset}
              title="Reset configuration"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className={styles.footerRight}>
          {currentStep < 6 && (
            <button
              type="button"
              className={styles.btnNext}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              <span>{currentStep === 5 ? 'Review Design' : 'Next Step'}</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </footer>

      {/* ── Modal: Size Guide ── */}
      {showSizeGuide && (
        <div
          className={styles.guideModalBackdrop}
          onClick={() => setShowSizeGuide(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.guideModalCard} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.guideModalTitle}>Ring Size & Measurement Guide</h3>
            <p className={styles.guideModalDesc}>
              Our atelier uses standard Indian (BIS) ring sizing. For the most accurate fit,
              wrap a piece of string around your knuckle, measure the length in millimetres,
              and compare against the circumference below:
            </p>
            <table className={styles.guideTable}>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Inside Diameter</th>
                  <th>Circumference</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Size 10</td><td>15.5 mm</td><td>48.7 mm</td></tr>
                <tr><td>Size 12</td><td>16.2 mm</td><td>50.9 mm</td></tr>
                <tr><td>Size 14 (Popular)</td><td>16.9 mm</td><td>53.1 mm</td></tr>
                <tr><td>Size 16 (Popular)</td><td>17.5 mm</td><td>55.0 mm</td></tr>
                <tr><td>Size 18</td><td>18.1 mm</td><td>56.9 mm</td></tr>
                <tr><td>Size 20</td><td>18.8 mm</td><td>59.1 mm</td></tr>
              </tbody>
            </table>
            <button
              type="button"
              className={styles.btnModalClose}
              onClick={() => setShowSizeGuide(false)}
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
