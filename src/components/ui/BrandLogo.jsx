// src/components/ui/BrandLogo.jsx
// Carats by Grace — Luxury Brand Logo Component
// Built using official vector assets from src/components/ui (Asset 1 through 8):
// - 'dark' | 'horizontal-dark': Official burgundy horizontal lockup for light/white backgrounds (Asset 3)
// - 'light' | 'white' | 'horizontal-light': Pure white horizontal lockup for dark/burgundy backgrounds (Asset 4)
// - 'stacked-dark': Stacked mark + wordmark in burgundy for splash/loading/editorial (Asset 1)
// - 'stacked-light': Stacked mark + wordmark in white for dark hero/editorial (Asset 2)
// - 'compact-dark': Compact lockup in burgundy (Asset 5)
// - 'compact-light': Compact lockup in white (Asset 6)
// - 'mark-dark': Standalone emblem / mark in burgundy (Asset 7)
// - 'mark-light': Standalone emblem / mark in white (Asset 8)

import React from 'react';

const LOGO_MAP = {
  // Horizontal wide lockups (Header, Navbar, Footer)
  'dark': '/brand/logo-horizontal-dark.png',
  'horizontal-dark': '/brand/logo-horizontal-dark.png',
  'light': '/brand/logo-horizontal-light.png',
  'white': '/brand/logo-horizontal-light.png',
  'horizontal-light': '/brand/logo-horizontal-light.png',

  // Stacked centered lockups (Loading screen, Splash, About, Modals)
  'stacked-dark': '/brand/logo-stacked-dark.png',
  'stacked-light': '/brand/logo-stacked-light.png',

  // Compact horizontal lockups (Mobile nav, compact bars)
  'compact-dark': '/brand/logo-compact-dark.png',
  'compact-light': '/brand/logo-compact-light.png',

  // Standalone marks / emblems (Favicon, seals, stamps, avatars)
  'mark-dark': '/brand/logo-mark-dark.png',
  'mark-light': '/brand/logo-mark-light.png',

  // Legacy badge
  'brand-bg': '/logo-brand-bg.jpg',
};

export default function BrandLogo({
  variant = 'dark',
  className = '',
  height = 46,
  alt = 'Carats by Grace — Handcrafted Fine Jewellery',
  style = {},
}) {
  const src = LOGO_MAP[variant] || LOGO_MAP['dark'];
  const isBadge = variant === 'brand-bg';

  return (
    <div
      className={`brand-logo brand-logo--${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          height: '100%',
          width: 'auto',
          maxHeight: height,
          objectFit: 'contain',
          display: 'block',
          borderRadius: isBadge ? '4px' : '0',
          transition: 'opacity 0.25s ease',
        }}
        loading="eager"
      />
    </div>
  );
}
