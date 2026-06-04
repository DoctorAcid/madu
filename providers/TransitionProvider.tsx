"use client";

import React, { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

        // Reset to starting state before each leave so rapid navigations stay clean
        gsap.set(panels, { scaleX: 0, x: 0, transformOrigin: "left center" });

        const tl = gsap.timeline();

        // Each panel sweeps in from the left — width 0 → full, staggered top-to-bottom
        tl.to(panels, {
          scaleX: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.inOut",
        });

        tl.call(next);
      }}
      enter={(next) => {
        const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

        const tl = gsap.timeline();

        // Each panel slides off to the right — full → 0 from the left edge, staggered
        tl.to(panels, {
          x: "100%",
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.inOut",
        });

        tl.call(() => {
          // Reset panels to invisible for the next transition
          gsap.set(panels, { scaleX: 0, x: 0 });
          next();
        });
      }}
    >
      {/* Transition overlay — 4 stacked panels */}
      <div
        className="fixed inset-0 flex flex-col pointer-events-none"
        style={{ zIndex: 200 }}
      >
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-200"
          >
            <path
              d="M32 21.7773L16 4H0V57.3319H64V4H48L32 21.7773Z"
              fill="url(#paint0_linear_54024_2)"
            />
            <path
              d="M0.000793457 57.3319V4H16.0004L63.9991 57.3319H0.000793457Z"
              fill="url(#paint1_linear_54024_2)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_54024_2"
                x1="32"
                y1="4"
                x2="32"
                y2="57.3319"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FCB7A5" />
                <stop offset="1" stop-color="#F74C1F" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_54024_2"
                x1="31.9999"
                y1="4"
                x2="31.9999"
                y2="57.3319"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FCB7A5" />
                <stop offset="1" stop-color="#F9704C" />
              </linearGradient>
            </defs>
          </svg>
        </div> */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="w-full h-1/4 bg-[#F74C1F]"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        ))}
      </div>

      {children}
    </TransitionRouter>
  );
};

export default TransitionProvider;
