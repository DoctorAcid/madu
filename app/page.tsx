import type { Metadata } from "next";
import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";

export const metadata: Metadata = {
  title: "Madushan — UI/UX Designer & Frontend Developer",
  description:
    "Freelance UI/UX designer and React/Next.js developer based in Sri Lanka. Available for remote projects worldwide.",
  alternates: { canonical: "https://madushan.design/" },
  openGraph: {
    title: "Madushan — UI/UX Designer & Frontend Developer",
    description:
      "Freelance UI/UX designer and React/Next.js developer based in Sri Lanka. Available for remote projects worldwide.",
    url: "https://madushan.design/",
  },
  twitter: {
    title: "Madushan — UI/UX Designer & Frontend Developer",
    description:
      "Freelance UI/UX designer and React/Next.js developer based in Sri Lanka. Available for remote projects worldwide.",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Madushan",
  url: "https://madushan.design",
  jobTitle: "UI/UX Designer & Frontend Developer",
  description:
    "Freelance UI/UX designer and React/Next.js developer available for remote projects.",
  sameAs: [
    "https://www.linkedin.com/in/madushan-nagalingam-8549b7195",
    "https://github.com/DoctorAcid",
    "https://www.upwork.com/freelancers/~0141b99449f769937d",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <CTASection />
    </>
  );
}
