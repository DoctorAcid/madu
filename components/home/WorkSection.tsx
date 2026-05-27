"use client";
import { useEffect, useRef } from "react";
import TextReveal from "../common/reveals/TextReveal";
import SecondaryButton from "../common/buttons/SecondaryButton";
import PrimaryWorkCard from "../common/cards/PrimaryWorkCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORK_DATA = [
  {
    id: 1,
    title: "Vaasthira Brand & Website",
    description:
      "E-commerce website design with GSAP animations for a conversion-ready experience.",
    image: "/assets/images/home/works/vaasthira-cover.jpg",
    hoverImage: "/assets/images/home/works/vaasthira-hover1.jpg",
    keywords: ["ui/ux", "figma", "next.js", "branding"],
    href: "/work/#vaasthira",
  },
  {
    id: 2,
    title: "SCADA HMI Design System",
    description:
      "Dark-themed industrial widget library with 50-symbol SVG components.",
    image: "/assets/images/home/works/hmi-cover.jpg",
    hoverImage: "/assets/images/home/works/hmi-hover1.jpg",
    keywords: ["Design system", "HMI"],
    href: "/work/#hmi",
  },
  {
    id: 3,
    title: "Nego Saas Mobile & Web App Design",
    description:
      "B2B SaaS mobile and web app for negotiations and procurement.",
    image: "/assets/images/home/works/nego-cover.jpg",
    hoverImage: "/assets/images/home/works/nego-hover1.jpg",
    keywords: ["ui/ux", "figma", "mobile app", "SaaS"],
    href: "/work/#nego",
  },
  {
    id: 4,
    title: "Wave Website Design",
    description: "Website redesign for commercial freeze dryer company.",
    image: "/assets/images/home/works/wave-cover.jpg",
    hoverImage: "/assets/images/home/works/wave-hover1.jpg",
    keywords: ["website", "ui/ux", "figma"],
    href: "/work/#wave",
  },
];

const WorkSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(cards, {
        y: 400,
        // rotateX: 28,
        // transformPerspective: 900,
        // transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "center 40%",
          scrub: 1.5,
        },
      });

      // Each card animates in sequence based on index
      cards.forEach((card, i) => {
        tl.to(card, { y: 0, ease: "power2.out", duration: 1 }, i * 0.2);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex flex-col gap-20 w-full p-20 max-w-[1920px] mx-auto">
      <div className="flex flex-col gap-3 w-full">
        <TextReveal className="w-full">
          <p className="eyebrow text-dark-gray-1">Projects I'm proud of</p>
        </TextReveal>
        <TextReveal delay={0.1} className="w-full max-w-[900px]">
          <h2 className="w-full text-primary-1">
            Passionate about the craft and little details
          </h2>
        </TextReveal>
        <SecondaryButton href="/work" arrow="right">
          All Works
        </SecondaryButton>
      </div>

      <div ref={gridRef} className="w-full grid grid-cols-2 gap-x-6 gap-y-20">
        {WORK_DATA.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <PrimaryWorkCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;
