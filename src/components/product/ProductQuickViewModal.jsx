// src/components/product/ProductQuickViewModal.jsx
// Carats by Grace — Luxury Product Quick View & Enquiry Modal
// Replaces "Buy now" / "Add to bag" with a small product pop up opening with details and an "Enquire Now" button.

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MODAL_CSS = `
:root{
  --pq-white:#FFFFFF; --pq-ivory:#FAF6F1; --pq-burgundy:#7B1E3A;
  --pq-wine:#4A1124; --pq-gold:#C6A15B; --pq-ink:#17120F;
  --pq-muted:#7A6F70; --pq-line:#E9E1D8; --pq-blush:#F1E3DC;
  --pq-rose-gold:#C9967F; --pq-green:#25D366;
  --pq-serif:"Cormorant Garamond","Playfair Display",Georgia,serif;
  --pq-sans:"Jost","Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --pq-ease:cubic-bezier(.22,.61,.36,1);
}

.pq-backdrop{
  position:fixed;inset:0;background:rgba(23,18,15,.62);
  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  z-index:120;display:grid;place-items:center;padding:16px;
  opacity:0;pointer-events:none;transition:opacity .3s var(--pq-ease);
}
.pq-backdrop.is-open{
  opacity:1;pointer-events:auto;
}

.pq-panel{
  background:var(--pq-white);width:min(820px, 100%);max-height:92vh;
  border-radius:4px;box-shadow:0 30px 70px rgba(23,18,15,.35);
  display:flex;flex-direction:column;position:relative;overflow:hidden;
  font-family:var(--pq-sans);color:var(--pq-ink);
  transform:scale(.95) translateY(10px);transition:all .35s var(--pq-ease);
}
.pq-backdrop.is-open .pq-panel{
  transform:scale(1) translateY(0);
}

.pq-close{
  position:absolute;top:16px;right:16px;z-index:10;
  width:38px;height:38px;border-radius:999px;
  background:rgba(250,246,241,.92);border:1px solid var(--pq-line);
  display:grid;place-items:center;color:var(--pq-ink);
  cursor:pointer;transition:all .25s var(--pq-ease);
}
.pq-close:hover{
  background:var(--pq-burgundy);color:var(--pq-ivory);border-color:var(--pq-burgundy);
}

.pq-scroll{
  overflow-y:auto;overscroll-behavior:contain;padding:0;
  max-height:92vh;scrollbar-width:thin;
}

.pq-grid{
  display:grid;grid-template-columns:1fr 1.15fr;min-height:500px;
}

/* Left Media Column */
.pq-media-col{
  background:var(--pq-ivory);padding:28px;
  display:flex;flex-direction:column;justify-content:space-between;
  border-right:1px solid var(--pq-line);
}
.pq-img-wrap{
  position:relative;aspect-ratio:4/5;overflow:hidden;
  background:var(--pq-blush);border-radius:2px;
}
.pq-img-wrap img{
  width:100%;height:100%;object-fit:cover;
  transition:transform .6s var(--pq-ease);
}
.pq-img-wrap:hover img{
  transform:scale(1.05);
}
.pq-badge{
  position:absolute;top:12px;left:12px;z-index:2;
  background:rgba(250,246,241,.94);color:var(--pq-burgundy);
  font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;
  font-weight:600;padding:4px 8px;border-radius:2px;
  border:1px solid rgba(123,30,58,.15);
}
.pq-thumbs{
  display:flex;gap:8px;margin-top:12px;
}
.pq-thumb-btn{
  width:54px;height:66px;border:1px solid var(--pq-line);
  background:transparent;padding:0;cursor:pointer;overflow:hidden;
  border-radius:2px;opacity:.7;transition:opacity .2s;
}
.pq-thumb-btn.is-active,.pq-thumb-btn:hover{
  opacity:1;border-color:var(--pq-burgundy);
}
.pq-thumb-btn img{
  width:100%;height:100%;object-fit:cover;
}
.pq-trust-list{
  margin-top:20px;display:grid;gap:8px;padding-top:16px;
  border-top:1px solid var(--pq-line);font-size:.72rem;color:var(--pq-muted);
}
.pq-trust-item{
  display:flex;align-items:center;gap:8px;
}
.pq-trust-item span{
  color:var(--pq-gold);font-size:.9rem;
}

/* Right Content Column */
.pq-info-col{
  padding:36px 36px 32px;display:flex;flex-direction:column;
}
.pq-eyebrow{
  font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--pq-muted);margin-bottom:8px;font-weight:500;
}
.pq-title{
  font-family:var(--pq-serif);font-size:clamp(1.5rem,2.8vw,1.9rem);
  font-weight:400;margin:0 0 6px;line-height:1.15;color:var(--pq-ink);
}
.pq-spec{
  font-size:.82rem;color:var(--pq-muted);margin:0 0 16px;line-height:1.4;
}
.pq-price-row{
  display:flex;align-items:baseline;gap:10px;margin-bottom:18px;
  padding-bottom:16px;border-bottom:1px solid var(--pq-line);
}
.pq-price{
  font-family:var(--pq-sans);font-size:1.35rem;font-weight:600;
  color:var(--pq-ink);
}
.pq-price-note{
  font-size:.72rem;color:var(--pq-muted);
}

/* Metal / Size Pills */
.pq-option-block{
  margin-bottom:18px;
}
.pq-opt-label{
  display:flex;justify-content:space-between;
  font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--pq-muted);margin-bottom:8px;font-weight:500;
}
.pq-chips{
  display:flex;flex-wrap:wrap;gap:8px;
}
.pq-chip{
  border:1px solid var(--pq-line);background:var(--pq-white);
  padding:6px 14px;border-radius:999px;font-size:.76rem;
  color:var(--pq-ink);cursor:pointer;transition:all .2s;
}
.pq-chip:hover,.pq-chip.is-active{
  border-color:var(--pq-burgundy);color:var(--pq-burgundy);
  background:rgba(123,30,58,.04);font-weight:500;
}

.pq-desc{
  font-size:.84rem;color:var(--pq-muted);line-height:1.55;
  margin:0 0 24px;
}

/* Actions */
.pq-actions{
  margin-top:auto;display:flex;flex-direction:column;gap:10px;
}
.pq-btn-enquire{
  min-height:50px;width:100%;background:var(--pq-burgundy);
  color:var(--pq-ivory);font-size:.78rem;letter-spacing:.18em;
  text-transform:uppercase;font-weight:500;border:1px solid var(--pq-burgundy);
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;
  border-radius:2px;transition:background .25s var(--pq-ease);
}
.pq-btn-enquire:hover{
  background:var(--pq-wine);
}
.pq-btn-wa{
  min-height:46px;width:100%;background:transparent;
  color:#1F7A4A;border:1px solid #C4E2D3;font-size:.76rem;
  letter-spacing:.14em;text-transform:uppercase;font-weight:500;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
  border-radius:2px;transition:all .25s;text-decoration:none;
}
.pq-btn-wa:hover{
  background:#F2FAF6;border-color:#1F7A4A;
}
.pq-link-full{
  text-align:center;font-size:.72rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--pq-muted);text-decoration:underline;
  text-underline-offset:4px;cursor:pointer;background:none;border:none;
  padding:6px 0;margin-top:4px;transition:color .2s;
}
.pq-link-full:hover{
  color:var(--pq-burgundy);
}

/* Enquiry Form View */
.pq-form-wrap{
  padding:36px;display:flex;flex-direction:column;height:100%;
}
.pq-form-header{
  margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid var(--pq-line);
}
.pq-form-back{
  display:inline-flex;align-items:center;gap:6px;font-size:.72rem;
  letter-spacing:.12em;text-transform:uppercase;color:var(--pq-muted);
  cursor:pointer;background:none;border:none;padding:0;margin-bottom:12px;
}
.pq-form-back:hover{
  color:var(--pq-burgundy);
}
.pq-field-row{
  display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;
}
.pq-field{
  margin-bottom:14px;
}
.pq-field label{
  display:block;font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--pq-muted);margin-bottom:6px;font-weight:500;
}
.pq-field input,.pq-field textarea,.pq-field select{
  width:100%;border:1px solid var(--pq-line);padding:10px 12px;
  font-family:var(--pq-sans);font-size:.88rem;color:var(--pq-ink);
  background:var(--pq-white);border-radius:2px;outline:none;
  transition:border-color .25s;
}
.pq-field input:focus,.pq-field textarea:focus,.pq-field select:focus{
  border-color:var(--pq-burgundy);
}
.pq-field textarea{
  resize:vertical;min-height:70px;
}
.pq-form-error{
  color:var(--pq-burgundy);
  background:rgba(123,30,58,0.06);
  border:1px solid rgba(123,30,58,0.2);
  padding:10px 14px;
  font-size:0.78rem;
  letter-spacing:0.04em;
  margin-bottom:14px;
  border-radius:2px;
}

/* Success State */
.pq-success{
  padding:50px 36px;text-align:center;display:flex;
  flex-direction:column;align-items:center;justify-content:center;
}
.pq-success__spark{
  color:var(--pq-gold);font-size:2rem;margin-bottom:14px;
}
.pq-success h3{
  font-family:var(--pq-serif);font-size:1.8rem;margin:0 0 10px;font-weight:400;
}
.pq-success p{
  color:var(--pq-muted);font-size:.9rem;line-height:1.6;max-width:44ch;margin:0 0 28px;
}

@media (max-width:680px){
  .pq-backdrop{padding:10px}
  .pq-panel{max-height:94vh;border-radius:6px}
  .pq-grid{grid-template-columns:1fr}
  .pq-media-col{padding:18px 18px 12px;border-right:none;border-bottom:1px solid var(--pq-line)}
  .pq-img-wrap{aspect-ratio:1/1;max-height:240px}
  .pq-info-col{padding:20px 18px}
  .pq-field-row{grid-template-columns:1fr;gap:0}
  .pq-form-wrap{padding:20px 18px}
  .pq-field input,.pq-field textarea,.pq-field select{font-size:16px}
}
`;

