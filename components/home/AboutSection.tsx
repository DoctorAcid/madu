"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rotate } from "three/tsl";
import ContentReveal from "../common/reveals/ContentReveal";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const eclipse1Ref = useRef<SVGSVGElement>(null);
  const eclipse2Ref = useRef<SVGSVGElement>(null);
  const eclipse3Ref = useRef<SVGSVGElement>(null);
  const eclipse4Ref = useRef<SVGSVGElement>(null);
  const eclipse5Ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const ctx = gsap.context(() => {
      // ── Path draw animation ──────────────────────────────────────────────
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "20% bottom",
          end: "center center",
          scrub: 1,
        },
      });

      // ── Eclipse parallax (separate timeline) ────────────────────────────
      const eclipses = [
        { el: eclipse1Ref.current, y: 200, rotate: 20 },
        { el: eclipse2Ref.current, y: 200, rotate: 20 },
        { el: eclipse3Ref.current, y: -800, rotate: 20 },
        { el: eclipse4Ref.current, y: -200, rotate: 20 },
        { el: eclipse5Ref.current, y: -200, rotate: 20 },
      ];

      eclipses.forEach(({ el, y, rotate }) => {
        if (!el) return;
        gsap.to(el, {
          y,
          rotate,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full flex flex-col max-w-[1920px] mx-auto overflow-hidden">
      <div className="w-full flex px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-40">
        <div className="max-w-[1024px] mx-auto">
          <ContentReveal direction="down">
            <h1 className="text-center">
              <span className="text-primary-1">7+ years</span> making brands
              unique
            </h1>
          </ContentReveal>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full h-[150vh] relative flex items-center justify-center"
      >
        {/* SMALL SOLID SHAPES */}
        <svg
          width="85"
          height="85"
          viewBox="0 0 85 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[60px] h-[60px] lg:w-[85px] lg:h-[85px] top-[5%] left-[25%] md:left-[20%] lg:left-[15%]"
        >
          <path
            d="M37.8225 2.61211C39.8308 -0.870548 44.857 -0.870548 46.8654 2.61211V2.61211C48.4142 5.29805 51.9493 6.04946 54.4568 4.22572V4.22572C57.708 1.86102 62.2997 3.90535 62.7179 7.90378V7.90378C63.0404 10.9875 65.9642 13.1118 68.9967 12.4656V12.4656C72.9286 11.6277 76.2918 15.3629 75.0475 19.1858V19.1858C74.0879 22.1341 75.8949 25.2639 78.928 25.907V25.907C82.8609 26.7409 84.414 31.521 81.7224 34.5073V34.5073C79.6466 36.8104 80.0244 40.4046 82.5337 42.2258V42.2258C85.7873 44.5872 85.262 49.5858 81.5885 51.2191V51.2191C78.7553 52.4788 77.6385 55.916 79.1902 58.6003V58.6003C81.2021 62.0809 78.689 66.4337 74.6687 66.4317V66.4317C71.5682 66.4301 69.1499 69.1158 69.4756 72.1992V72.1992C69.8979 76.1972 65.8316 79.1515 62.1598 77.5145V77.5145C59.3279 76.2519 56.0263 77.7219 55.0697 80.6712V80.6712C53.8293 84.4953 48.913 85.5403 46.2244 82.5513V82.5513C44.151 80.2461 40.5369 80.2461 38.4634 82.5513V82.5513C35.7749 85.5403 30.8585 84.4953 29.6182 80.6712V80.6712C28.6615 77.7219 25.3599 76.2519 22.5281 77.5145V77.5145C18.8563 79.1515 14.79 76.1972 15.2123 72.1992V72.1992C15.5379 69.1158 13.1197 66.4301 10.0191 66.4317V66.4317C5.99888 66.4337 3.48579 62.0809 5.49769 58.6003V58.6003C7.04934 55.916 5.93253 52.4788 3.0994 51.2191V51.2191C-0.574108 49.5858 -1.09949 44.5872 2.15416 42.2258V42.2258C4.66349 40.4046 5.04126 36.8104 2.96541 34.5073V34.5073C0.273818 31.521 1.827 26.7409 5.75981 25.907V25.907C8.79293 25.2639 10.6 22.1341 9.64033 19.1858V19.1858C8.39605 15.3629 11.7592 11.6277 15.6912 12.4656V12.4656C18.7236 13.1118 21.6475 10.9875 21.97 7.90378V7.90378C22.3882 3.90535 26.9798 1.86102 30.2311 4.22572V4.22572C32.7385 6.04946 36.2736 5.29805 37.8225 2.61211V2.61211Z"
            fill="#F9704C"
          />
        </svg>

        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-[30%] w-[80px] h-[80px] lg:w-[130px] lg:h-[130px]"
        >
          <path
            d="M64.9346 0L67.1601 40.2722L76.5408 1.04458L71.5397 41.0669L87.7739 4.14473L75.7069 42.6309L98.273 9.20083L79.528 44.9139L107.701 16.0504L82.88 47.8424L115.754 24.4732L85.6552 51.3224L122.173 34.1985L87.7644 55.2421L126.753 44.9139L89.1399 59.4753L129.346 56.2748L89.7374 63.8861L129.869 67.9162L89.5377 68.3327L128.305 79.4639L88.5472 72.6722L124.704 90.5466L86.7978 76.7651L119.182 100.808L84.3457 80.4799L111.916 109.919L81.2697 83.6971L103.141 117.586L77.6687 86.3134L93.137 123.563L73.6584 88.2446L82.227 127.658L69.3677 89.4288L70.7611 129.738L64.9346 89.8278L59.108 129.738L60.5014 89.4288L47.6422 127.658L56.2107 88.2446L36.7321 123.563L52.2004 86.3134L26.7285 117.586L48.5994 83.6971L17.9529 109.919L45.5234 80.4799L10.6873 100.808L43.0713 76.7651L5.16526 90.5466L41.3219 72.6722L1.56425 79.4639L40.3315 68.3327L2.28882e-05 67.9162L40.1318 63.8861L0.522835 56.2748L40.7293 59.4753L3.1159 44.9139L42.1047 55.2421L7.69586 34.1985L44.214 51.3224L14.1155 24.4732L46.9892 47.8424L22.1686 16.0504L50.3412 44.9139L31.5961 9.20083L54.1622 42.6309L42.0952 4.14473L58.3295 41.0669L53.3284 1.04458L62.709 40.2722L64.9346 0Z"
            fill="#F9704C"
          />
        </svg>

        <svg
          width="100"
          height="97"
          viewBox="0 0 100 97"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-[20%] lg:top-[10%] right-[20%] lg:right-[10%] w-[60px] h-[60px] lg:w-[100px] lg:h-[97px]"
        >
          <path
            d="M39.0674 3.4379C45.3761 -1.1457 53.9189 -1.1457 60.2276 3.43789L91.8739 26.4303C98.1827 31.0139 100.823 39.1385 98.4128 46.5549L86.325 83.7573C83.9153 91.1737 77.0041 96.195 69.206 96.195H30.089C22.291 96.195 15.3797 91.1737 12.97 83.7573L0.882207 46.5549C-1.52753 39.1385 1.11231 31.0139 7.42109 26.4303L39.0674 3.4379Z"
            fill="#F9704C"
          />
        </svg>

        {/* PATH */}
        <svg
          width="2194"
          height="541"
          viewBox="0 0 2194 541"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute z-2"
        >
          <path
            ref={pathRef}
            d="M45.5122 299.322C70.7415 377.713 183.875 525.352 434.575 488.785C747.949 443.075 1020.16 143.645 1336.19 72.7616C1652.22 1.87862 1845.2 88.3389 1896.55 117.146C2051.24 203.928 2132.91 398.69 2147.51 438.438"
            stroke="url(#paint0_linear_53982_14)"
            strokeWidth="91"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_53982_14"
              x1="1096.51"
              y1="45.5063"
              x2="1190.4"
              y2="376.182"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA9479" />
              <stop offset="1" stopColor="#F74C1F" />
            </linearGradient>
          </defs>
        </svg>

        {/* ECLIPSE 1 */}
        <svg
          ref={eclipse1Ref}
          width="415"
          height="415"
          viewBox="0 0 415 415"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] lg:w-[415px] lg:h-[415px] right-[5%] bottom-[20%] z-3 rotate-220"
        >
          <rect
            width="415"
            height="415"
            rx="207.5"
            fill="url(#paint0_radial_53982_26)"
          />
          <mask
            id="mask0_53982_26"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="415"
            height="415"
          >
            <rect width="415" height="415" rx="207.5" fill="white" />
          </mask>
          <g mask="url(#mask0_53982_26)">
            <g filter="url(#filter0_f_53982_26)">
              <rect
                width="415"
                height="415"
                rx="207.5"
                stroke="url(#paint1_linear_53982_26)"
                strokeWidth="15"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_53982_26"
              x="-56.7"
              y="-56.7"
              width="528.4"
              height="528.4"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="24.6"
                result="effect1_foregroundBlur_53982_26"
              />
            </filter>
            <radialGradient
              id="paint0_radial_53982_26"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(207.5 102.302) rotate(90) scale(312.698 531.476)"
            >
              <stop offset="0.199414" stopColor="white" />
              <stop offset="0.573607" stopColor="#CFCFCF" />
              <stop offset="1" stopColor="#FA9479" />
            </radialGradient>
            <linearGradient
              id="paint1_linear_53982_26"
              x1="207.5"
              y1="0"
              x2="207.5"
              y2="415"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F74C1F" />
              <stop offset="1" stopColor="#FA9B82" />
            </linearGradient>
          </defs>
        </svg>

        {/* ECLIPSE 2 */}
        <svg
          ref={eclipse2Ref}
          width="553"
          height="553"
          viewBox="0 0 553 553"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[320px] h-[320px] lg:w-[553px] lg:h-[553px] left-[-30%] md:left-[-20%] lg:left-[10%] top-[30%] lg:top-[15%]"
        >
          <rect
            width="553"
            height="553"
            rx="276.5"
            fill="url(#paint0_radial_53982_45)"
          />
          <mask
            id="mask0_53982_45"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="553"
            height="553"
          >
            <rect width="553" height="553" rx="276.5" fill="white" />
          </mask>
          <g mask="url(#mask0_53982_45)">
            <g filter="url(#filter0_f_53982_45)">
              <rect
                width="553"
                height="553"
                rx="276.5"
                stroke="url(#paint1_linear_53982_45)"
                strokeWidth="17"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_53982_45"
              x="-57.3"
              y="-57.3"
              width="667.6"
              height="667.6"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="24.4"
                result="effect1_foregroundBlur_53982_45"
              />
            </filter>
            <radialGradient
              id="paint0_radial_53982_45"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(276.5 136.321) rotate(90) scale(416.679 708.208)"
            >
              <stop offset="0.199414" stopColor="#FFEEE9" />
              <stop offset="0.413462" stopColor="#FED6CB" />
              <stop offset="1" stopColor="#FA9479" />
            </radialGradient>
            <linearGradient
              id="paint1_linear_53982_45"
              x1="276.5"
              y1="0"
              x2="276.5"
              y2="553"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F9704C" />
              <stop offset="1" stopColor="#FA9B82" />
            </linearGradient>
          </defs>
        </svg>

        {/* ECLIPSE 3 */}
        <svg
          ref={eclipse3Ref}
          width="250"
          height="250"
          viewBox="0 0 250 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="z-3 absolute w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px] top-[60%] rotate-120"
        >
          <rect
            width="250"
            height="250"
            rx="125"
            fill="url(#paint0_radial_53982_32)"
          />
          <mask
            id="mask0_53982_32"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="250"
            height="250"
          >
            <rect width="250" height="250" rx="125" fill="white" />
          </mask>
          <g mask="url(#mask0_53982_32)">
            <g filter="url(#filter0_f_53982_32)">
              <rect
                width="250"
                height="250"
                rx="125"
                stroke="url(#paint1_linear_53982_32)"
                strokeWidth="5"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_53982_32"
              x="-25.5"
              y="-25.5"
              width="301"
              height="301"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="11.5"
                result="effect1_foregroundBlur_53982_32"
              />
            </filter>
            <radialGradient
              id="paint0_radial_53982_32"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(125 61.6279) rotate(90) scale(188.372 320.166)"
            >
              <stop offset="0.199414" stopColor="white" />
              <stop offset="0.573607" stopColor="#CFCFCF" />
              <stop offset="1" stopColor="#FA9479" />
            </radialGradient>
            <linearGradient
              id="paint1_linear_53982_32"
              x1="125"
              y1="0"
              x2="125"
              y2="250"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#606060" />
              <stop offset="1" stopColor="#FA9B82" />
            </linearGradient>
          </defs>
        </svg>

        {/* ECLIPSE 4 */}
        <svg
          ref={eclipse4Ref}
          width="283"
          height="283"
          viewBox="0 0 283 283"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="z-1 absolute w-[198px] h-[198px] lg:w-[283px] lg:h-[283px] right-[-30%] md:right-[0%] lg:right-[25%] top-[20%] lg:top-[10%]"
        >
          <rect
            width="282.785"
            height="282.785"
            rx="141.393"
            fill="url(#paint0_radial_53982_50)"
          />
          <mask
            id="mask0_53982_50"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="283"
            height="283"
          >
            <rect width="282.785" height="282.785" rx="141.393" fill="white" />
          </mask>
          <g mask="url(#mask0_53982_50)">
            <g filter="url(#filter0_f_53982_50)">
              <rect
                width="282.785"
                height="282.785"
                rx="141.393"
                stroke="url(#paint1_linear_53982_50)"
                strokeWidth="19"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_53982_50"
              x="-32.5"
              y="-32.5"
              width="347.785"
              height="347.786"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="11.5"
                result="effect1_foregroundBlur_53982_50"
              />
            </filter>
            <radialGradient
              id="paint0_radial_53982_50"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(141.393 69.7099) rotate(90) scale(213.076 362.154)"
            >
              <stop offset="0.199414" stopColor="#FFEEE9" />
              <stop offset="0.413462" stopColor="#FED6CB" />
              <stop offset="1" stopColor="#FA9479" />
            </radialGradient>
            <linearGradient
              id="paint1_linear_53982_50"
              x1="141.393"
              y1="0"
              x2="141.393"
              y2="282.785"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F9704C" />
              <stop offset="1" stopColor="#FA9B82" />
            </linearGradient>
          </defs>
        </svg>

        {/* ECLIPSE 5 */}
        <svg
          ref={eclipse5Ref}
          width="283"
          height="283"
          viewBox="0 0 283 283"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-z-1 absolute w-[198px] h-[198px] lg:w-[283px] lg:h-[283px] left-[-30%] lg:left-[-5%] top-[5%]"
        >
          <rect
            width="282.785"
            height="282.785"
            rx="141.393"
            fill="url(#paint0_radial_53982_50b)"
          />
          <mask
            id="mask0_53982_50b"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="283"
            height="283"
          >
            <rect width="282.785" height="282.785" rx="141.393" fill="white" />
          </mask>
          <g mask="url(#mask0_53982_50b)">
            <g filter="url(#filter0_f_53982_50b)">
              <rect
                width="282.785"
                height="282.785"
                rx="141.393"
                stroke="url(#paint1_linear_53982_50b)"
                strokeWidth="19"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_53982_50b"
              x="-32.5"
              y="-32.5"
              width="347.785"
              height="347.786"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="11.5"
                result="effect1_foregroundBlur_53982_50b"
              />
            </filter>
            <radialGradient
              id="paint0_radial_53982_50b"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(141.393 69.7099) rotate(90) scale(213.076 362.154)"
            >
              <stop offset="0.199414" stopColor="#FFEEE9" />
              <stop offset="0.413462" stopColor="#FED6CB" />
              <stop offset="1" stopColor="#FA9479" />
            </radialGradient>
            <linearGradient
              id="paint1_linear_53982_50b"
              x1="141.393"
              y1="0"
              x2="141.393"
              y2="282.785"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F9704C" />
              <stop offset="1" stopColor="#FA9B82" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;
