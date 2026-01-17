'use client';

import { useCallback } from 'react';

// Declarar gtag para TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function useAnalytics() {
  const trackEvent = useCallback(({ action, category, label, value }: EventParams) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_path: url,
      });
    }
  }, []);

  const trackContactFormSubmit = useCallback(() => {
    trackEvent({
      action: 'submit',
      category: 'Contact Form',
      label: 'Contact form submitted successfully',
    });
  }, [trackEvent]);

  const trackNavClick = useCallback((linkName: string) => {
    trackEvent({
      action: 'click',
      category: 'Navigation',
      label: linkName,
    });
  }, [trackEvent]);

  const trackThemeChange = useCallback((theme: string) => {
    trackEvent({
      action: 'change',
      category: 'Theme',
      label: theme,
    });
  }, [trackEvent]);

  const trackLanguageChange = useCallback((language: string) => {
    trackEvent({
      action: 'change',
      category: 'Language',
      label: language,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackContactFormSubmit,
    trackNavClick,
    trackThemeChange,
    trackLanguageChange,
  };
}
