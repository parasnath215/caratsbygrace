// src/pages/ProductPage.jsx
// Carats by Grace — Product Detail Page (PDP)
// Tech: React (JSX). Shares brand tokens with HomePage/CollectionPage.
// Structure: Gallery (thumbs left / swipe mobile) → Info (title, price, metal/size,
// size guide, pincode, add to cart, wishlist) → Accordion → Complete the look
// → Recently viewed.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUI } from "../context/UIContext";
import { useWishlist } from "../context/WishlistContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PRODUCT_ASSETS } from "../data/assets";

/* ===========================================================================
   1. PAGE CSS (subset of brand tokens — safe to remove if global)
=========================================================================== */
const PDP_CSS = `
:root{
  --white:#FFFFFF; --ivory:#FAF6F1; --burgundy:#7B1E3A; --wine:#4A1124;
  --gold:#C6A15B; --ink:#17120F; --muted:#7A6F70; --line:#E9E1D8;
  --blush:#F1E3DC; --wine-deep:#3B0F1F; --rose-gold:#C9967F; --ruby:#A3152F;
  --serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --ease:cubic-bezier(.22,.61,.36,1);
  --pad-x:clamp(20px,5vw,80px);
}
.pd-wrap{max-width:1440px;margin:0 auto;padding-inline:var(--pad-x)}
.pd-eyebrow{font-size:.7rem;letter-spacing:.26em;text-transform:uppercase;
  color:var(--muted);font-weight:500}
.pd-display{font-family:var(--serif);font-weight:400;line-height:1.05;
  letter-spacing:-.01em;margin:0}
.pd-hairline{height:1px;background:var(--line);border:0;margin:0}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

.pd-btn{display:inline-flex;align-items:center;justify-content:center;
  min-height:52px;padding:0 26px;border-radius:1px;font-size:.78rem;
  letter-spacing:.18em;text-transform:uppercase;font-weight:500;
  transition:all .3s var(--ease);border:1px solid transparent;white-space:nowrap}
.pd-btn--solid{background:var(--burgundy);color:var(--ivory);width:100%}
.pd-btn--solid:hover{background:var(--wine)}
.pd-btn--ghost{border-color:var(--ink);color:var(--ink)}
.pd-btn--ghost:hover{background:var(--ink);color:var(--ivory)}
.pd-btn--icon{min-height:52px;width:52px;padding:0;border:1px solid var(--line);
  color:var(--ink);background:var(--white)}
.pd-btn--icon.is-saved{color:var(--ruby);border-color:var(--ruby)}
.pd-btn:disabled{opacity:.45;cursor:not-allowed}

/* Breadcrumb */
.pd-crumb{padding-block:22px;font-size:.7rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--muted)}
.pd-crumb a:hover{color:var(--burgundy)}
.pd-crumb span{margin:0 8px;color:var(--line)}

/* Layout */
.pd-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(32px,5vw,72px);
  padding-bottom:clamp(56px,8vw,96px);align-items:start}

/* Gallery */
.pd-gallery{position:relative;display:grid;grid-template-columns:76px 1fr;
  gap:14px;align-items:start}
.pd-thumbs{display:flex;flex-direction:column;gap:10px;
  position:sticky;top:88px}
.pd-thumb{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--blush);
  border:1px solid transparent;padding:0;transition:border-color .25s var(--ease)}
.pd-thumb.is-active{border-color:var(--ink)}
.pd-thumb img{width:100%;height:100%;object-fit:cover}

.pd-stage{position:relative;aspect-ratio:4/5;overflow:hidden;
  background:var(--blush);cursor:zoom-in;user-select:none}
.pd-stage img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease);
  transform-origin:center;will-change:transform}
.pd-stage.is-zoomed img{transition:transform .15s linear}
.pd-stage__zoom{position:absolute;top:12px;right:12px;background:rgba(250,246,241,.92);
  width:40px;height:40px;display:grid;place-items:center;border-radius:999px;
  color:var(--ink);pointer-events:none;font-size:.8rem}
.pd-stage__nav{position:absolute;inset-inline:0;top:50%;transform:translateY(-50%);
  display:none;justify-content:space-between;padding-inline:12px;pointer-events:none}
.pd-stage__nav button{pointer-events:auto;width:42px;height:42px;border-radius:999px;
  background:rgba(250,246,241,.92);display:grid;place-items:center;color:var(--ink)}
.pd-dots{display:none;justify-content:center;gap:6px;padding-top:14px}
.pd-dot{width:6px;height:6px;border-radius:999px;background:var(--line);
  transition:all .25s var(--ease)}
.pd-dot.is-active{background:var(--burgundy);width:20px}

/* Info */
.pd-info{position:sticky;top:88px}
.pd-title{font-family:var(--serif);font-size:clamp(1.8rem,3.2vw,2.5rem);
  font-weight:400;line-height:1.1;margin:8px 0 6px}
.pd-spec-line{font-size:.82rem;color:var(--muted);margin-bottom:18px}
.pd-price{font-size:1.15rem;font-weight:500;margin-bottom:6px}
.pd-price__note{font-size:.72rem;color:var(--muted);letter-spacing:.02em;
  margin-bottom:22px}
.pd-price__note strong{color:var(--ink);font-weight:500}

/* Option groups */
.pd-group{margin-bottom:22px}
.pd-group__label{display:flex;justify-content:space-between;align-items:center;
  font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--muted);margin-bottom:10px;font-weight:500}
.pd-group__label button{font-size:.66rem;color:var(--burgundy);
  letter-spacing:.14em;text-decoration:underline;text-underline-offset:4px}
.pd-opts{display:flex;flex-wrap:wrap;gap:8px}
.pd-opt{min-height:42px;min-width:52px;padding:0 14px;border:1px solid var(--line);
  background:var(--white);font-size:.78rem;letter-spacing:.06em;color:var(--ink);
  transition:all .25s var(--ease);display:inline-flex;align-items:center;
  justify-content:center;gap:8px}
.pd-opt:hover{border-color:var(--burgundy)}
.pd-opt.is-active{background:var(--ink);color:var(--ivory);border-color:var(--ink)}
.pd-opt.is-disabled{opacity:.4;text-decoration:line-through;
  cursor:not-allowed;pointer-events:none}
.pd-metal-dot{width:12px;height:12px;border-radius:999px;border:1px solid rgba(0,0,0,.08)}

/* Stock */
.pd-stock{display:flex;align-items:center;gap:8px;font-size:.76rem;
  letter-spacing:.06em;color:var(--burgundy);margin-bottom:18px}
.pd-stock__dot{width:6px;height:6px;border-radius:999px;background:currentColor;
  animation:pdpulse 2s ease-in-out infinite}
@keyframes pdpulse{50%{opacity:.35}}

/* Pincode */
.pd-pin{display:flex;gap:8px;margin-bottom:20px}
.pd-pin input{flex:1;border:1px solid var(--line);background:var(--white);
  padding:0 14px;min-height:44px;font-family:var(--sans);font-size:.88rem;
  color:var(--ink);border-radius:1px;transition:border-color .3s var(--ease)}
.pd-pin input:focus{outline:none;border-color:var(--ink)}
.pd-pin button{padding:0 18px;border:1px solid var(--ink);background:transparent;
  color:var(--ink);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;
  min-height:44px;transition:all .25s var(--ease)}
.pd-pin button:hover{background:var(--ink);color:var(--ivory)}
.pd-pin__result{font-size:.76rem;color:var(--muted);margin:-10px 0 18px}
.pd-pin__result.is-ok{color:#2F6B3A}

/* CTA row */
.pd-cta{display:grid;grid-template-columns:1fr 52px;gap:10px;margin-bottom:18px}
.pd-trust{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;
  padding-block:18px;border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);margin-bottom:6px}
.pd-trust__item{display:flex;flex-direction:column;align-items:center;
  text-align:center;gap:6px;font-size:.66rem;letter-spacing:.04em;
  color:var(--muted)}
.pd-trust__item svg{color:var(--gold)}

/* Accordion */
.pd-acc{border-top:1px solid var(--line)}
.pd-acc__item{border-bottom:1px solid var(--line)}
.pd-acc__trigger{width:100%;display:flex;justify-content:space-between;
  align-items:center;padding:18px 0;text-align:left;font-family:var(--serif);
  font-size:1.02rem;color:var(--ink);transition:color .25s var(--ease)}
.pd-acc__trigger:hover{color:var(--burgundy)}
.pd-acc__icon{flex:none;width:20px;height:20px;display:grid;place-items:center;
  color:var(--gold);font-size:1rem;transition:transform .3s var(--ease)}
.pd-acc__item.is-open .pd-acc__icon{transform:rotate(45deg)}
.pd-acc__body{overflow:hidden;max-height:0;transition:max-height .35s var(--ease)}
.pd-acc__inner{padding:0 0 20px;color:var(--muted);font-size:.88rem;
  line-height:1.65}
.pd-acc__inner ul{margin:0;padding-left:18px}

/* Related sections */
.pd-related{background:var(--ivory);padding-block:clamp(40px,5.5vw,64px)}
.pd-related__head{display:flex;justify-content:space-between;align-items:end;
  gap:24px;flex-wrap:wrap;margin-bottom:24px}
.pd-related__title{font-family:var(--serif);font-size:clamp(1.6rem,3vw,2.3rem);
  margin-top:12px}
.pd-rail{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(220px,1fr);
  gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;
  scrollbar-width:none;-ms-overflow-style:none}
.pd-rail::-webkit-scrollbar{display:none}
.pd-rail > *{scroll-snap-align:start}

.pd-card{position:relative;background:var(--white);display:block;color:inherit}
.pd-card__media{position:relative;aspect-ratio:4/5;overflow:hidden;
  background:var(--blush)}
.pd-card__media img{position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;transition:opacity .55s var(--ease),transform .8s var(--ease)}
.pd-card__img--hover{opacity:0}
.pd-card:hover .pd-card__img--hover{opacity:1}
.pd-card:hover .pd-card__img--main{opacity:0}
.pd-card:hover .pd-card__media img{transform:scale(1.04)}
.pd-card__body{padding:14px 4px}
.pd-card__name{font-family:var(--serif);font-size:1.02rem;margin:0 0 4px;
  font-weight:500}
.pd-card__spec{font-size:.72rem;color:var(--muted);margin:0 0 8px}
.pd-card__price{font-size:.9rem;font-weight:500}

/* Mobile & Tablet */
@media (max-width:1024px){
  .pd-layout{grid-template-columns:1fr;gap:36px}
  .pd-info{position:static}
  .pd-gallery{grid-template-columns:1fr}
  .pd-thumbs{display:none}
  .pd-stage__nav{display:flex}
  .pd-dots{display:flex}
}
@media (max-width:640px){
  .pd-trust{grid-template-columns:1fr 1fr}
  .pd-cta{grid-template-columns:1fr 52px}
  .pd-pin input{font-size:16px}
}
@media (max-width:480px){
  .pd-opt{min-height:38px;padding:0 10px;font-size:.74rem}
  .pd-crumb{font-size:.64rem;padding-block:14px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;-ms-overflow-style:none}
  .pd-crumb::-webkit-scrollbar{display:none}
  .pd-trust{grid-template-columns:1fr;gap:10px}
  .pd-trust__item{flex-direction:row;justify-content:center;gap:8px}
}
`;

