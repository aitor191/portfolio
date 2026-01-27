'use client';

import { useLanguage } from "../contexts/languageContext";
import { PageIntro } from "./pageIntro";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: readonly string[];
  github: string;
  demo: string;
}

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
        {t.projects.list.map((project: Project) => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.title}</h3>
              <div className="project-links">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">{t.projects.viewGithub}</a>
                )}
              </div>
            </div>
            <p className="project-description">
              {project.description}
            </p>
            <div className="project-tech">
              {project.tech.map((tech: string) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}