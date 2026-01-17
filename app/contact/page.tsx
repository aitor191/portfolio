import type { Metadata } from "next";
import { ContactContent } from "../components/contactContent";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Aitor, desarrollador web fullstack junior. Email, GitHub y LinkedIn disponibles para proyectos y oportunidades laborales.",
  keywords: ["contacto", "desarrollador web", "contratar desarrollador", "freelance", "oportunidades laborales"],
  openGraph: {
    title: "Contacto - Aitor",
    description: "Contacta con Aitor para proyectos y oportunidades laborales en desarrollo web.",
    url: "/contact",
  },
};

export default function Contact() {
  return <ContactContent />;
}