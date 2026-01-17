'use client';

import { useLanguage } from "../contexts/languageContext";
import { PageIntro } from "./pageIntro";

export function ProjectsContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageIntro 
        title={t.projects.title}
        subtitle={t.projects.subtitle}
        className="projects"
      />

      <section className="projects-grid">
        <div className="project-placeholder">
          <div className="placeholder-icon">🚀</div>
          <h3>{t.projects.comingSoon}</h3>
          <p>
            {t.projects.comingSoonDesc}
          </p>
        </div>

        {/* Ejemplo de estructura para cuando añada proyectos:
        <div className="project-card">
          <div className="project-header">
            <h3>Nombre del Proyecto</h3>
            <div className="project-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Demo</a>
              <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <p className="project-description">
            Descripción del proyecto y qué problemas resuelve.
          </p>
          <div className="project-tech">
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
          </div>
        </div>
        */}
      </section>
    </>
  );
}