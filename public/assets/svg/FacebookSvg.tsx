"use client";

import React from "react";

interface FacebookSvgProps {
  size?: number;
  className?: string;
}

const FacebookSvg = ({ size = 24, className }: FacebookSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors ease-out duration-300`}
    >
      <path d="M15.997 3.985H18.188V0.169C17.81 0.117 16.51 0 14.996 0C11.837 0 9.67301 1.987 9.67301 5.639V9H6.18701V13.266H9.67301V24H13.947V13.267H17.292L17.823 9.001H13.946V6.062C13.947 4.829 14.279 3.985 15.997 3.985Z" />
    </svg>
  );
};

export default FacebookSvg;
