"use client";

import ArrowLeftSvg from "@/public/assets/svg/ArrowLeftSvg";
import ArrowRightSvg from "@/public/assets/svg/ArrowRightSvg";
import Link from "next/link";
import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  arrow?: "right" | "left";
}

const PrimaryButton = ({
  children,
  href,
  className,
  arrow,
}: PrimaryButtonProps) => {
  return (
    <Link href={href || ""}>
      <button
        className={`group flex items-center gap-4 button-text text-primary-1 bg-white hover:text-primary-5 hover:bg-primary-1 transition-colors duration-300 rounded-full outline-none cursor-pointer py-4 ${arrow === "right" ? "pl-8 pr-6 " : arrow === "left" ? "pl-6 pr-8 " : "px-8"} ${className}`}
      >
        {arrow === "left" && (
          <ArrowLeftSvg className="stroke-primary-1 group-hover:stroke-primary-5" />
        )}
        {children}
        {arrow === "right" && (
          <ArrowRightSvg className="stroke-primary-1 group-hover:stroke-primary-5" />
        )}
      </button>
    </Link>
  );
};

export default PrimaryButton;
