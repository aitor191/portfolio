'use client';

import { useLanguage } from "../contexts/languageContext";
import { FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

// URLs de redes sociales
const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/aitor-r-628504236/',
  github: 'https://github.com/aitor191',
  cvUrl: '/cv.pdf', // Coloca tu CV en la carpeta public
};

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-enhanced">
      <div className="footer-content">
        <div className="footer-social">
          <h4 className="footer-title">{t.footer.socialTitle}</h4>
          <div className="footer-links">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.footer.linkedin} - abre en nueva pestaña`}
              className="footer-link"
            >
              <FaLinkedin aria-hidden="true" />
              <span>{t.footer.linkedin}</span>
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.footer.github} - abre en nueva pestaña`}
              className="footer-link"
            >
              <FaGithub aria-hidden="true" />
              <span>{t.footer.github}</span>
            </a>
          </div>
        </div>

        <div className="footer-cv">
          <a
            href={SOCIAL_LINKS.cvUrl}
            download
            className="footer-cv-link"
            aria-label={t.footer.downloadCV}
          >
            <FaFileDownload aria-hidden="true" />
            <span>{t.footer.downloadCV}</span>
          </a>
        </div>

        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Portfolio. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}