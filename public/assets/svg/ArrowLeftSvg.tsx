"use client";

import React from "react";

interface ArrowLeftSvgProps {
  className?: string;
}

const ArrowLeftSvg = ({ className = "" }: ArrowLeftSvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all ease-out duration-300`}
    >
      <path d="M21 13H3M7 17L3 13L7 9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default ArrowLeftSvg;
