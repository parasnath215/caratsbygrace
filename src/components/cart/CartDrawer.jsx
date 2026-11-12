// src/components/CartDrawer.jsx
// Carats by Grace — Cart drawer (right-hand slide-in)
// Tech: React (JSX). Self-contained; can be mounted once at app root.
// Features: line items, qty steppers, gift-wrap toggle, order note, subtotal,
// progress toward free shipping, checkout CTA, empty state.

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ===========================================================================
   1. STYLES (scoped-ish; prefixed cd- to avoid clashes)
=========================================================================== */
const CART_CSS = `
:root{
  --cd-white:#FFFFFF; --cd-ivory:#FAF6F1; --cd-burgundy:#7B1E3A;
  --cd-wine:#4A1124; --cd-gold:#C6A15B; --cd-ink:#17120F;
  --cd-muted:#7A6F70; --cd-line:#E9E1D8; --cd-blush:#F1E3DC;
  --cd-rose-gold:#C9967F; --cd-ruby:#A3152F;
  --cd-serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --cd-sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --cd-ease:cubic-bezier(.22,.61,.36,1);
}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}

.cd-backdrop{position:fixed;inset:0;background:rgba(23,18,15,.36);
  opacity:0;pointer-events:none;transition:opacity .35s var(--cd-ease);
  z-index:95}
.cd-backdrop.is-open{opacity:1;pointer-events:auto}

.cd-panel{position:fixed;top:0;right:0;bottom:0;width:min(460px,100vw);
  height:100%;max-height:100vh;max-height:100dvh;
  background:var(--cd-white);z-index:96;display:flex;flex-direction:column;
  transform:translateX(100%);transition:transform .4s var(--cd-ease);
  box-shadow:0 0 60px rgba(23,18,15,.18);
  font-family:var(--cd-sans);color:var(--cd-ink);
  overflow:hidden}
.cd-panel.is-open{transform:translateX(0)}

/* Head */
.cd-head{display:flex;align-items:center;justify-content:space-between;
  padding:20px 24px;border-bottom:1px solid var(--cd-line);flex-shrink:0}
.cd-head__title{font-family:var(--cd-serif);font-size:1.35rem;font-weight:500;
  margin:0;display:flex;align-items:baseline;gap:10px}
.cd-head__count{font-family:var(--cd-sans);font-size:.72rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--cd-muted)}
.cd-close{width:44px;height:44px;display:grid;place-items:center;
  color:var(--cd-ink);border-radius:999px;transition:color .25s var(--cd-ease)}
.cd-close:hover{color:var(--cd-burgundy)}

/* Scrollable middle container */
.cd-scroll-area{flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;
  -webkit-overflow-scrolling:touch;overscroll-behavior:contain;
  scrollbar-width:thin;scrollbar-color:var(--cd-line) transparent}
.cd-scroll-area::-webkit-scrollbar{width:6px}
.cd-scroll-area::-webkit-scrollbar-track{background:transparent}
.cd-scroll-area::-webkit-scrollbar-thumb{background:var(--cd-line);border-radius:999px}
.cd-scroll-area::-webkit-scrollbar-thumb:hover{background:var(--cd-rose-gold)}

/* Shipping progress */
.cd-progress{padding:14px 24px;border-bottom:1px solid var(--cd-line);
  background:var(--cd-ivory);flex-shrink:0}
.cd-progress__label{font-size:.74rem;letter-spacing:.04em;color:var(--cd-ink);
  margin-bottom:8px}
.cd-progress__label strong{color:var(--cd-burgundy);font-weight:500}
.cd-progress__bar{height:2px;background:var(--cd-line);position:relative;
  overflow:hidden}
.cd-progress__fill{position:absolute;left:0;top:0;bottom:0;
  background:var(--cd-gold);transition:width .5s var(--cd-ease)}

/* Body */
.cd-body{padding:8px 24px}
.cd-list{list-style:none;margin:0;padding:0}
.cd-item{display:grid;grid-template-columns:84px 1fr auto;gap:14px;
  padding:20px 0;border-bottom:1px solid var(--cd-line)}
.cd-item__media{position:relative;aspect-ratio:4/5;overflow:hidden;
  background:var(--cd-blush)}
.cd-item__media img{width:100%;height:100%;object-fit:cover}
.cd-item__info{display:flex;flex-direction:column;min-width:0}
.cd-item__name{font-family:var(--cd-serif);font-size:1rem;font-weight:500;
  margin:0 0 4px;line-height:1.25}
.cd-item__spec{font-size:.74rem;color:var(--cd-muted);margin:0 0 6px}
.cd-item__opts{font-size:.7rem;color:var(--cd-muted);margin:0 0 10px;
  display:flex;flex-wrap:wrap;gap:8px}
.cd-item__opts span{background:var(--cd-ivory);padding:2px 8px;border-radius:999px}
.cd-item__stepper{display:inline-flex;align-items:center;
  border:1px solid var(--cd-line);width:fit-content}
.cd-item__stepper button{width:32px;height:32px;display:grid;place-items:center;
  color:var(--cd-ink);transition:background .2s var(--cd-ease)}
.cd-item__stepper button:hover{background:var(--cd-ivory)}
.cd-item__stepper button:disabled{color:var(--cd-line);cursor:not-allowed}
.cd-item__qty{min-width:28px;text-align:center;font-size:.84rem;
  font-variant-numeric:tabular-nums}
.cd-item__right{display:flex;flex-direction:column;align-items:flex-end;
  justify-content:space-between;gap:8px}
.cd-item__price{font-size:.9rem;font-weight:500;
  font-variant-numeric:tabular-nums}
.cd-item__remove{font-size:.66rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--cd-muted);padding:4px 0;transition:color .25s var(--cd-ease)}
.cd-item__remove:hover{color:var(--cd-ruby)}

/* Notes */
.cd-note{padding:16px 24px;border-bottom:1px solid var(--cd-line)}
.cd-note label{display:block;font-size:.66rem;letter-spacing:.2em;
  text-transform:uppercase;color:var(--cd-muted);margin-bottom:8px}
.cd-note textarea{width:100%;border:1px solid var(--cd-line);
  background:var(--cd-white);padding:10px 12px;font-family:var(--cd-sans);
  font-size:.88rem;color:var(--cd-ink);resize:vertical;min-height:64px;
  border-radius:1px;transition:border-color .25s var(--cd-ease)}
.cd-note textarea:focus{outline:none;border-color:var(--cd-burgundy)}

/* Options */
.cd-opts{padding:14px 24px;border-bottom:1px solid var(--cd-line)}
.cd-check{display:flex;align-items:flex-start;gap:10px;cursor:pointer;
  font-size:.82rem;color:var(--cd-ink);padding:8px 0}
.cd-check input{margin-top:3px;accent-color:var(--cd-burgundy);width:16px;
  height:16px;flex:none}
.cd-check span strong{display:block;font-weight:500;margin-bottom:2px}
.cd-check span em{font-style:normal;color:var(--cd-muted);font-size:.74rem}

/* Foot */
.cd-foot{padding:20px 24px;border-top:1px solid var(--cd-line);
  background:var(--cd-white);flex-shrink:0}
.cd-summary{display:flex;justify-content:space-between;align-items:baseline;
  margin-bottom:6px;font-size:.92rem}
.cd-summary__label{color:var(--cd-muted);letter-spacing:.02em}
.cd-summary__value{font-weight:500;font-variant-numeric:tabular-nums}
.cd-summary__note{font-size:.68rem;color:var(--cd-muted);
  margin-bottom:16px;letter-spacing:.02em}
.cd-cta{width:100%;min-height:52px;background:var(--cd-burgundy);
  color:var(--cd-ivory);font-size:.78rem;letter-spacing:.18em;
  text-transform:uppercase;font-weight:500;border:1px solid transparent;
  transition:background .25s var(--cd-ease);display:flex;align-items:center;
  justify-content:center;gap:10px}
.cd-cta:hover{background:var(--cd-wine)}
.cd-cta:disabled{opacity:.45;cursor:not-allowed}
.cd-continue{display:block;text-align:center;font-size:.7rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--cd-ink);margin-top:12px;
  text-decoration:underline;text-underline-offset:4px}
.cd-continue:hover{color:var(--cd-burgundy)}
.cd-trust{display:flex;align-items:center;justify-content:center;gap:6px;
  font-size:.66rem;letter-spacing:.06em;color:var(--cd-muted);
  margin-top:14px;text-align:center}

/* Empty */
.cd-empty{flex:1;display:flex;flex-direction:column;align-items:center;
  justify-content:center;text-align:center;padding:40px 24px}
.cd-empty__spark{color:var(--cd-gold);font-size:1rem;letter-spacing:.4em;
  margin-bottom:14px}
.cd-empty h3{font-family:var(--cd-serif);font-size:1.5rem;font-weight:400;
  margin:0 0 8px}
.cd-empty p{color:var(--cd-muted);font-size:.88rem;max-width:32ch;margin:0 0 24px}
.cd-empty .cd-cta{max-width:280px}

/* Toast */
.cd-toast{position:fixed;bottom:24px;left:50%;transform:translate(-50%, 20px);
  background:var(--cd-ink);color:var(--cd-ivory);font-size:.78rem;
  letter-spacing:.08em;padding:12px 20px;z-index:101;opacity:0;
  transition:all .35s var(--cd-ease);pointer-events:none;white-space:nowrap}
.cd-toast.is-visible{opacity:1;transform:translate(-50%, 0)}

@media (max-width:480px){
  .cd-head{padding:16px 18px}
  .cd-body{padding:4px 18px}
  .cd-note,.cd-opts,.cd-foot,.cd-progress{padding-inline:18px}
  .cd-item{grid-template-columns:72px 1fr auto;gap:12px}
  .cd-note textarea{font-size:16px}
}
@media (max-height:560px){
  .cd-panel{overflow-y:auto}
  .cd-scroll-area{overflow-y:visible;flex:none}
}
`;

