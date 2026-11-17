// src/components/bespoke/BespokePreviewStage.jsx
// Carats by Grace — Bespoke Studio 2D Layered Composite Preview Stage
// STRICTLY 2D: No WebGL, No Three.js, No GLB.
// Layered 1:1 canvas: Ground Shadow -> Base Setting -> Metal Shimmer -> Stone Facets -> Engraving -> Zoom Lens.

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { ZoomIn, ZoomOut, Eye, Camera } from 'lucide-react';
import { BESPOKE_CONFIG } from '../../data/bespokeConfig';
import styles from './BespokePreviewStage.module.css';

export default function BespokePreviewStage({
  design,
  activeAngle,
  onAngleChange,
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [imageError, setImageError] = useState(false);
  const stageRef = useRef(null);

  const metalConfig = useMemo(() => {
    return (
      BESPOKE_CONFIG.metals.find((m) => m.id === design.metal) ||
      BESPOKE_CONFIG.metals[0]
    );
  }, [design.metal]);

  const stoneShapeConfig = useMemo(() => {
    return (
      BESPOKE_CONFIG.stones.shapes.find((s) => s.id === design.stoneShape) ||
      BESPOKE_CONFIG.stones.shapes[0]
    );
  }, [design.stoneShape]);

  // Fallback photography image
  const fallbackImg = useMemo(() => {
    const key = `${design.piece}-${design.setting}-${design.stoneShape}`;
    return (
      BESPOKE_CONFIG.catalogFallbacks[key] ||
      BESPOKE_CONFIG.catalogFallbacks[`${design.piece}-${design.setting}`] ||
      BESPOKE_CONFIG.catalogFallbacks.default
    );
  }, [design.piece, design.setting, design.stoneShape]);

  // Carat scale factor (0.75ct = 0.85 scale, 2.0ct = 1.0, 4.0ct = 1.25)
  const caratScale = useMemo(() => {
    const c = Number(design.carat) || 1.5;
    return Math.min(1.3, Math.max(0.8, 0.8 + (c - 0.75) * 0.12));
  }, [design.carat]);

  // Handle desktop mouse movement for zoom lens
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomCoords({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  // Engraving font style
  const engravingFont = useMemo(() => {
    return (
      BESPOKE_CONFIG.engravingFonts.find((f) => f.id === design.engravingFont) ||
      BESPOKE_CONFIG.engravingFonts[0]
    );
  }, [design.engravingFont]);

  // Reset zoom on angle change
  useEffect(() => {
    setIsZoomed(false);
  }, [activeAngle]);

  return (
    <div className={styles.stageContainer}>
      {/* ── Top Stage Toolbar ── */}
      <div className={styles.stageToolbar}>
        <span className={styles.stageLabel}>
          2D Precision Studio Preview · {activeAngle.toUpperCase()}
        </span>

        <div className={styles.toolbarActions}>
          <button
            type="button"
            className={`${styles.toolBtn} ${isZoomed ? styles.toolBtnActive : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? 'Reset zoom' : 'Magnify details (2x)'}
            aria-label="Toggle zoom preview"
          >
            {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            <span className={styles.toolBtnText}>{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
          </button>
        </div>
      </div>

      {/* ── Fixed-Aspect Stage Canvas (1:1 Aspect Ratio) ── */}
      <div
        className={`${styles.canvasStage} ${isZoomed ? styles.canvasZoomed : ''}`}
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsZoomed((prev) => !prev)}
        role="region"
        aria-label="Interactive 2D jewellery preview"
      >
        <div
          className={styles.canvasTransformWrap}
          style={{
            transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
            transform: isZoomed ? 'scale(1.9)' : isHovering ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          {/* Layer 1: Ground Shadow */}
          <div className={styles.layerShadow} aria-hidden="true" />

          {/* 2D Composite Layers */}
          <div className={styles.compositeStage}>
            {/* Fallback & Base Image Layer */}
            <img
              src={fallbackImg}
              alt={`${design.piece} preview`}
              className={styles.layerBaseImage}
              onError={() => setImageError(true)}
            />

            {/* Dynamic Metal Tint Overlay Layer */}
            <div
              className={styles.layerMetalTint}
              style={{
                filter: metalConfig.tintFilter,
              }}
              aria-hidden="true"
            />

            {/* Vector Architectural Setting & Stone Composite */}
            <svg
              viewBox="0 0 500 500"
              className={styles.layerVectorComposite}
              aria-hidden="true"
            >
              <defs>
                {/* Metal Gradients */}
                <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={metalConfig.swatchColor} stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor={metalConfig.swatchColor} stopOpacity="0.95" />
                </linearGradient>

                {/* Diamond Facet Sparkle Gradient */}
                <radialGradient id="diamondGlow" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#EFF7FF" stopOpacity="0.75" />
                  <stop offset="70%" stopColor="#D9ECFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#9BBFE6" stopOpacity="0.15" />
                </radialGradient>
              </defs>

              {/* Perspective: Front */}
              {activeAngle === 'front' && (
                <g className={styles.vectorAngleGroup}>
                  {/* Ring Shank Base */}
                  {design.piece === 'ring' && (
                    <path
                      d="M170 340 C170 420 330 420 330 340"
                      stroke="url(#metalGrad)"
                      strokeWidth={design.setting === 'pave-band' ? 14 : 11}
                      fill="none"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Centre Stone Facet Group */}
                  <g
                    transform={`translate(250, 240) scale(${caratScale}) translate(-250, -240)`}
                    className={styles.stoneFacetGroup}
                  >
                    {/* Round Brilliant */}
                    {design.stoneShape === 'round' && (
                      <g>
                        <circle cx="250" cy="240" r="52" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="250" cy="240" r="30" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
                        <path d="M250 188 L250 292 M198 240 L302 240 M213 203 L287 277 M213 277 L287 203" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" />
                      </g>
                    )}

                    {/* Oval Cut */}
                    {design.stoneShape === 'oval' && (
                      <g>
                        <ellipse cx="250" cy="240" rx="46" ry="62" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="1.5" />
                        <ellipse cx="250" cy="240" rx="26" ry="38" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
                        <path d="M250 178 L250 302 M204 240 L296 240" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" />
                      </g>
                    )}

                    {/* Emerald Step Cut */}
                    {design.stoneShape === 'emerald' && (
                      <g>
                        <rect x="208" y="186" width="84" height="108" rx="8" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="1.5" />
                        <rect x="222" y="202" width="56" height="76" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
                        <rect x="234" y="216" width="32" height="48" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" />
                      </g>
                    )}

                    {/* Pear Teardrop Cut */}
                    {design.stoneShape === 'pear' && (
                      <g>
                        <path
                          d="M250 170 C280 220 294 265 275 288 C256 308 244 308 225 288 C206 265 220 220 250 170 Z"
                          fill="url(#diamondGlow)"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      </g>
                    )}

                    {/* Cushion Cut */}
                    {design.stoneShape === 'cushion' && (
                      <g>
                        <rect x="204" y="194" width="92" height="92" rx="24" fill="url(#diamondGlow)" stroke="#FFFFFF" strokeWidth="1.5" />
                        <rect x="220" y="210" width="60" height="60" rx="14" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
                      </g>
                    )}

                    {/* Radiant Cut */}
                    {design.stoneShape === 'radiant' && (
                      <g>
                        <path
                          d="M216 190 L284 190 L296 202 L296 278 L284 290 L216 290 L204 278 L204 202 Z"
                          fill="url(#diamondGlow)"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      </g>
                    )}

                    {/* Marquise Cut */}
                    {design.stoneShape === 'marquise' && (
                      <g>
                        <path
                          d="M250 162 C285 210 285 270 250 318 C215 270 215 210 250 162 Z"
                          fill="url(#diamondGlow)"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      </g>
                    )}

                    {/* Prongs */}
                    <circle cx="204" cy="200" r="4.5" fill="url(#metalGrad)" stroke="#17120F" strokeWidth="0.5" />
                    <circle cx="296" cy="200" r="4.5" fill="url(#metalGrad)" stroke="#17120F" strokeWidth="0.5" />
                    <circle cx="204" cy="280" r="4.5" fill="url(#metalGrad)" stroke="#17120F" strokeWidth="0.5" />
                    <circle cx="296" cy="280" r="4.5" fill="url(#metalGrad)" stroke="#17120F" strokeWidth="0.5" />
                  </g>
                </g>
              )}

              {/* Perspective: Side Profile */}
              {activeAngle === 'side' && (
                <g className={styles.vectorAngleGroup}>
                  {/* Architectural Prongs & Gallery Basket */}
                  <path
                    d="M215 220 L235 290 L265 290 L285 220"
                    stroke="url(#metalGrad)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <ellipse cx="250" cy="290" rx="32" ry="7" fill="url(#metalGrad)" />
                  {/* Ring shank arch from side */}
                  <circle cx="250" cy="380" r="80" stroke="url(#metalGrad)" strokeWidth="12" fill="none" />
                </g>
              )}
            </svg>

            {/* Live Inner Band Engraving Text Overlay */}
            {design.piece === 'ring' && design.engravingText && (
              <div
                className={`${styles.layerEngraving} ${activeAngle === 'side' ? styles.engravingSideVisible : ''}`}
              >
                <div
                  className={styles.engravingTextWrap}
                  style={{
                    fontFamily: engravingFont.cssFamily,
                    fontStyle: engravingFont.fontStyle,
                  }}
                >
                  <span>“{design.engravingText}”</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Carat & Spec Watermark */}
        <div className={styles.specWatermark}>
          <span className={styles.specWatermarkMain}>
            {design.carat} ct · {stoneShapeConfig.name}
          </span>
          <span className={styles.specWatermarkSub}>
            {metalConfig.name} ({design.purity.toUpperCase()})
          </span>
        </div>
      </div>

      {/* ── Angle Switcher Strip (3-4 Thumbnails Replacing 3D Rotation) ── */}
      <div className={styles.angleStrip} role="tablist" aria-label="Camera perspectives">
        {BESPOKE_CONFIG.angles.map((ang) => {
          const isActive = activeAngle === ang.id;
          return (
            <button
              key={ang.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.angleBtn} ${isActive ? styles.angleBtnActive : ''}`}
              onClick={() => onAngleChange(ang.id)}
            >
              <span className={styles.angleThumb}>
                <Camera size={13} strokeWidth={1.5} />
              </span>
              <span className={styles.angleName}>{ang.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
