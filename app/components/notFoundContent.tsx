'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/languageContext';

export function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-sm)',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '6rem', marginBottom: 'var(--spacing-sm)', fontWeight: 700 }}>
          404
        </h1>
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
          {t.notFound.title}
        </h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--color-text-light)',
          marginBottom: 'var(--spacing-md)',
        }}>
          {t.notFound.message}
        </p>
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link href="/" className="btn btn-primary" style={{ minWidth: '150px' }}>
            {t.notFound.goHome}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
            style={{ minWidth: '150px' }}
          >
            {t.notFound.back}
          </button>
        </div>
      </div>
    </>
  );
}