/* ===========================================================================
   2. ICONS
=========================================================================== */
function Icon({ name, size = 18 }) {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round",
    strokeLinejoin: "round", "aria-hidden": true,
  };
  const paths = {
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    minus: <><path d="M5 12h14" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    shield: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

const INR = (n) => "₹" + n.toLocaleString("en-IN");

/* ===========================================================================
   3. CONFIG
=========================================================================== */
const FREE_SHIP_THRESHOLD = 50000; // PLACEHOLDER: confirm with the brand
const GIFT_WRAP_PRICE = 500;       // PLACEHOLDER: confirm gift-wrap fee (or free)
const MAX_QTY = 10;                // PLACEHOLDER: confirm per-line limit

/* ===========================================================================
   4. COMPONENT
=========================================================================== */
export default function CartDrawer({
  open = false,
  items = [],
  onClose,
  onQtyChange,
  onRemove,
  onCheckout,
  onContinueShopping,
}) {
  const [giftWrap, setGiftWrap] = useState(false);
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const panelRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocused = useRef(null);

  // ---- Derived totals
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );
  const itemCount = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );
  const giftFee = giftWrap && items.length ? GIFT_WRAP_PRICE : 0;
  const total = subtotal + giftFee;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
  const freeShip = remaining === 0;

  // ---- Toast helper
  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1600);
  };

  // ---- Forward wheel scrolling from non-scrollable panel areas (e.g. head/foot) to scroll area
  const handlePanelWheel = (e) => {
    if (scrollAreaRef.current && !scrollAreaRef.current.contains(e.target)) {
      scrollAreaRef.current.scrollTop += e.deltaY;
    }
  };

  // ---- Lock body scroll + Escape + focus trap + restore focus
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";
    // Focus first meaningful control
    const t = setTimeout(() => closeBtnRef.current?.focus(), 60);

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  // ---- Handlers
  const handleQty = (id, delta) => {
    const item = items.find((i) => (i._cartKey || i.id) === id || i.id === id);
    if (!item) return;
    const next = item.qty + delta;
    if (next < 1) return;
    if (next > MAX_QTY) {
      flash(`Limit ${MAX_QTY} per line`);
      return;
    }
    onQtyChange?.(item._cartKey || item.id, next);
  };

  const handleRemove = (item) => {
    onRemove?.(item._cartKey || item.id);
    flash(`${item.name} removed`);
  };

  const handleCheckout = () => {
    if (!items.length) return;
    onCheckout?.({ items, subtotal, giftWrap, note, total });
  };

  return (
    <>
      <style>{CART_CSS}</style>

      {/* Backdrop */}
      <div
        className={`cd-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={`cd-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cd-title"
        aria-hidden={!open}
        onWheel={handlePanelWheel}
      >
        {/* Head */}
        <div className="cd-head">
          <h2 id="cd-title" className="cd-head__title">
            Your bag
            {itemCount > 0 && (
              <span className="cd-head__count">
                {itemCount} {itemCount === 1 ? "piece" : "pieces"}
              </span>
            )}
          </h2>
          <button
            ref={closeBtnRef}
            className="cd-close"
            aria-label="Close cart"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </div>

        {items.length === 0 ? (
          /* ---------- Empty ---------- */
          <div className="cd-empty">
            <div className="cd-empty__spark" aria-hidden="true">✦ ✦ ✦</div>
            <h3>Your bag is empty</h3>
            <p>Begin with the new edit — pieces made to be worn, not kept away.</p>
            <button className="cd-cta" onClick={onContinueShopping || onClose}>
              Explore collections <Icon name="arrowRight" size={14} />
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable middle container: Progress + Items + Gift Wrap + Order Note */}
            <div className="cd-scroll-area" ref={scrollAreaRef}>
              {/* Shipping progress */}
              <div className="cd-progress" role="status" aria-live="polite">
                <div className="cd-progress__label">
                  {freeShip ? (
                    <>You've unlocked <strong>complimentary insured shipping</strong>.</>
                  ) : (
                    <>You're <strong>{INR(remaining)}</strong> away from complimentary shipping.</>
                  )}
                </div>
                <div className="cd-progress__bar" aria-hidden="true">
                  <div className="cd-progress__fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Items */}
              <div className="cd-body">
                <ul className="cd-list">
                  {items.map((item) => (
                    <li key={item._cartKey || item.id} className="cd-item">
                      <a href={`/product/${item.id}`} className="cd-item__media"
                         onClick={onClose}>
                        <img src={item.image || item.img} alt={item.name} loading="lazy" />
                      </a>
                      <div className="cd-item__info">
                        <h3 className="cd-item__name">{item.name}</h3>
                        {item.spec && <p className="cd-item__spec">{item.spec}</p>}
                        {(item.metal || item.size) && (
                          <p className="cd-item__opts">
                            {item.metal && <span>{item.metal}</span>}
                            {item.size && <span>Size {item.size}</span>}
                          </p>
                        )}
                        <div className="cd-item__stepper"
                             role="group" aria-label={`Quantity for ${item.name}`}>
                          <button
                            aria-label="Decrease quantity"
                            disabled={item.qty <= 1}
                            onClick={() => handleQty(item._cartKey || item.id, -1)}
                          >
                            <Icon name="minus" size={14} />
                          </button>
                          <span className="cd-item__qty" aria-live="polite">
                            {item.qty}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            disabled={item.qty >= MAX_QTY}
                            onClick={() => handleQty(item._cartKey || item.id, 1)}
                          >
                            <Icon name="plus" size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="cd-item__right">
                        <span className="cd-item__price">
                          {INR(item.price * item.qty)}
                        </span>
                        <button
                          className="cd-item__remove"
                          onClick={() => handleRemove(item)}
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Options */}
              <div className="cd-opts">
                <label className="cd-check">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                  />
                  <span>
                    <strong>Add gift wrapping</strong>
                    <em>
                      {GIFT_WRAP_PRICE > 0
                        ? `${INR(GIFT_WRAP_PRICE)} · Hand-tied ribbon, ivory box`
                        : "Hand-tied ribbon, ivory box"}
                    </em>
                  </span>
                </label>
              </div>

              {/* Order note */}
              <div className="cd-note">
                <label htmlFor="cd-note-input">Order note (optional)</label>
                <textarea
                  id="cd-note-input"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="A gift message, delivery instructions, or anything we should know…"
                  maxLength={240}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="cd-foot">
              <div className="cd-summary">
                <span className="cd-summary__label">Subtotal</span>
                <span className="cd-summary__value">{INR(subtotal)}</span>
              </div>
              {giftWrap && (
                <div className="cd-summary">
                  <span className="cd-summary__label">Gift wrapping</span>
                  <span className="cd-summary__value">{INR(giftFee)}</span>
                </div>
              )}
              <div className="cd-summary" style={{ marginTop: 8 }}>
                <span className="cd-summary__label" style={{
                  color: "var(--cd-ink)", fontWeight: 500,
                }}>
                  Total
                </span>
                <span className="cd-summary__value" style={{ fontSize: "1.05rem" }}>
                  {INR(total)}
                </span>
              </div>
              <div className="cd-summary__note">
                Taxes included. Shipping calculated at checkout.
              </div>
              <button className="cd-cta" onClick={handleCheckout}>
                Proceed to checkout <Icon name="arrowRight" size={14} />
              </button>
              <button className="cd-continue" onClick={onContinueShopping || onClose}>
                Continue shopping
              </button>
              <div className="cd-trust">
                <Icon name="shield" size={14} /> Secure payment · Insured shipping · Easy returns
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Toast */}
      <div
        className={`cd-toast ${toast ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
}