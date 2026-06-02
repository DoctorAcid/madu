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
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el; }}
            className="w-full h-1/4 bg-primary-1"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        ))}
      </div>

      {children}
    </TransitionRouter>
  );
};

export default TransitionProvider;
