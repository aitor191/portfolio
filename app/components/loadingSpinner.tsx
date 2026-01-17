'use client';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export function LoadingSpinner({ size = 'medium', text }: LoadingSpinnerProps) {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '60px',
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="loading-spinner-container" role="status" aria-live="polite">
      <div 
        className="loading-spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
        }}
        aria-hidden="true"
      />
      {text && <p className="loading-text">{text}</p>}
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export default LoadingSpinner;
