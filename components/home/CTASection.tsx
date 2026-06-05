"use client";

import React from "react";
import TextReveal from "../common/reveals/TextReveal";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="w-full max-w-[1920px] mx-auto relative flex flex-col gap-4 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-20 md:py-24 lg:py-32 xl:py-40">
      <div className="relative w-full">
        <div className="z-10 absolute right-0 bottom-[70px]">
          <svg
            width="29"
            height="69"
            viewBox="0 0 29 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary-5 transition-all ease-out duration-300"
          >
            <path
              d="M29 40.2949L0.294922 69H0.175781C17.8359 51.551 28.8307 27.3729 29 0.625V40.2949Z"
              fill=""
            />
          </svg>
        </div>

        <div className="z-10 absolute -bottom-[1px] right-[70px]">
          <svg
            width="69"
            height="29"
            viewBox="0 0 69 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary-5 transition-all ease-out duration-300"
          >
            <path
              d="M40.6794 28.4337H0.0842451L0 28.3494C24.8259 28.4987 49.6969 19.1767 68.7302 0.382812L40.6794 28.4337Z"
              fill=""
            />
          </svg>
        </div>

        <div className="z-10 absolute -top-[1px] left-[70px]">
          <svg
            width="69"
            height="30"
            viewBox="0 0 69 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary-5 transition-all ease-out duration-300"
          >
            <path
              d="M28.9131 0.984375L0.208008 29.6895L0.208008 29.8086C17.657 12.1485 41.8351 1.15368 68.583 0.984375L28.9131 0.984375Z"
              fill=""
            />
          </svg>
        </div>

        <div className="z-10 absolute top-[70px] -left-[1px]">
          <svg
            width="29"
            height="69"
            viewBox="0 0 29 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-primary-5 transition-all ease-out duration-300"
          >
            <path
              d="M0.339844 28.0938L0.339846 68.6889L0.424091 68.7732C0.2748 43.9473 9.59679 19.0763 28.3907 0.0429688L0.339844 28.0938Z"
              fill=""
            />
          </svg>
        </div>

        <div className="shape-container w-full flex flex-col gap-4 px-8 md:px-10 lg:px-12 xl:px-14 2xl:px-16 py-10 md:py-12 lg:py-16 xl:py-18 2xl:py-20 bg-white">
          <TextReveal>
            <p className="eyebrow text-dark-gray-1">Got a project in mind?</p>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h2 className="text-primary-1 max-w-[1000px]">
              Let’s build something people remember
            </h2>
          </TextReveal>
          <TextReveal splitBy="words" delay={0.4}>
            <p className="text-dark-gray-2 max-w-[600px]">
              I take on a small number of projects each month to give every
              client my full attention. Let's talk about yours.
            </p>
          </TextReveal>
        </div>
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
