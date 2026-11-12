// src/pages/AccountPage.jsx
// Carats by Grace — Customer Account & Atelier Concierge Portal

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useWishlist } from '../context/WishlistContext';

const ACCOUNT_CSS = `
.ac-wrap { max-width: 1440px; margin: 0 auto; padding-inline: var(--pad-x); }
.ac-hero {
  padding-top: clamp(36px, 5vw, 64px);
  padding-bottom: clamp(24px, 4vw, 40px);
  border-bottom: 1px solid var(--line);
  background: var(--ivory);
}
.ac-hero__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}
.ac-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
}
.ac-title {
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
  margin: 10px 0 8px;
}
.ac-lede {
  color: var(--muted);
  font-size: 0.95rem;
  margin: 0;
  max-width: 48ch;
}
.ac-body {
  padding-block: clamp(36px, 6vw, 72px);
}
.ac-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}
.ac-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--white);
  border: 1px solid var(--line);
  padding: 12px;
  border-radius: 2px;
}
.ac-tab-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink);
  background: transparent;
  border: none;
  border-radius: 1px;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s var(--ease);
}
.ac-tab-btn:hover {
  background: var(--ivory);
  color: var(--burgundy);
}
.ac-tab-btn.is-active {
  background: var(--burgundy);
  color: var(--ivory);
  font-weight: 500;
}
.ac-panel {
  background: var(--white);
  border: 1px solid var(--line);
  padding: clamp(24px, 4vw, 44px);
  border-radius: 2px;
}
.ac-card-list {
  display: grid;
  gap: 20px;
}
.ac-order-card {
  border: 1px solid var(--line);
  padding: 24px;
  background: var(--ivory);
  display: grid;
  gap: 16px;
}
.ac-order-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 12px;
}
.ac-status-badge {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(123, 30, 58, 0.1);
  color: var(--burgundy);
  font-weight: 600;
}
.ac-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 24px;
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  border-radius: 1px;
  transition: all 0.25s var(--ease);
  cursor: pointer;
  text-decoration: none;
}
.ac-btn--solid {
  background: var(--burgundy);
  color: var(--ivory);
  border: 1px solid var(--burgundy);
}
.ac-btn--solid:hover {
  background: var(--wine);
}
.ac-btn--ghost {
  border: 1px solid var(--ink);
  color: var(--ink);
  background: transparent;
}
.ac-btn--ghost:hover {
  background: var(--ink);
  color: var(--ivory);
}
@media (max-width: 860px) {
  .ac-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .ac-tab-nav {
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 6px;
    gap: 6px;
  }
  .ac-tab-nav::-webkit-scrollbar {
    display: none;
  }
  .ac-tab-btn {
    white-space: nowrap;
    padding: 10px 16px;
    flex: none;
  }
  .ac-order-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
@media (max-width: 480px) {
  .ac-panel {
    padding: 18px 14px;
  }
  .ac-order-card {
    padding: 16px 14px;
  }
  .ac-btn {
    width: 100%;
  }
}
`;

