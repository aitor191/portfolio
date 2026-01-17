'use client';

import dynamic from "next/dynamic";
import { useLanguage } from "../contexts/languageContext";
import { PageIntro } from "./pageIntro";

// Lazy load de ContactForm (incluye EmailJS que es pesado)
const ContactForm = dynamic(() => import("./contactForm").then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div style={{ minHeight: '300px' }} />, // Placeholder mientras carga
  ssr: true, // Renderizar en servidor para SEO
});

export function ContactContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageIntro 
        title={t.contact.title}
        subtitle={t.contact.subtitle} 
        className="contact"
      />

      <section className="contact-methods">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h3>{t.contact.email}</h3>
            <p>{t.contact.emailDesc}</p>
            <a href="mailto:rsaitor191@gmail.com" className="contact-link">
              rsaitor191@gmail.com
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💼</div>
            <h3>{t.contact.linkedin}</h3>
            <p>{t.contact.linkedinDesc}</p>
            <a 
              href="https://linkedin.com/in/aitor-r-628504236/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              {t.contact.linkedinLink}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💻</div>
            <h3>{t.contact.github}</h3>
            <p>{t.contact.githubDesc}</p>
            <a 
              href="https://github.com/aitor191" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              {t.contact.githubLink}
            </a>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <ContactForm />
      </section>
    </>
  );
}