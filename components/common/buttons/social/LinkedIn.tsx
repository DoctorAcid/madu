"use client";

import LinkedinSvg from "@/public/assets/svg/LinkedinSvg";
import Link from "next/link";
import React from "react";

interface LinkedInProps {
  className?: string;
  size?: number;
}

const LinkedIn = ({ size = 24, className }: LinkedInProps) => {
  return (
    <Link href={"/#"} className="group flex items-center justify-center p-3">
      <LinkedinSvg size={size} className={className} />
    </Link>
  );
};

export default LinkedIn;
