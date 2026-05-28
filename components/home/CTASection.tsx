"use client";

import React from "react";
import TextReveal from "../common/reveals/TextReveal";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="w-full max-w-[1920px] mx-auto relative flex flex-col gap-4 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-40">
      <div className="w-full flex flex-col gap-4 px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 py-10 md:py-12 lg:py-16 xl:py-18 2xl:py-20 rounded-2xl bg-white">
        <p className="eyebrow text-dark-gray-1">Got a project in mind?</p>
        <TextReveal>
          <h2 className="text-primary-1 max-w-[1080px]">
            Let’s build something people remember
          </h2>
        </TextReveal>
        <p className="text-dark-gray-2 max-w-[600px]">
          I take on a small number of projects each month to give every client
          my full attention. Let's talk about yours.
        </p>
      </div>
      <Link href="/contact">
        <div className="relative group w-full flex items-center justify-between gap-4 px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 py-10 rounded-2xl bg-white overflow-hidden">
          <div className="absolute left-0 right-0 bottom-0 w-full h-0 cursor-pointer bg-primary-1 group-hover:h-full transition-all duration-300 ease-in-out" />

          <svg
            width="53"
            height="24"
            viewBox="0 0 53 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-1 stroke-black-1 group-hover:stroke-primary-5 transition-all duration-300 ease-in-out"
          >
            <path
              d="M2 12.0001H50M40 22.0001L50 12.0001L40 2"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h3 className="z-1 text-black-1 group-hover:text-primary-5 text-right transition-all duration-300 ease-in-out">
            Let’s Talk
          </h3>
        </div>
      </Link>
    </section>
  );
};

export default CTASection;
