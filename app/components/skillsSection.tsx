'use client';

import { useLanguage } from '../contexts/languageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiHtml5, 
  SiCss3,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiMongodb,
  SiPostgresql
} from 'react-icons/si';

const skills = [
  {
    category: 'frontend',
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
    ],
  },
  {
    category: 'backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    ],
  },
  {
    category: 'databases',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    category: 'tools',
    items: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
    ],
  },
];

export function SkillsSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const getCategoryLabel = (categoryKey: string): string => {
    const categories = t.home.techCategories;
    return categories[categoryKey as keyof typeof categories] || categoryKey;
  };

  return (
    <section 
      ref={ref}
      className={`skills-section ${isVisible ? 'animate-in' : ''}`}
    >
      <h2>{t.home.techStack}</h2>
      <div className="skills-grid">
        {skills.map((category) => (
          <div key={category.category} className="skill-category">
            <h3>{getCategoryLabel(category.category)}</h3>
            <div className="skills-list">
              {category.items.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-icon" style={{ color: skill.color }}>
                      <Icon />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}