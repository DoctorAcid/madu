import AboutSection from "@/components/home/AboutSection";
import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/home/hero.jpg"
        type="image/webp"
        fetchPriority="high"
      />
      <div className="">
        <main className="">
          <HeroSection />
          <WorkSection />
          <AboutSection />
          <ServicesSection />
          <CTASection />
        </main>
      </div>
    </>
  );
}
