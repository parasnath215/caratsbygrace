// src/components/SearchOverlay.jsx
// Carats by Grace — Search overlay (full-screen)
// Tech: React (JSX). Drop-in component; mount once at app root.
// Features: full-screen overlay, live filter, suggested terms, trending,
// recent searches (persisted), quick results (products + collections),
// keyboard navigation (↑↓ / Enter / Esc), focus trap, ARIA-compliant.

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ===========================================================================
   1. STYLES
=========================================================================== */
const SEARCH_CSS = `
:root{
  --so-white:#FFFFFF; --so-ivory:#FAF6F1; --so-burgundy:#7B1E3A;
  --so-wine:#4A1124; --so-gold:#C6A15B; --so-ink:#17120F;
  --so-muted:#7A6F70; --so-line:#E9E1D8; --so-blush:#F1E3DC;
  --so-rose-gold:#C9967F;
  --so-serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --so-sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --so-ease:cubic-bezier(.22,.61,.36,1);
  --so-pad-x:clamp(20px,5vw,80px);
}
.so-backdrop{position:fixed;inset:0;background:rgba(23,18,15,.42);
  z-index:110;opacity:0;pointer-events:none;
  transition:opacity .3s var(--so-ease)}
.so-backdrop.is-open{opacity:1;pointer-events:auto}

.so-panel{position:fixed;inset:0;background:var(--so-white);z-index:111;
  display:flex;flex-direction:column;
  opacity:0;transform:translateY(-12px);
  transition:opacity .35s var(--so-ease),transform .35s var(--so-ease);
  pointer-events:none;font-family:var(--so-sans);color:var(--so-ink);
  overflow-y:auto;overscroll-behavior:contain}
.so-panel.is-open{opacity:1;transform:none;pointer-events:auto}

/* Header row */
.so-head{position:sticky;top:0;background:var(--so-white);z-index:2;
  border-bottom:1px solid var(--so-line);
  padding:24px var(--so-pad-x) 20px;display:flex;
  justify-content:space-between;align-items:center;gap:20px}
.so-head__label{font-size:.68rem;letter-spacing:.24em;text-transform:uppercase;
  color:var(--so-muted)}
.so-close{width:44px;height:44px;display:grid;place-items:center;
  color:var(--so-ink);border-radius:999px;transition:color .25s var(--so-ease)}
.so-close:hover{color:var(--so-burgundy)}

/* Search input */
.so-search{padding:28px var(--so-pad-x) 20px;
  max-width:980px;margin:0 auto;width:100%}
.so-field{position:relative;display:flex;align-items:center;
  border-bottom:1px solid var(--so-ink);padding-bottom:12px}
.so-field__icon{color:var(--so-muted);flex:none;margin-right:14px}
.so-input{flex:1;border:0;background:transparent;font-family:var(--so-serif);
  font-size:clamp(1.3rem,3.2vw,2rem);font-weight:400;color:var(--so-ink);
  padding:6px 0;letter-spacing:-.005em}
.so-input:focus{outline:none}
.so-input::placeholder{color:var(--so-muted);opacity:.7}
.so-clear{color:var(--so-muted);padding:8px;flex:none;
  transition:color .25s var(--so-ease)}
.so-clear:hover{color:var(--so-burgundy)}

/* Body — shared container */
.so-body{flex:1;max-width:980px;margin:0 auto;width:100%;
  padding:12px var(--so-pad-x) 64px}
.so-section{margin-bottom:32px}
.so-section__title{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--so-muted);margin:0 0 14px;display:flex;
  justify-content:space-between;align-items:baseline;font-weight:500}
.so-section__title button{font-size:.66rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--so-burgundy);
  text-decoration:underline;text-underline-offset:4px}

/* Chips */
.so-chips{display:flex;flex-wrap:wrap;gap:8px}
.so-chip{display:inline-flex;align-items:center;gap:8px;min-height:40px;
  padding:0 16px;border:1px solid var(--so-line);border-radius:999px;
  background:var(--so-white);font-size:.78rem;color:var(--so-ink);
  transition:all .25s var(--so-ease)}
.so-chip:hover{border-color:var(--so-burgundy);color:var(--so-burgundy)}
.so-chip__x{width:16px;height:16px;display:grid;place-items:center;
  color:var(--so-muted);font-size:.85rem;line-height:1}
.so-chip__x:hover{color:var(--so-burgundy)}

/* Recent / trending list */
.so-list{display:grid;gap:2px}
.so-row{display:flex;align-items:center;gap:12px;min-height:44px;
  padding:0 8px;border-radius:1px;
  transition:background .2s var(--so-ease)}
.so-row:hover,.so-row.is-active{background:var(--so-ivory)}
.so-row__icon{color:var(--so-muted);flex:none}
.so-row__label{flex:1;font-size:.92rem;color:var(--so-ink);text-align:left;
  background:none;border:0;cursor:pointer;padding:0;font-family:inherit}
.so-row__meta{font-size:.72rem;color:var(--so-muted);letter-spacing:.04em}
.so-row__remove{width:32px;height:32px;display:grid;place-items:center;
  color:var(--so-muted);border-radius:999px}
.so-row__remove:hover{color:var(--so-burgundy)}

/* Result rows (products) */
.so-result{display:grid;grid-template-columns:64px 1fr auto;gap:14px;
  padding:12px 8px;border-radius:1px;align-items:center;
  transition:background .2s var(--so-ease);border:0;background:none;
  text-align:left;width:100%;cursor:pointer;font-family:inherit;
  color:inherit}
.so-result:hover,.so-result.is-active{background:var(--so-ivory)}
.so-result__img{width:64px;height:80px;object-fit:cover;background:var(--so-blush)}
.so-result__body{min-width:0}
.so-result__name{font-family:var(--so-serif);font-size:1rem;
  margin:0 0 2px;font-weight:500}
.so-result__spec{font-size:.74rem;color:var(--so-muted);margin:0}
.so-result__price{font-size:.84rem;font-weight:500;white-space:nowrap;
  font-variant-numeric:tabular-nums}

/* Empty */
.so-empty{text-align:center;padding:40px 0 20px}
.so-empty__mark{font-family:var(--so-serif);font-size:2.6rem;
  color:var(--so-rose-gold);line-height:1;margin-bottom:8px}
.so-empty h3{font-family:var(--so-serif);font-size:1.35rem;font-weight:400;
  margin:0 0 8px}
.so-empty p{color:var(--so-muted);font-size:.9rem;max-width:42ch;
  margin:0 auto 20px}

/* Footer hint */
.so-hint{display:flex;flex-wrap:wrap;gap:18px;align-items:center;
  padding:14px var(--so-pad-x);border-top:1px solid var(--so-line);
  font-size:.68rem;letter-spacing:.06em;color:var(--so-muted);
  background:var(--so-white);position:sticky;bottom:0}
.so-hint kbd{display:inline-grid;place-items:center;min-width:20px;height:20px;
  padding:0 5px;border:1px solid var(--so-line);border-radius:3px;
  font-family:var(--so-sans);font-size:.62rem;color:var(--so-ink);
  background:var(--so-ivory);line-height:1}

/* Backend loading shimmer */
.so-loading{display:inline-flex;gap:4px;align-items:center;
  font-size:.72rem;color:var(--so-muted)}

@media (max-width:640px){
  .so-head{padding:16px var(--so-pad-x) 14px}
  .so-search{padding:20px var(--so-pad-x) 12px}
  .so-body{padding:8px var(--so-pad-x) 48px}
  .so-result{grid-template-columns:52px 1fr auto;gap:10px}
  .so-result__img{width:52px;height:66px}
  .so-hint{display:none}
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
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    trending: <><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7h-5" /><path d="M21 7v5" /></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

const INR = (n) => "₹" + n.toLocaleString("en-IN");

/* ===========================================================================
   3. CONFIG + PLACEHOLDER DATA
   In production: fetch from /api/search?q=...  (Node backend). The block
   below gives an instant local fallback so typing feels alive.
=========================================================================== */
const SUGGESTIONS = [
  "Bridal rings",
  "Everyday gold hoops",
  "Ruby cocktail ring",
  "Diamond studs",
  "Gifting under ₹50K",
  "Layered necklaces",
];

const TRENDING = [
  "The Nocturne Edit",
  "Solitaire rings",
  "Rose gold",
  "Bridal sets",
];

const COLLECTIONS = [
  { id: "bridal", label: "The Bridal Edit", meta: "Collection" },
  { id: "gifting", label: "The Gifting Edit", meta: "Collection" },
  { id: "high-jewellery", label: "High Jewellery", meta: "Collection" },
];

const PRODUCTS = [
  { id: "r1", name: "The Aurelia Ring", spec: "18K Gold · 0.42 ct", price: 64000, cat: "Rings", keywords: "ring gold solitaire aurelia",
    img: "/assets/model1/m1_8252_final.webp" },
  { id: "r2", name: "Ruby Halo", spec: "Rose Gold · Ruby", price: 132000, cat: "Rings", keywords: "ring ruby rose gold cocktail",
    img: "/assets/model1/m1_8403_final.webp" },
  { id: "r3", name: "Grace Solitaire", spec: "18K · 0.60 ct", price: 98000, cat: "Rings", keywords: "ring solitaire white gold bridal",
    img: "/assets/model2/m2_8124.webp" },
  { id: "e1", name: "Drop Lumière", spec: "18K · 0.30 ct", price: 76000, cat: "Earrings", keywords: "earrings drops gold diamonds",
    img: "/assets/model1/m1_8440_final.webp" },
  { id: "e2", name: "Petal Studs", spec: "Rose Gold", price: 32000, cat: "Earrings", keywords: "earrings studs rose gold everyday",
    img: "/assets/model2/m2_8126.webp" },
  { id: "e3", name: "Nightfall Hoops", spec: "18K · Diamonds", price: 118000, cat: "Earrings", keywords: "earrings hoops diamonds",
    img: "/assets/model1/m1_8306_final.webp" },
  { id: "n1", name: "Lumen Pendant", spec: "18K · 0.25 ct", price: 54000, cat: "Necklaces", keywords: "necklace pendant gold",
    img: "/assets/model2/cg_jewellers8471.webp" },
  { id: "n3", name: "Étoile Necklace", spec: "18K · Diamonds", price: 156000, cat: "Necklaces", keywords: "necklace diamonds bridal",
    img: "/assets/model1/m1_8247_final.webp" },
  { id: "b1", name: "Slip Bracelet", spec: "18K Gold", price: 58000, cat: "Bracelets", keywords: "bracelet gold everyday",
    img: "/assets/model2/m2_8124.webp" },
];

const RECENT_KEY = "cbg_recent_searches_v1";
const RECENT_MAX = 6;

/* ===========================================================================
   4. HELPERS
=========================================================================== */
function loadRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch { return []; }
}
function saveRecent(list) {
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX))); }
  catch { /* quota — ignore */ }
}

function scoreMatch(haystack, needle) {
  if (!needle) return 0;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase().trim();
  if (!n) return 0;
  if (h === n) return 100;
  if (h.startsWith(n)) return 80;
  const wordStart = h.split(/\s+/).some((w) => w.startsWith(n));
  if (wordStart) return 60;
  if (h.includes(n)) return 40;
  return 0;
}

/* ===========================================================================
   5. COMPONENT
=========================================================================== */
export default function SearchOverlay({
  open = false,
  onClose,
  onNavigate,           // (path) => void — hook into your router
  fetcher,              // optional async (q, signal) => { products, collections }
}) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [remote, setRemote] = useState({ products: [], collections: [] });
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  // Load recent on open
  useEffect(() => {
    if (open) setRecent(loadRecent());
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const t = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select?.();
    }, 80);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Escape closes; Tab traps focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose?.(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Remote search (debounced) — falls back to local scoring when no fetcher
  useEffect(() => {
    if (!fetcher) { setRemote({ products: [], collections: [] }); setLoading(false); return; }
    const q = query.trim();
    if (!q) { setRemote({ products: [], collections: [] }); setLoading(false); return; }
    const ctrl = new AbortController();
    setLoading(true);
    const t = setTimeout(() => {
      fetcher(q, ctrl.signal)
        .then((data) => {
          if (ctrl.signal.aborted) return;
          setRemote({
            products: Array.isArray(data?.products) ? data.products : [],
            collections: Array.isArray(data?.collections) ? data.collections : [],
          });
        })
        .catch(() => { /* silent */ })
        .finally(() => { if (!ctrl.signal.aborted) setLoading(false); });
    }, 220);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [query, fetcher]);

  // Local fallback results + collection matches
  const localResults = useMemo(() => {
    const q = query.trim();
    if (!q) return { products: [], collections: [] };
    const products = PRODUCTS
      .map((p) => ({
        p,
        score: Math.max(
          scoreMatch(p.name, q),
          scoreMatch(p.cat, q),
          scoreMatch(p.keywords || "", q)
        ),
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.p);
    const collections = COLLECTIONS
      .filter((c) => scoreMatch(c.label, q) > 0)
      .slice(0, 4);
    return { products, collections };
  }, [query]);

  const results = fetcher ? remote : localResults;
  const hasQuery = query.trim().length > 0;
  const hasResults = results.products.length > 0 || results.collections.length > 0;

  // Build a flat, ordered list for keyboard navigation
  const navList = useMemo(() => {
    if (!hasQuery) return [];
    const list = [];
    results.collections.forEach((c) =>
      list.push({ kind: "collection", label: c.label, href: `/collections/${c.id}` })
    );
    results.products.forEach((p) =>
      list.push({ kind: "product", label: p.name, href: `/products/${p.id}`, id: p.id })
    );
    return list;
  }, [results, hasQuery]);

  // Reset active index when results change
  useEffect(() => { setActiveIndex(-1); }, [query, results.products.length, results.collections.length]);

  // ---- Recent search helpers
  const pushRecent = (term) => {
    const clean = term.trim();
    if (!clean) return;
    const next = [clean, ...recent.filter((r) => r.toLowerCase() !== clean.toLowerCase())]
      .slice(0, RECENT_MAX);
    setRecent(next); saveRecent(next);
  };
  const removeRecent = (term) => {
    const next = recent.filter((r) => r !== term);
    setRecent(next); saveRecent(next);
  };
  const clearRecent = () => { setRecent([]); saveRecent([]); };

  // ---- Submit handlers
  const goTo = (path) => {
    onClose?.();
    if (onNavigate) onNavigate(path);
    else window.location.href = path;
  };

  const submit = (term) => {
    const clean = (term ?? query).trim();
    if (!clean) return;
    pushRecent(clean);
    goTo(`/collections?q=${encodeURIComponent(clean)}`);
  };

  const pickSuggestion = (term) => {
    setQuery(term);
    inputRef.current?.focus();
  };

  const pickResult = (item, term) => {
    pushRecent(term ?? query ?? item.label);
    goTo(item.href);
  };

  // ---- Keyboard nav on the input
  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (navList.length) setActiveIndex((i) => Math.min(navList.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (navList.length) setActiveIndex((i) => Math.max(-1, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && navList[activeIndex]) {
        pickResult(navList[activeIndex], navList[activeIndex].label);
      } else {
        submit();
      }
    }
  };

  /* ---- Render ---- */
  return (
    <>
      <style>{SEARCH_CSS}</style>

      <div className={`so-backdrop ${open ? "is-open" : ""}`}
           onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        className={`so-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="so-title"
        aria-hidden={!open}
      >
        <div className="so-head">
          <span id="so-title" className="so-head__label">Search</span>
          <button className="so-close" aria-label="Close search" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="so-search">
          <div className="so-field">
            <span className="so-field__icon" aria-hidden="true">
              <Icon name="search" size={22} />
            </span>
            <label htmlFor="so-input" className="sr-only"
              style={{ position: "absolute", left: -9999 }}>
              Search products, collections
            </label>
            <input
              ref={inputRef}
              id="so-input"
              className="so-input"
              type="search"
              autoComplete="off"
              placeholder="Search rings, earrings, collections…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              aria-controls="so-results"
              aria-autocomplete="list"
              aria-activedescendant={
                activeIndex >= 0 ? `so-item-${activeIndex}` : undefined
              }
            />
            {query && (
              <button className="so-clear" aria-label="Clear search"
                      onClick={() => { setQuery(""); inputRef.current?.focus(); }}>
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="so-body" id="so-results">
          {/* Default (no query) — suggestions / recent / trending / collections */}
          {!hasQuery && (
            <>
              {recent.length > 0 && (
                <section className="so-section" aria-labelledby="so-recent">
                  <h3 id="so-recent" className="so-section__title">
                    Recent searches
                    <button onClick={clearRecent}>Clear all</button>
                  </h3>
                  <div className="so-list" role="list">
                    {recent.map((r) => (
                      <div className="so-row" role="listitem" key={r}>
                        <span className="so-row__icon" aria-hidden="true">
                          <Icon name="clock" size={16} />
                        </span>
                        <button className="so-row__label" onClick={() => pickSuggestion(r)}>
                          {r}
                        </button>
                        <button className="so-row__remove"
                                aria-label={`Remove "${r}" from recent searches`}
                                onClick={() => removeRecent(r)}>
                          <Icon name="close" size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="so-section" aria-labelledby="so-suggest">
                <h3 id="so-suggest" className="so-section__title">Suggested</h3>
                <div className="so-chips">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="so-chip" onClick={() => pickSuggestion(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              <section className="so-section" aria-labelledby="so-trend">
                <h3 id="so-trend" className="so-section__title">Trending now</h3>
                <div className="so-chips">
                  {TRENDING.map((t) => (
                    <button key={t} className="so-chip" onClick={() => pickSuggestion(t)}>
                      <Icon name="trending" size={14} />
                      {t}
                    </button>
                  ))}
                </div>
              </section>

              <section className="so-section" aria-labelledby="so-colls">
                <h3 id="so-colls" className="so-section__title">Browse collections</h3>
                <div className="so-chips">
                  {COLLECTIONS.map((c) => (
                    <button key={c.id} className="so-chip"
                            onClick={() => pickResult({ href: `/collections/${c.id}` }, c.label)}>
                      {c.label}
                      <Icon name="arrowRight" size={14} />
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* With query — results or empty */}
          {hasQuery && (
            <>
              {loading && (
                <div className="so-loading" role="status" aria-live="polite">
                  Searching…
                </div>
              )}

              {!loading && hasResults && (
                <>
                  {results.collections.length > 0 && (
                    <section className="so-section" aria-labelledby="so-colls-res">
                      <h3 id="so-colls-res" className="so-section__title">Collections</h3>
                      <div className="so-chips">
                        {results.collections.map((c) => (
                          <button key={c.id || c.label} className="so-chip"
                                  onClick={() => pickResult({ href: c.href || `/collections/${c.id}` }, c.label)}>
                            {c.label}
                            <Icon name="arrowRight" size={14} />
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {results.products.length > 0 && (
                    <section className="so-section" aria-labelledby="so-prods-res">
                      <h3 id="so-prods-res" className="so-section__title">
                        Pieces
                        <button onClick={() => submit()}>See all</button>
                      </h3>
                      <div className="so-list" role="list">
                        {results.products.map((p, i) => {
                          const flatIndex = results.collections.length + i;
                          const isActive = activeIndex === flatIndex;
                          return (
                            <button
                              key={p.id}
                              id={`so-item-${flatIndex}`}
                              role="listitem"
                              className={`so-result ${isActive ? "is-active" : ""}`}
                              onClick={() => pickResult({ href: `/products/${p.id}` }, p.name)}
                            >
                              <img className="so-result__img" src={p.img} alt="" loading="lazy" />
                              <div className="so-result__body">
                                <div className="so-result__name">{p.name}</div>
                                <div className="so-result__spec">{p.spec}</div>
                              </div>
                              <span className="so-result__price">{INR(p.price)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}
                </>
              )}

              {!loading && !hasResults && (
                <div className="so-empty">
                  <div className="so-empty__mark" aria-hidden="true">✦</div>
                  <h3>Nothing matched “{query.trim()}”.</h3>
                  <p>Try a different word, or explore one of these edits.</p>
                  <div className="so-chips" style={{ justifyContent: "center" }}>
                    {TRENDING.slice(0, 3).map((t) => (
                      <button key={t} className="so-chip" onClick={() => pickSuggestion(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="so-hint" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </>
  );
}
