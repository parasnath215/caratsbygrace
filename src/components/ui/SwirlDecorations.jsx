// src/components/ui/SwirlDecorations.jsx
// Carats by Grace — Luxury Gold Swirl & Filigree Vector Decorations
// Reusable authentic jewellery flourishes for borders, corners, crests and dividers.

import React from 'react';

/**
 * Large Corner Swirl for cards, announcements, curator notes and enquiry sections.
 * ViewBox: 76x76
 */
export function CornerSwirl({ className, style }) {
  return (
    <svg
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer corner curl connecting to border */}
      <path
        d="M2 72 L2 38 C2 18.1 18.1 2 38 2 L72 2"
        stroke="#C6A15B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Main ornamental spiral curling inward */}
      <path
        d="M6 36 C6 19.4 19.4 6 36 6 C44.5 6 51 11.5 51 19 C51 26.5 43.5 31 37 27.5 C31.5 24.5 32.5 17 38 16 C42 15 45.5 18.5 43.5 22.5"
        stroke="#C6A15B"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Counter-swirl */}
      <path
        d="M36 6 C19.4 6 6 19.4 6 36 C6 44.5 11.5 51 19 51 C26.5 51 31 43.5 27.5 37 C24.5 31.5 17 32.5 16 38 C15 42 18.5 45.5 22.5 43.5"
        stroke="#C6A15B"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Central diamond star flourish */}
      <path
        d="M21 21 L23 15 L25 21 L31 23 L25 25 L23 31 L21 25 L15 23 Z"
        fill="#C6A15B"
      />
      <circle cx="38" cy="19" r="1.3" fill="#E0C88F" />
      <circle cx="19" cy="38" r="1.3" fill="#E0C88F" />
    </svg>
  );
}

/**
 * Micro Corner Swirl for product grid tiles (26x26).
 * Delicate hairline filigree that frames each singular jewellery creation.
 */
export function CornerSwirlMicro({ className, style }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer corner hairline */}
      <path
        d="M2 30 L2 16 C2 8.3 8.3 2 16 2 L30 2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Inner delicate spiral loop */}
      <path
        d="M4 16 C4 9.4 9.4 4 16 4 C19.5 4 22 6.5 22 10 C22 13.5 18.5 15.5 15.5 14 C13 12.5 13.5 9 16 8.5"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" />
    </svg>
  );
}

/**
 * Horizontal Center Crest with symmetrical curling wings and 4-point gold star.
 * ViewBox: 160x26
 */
export function CenterCrest({ className, style }) {
  return (
    <svg
      viewBox="0 0 160 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Left curling wing */}
      <path
        d="M4 13 C24 13 40 4 58 4 C67 4 72 9 68 15 C64 19 57 17 57 12 C57 7.5 62 5.5 65 8.5"
        stroke="#C6A15B"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {/* Center 4-point gold star */}
      <path
        d="M80 2 L83.5 9.5 L91 13 L83.5 16.5 L80 24 L76.5 16.5 L69 13 L76.5 9.5 Z"
        fill="#C6A15B"
      />
      <circle cx="80" cy="13" r="1.5" fill="#FFFFFF" />
      {/* Right curling wing */}
      <path
        d="M156 13 C136 13 120 4 102 4 C93 4 88 9 92 15 C96 19 103 17 103 12 C103 7.5 98 5.5 95 8.5"
        stroke="#C6A15B"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Full Width Swirl Divider with center crest and tapering gold hairlines.
 */
export function SwirlDivider({ className, style }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        width: '100%',
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(198, 161, 91, 0.45))',
        }}
      />
      <CenterCrest style={{ width: 120, height: 20, flexShrink: 0 }} />
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, rgba(198, 161, 91, 0.45), transparent)',
        }}
      />
    </div>
  );
}
