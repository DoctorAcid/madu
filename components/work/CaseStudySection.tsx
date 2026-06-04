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
    role: "Led full brand identity and site architecture, defining the visual language and art direction for a successful market entry.",
    keywords: ["UI/UX", "figma", "next.js", "Visual Branding"],
    images: [
      "/assets/images/work/vaasthira/1.jpg",
      "/assets/images/work/vaasthira/2.jpg",
      "/assets/images/work/vaasthira/3.jpg",
      "/assets/images/work/vaasthira/4.jpg",
      "/assets/images/work/vaasthira/5.jpg",
      "/assets/images/work/vaasthira/6.jpg",
      "/assets/images/work/vaasthira/8.jpg",
      "/assets/images/work/vaasthira/9.jpg",
    ],
  },
  {
    id: 2,
    title: "HMI Dashboard UI/UX Design",
    year: "2025",
    challenge:
      "Industrial dashboard that reduces cognitive load for 24/7 plant operators.",
    role: "Built a dark-theme design system purpose-built for 24/7 operator environments, with every screen optimised for clarity under high cognitive load.",
    keywords: ["UI/UX", "figma", "HMI", "Dashboard"],
    images: [
      "/assets/images/work/hmi/1.jpg",
      "/assets/images/work/hmi/2.jpg",
      "/assets/images/work/hmi/3.jpg",
      "/assets/images/work/hmi/4.jpg",
      "/assets/images/work/hmi/5.jpg",
      "/assets/images/work/hmi/6.jpg",
      "/assets/images/work/hmi/7.jpg",
      "/assets/images/work/hmi/8.jpg",
    ],
  },
  {
    id: 3,
    title: "Wave Website Redesign",
    year: "2026",
    challenge:
      "Redesigning a modern tech website that is visually appealing and user-friendly.",
    role: "Audited the existing site, restructured the information hierarchy, and rewrote every section using outcome-first copywriting principles. As a UI/UX Designer and Product Designer, I produced a fully coded high-fidelity prototype delivering an industry-grade visual identity.",
    keywords: ["UI/UX", "figma", "next.js", "Branding"],
    images: [
      "/assets/images/work/wave/1.jpg",
      "/assets/images/work/wave/2.jpg",
      "/assets/images/work/wave/3.jpg",
      "/assets/images/work/wave/4.jpg",
      "/assets/images/work/wave/5.jpg",
      "/assets/images/work/wave/6.jpg",
      "/assets/images/work/wave/7.jpg",
      "/assets/images/work/wave/8.jpg",
    ],
  },
  {
    id: 4,
    title: "Nego Mobile & Web Saas App Design",
    year: "2024",
    challenge:
      "A mobile and web app design for a new B2B negotiation platform that wanted to stand out in the market.",
    role: "Designed a comprehensive mobile and web app for a B2B negotiation platform, creating a unified visual identity and user experience. My role focused on crafting a scalable design system and ensuring consistency across both platforms.",
    keywords: ["UI/UX", "Mobile App", "Web App", "Saas"],
    images: [
      "/assets/images/work/nego/1.jpg",
      "/assets/images/work/nego/2.jpg",
      "/assets/images/work/nego/3.jpg",
      "/assets/images/work/nego/4.jpg",
      "/assets/images/work/nego/5.jpg",
      "/assets/images/work/nego/6.jpg",
      "/assets/images/work/nego/7.jpg",
      "/assets/images/work/nego/8.jpg",
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
  const [lightbox, setLightbox] = useState<{
    caseStudyIndex: number;
    imageIndex: number;
  } | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startY: 0, scrollTop: 0 });

  const onDragStart = (clientY: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    dragState.current = { active: true, startY: clientY, scrollTop: container.scrollTop };
    document.body.style.cursor = "grabbing";
  };

  const onDragMove = (clientY: number) => {
    const { active, startY, scrollTop } = dragState.current;
    if (!active || !scrollContainerRef.current) return;
    scrollContainerRef.current.scrollTop = scrollTop - (clientY - startY);
  };

  const onDragEnd = () => {
    dragState.current.active = false;
    document.body.style.cursor = "";
  };

  const currentImages = lightbox
    ? CASESTUDY_DATA[lightbox.caseStudyIndex].images
    : [];
  const currentAlt = lightbox
    ? CASESTUDY_DATA[lightbox.caseStudyIndex].title
    : "";

  const navigateLightbox = (dir: 1 | -1) => {
    if (!lightbox) return;
    const total = currentImages.length;
    const next = (lightbox.imageIndex + dir + total) % total;
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: next * container.clientHeight,
      behavior: "smooth",
    });
  };

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

  const lightboxOpen = lightbox !== null;

  // Fade-in when lightbox opens; stop/start Lenis scroll
  useEffect(() => {
    if (!lightboxOpen) return;
    window.dispatchEvent(new Event("lenis:stop"));
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    return () => {
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [lightboxOpen]);

  // Scroll to the clicked image immediately when lightbox opens
  useEffect(() => {
    if (!lightbox) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTop = lightbox.imageIndex * container.clientHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox?.caseStudyIndex]);

  // Track current image via IntersectionObserver as user scrolls
  useEffect(() => {
    if (!lightbox) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const items = Array.from(container.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target as HTMLElement);
            if (idx !== -1)
              setLightbox((prev) =>
                prev ? { ...prev, imageIndex: idx } : null,
              );
          }
        }
      },
      { root: container, threshold: 0.6 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox?.caseStudyIndex]);

  // ESC to close, arrow keys to navigate
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const closeLightbox = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setLightbox(null),
    });
  };

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
                      onClick={() =>
                        setLightbox({ caseStudyIndex: index, imageIndex: i })
                      }
                      className={`${COL[pattern[i]]} h-80 md:h-100 lg:h-120 relative overflow-hidden rounded-lg md:rounded-2xl group cursor-pointer`}
                    >
                      <div className="z-1 flex items-center justify-center absolute inset-0 bg-transparent group-hover:bg-black/30 backdrop-blur-0 group-hover:backdrop-blur-md transition-all duration-300">
                        <div className="w-12 h-12 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 10V6C2 3.79086 3.79086 2 6 2H10"
                              stroke="#FFEEE9"
                              strokeWidth="2"
                            />
                            <path
                              d="M2 38V42C2 44.2091 3.79086 46 6 46H10"
                              stroke="#FFEEE9"
                              strokeWidth="2"
                            />
                            <path
                              d="M46 10V6C46 3.79086 44.2091 2 42 2H38"
                              stroke="#FFEEE9"
                              strokeWidth="2"
                            />
                            <path
                              d="M46 38V42C46 44.2091 44.2091 46 42 46H38"
                              stroke="#FFEEE9"
                              strokeWidth="2"
                            />
                            <path
                              d="M27 27L33 33M22 29C18.134 29 15 25.866 15 22C15 18.134 18.134 15 22 15C25.866 15 29 18.134 29 22C29 25.866 25.866 29 22 29Z"
                              stroke="#FFEEE9"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
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

      {/* Lightbox */}
      {lightbox && (
        <div ref={overlayRef} className="fixed inset-0 z-400 bg-black/90">
          {/* Top bar: counter + close */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5 bg-linear-to-b from-black/60 to-transparent pointer-events-none">
            <p
              className="accent-text text-white/50 tabular-nums"
              style={{ fontSize: "14px" }}
            >
              <span
                className="text-primary-1"
                style={{ fontSize: "18px", fontFamily: "var(--font-nohemi)" }}
              >
                0{lightbox.imageIndex + 1}
              </span>{" "}
              / 0{currentImages.length}
            </p>
            <button
              onClick={closeLightbox}
              className="pointer-events-auto group flex items-center justify-center w-10 h-10 p-3 rounded-full bg-primary-5 hover:bg-primary-1 cursor-pointer transition-colors duration-300"
              aria-label="Close"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-primary-1 group-hover:stroke-primary-5 transition-colors duration-300"
              >
                <path
                  d="M1 1L17 17M17 1L1 17"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable image strip */}
          <div
            ref={scrollContainerRef}
            className="h-full overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
            onMouseDown={(e) => { e.preventDefault(); onDragStart(e.clientY); }}
            onMouseMove={(e) => onDragMove(e.clientY)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            {currentImages.map((src, i) => (
              <div
                key={i}
                className="h-screen w-full snap-center flex items-center justify-center px-6 md:px-20 py-20"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={currentAlt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
            {/* Prev button */}
            <button
              onClick={() => navigateLightbox(-1)}
              className="group/prev  flex items-center justify-center w-10 h-10 rounded-full bg-primary-5/10 hover:bg-primary-5 cursor-pointer transition-colors duration-300"
              aria-label="Previous image"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90 stroke-primary-5 group-hover/prev:stroke-primary-1 transition-colors duration-300"
              >
                <path
                  d="M10 13L5 8L10 3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={() => navigateLightbox(1)}
              className="group/next flex items-center justify-center w-10 h-10 rounded-full bg-primary-5/10 hover:bg-primary-5 cursor-pointer transition-colors duration-300"
              aria-label="Next image"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-90 stroke-primary-5 group-hover/next:stroke-primary-1 transition-colors duration-300"
              >
                <path
                  d="M6 3L11 8L6 13"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudySection;
