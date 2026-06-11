"use client";
import { useEffect, useRef } from "react";
import TextReveal from "../common/reveals/TextReveal";
import SecondaryButton from "../common/buttons/SecondaryButton";
import PrimaryWorkCard from "../common/cards/PrimaryWorkCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../common/reveals/ScrollReveal";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const grid1Ref = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      const grid1 = grid1Ref.current;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      gsap.set(cards, {
        y: isMobile ? 200 : 400,
        x: isMobile ? 20 : 100,
      });

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          x: 0,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "center 40%",
            scrub: 1.5,
          },
          // delay: i * 0.2,
          stagger: 0.2,
        });
      });

      if (!isMobile && grid1) {
        gsap.set(grid1, { y: 400 });

        gsap.to(grid1, {
          y: 0,
          scrollTrigger: {
            trigger: grid1,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    });
    if (circle1Ref.current && sectionRef.current) {
      gsap.set(circle1Ref.current, {
        y: -400,
        x: 200,
        scale: 1,
        rotate: 360,
      });
      gsap.set(circle2Ref.current, {
        y: -400,
        x: 200,
        scale: 1,
        rotate: 360,
      });

      const circleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          markers: true,
        },
      });

      circleTl
        .to([circle1Ref.current, circle2Ref.current], {
          y: 400,
          x: -20,
          rotate: 0,
          scale: 1.2,
          ease: "none",
          duration: 1,
        })
        .to(circle1Ref.current, {
          y: 800,
          x: 400,
          rotate: -180,
          scale: 1.4,
          ease: "none",
          duration: 1,
        });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col md:flex-row w-full pt-12 lg:pt-0 max-w-[1920px] mx-auto"
    >
      {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div
          ref={circle1Ref}
          className="w-240 aspect-square rounded-full border border-dashed border-black/50"
        />
        <div
          ref={circle2Ref}
          className="absolute w-200 aspect-square rounded-full border border-dashed border-black/50"
        />
      </div> */}
      <div className="md:absolute md:h-full max-w-3/4 right-0 top-0 p-4 md:pr-8 lg:pr-12 xl:pr-16 2xl:pr-20 md:pt-8 lg:pt-12 xl:pt-16 2xl:pt-20">
        <div className="sticky md:top-12 self-start">
          {/* <TextReveal delay={0.1} className="w-full"> */}
          <ScrollReveal containerClassName="md:pb-120">
            Built with intention. Shipped with precision.
          </ScrollReveal>
          {/* </TextReveal> */}
        </div>
      </div>
      <div className="relative md:sticky top-0 md:top-12 self-start flex flex-col gap-3 w-fit max-w-[360px] p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
        <TextReveal className="w-full">
          <p className="eyebrow text-dark-gray-1 text-nowrap">Featured Works</p>
        </TextReveal>

        <SecondaryButton href="/work" arrow="right">
          All Works
        </SecondaryButton>
      </div>

      <div
        ref={gridRef}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:pr-8 lg:pr-12 xl:pr-16 2xl:pr-20 pt-4 md:pt-8 lg:pt-12 xl:pt-16 2xl:pt-20 overflow-hidden"
      >
        <div className="flex flex-col gap-6 col-span-1">
          {WORK_DATA.map((item, i) => {
            if (i % 2 === 0) {
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                >
                  <PrimaryWorkCard item={item} />
                </div>
              );
            }
          })}
        </div>
        <div
          ref={grid1Ref}
          className="flex flex-col gap-6 col-span-1 mt-0 md:mt-20 pb-0 md:pb-40"
        >
          {WORK_DATA.map((item, i) => {
            if (i % 2 === 1) {
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                >
                  <PrimaryWorkCard item={item} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
