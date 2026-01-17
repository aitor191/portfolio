import Link from "next/link";
import type { Metadata } from "next";
import { HomeContent } from "./components/homeContent";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Desarrollador web fullstack junior con experiencia internacional. Especializado en React, Next.js, Node.js y TypeScript. Portfolio profesional.",
  keywords: ["desarrollador web", "fullstack developer", "React developer", "Next.js", "portfolio", "Asturias", "Islandia"],
  openGraph: {
    title: "Aitor - Desarrollador Web Fullstack Junior",
    description: "Desarrollador web fullstack junior con experiencia internacional. Especializado en tecnologías modernas.",
    url: "/",
  },
};

export default function Home() {
  return <HomeContent />;
}