"use client";

import ArrowRightSvg from "@/public/assets/svg/ArrowRightSvg";
import React from "react";

interface PrimaryArrowButtonProps {
  className?: string;
}

const PrimaryArrowButton = ({ className = "" }: PrimaryArrowButtonProps) => {
  return (
    <div className="h-fit flex items-center justify-center px-6 py-3 bg-white rounded-full">
      <ArrowRightSvg
        className={`${className} stroke-black-1 transition-all duration-300`}
      />
    </div>
  );
};

export default PrimaryArrowButton;
