"use client";

import React, { useEffect, useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";
// import HeaderLogo from "@/svg/logo/HeaderLogo";

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const panelOutRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path");
    pathRef.current = Array.from(paths);

    pathRef.current.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDashoffset: length,
        strokeDasharray: length,
      });
    });
  }, []);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const tl = gsap.timeline();

        pathRef.current.forEach((path) => {
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              strokeWidth: 500,
              duration: 1,
              ease: "power2.out",
            },
            0,
          ).to(
            logoRef.current,
            {
              scale: 2,
              opacity: 100,
              duration: 1,
              ease: "power2.out",
            },
            0,
          );
        });

        tl.call(next);
      }}
      enter={(next) => {
        const tl = gsap.timeline();

        pathRef.current.forEach((path) => {
          const length = path.getTotalLength();
          tl.to(
            path,
            {
              strokeDashoffset: -length,
              strokeWidth: 50,
              duration: 1,
              ease: "power2.out",
            },
            0,
          ).to(
            logoRef.current,
            {
              scale: 0,
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            },
            0,
          );
        });

        tl.call(() => {
          pathRef.current.forEach((path) => {
            gsap.set(path, { strokeDashoffset: path.getTotalLength() });
          });
          next();
        });
      }}
    >
      <div
        ref={panelOutRef}
        className="w-full h-screen fixed top-0 left-0 flex items-center justify-center overflow-clip pointer-events-none"
        style={{ zIndex: 200 }}
      >
        <svg
          ref={svgRef}
          width="1920"
          height="1200"
          viewBox="0 0 1920 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M-436.408 1490.17C434.549 1216.79 953.405 905.162 1081.92 135.855C1242.56 -825.779 -30.5995 1407.2 -366.277 888.255C-766.908 268.9 667.978 614.357 536.449 -182.491C473.512 -563.788 119.852 188.013 -282.359 135.855"
            stroke="#F74C1F"
            strokeWidth="50"
            strokeLinecap="round"
            strokeDashoffset={9999}
            strokeDasharray={9999}
          />
          <path
            d="M2371.14 -290.825C1500.19 -17.4431 981.332 294.188 852.816 1063.49C692.172 2025.13 1965.34 -207.846 2301.01 311.094C2701.64 930.45 1266.76 584.992 1398.29 1381.84C1461.22 1763.14 1814.88 1011.34 2217.09 1063.49"
            stroke="#F74C1F"
            strokeWidth="50"
            strokeLinecap="round"
            strokeDashoffset={9999}
            strokeDasharray={9999}
          />
        </svg>

        <div
          ref={logoRef}
          style={{
            scale: 0,
            opacity: 0,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* <HeaderLogo color="fill-cream" /> */}
        </div>
      </div>
      {children}
    </TransitionRouter>
  );
};

export default TransitionProvider;
