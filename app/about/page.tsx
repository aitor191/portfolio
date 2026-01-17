import type { Metadata } from "next";
import { AboutContent } from "../components/aboutContent";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Conoce la historia de Aitor: de Asturias a Islandia, ahora desarrollador web fullstack. Trayectoria única y objetivos profesionales.",
  keywords: ["sobre mí", "biografía", "desarrollador Asturias", "experiencia internacional", "Islandia"],
  openGraph: {
    title: "Sobre mí - Aitor",
    description: "Conoce la historia de Aitor: de Asturias a Islandia, ahora desarrollador web fullstack.",
    url: "/about",
  },
};

export default function About() {
  return <AboutContent />;
}