// src/pages/TermsPage.jsx
// Carats by Grace — Terms & Conditions
// Official Brand & Concierge Agreement for Atelier and WhatsApp Online Orders

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileText,
  Scale,
  Award,
  Truck,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  MapPin,
  Lock,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  SHOWROOM_ADDRESS,
  SHOWROOM_PHONE,
  SHOWROOM_HOURS,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

export default function TermsPage() {
  useDocumentTitle('Terms & Conditions · Carats by Grace');

  const directWhatsAppUrl = buildWhatsAppUrl({
    type: 'general',
    customMessage: 'Hello Carats by Grace! I have a question regarding your Terms & Conditions.',
  });

  return (
    <div className="cg-terms-page">
      <style>{`
        .cg-terms-page {
          background: #FAF6F1;
          color: #17120F;
          font-family: var(--sans, 'Jost', sans-serif);
          padding-bottom: 80px;
        }
        .cg-terms-wrap {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }
        .cg-terms-hero {
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F1 100%);
          border-bottom: 1px solid var(--line, #E9E1D8);
          padding: clamp(48px, 6vw, 84px) 0 clamp(36px, 4vw, 56px);
          text-align: center;
        }
        .cg-terms-eyebrow {
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
        .cg-terms-title {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(2.2rem, 4.4vw, 3.8rem);
          font-weight: 400;
          line-height: 1.1;
          margin: 0 0 16px;
          color: #17120F;
        }
        .cg-terms-lede {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          line-height: 1.7;
          color: var(--muted, #7A6F70);
          max-width: 68ch;
          margin: 0 auto;
        }

        /* Terms Content Container */
        .cg-terms-body {
          background: #FFFFFF;
          border: 1px solid var(--line, #E9E1D8);
          border-radius: 4px;
          padding: clamp(28px, 5vw, 56px);
          margin-top: 48px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .cg-terms-section {
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--line, #E9E1D8);
        }
        .cg-terms-section:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .cg-terms-section-title {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 1.55rem;
          color: var(--burgundy, #5D0A24);
          margin: 0 0 14px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cg-terms-section p {
          font-size: 0.94rem;
          line-height: 1.75;
          color: #4A3E3D;
          margin: 0 0 16px;
        }
        .cg-terms-section p:last-child {
          margin-bottom: 0;
        }
        .cg-terms-list {
          list-style: none;
          padding: 0;
          margin: 14px 0 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cg-terms-list li {
          position: relative;
          padding-left: 24px;
          font-size: 0.92rem;
          line-height: 1.65;
          color: #4A3E3D;
        }
        .cg-terms-list li::before {
          content: '◆';
          position: absolute;
          left: 0;
          color: var(--gold, #C6A15B);
          font-size: 0.7rem;
          top: 3px;
        }

        .cg-callout-box {
          background: #FAF6F1;
          border-left: 3px solid var(--gold, #C6A15B);
          padding: 18px 22px;
          border-radius: 0 4px 4px 0;
          margin: 20px 0;
          font-size: 0.92rem;
          line-height: 1.65;
          color: #382D2C;
        }

        .cg-terms-contact-card {
          background: linear-gradient(135deg, #1C030B 0%, #300512 100%);
          color: #FAF6F1;
          border-radius: 4px;
          padding: clamp(28px, 4vw, 40px);
          margin-top: 48px;
        }
        .cg-terms-contact-card h3 {
          font-family: var(--serif, 'Cormorant Garamond', Georgia, serif);
          font-size: 1.8rem;
          margin: 0 0 12px;
          color: #FAF6F1;
        }
        .cg-terms-contact-card p {
          font-size: 0.92rem;
          color: rgba(250, 246, 241, 0.8);
          line-height: 1.65;
          margin-bottom: 20px;
        }
      `}</style>

      {/* Hero Header */}
      <section className="cg-terms-hero">
        <div className="cg-terms-wrap">
          <span className="cg-terms-eyebrow">
            <Scale size={15} /> Atelier Transparency &amp; Governance
          </span>
          <h1 className="cg-terms-title">
            Terms &amp; Conditions
          </h1>
          <p className="cg-terms-lede">
            Welcome to Carats by Grace. These terms and conditions govern your use of our digital showcase,
            private salon viewings in Mahanagar, Lucknow, and all jewellery acquisitions conducted through
            our official WhatsApp Business Concierge.
          </p>
        </div>
      </section>

      <div className="cg-terms-wrap">
        <div className="cg-terms-body">
          {/* Section 1 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              1. Nature of Service &amp; Direct WhatsApp Ordering Model
            </h2>
            <p>
              Carats by Grace operates as an elite fine jewellery atelier. To preserve the exclusivity, personal attention,
              and tailor-made craftsmanship that high jewellery demands, <strong>we do not operate an automated e-commerce
                shopping cart or public online checkout</strong>.
            </p>
            <p>
              Our website serves as a digital catalogue and editorial showcase. All online consultations, inquiries,
              and sales transactions are fulfilled exclusively through our verified <strong>WhatsApp Business Concierge (+91 91205 30531)</strong>
              or through private physical viewings at our salon in Mahanagar, Lucknow, Uttar Pradesh.
            </p>
          </div>

          {/* Section 2 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              2. Quotations, Pricing &amp; Market Fluctuations
            </h2>
            <p>
              Fine jewellery pricing reflects the prevailing market rates of precious metals (18K and 22K BIS-hallmarked gold)
              and certified lab-grown diamonds.
            </p>
            <ul className="cg-terms-list">
              <li><strong>Validity of Quotation:</strong> Any quotation provided via WhatsApp or in person is valid for <strong>24 to 48 hours</strong> from issuance due to real-time bullion and gem market adjustments.</li>
              <li><strong>Statutory GST:</strong> All final transactions are subject to statutory Goods and Services Tax (GST) under Indian tax laws. Official GST tax invoices are generated for every client purchase.</li>
              <li><strong>Payment Modes:</strong> We accept direct electronic bank transfers (RTGS, NEFT, IMPS), verified UPI, and showroom-approved credit/debit facilities up to statutory limits. We do not accept unverified third-party transfers.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              3. Diamond Certification &amp; Gold Hallmarking Guarantee
            </h2>
            <p>
              Every diamond and precious metal creation leaves our atelier with authentic certification of quality and purity:
            </p>
            <ul className="cg-terms-list">
              <li><strong>IGI Certification:</strong> Independent gemological certificates from the International Gemological Institute (IGI) accompany every centre diamond creation, certifying Cut, Colour, Clarity (VVS), and Carat weight.</li>
              <li><strong>Unique Laser Inscription:</strong> Each certified diamond carries a microscopic laser inscription on its girdle matching its official IGI laboratory report.</li>
              <li><strong>BIS 750 Hallmarking:</strong> Gold jewellery is crafted with Bureau of Indian Standards (BIS) hallmarking, certifying verified purity.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              4. Pan-India Delivery &amp; Transit Insurance
            </h2>
            <p>
              We provide secure, fully insured doorstep delivery across India:
            </p>
            <div className="cg-callout-box">
              <strong>Insured Transit Protocol:</strong> Every delivery is transported through specialized high-value logistics partners in sealed, tamper-evident packaging. In the rare event of damage or transit loss prior to delivery handover, Carats by Grace assumes full replacement responsibility.
            </div>
            <ul className="cg-terms-list">
              <li>A one-time password (OTP) or government ID verification of the named recipient is required at the time of doorstep handover.</li>
              <li>Clients are advised to inspect the exterior tamper-evident seal before accepting the package. In case of any evident breach, refuse delivery immediately and contact our concierge.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              5. Lifetime Exchange &amp; Buy Back Policy
            </h2>
            <p>
              All purchases made through Carats by Grace are eligible for our comprehensive Lifetime Exchange and Buy Back policies,
              structured transparently according to whether the transaction occurred in our Mahanagar Salon or via our WhatsApp Concierge:
            </p>
            <ul className="cg-terms-list">
              <li><strong>In-Store Mahanagar Salon Exchange:</strong> 100% full prevailing market value of diamond and gold, with GST deduction only (making charges are not deducted for in-store salon upgrades).</li>
              <li><strong>In-Store Salon Buy Back:</strong> 85% of prevailing diamond rate, 100% current gold value, with original making charges and GST deducted.</li>
              <li><strong>WhatsApp Online Orders:</strong> Follows our online policy with 100% metal value, 80% diamond buyback (&lt; ₹3L) / 70% (&gt; ₹3L &amp; coloured diamonds), with original making and GST deducted.</li>
              <li><strong>Transit Container for Online Returns:</strong> A fee of ₹2,000 applies for door-to-door insured container pickup from any pin code in India.</li>
            </ul>
            <p>
              For comprehensive details and clause breakdown, please review our dedicated{' '}
              <Link to="/purchase-policy" style={{ color: 'var(--burgundy)', fontWeight: 600, textDecoration: 'underline' }}>
                Lifetime Exchange &amp; Buy Back Policy
              </Link>.
            </p>
          </div>

          {/* Section 6 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              6. Bespoke, Customised &amp; Exclusive One-of-One Pieces
            </h2>
            <ul className="cg-terms-list">
              <li><strong>Exclusive One-of-One Creations:</strong> Pieces designated as &quot;One of One&quot; or part of our Empress and High Jewellery collections are unique works of art. Once acquired, they will never be reproduced or re-crafted by Carats by Grace.</li>
              <li><strong>Bespoke Custom Orders:</strong> Customised jewellery made to specific client finger sizes, custom diamond cuts, or bespoke engravings requires non-refundable design and raw material advance deposits. Because bespoke creations are tailored around your individual specifications, they are exempt from return or standard buyback.</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              7. Intellectual Property &amp; Brand Rights
            </h2>
            <p>
              All visual assets, photographic works, 3D renderings, jewellery silhouettes, bespoke motifs, text,
              and the Carats by Grace logo mark are the exclusive intellectual property of Carats by Grace.
              Unauthorized reproduction, copying, distribution, or commercial exploitation is strictly prohibited under Indian and international copyright statutes.
            </p>
          </div>

          {/* Section 8 */}
          <div className="cg-terms-section">
            <h2 className="cg-terms-section-title">
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms and conditions, and any disputes or claims arising out of transactions with Carats by Grace,
              shall be governed by and construed in accordance with the laws of India. Any legal proceedings or dispute
              resolution shall be subject to the exclusive jurisdiction of the competent courts in <strong>Lucknow, Uttar Pradesh, India</strong>.
            </p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="cg-terms-contact-card">
          <h3>Need Clarification on Our Terms?</h3>
          <p>
            We take pride in complete transparency. For any inquiries regarding our policies, invoices, or consultation terms,
            our founding team is delighted to assist you directly.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cg-btn cg-btn-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <MessageCircle size={16} />
              Connect on WhatsApp
            </a>
            <Link
              to="/purchase-policy"
              className="cg-btn cg-btn-ghost-light"
            >
              View Purchase Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
