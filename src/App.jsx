import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider, useUI } from './context/UIContext';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

const HomePage            = lazy(() => import('./pages/HomePage'));
const CollectionPage      = lazy(() => import('./pages/CollectionPage'));
const ProductPage         = lazy(() => import('./pages/ProductPage'));
const WishlistPage        = lazy(() => import('./pages/WishlistPage'));
const AccountPage         = lazy(() => import('./pages/AccountPage'));
const AboutPage           = lazy(() => import('./pages/AboutPage'));
const ExclusiveDesignsPage= lazy(() => import('./pages/ExclusiveDesignsPage'));
const GrownDiamondsPage   = lazy(() => import('./pages/GrownDiamondsPage'));
const BespokePage         = lazy(() => import('./pages/BespokePage'));
const ContactPage         = lazy(() => import('./pages/ContactPage'));
const AdminPage           = lazy(() => import('./pages/AdminPage'));
const CraftsmanshipPage   = lazy(() => import('./pages/CraftsmanshipPage'));
const SearchOverlay       = lazy(() => import('./components/search/SearchOverlay'));
const ProductQuickViewModal = lazy(() => import('./components/product/ProductQuickViewModal'));
const Header              = lazy(() => import('./components/layout/Header'));
const Footer              = lazy(() => import('./components/layout/Footer'));

function GlobalSearch() {
  const { searchOpen, toggleSearch } = useUI();
  const navigate = useNavigate();

  return (
    <SearchOverlay
      open={searchOpen}
      onClose={toggleSearch}
      onNavigate={(path) => navigate(path)}
    />
  );
}

function GlobalProductModal() {
  const { quickViewProduct, closeQuickView } = useUI();

  return (
    <ProductQuickViewModal
      product={quickViewProduct}
      isOpen={Boolean(quickViewProduct)}
      onClose={closeQuickView}
    />
  );
}

function BrandedFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF6F1',
        color: '#5D0A24',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <span style={{ fontSize: '1.8rem', color: '#C6A15B', marginBottom: 12 }}>✦</span>
      <span style={{ fontSize: '1.35rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Carats by Grace
      </span>
      <span
        style={{
          fontSize: '0.72rem',
          fontFamily: "'Jost', sans-serif', system-ui",
          color: '#7A6F70',
          letterSpacing: '0.28em',
          marginTop: 6,
        }}
      >
        FINE GROWN DIAMOND JEWELLERY · MAHANAGAR, LUCKNOW
      </span>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      {!isHome && <Header />}
      <Routes>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/collections"            element={<CollectionPage />} />
        <Route path="/collections/:slug"      element={<CollectionPage />} />
        <Route path="/products/:slug"         element={<ProductPage />} />
        <Route path="/product/:slug"          element={<ProductPage />} />
        <Route path="/exclusive-designs"      element={<ExclusiveDesignsPage />} />
        <Route path="/designs-that-never-repeat" element={<ExclusiveDesignsPage />} />
        <Route path="/grown-diamonds"        element={<GrownDiamondsPage />} />
        <Route path="/bespoke"               element={<BespokePage />} />
        <Route path="/contact"               element={<ContactPage />} />
        <Route path="/showroom"              element={<ContactPage />} />
        <Route path="/admin"                 element={<AdminPage />} />
        <Route path="/wishlist"               element={<WishlistPage />} />
        <Route path="/account"                element={<AccountPage />} />
        <Route path="/about"                  element={<AboutPage />} />
        <Route path="/about-us"               element={<AboutPage />} />
        <Route path="/craftsmanship"          element={<CraftsmanshipPage />} />
      </Routes>
      {!isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <UIProvider>
        <Suspense fallback={<BrandedFallback />}>
          {/* Global overlays & WhatsApp concierge */}
          <GlobalProductModal />
          <GlobalSearch />
          <FloatingWhatsApp />
          <AppRoutes />
        </Suspense>
      </UIProvider>
    </WishlistProvider>
  );
}

export default App;
