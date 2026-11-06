const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store for demonstrations
const appointments = [];
const newsletterSubscribers = [];

// Data: Archival Solitaires & Masterpieces
const masterpieces = [
  {
    id: 'sovereign-cushion',
    title: 'The Carats by Grace Sovereign Cushion',
    category: 'solitaires',
    categoryLabel: 'Solitaire Ring',
    carat: '5.42 ct',
    color: 'D (Exceptional White+)',
    clarity: 'FL (Flawless)',
    cut: 'Triple Excellent',
    shape: 'Cushion Modified Brilliant',
    metal: 'Platinum 950 Hand-Forged',
    origin: 'Carats by Grace Archival Vault',
    giaNumber: 'GIA 2185492014',
    dimensions: '11.82 x 10.45 x 6.72 mm',
    table: '56.0%',
    depth: '64.3%',
    polish: 'Excellent',
    symmetry: 'Excellent',
    fluorescence: 'None',
    priceUsd: 185000,
    image: 'images/cushion-ring.jpg',
    description: 'An unrepeatable 5.42 carat Type IIa cushion solitaire exhibiting zero detectable nitrogen. Set in micro-claw cold-forged platinum 950 with an architectural pavé bridge.',
    accent: 'Ref. SC-542-D'
  },
  {
    id: 'luminescence-riviera',
    title: 'The Carats by Grace Luminescence Riviera',
    category: 'necklaces',
    categoryLabel: 'River Diamond Necklace',
    carat: '42.80 ctw',
    color: 'D - F Collection Color',
    clarity: 'VVS1 - IF Clarity',
    cut: 'Hearts & Arrows Ideal',
    shape: 'Graduated Round Brilliant',
    metal: 'Platinum 950 Micro-Articulated',
    origin: 'Carats by Grace Vault Selection',
    giaNumber: 'GIA Suite Dossier 7810',
    dimensions: '16.5 inches (42 cm) length',
    table: '56.5% average',
    depth: '61.2% average',
    polish: 'Triple Excellent Suite',
    symmetry: 'Triple Excellent Suite',
    fluorescence: 'None across 107 stones',
    priceUsd: 340000,
    image: 'images/riviera-necklace.jpg',
    description: 'A museum-tier river diamond necklace featuring 107 hand-matched round brilliant solitaires graduating seamlessly from 2.50 carats at the center. Each collet articulated for fluid drape.',
    accent: 'Ref. LR-428-R'
  },
  {
    id: 'ethereal-oval',
    title: 'The Carats by Grace Ethereal Oval',
    category: 'solitaires',
    categoryLabel: 'Solitaire Pavé Ring',
    carat: '4.15 ct',
    color: 'D (Exceptional White+)',
    clarity: 'VVS1 (Collector Grade)',
    cut: 'Carats by Grace Master Oval Cut',
    shape: 'Oval Brilliant (1.42 Ratio)',
    metal: 'Platinum 950 with 18k Rose Gold Gallery',
    origin: 'Carats by Grace Archival Rough',
    giaNumber: 'GIA 6291048591',
    dimensions: '13.14 x 9.25 x 5.61 mm',
    table: '57.0%',
    depth: '60.7%',
    polish: 'Excellent',
    symmetry: 'Excellent',
    fluorescence: 'None',
    priceUsd: 148000,
    image: 'images/solitaire-pave.jpg',
    description: 'An elongated 1.42 ratio oval brilliant possessing supreme spread and zero bow-tie effect. Features our proprietary hidden under-halo set with 0.35 ct micro-diamonds.',
    accent: 'Ref. EO-415-OV'
  },
  {
    id: 'cascade-pear-drops',
    title: 'The Carats by Grace Cascade Pear Drops',
    category: 'earrings',
    categoryLabel: 'High Jewelry Drops',
    carat: '6.84 ctw',
    color: 'D Color (Twin Matched)',
    clarity: 'VVS1 / VVS2',
    cut: 'Carats by Grace Custom Faceted Pear',
    shape: 'Matched Pear Brilliant Pair',
    metal: 'Platinum 950 Hand-Wired',
    origin: 'Carats by Grace Archival Deposit',
    giaNumber: 'GIA Twin Pairs 51920-A/B',
    dimensions: '10.85 x 7.12 mm each drop',
    table: '58.0%',
    depth: '62.4%',
    polish: 'Excellent / Excellent',
    symmetry: 'Excellent / Excellent',
    fluorescence: 'None',
    priceUsd: 118000,
    image: 'images/pear-earrings.jpg',
    description: 'Twin matched pear brilliant solitaires suspended from step-cut baguette diamond geometric links. Sculpted with French post closures and balanced for weightless movement.',
    accent: 'Ref. CP-684-P'
  },
  {
    id: 'golconda-emerald',
    title: 'The Carats by Grace Sovereign Emerald Cut',
    category: 'solitaires',
    categoryLabel: 'Archival Step Cut',
    carat: '7.12 ct',
    color: 'E Color (Exceptional White)',
    clarity: 'Internally Flawless (IF)',
    cut: 'Architectural Step Cut',
    shape: 'Classic Emerald Cut (1.45 Ratio)',
    metal: 'Platinum 950 with Bullet Cut Shoulders',
    origin: 'Carats by Grace Historical Lineage',
    giaNumber: 'GIA 1198302187',
    dimensions: '14.02 x 9.67 x 6.10 mm',
    table: '62.0%',
    depth: '63.1%',
    polish: 'Excellent',
    symmetry: 'Excellent',
    fluorescence: 'None',
    priceUsd: 265000,
    image: 'images/diamond-rough.jpg',
    description: 'An authoritative 7.12 carat emerald cut solitaire exhibiting mirror-like planar facets and mesmerizing deep step scintillation. Flanked by calibrated tapered baguette side stones.',
    accent: 'Ref. SE-712-EC'
  },
  {
    id: 'hero-oval-specimen',
    title: 'The Carats by Grace Oval Solitaire',
    category: 'solitaires',
    categoryLabel: 'Carats by Grace Solitaire',
    carat: '4.82 ct',
    color: 'D Color (Finest White)',
    clarity: 'Flawless (FL)',
    cut: 'Carats by Grace Master Oval Cut',
    shape: 'Oval Brilliant',
    metal: 'Platinum 950 Whisper Band',
    origin: 'Carats by Grace Vault Specimen',
    giaNumber: 'GIA 2185492014',
    dimensions: '13.60 x 9.52 x 5.80 mm',
    table: '56.5%',
    depth: '60.9%',
    polish: 'Triple Excellent',
    symmetry: 'Triple Excellent',
    fluorescence: 'None',
    priceUsd: 195000,
    image: 'images/hero-ring.jpg',
    description: 'The archetype of Carats by Grace: an oval solitaire of optical perfection with four eagle-claw prongs set on an ultra-refined 1.5mm comfort-fit shank in cold-forged platinum 950.',
    accent: 'Ref. 984-Oval'
  }
];

