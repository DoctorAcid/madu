"use client";

import React from "react";

interface LogoHeaderProps {
  pastHero: boolean;
}

const LogoHeader = ({ pastHero }: LogoHeaderProps) => {
  return (
    <svg
      width="110"
      height="24"
      viewBox="0 0 110 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.4004 8L7.2002 0H0V24H28.8008V0H21.6006L14.4004 8Z"
        fill="url(#paint0_linear_53918_73)"
      />
      <path
        d="M0.000389099 24V0H7.20039L28.8004 24H0.000389099Z"
        fill="url(#paint1_linear_53918_73)"
      />
      <path
        d="M48.5608 18.6H44.8008V5.2H49.9008L52.3608 10.76L53.6808 14.22H53.9408L55.2008 10.76L57.5408 5.2H62.6408V18.6H58.8808V13.06L59.0208 10.82H58.7608L58.0008 13.06L56.0008 17.8H51.4408L49.4408 13.06L48.6808 10.82H48.4208L48.5608 13.06V18.6Z"
        className={`${pastHero ? "fill-primary-1" : "fill-primary-3"} transition-all duration-300 ease-out`}
      />
      <path
        d="M67.2638 18.6H63.0438L68.8237 5.2H74.2038L80.0037 18.6H75.6838L74.6638 16.12H68.3038L67.2638 18.6ZM70.5037 10.86L69.7237 12.74H73.2838L72.5037 10.86L71.6238 8.6H71.3638L70.5037 10.86Z"
        className={`${pastHero ? "fill-primary-1" : "fill-primary-3"} transition-all duration-300 ease-out`}
      />
      <path
        d="M87.4062 18.6H80.6263V5.2H87.4062C91.8262 5.2 94.6263 7.66 94.6263 11.9C94.6263 16.14 91.8262 18.6 87.4062 18.6ZM87.4062 8.58H84.3862V15.22H87.4062C89.7863 15.22 90.6063 14.92 90.6063 11.9C90.6063 8.88 89.7863 8.58 87.4062 8.58Z"
        className={`${pastHero ? "fill-primary-1" : "fill-primary-3"} transition-all duration-300 ease-out`}
      />
      <path
        d="M102.381 18.8C97.7011 18.8 95.5411 16.54 95.5411 12.98V5.2H99.3011V12.68C99.3011 14.58 99.8411 15.16 102.381 15.16C104.921 15.16 105.461 14.58 105.461 12.68V5.2H109.221V12.98C109.221 16.54 107.061 18.8 102.381 18.8Z"
        className={`${pastHero ? "fill-primary-1" : "fill-primary-3"} transition-all duration-300 ease-out`}
      />
      <defs>
        <linearGradient
          id="paint0_linear_53918_73"
          x1="14.4004"
          y1="0"
          x2="14.4004"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCB7A5" />
          <stop offset="1" stopColor="#F74C1F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_53918_73"
          x1="14.4004"
          y1="0"
          x2="14.4004"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCB7A5" />
          <stop offset="1" stopColor="#F9704C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoHeader;
