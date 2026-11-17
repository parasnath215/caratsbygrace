// src/pages/WishlistPage.jsx
// Carats by Grace — Wishlist page
// Tech: React (JSX). Shares brand tokens with HomePage/CollectionPage/ProductPage.
// Structure: Hero → Toolbar (count, sort, move-all-to-bag, clear) → Grid of saved
// items with "Move to bag" & "Remove" → Empty state → Recommended rail.

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/* ===========================================================================
   1. PAGE CSS (subset of brand tokens)
=========================================================================== */
const WISH_CSS = `
:root{
  --white:#FFFFFF; --ivory:#FAF6F1; --burgundy:#7B1E3A; --wine:#4A1124;
  --gold:#C6A15B; --ink:#17120F; --muted:#7A6F70; --line:#E9E1D8;
  --blush:#F1E3DC; --wine-deep:#3B0F1F; --rose-gold:#C9967F; --ruby:#A3152F;
  --serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --ease:cubic-bezier(.22,.61,.36,1);
  --pad-x:clamp(20px,5vw,80px);
}
.wl-wrap{max-width:1440px;margin:0 auto;padding-inline:var(--pad-x)}
.wl-eyebrow{font-size:.7rem;letter-spacing:.26em;text-transform:uppercase;
  color:var(--muted);font-weight:500}
.wl-display{font-family:var(--serif);font-weight:400;line-height:1.05;
  letter-spacing:-.01em;margin:0}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

.wl-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;
  min-height:44px;padding:0 22px;border-radius:1px;font-size:.74rem;
  letter-spacing:.16em;text-transform:uppercase;font-weight:500;
  transition:all .3s var(--ease);border:1px solid transparent;white-space:nowrap}
.wl-btn--solid{background:var(--burgundy);color:var(--ivory)}
.wl-btn--solid:hover{background:var(--wine)}
.wl-btn--ghost{border-color:var(--ink);color:var(--ink)}
.wl-btn--ghost:hover{background:var(--ink);color:var(--ivory)}
.wl-btn--text{background:transparent;border:0;color:var(--burgundy);
  text-decoration:underline;text-underline-offset:4px;padding:0 4px;min-height:auto}
.wl-btn:disabled{opacity:.45;cursor:not-allowed}

/* Hero */
.wl-hero{padding-top:clamp(32px,5vw,56px);padding-bottom:clamp(24px,4vw,40px);
  border-bottom:1px solid var(--line)}
.wl-hero__inner{display:flex;justify-content:space-between;align-items:end;
  gap:24px;flex-wrap:wrap}
.wl-hero__title{font-family:var(--serif);font-weight:400;
  font-size:clamp(2rem,4.4vw,3.2rem);line-height:1.04;margin:12px 0 10px}
.wl-hero__lede{color:var(--muted);font-size:.95rem;margin:0;max-width:48ch}

/* Toolbar */
.wl-toolbar{display:flex;justify-content:space-between;align-items:center;
  gap:16px;flex-wrap:wrap;padding-block:18px;border-bottom:1px solid var(--line)}
.wl-toolbar__count{font-size:.78rem;letter-spacing:.06em;color:var(--muted)}
.wl-toolbar__actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.wl-sort{min-height:44px;padding:0 40px 0 16px;border:1px solid var(--line);
  background:var(--white) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2317120F' stroke-width='1.6'><path d='m6 9 6 6 6-6'/></svg>") no-repeat right 14px center;
  font-family:var(--sans);font-size:.74rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--ink);appearance:none;cursor:pointer;
  border-radius:1px}
.wl-sort:focus{outline:2px solid var(--gold);outline-offset:2px}

/* Grid */
.wl-body{padding-block:clamp(32px,5vw,64px)}
.wl-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 20px}
.wl-empty{text-align:center;padding:clamp(56px,10vw,120px) 0;
  border:1px solid var(--line);background:var(--ivory);max-width:720px;
  margin:0 auto}
.wl-empty h3{font-family:var(--serif);color:var(--ink);font-size:1.6rem;
  font-weight:400;margin:0 0 10px}
.wl-empty p{color:var(--muted);font-size:.9rem;margin:0 0 24px}
.wl-empty__spark{display:inline-flex;gap:6px;color:var(--gold);font-size:1rem;
  margin-bottom:8px}

/* Card */
.wl-card{position:relative;background:var(--white);display:flex;flex-direction:column}
.wl-card__media{position:relative;aspect-ratio:4/5;overflow:hidden;
  background:var(--blush);display:block}
.wl-card__media img{position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;transition:opacity .55s var(--ease),transform .8s var(--ease)}
.wl-card__img--hover{opacity:0}
.wl-card:hover .wl-card__img--hover{opacity:1}
.wl-card:hover .wl-card__img--main{opacity:0}
.wl-card:hover .wl-card__media img{transform:scale(1.04)}
.wl-card__remove{position:absolute;top:10px;right:10px;z-index:3;
  width:40px;height:40px;display:grid;place-items:center;
  background:rgba(250,246,241,.92);border-radius:999px;color:var(--ink);
  opacity:0;transform:translateY(-6px);transition:all .3s var(--ease)}
.wl-card:hover .wl-card__remove{opacity:1;transform:none}
.wl-card__remove:hover{color:var(--ruby)}
.wl-card__badge{position:absolute;top:10px;left:10px;z-index:3;
  background:var(--ivory);color:var(--ink);font-size:.6rem;letter-spacing:.18em;
  text-transform:uppercase;padding:6px 10px}
.wl-card__badge--low{background:var(--burgundy);color:var(--ivory)}
.wl-card__body{padding:14px 2px 0;display:flex;flex-direction:column;flex:1}
.wl-card__name{font-family:var(--serif);font-size:1.02rem;margin:0 0 4px;
  font-weight:500}
.wl-card__spec{font-size:.72rem;color:var(--muted);margin:0 0 10px}
.wl-card__row{display:flex;justify-content:space-between;align-items:baseline;
  margin-bottom:14px}
.wl-card__price{font-size:.92rem;font-weight:500}
.wl-card__move{margin-top:auto;width:100%;min-height:44px;background:transparent;
  border:1px solid var(--ink);color:var(--ink);font-size:.7rem;letter-spacing:.16em;
  text-transform:uppercase;transition:all .3s var(--ease);display:flex;
  align-items:center;justify-content:center;gap:8px}
.wl-card__move:hover{background:var(--ink);color:var(--ivory)}
.wl-card__move.is-added{background:var(--burgundy);border-color:var(--burgundy);
  color:var(--ivory)}
.wl-card__move:disabled{opacity:.5;cursor:not-allowed}

/* Toast */
.wl-toast{position:fixed;bottom:24px;left:50%;transform:translate(-50%, 20px);
  background:var(--ink);color:var(--ivory);font-size:.78rem;
  letter-spacing:.08em;padding:14px 22px;z-index:100;opacity:0;
  transition:all .35s var(--ease);pointer-events:none}
.wl-toast.is-visible{opacity:1;transform:translate(-50%, 0)}

/* Recommended */
.wl-related{background:var(--ivory);padding-block:clamp(40px,5.5vw,64px)}
.wl-related__head{display:flex;justify-content:space-between;align-items:end;
  gap:24px;flex-wrap:wrap;margin-bottom:24px}
.wl-related__title{font-family:var(--serif);font-size:clamp(1.6rem,3vw,2.3rem);
  margin-top:12px}
.wl-rail{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(220px,1fr);
  gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;
  scrollbar-width:none;-ms-overflow-style:none}
.wl-rail::-webkit-scrollbar{display:none}
.wl-rail > *{scroll-snap-align:start}

/* Responsive */
@media (max-width:1024px){
  .wl-grid{grid-template-columns:repeat(3,1fr)}
  .wl-card__remove{opacity:1;transform:none}
}
@media (max-width:768px){
  .wl-grid{grid-template-columns:repeat(2,1fr);gap:20px 12px}
  .wl-toolbar{padding-block:14px}
  .wl-card__name{font-size:.94rem}
  .wl-card__price{font-size:.84rem}
}
@media (max-width:480px){
  .wl-grid{grid-template-columns:repeat(2,1fr);gap:14px 8px}
  .wl-toolbar__actions{gap:6px}
  .wl-btn{padding:0 14px;font-size:.68rem}
  .wl-card__remove{width:34px;height:34px}
  .wl-card__move{min-height:38px;font-size:.64rem;letter-spacing:.12em}
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
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

const INR = (n) => "₹" + n.toLocaleString("en-IN");

/* ===========================================================================
   3. PLACEHOLDER DATA
   In a real build this is fetched from GET /api/wishlist (per logged-in user).
=========================================================================== */
const INITIAL_ITEMS = [
  {
    id: "r1", name: "The Aurelia Ring", cat: "Rings",
    spec: "18K Gold · 0.42 ct", price: 64000, inStock: true,
    img: "/assets/model1/m1_8252_final.webp",
    hover: "/assets/model1/m1_8253_final.webp",
  },
  {
    id: "r2", name: "Ruby Halo", cat: "Rings",
    spec: "Rose Gold · Ruby", price: 132000, inStock: true, lowStock: true,
    img: "/assets/model1/m1_8403_final.webp",
    hover: "/assets/model1/m1_8425_final.webp",
  },
  {
    id: "e2", name: "Petal Studs", cat: "Earrings",
    spec: "Rose Gold", price: 32000, inStock: true,
    img: "/assets/model2/m2_8126.webp",
    hover: "/assets/model2/m2_8135.webp",
  },
  {
    id: "n3", name: "Étoile Necklace", cat: "Necklaces",
    spec: "18K · Diamonds", price: 156000, inStock: false,
    img: "/assets/model1/m1_8247_final.webp",
    hover: "/assets/model1/m1_8201_final.webp",
  },
  {
    id: "b1", name: "Slip Bracelet", cat: "Bracelets",
    spec: "18K Gold", price: 58000, inStock: true,
    img: "/assets/model2/m2_8124.webp",
    hover: "/assets/model2/m2_8182.webp",
  },
];

const RECOMMENDED = [
  { id: "r4", name: "Étoile Band", spec: "18K Gold", price: 42000,
    img: "/assets/model1/m1_8255_final.webp",
    hover: "/assets/model1/m1_8256_final.webp" },
  { id: "n1", name: "Lumen Pendant", spec: "18K · 0.25 ct", price: 54000,
    img: "/assets/model2/cg_jewellers8471.webp",
    hover: "/assets/model2/cg_jewellers8620.webp" },
  { id: "e1", name: "Drop Lumière", spec: "18K · 0.30 ct", price: 76000,
    img: "/assets/model1/m1_8440_final.webp",
    hover: "/assets/model1/m1_8441_final.webp" },
  { id: "r3", name: "Grace Solitaire", spec: "18K · 0.60 ct", price: 98000,
    img: "/assets/model2/m2_8124.webp",
    hover: "/assets/model2/m2_8101.webp" },
];

const SORTS = [
  { key: "recent", label: "Recently added" },
  { key: "az", label: "A–Z" },
];

/* ===========================================================================
   4. HELPERS
=========================================================================== */
function MiniCard({ p, onEnquire }) {
  return (
    <div className="wl-card" onClick={() => onEnquire?.(p)} style={{ cursor: "pointer" }}>
      <div className="wl-card__media">
        <img className="wl-card__img--main" src={p.img} alt={p.name} loading="lazy" decoding="async" />
        <img className="wl-card__img--hover" src={p.hover} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </div>
      <div className="wl-card__body">
        <h4 className="wl-card__name">{p.name}</h4>
        <div className="wl-card__spec">{p.spec}</div>
      </div>
    </div>
  );
}

function WishlistCard({ item, onRemove, onEnquire }) {
  return (
    <article className="wl-card">
      <div className="wl-card__media" onClick={() => onEnquire?.(item)}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${item.name}`}>
        {item.lowStock && <span className="wl-card__badge wl-card__badge--low">Low stock</span>}
        {!item.inStock && <span className="wl-card__badge">Sold out</span>}
        <img className="wl-card__img--main" src={item.img}
          alt={item.name} loading="lazy" decoding="async" />
        <img className="wl-card__img--hover" src={item.hover}
          alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </div>
      <button className="wl-card__remove" aria-label={`Remove ${item.name} from wishlist`}
        onClick={() => onRemove(item)}>
        <Icon name="close" size={16} />
      </button>
      <div className="wl-card__body">
        <h3 className="wl-card__name" onClick={() => onEnquire?.(item)} style={{ cursor: "pointer" }}>{item.name}</h3>
        <div className="wl-card__spec">{item.spec}</div>
        <div className="wl-card__row">
          <span className="wl-eyebrow" style={{ fontSize: ".6rem" }}>{item.cat}</span>
        </div>
        <button className="wl-card__move"
          onClick={() => onEnquire?.(item)}>
          Enquire Now <Icon name="arrowRight" size={14} />
        </button>
      </div>
    </article>
  );
}