const INR = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function ProductQuickViewModal({ product, isOpen, onClose }) {
  const [activeImg, setActiveImg] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("18K Yellow Gold");
  const [selectedSize, setSelectedSize] = useState("Size 12");
  const [view, setView] = useState("details"); // 'details' | 'enquire' | 'success'
  const [submitting, setSubmitting] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNote, setClientNote] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setActiveImg(product.img || product.image || "");
      setSelectedMetal(product.metal || "18K Yellow Gold");
      setSelectedSize(product.size || "Size 12");
      setView("details");
      setClientName("");
      setClientPhone("");
      setClientEmail("");
      setClientNote("");
      setFormError("");
    }
  }, [product]);

  // Lock body scroll + escape key
  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = origOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const images = [
    product.img || product.image,
    product.hover,
  ].filter(Boolean);

  // Pre-filled WhatsApp enquiry link
  const waPhone = import.meta.env.VITE_WHATSAPP_NUMBER || "919120530531";
  const waText = encodeURIComponent(
    `Hello Carats by Grace, I would like to enquire about viewing "${product.name}" (${selectedMetal}, ${product.spec || ""}). Could you please share more details?`
  );
  const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

  const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError("Please provide your name and contact phone number.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setView("success");
    }, 600);
  };

  const handleNavigateFull = () => {
    onClose?.();
    const id = product.id || product.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${id}`);
  };

  return (
    <>
      <style>{MODAL_CSS}</style>

      <div
        className={`pq-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pq-title"
      >
        <div className="pq-panel" onClick={(e) => e.stopPropagation()}>
          <button
            className="pq-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="pq-scroll">
            {view === "details" && (
              <div className="pq-grid">
                {/* Left Media */}
                <div className="pq-media-col">
                  <div>
                    <div className="pq-img-wrap">
                      <span className="pq-badge">18K Certified Fine Jewellery</span>
                      <img
                        src={activeImg || product.img || product.image}
                        alt={product.name}
                      />
                    </div>
                    {images.length > 1 && (
                      <div className="pq-thumbs">
                        {images.map((src, i) => (
                          <button
                            key={i}
                            className={`pq-thumb-btn ${activeImg === src ? "is-active" : ""}`}
                            onClick={() => setActiveImg(src)}
                            type="button"
                          >
                            <img src={src} alt="" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pq-trust-list">
                    <div className="pq-trust-item">
                      <span>✦</span> Certified VVS-EF Diamond & BIS Hallmarked
                    </div>
                    <div className="pq-trust-item">
                      <span>✦</span> Private Salon & Virtual Atelier Viewing Available
                    </div>
                    <div className="pq-trust-item">
                      <span>✦</span> Bespoke Carat & Custom Sizing Consultation
                    </div>
                  </div>
                </div>

                {/* Right Info */}
                <div className="pq-info-col">
                  <span className="pq-eyebrow">
                    Carats by Grace · {product.cat || "Atelier"}
                  </span>
                  <h2 id="pq-title" className="pq-title">
                    {product.name}
                  </h2>
                  <p className="pq-spec">{product.spec || "Bespoke Fine Jewellery Craft"}</p>

                  <div className="pq-price-row">
                    <span className="pq-price-note">
                      Atelier Piece · Available for Private Viewing & Bespoke Consultation
                    </span>
                  </div>

                  {/* Metal Options */}
                  <div className="pq-option-block">
                    <div className="pq-opt-label">
                      <span>Precious Metal</span>
                      <span>{selectedMetal}</span>
                    </div>
                    <div className="pq-chips">
                      {["18K Yellow Gold", "18K Rose Gold", "18K White Gold", "950 Platinum"].map(
                        (m) => (
                          <button
                            key={m}
                            type="button"
                            className={`pq-chip ${selectedMetal === m ? "is-active" : ""}`}
                            onClick={() => setSelectedMetal(m)}
                          >
                            {m}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Size Option (if ring/bracelet) */}
                  <div className="pq-option-block">
                    <div className="pq-opt-label">
                      <span>Size & Custom Fit</span>
                      <span>{selectedSize}</span>
                    </div>
                    <div className="pq-chips">
                      {["Size 10", "Size 12", "Size 14", "Size 16", "Custom Sizing"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`pq-chip ${selectedSize === s ? "is-active" : ""}`}
                          onClick={() => setSelectedSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="pq-desc">
                    Made quietly by master artisans. Each piece is set with meticulously
                    inspected diamonds and individually stamped with hallmark certification.
                    Bespoke customization and private viewing available on request.
                  </p>

                  {/* Actions: Replaced Buy Now with Enquire Now */}
                  <div className="pq-actions">
                    <button
                      className="pq-btn-enquire"
                      type="button"
                      onClick={() => setView("enquire")}
                    >
                      Enquire Now ✦
                    </button>

                    <a
                      className="pq-btn-wa"
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>WhatsApp Concierge</span>
                    </a>

                    <button
                      className="pq-link-full"
                      type="button"
                      onClick={handleNavigateFull}
                    >
                      View Complete Product Details →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View: Enquiry Form */}
            {view === "enquire" && (
              <div className="pq-form-wrap">
                <button
                  className="pq-form-back"
                  type="button"
                  onClick={() => setView("details")}
                >
                  ← Back to product details
                </button>

                <div className="pq-form-header">
                  <span className="pq-eyebrow">Direct Atelier Enquiry</span>
                  <h3 style={{ fontFamily: "var(--pq-serif)", fontSize: "1.6rem", margin: "4px 0 6px" }}>
                    Enquire About {product.name}
                  </h3>
                  <p style={{ color: "var(--pq-muted)", fontSize: ".84rem", margin: 0 }}>
                    Selected metal: <strong>{selectedMetal}</strong> · {selectedSize}
                  </p>
                </div>

                <form onSubmit={handleSubmitEnquiry}>
                  <div className="pq-field-row">
                    <div className="pq-field">
                      <label htmlFor="pq-name">Full Name *</label>
                      <input
                        id="pq-name"
                        type="text"
                        required
                        placeholder="e.g. Grace Mehta"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                    <div className="pq-field">
                      <label htmlFor="pq-phone">Phone / WhatsApp *</label>
                      <input
                        id="pq-phone"
                        type="tel"
                        required
                        placeholder="+91 91205 00000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pq-field">
                    <label htmlFor="pq-email">Email Address (Optional)</label>
                    <input
                      id="pq-email"
                      type="email"
                      placeholder="you@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>

                  <div className="pq-field">
                    <label htmlFor="pq-note">Customization Notes or Timeline</label>
                    <textarea
                      id="pq-note"
                      placeholder="Special ring size, bespoke diamond clarity request, or required date…"
                      value={clientNote}
                      onChange={(e) => setClientNote(e.target.value)}
                    />
                  </div>

                  {formError && (
                    <div className="pq-form-error" role="alert">
                      {formError}
                    </div>
                  )}

                  <div style={{ marginTop: 14 }}>
                    <button
                      className="pq-btn-enquire"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting ? "Sending Enquiry…" : "Submit Enquiry ✦"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* View: Success Confirmation */}
            {view === "success" && (
              <div className="pq-success">
                <div className="pq-success__spark">✦ ✦ ✦</div>
                <h3>Enquiry Received</h3>
                <p>
                  Thank you, <strong>{clientName}</strong>. Our private jewellery
                  concierge has received your enquiry for <strong>{product.name}</strong>.
                  We will contact you via WhatsApp / phone shortly with certified diamond
                  details, video certificates, and custom options.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                  <a
                    className="pq-btn-wa"
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ minWidth: 220 }}
                  >
                    Chat on WhatsApp Now
                  </a>
                  <button
                    className="pq-btn-enquire"
                    type="button"
                    onClick={onClose}
                    style={{ minWidth: 160 }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

