import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  behavior?: ScrollBehavior;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ behavior = 'smooth' }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Window scroll
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior });
    }

    // If a scrollable main container exists, scroll it too
    const mainEl = document.querySelector('main') as HTMLElement | null;
    if (mainEl && typeof (mainEl as any).scrollTo === 'function') {
      (mainEl as any).scrollTo({ top: 0, left: 0, behavior });
    }
  }, [pathname, behavior]);

  return null;
};
