'use client';

interface PageIntroProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function PageIntro({ title, subtitle, className = '' }: PageIntroProps) {
  // Generar clases CSS: si className es "about", genera "about-intro" y "about-subtitle"
  const baseClass = className || 'page';
  const sectionClass = baseClass.includes('-intro') 
    ? baseClass 
    : `${baseClass}-intro`;
  const subtitleClass = `${baseClass}-subtitle`;

  return (
    <section className={sectionClass}>
      <h1>{title}</h1>
      <p className={subtitleClass}>{subtitle}</p>
    </section>
  );
}