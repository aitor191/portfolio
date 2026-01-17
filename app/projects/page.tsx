import type { Metadata } from "next";
import { ProjectsContent } from "../components/projectContent";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Portfolio de proyectos de Aitor. Proyectos web desarrollados con React, Next.js, Node.js y otras tecnologías modernas.",
  keywords: ["proyectos", "portfolio", "desarrollo web", "React proyectos", "Next.js proyectos", "aplicaciones web"],
  openGraph: {
    title: "Proyectos - Aitor",
    description: "Portfolio de proyectos web desarrollados con tecnologías modernas.",
    url: "/projects",
  },
};

export default function Projects() {
  return <ProjectsContent />;
}