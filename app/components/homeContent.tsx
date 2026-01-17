'use client';

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "../contexts/languageContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Lazy load de SkillsSection 
const SkillsSection = dynamic(() => import("./skillsSection").then(mod => ({ default: mod.SkillsSection })), {
  loading: () => <div style={{ minHeight: '200px' }} />, // Placeholder mientras carga
  ssr: true, // Renderizar en servidor para SEO
});

export function HomeContent() {
  const { t } = useLanguage();
  const introAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const getSectionClassName = (isVisible: boolean) => 
    isVisible ? 'animate-in' : '';

  return (
    <>
      <section className="hero">
        <div className="hero-profile">
          <Image
            src="/profile.png"
            alt="Aitor - Desarrollador Web Fullstack"
            width={220}
            height={280}
            className="hero-image"
            priority
          />
        </div>
        <h1 className="hero-greeting">{t.home.greeting}</h1>
        <p className="hero-tagline">
          {t.home.tagline}
        </p>
        <div className="hero-buttons">
          <Link href="/projects" className="btn btn-primary">
            {t.home.viewProjects}
          </Link>
          <Link href="/about" className="btn btn-secondary">
            {t.home.knowHistory}
          </Link>
        </div>
      </section>
      
      <section 
        ref={introAnimation.ref}
        className={`intro ${getSectionClassName(introAnimation.isVisible)}`}
      >
        <p>
          {t.home.intro1}
        </p>
        <p>
          <Link href="/about">{t.home.discoverMore}</Link>
        </p>
      </section>
      
      <SkillsSection />
      
      <section 
        ref={ctaAnimation.ref}
        className={`cta ${getSectionClassName(ctaAnimation.isVisible)}`}
      >
        <h2>{t.home.thinkingHire}</h2>
        <p>
          {t.home.contactMe}
        </p>
        <Link href="/contact" className="btn btn-primary">
          {t.home.contactButton}
        </Link>
      </section>
    </>
  );
}