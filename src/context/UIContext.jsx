import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('cbg_announcement_dismissed') !== 'true';
      } catch (e) {
        return true;
      }
    }
    return true;
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const toggleSearch = useCallback(
    () => setSearchOpen((prev) => !prev),
    []
  );

  const dismissAnnouncement = useCallback(() => {
    setAnnouncementVisible(false);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('cbg_announcement_dismissed', 'true');
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const value = useMemo(
    () => ({
      searchOpen,
      announcementVisible,
      quickViewProduct,
      toggleSearch,
      dismissAnnouncement,
      openQuickView,
      closeQuickView,
    }),
    [searchOpen, announcementVisible, quickViewProduct, toggleSearch, dismissAnnouncement, openQuickView, closeQuickView]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
