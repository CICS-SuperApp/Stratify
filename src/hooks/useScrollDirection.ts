import { useState, useEffect, useRef } from 'react';

export function useScrollDirection(threshold = 100) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const pastThreshold = currentScrollY > threshold;
      setIsPastThreshold(pastThreshold);

      if (pastThreshold) {
        if (currentScrollY > lastScrollY.current + 5) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY.current - 5) {
          setScrollDirection('up');
        }
      } else {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollDirection, isPastThreshold };
}