/* ===========================================================================
   2. ICONS + HELPERS
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
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    zoom: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M8 11h6M11 8v6" /></>,
    shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    truck: <><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></>,
    returns: <><path d="M4 12a8 8 0 1 0 3-6.2" /><path d="M4 4v4h4" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

const INR = (n) => "₹" + n.toLocaleString("en-IN");

/* ===========================================================================
   3. PLACEHOLDER DATA
   Replace with fetch('/api/products/:id') from your Node API.
=========================================================================== */
const DEFAULT_PRODUCT = {
  id: "r1",
  name: "The Aurelia Ring",
  cat: "Rings",
  subtitle: "A quiet solitaire, set in warm gold.",
  spec: "18K Yellow Gold · 0.42 ct · Hand-finished",
  price: 64000,
  emi: 5333,
  metalOptions: [
    { key: "yellow", label: "Yellow Gold", dot: "#C9967F", available: true },
    { key: "rose", label: "Rose Gold", dot: "#E8B4A0", available: true },
    { key: "white", label: "White Gold", dot: "#E4E1DC", available: true },
    { key: "platinum", label: "Platinum", dot: "#C8CBD0", available: false },
  ],
  sizeOptions: ["10", "11", "12", "13", "14", "15", "16"],
  outOfStockSizes: ["16"],
  images: [
    { src: "/assets/model1/m1_8252_final.webp", alt: "The Aurelia Ring — front view on hand" },
    { src: "/assets/model1/m1_8253_final.webp", alt: "The Aurelia Ring — hand close-up" },
    { src: "/assets/model1/m1_8255_final.webp", alt: "The Aurelia Ring — side detail" },
    { src: "/assets/categories/cat_rings.webp", alt: "The Aurelia Ring — setting macro detail" },
    { src: "/assets/model1/m1_8247_final.webp", alt: "The Aurelia Ring — styled with diamond suite" },
  ],
  details: {
    "Product details": [
      "18K hallmarked yellow gold with a 0.42 ct centre diamond.",
      "VVS-EF grade clarity with conflict-free origin.",
      "Individually hand-finished in our atelier.",
    ],
    "Certification": [
      "Certified by the Bureau of Indian Standards (BIS Hallmark 750).",
      "Accompanied by an individual laboratory diamond grading report.",
    ],
    "Care": [
      "Store separately in the signature suede pouch provided.",
      "Avoid contact with perfume, chlorine and harsh cleaners.",
      "Wipe gently with a soft dry cloth after wear.",
    ],
    "Atelier Viewing & Bespoke Consultation": [
      "Private salon viewing available at Carats By Grace, Mahanagar, Lucknow.",
      "Dedicated one-on-one consultation with our head gemologist.",
      "Custom carat selection, metal options, and bespoke engravings.",
    ],
  },
};

