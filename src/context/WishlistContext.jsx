import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

const WishlistContext = createContext(null);

const INITIAL_WISHLIST = [
  {
    id: "r1",
    name: "The Aurelia Ring",
    cat: "Rings",
    spec: "18K Gold · 0.42 ct",
    price: 64000,
    inStock: true,
    img: "/assets/model1/m1_8252_final.jpg",
    hover: "/assets/model1/m1_8253_final.jpg",
  },
  {
    id: "r2",
    name: "Ruby Halo",
    cat: "Rings",
    spec: "Rose Gold · Ruby",
    price: 132000,
    inStock: true,
    lowStock: true,
    img: "/assets/model1/m1_8403_final.jpg",
    hover: "/assets/model1/m1_8425_final.jpg",
  },
  {
    id: "e2",
    name: "Petal Studs",
    cat: "Earrings",
    spec: "Rose Gold",
    price: 32000,
    inStock: true,
    img: "/assets/model2/m2_8126.jpg",
    hover: "/assets/model2/m2_8135.jpg",
  },
];

const STORAGE_KEY = 'cbg_wishlist_items_v1';

function getInitialItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    // ignore
  }
  return INITIAL_WISHLIST;
}

const initialState = { items: getInitialItems() };

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { items: [...state.items, action.product] };
    case 'REMOVE':
      return {
        items: state.items.filter(
          (i) => i.id !== action.id && i.name !== action.id
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      // ignore
    }
  }, [state.items]);

  const toggleWishlist = (product) => {
    const key = product.id || product.name;
    const exists = state.items.some(
      (i) => i.id === key || i.name === key || (product.name && i.name === product.name)
    );
    if (exists) {
      dispatch({ type: 'REMOVE', id: key });
    } else {
      dispatch({
        type: 'ADD',
        product: {
          ...product,
          id: product.id || product.name.toLowerCase().replace(/\s+/g, '-'),
        },
      });
    }
  };

  const isWishlisted = (idOrName) => {
    if (!idOrName) return false;
    return state.items.some(
      (i) => i.id === idOrName || i.name === idOrName
    );
  };

  const clearWishlist = () => dispatch({ type: 'CLEAR' });

  const value = useMemo(
    () => ({ items: state.items, toggleWishlist, isWishlisted, clearWishlist }),
    [state.items]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
