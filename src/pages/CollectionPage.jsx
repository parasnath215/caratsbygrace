// src/pages/CollectionPage.jsx
// Carats by Grace — Collection / Listing page
// Tech: React (JSX). Shares design tokens with HomePage; if you've already
// loaded BRAND_CSS globally, you can delete the inline <style> block below.
// Sections: Hero banner → Sticky filter bar (category, price, metal, occasion)
//           → Sort dropdown → 4-col grid (3 tablet, 2 mobile) → Load more.

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { useWishlist } from "../context/WishlistContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

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
.cp-filters__inner{display:flex;align-items:center;gap:10px;
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
  text-underline-offset:4px;background:none;border:0}
.cp-sort{min-height:44px;padding:0 40px 0 16px;border:1px solid var(--line);
  background:var(--white) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2317120F' stroke-width='1.6'><path d='m6 9 6 6 6-6'/></svg>") no-repeat right 14px center;
  font-family:var(--sans);font-size:.74rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink);appearance:none;cursor:pointer;
  border-radius:1px}
.cp-sort:focus{outline:2px solid var(--gold);outline-offset:2px}

/* Active chips row */
.cp-active{display:flex;flex-wrap:wrap;gap:8px;padding-block:10px;
  border-top:1px solid var(--line)}
.cp-chipx{display:inline-flex;align-items:center;gap:8px;
  background:var(--ivory);border:1px solid var(--line);
  font-size:.7rem;letter-spacing:.06em;color:var(--ink);
  padding:7px 10px;border-radius:999px}
.cp-chipx button{width:18px;height:18px;display:grid;place-items:center;
  color:var(--muted);font-size:.85rem;line-height:1}