// Data: Lapidary Dossiers
const dossiers = [
  {
    id: 'imperial-cushion',
    name: 'The Imperial Cushion Solitaire',
    tag: 'Archival Acquisition',
    carat: '5.42 CT',
    clarity: 'FL (Flawless)',
    color: 'D (Exceptional)',
    cut: 'Triple Ex',
    origin: 'South African Kimberlite Pipe',
    fluorescence: 'None',
    spectroscopy: 'Type IIa — Nitrogen below detection threshold (FTIR)',
    lightScintillation: 'Excellent / Excellent (GIA)',
    opticalAngle: 'Crown 34.4° | Pavilion 40.8°',
    image: 'images/macro-loupe.jpg',
    notes: 'Kimberlite pipe origin with zero detectable nitrogen lattice defects. FTIR and Raman laser spectroscopy confirmed.'
  },
  {
    id: 'golconda-resonance',
    name: 'Golconda Mine Resonance',
    tag: 'Historical Lineage',
    carat: '6.18 CT',
    clarity: 'IF (Internally Flawless)',
    color: 'D (Finest White)',
    cut: 'Old Mine Cushion Cut',
    origin: 'Historic Krishna River Valley',
    fluorescence: 'None',
    spectroscopy: 'Optical limpidity — pure carbon crystal symmetry confirmed',
    lightScintillation: 'Excellent / Excellent (GIA)',
    opticalAngle: 'Crown 35.1° | Pavilion 41.0°',
    image: 'images/diamond-rough.jpg',
    notes: 'Preserves the legendary watery translucence (limpidité) characteristic of legendary historical Golconda stones.'
  },
  {
    id: 'emerald-architecture',
    name: 'Emerald Cut Architecture',
    tag: 'Step-Cut Masterpiece',
    carat: '4.50 CT',
    clarity: 'VVS1 (Collector Grade)',
    color: 'E (River Color)',
    cut: 'Architectural Step Cut',
    origin: 'Premier Mine Deep Kimberlite',
    fluorescence: 'None',
    spectroscopy: 'Parallel step-faceting engineered for infinite mirror depth',
    lightScintillation: 'Very Good / Excellent (GIA)',
    opticalAngle: 'Crown 33.8° | Pavilion 42.2°',
    image: 'images/solitaire-pave.jpg',
    notes: 'Engineered with parallel planar step faceting calibrated to create infinite internal reflection corridors.'
  },
  {
    id: 'radiant-convergence',
    name: 'Radiant Optical Density',
    tag: 'Hybrid Facet Science',
    carat: '3.90 CT',
    clarity: 'VVS1',
    color: 'D (Exceptional)',
    cut: '70-Facet Modified Brilliant',
    origin: 'Botswana Deep Pipe Specimen',
    fluorescence: 'None',
    spectroscopy: 'Type IIa certified by Raman Laser Spectroscopy',
    lightScintillation: 'Excellent / Excellent (GIA)',
    opticalAngle: 'Crown 34.6° | Pavilion 40.6°',
    image: 'images/cushion-ring.jpg',
    notes: '70-facet hybrid geometry delivering maximum chromatic fire across every angle.'
  }
];

