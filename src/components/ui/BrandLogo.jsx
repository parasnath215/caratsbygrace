// src/components/ui/BrandLogo.jsx
// Carats by Grace — Luxury Brand Logo Component
// Renders the official brand logo assets:
// 1. variant="light" (or "white"): Uses /logo-white-transparent.png on dark backgrounds (Hero, Footer, dark overlays).
// 2. variant="brand-bg": Uses /logo-brand-bg.jpg with the brand burgundy background.
// 3. variant="dark": Uses /logo-dark-transparent.png (transparent burgundy with gold stars) on white/light backgrounds.

import React from 'react';

export default function BrandLogo({
  variant = 'dark', // 'light' | 'dark' | 'brand-bg'
  className = '',
  height = 46,
  alt = 'Carats by Grace — Handcrafted Fine Jewellery',
  style = {},
}) {
  // Determine asset source based on surface contrast
  let src = '/logo-dark-transparent.png';
  let isBadge = false;

  if (variant === 'light' || variant === 'white') {
    // Strictly for dark/wine backgrounds (Hero video header, Footer, dark drawer)
    src = '/logo-white-transparent.png';
  } else if (variant === 'brand-bg') {
    // Logo with brand colour background
    src = '/logo-brand-bg.jpg';
    isBadge = true;
  } else {
    // For white / light backgrounds:
    // Uses the dark burgundy transparent version to guarantee crisp visibility on white backgrounds
    src = '/logo-dark-transparent.png';
  }

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
