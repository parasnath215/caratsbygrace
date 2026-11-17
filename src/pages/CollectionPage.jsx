// src/pages/CollectionPage.jsx
// Carats by Grace — Collection / Listing page
// Tech: React (JSX). Shares design tokens with HomePage; if you've already
// loaded BRAND_CSS globally, you can delete the inline <style> block below.
// Sections: Hero banner → Sticky filter bar (category, price, metal, occasion)
//           → Sort dropdown → 4-col grid (3 tablet, 2 mobile) → Load more.

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { useWishlist } from "../context/WishlistContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { getStoredProducts } from "../data/products";

/* ===========================================================================
   1. SHARED TOKENS (subset — full set lives in global.css)
   If you already inject BRAND_CSS from HomePage, you can safely remove this.
=========================================================================== */
const PAGE_CSS = `
:root{
  --white:#FFFFFF; --ivory:#FAF6F1; --burgundy:#7B1E3A; --wine:#4A1124;
  --gold:#C6A15B; --ink:#17120F; --muted:#7A6F70; --line:#E9E1D8;
  --blush:#F1E3DC; --wine-deep:#3B0F1F; --rose-gold:#C9967F; --ruby:#A3152F;
  --serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --ease:cubic-bezier(.22,.61,.36,1);
  --pad-x:clamp(20px,5vw,80px);
}
.cp-wrap{max-width:1440px;margin:0 auto;padding-inline:var(--pad-x)}
.cp-eyebrow{font-size:.72rem;letter-spacing:.28em;text-transform:uppercase;
  color:var(--muted);font-weight:500}
.cp-hairline{height:1px;background:var(--line);border:0;margin:0}
.cp-display{font-family:var(--serif);font-weight:400;line-height:1.05;
  letter-spacing:-.01em;margin:0}

/* Buttons */
.cp-btn{display:inline-flex;align-items:center;justify-content:center;
  min-height:44px;padding:0 24px;border-radius:1px;font-size:.76rem;
  letter-spacing:.16em;text-transform:uppercase;font-weight:500;
  transition:all .3s var(--ease);border:1px solid transparent;white-space:nowrap}
.cp-btn--solid{background:var(--burgundy);color:var(--ivory)}
.cp-btn--solid:hover{background:var(--wine)}
.cp-btn--ghost{border-color:var(--ink);color:var(--ink)}
.cp-btn--ghost:hover{background:var(--ink);color:var(--ivory)}
.cp-btn:disabled{opacity:.5;cursor:not-allowed}

/* Hero banner */
.cp-hero{position:relative;min-height:clamp(320px,44vh,520px);
  display:grid;overflow:hidden;background:var(--wine-deep)}
.cp-hero__img{position:absolute;inset:0}
.cp-hero__img img{width:100%;height:100%;object-fit:cover;object-position:50% 40%}
.cp-hero__img::after{content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(23,18,15,.32) 0%,
    rgba(23,18,15,.10) 45%,rgba(23,18,15,.62) 100%)}
.cp-hero__copy{position:relative;z-index:2;color:var(--ivory);
  align-self:end;padding:0 var(--pad-x) clamp(36px,6vw,72px);max-width:760px}
.cp-hero__title{font-family:var(--serif);font-weight:300;
  font-size:clamp(2.2rem,5.4vw,4rem);line-height:1.04;margin:14px 0 12px;
  letter-spacing:-.012em;max-width:16ch}
.cp-hero__lede{font-size:clamp(.92rem,1.4vw,1.02rem);color:rgba(250,246,241,.9);
  font-weight:300;margin:0;max-width:48ch}
.cp-hero__crumb{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(250,246,241,.75)}

/* Sticky filter bar */
.cp-filters{position:sticky;top:0;z-index:40;background:var(--white);
  border-bottom:1px solid var(--line);
  box-shadow:0 4px 20px -22px rgba(23,18,15,.4)}
.cp-filters__desktop{display:flex;align-items:center;gap:10px;
  padding-block:14px;flex-wrap:wrap}
.cp-filter{position:relative}
.cp-filter__btn{min-height:44px;display:inline-flex;align-items:center;gap:10px;
  padding:0 18px;border:1px solid var(--line);border-radius:1px;
  font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--ink);background:var(--white);transition:all .25s var(--ease)}
.cp-filter__btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.cp-filter__btn.is-active{border-color:var(--ink);background:var(--ink);color:var(--ivory)}
.cp-filter__btn .cp-caret{transition:transform .25s var(--ease)}
.cp-filter__btn.is-open .cp-caret{transform:rotate(180deg)}
.cp-filter__panel{position:absolute;left:0;top:calc(100% + 8px);min-width:240px;
  max-height:340px;overflow-y:auto;
  background:var(--white);border:1px solid var(--line);padding:14px;
  box-shadow:0 20px 40px -30px rgba(23,18,15,.4);
  opacity:0;visibility:hidden;transform:translateY(-4px);
  transition:all .25s var(--ease);z-index:45}
.cp-filter__panel.is-open{opacity:1;visibility:visible;transform:none}
.cp-filter__panel h5{font-size:.64rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);margin:0 0 12px;font-weight:500}
.cp-option{display:flex;align-items:center;gap:10px;padding:8px 0;
  font-size:.86rem;color:var(--ink);cursor:pointer}
.cp-option input{accent-color:var(--burgundy)}
.cp-option:hover{color:var(--burgundy)}
.cp-filters__spacer{flex:1}
.cp-filters__count{font-size:.74rem;letter-spacing:.06em;color:var(--muted);
  padding-right:6px;white-space:nowrap}
.cp-clear{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--burgundy);padding:8px 0;text-decoration:underline;
  text-underline-offset:4px;background:none;border:0;cursor:pointer}
.cp-sort{min-height:44px;padding:0 40px 0 16px;border:1px solid var(--line);
  background:var(--white) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2317120F' stroke-width='1.6'><path d='m6 9 6 6 6-6'/></svg>") no-repeat right 14px center;
  font-family:var(--sans);font-size:.74rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink);appearance:none;cursor:pointer;
  border-radius:1px}
.cp-sort:focus{outline:2px solid var(--gold);outline-offset:2px}

/* Active chips row (Desktop) */
.cp-active{display:flex;flex-wrap:wrap;gap:8px;padding-block:10px;
  border-top:1px solid var(--line)}
.cp-chipx{display:inline-flex;align-items:center;gap:8px;
  background:var(--ivory);border:1px solid var(--line);
  font-size:.7rem;letter-spacing:.06em;color:var(--ink);
  padding:6px 12px;border-radius:999px;flex-shrink:0}
.cp-chipx button{width:20px;height:20px;display:grid;place-items:center;
  color:var(--muted);font-size:.85rem;line-height:1;border:0;background:none;
  cursor:pointer;border-radius:50%;transition:all .2s var(--ease)}
.cp-chipx button:hover{color:var(--burgundy);background:rgba(123,30,58,.08)}

/* Mobile Filter Bar & Drawer */
.cp-filters__mobile{display:none}
.cp-filters__mobile-top{display:flex;align-items:center;justify-content:space-between;
  gap:8px;padding-block:10px;width:100%;box-sizing:border-box}
.cp-mobile-filter-btn{flex:1;min-width:0;min-height:40px;display:inline-flex;
  align-items:center;justify-content:center;gap:6px;padding:0 12px;
  border:1px solid var(--line);border-radius:999px;font-size:.7rem;
  letter-spacing:.1em;text-transform:uppercase;font-weight:500;color:var(--ink);
  background:var(--white);cursor:pointer;transition:all .25s var(--ease);
  -webkit-tap-highlight-color:transparent}
.cp-mobile-filter-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.cp-mobile-filter-btn.is-active{background:var(--ink);border-color:var(--ink);color:var(--ivory)}
.cp-filter-badge{display:inline-grid;place-items:center;min-width:18px;height:18px;
  padding:0 5px;border-radius:999px;background:var(--burgundy);color:var(--ivory);
  font-size:.64rem;font-weight:600;line-height:1}
.cp-mobile-filter-btn.is-active .cp-filter-badge{background:var(--gold);color:var(--ink)}
.cp-mobile-count{font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;
  color:var(--muted);font-weight:500;white-space:nowrap;padding:0 4px;flex-shrink:0}
.cp-mobile-sort-btn{flex:1;min-width:0;min-height:40px;display:inline-flex;
  align-items:center;justify-content:center;gap:6px;padding:0 12px;
  border:1px solid var(--line);border-radius:999px;font-size:.7rem;
  letter-spacing:.08em;text-transform:uppercase;font-weight:500;color:var(--ink);
  background:var(--white);cursor:pointer;transition:all .25s var(--ease);
  -webkit-tap-highlight-color:transparent}
.cp-mobile-sort-btn:hover{border-color:var(--burgundy);color:var(--burgundy)}
.cp-mobile-sort-btn.is-active{border-color:var(--gold);color:var(--burgundy);
  background:rgba(123,30,58,.04);font-weight:600}
.cp-mobile-sort-btn span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cp-mobile-sort-btn .cp-caret{transition:transform .25s var(--ease);color:var(--muted);flex-shrink:0}
.cp-mobile-sort-btn:hover .cp-caret{color:var(--burgundy)}

/* Mobile Sort Bottom Sheet */
.cp-drawer--sort{max-height:65vh}
.cp-sort-list{padding:14px 18px 28px;display:flex;flex-direction:column;gap:6px}
.cp-sort-option{width:100%;min-height:52px;display:flex;align-items:center;
  justify-content:space-between;padding:12px 16px;border-radius:8px;
  border:1px solid transparent;background:var(--white);cursor:pointer;
  text-align:left;transition:all .2s var(--ease);-webkit-tap-highlight-color:transparent}
.cp-sort-option:hover{background:var(--ivory)}
.cp-sort-option.is-selected{background:var(--ivory);border-color:var(--line)}
.cp-sort-option__info{display:flex;flex-direction:column;gap:3px}
.cp-sort-option__label{font-family:var(--sans);font-size:.84rem;
  letter-spacing:.08em;text-transform:uppercase;color:var(--ink);font-weight:500;
  transition:color .2s var(--ease)}
.cp-sort-option.is-selected .cp-sort-option__label{color:var(--burgundy);font-weight:600}
.cp-sort-option__desc{font-size:.72rem;color:var(--muted);letter-spacing:.02em}
.cp-sort-option__radio{display:grid;place-items:center;width:24px;height:24px;flex-shrink:0}
.cp-sort-check{width:22px;height:22px;border-radius:50%;background:var(--burgundy);
  color:var(--ivory);display:grid;place-items:center}
.cp-sort-dot{width:18px;height:18px;border-radius:50%;border:1.5px solid var(--line);
  background:transparent}
.cp-sort-option:hover .cp-sort-dot{border-color:var(--burgundy)}

/* Wrapped Applied Chips on Mobile (Zero horizontal scrolling) */
.cp-active-wrap{display:flex;flex-wrap:wrap;align-items:center;gap:6px;
  padding-block:8px 10px;border-top:1px solid var(--line);width:100%;box-sizing:border-box}
.cp-active-wrap .cp-chipx{font-size:.68rem;padding:5px 10px;border-radius:999px;
  background:var(--ivory);border:1px solid var(--line);display:inline-flex;
  align-items:center;gap:6px;color:var(--ink)}
.cp-active-wrap .cp-chipx button{width:18px;height:18px;display:grid;place-items:center;
  color:var(--muted);border:0;background:none;cursor:pointer;border-radius:50%;
  transition:all .2s var(--ease)}
.cp-active-wrap .cp-chipx button:hover{color:var(--burgundy);background:rgba(123,30,58,.08)}
.cp-active-wrap .cp-clear{padding:4px 6px;font-size:.68rem;letter-spacing:.08em;
  text-transform:uppercase;color:var(--burgundy);background:none;border:0;
  text-decoration:underline;text-underline-offset:3px;cursor:pointer}

/* Mobile Filter Drawer (Bottom Sheet) */
.cp-drawer-backdrop{position:fixed;inset:0;background:rgba(23,18,15,.55);
  backdrop-filter:blur(2px);z-index:999;opacity:0;
  animation:cpFadeIn .25s var(--ease) forwards}
@keyframes cpFadeIn{to{opacity:1}}

.cp-drawer{position:fixed;bottom:0;left:0;right:0;max-height:88vh;
  background:var(--white);border-radius:20px 20px 0 0;z-index:1000;
  display:flex;flex-direction:column;box-shadow:0 -10px 40px rgba(23,18,15,.25);
  transform:translateY(100%);animation:cpSlideUp .3s var(--ease) forwards}
@keyframes cpSlideUp{to{transform:translateY(0)}}

.cp-drawer__handle{width:38px;height:4px;border-radius:999px;background:var(--line);
  margin:10px auto 4px;flex-shrink:0}
.cp-drawer__header{display:flex;align-items:center;justify-content:space-between;
  padding:10px 20px 14px;border-bottom:1px solid var(--line);flex-shrink:0}
.cp-drawer__header h3{font-family:var(--serif);font-size:1.35rem;font-weight:400;
  color:var(--ink);margin:0;line-height:1.1}
.cp-drawer__subtitle{font-size:.7rem;color:var(--muted);letter-spacing:.08em;
  text-transform:uppercase;margin-top:4px;display:block}
.cp-drawer__close{width:38px;height:38px;border-radius:50%;border:1px solid var(--line);
  background:var(--white);color:var(--ink);display:grid;place-items:center;
  cursor:pointer;transition:all .2s var(--ease);-webkit-tap-highlight-color:transparent}
.cp-drawer__close:hover{background:var(--ivory);border-color:var(--burgundy);color:var(--burgundy)}

.cp-drawer__body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;
  padding:18px 20px 24px;display:flex;flex-direction:column;gap:20px}
.cp-drawer__section-title{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--muted);font-weight:600;margin:0 0 10px}
.cp-drawer__pills{display:flex;flex-wrap:wrap;gap:8px}

.cp-pill{min-height:42px;padding:0 16px;border-radius:999px;border:1px solid var(--line);
  background:var(--white);color:var(--ink);font-family:var(--sans);font-size:.78rem;
  letter-spacing:.04em;display:inline-flex;align-items:center;gap:6px;cursor:pointer;
  transition:all .2s var(--ease);-webkit-tap-highlight-color:transparent}
.cp-pill:hover{border-color:var(--burgundy);color:var(--burgundy)}
.cp-pill.is-active{background:var(--burgundy);border-color:var(--burgundy);
  color:var(--ivory);font-weight:500}
.cp-pill.is-active:hover{background:var(--wine);border-color:var(--wine)}

.cp-drawer__footer{padding:14px 20px clamp(14px,4vw,24px);border-top:1px solid var(--line);
  background:var(--white);display:flex;align-items:center;gap:12px;flex-shrink:0}
.cp-drawer__footer .cp-btn{flex:1}
.cp-drawer__footer .cp-btn--solid{flex:1.6}

/* Grid */
.cp-body{padding-block:clamp(32px,5vw,64px)}
.cp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 20px}
.cp-empty{grid-column:1/-1;text-align:center;padding:80px 0;color:var(--muted)}
.cp-empty h3{font-family:var(--serif);color:var(--ink);font-size:1.6rem;
  font-weight:400;margin:0 0 8px}

/* Product card (same DNA as home) */
.cp-card{position:relative;background:var(--white);
  opacity:0;transform:translateY(20px);
  animation:cpIn .6s var(--ease) forwards}
@keyframes cpIn{to{opacity:1;transform:none}}
.cp-card__media{position:relative;aspect-ratio:4/5;overflow:hidden;
  background:var(--blush)}
.cp-card__media img{position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;transition:opacity .55s var(--ease),transform .8s var(--ease)}
.cp-card__cover{position:absolute;inset:0;z-index:1;padding:0;
  background:transparent;border:0;cursor:pointer}
.cp-card__img--hover{opacity:0}
.cp-card:hover .cp-card__img--hover{opacity:1}
.cp-card:hover .cp-card__img--main{opacity:0}
.cp-card:hover .cp-card__media img{transform:scale(1.04)}
.cp-card__wish{position:absolute;top:10px;right:10px;z-index:3;width:40px;height:40px;
  display:grid;place-items:center;background:rgba(250,246,241,.92);
  border-radius:999px;color:var(--ink);opacity:0;transform:translateY(-6px);
  transition:all .3s var(--ease)}
.cp-card:hover .cp-card__wish,.cp-card__wish.is-saved{opacity:1;transform:none}
.cp-card__wish.is-saved{color:var(--ruby)}
.cp-card__add{position:absolute;left:10px;right:10px;bottom:10px;z-index:3;
  min-height:42px;background:rgba(250,246,241,.96);color:var(--ink);
  font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;
  display:flex;align-items:center;justify-content:center;gap:6px;
  border:1px solid var(--line);opacity:0;transform:translateY(8px);
  transition:all .35s var(--ease)}
.cp-card:hover .cp-card__add{opacity:1;transform:none}
.cp-card__add:hover{background:var(--burgundy);color:var(--ivory);
  border-color:var(--burgundy)}
.cp-card__body{padding:14px 0}
.cp-card__name{font-family:var(--serif);font-size:1.02rem;margin:0 0 4px;
  font-weight:500}
.cp-card__spec{font-size:.72rem;color:var(--muted);margin:0 0 8px;
  display:inline-block;padding-bottom:2px;border-bottom:1px solid transparent;
  transition:border-color .3s var(--ease)}
.cp-card:hover .cp-card__spec{border-color:var(--gold)}
.cp-card__row{display:flex;justify-content:space-between;align-items:baseline}
.cp-card__price{font-size:.9rem;font-weight:500}

/* Load more */
.cp-more{display:flex;flex-direction:column;align-items:center;gap:14px;
  padding-block:clamp(32px,5vw,56px)}
.cp-more__meta{font-size:.74rem;color:var(--muted);letter-spacing:.06em}
.cp-more__bar{width:min(340px,80%);height:2px;background:var(--line);
  position:relative;overflow:hidden}
.cp-more__bar span{position:absolute;left:0;top:0;bottom:0;
  background:var(--gold);transition:width .4s var(--ease)}

/* Responsive */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}
.cp-main {
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
}
@media (max-width:1024px){
  .cp-grid{grid-template-columns:repeat(3,1fr)}
  .cp-filter__panel{min-width:220px}
  .cp-card__wish{opacity:1;transform:none}
  .cp-card__add{opacity:1;transform:none}
}
@media (max-width:768px){
  :root{--pad-x:16px}
  .cp-wrap{padding-inline:16px;width:100%;max-width:100%;box-sizing:border-box}
  .cp-filters{overflow-x:hidden;width:100%;max-width:100%}
  .cp-grid{grid-template-columns:repeat(2,1fr);gap:16px 10px}
  .cp-filters__desktop{display:none !important}
  .cp-filters__mobile{display:block !important;width:100%;box-sizing:border-box}
  .cp-hero__copy{max-width:none}
}
@media (min-width:769px){
  .cp-filters__desktop{display:flex !important}
  .cp-filters__mobile{display:none !important}
}
@media (max-width:480px){
  :root{--pad-x:12px}
  .cp-wrap{padding-inline:12px}
  .cp-grid{grid-template-columns:repeat(2,1fr);gap:14px 8px}
  .cp-card__name{font-size:.92rem}
  .cp-card__price{font-size:.82rem}
  .cp-card__wish{width:34px;height:34px}
  .cp-card__add{min-height:36px;font-size:.62rem;letter-spacing:.14em}
}
`;

