"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import HeroBg from "@/public/assets/images/home/hero.jpg";
import PixelTrail from "../common/shaders/PixelTrail";
import DesignDirector from "@/public/assets/svg/DesignDirector";
import Facebook from "../common/buttons/social/Facebook";
import Instagram from "../common/buttons/social/Instagram";
import LinkedIn from "../common/buttons/social/LinkedIn";
import TextReveal from "../common/reveals/TextReveal";
import ContentReveal from "../common/reveals/ContentReveal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
      className="relative w-full h-screen flex flex-col justify-between bg-primary-1"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Background Image */}

        <div ref={bgRef} className="h-full">
          <PixelTrail image="/assets/images/home/hero.jpg" />
        </div>
      </div>

      <div className="z-10 flex w-full pt-[128px] px-20 justify-between">
        <ContentReveal delay={0.3} className="flex items-center gap-4 h-fit">
          <div className="w-[52px] h-[52px] shrink-0">
            <DesignDirector />
          </div>
          <h6 className="text-primary-3 max-w-[256px]">
            Freelance Design Director
          </h6>
        </ContentReveal>

        <ContentReveal
          delay={0.3}
          direction="right"
          className="flex flex-col gap-6"
        >
          <Facebook className="fill-primary-3 group-hover:fill-primary-5" />
          <LinkedIn className="fill-primary-3 group-hover:fill-primary-5" />
          <Instagram className="fill-primary-3 group-hover:fill-primary-5" />
        </ContentReveal>
      </div>

      <div className="z-10 flex flex-col gap-3 w-full p-20">
        <TextReveal>
          <h1 className="w-full text-primary-3">Design that works.</h1>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h1 className="w-full text-primary-3 text-right">Code that ships.</h1>
        </TextReveal>
        <ContentReveal delay={0.2}>
          <p className="max-w-[400px] text-gray-1">
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
