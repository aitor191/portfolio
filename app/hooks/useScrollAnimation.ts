'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface UseScrollAnimationReturn {
  ref: RefObject<HTMLElement | null>;
  isVisible: boolean;
}

const INTERSECTION_OPTIONS = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
} as const;

export function useScrollAnimation(): UseScrollAnimationReturn {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      INTERSECTION_OPTIONS
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return { ref, isVisible };
}