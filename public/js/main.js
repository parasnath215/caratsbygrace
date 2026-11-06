/**
 * CARATS BY GRACE — CLIENT APPLICATION LOGIC
 * High Jewelry & Rare Type IIa Diamonds
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currency: 'USD',
    rates: {
      USD: { rate: 1.0, symbol: '$' },
      GBP: { rate: 0.79, symbol: '£' },
      EUR: { rate: 0.92, symbol: '€' }
    },
    activeCut: 'grace',
    activeDossier: 'imperial-cushion',
    activeCategory: 'all',
    vault: JSON.parse(localStorage.getItem('cbg_vault') || '[]'),
    pieces: [],
    dossiers: []
  };

  // Local fallback data
  const fallbackPieces = [
    {
      id: 'sovereign-cushion',
      title: 'The Sovereign Cushion',
      category: 'solitaires',
      categoryLabel: 'Solitaire Ring',
      carat: '5.42 ct',
      color: 'D (Exceptional White+)',
      clarity: 'FL (Flawless)',
      cut: 'Triple Excellent',
      shape: 'Cushion Modified Brilliant',
      metal: 'Platinum 950 Hand-Forged',
      origin: 'Golconda Lineage / Archival Type IIa',
      giaNumber: 'GIA 2185492014',
      dimensions: '11.82 x 10.45 x 6.72 mm',
      table: '56.0%',
      depth: '64.3%',
      priceUsd: 185000,
      image: 'images/cushion-ring.jpg',
      description: 'An unrepeatable 5.42 carat Type IIa cushion solitaire exhibiting zero detectable nitrogen. Set in micro-claw cold-forged platinum 950 with an architectural pavé bridge.',
      accent: 'Ref. SC-542-D'
    },
    {
      id: 'luminescence-riviera',
      title: 'The Luminescence Riviera',
      category: 'necklaces',
      categoryLabel: 'River Diamond Necklace',
      carat: '42.80 ctw',
      color: 'D - F Collection Color',
      clarity: 'VVS1 - IF Clarity',
      cut: 'Hearts & Arrows Ideal',
      shape: 'Graduated Round Brilliant',
      metal: 'Platinum 950 Micro-Articulated',
      origin: 'Archival Vault Selection',
      giaNumber: 'GIA Suite Dossier 7810',
      dimensions: '16.5 inches (42 cm) length',
      table: '56.5% average',
      depth: '61.2% average',
      priceUsd: 340000,
      image: 'images/riviera-necklace.jpg',
      description: 'A museum-tier river diamond necklace featuring 107 hand-matched round brilliant solitaires graduating seamlessly from 2.50 carats at the center. Each collet articulated for fluid drape.',
      accent: 'Ref. LR-428-R'
    },
    {
      id: 'ethereal-oval',
      title: 'The Ethereal Oval',
      category: 'solitaires',
      categoryLabel: 'Solitaire Pavé Ring',
      carat: '4.15 ct',
      color: 'D (Exceptional White+)',
      clarity: 'VVS1 (Collector Grade)',
      cut: 'Grace Master Oval Cut',
      shape: 'Oval Brilliant (1.42 Ratio)',
      metal: 'Platinum 950 with 18k Rose Gold Gallery',
      origin: 'Botswana Archival Rough',
      giaNumber: 'GIA 6291048591',
      dimensions: '13.14 x 9.25 x 5.61 mm',
      table: '57.0%',
      depth: '60.7%',
      priceUsd: 148000,
      image: 'images/solitaire-pave.jpg',
      description: 'An elongated 1.42 ratio oval brilliant possessing supreme spread and zero bow-tie effect. Features our proprietary hidden under-halo set with 0.35 ct micro-diamonds.',
      accent: 'Ref. EO-415-OV'
    },
    {
      id: 'cascade-pear-drops',
      title: 'The Cascade Pear Drops',
      category: 'earrings',
      categoryLabel: 'High Jewelry Drops',
      carat: '6.84 ctw',
      color: 'D Color (Twin Matched)',
      clarity: 'VVS1 / VVS2',
      cut: 'Grace Custom Faceted Pear',
      shape: 'Matched Pear Brilliant Pair',
      metal: 'Platinum 950 Hand-Wired',
      origin: 'South African Premier Deposit',
      giaNumber: 'GIA Twin Pairs 51920-A/B',
      dimensions: '10.85 x 7.12 mm each drop',
      table: '58.0%',
      depth: '62.4%',
      priceUsd: 118000,
      image: 'images/pear-earrings.jpg',
      description: 'Twin matched pear brilliant solitaires suspended from step-cut baguette diamond geometric links. Sculpted with French post closures and balanced for weightless movement.',
      accent: 'Ref. CP-684-P'
    },
    {
      id: 'hero-oval-specimen',
      title: 'The Grace Oval Solitaire',
      category: 'solitaires',
      categoryLabel: 'Iconic Maison Ring',
      carat: '4.82 ct',
      color: 'D Color (Finest White)',
      clarity: 'Flawless (FL)',
      cut: 'Grace Master Oval Cut',
      shape: 'Oval Brilliant',
      metal: 'Platinum 950 Whisper Band',
      origin: 'Archival Vault Specimen',
      giaNumber: 'GIA 2185492014',
      dimensions: '13.60 x 9.52 x 5.80 mm',
      table: '56.5%',
      depth: '60.9%',
      priceUsd: 195000,
      image: 'images/hero-ring.jpg',
      description: 'The archetype of Maison Grace: an oval solitaire of optical perfection with four eagle-claw prongs set on an ultra-refined 1.5mm comfort-fit shank.',
      accent: 'Ref. 984-Oval'
    }
  ];

  const fallbackDossiers = [
    {
      id: 'imperial-cushion',
      name: 'The Imperial Cushion Solitaire',
      tag: 'Archival Acquisition',
      carat: '5.42 CT',
      clarity: 'FL',
      color: 'D',
      cut: 'Triple Ex',
      origin: 'Golconda Lineage / Primary Alluvial',
      spectroscopy: 'Type IIa 100% Nitrogen Free (FTIR Verified)',
      scintillation: '99.8 / 100 Refraction Brilliance',
      image: 'images/macro-loupe.jpg',
      desc: 'Historic alluvial deposit lineage with zero detectable nitrogen lattice defects.'
    },
    {
      id: 'golconda-resonance',
      name: 'Golconda Mine Resonance',
      tag: 'Historical Lineage',
      carat: '6.18 CT',
      clarity: 'IF',
      color: 'D',
      cut: 'Old Mine Cushion',
      origin: 'Krishna River Valley Archival Reserve',
      spectroscopy: 'Optical limpidity with pure carbon crystal symmetry',
      scintillation: '99.5 / 100 Refraction Brilliance',
      image: 'images/diamond-rough.jpg',
      desc: 'Historic alluvial deposit lineage with zero detectable nitrogen lattice defects.'
    },
    {
      id: 'emerald-architecture',
      name: 'Emerald Cut Architecture',
      tag: 'Step-Cut Masterpiece',
      carat: '4.50 CT',
      clarity: 'VVS1',
      color: 'E',
      cut: 'Architectural Step Cut',
      origin: 'Premier Mine Deep Kimberlite',
      spectroscopy: 'Parallel step-faceting engineered for infinite mirrors',
      scintillation: '98.9 / 100 Refraction Brilliance',
      image: 'images/solitaire-pave.jpg',
      desc: 'Step-cut parallel mirrors engineered for infinite optical reflection depth.'
    },
    {
      id: 'radiant-convergence',
      name: 'Radiant Optical Density',
      tag: 'Hybrid Facet Science',
      carat: '3.90 CT',
      clarity: 'VVS1',
      color: 'D',
      cut: '70-Facet Modified',
      origin: 'Botswana Deep Pipe Specimen',
      spectroscopy: 'Type IIa certified by Raman Laser Spectroscopy',
      scintillation: '99.9 / 100 Refraction Brilliance',
      image: 'images/cushion-ring.jpg',
      desc: '70-facet hybrid geometry delivering maximum chromatic fire across every angle.'
    }
  ];

  // Helper: Format Price
  function formatPrice(usdAmount) {
    const { rate, symbol } = state.rates[state.currency];
    const converted = Math.round(usdAmount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  }

  // DOM Elements
  const elements = {
    productsGrid: document.getElementById('products-grid'),
    filterPills: document.querySelectorAll('.filter-pill'),
    currencySelect: document.getElementById('currency-select'),
    vaultCount: document.getElementById('vault-count'),
    vaultTrigger: document.getElementById('vault-trigger'),
    vaultModal: document.getElementById('vault-modal'),
    vaultModalClose: document.getElementById('vault-modal-close'),
    vaultItemsList: document.getElementById('vault-items-list'),
    vaultFooter: document.getElementById('vault-footer'),
    vaultInquireAllBtn: document.getElementById('vault-inquire-all-btn'),
    searchTrigger: document.getElementById('search-trigger'),
    searchModal: document.getElementById('search-modal'),
    searchModalClose: document.getElementById('search-modal-close'),
    catalogSearchInput: document.getElementById('catalog-search-input'),
    searchResultsList: document.getElementById('search-results-list'),
    productModal: document.getElementById('product-modal'),
    productModalClose: document.getElementById('product-modal-close'),
    confirmModal: document.getElementById('confirm-modal'),
    confirmModalClose: document.getElementById('confirm-close-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    drawerCloseBtn: document.getElementById('drawer-close-btn'),
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    reservationForm: document.getElementById('reservation-form'),
    resSalonSelect: document.getElementById('res-salon'),
    resNotesInput: document.getElementById('res-notes'),
    salonCards: document.querySelectorAll('.salon-card'),
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterEmail: document.getElementById('newsletter-email'),
    newsletterMsg: document.getElementById('newsletter-msg'),
    dossierItemsStack: document.getElementById('dossier-items-stack'),
    dossierActiveImg: document.getElementById('dossier-active-img'),
    dossierActiveTag: document.getElementById('dossier-active-tag'),
    dossierActiveName: document.getElementById('dossier-active-name'),
    dossierSpecCarat: document.getElementById('dossier-spec-carat'),
    dossierSpecClarity: document.getElementById('dossier-spec-clarity'),
    dossierSpecColor: document.getElementById('dossier-spec-color'),
    dossierSpecCut: document.getElementById('dossier-spec-cut'),
    dossierSpecOrigin: document.getElementById('dossier-spec-origin'),
    dossierSpecSpectroscopy: document.getElementById('dossier-spec-spectroscopy'),
    dossierSpecScintillation: document.getElementById('dossier-spec-scintillation'),
    cutTabs: document.querySelectorAll('.cut-tab'),
    raytraceCanvas: document.getElementById('raytraceCanvas'),
    paramCrown: document.getElementById('param-crown'),
    statusCrown: document.getElementById('status-crown'),
    paramPavilion: document.getElementById('param-pavilion'),
    statusPavilion: document.getElementById('status-pavilion'),
    paramTable: document.getElementById('param-table'),
    statusTable: document.getElementById('status-table'),
    paramReturn: document.getElementById('param-return'),
    statusReturn: document.getElementById('status-return'),
    paramLeakage: document.getElementById('param-leakage'),
    statusLeakage: document.getElementById('status-leakage')
  };

  /* --------------------------------------------------------------------------
     INITIALIZATION
     -------------------------------------------------------------------------- */
  async function init() {
    updateVaultBadge();

    // Fetch pieces from server or fallback
    try {
      const res = await fetch('/api/pieces');
      if (res.ok) {
        state.pieces = await res.json();
      } else {
        state.pieces = fallbackPieces;
      }
    } catch (e) {
      state.pieces = fallbackPieces;
    }

    // Fetch dossiers from server or fallback
    try {
      const res = await fetch('/api/dossiers');
      if (res.ok) {
        state.dossiers = await res.json();
      } else {
        state.dossiers = fallbackDossiers;
      }
    } catch (e) {
      state.dossiers = fallbackDossiers;
    }

    renderDossierStack();
    renderProducts();
    setupEventListeners();
    initRaytraceCanvas();
    setupIntersectionObserver();
  }

  /* --------------------------------------------------------------------------
     DOSSIER SECTION
     -------------------------------------------------------------------------- */
  function renderDossierStack() {
    if (!elements.dossierItemsStack) return;

    elements.dossierItemsStack.innerHTML = state.dossiers.map(dossier => {
      const isActive = dossier.id === state.activeDossier;
      return `
        <div class="dossier-item-card ${isActive ? 'active' : ''}" data-id="${dossier.id}">
          <div class="dossier-item-tag">${dossier.tag}</div>
          <h4 class="dossier-item-name">${dossier.name}</h4>
          <p class="dossier-item-desc">${dossier.desc || dossier.notes || ''}</p>
          <div class="dossier-item-spec">${dossier.carat} • ${dossier.color}/${dossier.clarity} • ${dossier.cut}</div>
        </div>
      `;
    }).join('');

    elements.dossierItemsStack.querySelectorAll('.dossier-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        selectDossier(id);
      });
    });
  }

  function selectDossier(id) {
    state.activeDossier = id;
    const dossier = state.dossiers.find(d => d.id === id);
    if (!dossier) return;

    // Update active highlight in list
    elements.dossierItemsStack.querySelectorAll('.dossier-item-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-id') === id);
    });

    // Update featured card
    elements.dossierActiveName.textContent = dossier.name;
    elements.dossierActiveTag.textContent = `${dossier.tag} • Certified`;
    elements.dossierSpecCarat.textContent = dossier.carat;
    elements.dossierSpecClarity.textContent = dossier.clarity;
    elements.dossierSpecColor.textContent = dossier.color;
    elements.dossierSpecCut.textContent = dossier.cut;
    elements.dossierSpecOrigin.textContent = dossier.origin;
    elements.dossierSpecSpectroscopy.textContent = dossier.spectroscopy;
    elements.dossierSpecScintillation.textContent = dossier.scintillation || dossier.lightScintillation || '99.8 / 100 Refraction Brilliance';

    if (dossier.image) {
      elements.dossierActiveImg.src = dossier.image;
    }
  }

  /* --------------------------------------------------------------------------
     MASTERPIECES & SOLITAIRES
     -------------------------------------------------------------------------- */
  function renderProducts() {
    if (!elements.productsGrid) return;

    const filtered = state.activeCategory === 'all'
      ? state.pieces
      : state.pieces.filter(p => p.category === state.activeCategory);

    // Limit to 4 prominent items as seen in screenshot (or full if requested)
    const displayPieces = filtered.slice(0, 4);

    elements.productsGrid.innerHTML = displayPieces.map(piece => {
      const isSaved = state.vault.includes(piece.id);
      return `
        <article class="product-card" data-id="${piece.id}">
          <div class="product-media">
            <img src="${piece.image}" alt="${piece.title}" class="product-img" loading="lazy">
            <span class="product-badge">${piece.accent}</span>
            <button type="button" class="product-vault-btn ${isSaved ? 'saved' : ''}" 
                    aria-label="${isSaved ? 'Remove from vault' : 'Save to vault'}"
                    onclick="app.toggleVault('${piece.id}', event)">
              <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
              </svg>
            </button>
          </div>
          <div class="product-info">
            <span class="product-cat">${piece.categoryLabel}</span>
            <h3 class="product-title">${piece.title}</h3>
            <p class="product-specs-line">${piece.carat} • ${piece.color} • ${piece.clarity}</p>
            
            <div class="product-price-row">
              <span class="product-price">${formatPrice(piece.priceUsd)}</span>
              <span class="product-gia-tag">${piece.giaNumber || 'GIA Verified'}</span>
            </div>

            <div class="product-actions">
              <button type="button" class="btn btn-card-inquire" onclick="app.inquirePiece('${piece.id}')">
                Inquire Piece
              </button>
              <button type="button" class="btn btn-card-details" onclick="app.openPieceModal('${piece.id}')">
                Details
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* --------------------------------------------------------------------------
     OPTICAL PROPORTION MATRIX & RAY TRACING ENGINE
     -------------------------------------------------------------------------- */
  const cutData = {
    grace: {
      crownAngle: '34.4°',
      crownStatus: 'Optimal Snell',
      pavilionAngle: '40.8°',
      pavilionStatus: 'Zero Leakage',
      tablePct: '56.5%',
      tableStatus: 'Maximum Dispersion',
      lightReturn: '99.8%',
      returnStatus: 'Total Reflection',
      leakage: '0.02%',
      leakageStatus: 'Near Absolute Zero',
      statusClass: 'tag-optimal',
      crownDeg: 34.4,
      pavilionDeg: 40.8,
      tableRatio: 0.565,
      leakageRatio: 0.002
    },
    commercial: {
      crownAngle: '31.2°',
      crownStatus: 'Sub-Optimal Angle',
      pavilionAngle: '43.2°',
      pavilionStatus: 'Facet Tilt Leakage',
      tablePct: '61.5%',
      tableStatus: 'Commercial Heavy Spread',
      lightReturn: '82.4%',
      returnStatus: 'Partial Attenuation',
      leakage: '17.6%',
      leakageStatus: 'Windowing Defect',
      statusClass: 'tag-warning',
      crownDeg: 31.2,
      pavilionDeg: 43.2,
      tableRatio: 0.615,
      leakageRatio: 0.176
    },
    shallow: {
      crownAngle: '27.5°',
      crownStatus: 'Severe Flat Crown',
      pavilionAngle: '38.0°',
      pavilionStatus: 'Critical Angle Failure',
      tablePct: '65.0%',
      tableStatus: 'Fish-Eye Distortion',
      lightReturn: '64.0%',
      returnStatus: 'Extinction Core',
      leakage: '36.0%',
      leakageStatus: 'Massive Bottom Leak',
      statusClass: 'tag-warning',
      crownDeg: 27.5,
      pavilionDeg: 38.0,
      tableRatio: 0.65,
      leakageRatio: 0.36
    }
  };

  let animationFrameId = null;
  let pulseOffset = 0;

  function initRaytraceCanvas() {
    const canvas = elements.raytraceCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width || 560;
      const displayHeight = (displayWidth * 420) / 560;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 560;
      const h = (w * 420) / 560;

      ctx.clearRect(0, 0, w, h);

      // Grid background fine lines
      ctx.strokeStyle = 'rgba(197, 168, 128, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Current cut parameters
      const cut = cutData[state.activeCut];

      // Diamond Profile Geometry Coordinates
      const centerX = w / 2;
      const tableY = h * 0.22;
      const girdleY = h * 0.44;
      const culetY = h * 0.86;

      const girdleHalfWidth = w * 0.38;
      const tableHalfWidth = girdleHalfWidth * cut.tableRatio;

      const tableLeft = centerX - tableHalfWidth;
      const tableRight = centerX + tableHalfWidth;
      const girdleLeft = centerX - girdleHalfWidth;
      const girdleRight = centerX + girdleHalfWidth;
      const culetX = centerX;

      // Draw Diamond Facet Outline
      ctx.fillStyle = 'rgba(40, 10, 20, 0.6)';
      ctx.strokeStyle = '#C5A880';
      ctx.lineWidth = 1.6;

      ctx.beginPath();
      // Table
      ctx.moveTo(tableLeft, tableY);
      ctx.lineTo(tableRight, tableY);
      // Crown right
      ctx.lineTo(girdleRight, girdleY);
      // Pavilion right to culet
      ctx.lineTo(culetX, culetY);
      // Pavilion left from culet
      ctx.lineTo(girdleLeft, girdleY);
      // Crown left
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Internal facet lines for 3D diamond feel
      ctx.strokeStyle = 'rgba(197, 168, 128, 0.25)';
      ctx.lineWidth = 1;

      // Center table facet
      ctx.beginPath();
      ctx.moveTo(centerX, tableY);
      ctx.lineTo(centerX, culetY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(tableLeft, tableY);
      ctx.lineTo(centerX, girdleY);
      ctx.lineTo(tableRight, tableY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(girdleLeft, girdleY);
      ctx.lineTo(centerX, culetY);
      ctx.lineTo(girdleRight, girdleY);
      ctx.stroke();

      // RAY TRACING SIMULATION
      pulseOffset = (pulseOffset + 0.02) % 1;

      // 5 Primary Ray Traces entering through the table & crown
      const rayInputs = [-0.65, -0.3, 0, 0.3, 0.65];

      rayInputs.forEach((ratio, index) => {
        const startX = centerX + tableHalfWidth * ratio;
        const startY = h * 0.05;

        // Incident ray (White beam from top)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, tableY);
        ctx.stroke();

        // Arrow head for incoming light
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(startX, tableY - 4, 2, 0, Math.PI * 2);
        ctx.fill();

        // First internal path down to pavilion facet
        // Grace cut reflects to opposing pavilion then shoots up!
        if (state.activeCut === 'grace') {
          const pavTargetX = centerX + (ratio > 0 ? -1 : 1) * girdleHalfWidth * (0.35 + Math.abs(ratio) * 0.3);
          const pavTargetY = girdleY + (culetY - girdleY) * (0.45 + Math.abs(ratio) * 0.25);

          // Ray to first pavilion facet
          ctx.strokeStyle = 'rgba(197, 168, 128, 0.9)';
          ctx.beginPath();
          ctx.moveTo(startX, tableY);
          ctx.lineTo(pavTargetX, pavTargetY);
          ctx.stroke();

          // Second internal reflection (Total Internal Reflection)
          const oppTargetX = centerX + (ratio > 0 ? 1 : -1) * girdleHalfWidth * 0.45;
          const oppTargetY = girdleY + (culetY - girdleY) * 0.35;

          ctx.strokeStyle = '#D4AF37';
          ctx.beginPath();
          ctx.moveTo(pavTargetX, pavTargetY);
          ctx.lineTo(oppTargetX, oppTargetY);
          ctx.stroke();

          // Reflected exit ray firing out of the crown!
          const exitX = oppTargetX + (ratio > 0 ? 1 : -1) * 30;
          const exitY = tableY;
          const beamEndX = exitX + (ratio > 0 ? 25 : -25);
          const beamEndY = h * 0.05;

          ctx.strokeStyle = '#FFEAA7';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(oppTargetX, oppTargetY);
          ctx.lineTo(exitX, exitY);
          ctx.lineTo(beamEndX, beamEndY);
          ctx.stroke();

          // Sparkling scintillation dot at exit
          ctx.fillStyle = '#FFF9E6';
          ctx.beginPath();
          ctx.arc(beamEndX, beamEndY, 3.5, 0, Math.PI * 2);
          ctx.fill();

        } else if (state.activeCut === 'commercial') {
          // Standard Commercial: Moderate leakage through bottom
          const pavTargetX = centerX + (ratio > 0 ? -1 : 1) * girdleHalfWidth * 0.4;
          const pavTargetY = girdleY + (culetY - girdleY) * 0.6;

          ctx.strokeStyle = 'rgba(197, 168, 128, 0.7)';
          ctx.beginPath();
          ctx.moveTo(startX, tableY);
          ctx.lineTo(pavTargetX, pavTargetY);
          ctx.stroke();

          // Leakage ray escaping through bottom facet
          ctx.strokeStyle = 'rgba(229, 115, 115, 0.8)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(pavTargetX, pavTargetY);
          ctx.lineTo(pavTargetX + (ratio > 0 ? -25 : 25), pavTargetY + 45);
          ctx.stroke();

          // Dim return ray
          ctx.strokeStyle = 'rgba(255, 235, 167, 0.4)';
          ctx.beginPath();
          ctx.moveTo(pavTargetX, pavTargetY);
          ctx.lineTo(centerX, tableY);
          ctx.stroke();

        } else {
          // Shallow & Steep: Severe fish-eye bottom leakage
          const pavTargetX = centerX + ratio * girdleHalfWidth * 0.5;
          const pavTargetY = girdleY + (culetY - girdleY) * 0.45;

          ctx.strokeStyle = 'rgba(197, 168, 128, 0.5)';
          ctx.beginPath();
          ctx.moveTo(startX, tableY);
          ctx.lineTo(pavTargetX, pavTargetY);
          ctx.stroke();

          // Massive downward leakage loss
          ctx.strokeStyle = '#E57373';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(pavTargetX, pavTargetY);
          ctx.lineTo(pavTargetX + (ratio > 0 ? 30 : -30), h * 0.95);
          ctx.stroke();

          // Leakage indicator dot
          ctx.fillStyle = '#E57373';
          ctx.beginPath();
          ctx.arc(pavTargetX + (ratio > 0 ? 30 : -30), h * 0.95, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Overlay text stats directly on canvas
      ctx.fillStyle = '#C5A880';
      ctx.font = '600 11px Montserrat, sans-serif';
      ctx.fillText(`CROWN ANGLE ${cut.crownAngle}`, tableLeft - 10, tableY - 14);
      ctx.fillText(`PAVILION ${cut.pavilionAngle}`, centerX - 40, culetY + 22);

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
  }

  function switchCut(cutKey) {
    if (!cutData[cutKey]) return;
    state.activeCut = cutKey;

    // Update buttons
    elements.cutTabs.forEach(tab => {
      const isActive = tab.getAttribute('data-cut') === cutKey;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update Proportions table
    const data = cutData[cutKey];
    elements.paramCrown.textContent = data.crownAngle;
    elements.statusCrown.textContent = data.crownStatus;
    elements.statusCrown.className = `prop-status ${data.statusClass}`;

    elements.paramPavilion.textContent = data.pavilionAngle;
    elements.statusPavilion.textContent = data.pavilionStatus;
    elements.statusPavilion.className = `prop-status ${data.statusClass}`;

    elements.paramTable.textContent = data.tablePct;
    elements.statusTable.textContent = data.tableStatus;
    elements.statusTable.className = `prop-status ${data.statusClass}`;

    elements.paramReturn.textContent = data.lightReturn;
    elements.statusReturn.textContent = data.returnStatus;
    elements.statusReturn.className = `prop-status ${data.statusClass}`;

    elements.paramLeakage.textContent = data.leakage;
    elements.statusLeakage.textContent = data.leakageStatus;
    elements.statusLeakage.className = `prop-status ${data.statusClass}`;
  }

  /* --------------------------------------------------------------------------
     EVENT LISTENERS & MODAL HANDLERS
     -------------------------------------------------------------------------- */
  function setupEventListeners() {
    // Cut selector tabs
    elements.cutTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cut = tab.getAttribute('data-cut');
        switchCut(cut);
      });
    });

    // Category filter tabs
    elements.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        elements.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = pill.getAttribute('data-filter');
        renderProducts();
      });
    });

    // Currency selector
    if (elements.currencySelect) {
      elements.currencySelect.addEventListener('change', (e) => {
        state.currency = e.target.value;
        renderProducts();
      });
    }

    // Mobile drawer toggle
    if (elements.mobileMenuBtn) {
      elements.mobileMenuBtn.addEventListener('click', openMobileDrawer);
    }
    if (elements.drawerCloseBtn) {
      elements.drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    }
    if (elements.drawerBackdrop) {
      elements.drawerBackdrop.addEventListener('click', closeMobileDrawer);
    }

    // Close mobile drawer when clicking navigation links
    document.querySelectorAll('.mobile-nav-link, .drawer-action-btn').forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // Salon cards click auto-selects in reservation form
    elements.salonCards.forEach(card => {
      card.addEventListener('click', () => {
        elements.salonCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const city = card.getAttribute('data-city');
        if (elements.resSalonSelect) {
          if (city === 'London') elements.resSalonSelect.value = 'Mayfair Salon, London';
          else if (city === 'Paris') elements.resSalonSelect.value = 'Place Vendôme, Paris';
          else if (city === 'New York') elements.resSalonSelect.value = 'Manhattan Salon, New York';
        }

        // Smooth scroll to form on mobile/tablet
        if (window.innerWidth < 1024 && elements.reservationForm) {
          elements.reservationForm.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Reservation Form Submit
    if (elements.reservationForm) {
      elements.reservationForm.addEventListener('submit', handleReservationSubmit);
    }

    // Newsletter Form Submit
    if (elements.newsletterForm) {
      elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Search Trigger
    if (elements.searchTrigger) {
      elements.searchTrigger.addEventListener('click', () => openModal(elements.searchModal));
    }
    if (elements.searchModalClose) {
      elements.searchModalClose.addEventListener('click', () => closeModal(elements.searchModal));
    }
    if (elements.catalogSearchInput) {
      elements.catalogSearchInput.addEventListener('input', handleCatalogSearch);
    }

    // Quick tag filters in search modal
    document.querySelectorAll('.quick-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const text = tag.getAttribute('data-tag');
        if (elements.catalogSearchInput) {
          elements.catalogSearchInput.value = text;
          handleCatalogSearch();
        }
      });
    });

    // Vault Trigger
    if (elements.vaultTrigger) {
      elements.vaultTrigger.addEventListener('click', openVaultModal);
    }
    if (elements.vaultModalClose) {
      elements.vaultModalClose.addEventListener('click', () => closeModal(elements.vaultModal));
    }
    if (elements.vaultInquireAllBtn) {
      elements.vaultInquireAllBtn.addEventListener('click', () => {
        closeModal(elements.vaultModal);
        const titles = state.vault.map(id => {
          const piece = state.pieces.find(p => p.id === id);
          return piece ? piece.title : id;
        }).join(', ');

        if (elements.resNotesInput) {
          elements.resNotesInput.value = `Inquiry regarding Curated Vault items: ${titles}`;
        }
      });
    }

    // Product Modal Close
    if (elements.productModalClose) {
      elements.productModalClose.addEventListener('click', () => closeModal(elements.productModal));
    }

    // Confirm Modal Close
    if (elements.confirmModalClose) {
      elements.confirmModalClose.addEventListener('click', () => closeModal(elements.confirmModal));
    }

    // Global Modal Backdrop clicks
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
        closeMobileDrawer();
      }
    });

    // Sticky header shadow on scroll
    const siteHeader = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteHeader.style.boxShadow = '0 8px 24px rgba(36, 8, 18, 0.08)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    });
  }

  /* --------------------------------------------------------------------------
     MOBILE DRAWER
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    elements.mobileDrawer.classList.add('open');
    elements.drawerBackdrop.classList.add('open');
    elements.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    elements.mobileDrawer.classList.remove('open');
    elements.drawerBackdrop.classList.remove('open');
    elements.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     MODALS UTILITIES
     -------------------------------------------------------------------------- */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     PRODUCT DETAIL MODAL
     -------------------------------------------------------------------------- */
  function openPieceModal(id) {
    const piece = state.pieces.find(p => p.id === id);
    if (!piece) return;

    document.getElementById('modal-img').src = piece.image;
    document.getElementById('modal-img').alt = piece.title;
    document.getElementById('modal-accent-chip').textContent = piece.accent;
    document.getElementById('modal-category').textContent = piece.categoryLabel;
    document.getElementById('modal-title').textContent = piece.title;
    document.getElementById('modal-price').textContent = formatPrice(piece.priceUsd);
    document.getElementById('modal-desc').textContent = piece.description;
    document.getElementById('modal-carat').textContent = piece.carat;
    document.getElementById('modal-color').textContent = piece.color;
    document.getElementById('modal-clarity').textContent = piece.clarity;
    document.getElementById('modal-cut').textContent = piece.cut;
    document.getElementById('modal-metal').textContent = piece.metal;
    document.getElementById('modal-gia').textContent = piece.giaNumber || 'GIA Verified';

    const reserveBtn = document.getElementById('modal-reserve-btn');
    reserveBtn.onclick = () => {
      closeModal(elements.productModal);
      inquirePiece(piece.id);
    };

    const vaultBtn = document.getElementById('modal-vault-toggle');
    const isSaved = state.vault.includes(piece.id);
    vaultBtn.textContent = isSaved ? 'Remove from Vault' : 'Save to Vault';
    vaultBtn.onclick = () => {
      toggleVault(piece.id);
      vaultBtn.textContent = state.vault.includes(piece.id) ? 'Remove from Vault' : 'Save to Vault';
    };

    openModal(elements.productModal);
  }

  /* --------------------------------------------------------------------------
     SEARCH FUNCTIONALITY
     -------------------------------------------------------------------------- */
  function handleCatalogSearch() {
    const query = elements.catalogSearchInput.value.toLowerCase().trim();
    if (!query) {
      elements.searchResultsList.innerHTML = '<p class="empty-vault-msg">Enter a keyword to inspect pieces and certified stones.</p>';
      return;
    }

    const matches = state.pieces.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.carat.toLowerCase().includes(query) ||
      p.color.toLowerCase().includes(query) ||
      p.clarity.toLowerCase().includes(query) ||
      p.categoryLabel.toLowerCase().includes(query) ||
      (p.giaNumber && p.giaNumber.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      elements.searchResultsList.innerHTML = '<p class="empty-vault-msg">No archival stones found matching your specifications.</p>';
      return;
    }

    elements.searchResultsList.innerHTML = matches.map(piece => `
      <div class="search-result-item" onclick="app.selectSearchResult('${piece.id}')">
        <img src="${piece.image}" alt="${piece.title}" class="search-result-thumb">
        <div class="search-result-meta">
          <h5>${piece.title}</h5>
          <p>${piece.carat} • ${piece.color} / ${piece.clarity} • ${formatPrice(piece.priceUsd)}</p>
        </div>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     VAULT / WISHLIST
     -------------------------------------------------------------------------- */
  function toggleVault(id, event) {
    if (event) event.stopPropagation();

    const idx = state.vault.indexOf(id);
    if (idx > -1) {
      state.vault.splice(idx, 1);
    } else {
      state.vault.push(id);
    }

    localStorage.setItem('cbg_vault', JSON.stringify(state.vault));
    updateVaultBadge();
    renderProducts();
  }

  function updateVaultBadge() {
    if (elements.vaultCount) {
      elements.vaultCount.textContent = state.vault.length;
    }
  }

  function openVaultModal() {
    if (state.vault.length === 0) {
      elements.vaultItemsList.innerHTML = '<p class="empty-vault-msg">Your private vault is currently empty. Explore our solitaires and select pieces to add them to your audience dossier.</p>';
      elements.vaultFooter.style.display = 'none';
    } else {
      const items = state.vault.map(id => state.pieces.find(p => p.id === id)).filter(Boolean);
      elements.vaultItemsList.innerHTML = items.map(p => `
        <div class="vault-item-row">
          <div class="vault-item-left">
            <img src="${p.image}" alt="${p.title}" class="vault-item-img">
            <div>
              <h5 class="vault-item-title">${p.title}</h5>
              <span class="vault-item-spec">${p.carat} • ${formatPrice(p.priceUsd)}</span>
            </div>
          </div>
          <button type="button" class="vault-remove-btn" onclick="app.removeFromVault('${p.id}')">Remove</button>
        </div>
      `).join('');
      elements.vaultFooter.style.display = 'block';
    }

    openModal(elements.vaultModal);
  }

  function removeFromVault(id) {
    toggleVault(id);
    openVaultModal();
  }

  /* --------------------------------------------------------------------------
     RESERVATION / INQUIRY
     -------------------------------------------------------------------------- */
  function inquirePiece(id) {
    const piece = state.pieces.find(p => p.id === id);
    if (!piece) return;

    if (elements.resNotesInput) {
      elements.resNotesInput.value = `Private inquiry regarding: ${piece.title} (${piece.carat}, ${piece.color}/${piece.clarity}, ${formatPrice(piece.priceUsd)}).`;
    }

    // Scroll smoothly to reservation section
    const conciergeSec = document.getElementById('concierge');
    if (conciergeSec) {
      conciergeSec.scrollIntoView({ behavior: 'smooth' });
    }

    // Flash the form slightly to guide user
    const resCard = document.querySelector('.reservation-card');
    if (resCard) {
      resCard.style.outline = '2px solid var(--color-gold)';
      setTimeout(() => { resCard.style.outline = 'none'; }, 2000);
    }
  }

  function inquireDossier() {
    const dossier = state.dossiers.find(d => d.id === state.activeDossier);
    const title = dossier ? dossier.name : 'Archival Dossier';

    if (elements.resNotesInput) {
      elements.resNotesInput.value = `Requesting comprehensive FTIR spectroscopic and gemological dossier for ${title}.`;
    }

    const conciergeSec = document.getElementById('concierge');
    if (conciergeSec) {
      conciergeSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async function handleReservationSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('res-name');
    const emailInput = document.getElementById('res-email');
    const phoneInput = document.getElementById('res-phone');
    const salonInput = document.getElementById('res-salon');
    const typeInput = document.getElementById('res-type');
    const dateInput = document.getElementById('res-date');
    const timeInput = document.getElementById('res-time');
    const notesInput = document.getElementById('res-notes');
    const submitBtn = document.getElementById('res-submit-btn');

    // Simple validation
    let valid = true;
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please provide your full legal name.');
      valid = false;
    } else {
      clearError(nameInput);
    }

    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      showError(emailInput, 'Please provide a valid confidential email.');
      valid = false;
    } else {
      clearError(emailInput);
    }

    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'Please enter your contact telephone number.');
      valid = false;
    } else {
      clearError(phoneInput);
    }

    if (!valid) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Securing Invitation...</span>`;

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      salon: salonInput.value,
      consultationType: typeInput.value,
      preferredDate: dateInput.value || new Date().toISOString().split('T')[0],
      preferredTime: timeInput.value,
      notes: notesInput.value.trim()
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        // Populate Confirmation Modal
        document.getElementById('confirm-code').textContent = data.appointment.id;
        document.getElementById('confirm-guest').textContent = data.appointment.name;
        document.getElementById('confirm-salon').textContent = data.appointment.salon;
        document.getElementById('confirm-focus').textContent = data.appointment.consultationType;
        document.getElementById('confirm-datetime').textContent = `${data.appointment.preferredDate} at ${data.appointment.preferredTime}`;

        // Reset form
        elements.reservationForm.reset();
        openModal(elements.confirmModal);
      } else {
        alert(data.message || 'Error scheduling audience. Please contact our salon concierge directly.');
      }
    } catch (err) {
      // Fallback offline confirmation
      const fallbackCode = 'CBG-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('confirm-code').textContent = fallbackCode;
      document.getElementById('confirm-guest').textContent = payload.name;
      document.getElementById('confirm-salon').textContent = payload.salon;
      document.getElementById('confirm-focus').textContent = payload.consultationType;
      document.getElementById('confirm-datetime').textContent = `${payload.preferredDate} at ${payload.preferredTime}`;
      elements.reservationForm.reset();
      openModal(elements.confirmModal);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Request Private Invitation</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    }
  }

  function showError(inputEl, msg) {
    const parent = inputEl.parentElement;
    parent.classList.add('has-error');
    const errSpan = parent.querySelector('.form-error');
    if (errSpan) errSpan.textContent = msg;
  }

  function clearError(inputEl) {
    const parent = inputEl.parentElement;
    parent.classList.remove('has-error');
    const errSpan = parent.querySelector('.form-error');
    if (errSpan) errSpan.textContent = '';
  }

  /* --------------------------------------------------------------------------
     NEWSLETTER SUBMIT
     -------------------------------------------------------------------------- */
  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = elements.newsletterEmail.value.trim();
    if (!email) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      elements.newsletterMsg.textContent = data.message || 'Welcome to the Archival Circle.';
      elements.newsletterMsg.className = 'newsletter-msg success';
      elements.newsletterEmail.value = '';
    } catch (err) {
      elements.newsletterMsg.textContent = 'Welcome to the Archival Circle.';
      elements.newsletterMsg.className = 'newsletter-msg success';
      elements.newsletterEmail.value = '';
    }
  }

  /* --------------------------------------------------------------------------
     INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
     -------------------------------------------------------------------------- */
  function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.atelier-card, .dossier-featured-card, .reservation-card, .product-card').forEach(el => {
      observer.observe(el);
    });
  }

  // Expose global methods for inline HTML events
  window.app = {
    toggleVault,
    removeFromVault,
    openPieceModal,
    inquirePiece,
    inquireDossier,
    selectSearchResult: (id) => {
      closeModal(elements.searchModal);
      openPieceModal(id);
    }
  };

  // Launch on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

