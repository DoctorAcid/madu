"use client";

import Link from "next/link";
import React from "react";

interface FiverrProps {
  className?: string;
  size?: number;
}

const Fiverr = ({ size = 40, className }: FiverrProps) => {
  return (
    <Link
      href="https://www.fiverr.com/s/yvk4vzZ"
      className="group flex items-center justify-center p-3"
    >
      <svg
        width={size}
        height={size}
        className={`${className} transition-colors ease-out duration-300`}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_54010_66)">
          <path d="M28.6127 38H35V18.5211H22.9348V17.0605C22.9348 17.0605 22.9348 15.3559 24.5909 15.3559H28.6127V10H24.5909C24.5909 10 16.5475 10 16.5475 17.0605V18.5211H13V23.877H16.5475V37.9981H22.9348V23.8789H28.6127V38Z" />
        </g>
        <defs>
          <clipPath id="clip0_54010_66">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
};

export default Fiverr;
