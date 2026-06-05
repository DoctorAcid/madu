"use client";

import Facebook from "@/components/common/buttons/social/Facebook";
import Fiverr from "@/components/common/buttons/social/Fiverr";
import Instagram from "@/components/common/buttons/social/Instagram";
import LinkedIn from "@/components/common/buttons/social/LinkedIn";
import Upwork from "@/components/common/buttons/social/Upwork";
import ContentReveal from "@/components/common/reveals/ContentReveal";
import TextReveal from "@/components/common/reveals/TextReveal";
import DesignDirector from "@/public/assets/svg/DesignDirector";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full relative min-h-[400px] flex footer-bg overflow-hidden">
      <div className="absolute inset-0">
        <span className="absolute top-0 left-0 w-full h-5 bg-primary-1 blur-xl" />
        <span className="absolute top-0 left-0 w-5 h-full bg-linear-to-b from-primary-1 to-primary-3 blur-xl" />
        <span className="absolute top-0 right-0 w-5 h-full bg-linear-to-b from-primary-1 to-primary-3 blur-xl" />
        <span className="absolute bottom-0 left-0 w-full h-5 bg-primary-3 blur-xl" />
      </div>
      <div className="w-full aspect-1760/867 max-h-[260px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-screen flex items-start px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 1760 867"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M102.725 509.634H0V143.236H139.335L206.544 295.264L242.607 389.871H249.71L284.134 295.264L348.064 143.236H487.399V867H384.674V358.153L388.499 296.905H381.395L360.632 358.153L305.99 487.76H181.409L126.767 358.153L106.004 296.905H98.9005L102.725 358.153V509.634Z"
            fill="url(#paint0_linear_53995_9)"
          />
          <path
            d="M613.701 509.634H498.408L656.321 143.236H803.306L961.765 509.634H843.741L815.874 441.823H642.115L613.701 509.634ZM702.22 297.998L680.91 349.404H778.171L756.861 297.998L732.819 236.203H725.716L702.22 297.998Z"
            fill="url(#paint1_linear_53995_9)"
          />
          <path
            d="M1164.01 509.634H978.772V143.236H1164.01C1284.76 143.236 1361.26 210.5 1361.26 326.435C1361.26 442.37 1284.76 509.634 1164.01 509.634ZM1164.01 235.656H1081.5V417.215H1164.01C1229.03 417.215 1251.43 409.012 1251.43 326.435C1251.43 243.859 1229.03 235.656 1164.01 235.656Z"
            fill="url(#paint2_linear_53995_9)"
          />
          <path
            d="M1573.13 515.103C1445.27 515.103 1386.25 453.307 1386.25 355.966V143.236H1488.98V347.763C1488.98 399.715 1503.73 415.574 1573.13 415.574C1642.52 415.574 1657.27 399.715 1657.27 347.763V0H1760V355.966C1760 453.307 1700.99 515.103 1573.13 515.103Z"
            fill="url(#paint3_linear_53995_9)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_53995_9"
              x1="880"
              y1="0"
              x2="880"
              y2="867"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FBAC97" />
              <stop offset="0.235577" stopColor="#FFEEE9" />
              <stop offset="0.600962" stopColor="#FFEEE9" />
              <stop offset="1" stopColor="#F97F5E" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_53995_9"
              x1="880"
              y1="0"
              x2="880"
              y2="867"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FBAC97" />
              <stop offset="0.235577" stopColor="#FFEEE9" />
              <stop offset="0.600962" stopColor="#FFEEE9" />
              <stop offset="1" stopColor="#F97F5E" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_53995_9"
              x1="880"
              y1="0"
              x2="880"
              y2="867"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FBAC97" />
              <stop offset="0.235577" stopColor="#FFEEE9" />
              <stop offset="0.600962" stopColor="#FFEEE9" />
              <stop offset="1" stopColor="#F97F5E" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_53995_9"
              x1="880"
              y1="0"
              x2="880"
              y2="867"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FBAC97" />
              <stop offset="0.235577" stopColor="#FFEEE9" />
              <stop offset="0.600962" stopColor="#FFEEE9" />
              <stop offset="1" stopColor="#F97F5E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="z-10 absolute bottom-0 w-full">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 pb-6 md:pb-8 lg:pb-10 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="flex items-center gap-4 h-fit">
              <div className="w-[40px] sm:w-[48px] lg:w-[52px] aspect-square flex shrink-0">
                <DesignDirector color="#FFEEE9" />
              </div>
              <h6 className="text-primary-5 max-w-[140px] lg:max-w-[256px]">
                Freelance Design Director
              </h6>
            </div>

            {/* <h6 className="text-right text-primary-5">
              DA Studio <br />{" "}
              <span className="text-primary-3">[Coming Soon]</span>
            </h6> */}
          </div>
          <div className="w-full h-0.5 bg-primary-3" />
          <div className="flex items-center justify-between w-full gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-4 lg:py-6 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="flex gap-0 sm:gap-4 md:gap-6">
              <Upwork className="fill-primary-3 group-hover:fill-primary-5" />
              <Fiverr className="fill-primary-3 group-hover:fill-primary-5" />
              {/* <Facebook className="fill-primary-3 group-hover:fill-primary-5" />
              <LinkedIn className="fill-primary-3 group-hover:fill-primary-5" />
              <Instagram className="fill-primary-3 group-hover:fill-primary-5" /> */}
            </div>

            <div className="flex gap-6 sm:gap-8 md:gap-10">
              <Link
                href="/work"
                className="group/work relative button-text text-primary-3 hover:text-primary-5 transition-all ease-out duration-300"
              >
                Work
                <span className="absolute bottom-0 left-0 w-0 group-hover/work:w-full h-0.5 bg-primary-3 transition-all ease-out duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className="group/work relative button-text text-primary-3 hover:text-primary-5 transition-all ease-out duration-300"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 group-hover/work:w-full h-0.5 bg-primary-3 transition-all ease-out duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
