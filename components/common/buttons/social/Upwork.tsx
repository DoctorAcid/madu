"use client";

import Link from "next/link";
import React from "react";

interface UpworkProps {
  className?: string;
  size?: number;
}

const Upwork = ({ size = 40, className }: UpworkProps) => {
  return (
    <Link
      href="https://www.upwork.com/freelancers/~0141b99449f769937d"
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
        <path d="M33.4875 27.8343C31.8938 27.8343 30.3937 27.1593 29.0437 26.0625L29.3719 24.5062L29.3812 24.4499C29.6812 22.7999 30.6094 20.025 33.4875 20.025C35.6438 20.025 37.3969 21.7781 37.3969 23.9343C37.3969 26.0906 35.6438 27.8343 33.4875 27.8343ZM33.4875 16.0687C29.8125 16.0687 26.9719 18.45 25.8094 22.3781C24.0469 19.725 22.7062 16.5468 21.9281 13.8656H17.9719V24.15C17.9719 26.1843 16.3219 27.8343 14.2875 27.8343C12.2531 27.8343 10.6031 26.1843 10.6031 24.15V13.8562H6.65625V24.1406C6.65625 28.35 10.0781 31.8093 14.2875 31.8093C18.4969 31.8093 21.9188 28.35 21.9188 24.1406V22.4156C22.6875 24.0187 23.625 25.6406 24.7688 27.0656L22.35 38.4468H26.3906L28.1438 30.1968C29.6813 31.1812 31.4437 31.8 33.4688 31.8C37.8 31.8 41.325 28.2562 41.325 23.9156C41.3344 19.5937 37.8188 16.0687 33.4875 16.0687Z" />
      </svg>
    </Link>
  );
};

export default Upwork;
