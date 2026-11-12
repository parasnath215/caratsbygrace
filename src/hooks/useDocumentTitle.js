import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) {
      document.title = `${title} | Carats by Grace — Fine Jewellery`;
    } else {
      document.title = 'Carats by Grace — Handcrafted Fine Jewellery';
    }
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

