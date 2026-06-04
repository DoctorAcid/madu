"use client";

import React, { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<SVGSVGElement>(null);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
        const logo = logoRef.current;

        // Reset to starting state before each leave so rapid navigations stay clean
        gsap.set(panels, { scaleX: 0, x: 0, transformOrigin: "left center" });
        gsap.set(logo, {
          opacity: 0,
          x: -20,
        });

        const tl = gsap.timeline();

        // Each panel sweeps in from the left — width 0 → full, staggered top-to-bottom
        tl.to(panels, {
          scaleX: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.inOut",
        }).to(logo, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" });

        tl.call(next);
      }}
      enter={(next) => {
        const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
        const logo = logoRef.current;

        const tl = gsap.timeline();

        // Each panel slides off to the right — full → 0 from the left edge, staggered
        tl.to(
          logo,
          {
            opacity: 0,
            x: 20,
            duration: 0.32,
            ease: "power2.in",
          },
          0,
        ).to(panels, {
          x: "100%",
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.inOut",
        });

        tl.call(() => {
          // Reset panels to invisible for the next transition
          gsap.set(panels, { scaleX: 0, x: 0 });
          gsap.set(logo, { opacity: 0, x: -20 });
          next();
        });
      }}
    >
      {/* Transition overlay — 4 stacked panels */}
      <div
        className="fixed inset-0 flex flex-col pointer-events-none"
        style={{ zIndex: 999 }}
      >
        <div className="z-10 absolute inset-0 flex items-center justify-center">
          {/* Logo */}
          <svg
            ref={logoRef}
            width="56"
            height="48"
            viewBox="0 0 28.8 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-10 opacity-0"
            aria-hidden="true"
          >
            <path
              d="M14.4004 8L7.2002 0H0V24H28.8008V0H21.6006L14.4004 8Z"
              fill="url(#il-g1)"
            />
            <path
              d="M0.000389099 24V0H7.20039L28.8004 24H0.000389099Z"
              fill="url(#il-g2)"
            />
            <defs>
              <linearGradient
                id="il-g1"
                x1="14.4"
                y1="0"
                x2="14.4"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FCB7A5" />
                <stop offset="1" stopColor="#F74C1F" />
              </linearGradient>
              <linearGradient
                id="il-g2"
                x1="14.4"
                y1="0"
                x2="14.4"
                y2="24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FCB7A5" />
                <stop offset="1" stopColor="#F9704C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
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