.cp-chipx button:hover{color:var(--burgundy)}

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
@media (max-width:1024px){
  .cp-grid{grid-template-columns:repeat(3,1fr)}
  .cp-filter__panel{min-width:220px}
  .cp-card__wish{opacity:1;transform:none}
  .cp-card__add{opacity:1;transform:none}
}
@media (max-width:768px){
  .cp-grid{grid-template-columns:repeat(2,1fr);gap:20px 12px}
  .cp-filters__inner{flex-wrap:nowrap;overflow-x:auto;padding-bottom:12px;
    scrollbar-width:none;-ms-overflow-style:none}
  .cp-filters__inner::-webkit-scrollbar{display:none}
  .cp-filters__spacer,.cp-filters__count{display:none}
  .cp-sort{flex:none}
  .cp-filter{flex:none}
  .cp-active{padding-block:8px}
  .cp-hero__copy{max-width:none}
}
@media (max-width:480px){
  .cp-grid{grid-template-columns:repeat(2,1fr);gap:16px 10px}
  .cp-card__name{font-size:.92rem}
  .cp-card__price{font-size:.82rem}
  .cp-card__wish{width:34px;height:34px}
  .cp-card__add{min-height:36px;font-size:.62rem;letter-spacing:.14em}
}
`;

/* ===========================================================================
   2. ICONS
=========================================================================== */
function Icon({ name, size = 18 }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round",
    strokeLinejoin: "round", "aria-hidden": true,
  };
  const paths = {
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
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

const BASE_PRODUCTS = [
  { id: "r1", name: "The Aurelia Ring", cat: "Rings", metal: "Yellow Gold", occ: ["Everyday", "Gifting"], price: 64000, spec: "18K Gold · 0.42 ct",
    img: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80" },
  { id: "r2", name: "Ruby Halo", cat: "Rings", metal: "Rose Gold", occ: ["Festive", "Anniversary"], price: 132000, spec: "Rose Gold · Ruby",
    img: "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80" },
  { id: "r3", name: "Grace Solitaire", cat: "Rings", metal: "White Gold", occ: ["Bridal", "Anniversary"], price: 98000, spec: "18K · 0.60 ct",
    img: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=700&q=80" },
  { id: "r4", name: "Étoile Band", cat: "Rings", metal: "Yellow Gold", occ: ["Everyday"], price: 42000, spec: "18K Gold",
    img: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80" },
  { id: "e1", name: "Drop Lumière", cat: "Earrings", metal: "Yellow Gold", occ: ["Festive"], price: 76000, spec: "18K · 0.30 ct",
    img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80" },
  { id: "e2", name: "Petal Studs", cat: "Earrings", metal: "Rose Gold", occ: ["Everyday", "Gifting"], price: 32000, spec: "Rose Gold",
    img: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80" },
  { id: "e3", name: "Nightfall Hoops", cat: "Earrings", metal: "White Gold", occ: ["Festive", "Anniversary"], price: 118000, spec: "18K · Diamonds",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=700&q=80" },
  { id: "e4", name: "Dewdrop Mini", cat: "Earrings", metal: "Yellow Gold", occ: ["Everyday"], price: 28000, spec: "18K Gold",
    img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=700&q=80" },
  { id: "n1", name: "Lumen Pendant", cat: "Necklaces", metal: "Yellow Gold", occ: ["Everyday", "Gifting"], price: 54000, spec: "18K · 0.25 ct",
    img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80" },
  { id: "n2", name: "Sculpt Chain", cat: "Necklaces", metal: "Rose Gold", occ: ["Everyday"], price: 47000, spec: "Rose Gold",
    img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80" },
  { id: "n3", name: "Étoile Necklace", cat: "Necklaces", metal: "White Gold", occ: ["Bridal", "Anniversary"], price: 156000, spec: "18K · Diamonds",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80" },
  { id: "n4", name: "Grace Lariat", cat: "Necklaces", metal: "Yellow Gold", occ: ["Festive"], price: 88000, spec: "18K Gold",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=700&q=80" },
  { id: "b1", name: "Slip Bracelet", cat: "Bracelets", metal: "Yellow Gold", occ: ["Everyday"], price: 58000, spec: "18K Gold",
    img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80" },
  { id: "b2", name: "Halo Bangle", cat: "Bangles", metal: "Rose Gold", occ: ["Bridal", "Festive"], price: 122000, spec: "Rose Gold · Diamonds",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80" },
  { id: "p1", name: "Sol Pendant", cat: "Pendants", metal: "Yellow Gold", occ: ["Everyday", "Gifting"], price: 44000, spec: "18K · 0.18 ct",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=700&q=80" },
  { id: "p2", name: "Teardrop Pendant", cat: "Pendants", metal: "White Gold", occ: ["Bridal"], price: 96000, spec: "18K · 0.4 ct",
    img: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80" },
  { id: "r5", name: "Vow Ring", cat: "Rings", metal: "Platinum", occ: ["Bridal"], price: 168000, spec: "Platinum · 0.7 ct",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80" },
  { id: "e5", name: "Cascade Drops", cat: "Earrings", metal: "Yellow Gold", occ: ["Festive", "Anniversary"], price: 104000, spec: "18K · 0.5 ct",
    img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=700&q=80",
    hover: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=700&q=80" },
];

const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price · Low to High" },
  { key: "price-desc", label: "Price · High to Low" },
  { key: "az", label: "A–Z" },
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
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
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
        <Icon name="chevron" size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" }} />
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
          alt={`${p.name} — Carats by Grace`} loading="lazy" />
        <img className="cp-card__img--hover" src={p.hover}
          alt="" aria-hidden="true" loading="lazy" />
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
          Enquire <span aria-hidden="true">✦</span>
        </button>
      </div>
      <div className="cp-card__body" onClick={() => onEnquire(p)} style={{ cursor: "pointer" }}>
        <h3 className="cp-card__name">{p.name}</h3>
        <span className="cp-card__spec">{p.spec}</span>
        <div className="cp-card__row">
          <span className="cp-card__price">{INR(p.price)}</span>
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

  const collectionTitle = slug ? (slugTitleMap[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1)) : "All Jewellery";

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

  const { isWishlisted, toggleWishlist } = useWishlist();

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

  // ---- derived list
  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.key === priceBand);
    let list = BASE_PRODUCTS.filter((p) => {
      if (categories.length && !categories.includes(p.cat)) return false;
      if (metals.length && !metals.includes(p.metal)) return false;
      if (occasions.length && !occasions.some((o) => p.occ.includes(o))) return false;
      if (band && (p.price < band.min || p.price >= band.max)) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "az": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case "newest": list = [...list].reverse(); break;
      default: break; // featured
    }
    return list;
  }, [categories, metals, occasions, priceBand, sort]);

  const total = filtered.length;
  const shown = filtered.slice(0, visible);
  const canMore = visible < total;
  const progress = total ? Math.round((Math.min(visible, total) / total) * 100) : 0;

  // ---- helpers
  const toggle = (arr, value, setArr) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const activeChips = [
    ...categories.map((c) => ({ key: `cat:${c}`, label: c, clear: () => setCategories((a) => a.filter((x) => x !== c)) })),
    ...metals.map((m) => ({ key: `metal:${m}`, label: m, clear: () => setMetals((a) => a.filter((x) => x !== m)) })),
    ...occasions.map((o) => ({ key: `occ:${o}`, label: o, clear: () => setOccasions((a) => a.filter((x) => x !== o)) })),
    ...(priceBand ? [{ key: "price", label: PRICE_BANDS.find((b) => b.key === priceBand).label, clear: () => setPriceBand(null) }] : []),
  ];

  const clearAll = () => {
    setCategories([]); setMetals([]); setOccasions([]); setPriceBand(null);
  };

  const { openQuickView } = useUI();
  const onToggleSave = (id) => setSaved((s) => ({ ...s, [id]: !s[id] }));

  // close any open dropdown when another opens
  const toggleMenu = (key) => setOpenMenu(openMenu === key ? null : key);

  return (
    <main>
      <style>{PAGE_CSS}</style>

      {/* ============ HERO ============ */}
      <section className="cp-hero" aria-label="Collection banner">
        <div className="cp-hero__img">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1800&q=80"
            alt="Editorial: model wearing Carats by Grace rings"
            fetchpriority="high"
          />
        </div>
        <div className="cp-hero__copy">
          <span className="cp-hero__crumb">
            <Link to="/" style={{ color: "inherit" }}>Home</Link> · <Link to="/collections" style={{ color: "inherit" }}>Collections</Link> · {collectionTitle}
          </span>
          <h1 className="cp-hero__title">{collectionTitle}, considered.</h1>
          <p className="cp-hero__lede">
            Everyday fine and once-in-a-lifetime. Quietly luminous pieces,
            made to be worn.
          </p>
        </div>
      </section>

      {/* ============ STICKY FILTER BAR ============ */}
      <div className="cp-filters" role="region" aria-label="Product filters">
        <div className="cp-wrap cp-filters__inner">
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

          {/* Price */}
          <FilterDropdown
            label="Price"
            open={openMenu === "price"}
            onToggle={() => toggleMenu("price")}
            onClose={() => setOpenMenu(null)}
            activeCount={priceBand ? 1 : 0}>
            <h5>By price</h5>
            {PRICE_BANDS.map((b) => (
              <label className="cp-option" key={b.key}>
                <input type="radio" name="price-band"
                  checked={priceBand === b.key}
                  onChange={() => setPriceBand(priceBand === b.key ? null : b.key)} />
                {b.label}
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

          <label htmlFor="cp-sort" className="sr-only" style={{
            position: "absolute", width: 1, height: 1, overflow: "hidden",
            clip: "rect(0 0 0 0)" }}>Sort</label>
          <select id="cp-sort" className="cp-sort" value={sort}
            onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>
        </div>

        {activeChips.length > 0 && (
          <div className="cp-wrap cp-active">
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
      </div>

      {/* ============ GRID ============ */}
      <div className="cp-wrap cp-body">
        {shown.length === 0 ? (
          <div className="cp-empty">
            <h3>Nothing here, yet.</h3>
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
    </main>
  );
}