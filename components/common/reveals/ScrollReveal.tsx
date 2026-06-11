"use client";

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  fromColor?: string;
  toColor?: string;
  baseRotation?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  fromColor = "rgba(45,45,45,1)",
  toColor = "rgba(249,112,76,1)",
  baseRotation = 0,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const scroller = scrollContainerRef?.current ?? window;

      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          {
            transformOrigin: "0% 50%",
            rotate: baseRotation,
            y: 100,
            x: 100,
          },
          {
            rotate: 0,
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom",
              end: rotationEnd,
              scrub: true,
            },
          },
        );
      }

      const wordElements = el.querySelectorAll<HTMLElement>(".word");

      gsap.set(wordElements, {
        color: fromColor,
      });

      gsap.to(wordElements, {
        color: toColor,
        ease: "none",
        stagger: {
          each: 0.15,
        },
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    fromColor,
    toColor,
    baseRotation,
    rotationEnd,
    wordAnimationEnd,
  ]);

  return (
    <h1 ref={containerRef} className={`${containerClassName}`}>
      <span className={`${textClassName}`}>{splitText}</span>
    </h1>
  );
};

export default ScrollReveal;
