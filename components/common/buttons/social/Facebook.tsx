"use client";

import React from "react";
import FacebookSvg from "@/public/assets/svg/FacebookSvg";
import Link from "next/link";

interface FacebookProps {
  className?: string;
  size?: number;
}

const Facebook = ({ className, size }: FacebookProps) => {
  return (
    <Link href={"#"} className="group flex items-center justify-center p-3">
      <FacebookSvg size={size} className={className} />
    </Link>
  );
};

export default Facebook;