export default function AccountPage() {
  useDocumentTitle('My Atelier Account');
  const [activeTab, setActiveTab] = useState('orders');
  const { items: wishlistItems } = useWishlist();

  return (
    <main>
      <style>{ACCOUNT_CSS}</style>

      {/* Account Hero */}
      <section className="ac-hero">
        <div className="ac-wrap">
          <div className="ac-hero__inner">
            <div>
              <span className="ac-eyebrow">Client Atelier Portal</span>
              <h1 className="ac-title">Welcome to your Atelier account</h1>
              <p className="ac-lede">
                Manage your bespoke fine jewellery orders, private viewings, and personal details.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/wishlist" className="ac-btn ac-btn--ghost">
                Saved Wishlist ({wishlistItems.length})
              </Link>
              <Link to="/collections/rings" className="ac-btn ac-btn--solid">
                Explore Jewellery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Account Body */}
      <div className="ac-wrap ac-body">
        <div className="ac-layout">
          {/* Navigation Sidebar */}
          <aside className="ac-nav" role="tablist" aria-label="Account navigation">
            <button
              className={`ac-tab-btn ${activeTab === 'orders' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('orders')}
              role="tab"
              aria-selected={activeTab === 'orders'}
            >
              <span>Orders & Enquiries</span>
              <span>→</span>
            </button>
            <button
              className={`ac-tab-btn ${activeTab === 'consultations' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('consultations')}
              role="tab"
              aria-selected={activeTab === 'consultations'}
            >
              <span>Private Viewings</span>
              <span>→</span>
            </button>
            <button
              className={`ac-tab-btn ${activeTab === 'addresses' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('addresses')}
              role="tab"
              aria-selected={activeTab === 'addresses'}
            >
              <span>Addresses</span>
              <span>→</span>
            </button>
            <button
              className={`ac-tab-btn ${activeTab === 'care' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('care')}
              role="tab"
              aria-selected={activeTab === 'care'}
            >
              <span>Certificates & Care</span>
              <span>→</span>
            </button>
          </aside>

          {/* Tab Content Panel */}
          <div className="ac-panel">
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', marginTop: 0, marginBottom: 8 }}>
                  Recent Orders & Custom Enquiries
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Track your bespoke jewellery crafting progress and insured shipments.
                </p>

                <div className="ac-card-list">
                  <div className="ac-order-card">
                    <div className="ac-order-head">
                      <div>
                        <strong style={{ fontSize: '0.92rem' }}>Order #CG-9842</strong>
                        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', marginLeft: 12 }}>
                          Placed on 10 Nov 2026
                        </span>
                      </div>
                      <span className="ac-status-badge">In Atelier Crafting</span>
                    </div>
                    <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                      <img
                        src="https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=160&q=80"
                        alt="The Aurelia Ring"
                        style={{ width: 68, height: 80, objectFit: 'cover', borderRadius: 2 }}
                      />
                      <div>
                        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', margin: '0 0 4px' }}>
                          The Aurelia Solitaire Ring
                        </h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: '0 0 6px' }}>
                          18K Yellow Gold · 0.42 ct VVS Diamond · Size 12
                        </p>
                        <strong style={{ fontSize: '0.95rem' }}>₹64,000</strong>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                        Insured Pan-India Express Delivery included
                      </span>
                      <a
                        href="https://wa.me/919820123456?text=Hello%20Carats%20by%20Grace%2C%20inquiring%20about%20Order%20%23CG-9842"
                        target="_blank"
                        rel="noreferrer"
                        className="ac-btn ac-btn--ghost"
                        style={{ minHeight: 36, padding: '0 16px', fontSize: '0.7rem' }}
                      >
                        Contact Concierge
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consultations' && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', marginTop: 0, marginBottom: 8 }}>
                  Private Viewings & Consultations
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Schedule a private diamond consultation with our master gemmologist in our atelier or via secure high-definition video call.
                </p>
                <div style={{ padding: '32px', background: 'var(--ivory)', border: '1px solid var(--line)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1rem', fontFamily: 'var(--serif)', margin: '0 0 16px' }}>
                    Experience bespoke gemstone selection tailored to your milestones.
                  </p>
                  <a
                    href="https://wa.me/919820123456?text=Hello%20Carats%20by%20Grace%2C%20I%20would%20like%20to%20book%20a%20private%20atelier%20consultation."
                    target="_blank"
                    rel="noreferrer"
                    className="ac-btn ac-btn--solid"
                  >
                    Book Atelier Consultation ✦
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', marginTop: 0, marginBottom: 8 }}>
                  Saved Delivery Addresses
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 24 }}>
                  Insured shipments are delivered in tamper-evident sealed packaging directly to your registered destination.
                </p>
                <div style={{ padding: '24px', border: '1px solid var(--line)', background: 'var(--ivory)', borderRadius: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <strong>Primary Residential Residence</strong>
                    <span className="ac-status-badge">Default</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>
                    Grace Mehta<br />
                    Apt 1402, Altamount Signature Residences<br />
                    Mumbai, Maharashtra — 400026<br />
                    Phone: +91 98200 12345
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', marginTop: 0, marginBottom: 8 }}>
                  Certificates & Lifetime Atelier Care
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: 20 }}>
                  Every Carats by Grace creation is accompanied by independent gemmological laboratory authentication (GIA/IGI) and BIS Hallmark stamping.
                </p>
                <ul style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.8, paddingLeft: 20, margin: '0 0 24px' }}>
                  <li>Complimentary lifetime ultrasonic cleaning and prong security inspection.</li>
                  <li>Annual complimentary re-polishing and rhodium refreshment for all 18K white gold pieces.</li>
                  <li>Insured door-to-door transit for atelier maintenance services across India.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

