"use client";

import React from "react";

interface LinkedinSvgProps {
  size?: number;
  className?: string;
}

const LinkedinSvg = ({ size = 24, className }: LinkedinSvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-colors ease-out duration-300`}
    >
      <g clipPath="url(#clip0_53930_114)">
        <path d="M23.994 24L24 23.999V15.197C24 10.891 23.073 7.57401 18.039 7.57401C15.619 7.57401 13.995 8.90201 13.332 10.161H13.262V7.97601H8.48901V23.999H13.459V16.065C13.459 13.976 13.855 11.956 16.442 11.956C18.991 11.956 19.029 14.34 19.029 16.199V24H23.994Z" />
        <path d="M0.395996 7.97656H5.372V23.9996H0.395996V7.97656Z" />
        <path d="M2.882 0C1.291 0 0 1.291 0 2.882C0 4.473 1.291 5.791 2.882 5.791C4.473 5.791 5.764 4.473 5.764 2.882C5.763 1.291 4.472 0 2.882 0Z" />
      </g>
      <defs>
        <clipPath id="clip0_53930_114">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LinkedinSvg;