// API: Get Masterpieces / Solitaires
app.get('/api/pieces', (req, res) => {
  const category = req.query.category;
  if (category && category !== 'all') {
    return res.json(masterpieces.filter(p => p.category === category));
  }
  res.json(masterpieces);
});

// API: Get Dossiers
app.get('/api/dossiers', (req, res) => {
  res.json(dossiers);
});

// API: Book a Salon Appointment
app.post('/api/appointments', (req, res) => {
  const { name, email, phone, salon, consultationType, preferredDate, preferredTime, notes } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide full name, email address, and telephone number.'
    });
  }

  const appointmentId = 'CBG-' + Math.floor(100000 + Math.random() * 900000);
  const newAppointment = {
    id: appointmentId,
    name,
    email,
    phone,
    salon: salon || 'Mayfair Salon, London',
    consultationType: consultationType || 'Solitaire Selection & Viewing',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: preferredTime || '14:00',
    notes: notes || '',
    status: 'Confirmed Confidential Appointment',
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);

  return res.json({
    success: true,
    message: 'Your private appointment at Carats by Grace has been received.',
    appointment: newAppointment
  });
});

// API: Archival Circle Newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address required.' });
  }

  if (!newsletterSubscribers.includes(email)) {
    newsletterSubscribers.push(email);
  }

  return res.json({
    success: true,
    message: 'Welcome to the Archival Circle. Confidential acquisitions will be delivered to your inbox.'
  });
});

// Serve Classic Mockup Page (1:1 with original reference)
app.get(['/classic', '/original', '/mockup'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'classic.html'));
});

// Fallback to index.html for SPA feel
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Carats by Grace server running at http://localhost:${PORT}`);
});
