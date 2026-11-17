// src/pages/AboutPage.jsx
// Carats by Grace — About Us Page
// Incorporates all 7 brand chapters with bespoke editorial craftsmanship.

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Gem,
  Compass,
  ArrowRight,
  MessageCircle,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import BrandLogo from '../components/ui/BrandLogo';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  useDocumentTitle('About Us · Beyond The Ordinary');

  const qualityCommitments = [
    {
      title: 'VVS CLARITY DIAMONDS',
      desc: 'Exceptional clarity with very, very slight inclusions.',
      icon: Gem,
    },
    {
      title: 'IGI CERTIFICATION',
      desc: 'Independent diamond grading and quality documentation.',
      icon: Award,
    },
    {
      title: 'EXCEPTIONAL CUT',
      desc: 'Precision-focused cuts designed to maximise brilliance.',
      icon: Gem,
    },
    {
      title: 'CAREFULLY SELECTED DIAMONDS',
      desc: 'Attention to all four Cs – Cut, Colour, Clarity and Carat.',
      icon: ShieldCheck,
    },
  ];

  const bespokeSteps = [
    {
      num: '01',
      title: 'Personal Vision',
      desc: 'Every piece begins with your story, aesthetic preferences, and inspiration.',
    },
    {
      num: '02',
      title: 'Diamond Selection',
      desc: 'Handpicking grown diamonds with optimal cut, carat weight, and VVS clarity.',
    },
    {
      num: '03',
      title: 'Setting & Craft',
      desc: 'Collaborative architectural design, metal choosing, and bespoke silhouette creation.',
    },
    {
      num: '04',
      title: 'Exclusively Yours',
      desc: 'Delivered with certified documentation, crafted for a single owner.',
    },
  ];

  return (
    <main className={styles.page}>
      {/* ============================================================
          1. HERO SECTION – BRAND INTRODUCTION
          ============================================================ */}
      <section className={styles.heroSection} aria-label="Brand Introduction">
        <div className={styles.container}>
          {/* Breadcrumb */}


          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.sectionEyebrow}>
                Carats by Grace · Brand Introduction
              </span>
              <h1 className={styles.heroTitle}>
                BEYOND THE ORDINARY.<br />
                BORN TO BE DISTINCTIVE.
              </h1>
              <div className={styles.heroParagraphs}>
                <p className={styles.bodyLead}>
                  Some brilliance is seen. Some is felt. And some becomes a part
                  of your story.
                </p>
                <p className={styles.bodyText}>
                  At Carats by Grace, we believe diamonds are more than precious
                  stones. They are expressions of individuality, reflections of
                  personal style and symbols of moments worth remembering.
                </p>
                <p className={styles.bodyText}>
                  Rooted in the world of grown diamonds, we bring together
                  innovation, artistry and contemporary aesthetics to redefine the
                  experience of fine jewellery.
                </p>
              </div>

              <div className={styles.heroBeliefCard}>
                <p>
                  "We believe luxury should be personal, design should be
                  intentional, and brilliance should never be ordinary."
                </p>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroVisualFrame}>
                <img
                  src="/assets/model1/m1_8424_final.jpg"
                  alt="Carats by Grace Fine Jewellery Editorial"
                  loading="eager"
                />
              </div>
              <div className={styles.heroFloatingBadge}>
                <span>Fine Jewellery Atelier</span>
                <strong>Redefining Modern Diamond Elegance</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. A DIFFERENT PERSPECTIVE ON DIAMONDS
          ============================================================ */}
      <section
        className={styles.perspectiveSection}
        aria-label="A Different Perspective On Diamonds"
      >
        <div className={styles.container}>
          <div className={styles.perspectiveGrid}>
            <div className={styles.perspectiveVisual}>
              <div className={styles.perspectiveVisualFrame}>
                <img
                  src="/assets/model2/m2_8153.jpg"
                  alt="The Evolution of Grown Diamonds — Science Meets Artistry"
                  loading="lazy"
                />
              </div>
            </div>

            <div className={styles.perspectiveContent}>
              <span className={styles.sectionEyebrow}>
                The Grown Diamond Evolution
              </span>
              <h2 className={styles.sectionTitle}>
                A DIFFERENT PERSPECTIVE ON DIAMONDS.
              </h2>

              <p className={styles.bodyLead}>
                The world of diamonds is evolving, and so is the way we
                experience them.
              </p>

              <p className={styles.bodyText}>
                Grown diamonds represent a remarkable coming together of science
                and artistry. Possessing the same essential physical, chemical and
                optical properties as mined diamonds, they offer a contemporary
                perspective on timeless brilliance.
              </p>

              <p className={styles.bodyText}>
                At Carats by Grace, we embrace this evolution through jewellery
                that celebrates individuality, innovation and modern expression.
              </p>

              <div className={styles.philosophyQuoteBox}>
                <p>
                  Our philosophy is simple: brilliance deserves to be experienced
                  without boundaries, and exceptional design should never be
                  limited by convention.
                </p>
              </div>

              <div className={styles.perspectivePillars}>
                <div className={styles.perspectivePillar}>
                  <div className={styles.perspectivePillarTitle}>
                    Science & Artistry
                  </div>
                  <p className={styles.perspectivePillarDesc}>
                    Identical physical, chemical & optical brilliance to mined
                    stones.
                  </p>
                </div>
                <div className={styles.perspectivePillar}>
                  <div className={styles.perspectivePillarTitle}>
                    Unbounded Design
                  </div>
                  <p className={styles.perspectivePillarDesc}>
                    Liberated from conventional limits to prioritize pure
                    artistic expression.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. OUR DESIGN PHILOSOPHY – EXCLUSIVITY
          ============================================================ */}
      <section
        className={styles.exclusivitySection}
        aria-label="Our Design Philosophy – Exclusivity"
      >
        <div className={styles.container}>
          <div className={styles.exclusivityGrid}>
            <div className={styles.exclusivityLeft}>
              <span
                className={`${styles.sectionEyebrow} ${styles.sectionEyebrowLight}`}
              >
                Our Design Philosophy
              </span>
              <h2
                className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}
              >
                NOT MADE TO FOLLOW. DESIGNED TO STAND APART.
              </h2>

              <p
                className={`${styles.bodyText} ${styles.bodyTextLight}`}
                style={{ fontSize: '1.08rem' }}
              >
                We believe the most beautiful jewellery doesn't follow trends.
                It creates its own identity.
              </p>

              <p className={`${styles.bodyText} ${styles.bodyTextLight}`}>
                Our collections bring together timeless silhouettes,
                contemporary statements and thoughtfully imagined details.
                Every piece reflects our appreciation for distinctive design,
                precision and craftsmanship.
              </p>

              <p className={`${styles.bodyText} ${styles.bodyTextLight}`}>
                And then, there are designs that exist only once.
              </p>

              <p className={`${styles.bodyText} ${styles.bodyTextLight}`}>
                Our exclusive creations follow a philosophy of no repeats. Each
                is designed for a single owner and will never be recreated.
              </p>

              <p
                className={`${styles.bodyText} ${styles.bodyTextLight}`}
                style={{ fontWeight: 500 }}
              >
                Because some things are meant to be yours, and yours alone.
              </p>
            </div>

            <div className={styles.exclusivityRight}>
              <div className={styles.exclusivityHighlightCard}>
                <span className={styles.exclusiveBadge}>
                  The Carats by Grace Signature Promise
                </span>
                <h3 className={styles.statementMain}>
                  ONE DESIGN.<br />
                  ONE OWNER.<br />
                  FOREVER YOURS.
                </h3>
                <p className={styles.statementSub}>
                  A philosophy of no repeats. Singular high jewellery creations
                  crafted once and never reproduced.
                </p>
                <Link
                  to="/collections/high-jewellery"
                  className={styles.btnGold}
                >
                  DISCOVER EXCLUSIVE DESIGNS
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. BESPOKE JEWELLERY – CUSTOMISED FOR YOU
          ============================================================ */}
      <section
        className={styles.bespokeSection}
        aria-label="Bespoke Jewellery – Customised For You"
      >
        <div className={styles.container}>
          <div className={styles.bespokeHeader}>
            <span className={styles.sectionEyebrow}>
              Personalised Atelier Experience
            </span>
            <h2 className={styles.sectionTitle}>YOUR STORY. YOUR DIAMOND.</h2>

            <p className={styles.bodyLead}>
              The most meaningful jewellery begins with a personal vision.
            </p>

            <p className={styles.bodyText}>
              Through our bespoke experience, we invite you to become part of the
              design journey. From selecting your diamond to exploring its shape,
              setting and finer details, every element comes together to
              reflect your individuality.
            </p>

            <p className={styles.bodyText}>
              Whether it is a solitaire, an engagement ring or a statement
              creation, we believe your jewellery should feel unmistakably
              yours.
            </p>

            <p
              className={styles.bodyLead}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--burgundy)',
                marginTop: '12px',
              }}
            >
              Because the finest expression of luxury is something that feels
              like it was created exclusively for you.
            </p>
          </div>

          {/* Bespoke Journey Steps */}
          <div className={styles.bespokeStepsGrid}>
            {bespokeSteps.map((step) => (
              <div key={step.num} className={styles.bespokeStepCard}>
                <div className={styles.bespokeStepNum}>{step.num}</div>
                <div className={styles.bespokeStepTitle}>{step.title}</div>
                <p className={styles.bespokeStepText}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.bespokeCtas}>
            <Link
              to="/collections/high-jewellery"
              className={styles.btnPrimary}
            >
              EXPLORE BESPOKE DESIGNS
              <ArrowRight size={16} />
            </Link>

            <a
              href="https://wa.me/919120530531?text=Hello%20Carats%20by%20Grace%2C%20I%20would%20like%20to%20book%20a%20personal%20bespoke%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              <MessageCircle size={18} />
              BOOK A PERSONAL CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. EXCEPTIONAL DIAMOND QUALITY & CERTIFICATION
          ============================================================ */}
      <section
        className={styles.qualitySection}
        aria-label="Exceptional Diamond Quality and Certification"
      >
        <div className={styles.container}>
          <div className={styles.qualityHeader}>
            <span className={styles.sectionEyebrow}>
              Uncompromising Standards
            </span>
            <h2 className={styles.sectionTitle}>
              BRILLIANCE IN EVERY DETAIL.<br />
              EXCELLENCE IN EVERY GRADE.
            </h2>

            <p className={styles.bodyLead}>
              At Carats by Grace, we believe exceptional brilliance begins with
              exceptional quality.
            </p>

            <p className={styles.bodyText}>
              Our carefully curated collection features high-quality grown
              diamonds, including VVS clarity diamonds, celebrated for their
              exceptional clarity and minimal inclusions.
            </p>

            <p className={styles.bodyText}>
              VVS (Very Very Slightly Included) diamonds have inclusions that
              are extremely difficult to detect even under 10x magnification by a
              trained grader. Their remarkable clarity makes them a
              distinguished choice for those who appreciate the finer details of
              diamond quality.
            </p>

            <p className={styles.bodyText}>
              From the precision of the cut to the purity of clarity, every
              detail contributes to the beauty and brilliance of a diamond.
            </p>

            <p className={styles.bodyLead} style={{ fontWeight: 500 }}>
              With IGI-certified diamond offerings, we bring greater
              transparency and confidence to your jewellery experience.
            </p>
          </div>

          {/* Quality Commitment Cards */}
          <div className={styles.qualityGrid}>
            {qualityCommitments.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className={styles.qualityCard}>
                  <div className={styles.qualityIconWrap}>
                    <IconComp size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className={styles.qualityCardTitle}>{item.title}</h3>
                  <p className={styles.qualityCardDesc}>{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Closing Statement */}
          <div className={styles.qualityClosingBox}>
            <p className={styles.qualityClosingQuote}>
              "Because true brilliance isn't just about how a diamond shines.
              It's about every detail that makes it exceptional."
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. EXPERIENCE CARATS BY GRACE
          ============================================================ */}
      <section
        className={styles.experienceSection}
        aria-label="Experience Carats by Grace"
      >
        <div className={styles.container}>
          <div className={styles.experienceGrid}>
            <div className={styles.experienceLeft}>
              <div className={styles.experienceLocationBadge}>
                <MapPin size={15} />
                Mahanagar, Lucknow
              </div>

              <h2
                className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}
              >
                DISCOVER THE WORLD OF CARATS BY GRACE.
              </h2>

              <p
                className={`${styles.bodyText} ${styles.bodyTextLight}`}
                style={{ fontSize: '1.08rem' }}
              >
                Located in Mahanagar, Lucknow, Carats by Grace invites you to
                experience grown diamond jewellery through a more personal lens.
              </p>

              <p className={`${styles.bodyText} ${styles.bodyTextLight}`}>
                Discover distinctive collections, explore exclusive creations
                and find a piece that speaks to your story.
              </p>

              <p className={`${styles.bodyText} ${styles.bodyTextLight}`}>
                From timeless solitaires to extraordinary statement jewellery,
                every creation is an invitation to celebrate individuality and
                make brilliance your own.
              </p>

              <p
                className={`${styles.bodyText} ${styles.bodyTextLight}`}
                style={{ fontStyle: 'italic' }}
              >
                Step into a world where contemporary design meets timeless
                elegance.
              </p>

              {/* Brand Signature */}
              <div className={styles.signatureWrap}>
                <span className={styles.signatureBrand}>CARATS BY GRACE</span>
                <span className={styles.signatureTagline}>
                  YOUR GROWN DIAMOND DESTINATION.
                </span>
              </div>

              {/* CTA Buttons */}
              <div className={styles.experienceCtas}>
                <Link to="/collections/rings" className={styles.btnGold}>
                  EXPLORE OUR COLLECTIONS
                </Link>

                <Link
                  to="/collections/high-jewellery"
                  className={styles.btnGhostLight}
                >
                  DISCOVER EXCLUSIVE DESIGNS
                </Link>

                <a
                  href="https://wa.me/919120530531?text=Hello%20Carats%20by%20Grace%2C%20I%20would%20like%20to%20experience%20your%20collections."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnWhatsApp}
                >
                  <MessageCircle size={18} />
                  CONNECT ON WHATSAPP
                </a>
              </div>
            </div>

            <div className={styles.experienceRight}>
              <div className={styles.experienceVisualFrame}>
                <img
                  src="/assets/model2/cg_jewellers8593.jpg"
                  alt="Carats by Grace Atelier Destination in Mahanagar, Lucknow"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. THE VISION BEHIND CARATS BY GRACE
          ============================================================ */}
      <section
        className={styles.visionSection}
        aria-label="The Vision Behind Carats by Grace"
      >
        <div className={styles.container}>
          <div className={styles.visionGrid}>
            <div className={styles.visionContent}>
              <span className={styles.sectionEyebrow}>
                Founder Vision & Craft
              </span>
              <h2 className={styles.sectionTitle}>
                A VISION THAT GOES BEYOND BRILLIANCE.
              </h2>

              <p className={styles.bodyLead}>
                Every brand begins with an idea. Some begin with a belief that
                an entire experience can be reimagined.
              </p>

              <p className={styles.bodyText}>
                Carats by Grace was born from a shared vision of bringing a fresh
                perspective to the world of fine jewellery – one that celebrates
                grown diamonds, distinctive design and the beauty of
                individuality.
              </p>

              <p className={styles.bodyText}>
                Founded by Nishi and Prateek, Carats by Grace brings together a
                shared passion for diamonds, design and the evolving
                possibilities of modern luxury.
              </p>

              <p className={styles.bodyText}>
                Their vision is to create more than a jewellery destination – to
                build a space where exceptional craftsmanship, personal
                expression and contemporary brilliance come together.
              </p>

              <p
                className={styles.bodyLead}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--burgundy)',
                  marginTop: '16px',
                }}
              >
                A brand shaped by individuality, driven by innovation and
                inspired by the belief that every diamond deserves a story.
              </p>

              <div className={styles.founderSignatureBlock}>
                <BrandLogo variant="stacked-dark" height={54} style={{ marginBottom: 16 }} />
                <span className={styles.foundersNames}>NISHI & PRATEEK</span>
                <span className={styles.foundersRole}>
                  Founders, Carats by Grace
                </span>
              </div>
            </div>

            <div className={styles.visionVisual}>
              <div className={styles.visionVisualFrame}>
                <img
                  src="/assets/model1/m1_8446_final.jpg"
                  alt="Exceptional Diamond Craftsmanship at Carats by Grace"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
