// src/pages/PurchasePolicyPage.jsx
// Carats by Grace — Lifetime Exchange & Buy Back Policy
// Comprehensive Offline (Mahanagar Salon) and Online (WhatsApp Business) Policies

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Gem,
  RefreshCw,
  CircleDollarSign,
  Truck,
  FileCheck,
  AlertCircle,
  MessageCircle,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  SHOWROOM_ADDRESS,
  SHOWROOM_PHONE,
  SHOWROOM_HOURS,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

export default function PurchasePolicyPage() {
  useDocumentTitle('Lifetime Exchange & Buy Back Policy · Carats by Grace');

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'offline' | 'online'

  const directWhatsAppUrl = buildWhatsAppUrl({
    type: 'general',
    customMessage: 'Hello Carats by Grace! I would like to enquire about your Lifetime Exchange and Buy Back policy.',
  });

  return (
    <div className="cg-policy-page">
      <style>{`
        .cg-policy-page {
          background: #FAF6F1;
          color: #17120F;
          font-family: var(--sans, 'Jost', sans-serif);
          padding-bottom: 80px;
        }
        .cg-policy-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }
        .cg-policy-hero {
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F1 100%);
          border-bottom: 1px solid var(--line, #E9E1D8);
          padding: clamp(48px, 6vw, 84px) 0 clamp(36px, 4vw, 56px);
          text-align: center;
        }
        .cg-policy-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.74rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold, #C6A15B);
          font-weight: 600;
          margin-bottom: 14px;
        }
        .cg-policy-title {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(2.2rem, 4.4vw, 3.8rem);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 16px;
          color: #17120F;
        }
        .cg-policy-lede {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          line-height: 1.7;
          color: var(--muted, #7A6F70);
          max-width: 68ch;
          margin: 0 auto 28px;
        }

        /* Filter Switcher */
        .cg-policy-tabs {
          display: inline-flex;
          background: #FFFFFF;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 40px;
          padding: 4px;
          gap: 4px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          margin-top: 10px;
        }
        .cg-policy-tab-btn {
          background: transparent;
          border: none;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          color: #7A6F70;
          transition: all 0.25s ease;
        }
        .cg-policy-tab-btn.active {
          background: var(--burgundy, #5D0A24);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(93, 10, 36, 0.2);
        }

        /* Highlight Grid */
        .cg-policy-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin: 48px 0;
        }
        .cg-channel-card {
          background: #FFFFFF;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 4px;
          padding: clamp(28px, 4vw, 36px);
          position: relative;
          box-shadow: 0 8px 24px rgba(23, 18, 15, 0.03);
          transition: border-color 0.3s ease;
        }
        .cg-channel-card:hover {
          border-color: var(--gold, #C6A15B);
        }
        .cg-channel-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 6px 14px;
          background: rgba(198, 161, 91, 0.12);
          color: var(--burgundy, #5D0A24);
          border-radius: 2px;
          margin-bottom: 18px;
        }
        .cg-channel-title {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 1.8rem;
          margin: 0 0 12px;
          color: #17120F;
        }
        .cg-channel-desc {
          font-size: 0.92rem;
          color: #7A6F70;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .cg-policy-detail-block {
          background: #FAF6F1;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 2px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .cg-policy-detail-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .cg-policy-detail-header h4 {
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0;
          color: var(--burgundy, #5D0A24);
        }
        .cg-policy-detail-block p {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #4A3E3D;
          margin: 0;
        }

        /* Comparison Table */
        .cg-table-section {
          background: #FFFFFF;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 4px;
          padding: clamp(24px, 4vw, 40px);
          margin: 48px 0;
          overflow-x: auto;
        }
        .cg-comp-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 640px;
          text-align: left;
        }
        .cg-comp-table th {
          background: #FAF6F1;
          color: var(--ink, #17120F);
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 16px 20px;
          border-bottom: 2px solid var(--gold, #C6A15B);
        }
        .cg-comp-table td {
          padding: 16px 20px;
          font-size: 0.9rem;
          border-bottom: 1px solid var(--line, #E9E1D8);
          color: #4A3E3D;
          vertical-align: top;
          line-height: 1.5;
        }
        .cg-comp-table tr:hover td {
          background: #FDFAF7;
        }
        .cg-badge-val {
          display: inline-block;
          font-weight: 700;
          color: var(--burgundy, #5D0A24);
        }

        /* Conditions Section */
        .cg-eligibility-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin: 36px 0;
        }
        .cg-eligibility-box {
          background: #FFFFFF;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 4px;
          padding: 28px;
        }
        .cg-eligibility-box h3 {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 1.4rem;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cg-eligibility-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cg-eligibility-item {
          display: flex;
          gap: 12px;
          font-size: 0.9rem;
          line-height: 1.55;
          color: #4A3E3D;
        }

        /* Safe Transport Section */
        .cg-transport-banner {
          background: linear-gradient(135deg, #24040E 0%, #420719 100%);
          color: #FAF6F1;
          border-radius: 4px;
          padding: clamp(32px, 5vw, 48px);
          margin: 48px 0;
        }
        .cg-transport-banner h3 {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          margin: 0 0 12px;
          color: #FAF6F1;
        }
        .cg-transport-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin-top: 28px;
        }
        .cg-transport-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(198, 161, 91, 0.3);
          border-radius: 2px;
          padding: 20px;
        }
        .cg-transport-card h4 {
          font-size: 0.8rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold-light, #E0C88F);
          margin: 0 0 8px;
        }
        .cg-transport-card p {
          font-size: 0.86rem;
          line-height: 1.6;
          color: rgba(250, 246, 241, 0.8);
          margin: 0;
        }

        /* FAQ / Questions */
        .cg-policy-faq {
          background: #FFFFFF;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 4px;
          padding: clamp(24px, 4vw, 40px);
          margin: 48px 0;
        }
        .cg-faq-item {
          border-bottom: 1px solid var(--line, #E9E1D8);
          padding: 20px 0;
        }
        .cg-faq-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .cg-faq-q {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 1.25rem;
          color: #17120F;
          margin: 0 0 8px;
        }
        .cg-faq-a {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #7A6F70;
          margin: 0;
        }

        @media (max-width: 860px) {
          .cg-policy-cards-grid,
          .cg-eligibility-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Header */}
      <section className="cg-policy-hero">
        <div className="cg-policy-wrap">
          <span className="cg-policy-eyebrow">
            <Award size={15} /> Atelier Transparency & Assurance
          </span>
          <h1 className="cg-policy-title">
            Lifetime Exchange & Buy Back Policy
          </h1>
          <p className="cg-policy-lede">
            Every creation from Carats by Grace is crafted with verified IGI certified lab-grown diamonds
            and BIS-hallmarked gold. As a proud owner of Carats by Grace, you enjoy complete peace of mind,
            backed by transparent exchange and buyback options.
          </p>

          {/* Filter switcher */}
          <div className="cg-policy-tabs">
            <button
              className={`cg-policy-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Policies
            </button>
            <button
              className={`cg-policy-tab-btn ${activeTab === 'offline' ? 'active' : ''}`}
              onClick={() => setActiveTab('offline')}
            >
              In-Store (Mahanagar Salon)
            </button>
            <button
              className={`cg-policy-tab-btn ${activeTab === 'online' ? 'active' : ''}`}
              onClick={() => setActiveTab('online')}
            >
              Online (WhatsApp Concierge)
            </button>
          </div>
        </div>
      </section>

      <div className="cg-policy-wrap">
        {/* Dual Channel Highlight */}
        <div className="cg-policy-cards-grid">
          {/* Card 1: In-Store Offline Salon */}
          {(activeTab === 'all' || activeTab === 'offline') && (
            <div className="cg-channel-card">
              <span className="cg-channel-badge">Offline Experience · Mahanagar Salon</span>
              <h2 className="cg-channel-title">In-Store Salon Policy</h2>
              <p className="cg-channel-desc">
                For jewellery purchased or physically exchanged directly at our private boutique salon in
                Mahanagar, Lucknow. Experience full atelier value and on-the-spot personal appraisal.
              </p>

              <div className="cg-policy-detail-block">
                <div className="cg-policy-detail-header">
                  <RefreshCw size={18} color="var(--burgundy)" />
                  <h4>In-Store Lifetime Exchange & Upgrade</h4>
                </div>
                <p>
                  <strong>Full 100% Exchange Value:</strong> Receive the full prevailing market value of your diamond
                  and precious metal, with <strong>GST deduction only</strong>. Making charges are not deducted
                  for in-store salon upgrades. You may select any creation of equal or higher value, or receive
                  an atelier credit note valid for 3 months.
                </p>
              </div>

              <div className="cg-policy-detail-block">
                <div className="cg-policy-detail-header">
                  <CircleDollarSign size={18} color="var(--burgundy)" />
                  <h4>In-Store Best Value Buy Back</h4>
                </div>
                <p>
                  <strong>85% on Diamonds:</strong> Calculated on the prevailing market rate of diamonds.<br />
                  <strong>100% on Gold/Metal:</strong> Current prevailing gold market value is honored.<br />
                  <strong>Deductions:</strong> Original making charges and GST are deducted. Refund is disbursed
                  via RTGS directly to the invoice beneficiary within 8–10 business days.
                </p>
              </div>

              <div style={{ marginTop: 24, fontSize: '0.84rem', color: '#7A6F70', display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={15} color="var(--gold)" />
                <span>Private viewings at: {SHOWROOM_ADDRESS}</span>
              </div>
            </div>
          )}

          {/* Card 2: Online WhatsApp Business */}
          {(activeTab === 'all' || activeTab === 'online') && (
            <div className="cg-channel-card">
              <span className="cg-channel-badge">Online Concierge · WhatsApp Business</span>
              <h2 className="cg-channel-title">WhatsApp Online Policy</h2>
              <p className="cg-channel-desc">
                Carats by Grace operates entirely through direct WhatsApp ordering (no third-party checkout cart).
                All acquisitions and exchanges fulfilled via our official WhatsApp Concierge (+91 91205 30531)
                follow these structured standards.
              </p>

              <div className="cg-policy-detail-block">
                <div className="cg-policy-detail-header">
                  <RefreshCw size={18} color="var(--burgundy)" />
                  <h4>Online Lifetime Exchange & Upgrade</h4>
                </div>
                <p>
                  <strong>Prevailing Market Valuation:</strong> Full value of the prevailing price of diamond and
                  precious metal, less the original making charges and the GST already paid. Pick from our live
                  digital catalogue or receive an atelier credit note valid for 3 months.
                </p>
              </div>

              <div className="cg-policy-detail-block">
                <div className="cg-policy-detail-header">
                  <CircleDollarSign size={18} color="var(--burgundy)" />
                  <h4>Online Best Value Buy Back</h4>
                </div>
                <p>
                  <strong>100% Gold Metal Value:</strong> Based on the prevailing market price.<br />
                  <strong>80% on Diamonds:</strong> For jewellery pieces with invoice value &lt; ₹3,00,000.<br />
                  <strong>70% on Diamonds:</strong> For jewellery pieces with invoice value &gt; ₹3,00,000.<br />
                  <strong>70% on Coloured Diamonds:</strong> Based on prevailing diamond benchmarks.<br />
                  <strong>Solitaires 3.00 Carats &amp; Up:</strong> Best prevailing market valuation confirmed by management.<br />
                  <strong>Deductions:</strong> Original making charges and GST are deducted. Payout via RTGS within 8–10 business days.
                </p>
              </div>

              <div style={{ marginTop: 24, fontSize: '0.84rem', color: '#7A6F70', display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageCircle size={15} color="var(--gold)" />
                <span>Dedicated concierge support via official WhatsApp: +91 91205 30531</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Comparison Table */}
        <div className="cg-table-section">
          <div style={{ marginBottom: 20 }}>
            <span className="cg-policy-eyebrow">At A Glance</span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', margin: '4px 0 8px' }}>
              Policy Comparison Table
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#7A6F70', margin: 0 }}>
              Summary of exchange and buy back terms across in-store salon visits and official WhatsApp online purchases.
            </p>
          </div>

          <table className="cg-comp-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Feature</th>
                <th style={{ width: '36%' }}>In-Store Salon (Mahanagar, Lucknow)</th>
                <th style={{ width: '36%' }}>Online (WhatsApp Business Concierge)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Exchange: Diamond Rate</strong></td>
                <td><span className="cg-badge-val">100% Full Prevailing Rate</span> (GST deduction only)</td>
                <td><span className="cg-badge-val">100% Prevailing Rate</span> (Less Making Charges &amp; GST)</td>
              </tr>
              <tr>
                <td><strong>Exchange: Gold / Metal Rate</strong></td>
                <td><span className="cg-badge-val">100% Full Prevailing Market Value</span></td>
                <td><span className="cg-badge-val">100% Full Prevailing Market Value</span></td>
              </tr>
              <tr>
                <td><strong>Buy Back: Diamond Rate</strong></td>
                <td><span className="cg-badge-val">85% of Prevailing Rate</span></td>
                <td>
                  <span className="cg-badge-val">80%</span> (Invoice &lt; ₹3,00,000)<br />
                  <span className="cg-badge-val">70%</span> (Invoice &gt; ₹3,00,000 &amp; Coloured Diamonds)
                </td>
              </tr>
              <tr>
                <td><strong>Buy Back: Gold / Metal Rate</strong></td>
                <td><span className="cg-badge-val">100% Current Prevailing Value</span></td>
                <td><span className="cg-badge-val">100% Current Prevailing Value</span></td>
              </tr>
              <tr>
                <td><strong>Solitaires (3.00 Carats &amp; Up)</strong></td>
                <td>Best customized market rate confirmed by management</td>
                <td>Best customized market rate confirmed by management</td>
              </tr>
              <tr>
                <td><strong>Buy Back Deductions</strong></td>
                <td>Original Making Charges &amp; GST</td>
                <td>Original Making Charges &amp; GST</td>
              </tr>
              <tr>
                <td><strong>Non-Return of Certificate</strong></td>
                <td>₹1,000 (Jewellery Cert) / ₹5,000 (Diamond Cert)</td>
                <td>₹1,000 (Jewellery Cert) / ₹5,000 (Diamond Cert)</td>
              </tr>
              <tr>
                <td><strong>Payment / Settlement Mode</strong></td>
                <td>RTGS / Bank Transfer within 8–10 business days</td>
                <td>RTGS / Bank Transfer within 8–10 business days</td>
              </tr>
              <tr>
                <td><strong>Logistics &amp; Pickup Fee</strong></td>
                <td>Complimentary direct salon drop-off</td>
                <td>₹2,000 for door-to-door insured transit container</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Safe Transportation Banner */}
        <div className="cg-transport-banner">
          <span style={{ fontSize: '0.74rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
            Safe Transportation Protocol
          </span>
          <h3>Pan-India Insured Pick-Up from Your Doorstep</h3>
          <p style={{ maxWidth: '64ch', fontSize: '0.94rem', lineHeight: 1.65, color: 'rgba(250, 246, 241, 0.85)' }}>
            For customers availing of the online Exchange or Buy Back facility via WhatsApp, Carats by Grace arranges
            safe, fully insured transportation from your registered address to our atelier warehouse.
          </p>

          <div className="cg-transport-grid">
            <div className="cg-transport-card">
              <h4>1. Tamper-Proof Packaging</h4>
              <p>We dispatch a specialized tamper-proof container in advance. You seal your jewellery securely prior to the logistics agent arriving.</p>
            </div>
            <div className="cg-transport-card">
              <h4>2. Fully Insured In-Transit</h4>
              <p>The standard logistics and transit insurance fee is <strong>₹2,000/-</strong> from any serviceable pin-code in India directly to Carats by Grace.</p>
            </div>
            <div className="cg-transport-card">
              <h4>3. Quality Check (QC)</h4>
              <p>Upon receipt, our gemologists inspect the piece, verify certificate inscriptions, and confirm your final appraisal within 24 hours.</p>
            </div>
          </div>
        </div>

        {/* Eligibility & Non-Eligibility */}
        <div className="cg-eligibility-grid">
          <div className="cg-eligibility-box">
            <h3 style={{ color: '#1A5238' }}>
              <CheckCircle2 size={22} color="#1A5238" /> Eligibility Criteria
            </h3>
            <ul className="cg-eligibility-list">
              <li className="cg-eligibility-item">
                <CheckCircle2 size={16} color="#1A5238" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>All authentic jewellery pieces purchased from Carats by Grace (via Mahanagar Salon or official WhatsApp).</span>
              </li>
              <li className="cg-eligibility-item">
                <CheckCircle2 size={16} color="#1A5238" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Accompanied by the original tax invoice issued in the client&apos;s name.</span>
              </li>
              <li className="cg-eligibility-item">
                <CheckCircle2 size={16} color="#1A5238" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Accompanied by the genuine IGI Diamond Report and jewellery certificates.</span>
              </li>
              <li className="cg-eligibility-item">
                <CheckCircle2 size={16} color="#1A5238" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Jewellery in acceptable condition with intact hallmark and laser inscriptions.</span>
              </li>
            </ul>
          </div>

          <div className="cg-eligibility-box">
            <h3 style={{ color: '#8A1818' }}>
              <AlertCircle size={22} color="#8A1818" /> Non-Eligibility Exceptions
            </h3>
            <ul className="cg-eligibility-list">
              <li className="cg-eligibility-item">
                <AlertCircle size={16} color="#8A1818" style={{ flexShrink: 0, marginTop: 4 }} />
                <span><strong>Bespoke &amp; Customised Jewellery:</strong> Personalised creations crafted around individual specifications and custom proportions.</span>
              </li>
              <li className="cg-eligibility-item">
                <AlertCircle size={16} color="#8A1818" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Pieces that have been repaired, resized, or altered by any unauthorized third-party jeweller.</span>
              </li>
              <li className="cg-eligibility-item">
                <AlertCircle size={16} color="#8A1818" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Excessively damaged jewellery beyond acceptable normal wear (subject to QC repair deduction).</span>
              </li>
              <li className="cg-eligibility-item">
                <AlertCircle size={16} color="#8A1818" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Items unaccompanied by the original tax invoice.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step-by-Step Procedure */}
        <div className="cg-policy-faq">
          <span className="cg-policy-eyebrow">Guided Workflow</span>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', margin: '4px 0 20px' }}>
            How to Initiate an Exchange or Buy Back
          </h3>

          <div className="cg-faq-item">
            <h4 className="cg-faq-q">Step 1: Contact our Concierge</h4>
            <p className="cg-faq-a">
              Message us directly on WhatsApp at <strong>+91 91205 30531</strong>.
              Share photos of your piece, invoice copy, and IGI certificate. You can also visit our Mahanagar, Lucknow salon.
            </p>
          </div>

          <div className="cg-faq-item">
            <h4 className="cg-faq-q">Step 2: Valuation Estimate &amp; Logistics Scheduling</h4>
            <p className="cg-faq-a">
              Our gemology team will provide a preliminary estimate based on prevailing diamond and metal rates.
              For online requests, an insured pickup with a sealed tamper-evident container will be scheduled for ₹2,000.
            </p>
          </div>

          <div className="cg-faq-item">
            <h4 className="cg-faq-q">Step 3: Quality Check (QC) Approval</h4>
            <p className="cg-faq-a">
              Upon physical receipt at our salon or warehouse, our gemological laboratory verifies the laser inscription,
              hallmark purity, and physical condition. A final valuation summary is shared with you.
            </p>
          </div>

          <div className="cg-faq-item">
            <h4 className="cg-faq-q">Step 4: Selection or RTGS Settlement</h4>
            <p className="cg-faq-a">
              For exchanges, choose your next piece from our active catalogue or receive an atelier credit note (valid 3 months).
              For buyback, the approved amount is deposited directly via RTGS to the beneficiary account matching the invoice within 8–10 business days.
            </p>
          </div>
        </div>

        {/* Assistance / Action CTA */}
        <div style={{ textAlign: 'center', background: '#FFFFFF', border: '1px solid var(--line)', padding: '40px 24px', borderRadius: 4 }}>
          <span className="cg-policy-eyebrow">Personal Atelier Concierge</span>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', margin: '4px 0 12px' }}>
            Have a Question About Your Piece?
          </h3>
          <p style={{ color: '#7A6F70', maxWidth: 520, margin: '0 auto 24px', fontSize: '0.94rem' }}>
            Our gemologists are available to guide you through any exchange, upgrade, or valuation query.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cg-btn cg-btn-solid"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#133D2A', borderColor: '#133D2A' }}
            >
              <MessageCircle size={16} />
              WhatsApp Concierge
            </a>
            <Link to="/contact" className="cg-btn cg-btn-outline">
              Visit Mahanagar Salon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
