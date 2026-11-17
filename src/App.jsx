import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider, useUI } from './context/UIContext';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import BrandLogo from './components/ui/BrandLogo';

const HomePage            = lazy(() => import('./pages/HomePage'));
const CollectionPage      = lazy(() => import('./pages/CollectionPage'));
const ProductPage         = lazy(() => import('./pages/ProductPage'));
const WishlistPage        = lazy(() => import('./pages/WishlistPage'));
const AccountPage         = lazy(() => import('./pages/AccountPage'));
const AboutPage           = lazy(() => import('./pages/AboutPage'));
const ExclusiveCollectionPage = lazy(() => import('./pages/ExclusiveCollectionPage'));
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
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF6F1',
      }}
    >
      <BrandLogo variant="stacked-dark" height={88} alt="Carats by Grace" />
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
      <Header />
      <Routes>
        <Route path="/"                       element={<HomePage />} />
        <Route path="/collections"            element={<CollectionPage />} />
        <Route path="/collections/:slug"      element={<CollectionPage />} />
        <Route path="/products/:slug"         element={<ProductPage />} />
        <Route path="/product/:slug"          element={<ProductPage />} />
        <Route path="/exclusive-collection"   element={<ExclusiveCollectionPage />} />
        <Route path="/the-exclusive-collection" element={<ExclusiveCollectionPage />} />
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