/* ===========================================================================
   2. ICONS
=========================================================================== */
function Icon({ name, size = 18, className }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round",
    strokeLinejoin: "round", "aria-hidden": true, className,
  };
  const paths = {
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
    check: <path d="M20 6 9 17l-5-5" />,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

const INR = (n) => "₹" + n.toLocaleString("en-IN");

/* ===========================================================================
   3. PLACEHOLDER DATA
   In a real build this would come from your Node API (/api/products).
=========================================================================== */
const METALS = ["Yellow Gold", "Rose Gold", "White Gold", "Platinum"];
const OCCASIONS = ["Everyday", "Gifting", "Bridal", "Festive", "Anniversary"];
const CATEGORIES = ["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles", "Pendants"];
const PRICE_BANDS = [
  { key: "lt50", label: "Under ₹50K", min: 0, max: 50000 },
  { key: "50to100", label: "₹50K – ₹1L", min: 50000, max: 100000 },
  { key: "gt100", label: "Above ₹1L", min: 100000, max: Infinity },
];

const HERO_IMAGES = {
  rings: "/assets/categories/cat_rings.webp",
  earrings: "/assets/categories/cat_earrings.webp",
  necklaces: "/assets/categories/cat_necklaces.webp",
  bracelets: "/assets/categories/cat_bracelets.webp",
  bangles: "/assets/categories/cat_bangles.webp",
  pendants: "/assets/categories/cat_pendants.webp",
  bridal: "/assets/model2/m2_8463.webp",
  bestsellers: "/assets/model1/m1_8252_final.webp",
  all: "/assets/model1/m1_8424_final.webp",
};

const BASE_PRODUCTS = [
  { id: "r1", name: "The Aurelia Ring", cat: "Rings", metal: "Yellow Gold", occ: ["Everyday", "Gifting"], price: 64000, spec: "18K Gold · 0.42 ct",
    img: "/assets/model1/m1_8252_final.webp",
    hover: "/assets/model1/m1_8253_final.webp" },
  { id: "r2", name: "Ruby Halo", cat: "Rings", metal: "Rose Gold", occ: ["Festive", "Anniversary"], price: 132000, spec: "Rose Gold · Ruby",
    img: "/assets/model1/m1_8403_final.webp",
    hover: "/assets/model1/m1_8425_final.webp" },
  { id: "r3", name: "Grace Solitaire", cat: "Rings", metal: "White Gold", occ: ["Bridal", "Anniversary"], price: 98000, spec: "18K · 0.60 ct",
    img: "/assets/model2/m2_8124.webp",
    hover: "/assets/model2/m2_8101.webp" },
  { id: "r4", name: "Étoile Band", cat: "Rings", metal: "Yellow Gold", occ: ["Everyday"], price: 42000, spec: "18K Gold",
    img: "/assets/model1/m1_8255_final.webp",
    hover: "/assets/model1/m1_8256_final.webp" },
  { id: "e1", name: "Drop Lumière", cat: "Earrings", metal: "Yellow Gold", occ: ["Festive"], price: 76000, spec: "18K · 0.30 ct",
    img: "/assets/model1/m1_8440_final.webp",
    hover: "/assets/model1/m1_8441_final.webp" },
  { id: "e2", name: "Petal Studs", cat: "Earrings", metal: "Rose Gold", occ: ["Everyday", "Gifting"], price: 32000, spec: "Rose Gold",
    img: "/assets/model2/m2_8126.webp",
    hover: "/assets/model2/m2_8135.webp" },
  { id: "e3", name: "Nightfall Hoops", cat: "Earrings", metal: "White Gold", occ: ["Festive", "Anniversary"], price: 118000, spec: "18K · Diamonds",
    img: "/assets/model1/m1_8306_final.webp",
    hover: "/assets/model1/m1_8394_final.webp" },
  { id: "e4", name: "Dewdrop Mini", cat: "Earrings", metal: "Yellow Gold", occ: ["Everyday"], price: 28000, spec: "18K Gold",
    img: "/assets/model2/cg_jewellers8612.webp",
    hover: "/assets/model2/cg_jewellers8619.webp" },
  { id: "n1", name: "Lumen Pendant", cat: "Necklaces", metal: "Yellow Gold", occ: ["Everyday", "Gifting"], price: 54000, spec: "18K · 0.25 ct",
    img: "/assets/model2/cg_jewellers8471.webp",
    hover: "/assets/model2/cg_jewellers8620.webp" },
  { id: "n2", name: "Sculpt Chain", cat: "Necklaces", metal: "Rose Gold", occ: ["Everyday"], price: 47000, spec: "Rose Gold",
    img: "/assets/model2/m2_8090.webp",
    hover: "/assets/model2/m2_8095.webp" },
  { id: "n3", name: "Étoile Necklace", cat: "Necklaces", metal: "White Gold", occ: ["Bridal", "Anniversary"], price: 156000, spec: "18K · Diamonds",
    img: "/assets/model1/m1_8247_final.webp",
    hover: "/assets/model1/m1_8201_final.webp" },
  { id: "n4", name: "Grace Lariat", cat: "Necklaces", metal: "Yellow Gold", occ: ["Festive"], price: 88000, spec: "18K Gold",
    img: "/assets/model1/m1_8444_final.webp",
    hover: "/assets/model1/m1_8448_final.webp" },
  { id: "b1", name: "Slip Bracelet", cat: "Bracelets", metal: "Yellow Gold", occ: ["Everyday"], price: 58000, spec: "18K Gold",
    img: "/assets/model2/m2_8124.webp",
    hover: "/assets/model2/m2_8182.webp" },
  { id: "b2", name: "Halo Bangle", cat: "Bangles", metal: "Rose Gold", occ: ["Bridal", "Festive"], price: 122000, spec: "Rose Gold · Diamonds",
    img: "/assets/model1/m1_8247_final.webp",
    hover: "/assets/model1/m1_8201_final.webp" },
  { id: "p1", name: "Sol Pendant", cat: "Pendants", metal: "Yellow Gold", occ: ["Everyday", "Gifting"], price: 44000, spec: "18K · 0.18 ct",
    img: "/assets/categories/cat_pendants.webp",
    hover: "/assets/model1/m1_8440_final.webp" },
  { id: "p2", name: "Teardrop Pendant", cat: "Pendants", metal: "White Gold", occ: ["Bridal"], price: 96000, spec: "18K · 0.4 ct",
    img: "/assets/model2/cg_jewellers8619.webp",
    hover: "/assets/model2/cg_jewellers8625.webp" },
  { id: "r5", name: "Vow Ring", cat: "Rings", metal: "Platinum", occ: ["Bridal"], price: 168000, spec: "Platinum · 0.7 ct",
    img: "/assets/model1/m1_8245_final.webp",
    hover: "/assets/model1/m1_8244_final.webp" },
  { id: "e5", name: "Cascade Drops", cat: "Earrings", metal: "Yellow Gold", occ: ["Festive", "Anniversary"], price: 104000, spec: "18K · 0.5 ct",
    img: "/assets/model1/m1_8443_final.webp",
    hover: "/assets/model1/m1_8448_final.webp" },
];

const SORT_OPTIONS = [
  { key: "featured", label: "Featured", desc: "Curated atelier selection" },
  { key: "newest", label: "Newest", desc: "Latest additions to the collection" },
  { key: "az", label: "A–Z", desc: "Alphabetical by title" },
  { key: "za", label: "Z–A", desc: "Reverse alphabetical by title" },
];

const PAGE_SIZE = 8;

/* ===========================================================================
   4. FILTER DROPDOWN
=========================================================================== */
function FilterDropdown({ label, open, onToggle, onClose, children, activeCount }) {
  const ref = useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className="cp-filter" ref={ref}>
      <button
        className={`cp-filter__btn ${open ? "is-open" : ""} ${activeCount ? "is-active" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}>
        {label}
        {activeCount > 0 && <span aria-hidden="true">({activeCount})</span>}
        <Icon name="chevron" size={14} className="cp-caret" />
      </button>
      <div className={`cp-filter__panel ${open ? "is-open" : ""}`} role="menu">
        {children}
      </div>
    </div>
  );
}

/* ===========================================================================
   5. PRODUCT CARD
=========================================================================== */
function ProductCard({ p, index, saved, onToggleSave, onEnquire }) {
  return (
    <article className="cp-card" style={{ animationDelay: `${(index % 8) * 40}ms` }}>
      <div className="cp-card__media">
        <img className="cp-card__img--main" src={p.img}
          alt={`${p.name} — Carats by Grace`} loading="lazy" decoding="async" />
        <img className="cp-card__img--hover" src={p.hover || p.img}
          alt="" aria-hidden="true" loading="lazy" decoding="async" />
        
        {/* Exclusivity Badges */}
        {(p.isOneOfOne || p.isExclusiveCollection) && (
          <span
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 3,
              background: 'var(--burgundy)',
              color: '#FAF6F1',
              fontSize: '0.58rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '3px 7px',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              border: '1px solid rgba(198, 161, 91, 0.4)',
            }}
          >
            Exclusive · 1-of-1
          </span>
        )}
        {p.status === 'sold' && (
          <span
            style={{
              position: 'absolute',
              top: (p.isOneOfOne || p.isExclusiveCollection) ? 34 : 10,
              left: 10,
              zIndex: 3,
              background: '#25030E',
              color: '#E0C88F',
              fontSize: '0.56rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '3px 7px',
              borderRadius: '2px',
              border: '1px solid #E0C88F',
            }}
          >
            Found Its Home
          </span>
        )}

        {/* Whole-image click target so tapping the photo opens the piece */}
        <button
          className="cp-card__cover"
          type="button"
          aria-label={`Enquire about ${p.name}`}
          onClick={() => onEnquire(p)}
        />
        <button
          className={`cp-card__wish ${saved ? "is-saved" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(p.id);
          }}>
          <Icon name="heart" size={16} />
        </button>
        <button className="cp-card__add" type="button" onClick={() => onEnquire(p)}>
          {p.status === 'sold' ? 'Inquire' : 'Enquire'}
        </button>
      </div>
      <div className="cp-card__body" onClick={() => onEnquire(p)} style={{ cursor: "pointer" }}>
        <h3 className="cp-card__name">{p.name}</h3>
        <span className="cp-card__spec">{p.spec}</span>
        <div className="cp-card__row">
          <span className="cp-eyebrow" style={{ fontSize: ".6rem" }}>{p.metal}</span>
        </div>
      </div>
    </article>
  );
}

