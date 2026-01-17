'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './contexts/languageContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log del error para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-sm)',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>
          ⚠️
        </h1>
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
          {t.error.title}
        </h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--color-text-light)',
          marginBottom: 'var(--spacing-md)',
        }}>
          {t.error.message}
        </p>
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={reset}
            className="btn btn-primary"
            style={{ minWidth: '150px' }}
          >
            {t.error.tryAgain}
          </button>
          <Link href="/" className="btn btn-secondary" style={{ minWidth: '150px' }}>
            {t.error.goHome}
          </Link>
        </div>
        {process.env.NODE_ENV === 'development' && error.digest && (
          <p style={{
            marginTop: 'var(--spacing-md)',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            fontFamily: 'monospace',
          }}>
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </>
  );
}