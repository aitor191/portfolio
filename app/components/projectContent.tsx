'use client';

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../contexts/languageContext";
import { PageIntro } from "./pageIntro";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: readonly string[];
  github: string;
  demo: string;
  badge: string;
  images: readonly string[];
}

function ProjectCarousel({ images, title }: { images: readonly string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="project-carousel">
      <div className="project-carousel-inner">
        <Image
          src={images[current]}
          alt={`${title} - captura ${current + 1}`}
          width={700}
          height={400}
          className="project-carousel-image"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            className="project-carousel-btn project-carousel-prev"
            onClick={prev}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <button
            className="project-carousel-btn project-carousel-next"
            onClick={next}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
          <div className="project-carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`project-carousel-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Ver imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
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
          <div key={project.id} className={`project-card ${project.badge ? 'project-featured' : ''}`}>
            {project.badge && (
              <span className="project-badge">{project.badge}</span>
            )}
            <ProjectCarousel images={project.images} title={project.title} />
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