/* ===========================================================================
   5. PAGE
=========================================================================== */
export default function WishlistPage({ onAddToCart, onRemoveFromWishlist }) {
  useDocumentTitle('Saved Wishlist');
  const { items: wishlistItems, toggleWishlist, clearWishlist: clearWishlistCtx } = useWishlist();
  const { addItem: addCartItem } = useCart();
  const { openQuickView } = useUI();
  const [sort, setSort] = useState("recent");
  const [toast, setToast] = useState("");
  const [bulkWorking, setBulkWorking] = useState(false);

  const items = wishlistItems;

  // Toast auto-hide
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  // Sorting
  const sorted = useMemo(() => {
    const list = [...items];
    switch (sort) {
      case "az": return list.sort((a, b) => a.name.localeCompare(b.name));
      case "recent":
      default: return list;
    }
  }, [items, sort]);

  const count = items.length;
  const inStockCount = items.filter((i) => i.inStock).length;

  // ---- Actions
  const remove = (item) => {
    toggleWishlist(item);
    setToast(`${item.name} removed`);
    onRemoveFromWishlist?.(item);
  };

  const moveToBag = (item) => {
    addCartItem({
      id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      price: item.price,
      spec: item.spec,
      image: item.img,
      img: item.img,
      qty: 1,
    });
    onAddToCart?.(item);
    setToast(`${item.name} moved to bag`);
  };

  const moveAll = () => {
    const available = items.filter((i) => i.inStock);
    if (!available.length) {
      setToast("Nothing available to move to bag");
      return;
    }
    setBulkWorking(true);
    available.forEach((i) => {
      addCartItem({
        id: i.id || i.name.toLowerCase().replace(/\s+/g, '-'),
        name: i.name,
        price: i.price,
        spec: i.spec,
        image: i.img,
        img: i.img,
        qty: 1,
      });
      onAddToCart?.(i);
    });
    setToast(`${available.length} ${available.length === 1 ? "piece" : "pieces"} moved to bag`);
    setTimeout(() => setBulkWorking(false), 600);
  };

  const clearAll = () => {
    if (!items.length) return;
    clearWishlistCtx();
    setToast("Wishlist cleared");
  };

  return (
    <main>
      <style>{WISH_CSS}</style>

      {/* ===== Hero ===== */}
      <section className="wl-hero">
        <div className="wl-wrap">
          <div className="wl-hero__inner">
            <div>
              <span className="wl-eyebrow">Saved for later</span>
              <h1 className="wl-hero__title">Your wishlist</h1>
              <p className="wl-hero__lede">
                The pieces you return to. Kept safe here so nothing slips.
              </p>
            </div>
            <Link className="wl-btn wl-btn--ghost" to="/collections">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Toolbar ===== */}
      {count > 0 && (
        <div className="wl-wrap">
          <div className="wl-toolbar">
            <span className="wl-toolbar__count">
              {count} {count === 1 ? "piece" : "pieces"}
              {inStockCount > 0 && ` · ${inStockCount} available`}
            </span>
            <div className="wl-toolbar__actions">
              <label htmlFor="wl-sort" className="sr-only">Sort by</label>
              <select id="wl-sort" className="wl-sort" value={sort}
                onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
              <button className="wl-btn wl-btn--solid"
                onClick={() => items.length && openQuickView(items[0])}>
                Enquire Saved Pieces
              </button>
              <button className="wl-btn wl-btn--text" onClick={clearAll}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Body ===== */}
      <div className="wl-wrap wl-body">
        {count === 0 ? (
          <div className="wl-empty">
            <img src="/brand/logo-mark-dark.png" alt="" style={{ width: 28, height: 28, margin: '0 auto 12px', display: 'block', opacity: 0.6 }} />
            <h3>Nothing saved, yet.</h3>
            <p>When you find something worth returning to, it lives here.</p>
            <Link className="wl-btn wl-btn--solid" to="/collections"
              style={{ display: "inline-flex" }}>
              Explore collections
            </Link>
          </div>
        ) : (
          <div className="wl-grid">
            {sorted.map((item) => (
              <WishlistCard key={item.id} item={item}
                onRemove={remove} onEnquire={openQuickView} />
            ))}
          </div>
        )}
      </div>

      {/* ===== Recommended ===== */}
      <section className="wl-related" aria-labelledby="wl-rec">
        <div className="wl-wrap">
          <div className="wl-related__head">
            <div>
              <span className="wl-eyebrow">You may also like</span>
              <h2 id="wl-rec" className="wl-related__title">A few we love for you</h2>
            </div>
            <Link className="wl-btn wl-btn--ghost" to="/collections"
              style={{ minHeight: 44 }}>
              Explore All
            </Link>
          </div>
          <div className="wl-rail">
            {RECOMMENDED.map((p) => <MiniCard key={p.id} p={p} onEnquire={openQuickView} />)}
          </div>
        </div>
      </section>

      {/* ===== Toast ===== */}
      <div className={`wl-toast ${toast ? "is-visible" : ""}`} role="status"
        aria-live="polite">
        {toast}
      </div>
    </main>
  );
}