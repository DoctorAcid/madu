"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../common/reveals/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Websites & Landing pages",
    description:
      "Creating high-end and beautiful websites built to perform and convert.",
    image: [
      "/assets/images/work/vaasthira/5.jpg",
      "/assets/images/work/wave/5.jpg",
      "/assets/images/home/works/vaasthira-cover.jpg",
    ],
  },
  {
    id: 2,
    title: "Saas/Mobile App Design",
    description:
      "Creating high-perfomance and quality Saas and mobile apps built to perform and convert.",
    image: [
      "/assets/images/work/nego/2.jpg",
      "/assets/images/work/hmi/1.jpg",
      "/assets/images/work/nego/7.jpg",
    ],
  },
  {
    id: 3,
    title: "Visual Branding",
    description:
      "Helping brands find a distinctive visual language that truly stands out.",
    image: [
      "/assets/images/work/nego/1.jpg",
      "/assets/images/work/vaasthira/2.jpg",
      "/assets/images/work/wave/4.jpg",
    ],
  },
  {
    id: 4,
    title: "Web & Front-end Development",
    description:
      "Building elegant and responsive projects featuring creative micro-interactions and seamless CMS hand-off.",
    image: [
      "/assets/images/work/vaasthira/3.jpg",
      "/assets/images/work/wave/2.jpg",
      "/assets/images/work/nego/4.jpg",
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
      const isMobile = window.innerWidth < 768;

      rowRefs.current.forEach((row, si) => {
        if (!row) return;

        const all = [0, 1, 2]
          .map((i) => imageRefs.current[si][i])
          .filter(Boolean) as HTMLDivElement[];

        if (!all.length) return;

        gsap.set(all, {
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

        if (isMobile) {
          // Single column — all images animate together from the same direction
          tl.to(all, { rotateX: 0, y: 0, ease: "power2.out", duration: 1 }, 0);
        } else {
          // Three columns — center finishes first, sides together after
          const center = imageRefs.current[si][1];
          const sides = [
            imageRefs.current[si][0],
            imageRefs.current[si][2],
          ].filter(Boolean) as HTMLDivElement[];
          if (!center) return;
          tl.to(
            center,
            { rotateX: 0, y: 0, ease: "power2.out", duration: 0.55 },
            0,
          );
          tl.to(
            sides,
            { rotateX: 0, y: 0, ease: "power2.out", duration: 1 },
            0,
          );
        }
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
          <TextReveal>
            <p className="eyebrow text-dark-gray-1">Design Expert</p>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h2 className="text-primary-1">End-to-end,from idea to launch</h2>
          </TextReveal>
        </div>
        <TextReveal delay={0.4} splitBy="words">
          <p className="max-w-[600px]">
            I work across the full product lifecycle — from early research and
            wireframes through to pixel-perfect design and production-ready
            code.
          </p>
        </TextReveal>
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
              <TextReveal splitBy="words">
                <h4 className="text-dark-gray-1">{item.title}</h4>
              </TextReveal>
              <TextReveal splitBy="words" delay={0.2}>
                <p className="text-primary-2">{item.description}</p>
              </TextReveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 md:gap-4 lg:gap-6">
              {item.image.map((img, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    imageRefs.current[si][i] = el;
                  }}
                  className="w-full aspect-video relative rounded-2xl overflow-hidden"
                >
                  <div className="z-10 absolute right-0 bottom-[70px]">
                    <svg
                      width="29"
                      height="69"
                      viewBox="0 0 29 69"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-primary-5 transition-all ease-out duration-300"
                    >
                      <path
                        d="M29 40.2949L0.294922 69H0.175781C17.8359 51.551 28.8307 27.3729 29 0.625V40.2949Z"
                        fill=""
                      />
                    </svg>
                  </div>

                  <div className="z-10 absolute -bottom-[1px] right-[70px]">
                    <svg
                      width="69"
                      height="29"
                      viewBox="0 0 69 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-primary-5 transition-all ease-out duration-300"
                    >
                      <path
                        d="M40.6794 28.4337H0.0842451L0 28.3494C24.8259 28.4987 49.6969 19.1767 68.7302 0.382812L40.6794 28.4337Z"
                        fill=""
                      />
                    </svg>
                  </div>

                  <div className="z-10 absolute -top-[1px] left-[70px]">
                    <svg
                      width="69"
                      height="30"
                      viewBox="0 0 69 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-primary-5 transition-all ease-out duration-300"
                    >
                      <path
                        d="M28.9131 0.984375L0.208008 29.6895L0.208008 29.8086C17.657 12.1485 41.8351 1.15368 68.583 0.984375L28.9131 0.984375Z"
                        fill=""
                      />
                    </svg>
                  </div>

                  <div className="z-10 absolute top-[70px] -left-[1px]">
                    <svg
                      width="29"
                      height="69"
                      viewBox="0 0 29 69"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-primary-5 transition-all ease-out duration-300"
                    >
                      <path
                        d="M0.339844 28.0938L0.339846 68.6889L0.424091 68.7732C0.2748 43.9473 9.59679 19.0763 28.3907 0.0429688L0.339844 28.0938Z"
                        fill=""
                      />
                    </svg>
                  </div>
                  <div className="shape-container w-full aspect-video relative overflow-hidden">
                    <Image
                      src={img}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
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