const COMPLETE_LOOK = [
  { id: "e2", name: "Petal Studs", spec: "Rose Gold", price: 32000,
    img: "/assets/model2/m2_8126.webp",
    hover: "/assets/model2/m2_8135.webp" },
  { id: "n1", name: "Lumen Pendant", spec: "18K · 0.25 ct", price: 54000,
    img: "/assets/model2/cg_jewellers8471.webp",
    hover: "/assets/model2/cg_jewellers8620.webp" },
  { id: "b1", name: "Slip Bracelet", spec: "18K Gold", price: 58000,
    img: "/assets/model2/m2_8124.webp",
    hover: "/assets/model2/m2_8182.webp" },
  { id: "r4", name: "Étoile Band", spec: "18K Gold", price: 42000,
    img: "/assets/model1/m1_8255_final.webp",
    hover: "/assets/model1/m1_8256_final.webp" },
];

const RECENTLY_VIEWED = [
  { id: "r3", name: "Grace Solitaire", spec: "18K · 0.60 ct", price: 98000,
    img: "/assets/model2/m2_8124.webp",
    hover: "/assets/model2/m2_8101.webp" },
  { id: "r2", name: "Ruby Halo", spec: "Rose Gold · Ruby", price: 132000,
    img: "/assets/model1/m1_8403_final.webp",
    hover: "/assets/model1/m1_8425_final.webp" },
  { id: "e1", name: "Drop Lumière", spec: "18K · 0.30 ct", price: 76000,
    img: "/assets/model1/m1_8440_final.webp",
    hover: "/assets/model1/m1_8441_final.webp" },
  { id: "n2", name: "Sculpt Chain", spec: "Rose Gold", price: 47000,
    img: "/assets/model2/m2_8090.webp",
    hover: "/assets/model2/m2_8095.webp" },
];

