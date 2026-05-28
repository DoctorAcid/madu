"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Websites & Landing pages",
    description:
      "Creating high-end and beautiful websites built to perform and convert.",
    image: [
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
    ],
  },
  {
    id: 2,
    title: "Saas/Mobile App Design",
    description:
      "Creating high-end and beautiful websites built to perform and convert.",
    image: [
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
    ],
  },
  {
    id: 3,
    title: "Visual Branding",
    description:
      "Helping brands find a distinctive visual language that truly stands out.",
    image: [
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
    ],
  },
  {
    id: 4,
    title: "Web & Front-end Development",
    description:
      "Building elegant and responsive projects featuring creative micro-interactions and seamless CMS hand-off.",
    image: [
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
    ],
  },
];

const ServicesSection = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[][]>(
    Array.from({ length: services.length }, () => []),
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, si) => {
        if (!row) return;

        const center = imageRefs.current[si][1];
        const sides = [
          imageRefs.current[si][0],
          imageRefs.current[si][2],
        ].filter(Boolean) as HTMLDivElement[];

        if (!center) return;

        gsap.set([center, ...sides], {
          rotateX: 80,
          y: 100,
          transformPerspective: 900,
          transformOrigin: "50% 60%",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "center 45%",
            scrub: 1.5,
          },
        });

        // Center finishes first — shorter duration
        tl.to(
          center,
          { rotateX: 0, y: 0, ease: "power2.out", duration: 0.55 },
          0,
        );
        // Sides finish together after center
        tl.to(sides, { rotateX: 0, y: 0, ease: "power2.out", duration: 1 }, 0);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col gap-20 pt-20 overflow-hidden"
    >
      <div className="w-full flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4">
          <p className="eyebrow text-dark-gray-1">Design Expert</p>
          <h2 className="text-primary-1">End-to-end,from idea to launch</h2>
        </div>
        <p className="max-w-[600px]">
          I work across the full product lifecycle — from early research and
          wireframes through to pixel-perfect design and production-ready code.
        </p>
      </div>

      <div className="flex flex-col gap-24 md:gap-32 lg:gap-40 xl:gap-52 2xl:gap-60 w-full">
        {services.map((item, si) => (
          <div
            key={item.id}
            ref={(el) => {
              rowRefs.current[si] = el;
            }}
            className="flex flex-col gap-8 items-center text-center"
          >
            <div className="flex flex-col gap-4 max-w-[400px]">
              <h4 className="text-dark-gray-1">{item.title}</h4>
              <p className="text-primary-2">{item.description}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-2 md:gap-4 lg:gap-6">
              {item.image.map((img, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    imageRefs.current[si][i] = el;
                  }}
                  className="w-full aspect-video relative rounded-2xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
