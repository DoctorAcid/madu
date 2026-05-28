"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryBadge from "../common/badges/PrimaryBadge";

gsap.registerPlugin(ScrollTrigger);

// Safelist: col-span-1 col-span-2 col-span-3 col-span-4
const COL: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

// Each row's col-spans must sum to 4 (4-column grid).
// 8 images per case study, 3 rows.
const BENTO_PATTERNS: number[][] = [
  //  Row 1         Row 2         Row 3
  [2, 1, 1, 1, 1, 2, 2, 2], // A: wide-left / wide-right / double-wide
  [2, 2, 1, 1, 1, 1, 2, 2], // B: symmetric wide / four narrow / symmetric wide
  [1, 1, 2, 2, 1, 1, 2, 2], // C: wide-right / wide-left / double-wide
  [3, 1, 1, 1, 2, 2, 1, 1], // D: hero / mixed / mixed
];

const PAGENATION_LIST: string[] = ["Vaasthira", "HMI", "Wave", "Nego"];

const CASESTUDY_DATA = [
  {
    id: 1,
    title: "Vaasthira Brand & Website",
    year: "2026",
    challenge:
      "E-commerce website design with GSAP animations for a conversion-ready experience.",
    role: "E-commerce website design with GSAP animations for a conversion-ready experience.",
    keywords: ["UI/UX", "figma", "next.js", "Branding"],
    images: [
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
    ],
  },
  {
    id: 2,
    title: "Vaasthira Brand & Website",
    year: "2026",
    challenge:
      "E-commerce website design with GSAP animations for a conversion-ready experience.",
    role: "E-commerce website design with GSAP animations for a conversion-ready experience.",
    keywords: ["UI/UX", "figma", "next.js", "Branding"],
    images: [
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
      "/assets/images/home/works/hmi-cover.jpg",
    ],
  },
  {
    id: 3,
    title: "Vaasthira Brand & Website",
    year: "2026",
    challenge:
      "E-commerce website design with GSAP animations for a conversion-ready experience.",
    role: "E-commerce website design with GSAP animations for a conversion-ready experience.",
    keywords: ["UI/UX", "figma", "next.js", "Branding"],
    images: [
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
      "/assets/images/home/works/wave-cover.jpg",
    ],
  },
  {
    id: 4,
    title: "Vaasthira Brand & Website",
    year: "2026",
    challenge:
      "E-commerce website design with GSAP animations for a conversion-ready experience.",
    role: "E-commerce website design with GSAP animations for a conversion-ready experience.",
    keywords: ["UI/UX", "figma", "next.js", "Branding"],
    images: [
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
      "/assets/images/home/works/nego-cover.jpg",
    ],
  },
];

const PentagonIcon = ({ className }: { className?: string }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : "fill-primary-5"}
  >
    <path d="M4.17978 0.381995C4.88075 -0.127293 5.82994 -0.127293 6.53092 0.381995L9.88612 2.81969C10.5871 3.32898 10.8804 4.23171 10.6127 5.05576L9.33109 9.00003C9.06334 9.82407 8.29543 10.382 7.42897 10.382H3.28172C2.41527 10.382 1.64736 9.82407 1.37961 9.00003L0.0980358 5.05576C-0.169713 4.23171 0.123604 3.32898 0.824578 2.81969L4.17978 0.381995Z" />
  </svg>
);

const CaseStudySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          onEnter: () => setActiveIndex(i),
          onLeaveBack: () => setActiveIndex(Math.max(0, i - 1)),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="grid grid-cols-12 w-full gap-6 p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 relative">
      {/* Pagination */}
      <div className="col-span-2 hidden md:flex h-screen flex-col sticky top-0 justify-center gap-4">
        {PAGENATION_LIST.map((name, index) => (
          <button
            key={index}
            onClick={() =>
              sectionRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="flex items-center text-left"
          >
            {index === activeIndex ? (
              <div className="w-fit flex items-center gap-2 py-3 pl-3 pr-4 bg-primary-1 rounded-full transition-all duration-300">
                <div className="w-3 h-3 shrink-0 flex items-center justify-center">
                  <PentagonIcon />
                </div>
                <p
                  className="accent-text text-primary-5"
                  style={{ fontSize: "14px" }}
                >
                  {name}
                </p>
              </div>
            ) : (
              <div className="group cursor-pointer w-fit flex items-center gap-2 py-3 pl-3 pr-4 transition-all duration-300">
                <div className="w-3 h-3 shrink-0 flex items-center justify-center">
                  <PentagonIcon />
                </div>
                <p
                  className="accent-text text-dark-gray-2 group-hover:text-primary-1 transition-color ease-in-out duration-300"
                  style={{ fontSize: "14px" }}
                >
                  {name}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Case Study Content */}
      <div className="w-full col-span-12 lg:col-span-10 flex flex-col gap-8">
        <div className="flex flex-col w-full">
          {CASESTUDY_DATA.map((item, index) => {
            const pattern =
              BENTO_PATTERNS[(item.id - 1) % BENTO_PATTERNS.length];

            return (
              <div
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                id={PAGENATION_LIST[index].toLowerCase()}
                className="w-full flex flex-col gap-8 py-12 md:py-16 lg:py-20"
                key={index}
              >
                {/* Meta row */}
                <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="w-full flex flex-col gap-2">
                    <p className="eyebrow text-dark-gray-2">//0{item.id}</p>
                    <h5 className="text-primary-1">{item.title}</h5>
                    <p className="eyebrow text-black-1">{item.year}</p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-black-1">Challenge</p>
                    <p className="text-dark-gray-1">{item.challenge}</p>
                  </div>
                  <div className="w-full flex flex-row flex-wrap md:flex-col gap-2">
                    {item.keywords.map((keyword, i) => (
                      <PrimaryBadge key={i} text={keyword} />
                    ))}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <p className="text-black-1">Role</p>
                    <p className="text-dark-gray-1">{item.role}</p>
                  </div>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2 lg:gap-3">
                  {item.images.map((image, i) => (
                    <div
                      key={i}
                      className={`${COL[pattern[i]]} h-80 md:h-100 lg:h-120 relative overflow-hidden rounded-lg md:rounded-2xl group`}
                    >
                      <Image
                        src={image}
                        alt={item.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1280px) 60vw, 80vw"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
