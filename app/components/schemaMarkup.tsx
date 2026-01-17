export function SchemaMarkup() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com';
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aitor",
    "jobTitle": "Desarrollador Web Fullstack Junior",
    "description": "Desarrollador web fullstack junior especializado en React, Next.js, Node.js. Experiencia internacional y proyectos modernos.",
    "url": baseUrl,
    "sameAs": [
      "https://linkedin.com/in/aitor-r-628504236/",
      "https://github.com/aitor191"
    ],
    "email": "rsaitor191@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Asturias",
      "addressCountry": "ES"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Web Development",
      "Full Stack Development"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aitor - Portfolio",
    "url": baseUrl,
    "description": "Portfolio de Aitor, desarrollador web fullstack junior",
    "author": {
      "@type": "Person",
      "name": "Aitor"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}