"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContentReveal from "../common/reveals/ContentReveal";

gsap.registerPlugin(ScrollTrigger);

const WorkHeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal on mount — one-shot, runs immediately
      gsap.fromTo(
        bgRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Scroll exit — fromTo with explicit start so it never reads mid-reveal state
      // immediateRender: false prevents this tween from stomping the reveal on creation
      gsap.fromTo(
        bgRef.current,
        { y: 0, opacity: 1, immediateRender: false },
        {
          y: -200,
          opacity: 0,
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
      ref={sectionRef}
      className="w-full relative pt-0 md:pt-20 lg:pt-40 flex justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="flex w-[120vw] max-h-[300px] md:max-h-screen items-center"
      >
        <svg
          width="2000"
          height="575"
          viewBox="0 0 2000 575"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M482.312 19.0397L576.831 485.894L679.162 19.0397H802.646L666.776 563.576H496.414L401.323 114.048L304.708 563.576H134.346L0 19.0397H128.248L229.436 485.894L325.289 19.0397H482.312Z"
            fill="url(#paint0_linear_53998_3)"
          />
          <path
            d="M795.572 353.568C795.572 331.228 797.922 310.284 802.623 290.737C807.323 271.062 814.056 253.038 822.822 236.664C831.715 220.29 842.45 205.693 855.027 192.873C867.604 179.925 881.769 169.009 897.522 160.124C913.276 151.112 930.49 144.258 949.165 139.561C967.84 134.738 987.658 132.326 1008.62 132.326C1029.58 132.326 1049.4 134.738 1068.08 139.561C1086.75 144.258 1103.96 151.112 1119.72 160.124C1135.47 169.009 1149.64 179.925 1162.21 192.873C1174.79 205.693 1185.46 220.29 1194.23 236.664C1203.12 253.038 1209.92 271.062 1214.62 290.737C1219.32 310.284 1221.67 331.228 1221.67 353.568C1221.67 387.078 1216.46 417.478 1206.04 444.768C1195.62 471.932 1181.01 495.16 1162.21 514.454C1143.41 533.747 1120.92 548.662 1094.75 559.197C1068.71 569.732 1040 575 1008.62 575C977.241 575 948.466 569.732 922.295 559.197C896.252 548.662 873.829 533.747 855.027 514.454C836.225 495.16 821.615 471.932 811.198 444.768C800.781 417.478 795.572 387.078 795.572 353.568ZM910.481 353.568C910.481 372.988 912.704 390.315 917.15 405.546C921.597 420.651 928.012 433.408 936.397 443.816C944.782 454.098 955.072 461.967 967.268 467.426C979.464 472.884 993.248 475.613 1008.62 475.613C1024.12 475.613 1037.9 472.884 1049.97 467.426C1062.17 461.967 1072.46 454.098 1080.84 443.816C1089.23 433.408 1095.64 420.651 1100.09 405.546C1104.54 390.315 1106.76 372.988 1106.76 353.568C1106.76 334.147 1104.54 316.885 1100.09 301.78C1095.64 286.675 1089.23 273.918 1080.84 263.51C1072.46 253.102 1062.17 245.232 1049.97 239.901C1037.9 234.443 1024.12 231.714 1008.62 231.714C993.248 231.714 979.464 234.443 967.268 239.901C955.072 245.232 944.782 253.102 936.397 263.51C928.012 273.918 921.597 286.675 917.15 301.78C912.704 316.885 910.481 334.147 910.481 353.568Z"
            fill="url(#paint1_linear_53998_3)"
          />
          <path
            d="M1375.53 563.576H1261.39V143.75H1375.53V289.594C1379.35 267.127 1384.94 246.882 1392.3 228.858C1399.67 210.833 1409.07 195.538 1420.51 182.972C1431.94 170.406 1445.53 160.759 1461.29 154.031C1477.17 147.177 1495.4 143.75 1515.98 143.75H1540.94V250.944H1496.92C1473.55 250.944 1454.05 253.355 1438.42 258.179C1422.92 263.002 1410.47 270.428 1401.07 280.455C1391.8 290.356 1385.19 302.922 1381.25 318.154C1377.44 333.259 1375.53 351.156 1375.53 371.846V563.576Z"
            fill="url(#paint2_linear_53998_3)"
          />
          <path
            d="M1788.29 355.472L2000 563.576H1854.41L1693.39 401.929V563.576H1579.24V0H1693.39V320.629L1849.08 143.75H1983.8L1788.29 355.472Z"
            fill="url(#paint3_linear_53998_3)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_53998_3"
              x1="995.444"
              y1="-64.7351"
              x2="995.444"
              y2="563.576"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB7A5" />
              <stop offset="1" stopColor="#FFEEE9" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_53998_3"
              x1="995.444"
              y1="-64.7351"
              x2="995.444"
              y2="563.576"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB7A5" />
              <stop offset="1" stopColor="#FFEEE9" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_53998_3"
              x1="995.444"
              y1="-64.7351"
              x2="995.444"
              y2="563.576"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB7A5" />
              <stop offset="1" stopColor="#FFEEE9" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_53998_3"
              x1="995.444"
              y1="-64.7351"
              x2="995.444"
              y2="563.576"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB7A5" />
              <stop offset="1" stopColor="#FFEEE9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full flex flex-col items-start p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 gap-2">
        <h3 className="text-primary-1">04</h3>
        <p className="accent-text text-dark-gray-1">Projects & case studies</p>
      </div>
    </section>
  );
};

export default WorkHeroSection;
