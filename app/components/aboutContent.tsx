'use client';

import { useLanguage } from "../contexts/languageContext";
import { PageIntro } from "./pageIntro";

const COMPANY_HOPP = 'HOPP';
const COMPANY_KOPAR = 'KOPAR';

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageIntro
        title={t.about.title}
        subtitle={t.about.subtitle}
        className="about"
      />

      <section className="about-story">
        <h2>{t.about.storyTitle}</h2>
        <div className="about-content">
          <p>{t.about.story1}</p>
          <p>{t.about.story2}</p>
          <p>
            {t.about.story3} <strong>{COMPANY_KOPAR}</strong> {t.about.story3Middle} <strong>{COMPANY_HOPP}</strong>, {t.about.story3Part2}
          </p>
          <p>{t.about.story4}</p>
          <p>{t.about.story5}</p>
        </div>
      </section>

      <section className="about-goals">
        <h2>{t.about.goalsTitle}</h2>
        <div className="goals-grid">
          <div className="goal-card">
            <h3>{t.about.shortTerm}</h3>
            <p>{t.about.shortTermDesc}</p>
          </div>
          <div className="goal-card">
            <h3>{t.about.longTerm}</h3>
            <p>
              {t.about.longTermDesc} <strong>{t.about.cybersecurity}</strong> {t.about.longTermDesc2}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}