/* ===========================================================================
   4. GALLERY
=========================================================================== */
function Gallery({ images }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const stageRef = useRef(null);
  const touchStartX = useRef(null);

  const onMove = (e) => {
    if (!zoomed || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({ x, y });
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      setActive((i) => (dx < 0 ? (i + 1) % images.length : (i - 1 + images.length) % images.length));
    }
    touchStartX.current = null;
  };

  const go = (dir) =>
    setActive((i) => (i + dir + images.length) % images.length);

  return (
    <div className="pd-gallery" aria-label="Product images">
      <div className="pd-thumbs" role="tablist" aria-label="Image thumbnails">
        {images.map((img, i) => (
          <button key={i} className={`pd-thumb ${i === active ? "is-active" : ""}`}
            role="tab" aria-selected={i === active} aria-label={`Image ${i + 1}`}
            onClick={() => setActive(i)}>
            <img src={img.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <div>
        <div
          ref={stageRef}
          className={`pd-stage ${zoomed ? "is-zoomed" : ""}`}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => { setZoomed(false); setPos({ x: 50, y: 50 }); }}
          onMouseMove={onMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region" aria-label="Main product image">
          <img src={images[active].src} alt={images[active].alt}
            style={{
              transform: zoomed ? "scale(2)" : "scale(1)",
              transformOrigin: `${pos.x}% ${pos.y}%`,
            }}
            fetchpriority={active === 0 ? "high" : "auto"}
            loading={active === 0 ? "eager" : "lazy"} />
          <span className="pd-stage__zoom" aria-hidden="true"><Icon name="zoom" size={16} /></span>
          <div className="pd-stage__nav" aria-hidden="false">
            <button aria-label="Previous image" onClick={() => go(-1)}>
              <Icon name="arrowRight" size={16} style={{ transform: "rotate(180deg)" }} />
            </button>
            <button aria-label="Next image" onClick={() => go(1)}>
              <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
        <div className="pd-dots" role="tablist" aria-label="Image indicators">
          {images.map((_, i) => (
            <button key={i} className={`pd-dot ${i === active ? "is-active" : ""}`}
              role="tab" aria-selected={i === active}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   5. ACCORDION
=========================================================================== */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const innerRef = useRef(null);
  return (
    <div className={`pd-acc__item ${open ? "is-open" : ""}`}>
      <button className="pd-acc__trigger" aria-expanded={open}
        onClick={() => setOpen((v) => !v)}>
        {title}
        <span className="pd-acc__icon" aria-hidden="true">+</span>
      </button>
      <div className="pd-acc__body"
        style={{ maxHeight: open ? (innerRef.current?.scrollHeight || 400) : 0 }}>
        <div className="pd-acc__inner" ref={innerRef}>{children}</div>
      </div>
    </div>
  );
}

/* ===========================================================================
   6. PRODUCT CARD (for related rails)
=========================================================================== */
function MiniCard({ p, onEnquire }) {
  return (
    <div className="pd-card" onClick={() => onEnquire?.(p)} style={{ cursor: "pointer" }}>
      <div className="pd-card__media">
        <img className="pd-card__img--main" src={p.img} alt={p.name} loading="lazy" decoding="async" />
        <img className="pd-card__img--hover" src={p.hover} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </div>
      <div className="pd-card__body">
        <h4 className="pd-card__name">{p.name}</h4>
        <div className="pd-card__spec">{p.spec}</div>
      </div>
    </div>
  );
}

/* ===========================================================================
   7. PRODUCT RESOLUTION
   Turns /product/:slug into the catalog piece it points at, so cards and
   search results land on the right creation (previously every URL showed
   the same Aurelia Ring).
=========================================================================== */
const CATALOG = Object.entries(PRODUCT_ASSETS).flatMap(([cat, items]) =>
  items.map((p) => ({ ...p, cat }))
);

const slugifyProduct = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function resolveProduct(slug) {
  if (!slug) return DEFAULT_PRODUCT;
  const match = CATALOG.find(
    (p) => p.id === slug || slugifyProduct(p.name) === slug
  );
  if (!match) return DEFAULT_PRODUCT;

  const isSized = ["Rings", "Bracelets", "Bangles"].includes(match.cat);

  return {
    ...DEFAULT_PRODUCT,
    id: match.id,
    name: match.name,
    cat: match.cat,
    spec: match.spec,
    price: match.price,
    emi: Math.round(match.price / 12),
    sizeOptions: isSized ? DEFAULT_PRODUCT.sizeOptions : [],
    outOfStockSizes: isSized ? DEFAULT_PRODUCT.outOfStockSizes : [],
    metalOptions: DEFAULT_PRODUCT.metalOptions.map((m) => ({
      ...m,
      available: m.label === match.metal,
    })),
    images: [
      { src: match.img, alt: `${match.name} — on hand` },
      { src: match.hover, alt: `${match.name} — detail` },
    ],
    details: {
      ...DEFAULT_PRODUCT.details,
      "Product details": [
        `${match.spec}.`,
        "Individually hand-finished in our atelier and BIS hallmarked.",
        "Conflict-free certified stones with an individual grading report.",
      ],
    },
  };
}

/* ===========================================================================
   8. PAGE
=========================================================================== */
export default function ProductPage({ onAddToCart }) {
  const { slug } = useParams();
  const PRODUCT = useMemo(() => resolveProduct(slug), [slug]);

  useDocumentTitle(PRODUCT.name);
  const { openQuickView } = useUI();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isSaved = isWishlisted(PRODUCT.name);
  const [metal, setMetal] = useState(
    PRODUCT.metalOptions.find((m) => m.available)?.key || null
  );
  const [size, setSize] = useState(null);

  // Reset selections and scroll to the top when navigating between pieces.
  useEffect(() => {
    setMetal(PRODUCT.metalOptions.find((m) => m.available)?.key || null);
    setSize(null);
    // PLACEHOLDER: track recently viewed in localStorage / server
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [PRODUCT]);

  return (
    <main>
      <style>{PDP_CSS}</style>

      {/* Breadcrumb */}
                <div className="pd-wrap pd-crumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/collections">Collections</Link><span>/</span>
        <Link to={`/collections/${PRODUCT.cat.toLowerCase()}`}>{PRODUCT.cat}</Link><span>/</span>
        <span style={{ color: "var(--ink)" }}>{PRODUCT.name}</span>
      </div>

      <div className="pd-wrap pd-layout">
        {/* ---------- GALLERY ---------- */}
        <Gallery images={PRODUCT.images} />

        {/* ---------- INFO ---------- */}
        <div className="pd-info">
          <span className="pd-eyebrow">{PRODUCT.cat} · Signature</span>
          <h1 className="pd-title">{PRODUCT.name}</h1>
          <p className="pd-spec-line">{PRODUCT.spec}</p>

          {/* Metal */}
          <div className="pd-group">
            <div className="pd-group__label">
              <span>Metal</span>
              <span style={{ color: "var(--muted)", textTransform: "none",
                letterSpacing: 0, fontSize: ".68rem" }}>
                {PRODUCT.metalOptions.find((m) => m.key === metal)?.label}
              </span>
            </div>
            <div className="pd-opts">
              {PRODUCT.metalOptions.map((m) => (
                <button key={m.key}
                  className={`pd-opt ${metal === m.key ? "is-active" : ""} ${!m.available ? "is-disabled" : ""}`}
                  aria-pressed={metal === m.key}
                  disabled={!m.available}
                  onClick={() => setMetal(m.key)}>
                  <span className="pd-metal-dot" style={{ background: m.dot }} aria-hidden="true" />
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          {PRODUCT.sizeOptions.length > 0 && (
            <div className="pd-group">
              <div className="pd-group__label">
                <span>Size</span>
                <button type="button" onClick={() => alert("PLACEHOLDER: open size guide modal")}>
                  Size guide
                </button>
              </div>
              <div className="pd-opts">
                {PRODUCT.sizeOptions.map((s) => {
                  const oos = PRODUCT.outOfStockSizes.includes(s);
                  return (
                    <button key={s}
                      className={`pd-opt ${size === s ? "is-active" : ""} ${oos ? "is-disabled" : ""}`}
                      aria-pressed={size === s}
                      disabled={oos}
                      onClick={() => setSize(s)}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pd-stock">
            <span className="pd-stock__dot" aria-hidden="true" />
            Atelier Showcase Piece · Available for Private Viewing
          </div>

          {/* CTA: Showcase Enquiries */}
          <div className="pd-cta">
            <button
              className="pd-btn pd-btn--solid"
              type="button"
              onClick={() => {
                const waPhone = "919120530531";
                const waText = encodeURIComponent(
                  `Hello Carats by Grace, I would like to enquire about viewing "${PRODUCT.name}" (${metal ? PRODUCT.metalOptions.find((m) => m.key === metal)?.label : "18K Gold"}${size ? `, Size ${size}` : ""}).`
                );
                window.open(`https://wa.me/${waPhone}?text=${waText}`, "_blank");
              }}
            >
              Enquire on WhatsApp ✦
            </button>
            <button
              className="pd-btn pd-btn--ghost"
              type="button"
              onClick={() => openQuickView({
                ...PRODUCT,
                metal: PRODUCT.metalOptions.find((m) => m.key === metal)?.label || metal,
                size: size ? `Size ${size}` : undefined,
              })}
            >
              Book Viewing
            </button>
            <button className={`pd-btn pd-btn--icon ${isSaved ? "is-saved" : ""}`}
              aria-pressed={isSaved} aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWishlist({
                id: PRODUCT.id,
                name: PRODUCT.name,
                cat: PRODUCT.cat,
                spec: PRODUCT.spec,
                price: PRODUCT.price,
                img: PRODUCT.images[0]?.src,
                hover: PRODUCT.images[1]?.src,
                inStock: true,
              })}>
              <Icon name="heart" />
            </button>
          </div>

          <div className="pd-trust">
            <div className="pd-trust__item"><Icon name="shield" size={20} />BIS 750 Hallmarked</div>
            <div className="pd-trust__item"><Icon name="heart" size={20} />Bespoke Craft</div>
            <div className="pd-trust__item"><Icon name="plus" size={20} />Salon Viewing</div>
          </div>

          {/* Accordion */}
          <div className="pd-acc">
            {Object.entries(PRODUCT.details).map(([title, lines], i) => (
              <Accordion key={title} title={title} defaultOpen={i === 0}>
                <ul>
                  {lines.map((l, j) => <li key={j}>{l}</li>)}
                </ul>
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- COMPLETE THE LOOK ---------- */}
      <section className="pd-related" aria-labelledby="pdp-look">
        <div className="pd-wrap">
          <div className="pd-related__head">
            <div>
              <span className="pd-eyebrow">Styled together</span>
              <h2 id="pdp-look" className="pd-related__title">Complete the look</h2>
            </div>
            <Link to="/collections" className="pd-btn pd-btn--ghost" style={{ minHeight: 44 }}>
              Explore All
            </Link>
          </div>
          <div className="pd-rail">
            {COMPLETE_LOOK.map((p) => <MiniCard key={p.id} p={p} onEnquire={openQuickView} />)}
          </div>
        </div>
      </section>

      {/* ---------- RECENTLY VIEWED ---------- */}
      <section className="pd-wrap" style={{ paddingBlock: "clamp(56px,8vw,96px)" }}
        aria-labelledby="pdp-recent">
      <div className="pd-related__head">
          <div>
            <span className="pd-eyebrow">Just for you</span>
            <h2 id="pdp-recent" className="pd-related__title">Recently viewed</h2>
          </div>
        </div>
        <div className="pd-rail">
          {RECENTLY_VIEWED.map((p) => <MiniCard key={p.id} p={p} onEnquire={openQuickView} />)}
        </div>
      </section>
    </main>
  );
}