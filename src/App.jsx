import React, { Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider, useUI } from './context/UIContext';

const HomePage       = lazy(() => import('./pages/HomePage'));
const CollectionPage = lazy(() => import('./pages/CollectionPage'));
const ProductPage    = lazy(() => import('./pages/ProductPage'));
const WishlistPage   = lazy(() => import('./pages/WishlistPage'));
const AccountPage    = lazy(() => import('./pages/AccountPage'));
const CartDrawer     = lazy(() => import('./components/cart/CartDrawer'));
const SearchOverlay  = lazy(() => import('./components/search/SearchOverlay'));
const ProductQuickViewModal = lazy(() => import('./components/product/ProductQuickViewModal'));
const Header         = lazy(() => import('./components/layout/Header'));
const Footer         = lazy(() => import('./components/layout/Footer'));

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

function GlobalCart() {
  const { items, isOpen, toggleCart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <CartDrawer
      open={isOpen}
      items={items}
      onClose={toggleCart}
      onQtyChange={updateQty}
      onRemove={removeItem}
      onContinueShopping={() => {
        toggleCart();
        navigate('/collections/rings');
      }}
      onCheckout={() => {
        toggleCart();
        navigate('/account');
      }}
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
        color: '#7B1E3A',
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
          fontFamily: "'Jost', sans-serif",
          color: '#7A6F70',
          letterSpacing: '0.28em',
          marginTop: 6,
        }}
      >
        FINE JEWELLERY · ATELIER
      </span>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && <Header />}
      <Routes>
        <Route path="/"                   element={<HomePage />} />
        <Route path="/collections"        element={<CollectionPage />} />
        <Route path="/collections/:slug"  element={<CollectionPage />} />
        <Route path="/products/:slug"     element={<ProductPage />} />
        <Route path="/product/:slug"      element={<ProductPage />} />
        <Route path="/wishlist"           element={<WishlistPage />} />
        <Route path="/account"            element={<AccountPage />} />
      </Routes>
      {!isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <UIProvider>
          <Suspense fallback={<BrandedFallback />}>
            {/* Global overlays — always mounted, toggled by context */}
            <GlobalProductModal />
            <GlobalCart />
            <GlobalSearch />
            <AppRoutes />
          </Suspense>
        </UIProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