/* ===========================================================================
   6. PAGE
=========================================================================== */
export default function CollectionPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").trim();

  const slugTitleMap = {
    rings: "Rings",
    earrings: "Earrings",
    necklaces: "Necklaces",
    bracelets: "Bracelets",
    bangles: "Bangles",
    pendants: "Pendants",
    bridal: "The Bridal Edit",
    gifting: "The Gifting Edit",
    "high-jewellery": "High Jewellery",
    bestsellers: "Bestsellers",
    everyday: "Everyday Fine",
    festive: "Festive Edit",
    anniversary: "Anniversary Collection",
    "under-50k": "Under ₹50,000",
    "50k-1l": "₹50,000 – ₹1,00,000",
    "above-1l": "Above ₹1,00,000",
  };

  const collectionTitle = searchQuery
    ? `Search · ${searchQuery}`
    : slug
      ? slugTitleMap[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1)
      : "All Jewellery";

  useDocumentTitle(collectionTitle);

  // ---- filter state
  const [categories, setCategories] = useState(() => {
    if (slug) {
      const match = CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase());
      return match ? [match] : [];
    }
    return [];
  });
  const [metals, setMetals] = useState([]);
  const [occasions, setOccasions] = useState(() => {
    if (slug) {
      const match = OCCASIONS.find((o) => o.toLowerCase() === slug.toLowerCase());
      return match ? [match] : [];
    }
    return [];
  });
  const [priceBand, setPriceBand] = useState(() => {
    if (slug === "under-50k") return "lt50";
    if (slug === "50k-1l") return "50to100";
    if (slug === "above-1l") return "gt100";
    return null;
  });
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openMenu, setOpenMenu] = useState(null); // 'category' | 'price' | 'metal' | 'occasion' | null
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortDrawerOpen, setSortDrawerOpen] = useState(false);

  const { isWishlisted, toggleWishlist } = useWishlist();

  // Lock body scroll when mobile drawer or sort sheet is open
  useEffect(() => {
    if (drawerOpen || sortDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, sortDrawerOpen]);

  // Close drawers on Escape key or desktop resize
  useEffect(() => {
    if (!drawerOpen && !sortDrawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setSortDrawerOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 768) {
        setDrawerOpen(false);
        setSortDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [drawerOpen, sortDrawerOpen]);

  // reset filters when slug changes
  useEffect(() => {
    if (slug) {
      const matchCat = CATEGORIES.find((c) => c.toLowerCase() === slug.toLowerCase());
      setCategories(matchCat ? [matchCat] : []);
      const matchOcc = OCCASIONS.find((o) => o.toLowerCase() === slug.toLowerCase());
      setOccasions(matchOcc ? [matchOcc] : []);
      if (slug === "under-50k") setPriceBand("lt50");
      else if (slug === "50k-1l") setPriceBand("50to100");
      else if (slug === "above-1l") setPriceBand("gt100");
      else setPriceBand(null);
    } else {
      setCategories([]);
      setOccasions([]);
      setPriceBand(null);
    }
  }, [slug]);

  // reset pagination whenever filters/sort change
  useEffect(() => { setVisible(PAGE_SIZE); }, [categories, metals, occasions, priceBand, sort]);

  // Combined live catalog from dynamic CMS and base items
  const allCatalog = useMemo(() => {
    const stored = getStoredProducts();
    const storedMapped = stored.map((p) => {
      const catCap = p.category
        ? p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase()
        : 'Rings';
      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        cat: catCap,
        metal: p.metal || '18K Gold',
        occ: p.occ || ['Everyday', 'Gifting', 'Bridal'],
        price: p.price || 85000,
        spec: p.specs || `${p.metal || '18K Gold'} · ${p.caratWeight || ''}`,
        img: p.images?.[0] || '/assets/model1/m1_8252_final.webp',
        hover: p.images?.[1] || p.images?.[0] || '/assets/model1/m1_8253_final.webp',
        isOneOfOne: Boolean(p.isOneOfOne || p.collection === 'exclusive-designs'),
        status: p.status || 'available',
        diamondShape: p.diamondShape,
        caratWeight: p.caratWeight,
        clarity: p.clarity,
        cut: p.cut,
        colour: p.colour,
        certification: p.certification,
      };
    });

    const seen = new Set();
    const combined = [];
    for (const item of storedMapped) {
      seen.add(item.id);
      seen.add(item.name.toLowerCase());
      combined.push(item);
    }
    for (const item of BASE_PRODUCTS) {
      if (!seen.has(item.id) && !seen.has(item.name.toLowerCase())) {
        combined.push(item);
      }
    }
    return combined;
  }, []);

  // ---- derived list
  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.key === priceBand);
    let list = allCatalog.filter((p) => {
      if (categories.length && !categories.includes(p.cat)) return false;
      if (metals.length && !metals.includes(p.metal)) return false;
      if (occasions.length && !occasions.some((o) => p.occ.includes(o))) return false;
      if (band && (p.price < band.min || p.price >= band.max)) return false;
      if (searchQuery) {
        const haystack = `${p.name} ${p.cat} ${p.metal} ${p.spec} ${p.occ.join(" ")}`.toLowerCase();
        if (!haystack.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
    switch (sort) {
      case "az": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case "za": list = [...list].sort((a, b) => b.name.localeCompare(a.name)); break;
      case "newest": list = [...list].reverse(); break;
      default: break; // featured
    }
    return list;
  }, [allCatalog, categories, metals, occasions, priceBand, sort, searchQuery]);

  const total = filtered.length;
  const shown = filtered.slice(0, visible);
  const canMore = visible < total;
  const progress = total ? Math.round((Math.min(visible, total) / total) * 100) : 0;

  // ---- helpers
  const toggle = (arr, value, setArr) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const activeChips = useMemo(() => [
    ...categories.map((c) => ({ key: `cat:${c}`, label: c, clear: () => setCategories((a) => a.filter((x) => x !== c)) })),
    ...metals.map((m) => ({ key: `metal:${m}`, label: m, clear: () => setMetals((a) => a.filter((x) => x !== m)) })),
    ...occasions.map((o) => ({ key: `occ:${o}`, label: o, clear: () => setOccasions((a) => a.filter((x) => x !== o)) })),
    ...(priceBand ? [{
      key: `price:${priceBand}`,
      label: PRICE_BANDS.find((b) => b.key === priceBand)?.label || priceBand,
      clear: () => setPriceBand(null),
    }] : []),
    ...(searchQuery ? [{
      key: "q",
      label: `“${searchQuery}”`,
      clear: () => {
        const next = new URLSearchParams(searchParams);
        next.delete("q");
        setSearchParams(next, { replace: true });
      },
    }] : []),
  ], [categories, metals, occasions, priceBand, searchQuery, searchParams, setSearchParams]);

  const clearAll = () => {
    setCategories([]); setMetals([]); setOccasions([]); setPriceBand(null);
    if (searchQuery) {
      const next = new URLSearchParams(searchParams);
      next.delete("q");
      setSearchParams(next, { replace: true });
    }
  };

  const { openQuickView } = useUI();

  // close any open dropdown when another opens
  const toggleMenu = (key) => setOpenMenu(openMenu === key ? null : key);

  return (
    <main className="cp-main">
      <style>{PAGE_CSS}</style>

      {/* ============ HERO ============ */}
      <section className="cp-hero" aria-label="Collection banner">
        <div className="cp-hero__img">
          <img
            src={HERO_IMAGES[slug] || "/assets/model1/m1_8424_final.webp"}
            alt={`${collectionTitle} — Carats by Grace`}
            fetchpriority="high"
          />
        </div>
        <div className="cp-hero__copy">
          <span className="cp-hero__crumb">
            <Link to="/" style={{ color: "inherit" }}>Home</Link> · <Link to="/collections" style={{ color: "inherit" }}>Collections</Link> · {collectionTitle}
          </span>
          <h1 className="cp-hero__title">
            {searchQuery ? `Results for “${searchQuery}”` : `${collectionTitle}, considered.`}
          </h1>
          <p className="cp-hero__lede">
            {searchQuery
              ? `Pieces matching your search — ${total} found.`
              : "Everyday fine and once-in-a-lifetime. Quietly luminous pieces, made to be worn."}
          </p>
        </div>
      </section>

      {/* ============ STICKY FILTER BAR ============ */}
      <div className="cp-filters" role="region" aria-label="Product filters">
        {/* DESKTOP FILTER BAR (>768px) */}
        <div className="cp-wrap cp-filters__desktop">
          {/* Category */}
          <FilterDropdown
            label="Category"
            open={openMenu === "category"}
            onToggle={() => toggleMenu("category")}
            onClose={() => setOpenMenu(null)}
            activeCount={categories.length}>
            <h5>By category</h5>
            {CATEGORIES.map((c) => (
              <label className="cp-option" key={c}>
                <input type="checkbox"
                  checked={categories.includes(c)}
                  onChange={() => toggle(categories, c, setCategories)} />
                {c}
              </label>
            ))}
          </FilterDropdown>

          {/* Metal */}
          <FilterDropdown
            label="Metal"
            open={openMenu === "metal"}
            onToggle={() => toggleMenu("metal")}
            onClose={() => setOpenMenu(null)}
            activeCount={metals.length}>
            <h5>By metal</h5>
            {METALS.map((m) => (
              <label className="cp-option" key={m}>
                <input type="checkbox"
                  checked={metals.includes(m)}
                  onChange={() => toggle(metals, m, setMetals)} />
                {m}
              </label>
            ))}
          </FilterDropdown>

          {/* Occasion */}
          <FilterDropdown
            label="Occasion"
            open={openMenu === "occasion"}
            onToggle={() => toggleMenu("occasion")}
            onClose={() => setOpenMenu(null)}
            activeCount={occasions.length}>
            <h5>By occasion</h5>
            {OCCASIONS.map((o) => (
              <label className="cp-option" key={o}>
                <input type="checkbox"
                  checked={occasions.includes(o)}
                  onChange={() => toggle(occasions, o, setOccasions)} />
                {o}
              </label>
            ))}
          </FilterDropdown>

          <div className="cp-filters__spacer" />

          <span className="cp-filters__count">
            {total} {total === 1 ? "piece" : "pieces"}
          </span>

          <label htmlFor="cp-sort-desktop" className="sr-only" style={{
            position: "absolute", width: 1, height: 1, overflow: "hidden",
            clip: "rect(0 0 0 0)" }}>Sort</label>
          <select id="cp-sort-desktop" className="cp-sort" value={sort}
            onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* DESKTOP ACTIVE CHIPS */}
        {activeChips.length > 0 && (
          <div className="cp-wrap cp-active cp-filters__desktop">
            {activeChips.map((c) => (
              <span className="cp-chipx" key={c.key}>
                {c.label}
                <button aria-label={`Remove ${c.label} filter`}
                  onClick={c.clear}><Icon name="close" size={12} /></button>
              </span>
            ))}
            <button className="cp-clear" onClick={clearAll}>Clear all</button>
          </div>
        )}

        {/* MOBILE FILTER BAR (<=768px) */}
        <div className="cp-wrap cp-filters__mobile">
          <div className="cp-filters__mobile-top">
            <button
              type="button"
              className={`cp-mobile-filter-btn ${activeChips.length > 0 ? "is-active" : ""}`}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open filter options"
            >
              <Icon name="sliders" size={14} />
              <span>Filters</span>
              {activeChips.length > 0 && (
                <span className="cp-filter-badge">{activeChips.length}</span>
              )}
            </button>

            <span className="cp-mobile-count">
              {total} {total === 1 ? "piece" : "pieces"}
            </span>

            <button
              type="button"
              className={`cp-mobile-sort-btn ${sort !== "featured" ? "is-active" : ""}`}
              onClick={() => setSortDrawerOpen(true)}
              aria-label={`Sort by: ${SORT_OPTIONS.find((o) => o.key === sort)?.label || "Featured"}`}
              aria-haspopup="dialog"
            >
              <span>{SORT_OPTIONS.find((o) => o.key === sort)?.label || "Sort"}</span>
              <Icon name="chevron" size={13} className="cp-caret" />
            </button>
          </div>

          {/* Applied filters (wrapped, zero horizontal scroll) */}
          {activeChips.length > 0 && (
            <div className="cp-active-wrap" aria-label="Applied filters">
              {activeChips.map((c) => (
                <span className="cp-chipx" key={c.key}>
                  <span>{c.label}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${c.label} filter`}
                    onClick={c.clear}
                  >
                    <Icon name="close" size={11} />
                  </button>
                </span>
              ))}
              <button type="button" className="cp-clear" onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============ GRID ============ */}
      <div className="cp-wrap cp-body">
        {shown.length === 0 ? (
          <div className="cp-empty">
            <h3>{searchQuery ? `Nothing matched “${searchQuery}”.` : "Nothing here, yet."}</h3>
            <p>Try adjusting or clearing your filters.</p>
            <button className="cp-btn cp-btn--ghost" style={{ marginTop: 16 }}
              onClick={clearAll}>Clear filters</button>
          </div>
        ) : (
          <div className="cp-grid">
            {shown.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i}
                saved={isWishlisted(p.name)}
                onToggleSave={() => toggleWishlist({
                  id: p.id,
                  name: p.name,
                  cat: p.cat,
                  spec: p.spec,
                  price: p.price,
                  img: p.img,
                  hover: p.hover,
                  inStock: true,
                })}
                onEnquire={openQuickView} />
            ))}
          </div>
        )}

        {/* Load more */}
        {canMore && (
          <div className="cp-more">
            <div className="cp-more__meta">
              Showing {Math.min(visible, total)} of {total}
            </div>
            <button className="cp-btn cp-btn--solid"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Load more
            </button>
            <div className="cp-more__bar" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {!canMore && total > 0 && (
          <div className="cp-more">
            <div className="cp-more__meta">You've reached the end · {total} pieces</div>
          </div>
        )}
      </div>

      {/* ============ MOBILE FILTER DRAWER ============ */}
      {drawerOpen && (
        <>
          <div
            className="cp-drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className="cp-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
          >
            <div className="cp-drawer__handle" aria-hidden="true" />
            <div className="cp-drawer__header">
              <div>
                <h3>Filters</h3>
                <span className="cp-drawer__subtitle">
                  {total} {total === 1 ? "piece" : "pieces"} available
                </span>
              </div>
              <button
                type="button"
                className="cp-drawer__close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="cp-drawer__body">
              {/* Category Section */}
              <div>
                <h5 className="cp-drawer__section-title">Category</h5>
                <div className="cp-drawer__pills">
                  {CATEGORIES.map((c) => {
                    const isSelected = categories.includes(c);
                    return (
                      <button
                        type="button"
                        key={c}
                        className={`cp-pill ${isSelected ? "is-active" : ""}`}
                        onClick={() => toggle(categories, c, setCategories)}
                      >
                        {isSelected && <Icon name="check" size={12} />}
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Precious Metal Section */}
              <div>
                <h5 className="cp-drawer__section-title">Precious Metal</h5>
                <div className="cp-drawer__pills">
                  {METALS.map((m) => {
                    const isSelected = metals.includes(m);
                    return (
                      <button
                        type="button"
                        key={m}
                        className={`cp-pill ${isSelected ? "is-active" : ""}`}
                        onClick={() => toggle(metals, m, setMetals)}
                      >
                        {isSelected && <Icon name="check" size={12} />}
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Occasion Section */}
              <div>
                <h5 className="cp-drawer__section-title">Occasion</h5>
                <div className="cp-drawer__pills">
                  {OCCASIONS.map((o) => {
                    const isSelected = occasions.includes(o);
                    return (
                      <button
                        type="button"
                        key={o}
                        className={`cp-pill ${isSelected ? "is-active" : ""}`}
                        onClick={() => toggle(occasions, o, setOccasions)}
                      >
                        {isSelected && <Icon name="check" size={12} />}
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort By Section */}
              <div>
                <h5 className="cp-drawer__section-title">Sort By</h5>
                <div className="cp-drawer__pills">
                  {SORT_OPTIONS.map((o) => {
                    const isSelected = sort === o.key;
                    return (
                      <button
                        type="button"
                        key={o.key}
                        className={`cp-pill ${isSelected ? "is-active" : ""}`}
                        onClick={() => setSort(o.key)}
                      >
                        {isSelected && <Icon name="check" size={12} />}
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="cp-drawer__footer">
              <button
                type="button"
                className="cp-btn cp-btn--ghost"
                onClick={clearAll}
                disabled={activeChips.length === 0}
              >
                Clear all
              </button>
              <button
                type="button"
                className="cp-btn cp-btn--solid"
                onClick={() => setDrawerOpen(false)}
              >
                Show {total} {total === 1 ? "Piece" : "Pieces"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ============ MOBILE SORT SHEET ============ */}
      {sortDrawerOpen && (
        <>
          <div
            className="cp-drawer-backdrop"
            onClick={() => setSortDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className="cp-drawer cp-drawer--sort"
            role="dialog"
            aria-modal="true"
            aria-label="Sort options"
          >
            <div className="cp-drawer__handle" aria-hidden="true" />
            <div className="cp-drawer__header">
              <div>
                <h3>Sort By</h3>
                <span className="cp-drawer__subtitle">
                  Choose how to view pieces
                </span>
              </div>
              <button
                type="button"
                className="cp-drawer__close"
                onClick={() => setSortDrawerOpen(false)}
                aria-label="Close sort menu"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="cp-sort-list">
              {SORT_OPTIONS.map((o) => {
                const isSelected = sort === o.key;
                return (
                  <button
                    type="button"
                    key={o.key}
                    className={`cp-sort-option ${isSelected ? "is-selected" : ""}`}
                    onClick={() => {
                      setSort(o.key);
                      setSortDrawerOpen(false);
                    }}
                  >
                    <div className="cp-sort-option__info">
                      <span className="cp-sort-option__label">{o.label}</span>
                      {o.desc && (
                        <span className="cp-sort-option__desc">{o.desc}</span>
                      )}
                    </div>
                    <div className="cp-sort-option__radio" aria-hidden="true">
                      {isSelected ? (
                        <span className="cp-sort-check"><Icon name="check" size={12} /></span>
                      ) : (
                        <span className="cp-sort-dot" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </main>
  );
}