"use client";

import React, { useEffect, useRef } from "react";
import PixelTrail from "../common/shaders/PixelTrail";
import DesignDirector from "@/public/assets/svg/DesignDirector";
import TextReveal from "../common/reveals/TextReveal";
import ContentReveal from "../common/reveals/ContentReveal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import CircularText from "../common/reveals/CircularText";
import HeroImg from "@/public/assets/images/home/hero.webp";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal on mount — one-shot, runs immediately
      // gsap.from(bgRef.current, {
      //   y: 100,
      //   opacity: 0,
      //   duration: 1,
      //   ease: "power2.out",
      // });

      // Scroll exit — fromTo with explicit start so it never reads mid-reveal state
      // immediateRender: false prevents this tween from stomping the reveal on creation
      gsap.fromTo(
        bgRef.current,
        { y: 0, immediateRender: false },
        {
          y: 400,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative w-full h-[95vh] md:h-screen flex flex-col justify-between bg-primary-1"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Background Image */}

        <div ref={bgRef} className="h-full">
          <Image
            src={HeroImg}
            fill
            className="object-cover object-center"
            sizes="100wv"
            loading="eager"
            placeholder="blur"
            alt="hero-image"
          />
          {/* <PixelTrail image="/assets/images/home/hero.webp" /> */}
        </div>
      </div>

      <div className="z-10 flex w-full mt-4 md:mt-8 lg:mt-12 pt-20 xl:pt-24 2xl:pt-28 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 justify-between">
        <ContentReveal delay={0.5} className="flex items-center gap-4 h-fit">
          <div className="w-[32px] sm:w-[40px] lg:w-[48px] aspect-square shrink-0 flex">
            <DesignDirector />
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="text-primary-3 max-w-[200px] lg:max-w-[256px]">
              Freelance Website & Saas Specialist
            </h6>
          </div>
        </ContentReveal>

        <ContentReveal
          delay={0.5}
          direction="right"
          className="w-[128px] aspect-square hidden md:flex items-center justify-center h-fit -mt-8 relative"
        >
          <div className="absolute inset-0">
            <svg
              width="128"
              height="128"
              viewBox="0 0 112 112"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.3244 7.65399C52.8545 3.60647 59.1455 3.60647 62.6757 7.65399C65.1278 10.4655 69.0787 11.4393 72.5565 10.0894C77.5633 8.14605 83.1337 11.0696 84.3785 16.2941C85.2432 19.9231 88.289 22.6214 91.9958 23.0424C97.3322 23.6484 100.906 28.8258 99.5802 34.0303C98.6593 37.6455 100.102 41.4502 103.189 43.5455C107.632 46.5621 108.391 52.8072 104.798 56.7995C102.303 59.5727 101.812 63.6121 103.572 66.9019C106.104 71.6379 103.873 77.5201 98.8371 79.3856C95.3387 80.6814 93.0272 84.0302 93.0561 87.7607C93.0978 93.1313 88.3889 97.303 83.0625 96.6143C79.3627 96.1359 75.7597 98.0269 74.0516 101.344C71.5927 106.118 65.4845 107.624 61.0883 104.539C58.0346 102.396 53.9655 102.396 50.9117 104.539C46.5155 107.624 40.4073 106.118 37.9484 101.344C36.2403 98.0269 32.6373 96.1359 28.9375 96.6143C23.6111 97.303 18.9022 93.1313 18.9439 87.7607C18.9728 84.0302 16.6613 80.6814 13.1629 79.3856C8.12662 77.5201 5.8958 71.6379 8.42849 66.9019C10.1878 63.6121 9.69728 59.5727 7.20183 56.7995C3.60934 52.8072 4.36763 46.5621 8.81116 43.5455C11.8978 41.4502 13.3407 37.6455 12.4198 34.0303C11.0941 28.8258 14.6678 23.6484 20.0042 23.0424C23.711 22.6214 26.7568 19.9231 27.6215 16.2941C28.8663 11.0696 34.4367 8.14605 39.4435 10.0894C42.9213 11.4393 46.8722 10.4655 49.3244 7.65399Z"
                fill="#FFEEE9"
                fillOpacity="0.1"
              />
            </svg>
          </div>
          <CircularText
            text="AVAILABLE * FOR * NEW * PROJECTS * "
            onHover="speedUp"
            spinDuration={20}
          />
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.3,
              repeatType: "reverse",
            }}
            className="shrink-0 w-2 h-2 rounded-full bg-green-500"
          />
          <p className="text-primary-3">Available for new projects</p> */}
        </ContentReveal>
      </div>

      <div className="z-10 flex flex-col w-full pb-8 lg:pb-0 p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
        <TextReveal delay={0.6}>
          <h1 className="w-full text-primary-3">Design that works.</h1>
        </TextReveal>
        <TextReveal delay={0.7}>
          <h1 className="w-full text-primary-3 text-right">Code that ships.</h1>
        </TextReveal>
        <ContentReveal delay={0.8} className="mt-4">
          <p className="max-w-[600px] text-primary-5">
            I'm Madushan — a UI/UX designer and frontend developer crafting
            clean, conversion-focused digital products for startups and brands
            worldwide.
          </p>
        </ContentReveal>
      </div>
    </section>
  );
};

export default HeroSection;
